<tr class='step-ribbon'>
  <td>&nbsp;</td><td><table><tr>
  		<td <?php echo (empty($step) || !empty($step)? " class='active btn' data-rel='account/register/step/1'": '');?>>1. Choose Account Type</td>
    	<td <?php echo (!empty($step) && $step > '1'? " class='active btn' data-rel='account/register/step/2'": '');?>>2. About Your Account</td>
    	<td <?php echo (!empty($step) && $step > '2'? " class='active btn' data-rel='account/register/step/3'": '');?>>3. Contact Information</td>
        <td <?php echo (!empty($step) && $step > '3'? " class='active btn' data-rel='account/register/step/4'": '');?>>4. Login</td>
    </tr></table></td><td>&nbsp;</td>
</tr>