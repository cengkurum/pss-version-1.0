<?php

/**
 * This class manages formatting and sending of messages.
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/20/2015
 */
 
class _messenger extends CI_Model {
	
	#Constructor to set some default values at class load
	public function __construct()
    {
        parent::__construct();
		$this->load->library('email');
		#Use the message cache if its enabled
		$this->load->helper('message_list');
    }
	
	
	
	# Notify a user by sending a message to their email, sms and in the system
	# $required - makes sure that the sending formats required were successful, although the other formats are still attempted
	# $formatStrict - send using only the required formats
	function send($receiverId, $message, $required=array('system'), $formatStrict=FALSE)
	{
		# Send to store staff if the receipient type is store
		if(!empty($message['receivertype']) && $message['receivertype'] == 'store')
		{
			$staff = $this->_query_reader->get_list('get_store_staff', array('store_id'=>$receiverId));
			# Form an array of store staff user-ids
			$receiverId = array();
			foreach($staff AS $row) array_push($receiverId, $row['_staff_user_id']);
		}
		
		$results = array();
		if(!empty($receiverId) && !empty($message['code']))
		{
			# 1. If email address or first name is not provided, then fetch it using the user id
			if(empty($message['emailaddress']) || empty($message['firstname']))
			{
				$user = $this->_query_reader->get_row_as_array('get_user_by_id', array('user_id'=>$receiverId));
				if(!empty($user))
				{
					$message['emailaddress'] = !empty($message['emailaddress'])? $message['emailaddress']: $user['email_address'];
					$message['firstname'] = !empty($message['firstname'])? $message['firstname']: $user['first_name'];
					$message['telephone'] = !empty($message['telephone'])? $message['telephone']: $user['telephone'];
				}
			}
			
			# Fetch the message template and populate the necessary details
			$template = $this->get_template_by_code($message['code']);
			$messageData = $this->populate_template($template, $message);
			$message = array_merge($messageData, $message);
			
			# Sending email
			if(!$formatStrict || ($formatStrict && in_array('email', $required))){
				if(is_array($receiverId)) 
				{
					$resultArray = array();
					foreach($receiverId AS $id) array_push($resultArray, $this->send_email_message($id, $message));
					$results['email'] = get_decision($resultArray);
				}
				else $results['email'] = $this->send_email_message($receiverId, $message);
			}
			else  $results['email'] = FALSE;
			
			
			# Sending SMS
			if(!$formatStrict || ($formatStrict && in_array('sms', $required))){
				if(is_array($receiverId)) 
				{
					$resultArray = array();
					foreach($receiverId AS $id) array_push($resultArray, $this->send_sms_message($id, $message));
					$results['sms'] = get_decision($resultArray);
				}
				else $results['sms'] = $this->send_sms_message($receiverId, $message);
			}
			else  $results['sms'] = FALSE;
			
			
			# Sending System
			if(!$formatStrict || ($formatStrict && in_array('system', $required))){
				if(is_array($receiverId)) 
				{
					$resultArray = array();
					foreach($receiverId AS $id) array_push($resultArray, $this->send_system_message($id, $message));
					$results['system'] = get_decision($resultArray);
				}
				else $results['system'] = $this->send_system_message($receiverId, $message);
			}
			else  $results['system'] = FALSE;
		}
		
		#If the sending format required passed then return the result as successful even if the others may have failed
		$considered = array();
		foreach($results AS $key=>$value) if(in_array($key, $required)) array_push($considered, $value);
		
		return get_decision($considered);
	}
	
	
	
