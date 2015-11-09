<?php 
$jquery = "<script src='".base_url()."assets/js/jquery.min.js' type='text/javascript'></script>";
$javascript = "<script type='text/javascript' src='".base_url()."assets/js/pss.js'></script>".get_ajax_constructor(TRUE); 
$tableHTML = "<link rel='stylesheet' href='".base_url()."assets/css/pss.css' type='text/css' media='screen' />"; 


if(!empty($area) && $area == "dropdown_list")
{
	$tableHTML .= !empty($list)? $list: "";
}




echo $tableHTML;
?>