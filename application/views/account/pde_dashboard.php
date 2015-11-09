<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMAGE_URL;?>favicon.ico">
	<title><?php echo SITE_TITLE.': Dashboard';?></title>
    
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/external-fonts.css" type="text/css">
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.list.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.shadowbox.css" type="text/css" media="screen" />
</head>

<body>
<table class='body-table water-mark-bg'>
<?php 
$this->load->view('addons/secure_header');
$this->load->view('addons/admin_top_menu', array('__page'=>'my_dashboard'));
?>

<tr>
  <td>&nbsp;</td>
  <td style='text-align: left; padding-top:25px;'>
  <select id='year__financialyears' name='year__financialyears' class='drop-down'>
  <?php echo get_option_list($this, 'financialyears');?>
  </select></td>
  <td>&nbsp;</td>
</tr>

<tr>
  <td>&nbsp;</td>
  <td class='three-columns' style='height:calc(93vh - 200px); padding-top:20px;'>
<div><table class='summary-table'>
<tr><td style='text-align:center;height:30vh;'><span  class='h1'>22</span>
<br /><span class='h3 blue'>Procurement Plans Submitted</span></td></tr>
<tr><td><a href='javascript:;'>Add Procurement Plan</a></td></tr>
<tr><td><a href='javascript:;'>Manage Procurement Plan</a></td></tr>
</table></div>

<div><table class='summary-table'>
<tr><td style='text-align:center;height:30vh;'><span  class='h1'>1000</span>
<br /><span class='h3 blue'>Tenders Advertised</span></td></tr>
<tr><td><a href='javascript:;'>Invite For Tenders</a></td></tr>
<tr><td><a href='javascript:;'>Manage Tenders</a></td></tr>
</table></div>

<div><table class='summary-table'>
<tr><td style='text-align:center;height:30vh;'><span  class='h1'>760</span>
<br /><span class='h3 blue'>Contracts Awarded</span></td></tr>
<tr><td><a href='javascript:;'>Award Contract</a></td></tr>
<tr><td><a href='javascript:;'>Manage Contracts</a></td></tr>
</table></div>

</td>
  <td>&nbsp;</td>
</tr>

<?php $this->load->view('addons/secure_footer');?>

</table>
<?php echo minify_js('home', array('jquery-2.1.1.min.js', 'jquery-ui.js', 'jquery.form.js', 'pss.js', 'pss.shadowbox.js'));?>
</body>
</html>