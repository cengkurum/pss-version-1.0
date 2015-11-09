<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * This class controls viewing provider pages.
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/30/2015
 */
class Provider extends CI_Controller 
{
	# providers home page
	function index()
	{
		$data = filter_forwarded_data($this);
		$data['activeProvidersList'] = array();
		
		$this->load->view('provider/home', $data);
	}
	
	
	
	# providers lists
	function provider_list()
	{
		$data = filter_forwarded_data($this);
		
		$data['type'] = $data['t'];
		# TODO: Select list based on type passed
		$data['list'] = array();
		
		$this->load->view('provider/details_list', $data);
	}
	
	
	
	
	
	
}

/* End of controller file */