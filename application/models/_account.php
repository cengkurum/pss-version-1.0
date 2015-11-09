<?php
/**
 * This class generates and formats account details. 
 *
 * @author Al Zziwa <al@clout.com>
 * @version 1.3.0
 * @copyright Clout
 * @created 07/30/2015
 */
class _account extends CI_Model
{
	
	# Add an application
	public function add($formDetails)
	{
		$userId = '';
		$emailVerified = 'N';
		
		return array('result'=>((!empty($result) && $result)? 'SUCCESS': 'FAIL'), 'new_user_id'=>$userId, 'email_verified'=>$emailVerified);
	}
	
	
	
	
	
	# Verify a new user's account
	public function verify($code)
	{
		$user = $this->_query_reader->get_row_as_array('get_user_by_id', array('user_id'=>extract_id($code) ));
		# Mark the email and account as verified
		if(!empty($user['id'])) {
			$result = $this->_query_reader->run('update_user_value', array('field_name'=>'email_verified', 'field_value'=>'Y', 'user_id'=>$user['id']));
			if($result) $result = $this->_query_reader->run('update_user_field', array('user_id'=>$user['id'], 'field_name'=>'user_status', 'field_value'=>'active'));
		}
		
		return array('verified'=>(!empty($result) && $result? 'Y': 'N'));
	}
	
	
	
	
	
	# Resend an account verification link
	public function resend_link($emailAddress, $userId, $baseLink)
	{
		$result = $this->_messenger->send($userId, array(
				'code'=>'account_verification_link',
				'emailaddress'=>$emailAddress,
				'verificationlink'=>$baseLink.'u/'.format_id($userId)
			),
			array('system', 'email'), 
			TRUE);
		return array('result'=>($result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	
	# Login into the system
	public function login($userName, $password, $details=array())
	{
		$response = array('result'=>'FAIL', 'default_view'=>'', 'user_details'=>array(), 'permissions'=>array());
		
		# Check whether the userName and password match for the user - and get their user id
		$iam = $this->_query_reader->get_row_as_array('get_user_by_name_and_pass', array('login_name'=>$userName, 'login_password'=>sha1($password) ));
		
		# Get the user details if they exist
		if(!empty($iam['user_id'])) $user = $this->_query_reader->get_row_as_array('get_user_by_id', array('user_id'=>$iam['user_id']));
			
		# Collect the rest of the user details if login is successful
		if(!empty($user))
		{
			$response['result'] = 'SUCCESS';
			
			# Default view on login
			$response['default_view'] = $this->get_default_view($user['group_type']);
			
			# User details
			$response['user_details'] = array(
					'user_id'=>$user['id'], 
					'first_name'=>$user['first_name'], 
					'last_name'=>$user['last_name'], 
					'email_address'=>$user['email_address'], 
					'email_verified'=>$user['email_verified'],  
					'telephone'=>$user['telephone'],  
					'telephone_carrier'=>(!empty($user['telephone_carrier'])? $user['telephone_carrier']: ''),
					'photo_url'=>(!empty($user['photo_url'])? BASE_URL.'assets/uploads/'.$user['photo_url']: '')
			);
			
			# The allowed permissions for the user
			$response['permissions'] = $this->_query_reader->get_single_column_as_array('get_user_permissions', 'permission_code', array('user_id'=>$user['id']));
		}
		
		# Log the login attempt event
		$this->_logger->add_event(array(
			'user_id'=>(!empty($user['id'])? $user['id']: 'username='.$userName), 
			'activity_code'=>'login', 
			'result'=>(!empty($user['id'])? 'SUCCESS':'FAIL'), 
			'log_details'=>"username=".$userName."|device=".(!empty($details['device'])? $details['device']: 'unknown')."|browser=".(!empty($details['browser'])? $details['browser']: 'unknown'),
			'uri'=>(!empty($details['uri'])? $details['uri']: ''),
			'ip_address'=>(!empty($details['ip_address'])? $details['ip_address']: '')
		));
		
		
		return $response;
	}
	
	
	
	
	
	
	# Logout of the system
	public function logout($userId, $details=array())
	{
		# Log the logout attempt event
		$this->_logger->add_event(array(
			'user_id'=>(!empty($userId)? $userId: ''), 
			'activity_code'=>'logout', 
			'result'=>'SUCCESS', 
			'log_details'=>"device=".(!empty($details['device'])? $details['device']: 'unknown')."|browser=".(!empty($details['browser'])? $details['browser']: 'unknown'),
			'uri'=>(!empty($details['uri'])? $details['uri']: ''),
			'ip_address'=>(!empty($details['ip_address'])? $details['ip_address']: '')
		));
	}
	
	
	
	# Get the default view to redirect the user on login
	function get_default_view($groupType)
	{
		$view = '';
		if(!empty($groupType)){
			switch($groupType){
				case 'admin':
					$view = 'account/admin_dashboard';
				break;
				
				case 'government_agency':
					$view = 'account/government_dashboard';
				break;
				
				case 'pde':
					$view = 'account/pde_dashboard';
				break;
				
				default:
					$view = 'account/provider_dashboard';
				break;
			}
		}
		
		return $view;
	}
	
	
	
	
	# Function to send a password recovery link
	function send_password_link($emailAddress, $baseLink)
	{
		$msg = '';
		$user = $this->_query_reader->get_row_as_array('get_user_by_email',array('email_address'=>$emailAddress));
		
		if(!empty($user['user_id'])){
			#Generate a temporary password that the user has to update and make it the temp password
			$password = 'TEMP-'.strtoupper(chr(97 + mt_rand(0, 25))).'-'.$user['user_id'];
			$sendResult = $this->_messenger->send($user['user_id'], array(
				'code'=>'password_recovery_link', 
				'securityemail'=>SECURITY_EMAIL, 
				'recoverylink'=>$baseLink.'p/'.encrypt_value($password) 
			));
		}
		else $msg = 'The user with the entered email address does not exist.';
		
		return array('result'=>(!empty($sendResult) && $sendResult? 'SUCCESS': 'FAIL'), 'msg'=>$msg);
	}
	
	
	
	
	# Function to reset the user's password
	function reset_password($userId, $tempPassword, $newPassword)
	{
		# Simply checking if this link is still valid
		if(!empty($tempPassword)){
			$realPass = decrypt_value($tempPassword);
			$realUserId = substr($realPass, strrpos($realPass, '-') + 1);
			if(!empty($realUserId)) $user = $this->_query_reader->get_row_as_array('get_user_by_id', array('user_id'=>$realUserId));
			
			return array('result'=>(!empty($user)? 'verified': 'failed'), 'user_id'=>(!empty($user)? $realUserId: ''));
		}
		
		# actually changing the password
		else {
			if(!empty($newPassword) && !empty($userId)){
				$result = post_to_url(IAM_URL,  array(
					'__action'=>'update_user_password', 
					'userId'=>$userId,
					'password'=>decrypt_value($newPassword)
				));
				
				if(!empty($result['result']) && $result['result']=='SUCCESS') $sendResult = $this->_messenger->send($userId, array('code'=>'password_has_changed', 'securityemail'=>SECURITY_EMAIL));
			}
			
			
			return array('result'=>(!empty($result['result']) && $result['result']=='SUCCESS')? 'SUCCESS': 'FAIL');
		}
	}
	
	
	
	
	
}


?>