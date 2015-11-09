<div id="providersearch__1">
<table>


<?php if($type == 'active_providers'){ ?>
<tr><th>Provider</th><th>Category</th><th>Registered</th><th>Location</th><th>Founded</th></tr>

<tr><td>PricewaterhouseCoopers, LLP</td><td>Audit</td><td>28/02/2014</td><td>New York City, NY, USA</td><td>1998</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<?php }  

else if($type == 'suspended_providers'){ ?>
<tr><th>Provider</th><th>Category</th><th>Registered</th><th>Location</th><th>Founded</th></tr>

<tr><td>Bashira Investments Ltd</td><td>Audit</td><td>28/02/2014</td><td>New York City, NY, USA</td><td>1998</td></tr>
<tr><td>Muriromu General Engineering & Construction Co.</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Muteco International Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<tr><td>Millenial Publishing Ltd</td><td>Education</td><td>14/11/2014</td><td>Kampala, Uganda</td><td>2002</td></tr>
<?php }  


else { 
	echo "<tr><td>".format_notice($this, 'WARNING: List can not be generated.')."</td></tr>";
}?>


</table>
</div>