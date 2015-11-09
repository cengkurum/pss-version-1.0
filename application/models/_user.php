<?php
/**
 * This class generates and formats user details. 
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/20/2015
 */
class _user extends CI_Model
{
	
	# Get a list of users based on the passed criteria
	function get_list($view='profile', $offset, $limit, $phrase, $category, $extraFields=array())
	{
		$viewFields['profile'] = array('user_id', 'first_name', 'last_name', 'email_address', 'email_verified', 'mobile', 'mobile_verified', 'gender', format_field_for_date('birthday'), 'address', 'address_verified', 'city', 'state', 'zipcode', 'country', 'photo','driver_license', 'driver_license_verified', 'ssn', 'facebook_connected', 'linkedin_connected', 'twitter_connected', 'email_connected', 'permission_group', 'user_type');
		
		$values['fields'] = implode(', ', $viewFields[$view]);
		$values['phrase_condition'] = !empty($phrase)? " AND (first_name LIKE '%".htmlentities($phrase, ENT_QUOTES)."%' OR last_name LIKE '%".htmlentities($phrase, ENT_QUOTES)."%' OR email_address LIKE '%".htmlentities($phrase, ENT_QUOTES)."%' )": '';
		$values['type_condition'] = " AND user_type  = '".$category."' ";
		$values['limit_text'] = " LIMIT ".$offset.",".$limit." ";
		
		return $this->_query_reader->get_list('get_user_details_list', $values);
	}
	
	
	
	
	# Get user settings
	function get_settings($userId, $fields)
	{
		$result = array();
		
		$fieldArray = explode(',',$fields);
		$keys = array('name','gender','photo','birthday','emailAddress','telephone', 'addressLine1', 'addressLine2', 'city', 'state', 'country', 'zipcode','dateJoined','passwordLastUpdated');
		$common = array_intersect($keys, $fieldArray);
		$diff = array_diff($fieldArray, $common);
		
		# There are some fields to pick direct from the database
		if(count($common) > 0) $result = $this->_query_reader->get_row_as_array('get_user_settings', array('user_id'=>$userId, 'fields'=>implode(',',$common), 'base_photo_url'=>BASE_URL.'assets/uploads/' ));
		
		# There are fields to be picked as multi-dimension arrays
		if(count($diff) > 0) {
			foreach($diff AS $field){
				if($field == 'savedAddresses') $result[$field] = $this->_query_reader->get_list('get_saved_addresses', array('user_id'=>$userId, 'is_active'=>'Y'));
				
				if($field == 'savedEmails') $result[$field] = $this->_query_reader->get_list('get_saved_emails', array('user_id'=>$userId, 'is_active'=>"N','Y"));
				
				if($field == 'savedPhones') $result[$field] = $this->_query_reader->get_list('get_saved_phones', array('user_id'=>$userId, 'is_active'=>"N','Y"));
				
				if($field == 'notificationPreferences') $result[$field] = $this->_query_reader->get_single_column_as_array('get_communication_preferences', 'message_format', array('user_id'=>$userId));
			}
		}
		
		return $result;
	}
	
	
	
	
	
	
	# Update a user's photo
	function update_photo($userId, $photoUrl)
	{
		$fileUrl = download_from_url($photoUrl);
		if(file_exists($fileUrl) && filesize($fileUrl) > 0){
			$result = $this->_query_reader->run('add_user_photo', array('user_id'=>$userId, 'photo_url'=> basename($fileUrl) )); 
		}
		
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'), 'photo_url'=>BASE_URL.'assets/uploads/'.basename($fileUrl) );
	}
	
	
	
	
	
