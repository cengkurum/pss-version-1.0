<?php

/**
 * This class manages interaction with API.
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/20/2015
 */
class _api extends CI_Model
{
	
	# Constructor to set some default values at class load
	public function __construct()
    {
        parent::__construct();
    }
	
	
	# Get data from the API
	function get($url, $variables=array())
	{
		#$result = $this->execute('GET', $url, $variables);
		#TODO: Add handling result
		$user = file_get_contents('http://localhost:8888/pss/backend/v1/account/index?id=CT5852345');
  		$user = json_decode($user, true);
		print_r($user);
		
		return array();#$result;
	}
	
	
	
	
	# Execute a request
	function execute($type, $partUrl, $data=array(), $files=array())
	{
		#Convert data to JSON
		$json = json_encode($data);
		
		#Handle posting files
		if(!empty($files)) 
		{
			foreach($files AS $fileName=>$file) $json[$fileName] = '@'.realpath($file).';filename='.$fileName;
		}
		
		#Initialize the cURL
		$curl = curl_init();
		
		#Set the cURL options
		#---------------------------------------------------------------
    	curl_setopt($curl, CURLOPT_URL, API_URL.$partUrl);
		
		#Set the method options based on the type
		if($type == 'GET') curl_setopt($curl, CURLOPT_POST, 0);
		if($type == 'POST') curl_setopt($curl, CURLOPT_POST, 1);
		if($type == 'PUT') curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'PUT');
    	if($type == 'DELETE') curl_setopt($curl, CURLOPT_CUSTOMREQUEST, 'DELETE');

		#Set the post fields
		curl_setopt($curl, CURLOPT_POSTFIELDS, $json);
    	
		#Set HTTP header variables
    	curl_setopt($curl, CURLOPT_HTTPHEADER, 
			array('Content-Type: application/json',
			#'Content-Length: ' . strlen($json),
			'X-APPLICATION-ID: web-001',
			'X-API-KEY: '.API_KEY)
		);
    	
		#Return the result
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		#Set the user agent
		curl_setopt($curl, CURLOPT_USERAGENT, 'Pss-Web/1.0.0 Web/1.0.0a');
		#---------------------------------------------------------------
		
		#Execute the cURL
		$result = curl_exec($curl);
		curl_close($curl);
		
		#Return the result from the cURL execution
		return json_decode($result);
	}
	
}


?>