<?php
/*
 * This document includes all global settings required for operation of the system
 *
 */
 

	 
/*
 *---------------------------------------------------------------
 * APPLICATION ENVIRONMENT
 *---------------------------------------------------------------
 *
 * You can load different configurations depending on your
 * current environment. Setting the environment also influences
 * things like logging and error reporting.
 * 
 * This can be set to anything, but default usage is:
 *
 *     development
 *     testing
 *     production
 *
 * NOTE: If you change these, also change the error_reporting() code below
 */
	define('ENVIRONMENT', 'development');
 
 
/*
 *---------------------------------------------------------------
 * GLOBAL SETTINGS
 *---------------------------------------------------------------
 */
	define('SECURE_MODE', FALSE);
	
	define('BASE_URL', 'http://localhost/pss/');#Set to HTTPS:// if SECURE_MODE = TRUE

	define('RETRIEVE_URL_DATA_IGNORE', 3);#The starting point to obtain the passed url data
	
	define('SITE_TITLE', "Public Procurement Portal");
		
	define('SITE_SLOGAN', "");

	define('SYS_TIMEZONE', "America/Los_Angeles");
	
	define('NUM_OF_ROWS_PER_PAGE', "5");
		
	define('NUM_OF_LISTS_PER_VIEW', "10");
	
	define('IMAGE_URL', BASE_URL."assets/images/");
	
	define('HOME_URL', getcwd()."/");
	
	define('DEFAULT_CONTROLLER', 'page');
	
	define('LABEL_DIRECTORY',  HOME_URL."assets/labels/");
	
	define('UPLOAD_DIRECTORY',  HOME_URL."assets/uploads/");
	
	define('MAX_FILE_SIZE', 40000000);
	
	define('ALLOWED_EXTENSIONS', ".doc,.docx,.txt,.pdf,.xls,.xlsx,.jpeg,.png,.jpg,.gif");
	
	define('MAXIMUM_FILE_NAME_LENGTH', 100);
	
	define("MINIFY", FALSE);
	
	define('PORT_HTTP', '80');
  
  	define('PORT_HTTP_SSL', '443');
	
	define('PHP_LOCATION', "php5");

 	define('ENABLE_PROFILER', FALSE); #See perfomance stats based on set benchmarks

	define('DOWNLOAD_LIMIT', 10000); #Max number of rows that can be downloaded

	define('MAXIMUM_FINANCIAL_HISTORY', 5); # Number of years the financial history goes back




/*
 *
 *	0 = Disables logging, Error logging TURNED OFF
 *	1 = Error Messages (including PHP errors)
 *	2 = Debug Messages
 *	3 = Informational Messages
 *	4 = All Messages
 *	The log file can be found in: [HOME_URL]application/logs/
 *	Run >tail -n50 log-YYYY-MM-DD.php to view the errors being generated
 */
	define('LOG_ERROR_LEVEL', 0);


			
/*
 *--------------------------------------------------------------------------
 * URI PROTOCOL
 *--------------------------------------------------------------------------
 *
 * The default setting of "AUTO" works for most servers.
 * If your links do not seem to work, try one of the other delicious flavors:
 *
 * 'AUTO'	
 * 'REQUEST_URI'
 * 'PATH_INFO'	
 * 'QUERY_STRING'
 * 'ORIG_PATH_INFO'
 *
 */
	
	define('URI_PROTOCOL', 'AUTO'); // Set "AUTO" For WINDOWS
									       // Set "REQUEST_URI" For LINUX




/*
 *---------------------------------------------------------------
 * QUERY CACHE SETTINGS
 *---------------------------------------------------------------
 */
 	
	define('ENABLE_QUERY_CACHE', FALSE); 
 	
 	define('MESSAGE_FILE', HOME_URL.'application/helpers/message_list_helper.php');  





/*
 *---------------------------------------------------------------
 * DATABASE SETTINGS
 *---------------------------------------------------------------
 */

	define('HOSTNAME', "localhost");	        
	
	define('USERNAME', "root");
	
	define('PASSWORD', "");
	
	define('DATABASE', "pss_v1");
	
	define('DBDRIVER', "mysqli");
	
	define('DBPORT', "3306");

/*
 *---------------------------------------------------------------
 * COMMUNICATION SETTINGS
 *---------------------------------------------------------------
 */

define("NOREPLY_EMAIL", "");#TODO set no-reply email

define("HELP_EMAIL", ""); #TODO set help email

define('SITE_ADMIN_MAIL', ""); #TODO set site admin email

define('SITE_ADMIN_NAME', ""); #TODO set site admin name

define('SITE_GENERAL_NAME', "PSS");


?>