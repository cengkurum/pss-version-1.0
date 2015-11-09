<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="<?php echo IMAGE_URL;?>favicon.ico">
	<title><?php echo SITE_TITLE.': Standards';?></title>
    
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/external-fonts.css" type="text/css">
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.list.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php echo base_url();?>assets/css/pss.shadowbox.css" type="text/css" media="screen" />
</head>

<body>
<table class='body-table water-mark-bg'>
<?php $this->load->view('addons/public_header');

$this->load->view('addons/top_menu', array('__page'=>'standards'));
?>

<tr>
  <td>&nbsp;</td>
  <td style='height:calc(85vh - 214px);'>
<div class='body-title'>Standards</div>
<div class="body-content"><table>
<tr><td>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque blandit nulla non bibendum. Donec blandit ultricies eros. Suspendisse quis nisi volutpat justo tincidunt vehicula vitae sit amet tellus. Sed lacus turpis, dignissim non arcu ac, dictum maximus dui. Nulla congue orci at libero facilisis aliquet. Sed in mauris et eros ornare pretium eu ac quam. Phasellus metus erat, faucibus ut commodo non, varius eu felis. Morbi sit amet lacus maximus, placerat augue eget, ornare velit.
<br /><br />
Ut rhoncus vel lacus nec sagittis. Quisque rutrum lectus sed magna tempus facilisis. Nunc auctor, neque ut cursus blandit, nibh libero pharetra turpis, et dignissim mi dolor sit amet mi. Nullam scelerisque magna eu mi facilisis, at posuere dolor imperdiet. Sed vitae arcu eu libero bibendum scelerisque a nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis efficitur sem, sit amet condimentum enim scelerisque et. Nam mollis turpis a aliquam iaculis. Curabitur cursus sollicitudin ante, eu aliquam dui vehicula eget. Morbi tempor sollicitudin porttitor. Donec in feugiat purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec eget justo orci.
<br /><br />

Ut rhoncus vel lacus nec sagittis. Quisque rutrum lectus sed magna tempus facilisis. Nunc auctor, neque ut cursus blandit, nibh libero pharetra turpis, et dignissim mi dolor sit amet mi. Nullam scelerisque magna eu mi facilisis, at posuere dolor imperdiet. Sed vitae arcu eu libero bibendum scelerisque a nec nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis efficitur sem, sit amet condimentum enim scelerisque et. Nam mollis turpis a aliquam iaculis. Curabitur cursus sollicitudin ante, eu aliquam dui vehicula eget. Morbi tempor sollicitudin porttitor. Donec in feugiat purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec eget justo orci. 
<br /><br />

</td></tr>
</table></div>


</td>
  <td>&nbsp;</td>
</tr>

<?php $this->load->view('addons/public_footer');?>

</table>
<?php echo minify_js('home', array('jquery-2.1.1.min.js', 'jquery-ui.js', 'jquery.form.js', 'pss.js', 'pss.shadowbox.js'));?>
</body>
</html>