	# Send email message
	function send_email_message($userId, $messageDetails)
	{
		$isSent = false;
		
		if(check_sending_settings($this, $userId, 'email'))
		{
			$messageDetails['emailfrom'] = NOREPLY_EMAIL;
			$messageDetails['fromname'] = SITE_GENERAL_NAME;
			
			# 1. Send message
			if(!empty($messageDetails['emailaddress']) && !empty($messageDetails['details']))
			{
				$this->email->to($messageDetails['emailaddress']);
				$this->email->from($messageDetails['emailfrom'], $messageDetails['fromname']);
				$this->email->reply_to($messageDetails['emailfrom'], $messageDetails['fromname']);
				if(!empty($messageDetails['cc'])) $this->email->cc($messageDetails['cc']);
				
				# Copy admin if he is not the sender
				if((!empty($messageDetails['copyadmin']) && $messageDetails['copyadmin'] == 'Y') && $messageDetails['emailfrom'] != SITE_ADMIN_MAIL) $this->email->bcc(SITE_ADMIN_MAIL);
			
				$this->email->subject($messageDetails['subject']);
				$this->email->message($messageDetails['details']);
				
				if(!empty($messageDetails['fileurl'])) $this->email->attach($messageDetails['fileurl']);

				# Use this line to test sending of email without actually sending it
				# echo $this->email->print_debugger();
		
				$isSent = $this->email->send();
				$this->email->clear(TRUE);
				
				
				# Record messsage sending event
				$this->log_message_event($userId, $isSent, 'email__message_sent', $messageDetails);
			}
		}
		
		return $isSent;
	}
	
	
	
	# Send an SMS to the specified user
	function send_sms_message($userId, $messageDetails)
	{
		$isSent = false;
		if(check_sending_settings($this, $userId, 'sms'))
		{
			$messageDetails['emailfrom'] = NOREPLY_EMAIL;
			$messageDetails['fromname'] = SITE_GENERAL_NAME;
			
			if(!empty($messageDetails['telephone']))
			{
				#Attempt sending by SMS and then by API
				$this->load->model('_provider');
				$providerEmailDomain = $this->_provider->get_email_domain($messageDetails['telephone']);
				if(!empty($providerEmailDomain))
				{
					$this->email->to($messageDetails['telephone'].'@'.$providerEmailDomain);
					$this->email->from($messageDetails['emailfrom'], $messageDetails['fromname']);
					$this->email->reply_to($messageDetails['emailfrom'], $messageDetails['fromname']);
					if(!empty($messageDetails['copyadmin']) && $messageDetails['copyadmin'] == 'Y') $this->email->bcc(SITE_ADMIN_MAIL);
					$this->email->subject('');
					$this->email->message(limit_string_length($messageDetails['sms'],150,FALSE));
				
					$isSent = $this->email->send();
					$this->email->clear(TRUE);
				}
			}
			
			#Else use the SMS-Global gateway to send the SMS
			if(!$isSent && !empty($messageDetails['telephone']) && !empty($messageDetails['sms']))
			{
				$this->load->library('Sms_global', array('user'=>SMS_GLOBAL_USERNAME, 'pass'=>SMS_GLOBAL_PASSWORD, 'from'=>SMS_GLOBAL_VERIFIED_SENDER)); 
				
				$this->sms_global->to($messageDetails['telephone']);
				$this->sms_global->from(SMS_GLOBAL_VERIFIED_SENDER);
				$this->sms_global->message(limit_string_length($messageDetails['sms'],150,FALSE));
				$this->sms_global->send();
				
				# only use this to output the message details on screen for debugging
				#$this->sms_global->print_debugger(); 
				
				$isSent = !empty($this->sms_global->get_sms_id())? true: false; 
			}
		
				
			#Record messsage sending event
			$this->log_message_event($userId, $isSent, 'sms__message_sent', $messageDetails);
		}
		
		return $isSent;
	}	
			
	
	
	
	
	
	
	
	
	
	
	
	# Send a system message to the specified user
	function send_system_message($userId, $messageDetails)
	{
		$isSent = false;
		
		if(check_sending_settings($this, $userId, 'system', (!empty($messageDetails['allow_message_code'])? $messageDetails['allow_message_code']: 'all') ))
		{
			#Make the sender the no-reply user if no sender id is given
			$messageDetails['senderid'] = !empty($messageDetails['senderid'])? $messageDetails['senderid']: '2';
			
			# 1. Record the message exchange to be accessed by the recipient in their inbox
			$isSent[0] = $this->_query_reader->run('record_message_exchange', array('template_code'=>(!empty($messageDetails['code'])? $messageDetails['code']: 'user_defined_message'), 'details'=>htmlentities($messageDetails['details'], ENT_QUOTES), 'subject'=>htmlentities($messageDetails['subject'], ENT_QUOTES), 'attachment_url'=>(!empty($messageDetails['fileurl'])? substr(strrchr($messageDetails['fileurl'], "/"),1): ''), 'sender_id'=>$messageDetails['senderid'], 'recipient_id'=>$userId));
			
			# 2. copy admin if required
			if(!empty($messageDetails['copyadmin']) && $messageDetails['copyadmin'] == 'Y')
			{
			 	$isSent[1] = $this->_query_reader->run('record_message_exchange', array('template_code'=>(!empty($messageDetails['code'])? $messageDetails['code']: 'user_defined_message'), 'details'=>htmlentities($messageDetails['details'], ENT_QUOTES), 'subject'=>htmlentities($messageDetails['subject'], ENT_QUOTES), 'attachment_url'=>(!empty($messageDetails['fileurl'])? substr(strrchr($messageDetails['fileurl'], "/"),1): ''), 'sender_id'=>$messageDetails['senderid'], 'recipient_id'=>implode("','", $this->get_admin_users()) ));
			}
			
			$isSent = get_decision($isSent);
		}
		
		return $isSent;
	}	
			



	
	
