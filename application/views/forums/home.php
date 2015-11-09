<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMAGE_URL;?>favicon.ico">
	<title><?php echo SITE_TITLE.': Resources';?></title>
    
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

$this->load->view('addons/public_top_menu', array('__page'=>'faqs'));
?>



<tr>
  <td>&nbsp;</td>
  <td class='one-column' style='height:calc(85vh - 255px); padding-bottom: 20px;'>

<table class='home-list-table'>
<tr><th class='h3 blue rop-icon'>Frequently Asked Questions</th><th class='btn closer' data-rel='page/portal'></th></tr>
<tr><td colspan='2'>
<table class='list-tabs' data-type='paginationdiv__faqsearch' data-page='forums/forums_list'><tr>
<td id='public_forums' <?php if(empty($area) || !empty($area) && $area == 'public_forums') echo "class='active'";?>>Public</td>
<td id='secure_forums' <?php if(!empty($area) && $area == 'secure_forums') echo "class='active'";?>>Secure</td>
<td id='frequently_asked_questions' <?php if(!empty($area) && $area == 'frequently_asked_questions') echo "class='active'";?>>Frequently Asked Questions</td>
</tr></table>
</td></tr>
<tr><td colspan='2'><div id='paginationdiv__faqsearch_list' class='page-list-div'>
<?php $this->load->view('forums/details_list',array('type'=>(!empty($area)? $area: 'public_forums'),'list'=>$publicForumsList));?>
</div></td></tr>
<tr><td colspan='2'>
<table><tr><td>
         
<div id='faq_pagination_div' class='pagination' style="margin:0px;padding:0px; display:inline-block;"><div id="faqssearch" class="paginationdiv no-scroll"><div class="previousbtn" style='display:none;'>&#x25c4;</div><div class="selected">1</div><div class="nextbtn">&#x25ba;</div></div><input name="paginationdiv__faqsearch_action" id="paginationdiv__faqsearch_action" type="hidden" value="<?php echo base_url()."lists/load/t/faqs";?>" />
<input name="paginationdiv__faqsearch_maxpages" id="paginationdiv__faqsearch_maxpages" type="hidden" value="<?php echo NUM_OF_LISTS_PER_VIEW;?>" />
<input name="paginationdiv__faqsearch_noperlist" id="paginationdiv__faqsearch_noperlist" type="hidden" value="<?php echo NUM_OF_ROWS_PER_PAGE;?>" />
<input name="paginationdiv__faqsearch_showdiv" id="paginationdiv__faqsearch_showdiv" type="hidden" value="paginationdiv__faqsearch_list" />
<input name="paginationdiv__faqsearch_extrafields" id="paginationdiv__faqsearch_extrafields" type="hidden" value="" /></div>
          

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