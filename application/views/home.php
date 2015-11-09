<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMAGE_URL;?>favicon.ico">
	<title><?php echo SITE_TITLE;?></title>
    
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/external-fonts.css" type="text/css">
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.list.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.shadowbox.css" type="text/css" media="screen" />
</head>

<body>
<table class='body-table water-mark-bg'>
<?php $this->load->view('addons/public_header');?>

<tr>
  <td>&nbsp;</td>
  <td class='three-columns' style='height:calc(85vh - 214px);'>
<div><table class='summary-table'>
<tr><th class='h3 blue'>Welcome</th></tr>
<tr><td><a href='<?php base_url();?>page/about'>About This Portal</a></td></tr>
<tr><td><a href='javascript:;'>The Directorate of Public Procurement</a></td></tr>
<tr><td><a href='javascript:;'>Laws and Regulations</a></td></tr>
<tr><td><a href='http://www.grss-mof.org' target="_blank">Ministry of Finance Website</a></td></tr>
<tr><td><a href='<?php base_url();?>forums/index/a/frequently_asked_questions'>Frequently Asked Questions</a></td></tr>
<tr><td><div class='btn stripped-black' data-rel='resources'>More Resources</div></td></tr>
</table></div>

<div><table class='summary-table'>
<tr><th class='h3 blue'>For Providers</th></tr>
<tr><td><a href='javascript:;'>Registration Requirements</a></td></tr>
<tr><td><a href='<?php echo BASE_URL;?>page/privacy_policy'>Privacy Policy</a></td></tr>
<tr><td><a href='<?php echo BASE_URL;?>tenders'>Tender Notices</a></td></tr>
<tr><td><a href='<?php echo BASE_URL;?>account/login/a/view_subscription'>Your Subscription</a></td></tr>
<tr><td><a href='<?php echo BASE_URL;?>account/login/a/download_certificate'>Download Certificate</a></td></tr>
<tr><td><div class='btn stripped-black' data-rel='page/portal'>More Services</div></td></tr>
</table></div>

<div><table class='summary-table'>
<tr><th class='h3 blue'>For Government Agencies</th></tr>
<tr><td><a href='<?php echo BASE_URL;?>providers'>Find Providers</a></td></tr>
<tr><td><a href='<?php echo BASE_URL;?>resources/index/a/standards'>Get Standard Forms</a></td></tr>
<tr><td><a href='javascript:;'>Procurement Regulations</a></td></tr>
<tr><td><a href='<?php echo BASE_URL;?>resources/index/a/training_activities'>Training Activities</a></td></tr>
<tr><td><a href='<?php echo BASE_URL;?>resources/index/a/important_links'>Important Links</a></td></tr>
<tr><td><div class='btn stripped-black' data-rel='page/portal'>More Services</div></td></tr>
</table></div>

</td>
  <td>&nbsp;</td>
</tr>

<?php $this->load->view('addons/public_footer');?>

</table>
<?php echo minify_js('home', array('jquery-2.1.1.min.js', 'jquery-ui.js', 'jquery.form.js', 'pss.js', 'pss.shadowbox.js'));?>
</body>
</html>