	# Update the user password
	function update_password($userId, $password)
	{
		$result = post_to_url(IAM_URL,  array(
			'__action'=>'update_user_password', 
			'userId'=>$userId,
			'password'=>$password
		));
		
		if(!empty($result['result']) && $result['result']=='SUCCESS') $sendResult = $this->_messenger->send($userId, array('code'=>'password_has_changed', 'securityemail'=>SECURITY_EMAIL));
		
		return $result;
	}
	
	
	
	
	# Add address
	function add_address($userId, $addressLine1, $addressLine2, $city, $state, $country, $zipcode)
	{
		$result = $this->_query_reader->run('add_user_address', array('user_id'=>$userId, 'address_line_1'=>$addressLine1, 'address_line_2'=>$addressLine2, 'city'=>$city, 'state'=>$state, 'country'=>$country, 'zipcode'=>$zipcode, 'address_type'=>'home'));
		
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	# Update the address type
	function update_address_type($userId, $contactId, $addressType)
	{
		$result = $this->_query_reader->run('update_address_type', array('contact_id'=>$contactId, 'address_type'=>$addressType));
		
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	# Remove a user address
	function remove_address($userId, $contactId)
	{
		$result = $this->_query_reader->run('deactivate_user_address', array('contact_id'=>$contactId));
		
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	
	
	# Communication method privacy
	function communication_privacy($userId, $method, $methodValue)
	{
		$result = $this->_query_reader->run((empty($methodValue)? 'delete': 'add').'_communication_privacy', 
			array('user_id'=>$userId, 'message_format'=>$method)
		);
		
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	
	# Add email address
	function add_email_address($userId, $emailAddress)
	{
		if(!empty($emailAddress)) $contactId = $this->_query_reader->add_data('add_user_email_address', array('user_id'=>$userId, 'email_address'=>$emailAddress));
		
		if(!empty($contactId)) {
			$code = format_activation_code($contactId);
			$result = $this->_messenger->send($userId, array('code'=>'contact_activation_code', 'method'=>'email', 'activationcode'=>$code, 'emailaddress'=>$emailAddress, 'contactvalue'=>$emailAddress), array('email'), TRUE);
			if($result) $result = $this->_query_reader->run('add_email_activation_code', array('contact_id'=>$contactId, 'activation_code'=>sha1($code) )); 
		}
		
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	
	# Add telephone
	function add_telephone($userId, $telephone, $provider, $isPrimary)
	{
		# Simply updating the current user telephone
		if($isPrimary == 'Y')
		{
			$result = $this->_query_reader->run('update_user_value', array('field_name'=>'telephone', 'field_value'=>$telephone, 'user_id'=>$userId));
			# Send the SMS with the code
			if($result) {
				$code = format_activation_code($userId);
				$result = $this->_messenger->send($userId, array('verificationcode'=>$code,
					'telephone'=>$telephone, 
					'code'=>'send_verification_code'
				), array('sms'), TRUE);
			}
		}
		# Adding another telephone to their profile
		$contactId = $this->_query_reader->add_data('add_user_telephone', array('user_id'=>$userId, 'telephone'=>$telephone, 'provider'=>htmlentities($provider, ENT_QUOTES), 'is_primary'=>$isPrimary ));
		
		# Send an activation code for non-primary contacts as well
		if(!empty($contactId) && $isPrimary == 'N') {
			$code = format_activation_code($contactId);
			$result = $this->_messenger->send($userId, array('code'=>'contact_activation_code', 'method'=>'telephone', 'activationcode'=>$code, 'telephone'=>$telephone, 'contactvalue'=>$telephone), array('sms'), TRUE);
		}
		
		if(!empty($contactId) && $result) {
			$result = $this->_query_reader->run('add_telephone_activation_code', array('contact_id'=>$contactId, 'activation_code'=>sha1($code) ));
			# Activate a primary contact phone
			if($isPrimary == 'Y' && $result){
				$result = $this->_query_reader->run('activate_telephone_by_code', array('contact_id'=>$contactId, 'activation_code'=>sha1($code) ));
			}
		}
		
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	
	# Activate email address
	function activate_email_address($userId, $contactId, $code)
	{
		$result = $this->_query_reader->run('activate_email_by_code', array('contact_id'=>$contactId, 'activation_code'=>sha1($code) ), TRUE);
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	
	# Activate telephone
	function activate_telephone($userId, $contactId, $code)
	{
		$result = $this->_query_reader->run('activate_telephone_by_code', array('contact_id'=>$contactId, 'activation_code'=>sha1($code) ), TRUE);
		return array('result'=>(!empty($result) && $result? 'SUCCESS': 'FAIL'));
	}
	
	
	
	
	
	
	
	
	
	
	
	
}


?>