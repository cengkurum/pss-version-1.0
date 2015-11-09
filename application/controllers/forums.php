<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/**
 * This class controls viewing forums pages. [Renamed from FAQs]
 *
 * @author David Buwembo <dbuwembo@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 11/2/2015
 */
class Forums extends CI_Controller 
{
	# faqs home page
	function index()
	{
		$data = filter_forwarded_data($this);
		
		if(!empty($data['a'])) $data['area'] = $data['a'];
		$data['publicForumsList'] = array();
		
		$this->load->view('forums/home', $data);
	}
	
	
	
	# forums lists
	function forums_list()
	{
		$data = filter_forwarded_data($this);
		
		$data['type'] = $data['t'];
		# TODO: Select list based on type passed
		$data['list'] = array();
		
		$this->load->view('forums/details_list', $data);
	}
	
	
	
	
	
	
}

/* End of controller file */