<div id="resourcesearch__1">
<table>


<?php if($type == 'public_forums'){ ?>
<tr><th>Question</th><th>Category</th><th>Contributors</th><th>Date</th></tr>
<tr><td >What's causing the delay in Kima Road construction?</td><td><span class='grey-box'>Works</span></td><td>(3)</td><td>14/11/2014</td></tr>
<tr><td >Ways to reward honest contractors</td><td><span class='grey-box'>Legal</span></td><td>(45)</td><td>14/11/2014</td></tr>
<tr><td >Public Procurement Bill MoFEP</td><td><span class='grey-box'>Works</span></td><td>(9)</td><td>14/11/2014</td></tr>
<tr><td >Mistakes in disposal of Sekit Dam equipment</td><td><span class='grey-box'>Legal</span></td><td>(10)</td><td>14/11/2014</td></tr>
<tr><td >How to use the new registration section</td><td><span class='grey-box'>Legal</span></td><td>(11)</td><td>14/11/2014</td></tr>
<?php }  

else if($type == 'secure_forums'){ ?>
<tr><th>Question</th><th>Category</th><th>Contributors</th><th>Date</th></tr>
<tr><td >What were the objectives of reforming the procurement and disposal system in Local Governments?</td><td><span class='grey-box'>Works</span></td><td>(3)</td><td>14/11/2014</td></tr>
<tr><td >What is the role of councillors?</td><td><span class='grey-box'>Legal</span></td><td>(45)</td><td>14/11/2014</td></tr>
<tr><td >Who is the Accounting Officer in Districts or Municipalities?</td><td><span class='grey-box'>Legal</span></td><td>(11)</td><td>14/11/2014</td></tr>


<?php }  

else if($type == 'frequently_asked_questions'){ ?>
<tr><th>Question</th>
  <th colspan="3">Answer</th></tr>
<tr><td >What is microprocurement?</td><td colspan="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque blandit nulla non bibendum.</td></tr>
<tr><td >What is a procurement plan</td><td colspan="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque blandit nulla non bibendum.</td></tr>
<tr><td >What is Sale to Public Officers?</td><td colspan="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque blandit nulla non bibendum.</td></tr>
<tr><td >What is a procurement plan</td><td colspan="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque blandit nulla non bibendum.</td></tr>
<tr><td >What is Sale to Public Officers?</td><td colspan="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec scelerisque blandit nulla non bibendum.</td></tr>

<?php }  

else { 
	echo "<tr><td>".format_notice($this, 'WARNING: List can not be generated.')."</td></tr>";
}?>


</table>
</div>