	# Returns admin user ids
	function get_admin_users()
	{
		$this->load->model('_account');
		return $this->_account->types('admin');
	}





	# Log message sending
	function log_message_event($userId, $isSent, $activityCode, $messageDetails)
	{
		$sentTo = '';
		if(!empty($messageDetails['firstname']) && !empty($messageDetails['emailaddress'])) $sentTo = $messageDetails['emailaddress'].' ('.$messageDetails['firstname'].')';
		else if(!empty($messageDetails['emailaddress'])) $sentTo = $messageDetails['emailaddress'];
		else if(!empty($messageDetails['telephone'])) $sentTo = $messageDetails['telephone'];
		
		
		$this->_logger->add_event(array(
				'user_id'=>$userId, 
				'activity_code'=>$activityCode, 
				'result'=>($isSent? 'SUCCESS':'FAIL'), 
				
				'log_details'=>"message=".$messageDetails['subject']."|sent_to=".$sentTo."|sent_by=".$messageDetails['emailfrom']." (".$messageDetails['fromname'].")".(!empty($messageDetails['cc'])? "|cc=".$messageDetails['cc']: ""),
				
				'uri'=>(!empty($messageDetails['uri'])? $messageDetails['uri']: ''),
				'ip_address'=>(!empty($messageDetails['ip_address'])? $messageDetails['ip_address']: '')
			));
	}

	
	
	
	
	# Send a direct email message 
	# Use only when sending to NON-REGISTERED emails
	function send_direct_email($recipientEmail, $userId, $message)
	{
		$isSent = FALSE;
		
		if(!empty($message['code']))
		{
			if(!empty($userId)){
				$user = $this->_query_reader->get_row_as_array('get_user_by_id', array('user_id'=>$userId));
				if(!empty($user)){ 
					$message['fromname'] = $user['first_name'].' '.$user['last_name'];
					$message['emailfrom'] = $user['email_address'];
				}
			}
			
			
			# Put default if user is not specified
			if(!empty($message['emailfrom'])){
				$message['fromname'] = SITE_TITLE;
				$message['emailfrom'] = NOREPLY_EMAIL;
			}
			
			$template = $this->get_template_by_code($message['code']);
			$messageData = $this->populate_template($template, $message);
			$message = array_merge($messageData, $message);
			
			$this->email->to($recipientEmail);
			$this->email->from(NOREPLY_EMAIL, SITE_TITLE);
			$this->email->reply_to(NOREPLY_EMAIL, SITE_TITLE);
			$this->email->subject($message['subject']);
			$this->email->message($message['details']);
			
			if(!empty($message['fileurl'])) $this->email->attach($message['fileurl']);
			# Use this line to test sending of email without actually sending it
			# $this->email->print_debugger();
			$isSent = $this->email->send();
			$this->email->clear(TRUE);
			
			# 2. copy admin if required
			if(!empty($message['copyadmin']) && $message['copyadmin'] == 'Y')
			{
			 	$isSent = $this->_query_reader->run('record_message_exchange', array('template_code'=>(!empty($message['code'])? $message['code']: 'user_defined_message'), 'details'=>htmlentities($message['details'], ENT_QUOTES), 'subject'=>htmlentities($message['subject'], ENT_QUOTES), 'attachment_url'=>(!empty($message['fileurl'])? substr(strrchr($message['fileurl'], "/"),1): ''), 'sender_id'=>(!empty($userId)? $userId: '1'), 'recipient_id'=>implode("','", $this->get_admin_users()) ));
			}
			
			#Record messsage sending event
			$this->log_message_event($userId, $isSent, 'email__message_sent', $message);
		}
		
		return $isSent;
	}
	
	
	


	
	# Get a template of the message given its code
	function get_template_by_code($code)
	{
		$cachedMessage = ENABLE_MESSAGE_CACHE? get_sys_message($code):'';
		
		return (!empty($cachedMessage) && ENABLE_MESSAGE_CACHE)? $cachedMessage: $this->_query_reader->get_row_as_array('get_message_template', array('message_type'=>$code));
	}	
				
	
	
