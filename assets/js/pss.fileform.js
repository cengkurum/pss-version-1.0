// JavaScript Document



$(function() {	
	// --------------------------------------------------------------------------------------------------------
	// Handling a login form (exposed form to public)
	// --------------------------------------------------------------------------------------------------------
	if($('#submitlogin').length > 0)
	{
		var loginForm = $('#submitlogin').parents('form').first();
		
		$('#loginusername, #loginpassword').on('keyup', function(){
			if($('#loginusername').val().length > 4 && $('#loginpassword').val().length > 4){
				$('#submitlogin').after("<input type='hidden' name='verified' id='verified' value='Y' />");
				if(localStorage.getItem('__latitude') !== null) $('#submitlogin').after("<input type='hidden' name='latitude' id='latitude' value='"+localStorage.getItem('__latitude')+"' />");
				if(localStorage.getItem('__longitude') !== null) $('#submitlogin').after("<input type='hidden' name='longitude' id='longitude' value='"+localStorage.getItem('__longitude')+"' />");
				
				loginForm.attr("action", getBaseURL()+"account/login");
				$('#submitlogin').attr("type", "submit");
				$('#submitlogin').removeClass('grey').addClass('green');
			}
			else
			{
				$('#submitlogin').attr("type", "button");
				loginForm.find('#verified').first().remove();
				loginForm.attr("action", "");
				$('#submitlogin').removeClass('green').addClass('grey');
			}
		});
	}
	
	
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Handling select fields
	// --------------------------------------------------------------------------------------------------------
	$(document).on('click', '.searchable, .drop-down-link', function(){
		var fieldId = $(this).attr('id');
		var listType = fieldId.split('__').pop();
		
		//Does the list always have to be refreshed?
		if($('#'+fieldId+'__div').length > 0 && $(this).hasClass('always-refresh')) $('#'+fieldId+'__div').remove();
		
		//Show the options for the select field. First create the div if its not available
		if($('#'+fieldId+'__div').length > 0)
		{
			//In cases where you are coming back to the page from another page
			if($('#'+fieldId+'__div').html() == ''){
				$('#'+fieldId+'__div').width($('#'+fieldId).outerWidth());//Set its width to be the same as that of the field
				updateFieldLayer(getBaseURL()+"page/get_custom_drop_list/type/"+listType+addSelectVariables($('#'+fieldId)),'','',fieldId+'__div','');
			} 
			//In cases where you are just showing the same page div that you have just loaded
			else 
			{
				$('#'+fieldId+'__div').fadeIn('fast');
			}
		}
		else
		{
			$('#'+fieldId).before("<div id='"+fieldId+"__div' class='drop-down-div'></div><input type='hidden' id='"+fieldId+"__hidden' name='"+fieldId+"__hidden' value=''>");//Add the field div and value hidden field
			$('#'+fieldId+'__div').css('min-width', $('#'+fieldId).outerWidth());//Set its width to be the same as that of the field
			updateFieldLayer(getBaseURL()+"page/get_custom_drop_list/type/"+listType+addSelectVariables($('#'+fieldId)),'','',fieldId+'__div','');
		}
		
		//Reposition the drop down either above or below field based on its location
		repositionDropDownDiv(fieldId);
	});
	
	
	
	
	
	// Handle selecting an option in the field
	$(document).on('click focus', '.drop-down-div div', function(e){
		var fieldId = $(this).parent('div').attr('id').replace(/\__div/g, '');
		var fieldOffset = $(this).offset().left;
		var clickedDiv = $(this);
		
		if($(this).hasClass('delete-icon') && (e.pageX > fieldOffset &&  e.pageX > (fieldOffset + $(this).width() - 25))){
			$.ajax({
        		type: "POST",
       			url: getBaseURL()+clickedDiv.data('url'),
      			data: {},
      			beforeSend: function() {},
      	 		success: function(data) {
					showServerSideFadingMessage(data);
				}
   			});
			
		}
		else
		{
			// Replace the selected value based on the type of caller (field/link)
			if($(this).html() != 'No Options' && $(this).data('value') != '') {
				if($('#'+fieldId).hasClass('drop-down-link')) $('#'+fieldId).text($(this).html());
				else $('#'+fieldId).val($(this).html().replace( /&amp;/g, "&" ));
			} else {
				if(!$('#'+fieldId).hasClass('drop-down-link')) $('#'+fieldId).val('');
			}
		
			// Also fill the hidden value for the field with the real value
			if($(this).data('value') != 'No Options' && $(this).data('value') != '') 
			{
				$('#'+fieldId+'__hidden').val($(this).data('value')); 
			} else {
				$('#'+fieldId+'__hidden').val('');
			}
			$(this).parent('div').fadeOut('fast');
		}
		 
	});
	
	
	//Handle the select field loosing focus
	$(document).on('focusout', '.searchable, .drop-down-link', function(){
		var fieldId = $(this).attr('id');
		//Close the select div list if it was not the target of the next click
		if(!$('#'+fieldId+'__div').is(":focus") && !$('#'+fieldId+'__div button').is(":focus")) 
    	{
       	 	$('#'+fieldId+'__div').fadeOut('fast');
			// Now if this is searchable clear the field if it is not among the list of selectable options
			var fieldValue = $(this).val();
			var isIn = false;
			$('#'+fieldId+'__div').children('div').each(function(){
				if($(this).data('value') == fieldValue) 
				{
					isIn = true;
					return false;
				}
			});
			//Clear
			if(!isIn && !$(this).hasClass('do-not-clear')) $(this).val('');
    	}
	});
	
	
	
	
	// Handle cases where the select field is searchable
	$(document).on('keyup', '.searchable, .drop-down-link', function(){
		var fieldId = $(this).attr('id');
		var listType = fieldId.split('__').pop();
		var searchValue = ($(this).val() != ''? '/search_by/'+replaceBadChars($(this).val()): '');
		
		updateFieldLayer(getBaseURL()+"page/get_custom_drop_list/type/"+listType+searchValue+addSelectVariables($(this)),'','',fieldId+'__div','');
	});
	
	
	// Close the drop down divs if the user resizes the window
	$(window).resize(function() { 
		$('.drop-down-div').fadeOut('fast');
	});
	
	
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Handling simple form validation on the fly
	// --------------------------------------------------------------------------------------------------------
	
	//Activate form submission if the required fields are filled in
	$(document).on('change', '.simpleform input', function(e){
		var activate = true;
		var form = $(this).parents('.simpleform').first();
		form.find('input').each(function(){
			if(!$(this).hasClass('optional') 
				&& $(this).attr('type') == 'text' 
				&& $(this).val().length < 3
			){
				activate = false; 
				return false;
			}
		});
		
		//Now activate the form if the user has all fields filled
		var formBtn = form.find('.submitbtn').first();
		if(activate){
			formBtn.attr('onclick',"postFormFromLayer('"+form.attr('id')+"')");
			formBtn.removeClass('greybtn').addClass('btn');
		} 
		else 
		{
			formBtn.removeAttr('onclick');
			formBtn.removeClass('btn').addClass('greybtn');
		}
	});
	
	$(document).on('click', '.submitbtn', function(){
		if($(this).hasClass('greybtn')){
			showServerSideFadingMessage('Enter all required fields to continue.');
		}
	});
	
	
	
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Handling simple form validation after submit
	// --------------------------------------------------------------------------------------------------------
	$(document).on('submit', '.simplevalidator', function(e){
		var formId = $(this).attr('id');
		var hasEmpty = "N";
		var firstEmpty = "";
		
		$(this).find('input, textarea').each(function(){
			if($(this).parents('.ignorearea').first().length == 0 && !$(this).hasClass('optional') && $(this).attr('type') != 'button' && $(this).attr('type') != 'hidden' && $(this).attr('type') != 'submit' 
				&& (($(this).attr('type') == 'radio' && !$("input:radio[name='"+$(this).attr('name')+"']").is(":checked")) 
				|| ($(this).attr('type') != 'radio' && $(this).attr('type') != 'checkbox' && (
						($(this).hasClass('email') && !isValidEmail($(this).attr('id'),''))
						|| ($(this).hasClass('password') && !isValidPassword($(this).attr('id'),''))
						|| ($(this).hasClass('futuredate') && !isFutureDate($(this).val())) 
						|| $(this).val().length < 2
				)))
			){
				//Keep track of the first field to be found empty so that you focus the user to that form
				if(hasEmpty == "N") firstEmpty = $(this).attr('id');
				if($(this).attr('type') == 'text' || $(this).is('textarea')) $(this).css('border', 'solid 3px #FFE79B');
				hasEmpty = "Y";
			}
		});
		
		//Now take the appropriate action
		if(hasEmpty == "Y"){
			//use custom message if provided
			var msg = $('#'+formId).find('#errormessage').first().length? $('#'+formId).find('#errormessage').first().val(): 'Enter all required fields to continue.';
			
			showServerSideFadingMessage(msg);
			$('#'+firstEmpty).focus();
		} else {
			// Disable the form submit button to prevent multiple submissions
			$('#'+formId).find('button[type="submit"]').each(function(){
				$(this).attr('type', 'button');
				$(this).html("<img src='"+getBaseURL()+"assets/images/loading_small.gif' />");
			});
			return true;
		}
		
		e.preventDefault();
	});
	
	
	
	
	
	
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Micro form functionality - picks fields in a zone with the class, submits them to a url specified in 
	// action field and shows the result in the specified results div.
	// --------------------------------------------------------------------------------------------------------
	$(document).on('click', '.microform button.submitmicrobtn', function(e){
		
		// Collect all fields to process
		var submitBtn = $(this);
		var formContainer = $(this).parents('.microform').first();
		var inputs = formContainer.find('input, textarea, select');
		var errorMessage = formContainer.find('#errormessage').first().length > 0? formContainer.find('#errormessage').first().val(): 'Enter all required fields to continue.';
		var tempMessage = formContainer.find('#tempmessage').first().length > 0? formContainer.find('#tempmessage').first().val(): '';
		var activate = true;
		
		inputs.each(function(){
			if(!$(this).hasClass('optional') && $(this).is('input:text') && (
			($(this).hasClass('password') && !isValidPassword($(this).attr('id'),''))
			|| ($(this).val().length < 1)
			))
			{
				activate = false; 
				return false;
			}
		});
		
		//Proceed if the required fields are all filled
		if(inputs.length > 0 && activate)
		{
			var action = formContainer.find('#action').first().val();
			var resultsDiv = formContainer.find('#resultsdiv').first().val();
			var containsFileField = formContainer.find('.filefield').length > 0? true: false;

			var parameters = {
        		type: "POST",
       			url: action,
				// How to handle getting the "form" data
      			data: (containsFileField? formContainer.serializeFiles(): inputs.serializeArray()),
				
				// What to do as the data is being processed
      			beforeSend: function() {
           			//Show a temporary message to show that the form is being worked on
					if(tempMessage != '') showServerSideFadingMessage(tempMessage);
					else showWaitDiv('start');
				},
				error: function( xhr, textStatus, errorThrown) {
    				//console.log(xhr.responseText);
					if(tempMessage == '') showWaitDiv('end');
					showServerSideFadingMessage('ERROR: Something went wrong. We can not submit your data.');
				},
      	 		success: function(data) {
		   			//console.log('GOT HERE: '+data);
						
					if(tempMessage == '') showWaitDiv('end');
					if(data.match(/php error/i)) {// || data.match(/error:/i)
						// Determine which error to show
						//The script failed
						if(data.indexOf('/>') > -1)
						{//console.log('ERROR: '+data);
							showServerSideFadingMessage('ERROR: Something went wrong. We can not submit your data.');
						}
						// Custom message from server
						else if(data.length > 5){
							showServerSideFadingMessage(data);
						}
						// No message from server
						else
						{
							showServerSideFadingMessage(errorMessage);
						}
					}
					else
					{
						//Clear the micro form for the next entry
						if(!formContainer.hasClass('ignoreclear'))
						{
							inputs.each(function(){
								if($(this).attr('type') != 'hidden'){
									$(this).val('').removeAttr('checked').removeAttr('selected');
								}
							
								//If some fields were hidden because they should not be edited, show them again
								if($(this).parent('div').length > 0 && $(this).parent('div').hasClass('hideonedit')){
									$(this).parent('div').css('display','inline-block');
									$(this).removeClass('optional');
								}
							});
						}
						
						//If certain hidden fields are specified for clearance after submission, put them on the button data-val
						if(submitBtn.data('val')){
							var fieldsToClear = submitBtn.data('val').split(',');
							for(var i=0; i<fieldsToClear.length; i++){
								$('#'+fieldsToClear[i]).remove();
							}
						}
						
						
						
						// If it is for confirming the list selection, carry out certain special actions
						if(submitBtn.hasClass('selectlistconfirmbtn')){
							var parentDiv = submitBtn.parents('.selectlistdiv').first();
							var containerDivId = 'input_'+parentDiv.attr('id');
							
							// 1. Hide all the list select checkboxes
							$(document).find('.listcheckbox').each(function(){ 
								//Uncheck all checked boxes
								if($('#'+$(this).attr('for')).is(':checked')) $('#'+$(this).attr('for')).attr('checked', false);
								//Then hide all checkboxes
								$(this).hide('fast');
							});
							
							// 2. Then hide the container 
							$('#'+containerDivId).html($('#'+containerDivId).data('default'));
							parentDiv.fadeOut('fast');
							$('#'+parentDiv.attr('id').split('__')[0]+'__btn').css('display','inline-block');
						}
						
						//Does the submit btn want us to display in a specific area instead?
						//In this case a section in the previous row
						else if(submitBtn.hasClass('submit-to-type')){
							var displayArea = submitBtn.parents('.detail-row').first().parent('tr').prev('tr').find('[data-type='+submitBtn.data('type')+']').first();
							
							if(data != '') displayArea.html(data);
							showServerSideFadingMessage('Your change has been applied.');
						}
						
						//Other-wise we check if a results div was set to display the results in
						else if(resultsDiv != ''){
							$("#"+resultsDiv).html(data).fadeIn('fast');
						}
						
						//Redirect to URL if given
						else if(resultsDiv == '' && formContainer.find('#redirectaction').length > 0){
							var redirectField = formContainer.find('#redirectaction').first();
							
							if(data != '') {
								if(data.substring(0, 4) == 'http') document.location.href = data;
								else showServerSideFadingMessage(data);
							
							} else document.location.href = redirectField.val();
						}
						
						//Simply show the data results in the fading message
						else {
							showServerSideFadingMessage(data);
						}
						
						
					}
				}
   			};
			
			//Add the ignore processing for file functions
			if(containsFileField){
				parameters['processData'] = false;
				parameters['contentType'] = false;
			}
			//Now run the AJAX query
			$.ajax(parameters);
		}
		else
		{
			showServerSideFadingMessage(errorMessage);
		}
	});
	
	
	
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Handling results list table actions
	// --------------------------------------------------------------------------------------------------------
	$(document).on('click', '.resultslisttable.editable .edit', function(e){	
		// 1. Get the id of the clicked item from the row
		var itemId = $(this).parents('tr').first().attr('id');
		
		// Clear color from all sibling rows and then color the row being edited
		$(this).parents('.resultslisttable').first().find('tr').each(function(){
			$(this).css('background-color', '');
		});
		$('#'+itemId).css('background-color', '#FFDF7D');
		
		// 2. Find the editing form
		var resultsDivId = $(this).parents('.resultslisttable').first().parent('div').attr('id');
		var editingFormDiv = $('body').find('input[value="'+resultsDivId+'"]').first().parents('.microform').first().parent('div').attr('id');
		var listType = editingFormDiv.split('__').pop();
		
		// 3. Populate the editing form with the appropriate values from the session
		updateFieldLayer(getBaseURL()+"register/edit_list_item/type/"+listType+"/item_id/"+itemId,'','',editingFormDiv,'');
		
	});
	
	
	
	$(document).on('click', '.resultslisttable.editable .delete', function(e){	
		// 1. Get the id of the clicked item from the row
		var itemId = $(this).parents('tr').first().attr('id');
		
		// 2. Find the editing form
		var resultsDivId = $(this).parents('.resultslisttable').first().parent('div').attr('id');
		var editingFormDiv = $('body').find('input[value="'+resultsDivId+'"]').first().parents('.microform').first().parent('div').attr('id');
		var listType = editingFormDiv.split('__').pop();
		
		//Ask user to confirm if they want to delete the item
		if(window.confirm('Are you sure you want to delete this '+listType+'?'))
		{
			updateFieldLayer(getBaseURL()+"register/delete_list_item/type/"+listType+"/item_id/"+itemId,'','',resultsDivId,'');
		}
	});
	
	
	
	
	
	
	

	$(document).on('click', '.addicon', function(e){
		document.location.href = getBaseURL()+$(this).data('url');
	});
	
	
	
	// Select all content of a copy field when clicked
	$(document).on('click', '.copyfield', function(){
		var $temp = $("<input>");
  		$("body").append($temp);
  		$temp.val($(this).val()).select();
  		document.execCommand("copy");
 		$temp.remove();
		
		var msg = $(this).data('msg')? $(this).data('msg'): 'Your content has been copied.';
		showServerSideFadingMessage(msg);
		$(this).select();
	});
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Handling editable content
	// --------------------------------------------------------------------------------------------------------
	$(document).on('click', '.editcontent', function(e){
		// If the edit div is hidden show them and then hide the view divs
		if(!$(this).closest('.editdiv').is(':visible')){
			$('.viewdiv').css('display', 'none');
			$('.editdiv').css('display', 'block');
			$(this).fadeOut('fast');
		}
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Handling a file upload field
	// Example file field is given in the format
	// data-val specifies a comma delimited list of allowed file types
	// data-size specifies the size limit in kB for files uploaded using the field. If not given it is limited to 100kB.
	// 
	// <input type="text" id="fieldname" name="fieldname" data-val="jpg,jpeg,gif,png,tiff" [OPTIONAL data-size="500"] class="filefield" value=""/>
	// --------------------------------------------------------------------------------------------------------
	$(document).on('click focus', '.filefield', function(e){
		// Disable to prevent bogus files names
		$(this).prop("readonly",true);
		var fileId = $(this).attr('id');
		
		// 1. Find if the field's actual file field exists. Create it if it does not.
		if(!($(this).parent().find('input[type="file"]').first().length > 0 && $(this).parent().find('input[type="file"]').first().attr('id') == fileId+'__fileurl')){
			
			$(this).after("<input type='file' id='"+fileId+"__fileurl' name='"+fileId+"__fileurl' class='filefieldurl' style='display:none;' value='' />");
		}
		$('#'+fileId+'__fileurl').click();
	});
	
	// What happens when the file is uploaded
	$(document).on('change', '.filefieldurl', function(e){
		var parentFieldId = $(this).attr('id').replace(/\__fileurl/g, '');
		
		// Get the allowed file formats
		var allowedFormats = $('#'+parentFieldId).data('val').split(',');
		var uploadedFileUrl = $(this).val();
		var uploadedFileExtension = uploadedFileUrl.split('.').pop().toLowerCase();
		
		// Get the allowed file size for this file field, otherwise default to 100kB
		var allowedSize = typeof $('#'+parentFieldId).data('size') !== 'undefined'? +$('#'+parentFieldId).data('size'): 100;
		
		// Proceed if the file in is the allowed formats and within allowed size
		if(allowedFormats.indexOf(uploadedFileExtension) != -1 && $(this)[0].files[0].size <= (allowedSize*1024)){
			$('#'+parentFieldId).val(uploadedFileUrl.split('/').pop());
			
		} else {
			var msg = $(this)[0].files[0].size > (allowedSize*1024)? 'The uploaded file exceeds allowed size.': 'The uploaded file format is not valid.';
			
			//Clear the invalid file url uploaded
			$(this).val('');
			$('#'+parentFieldId).val('');
			showServerSideFadingMessage(msg);
		}
		
	});
	
	
	
	
	
	
	
	
	
	
	
	//Handle cases where a user is entering an email
	$(document).on('focusout', '.email', function(e){
		if(!validateEmail($(this).val())){
			showServerSideFadingMessage('ERROR: The email you have provided is invalid.');
			$(this).val('');
		}
	});
	
	
	
	
	
	
	
	// --------------------------------------------------------------------------------------------------------
	// Handle single field changes for submission to the back-end
	// --------------------------------------------------------------------------------------------------------
	$(document).on('change', '.one-field-submit:not(.on-focus-out)', function(e){ handleOneFieldSubmit($(this)); });
	$(document).on('focusout', '.one-field-submit.on-focus-out', function(e){ handleOneFieldSubmit($(this)); });
	
	function handleOneFieldSubmit(obj){ 
		var formData = {};
		var action = getBaseURL()+obj.data('action');
		var msg = obj.data('msg')? obj.data('msg'): 'Your change has been submitted';  
		var resultsDiv = obj.data('resultsdiv')? obj.data('resultsdiv'): '';
		
		//Is field type checkbox or input
		if(obj.attr('type') == 'checkbox') formData['value'] = (obj.is(':checked')? obj.val(): '');
		else formData['value'] = obj.val();
		
		//Post the data values
		if(obj.attr('type') == 'checkbox' || (obj.attr('type') != 'checkbox' && obj.val() != '')){
			// Process the form data submitted
			$.ajax({
        		type: "POST",
       			url: action,
      			data: {data:formData},
      			beforeSend: function() {},
      			success: function(data) {
					if(resultsDiv != ''){
						$('#'+resultsDiv).html(data);
					
					} else {
						var expectedMsgs = ['SUCCESS','FAIL']; 
						if(jQuery.inArray(data, expectedMsgs) !== -1) {
							if(data == 'SUCCESS') showServerSideFadingMessage(msg);
							else showServerSideFadingMessage('ERROR: Your change has not been submitted');
						}
						else showServerSideFadingMessage(data);
					}
				}
   			});
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
});	
	
	
	
	
	
	
// --------------------------------------------------------------------------------------------------------
// Handles browser specific presentations for drop downs
// --------------------------------------------------------------------------------------------------------
$(function() {
	// By default, update if the browser is IE
	if(detectIEVersion() !== false){ 
		if($('.drop-down').length){
			$('.drop-down').css('background','none !important');
			$('.drop-down').css('padding','8px 0px 8px 2px');
		}
		if($('.small-drop-down').length){
			$('.small-drop-down').css('background','none !important');
			$('.small-drop-down').css('padding','8px 0px 8px 2px');
		}
	}
	
	$(document).on('click', '.drop-down, .small-drop-down', function(e){
		$(this).css('color', '#333');
	});
	
});	


	
	
	
// --------------------------------------------------------------------------------------------------------
// Handles processing a form with a file field in it before submission asynchronously
// --------------------------------------------------------------------------------------------------------
(function($) {
$.fn.serializeFiles = function() {
    var inputs = $(this).find("input, textarea, select"),
    files = {};

	// jquery or javascript have a slightly different notation
	// it's either accessing functions () or arrays [] depending on which object you're holding at the moment
	for (var i = 0; i < inputs.length; i++){
    	if(inputs.eq(i).attr('type') == 'file') {
			files[inputs.eq(i).attr('name')] = inputs.eq(i).prop("files")[0];
    		//files.push(inputs[i].files[0]);
    		//filename = inputs[i].files[0].name;
    		//filesize = inputs[i].files[0].size;
		} else {
			files[inputs.eq(i).attr('name')] = inputs.eq(i).val();
		}
	}

	var formdata = new FormData();  
	if (formdata) {
    	// you can use the array notation of your input's `name` attribute here
    	$.each(files, function(fieldname, element) { 
			formdata.append(fieldname, element);
		});
	}
	//Now return the form data for processing as normal
	return formdata;
};
})(jQuery);







	
	
	
	
	
	
// Get custom additional fields to be passed with a select field
function addSelectVariables(selectObj)
{
	var addnValues = "";
	
	if(selectObj.data('val')){
		var fields = selectObj.data('val').split('|');
		for(var i=0; i<fields.length; i++){
			addnValues += '/'+fields[i]+'/'+replaceBadChars($('#'+fields[i]).val());
		}
	}
	
	return addnValues;
}
	
	
	
	



//What to do when the form is submitted.
function postFormFromLayer(formId)
{
	// Collect all fields to process
	var inputs = $('#'+formId).find('input');
	var fieldId = formId.replace(/\__form/g, '');
	var formType = $("#"+fieldId+'__type').val();
	// Process the form data submitted
	$.ajax({
        type: "POST",
       	url: getBaseURL()+"page/get_layer_form_values/type/"+formType,
      	data: inputs.serializeArray(),
      	beforeSend: function() {
           	//Do nothing
		},
      	 success: function(data) {
			$("#"+fieldId+'__resultsdiv').html(data);
		}
   	});
	
	if(!$('#'+fieldId+'__ignorepostprocessing').length)
	{
		$('#'+fieldId+'__resultsdiv').hide('fast');
	
		//Now show what needs to be shown to the user in their field
		var fields = $("#"+fieldId+'__response_fields').val().split('|');
		var response = "";
		$.each(fields, function( index, value ){
			response += ($('#'+value).length && $('#'+value).val().length > 0)? (index > 0? ", ": "")+$('#'+value).val(): "";
		});
	
		$('#'+fieldId).val(response);
		$('#'+fieldId+'__div').fadeOut('fast');	
	}
}






