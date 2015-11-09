<?php
/**
 * This file contains functions that are used in a number of classes or views.
 *
 * @author Al Zziwa <azziwa@newwavetech.co.ug>
 * @version 1.0.0
 * @copyright PSS
 * @created 10/31/2015
 */




# Get a list of options 
# Allowed return values: [div, option]
function get_option_list($obj, $list_type, $return = 'select', $searchBy="", $more=array())
{
	$optionString = '';
	$types = array();
	
	switch($list_type)
	{
		case "financialyears":
			for($i=@date('Y'); $i>(@date('Y') - MAXIMUM_FINANCIAL_HISTORY); $i--)
			{
				if($return == 'div') $optionString .= "<div data-value='".$i."'>Financial Year ".$i."</div>";
				else $optionString .= "<option value='".$i."'>Financial Year ".$i."</option>";
			}
		break;
		
		
		case "organizationtypes":
			$types = array('provider'=>'Provider', 'government_agency'=>'Government Agency', 'pde'=>'Procurement or Disposal Entity');
			foreach($types AS $key=>$row)
			{
				if($return == 'div') $optionString .= "<div data-value='".$key."'>".$row."</div>";
				else $optionString .= "<option value='".$key."' onclick=\"updateFieldLayer('".base_url()."account/type_explanation/t/".$key."','','','type_explanation','')\">".$row."</option>";
			}
		break;
		
		
		case "documenttypes":
			$types = array('provider_registration'=>'Provider Registration Certificate', 'training_completion'=>'Training Completion Certificate');
			foreach($types AS $key=>$row)
			{
				if($return == 'div') $optionString .= "<div data-value='".$key."'>".$row."</div>";
				else $optionString .= "<option value='".$key."'>".$row."</option>";
			}
		break;
		
		
		case "contactreason":
			$types = array('Issues With Registration', 'Report Error On System', 'Can Not Find Document', 'Report Provider Fraud');
			foreach($types AS $key=>$row)
			{
				if($return == 'div') $optionString .= "<div data-value='".$key."'>".$row."</div>";
				else $optionString .= "<option value='".$key."'>".$row."</option>";
			}
		break;
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
	}
	
	
	# Determine which value to return
	if($return == 'objects'){
		return $types;
	}
	else if($return == 'div'){
		return !empty($optionString)? $optionString: "<div data-value=''>No Options</div>";
	}
	else {
		return !empty($optionString)? $optionString: "<option value=''>No Options</option>";
	}
	
}

	



# Get an item from a position in a drop down list
function get_list_item($array, $current, $direction, $return='key')
{
	if(array_key_exists($current, $array)){
		$keys = array_keys($array);
		$length = count($keys);
		$position = array_search($current, $keys);
		
		$newPosition = $position;
		if($direction == 'next') {
			$newPosition = ($position + 1) == $length? 0: ($position + 1);
		} else {
			$newPosition = ($position - 1) < 0? ($length - 1): ($position - 1);
		}
		
		# return the new list item
		return $return == 'value'? $array[$keys[$newPosition]]: $keys[$newPosition];
	}
	return '';
}




?>