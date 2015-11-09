<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMAGE_URL;?>favicon.ico">
	<title><?php echo SITE_TITLE.': Register of Providers';?></title>
    
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/external-fonts.css" type="text/css">
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.list.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.shadowbox.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.pagination.css" type="text/css" media="screen" />
</head>

<body>
<table class='body-table water-mark-bg'>
<?php 
$this->load->view('addons/public_header');

$this->load->view('addons/top_menu', array('__page'=>'providers'));
?>



<tr>
  <td>&nbsp;</td>
  <td class='one-column' style='height:calc(85vh - 255px); padding-bottom: 20px;'>

<table class='home-list-table'>
<tr><th class='h3 blue rop-icon'>Registry of Providers</th><th class='btn closer' data-rel='page/portal'></th></tr>
<tr><td colspan='2'>
<table class='list-tabs' data-type='paginationdiv__providersearch' data-page='provider/provider_list'><tr>
<td id='active_providers' class='active'>Active Providers</td>
<td id='suspended_providers'>Suspended Providers</td>
</tr></table>
</td></tr>
<tr><td colspan='2'><div id='paginationdiv__providersearch_list' class='page-list-div'>
<?php $this->load->view('provider/details_list',array('type'=>'active_providers','list'=>$activeProvidersList));?>
</div></td></tr>
<tr><td colspan='2'>
<table><tr><td>
         
<div id='provider_pagination_div' class='pagination' style="margin:0px;padding:0px; display:inline-block;"><div id="providersearch" class="paginationdiv no-scroll"><div class="previousbtn" style='display:none;'>&#x25c4;</div><div class="selected">1</div><div class="nextbtn">&#x25ba;</div></div><input name="paginationdiv__providersearch_action" id="paginationdiv__providersearch_action" type="hidden" value="<?php echo base_url()."lists/load/t/provider";?>" />
<input name="paginationdiv__providersearch_maxpages" id="paginationdiv__providersearch_maxpages" type="hidden" value="<?php echo NUM_OF_LISTS_PER_VIEW;?>" />
<input name="paginationdiv__providersearch_noperlist" id="paginationdiv__providersearch_noperlist" type="hidden" value="<?php echo NUM_OF_ROWS_PER_PAGE;?>" />
<input name="paginationdiv__providersearch_showdiv" id="paginationdiv__providersearch_showdiv" type="hidden" value="paginationdiv__providersearch_list" />
<input name="paginationdiv__providersearch_extrafields" id="paginationdiv__providersearch_extrafields" type="hidden" value="" /></div>
          

</td><td width='1%' class='filter-list'>FILTER</td></tr></table>
</td></tr>
</table>







</td>
<td>&nbsp;</td>
</tr>

<?php $this->load->view('addons/public_footer');?>

</table>
<?php echo minify_js('home_portal', array('jquery-2.1.1.min.js', 'jquery-ui.js', 'jquery.form.js', 'pss.js', 'pss.shadowbox.js', 'pss.list.js'));?>
</body>
</html>