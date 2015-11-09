<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * This class controls viewing account pages.
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/30/2015
 */
class Account extends CI_Controller 
{
	
	#Constructor to set some default values at class load
	public function __construct()
    {
        parent::__construct();
        $this->load->model('_account');
	}
	
	
	# Register a user account
	function register()
	{
		$data = filter_forwarded_data($this);
		
		if(!empty($_POST['organization__organizationtypes'])){
			$this->native_session->set('__organization_type', $_POST['organization__organizationtypes']);
		}
		
		$this->load->view('account/register_step_'.(!empty($data['step'])? $data['step']: '1'), $data);
	}
	
	
	# Account explanation
	function type_explanation()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('account/type_explanation', $data);
	}
	
	
	
	# login
	function login()
	{
		$data = filter_forwarded_data($this);
		
		# The user wants to proceed to login
		if(!empty($_POST)){
			if(!empty($_POST['verified'])){
				$response = $this->_account->login($_POST['loginusername'], $_POST['loginpassword'], array(
					'uri'=>uri_string(),
					'ip_address'=>get_ip_address(),
					'device'=>get_user_device(),
					'browser'=>$this->agent->browser()
				)); 
				
				# Proceed based on the login response from the API
				if(!empty($response['result']) && $response['result'] == 'SUCCESS' && !empty($response['default_view'])) {
					add_to_user_session($this, $response['user_details']);
					$this->native_session->set('__default_view', $response['default_view']);
					if(!empty($response['permissions'])) $this->native_session->set('__permissions', $response['permissions']);
					if(!empty($response['default_view']) && !empty($response['permissions'])) redirect(base_url().$response['default_view']);
					else $data['msg'] = "ERROR: No permissions could be resolved for your account.";
				}
				else $data['msg'] = "ERROR: The user name and password do not match a registered user. Please check and try again.";
			}
			else $data['msg'] = "ERROR: Your login could not be verified.";
		}
		
		$this->load->view('account/login', $data);
	}
	
	
	
	# The admin dashboard
	function admin_dashboard()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('account/admin_dashboard', $data);
	}
	
	
	
	# The government dashboard
	function government_dashboard()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('account/government_dashboard', $data);
	}
	
	
	
	# The pde dashboard
	function pde_dashboard()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('account/pde_dashboard', $data);
	}
	
	
	# The provider dashboard
	function provider_dashboard()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('account/provider_dashboard', $data);
	}
	
	
	
	# logout
	function logout()
	{
		$data = filter_forwarded_data($this);
		#Log sign-out event
		$userId = $this->native_session->get('__user_id')? $this->native_session->get('__user_id'): "";
		$email = $this->native_session->get('__email_address')? $this->native_session->get('__email_address'): "";
		$this->_logger->add_event(array('user_id'=>$userId, 'activity_code'=>'user_logout', 'result'=>'success', 'log_details'=>"userid=".$userId."|email=".$email ));
		
		# Set appropriate message - reason for log out.
		$data['msg'] = $this->native_session->get('msg')? get_session_msg($this): "You have been logged out.";
					
		#Remove any set session variables
		$this->native_session->delete_all();
		$this->load->view('account/login', $data);
	}
	
	
	
	
	
	
	
	
	
}

/* End of controller file */