<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * This class controls viewing public pages.
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/20/2015
 */
class Page extends CI_Controller
{
	# home page
	function index()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('home', $data);
	}


	# portal home page
	function portal()
	{
		$data = filter_forwarded_data($this);

		# Collect all data needed for the UI
		$data['procurementPlanList'] = array();
		$data['activeProvidersList'] = array();
		$data['documentsList'] = array();
		$data['publicForumsList'] = array();

		$this->load->view('home_portal', $data);
	}





	# load a home list
	function home_list()
	{
		$data = filter_forwarded_data($this);

		$data['type'] = $data['t'];
		# TODO: Select list based on type passed
		$data['list'] = array();

		$this->load->view('page/home_list', $data);
	}





	# about us page
	function about()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('page/about', $data);
	}

	# terms of use page
	function terms_of_use()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('page/terms_of_use', $data);
	}

	# privacy policy page
	function privacy_policy()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('page/privacy_policy', $data);
	}

	# providers page
	function providers()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('page/providers', $data);
	}

	# government agencies page
	function government_agencies()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('page/government_agencies', $data);
	}

	# standards page
	function standards()
	{
		$data = filter_forwarded_data($this);
		$this->load->view('page/standards', $data);
	}

	# verify a document page
	function verify()
	{
		$data = filter_forwarded_data($this);

		$this->load->view('page/verify_document', $data);
	}

	# contact us page
	function contact_us()
	{
		$data = filter_forwarded_data($this);

		# User has posted a message
		if(!empty($_POST))
		{
			$passed = process_fields($this, $this->input->post(NULL, TRUE), array('yourname','emailaddress', 'reason__contactreason', 'details'), array('@','!'));
			$data['msg'] = !empty($passed['msg'])? $passed['msg']: "";

			# All required fields are included? Then send the message to the admin
			if($passed['boolean'])
			{
				$details = $passed['data'];

				$data['result'] = $this->_messenger->send_email_message('', array('code'=>'contact_us_message', 'emailfrom'=>NOREPLY_EMAIL, 'telephone'=>(!empty($details['telephone'])? $details['telephone']:''), 'fromname'=>SITE_GENERAL_NAME, 'cc'=>$details['emailaddress'], 'useremailaddress'=>$details['emailaddress'], 'usernames'=>$details['yourname'], 'subject'=>$details['reason__contactreason'], 'details'=>$details['details'], 'emailaddress'=>HELP_EMAIL, 'login_link'=>base_url(), 'sent_time'=>date('d-M-Y h:ia T', strtotime('now')) ));

				if($data['result'])
				{
					$this->native_session->delete_all(array('yourname'=>'','emailaddress'=>'', 'reason__contactreason'=>'', 'details'=>''));
					$data['msg'] = "Your message has been sent. We shall respond as soon as possible.";
				}
				else $data['msg'] = "ERROR: There was a problem sending your message";
			}
			else
			{
				$data['msg'] = "WARNING: There is a problem with the data you submitted.";
			}
		}

		$this->load->view('page/contact_us', $data);
	}



	# Generate a custom drop down list
	function get_custom_drop_list()
	{
		$data = filter_forwarded_data($this);

		if(!empty($data['type'])){
			$searchBy = !empty($data['search_by'])? $data['search_by']: '';
			$data['list'] =  get_option_list($this, $data['type'], 'div', $searchBy, $data);
		}

		$data['area'] = "dropdown_list";
		$this->load->view('addons/basic_addons', $data);
	}

}
/* End of controller file */