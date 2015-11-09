<div id="resourcesearch__1">
<table>


<?php if($type == 'documents'){ ?>
<tr><th>Name</th><th>Type</th><th>Size</th><th>Posted</th></tr>
<tr><td class='msdoc-icon-row'>Public Procurement Bill MoFEP</td><td>Legal</td><td>2.3MB</td><td>14/11/2014</td></tr>
<tr><td class='file-icon-row'>Public Procurement Bill MoFEP</td><td>Legal</td><td>2.3MB</td><td>14/11/2014</td></tr>
<tr><td class='msppt-icon-row'>Public Procurement Bill MoFEP</td><td>Audit</td><td>2.3MB</td><td>14/11/2014</td></tr>
<tr><td class='pdf-icon-row'>Effects of Corruption in Developing Countries 2013</td><td>Legal</td><td>567KB</td><td>14/11/2014</td></tr>
<tr><td class='msppt-icon-row'>Public Procurement Bill MoFEP</td><td>Audit</td><td>2.3MB</td><td>14/11/2014</td></tr>
<tr><td class='file-icon-row'>Effects of Corruption in Developing Countries 2013</td><td>Legal</td><td>567KB</td><td>14/11/2014</td></tr>
<?php }  

else if($type == 'important_links'){ ?>
<tr>
  <th colspan="4">Links</th>
  </tr>

<tr><td colspan="4" >How to register</td>
</tr>
<tr><td colspan="4" >The procurement procedure.</td></tr>
<tr><td colspan="4" >Dangers in breaching contracts</td></tr>
<tr><td colspan="4" >Avoidable Causes of Delays in Bid Evaluation</td></tr>

<?php }  

else if($type == 'standards'){ ?>
<tr><th>Name</th><th>Type</th><th>Size</th><th>Posted</th></tr>

<tr><td class='msdoc-icon-row'>Case Studies</td><td>Legal</td><td>2.3MB</td><td>14/11/2014</td></tr>
<tr><td class='pdf-icon-row'>Rejection of contracts</td><td>Legal</td><td>2.3MB</td><td>14/11/2014</td></tr>
<tr><td class='msppt-icon-row'>Dangers in breaching contracts</td><td>Audit</td><td>2.3MB</td><td>14/11/2014</td></tr>
<tr><td class='pdf-icon-row'>Complaining to the tribunal</td><td>Legal</td><td>567KB</td><td>14/11/2014</td></tr>

<?php }  

else if($type == 'training_activities'){ ?>
<tr><th>Name</th>
  <th>Date</th>
  <th colspan="2">Time</th></tr>

<tr><td >Approval Training</td><td>14/11/2014</td>
  <td colspan="2">3:00pm</td></tr>
<tr><td >Bidding Training</td><td>14/11/2014</td>
  <td colspan="2">2:00pm</td></tr>
<tr><td >Sell of Bidding Document</td><td>14/11/2014</td>
  <td colspan="2">1:00pm</td></tr>
<tr><td >Complaining to the tribunal</td><td>14/11/2014</td>
  <td colspan="2">12:00pm</td></tr>

<?php } 


else { 
	echo "<tr><td>".format_notice($this, 'WARNING: List can not be generated.')."</td></tr>";
}?>


</table>
</div>