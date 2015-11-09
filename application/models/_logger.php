<?php
/**
 * Logs events on the system.
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/20/2015
 */
class _logger extends CI_Model
{
	
	# Add an event
	function add_event($eventDetails)
	{
		return $this->_query_reader->run('add_event_log', array(
			'user_id'=>(!empty($eventDetails['user_id'])? $eventDetails['user_id']: ''), 
			'activity_code'=>$eventDetails['activity_code'], 
			'result'=>$eventDetails['result'], 
			'uri'=>(!empty($eventDetails['uri'])? $eventDetails['uri']: uri_string()), 
			'log_details'=>$eventDetails['log_details'], 
			'ip_address'=>(!empty($eventDetails['ip_address'])? $eventDetails['ip_address']: $this->input->ip_address())
		));
	}
		
}


?>