	# Populate the template to generate the actual message
	function populate_template($template, $values=array(), $type='email')
	{
		$values['messageid'] = $this->assign_message_id($template['id']);
		$values['loginlink'] = !empty($values['loginlink'])? trim($values['loginlink'],'/'): 'http://www.rssprocurement.org';	
		
		# Order keys by length - longest first
		array_multisort(array_map('strlen', array_keys($values)), SORT_DESC, $values);
		
		# SMS message
		if(!empty($template['subject']) && !empty($template['sms']))
		{
			foreach($values AS $key=>$value)
			{
				$template['subject'] = str_replace('_'.strtoupper($key).'_', html_entity_decode($value, ENT_QUOTES), $template['subject']);
				$template['sms'] = str_replace('_'.strtoupper($key).'_', html_entity_decode($value, ENT_QUOTES), $template['sms']);
			}
		}
		
		# Email or system message
		if(!empty($template['subject']) && !empty($template['details']))
		{
			# Go through all passed values and replace where they appear in the template text
			foreach($values AS $key=>$value)
			{
				$template['subject'] = str_replace('_'.strtoupper($key).'_', html_entity_decode($value, ENT_QUOTES), $template['subject']);
				$template['details'] = str_replace('_'.strtoupper($key).'_', html_entity_decode($value, ENT_QUOTES), $template['details']);
			}
		}
		
		return $template;
	}
	
	
	
	
	
	#Generate and assign a message ID
	public function assign_message_id($templateId)
	{
		return date('Ym').dechex($templateId).date('his');
	}
	
	
	
	
	
	
	
	
	
	#Load queries into the message file
	public function load_messages_into_cache()
	{
		$messages = $this->db->query("SELECT * FROM message_templates")->result_array();
		
		#Now load the queries into the file
		file_put_contents(MESSAGE_FILE, "<?php ".PHP_EOL."global \$sysMessage;".PHP_EOL); 
		foreach($messages AS $message)
		{
			$messageString = "\$sysMessage['".$message['message_type']."'] = array('subject'=>\"".str_replace('"', '\"', $message['subject'])."\", 'details'=>\"".str_replace('"', '\"', $message['details'])."\", 'sms'=>\"".str_replace('"', '\"', $message['sms'])."\", 'copy_admin'=>'".$message['copy_admin']."');".PHP_EOL;  
			file_put_contents(MESSAGE_FILE, $messageString, FILE_APPEND);
		}
		
		file_put_contents(MESSAGE_FILE, PHP_EOL.PHP_EOL." function get_sys_message(\$code) { ".PHP_EOL."global \$sysMessage; ".PHP_EOL."return !empty(\$sysMessage[\$code])? \$sysMessage[\$code]: '';".PHP_EOL." }".PHP_EOL, FILE_APPEND); 
		
		echo "MESSAGE CACHE FILE HAS BEEN UPDATED [".date('F d, Y H:i:sA T')."]";
	}
	
	
}

?>