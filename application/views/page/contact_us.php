<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMAGE_URL;?>favicon.ico">
	<title><?php echo SITE_TITLE.': Contact Us';?></title>
    
     <link rel="stylesheet" href="<?php echo base_url();?>assets/css/external-fonts.css" type="text/css">
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.list.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.shadowbox.css" type="text/css" media="screen" />
</head>

<body>
<table class='body-table water-mark-bg'>
<?php $this->load->view('addons/public_header');

$this->load->view('addons/public_top_menu', array('__page'=>'contact_us'));
?>

<tr>
  <td>&nbsp;</td>
  <td style='height:calc(85vh - 214px);'>


<div class='center-block body-table-border left-div' style='margin:15px; width:100%; max-width:600px;'>
<table class='normal-table microform two-columns'>
<tr><td colspan='2' class='body-title'>Contact Us</td></tr>
<?php if(!empty($msg)) echo "<tr><td colspan='2' style='text-align:left;'>".format_notice($this,$msg)."</td></tr>";?>
<tr>
    <td>Your Name: </td>
    <td><input type="text" id="yourname" name="yourname" value="" maxlength="100"/></td>
  </tr>
  <tr>
    <td>Email Address: </td>
    <td><input type="text" id="emailaddress" name="emailaddress" class="email" value="" maxlength="100"/></td>
  </tr>
  <tr>
    <td>Telephone: </td>
    <td><input type="text" id="telephone" name="telephone" placeholder="Optional (e.g: 0782123456)" class="numbersonly telephone optional" value="" maxlength="10"/></td>
  </tr>
  <tr>
    <td>Reason: </td>
    <td><input type="text" id="reason__contactreason" name="reason__contactreason" placeholder="Enter or Select reason" class="drop-down searchable do-not-clear" value=""/></td>
  </tr>
  <tr>
    <td valign="top">Message: </td>
    <td><textarea id="details" name="details" placeholder="Enter your message here" style="height:120px;"></textarea></td>
  </tr>
  <tr>
    <td colspan="2"><button type="button" id="verifydocument" name="verifydocument" class="btn green" style="width:100%;">Send Message</button></td>
  </tr>
  
  <tr>
    <td colspan="2">
<span class="bold">ADDRESS:</span>
<br>Ministry of Finance and Economic Planning
<br>P.O. Box 80
<br>Juba
<br>Republic of South Sudan
</td>
  </tr>
  
</table>
</div>




</td>
  <td>&nbsp;</td>
</tr>

<?php $this->load->view('addons/public_footer');?>

</table>





<?php echo minify_js('home', array('jquery-2.1.1.min.js', 'jquery-ui.js', 'jquery.form.js', 'pss.js', 'pss.shadowbox.js', 'pss.fileform.js'));?>
</body>
</html>