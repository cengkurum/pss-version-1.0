// JavaScript Document


//Function to update a form's field layer
function updateFieldLayer(serverPage,fieldNameArrStr,layerShown,displayLayer,errorMsg){
	if(fieldNameArrStr.length > 0){
		var fieldNameArr = fieldNameArrStr.split("<>");
	} else {
		var fieldNameArr = Array();
	}
	var serverPageStr = serverPage;
	if(layerShown != "" && layerShown.charAt(0) != "*"){
		var shownLayerObj = document.getElementById(layerShown);
	}

	var allIn = ""; //To track that all fields are entered

	//Form the string to be passed to the page div
	if(fieldNameArrStr !='' && fieldNameArr.length > 0)
	{
		for(var i=0;i<fieldNameArr.length;i++){
			//If a field has a "*" at the beginning, it is optional
			if(fieldNameArr[i].charAt(0) != "*"){
				if(!checkEmpty(fieldNameArr[i], errorMsg)){
					allIn = "NO";
					break;
				} else {
					//Get the actual field value
					if(trimString(document.getElementById(fieldNameArr[i]).value) == ''){
						var fieldValue = '_';
					} else {
						var fieldValue = replaceBadChars(document.getElementById(fieldNameArr[i]).value);
					}

					serverPageStr += "/"+fieldNameArr[i]+"/"+fieldValue;
				}

			} else {
				var fieldName = fieldNameArr[i].substr(1,fieldNameArr[i].length);
				//Get the actual field value
				if(trimString(document.getElementById(fieldName).value) == ''){
					var fieldValue = '_';
				} else {
					var fieldValue = replaceBadChars(document.getElementById(fieldName).value);
				}

				serverPageStr += "/"+fieldName+"/"+fieldValue;
			}
		}
	}


	if(allIn ==""){
		if(layerShown != ""){
			if(layerShown.charAt(0) == "*"){
				//Hide the previous layer (only after the above qualify)
				//HideContent(substr(1,layerShown.length));
				shownLayerObj = document.getElementById(substr(1,layerShown.length));
				shownLayerObj.style.visibility="hidden";
				shownLayerObj.style.height = 0;
			} else {
				//Hide the previous layer (normal)
				shownLayerObj.style.visibility="hidden";
				shownLayerObj.style.height = 0;
			}
		}

		//The * character means that you will first need to hide the layer
		//The | character means that you will remove the layer after loading of its contents
		if(displayLayer != "" && displayLayer != "_" && displayLayer != "-"){
			if(displayLayer.charAt(0) != "*" && displayLayer.charAt(0) != "|"){
				//First hide and then show new layer
				var displayLayerObj = document.getElementById(displayLayer);
				displayLayerObj.style.visibility="hidden";
				displayLayerObj.style.height = 0;
			}

			showFormLayer(serverPageStr,displayLayer);

		} else {
			//Open in popup
			if(displayLayer == "_"){
				openWindow(serverPageStr);
			}
			//Redirect from iframe
			else if(displayLayer == "-"){
				window.top.location.href = serverPageStr;
			}
			//Redirect within current window
			else{
				document.location.href = serverPageStr;
			}
		}
	}

}




//Function to confirm a url and load the results to a layer
function confirmActionToLayer(URL, fieldList, fromLayer, layerID, errorMSG)
{
	if(window.confirm(errorMSG))
	{
		var newMSG = "";
		if(fieldList != '')
		{
			newMSG = "All fields are required except where indicated.";
		}

		updateFieldLayer(URL, fieldList, fromLayer, layerID, newMSG);
	}
}




// open window
function openWindow(fileName) {

	// To specify the window characteristics edit the "features" variable below:
	// width - width of the window
	// height - height of the window
	// scrollbar - "yes" for scrollbars, "no" for no scrollbars
	// left - number of pixels from left of screen
	// top - number of pixels from top of screen

	features = "width=600,height=450,left=100,top=130,resizable=1, scrollbars=1";
	listwindow = window.open(fileName,"newWin", features);
	listwindow.focus();
}



// open window which fills whole page but is closable
function openMobileWindow(fileName) {

	// To specify the window characteristics edit the "features" variable below:
	// width - width of the window
	// height - height of the window
	// scrollbar - "yes" for scrollbars, "no" for no scrollbars
	// left - number of pixels from left of screen
	// top - number of pixels from top of screen

	features = "width="+$(window).width()+",height="+$(window).height()+",left=0,top=0,resizable=1, scrollbars=0";
	listwindow = window.open(fileName,"newWin", features);
	listwindow.focus();
}



//Function to replace bad characters before they are passed in a URL
function replaceBadChars(formString){
	var badChars = Array("'", "\"", "\\", "(", ")", "/", "<", ">", "!", "#", "@", "%", "&", "?", "$", ",", ";", ":", " ", "*");
	var replaceChars = Array("_QUOTE_", "_DOUBLEQUOTE_", "_BACKSLASH_", "_OPENPARENTHESIS_", "_CLOSEPARENTHESIS_", "_FORWARDSLASH_", "_OPENCODE_", "_CLOSECODE_", "_EXCLAMATION_", "_HASH_", "_EACH_", "_PERCENT_", "_AND_", "_QUESTION_", "_DOLLAR_", "_COMMA_", "_SEMICOLON_", "_FULLCOLON_", "_SPACE_", "_ASTERISK_");
	var newString = '';

	for(var i=0;i<badChars.length;i++){
		newString = replaceAllStr(formString, badChars[i], replaceChars[i]);
		formString = newString;
	}

	return newString;
}



//Check if the passed character is a bad character
function isBadChar(character){
	var badChars = Array("'", "\"", "\\", "(", ")", "/", "<", ">", "!", "#", "@", "%", "&", "?", "$", ",", ";", ":", " ");
	return inArray(badChars, character, 'bool');
}




//Function to restore bad characters into the string -  usually for display
function restoreBadChars(formString){
	var badChars = Array("'", "\"", "\\", "(", ")", "/", "<", ">", "!", "#", "@", "%", "&", "?", "$", ",", ";", ":", " ");
	var replaceChars = Array("_QUOTE_", "_DOUBLEQUOTE_", "_BACKSLASH_", "_OPENPARENTHESIS_", "_CLOSEPARENTHESIS_", "_FORWARDSLASH_", "_OPENCODE_", "_CLOSECODE_", "_EXCLAMATION_", "_HASH_", "_EACH_", "_PERCENT_", "_AND_", "_QUESTION_", "_DOLLAR_", "_COMMA_", "_SEMICOLON_", "_FULLCOLON_", "_SPACE_");
	var newString = '';

	for(var i=0;i<replaceChars.length;i++){
		newString = replaceAllStr(formString, replaceChars[i], badChars[i]);
		formString = newString;
	}

	return newString;
}



//Function to load another page and also show or hide the div
function showFormLayer(serverPage,object){
	//Should we remove the div after using it to display
	if(object.charAt(0) == "|")
	{
		object = object.substr(1,object.length);
		var removeDiv = true;
	}
	else
	{
		var removeDiv = false;
	}

	var obj=document.getElementById(object);
	document.getElementById("layerid").value = object;//Store the layer name //AFTER IE 7

	if(obj.style.visibility == "hidden" || obj.style.display == "none"){
		obj.style.visibility="visible";
		obj.style.height = "";
		obj.style.display="block";

		//Now show the div contents without removing it
		if(serverPage != '' && removeDiv){
			showHideSlowLayerRemoveDiv(serverPage);
		}
		else if(serverPage != '')
		{
			showHideSlowLayer(serverPage);
		}

	} else {
		obj.style.visibility="hidden";
		obj.style.height = 0;
		obj.style.display="none";
	}
}

//Function to close/hide a div
function hideDiv(divID){
	var divObj = document.getElementById(divID);
	divObj.innerHTML = "";
	divObj.style.visibility="hidden";
	divObj.style.display="none";
	divObj.style.height = 0;
}





//Post the data to the provided URL
function showHideSlowLayer(url) {
	if(url.indexOf('http_id') != -1)
	{
		var urlParts = url.split('/');
		var httpId = urlParts[urlParts.indexOf('http_id')+1];
		var httpObj = eval(httpId);
	}
	else
	{
		var httpObj = http;
	}

	httpObj.open("POST", url, true);
	httpObj.onreadystatechange = handleHttpResponse;
	httpObj.send(null);
}




//Post the data to the provided URL
function showHideSlowLayerRemoveDiv(url) {
	http.open("POST", url, true);
	http.onreadystatechange = handleHttpResponseRemoveDiv;
	http.send(null);
}



//Create a new HTML object
function getHTTPObject() {
	var xmlhttp;
	if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
		try {
			xmlhttp = new XMLHttpRequest();
		} catch (e) {
			xmlhttp = false;
		}
	}
	return xmlhttp;
}
//Return the data to the layer
function handleHttpResponse() {
	if (http.readyState == 4)
	{
		results = http.responseText;
		document.getElementById(document.getElementById("layerid").value).innerHTML = results;
	}
	else
	{
		document.getElementById(document.getElementById("layerid").value).innerHTML = "<img src='"+getBaseURL()+"assets/images/loading.gif'>";
	}
	return true;
}


function handleHttpResponseRemoveDiv() {
	var loadToDiv = document.getElementById("layerid").value;

	if($('#'+loadToDiv).length)
	{
		if (http.readyState == 4)
		{
			results = http.responseText;
			document.getElementById(loadToDiv).innerHTML = '';
			$('#'+loadToDiv).replaceWith(results);
		}
		else
		{
			document.getElementById(loadToDiv).innerHTML = "<img src='"+getBaseURL()+"assets/images/loading.gif'>";
		}
	}
	return true;
}



//Get system base URL
function getBaseURL()
{
	var pageURL = document.location.href;
	var urlArray = pageURL.split("/");
	var BaseURL = urlArray[0]+"//"+urlArray[2]+"/";
	//Dev environments have the installation sitting in a separate folder
	if(urlArray[2] == '127.0.0.1' || urlArray[2] == '0.0.0.0' || urlArray[2].indexOf("localhost") > -1)
	{
		BaseURL = 'http://localhost:8888/pss/';
	}


	return BaseURL;
}



// Returns false if the field is empty, null, or has the string "null", and pops up
// the message passed to the function
function checkEmpty(fieldName, message) {

	if (isNullOrEmpty(document.getElementById(fieldName).value) && message != '') {
		alert(message);
		//document.getElementById(fieldName).focus();
		return false;
	}
	return true;
}



// Returns false if the field is empty, null, or has the string "null", and pops up
// the message passed to the function
function isNotNullOrEmptyString(fieldName, message) {
	if (isNullOrEmpty(document.getElementById(fieldName).value)) {
		alert(message);
		return false;
	}
	return true;
}

// general purpose function to see if an input value has been
// entered at all or if the input value has a value "null"
function isNullOrEmpty(inputStr) {
	if (isEmpty(inputStr) || inputStr == "null") {
		return true;
	}
	return false;
}

// general purpose function to see if an input value has been
// entered at all
function isEmpty(inputStr) {
	if (inputStr == null || inputStr == "") {
		return true;
	}
	return false;
}


//Remove leading and trailing spaces
function trimString(sInString) {
	sInString = sInString.replace( /^\s+/g, "" );// strip leading
	return sInString.replace( /\s+$/g, "" );// strip trailing
}




//Function to replace all string values in a string
function replaceAllStr(strText, strTarget, strSubString){
	var intIndexOfMatch = strText.indexOf(strTarget);

	// Keep looping while an instance of the target string
	// still exists in the string.
	while (intIndexOfMatch != -1){
		// Relace out the current instance.
		strText = strText.replace( strTarget, strSubString )

		// Get the index of any next matching substring.
		intIndexOfMatch = strText.indexOf( strTarget );
	}

	// Return the updated string with ALL the target strings
	// replaced out with the new substring.
	return( strText );
}


//Function to get different fields for a field update
function getFieldsForUpdateFieldLayer(serverPage,fieldsContainer,layerShown,displayLayer,errorMsg)
{
	fieldNameArrStr = document.getElementById(fieldsContainer).value;

	updateFieldLayer(serverPage,fieldNameArrStr,layerShown,displayLayer,errorMsg);
}



//function to hide and show a pair of layers
function unhideShowLayer(showLayer,hideLayer)
{
	if(showLayer != '')
	{
		var obj=document.getElementById(showLayer);
		obj.style.visibility="visible";
		obj.style.height="";
		obj.style.display="block";
	}

	if(hideLayer != '')
	{
		var objHidden=document.getElementById(hideLayer);
		objHidden.style.visibility="hidden";
		objHidden.style.height=0;
		objHidden.style.display="none";
	}
}




//Function to pass a form value from one element to the next in a given form
function passFormValue(passingField, receivingField, fieldType){
	var passingObj = document.getElementById(passingField);

	if(fieldType == "radio" || fieldType == "checkbox"){
		if(passingObj.checked){
			document.getElementById(receivingField).value = passingObj.value;
		} else {
			document.getElementById(receivingField).value = '';
		}
	} else {
		document.getElementById(receivingField).value = passingObj.value;
	}

}




// Pass the visible text value to a field
function passTextValue(idStub){
	$('#'+idStub+'_text').val($('#'+idStub+' option:selected').text());
}




//Update a field value if the current field is changed
function updateFieldValue(fieldChangeId, fieldChangeValue, donotRestoreChars)
{
	if(fieldChangeId.indexOf('<>',0) > -1)
	{
		var fieldIdArr = fieldChangeId.split('<>');
		var fieldValueArr = fieldChangeValue.split('<>');

		//Apply all the values to their respective fields
		for(var i=0; i<fieldIdArr.length; i++){
			universalUpdate(fieldIdArr[i], fieldValueArr[i], donotRestoreChars);
		}
	}
	else
	{
		universalUpdate(fieldChangeId, fieldChangeValue, donotRestoreChars);
	}
}



//Universalyl update field even if it is read-only
function universalUpdate(fieldChangeId, fieldValue, donotRestoreChars)
{
	if(typeof donotRestoreChars !== "undefined"){
		fieldValue = restoreBadChars(fieldValue);
	}

	if($('#'+fieldChangeId).hasClass("noenter"))
	{
		$('#'+fieldChangeId).attr("readonly", false);
		$('#'+fieldChangeId).val(fieldValue);
		$('#'+fieldChangeId).attr("readonly", true);
	}
	else
	{
		$('#'+fieldChangeId).val(fieldValue);
	}
}


//Show field value in 
function showFieldValue(fieldId, fieldValue)
{
	document.getElementById(fieldId).innerHTML = fieldValue;
}






// Function to handle search response
function startInstantSearch(searchFieldName, searchByFieldName, actionURL){
	var phrase = replaceBadChars(document.getElementById(searchFieldName).value);
	var extraURL = "";
	var extraFieldsArray = Array();

	if(searchByFieldName != '_')
	{
		var searchby = document.getElementById(searchByFieldName).value;
	}
	else
	{
		var searchby = '_';
	}


	//Get layer id and assign it if given
	var urlArray = actionURL.split('/');
	if(inArray(urlArray, 'layer', 'bool')){
		document.getElementById('layerid').value = urlArray[inArray(urlArray, 'layer', 'pos')+1];
		var layerID = document.getElementById('layerid').value;
	}

	//Add any other field values that may be passed
	if(inArray(urlArray, 'extrafields', 'bool')){
		var extraFieldsString = urlArray[inArray(urlArray, 'extrafields', 'pos')+1];
		extraFieldsArray = extraFieldsString.split('__');

		for(var i=0; i<extraFieldsArray.length; i++){
			if(extraFieldsArray[i].charAt(0) == "*" && document.getElementById(extraFieldsArray[i].substr(1,extraFieldsArray[i].length)).value != '')
			{
				extraURL +=  "/"+extraFieldsArray[i].substr(1,extraFieldsArray[i].length)+"/"+replaceBadChars(document.getElementById(extraFieldsArray[i].substr(1,extraFieldsArray[i].length)).value);
			}
			else if(extraFieldsArray[i].charAt(0) != "*")
			{
				extraURL += "/"+extraFieldsArray[i]+"/"+replaceBadChars(document.getElementById(extraFieldsArray[i]).value);
			}
		}
	}

	if(searchby.length > 0){
		if(phrase.length > 0 || hasDefaultSearchOption(searchFieldName)){
			if(hasDefaultSearchOption(searchFieldName) && phrase.length == 0)
			{
				phrase = '_';
			}

			var serverPageStr = actionURL+"/searchfield/"+searchby+"/phrase/"+phrase+extraURL;
			//Remove all asterisks
			serverPageStr = serverPageStr.split('*').join('');
			document.getElementById(layerID).style.visibility = '';
			showHideSlowLayer(serverPageStr);
		}
	} else {
		alert('Please select a field to search by');
	}
}



//Function to check if a default serach option is specified
function hasDefaultSearchOption(fieldId)
{
	if($('#'+fieldId).is("[data-rel]"))
	{
		return true;
	}
	else
	{
		return false;
	}
}




//Assign a layer a position
function assignPosition(d,h) {
	d.style.top = h + "px";
}



//Used if layer content is in the same file as the calling button
function showContent(d,h) {
	if(d.length < 1) { return; }
	var dd = document.getElementById(d);
	if(h != ''){
		assignPosition(dd,h);
	}
	dd.style.display = "block";
	dd.style.visiblity = "visible";
}





//Function to find out if item is in array
function inArray(haystack, needle, returnType) {
	$bool = false;
	$pos = '';

	for(var i=0; i<haystack.length; i++) {
		if (haystack[i] == needle) {
			$bool = true;
			$pos = i;
		};
	}

	if(returnType == 'bool'){
		return $bool;
	} else {
		return $pos;
	}
}



//Function to hide a layer set
function hideLayerSet(layerSet)
{
	var layerArray = layerSet.split('<>');
	for(var i=0; i<layerArray.length; i++)
	{
		$('#'+layerArray[i]).hide('fast');
	}
}



//Function to show a layer set
function showLayerSet(layerSet)
{
	var layerArray = layerSet.split('<>');
	for(var i=0; i<layerArray.length; i++)
	{
		$('#'+layerArray[i]).show('fast');
	}
}


//Function to hide layers based on a condition that the fields are filled in
function showHideOnCondition(hideLayers, showLayers, fieldSet)
{
	var fieldArray = fieldSet.split('<>');
	var allEntered = "YES";

	for(var i=0; i<fieldArray.length; i++)
	{
		if($('#'+fieldArray[i]).val() == '')
		{
			allEntered = "NO";
			break;
		}
	}

	//Only hide if all fields are entered
	if(allEntered == "YES")
	{
		hideLayerSet(hideLayers);
		showLayerSet(showLayers);
	}
}



//Function to hide layers based on a condition that a field is not empty
function showHideOnFieldCondition(hideLayers, showLayers, fieldId)
{
	if($('#'+fieldId).val() == '')
	{
		hideLayerSet(hideLayers);
	}
	else
	{
		showLayerSet(showLayers);
	}
}



//Function to hide layers based on a condition that a field has a given value
function showHideOnFieldValueCondition(hideLayers, showLayers, fieldId, fieldValue)
{
	if($('#'+fieldId).val() == fieldValue)
	{
		showLayerSet(showLayers);
	}
	else
	{
		hideLayerSet(hideLayers);
	}
}



//Function to hide layers based on a condition that the fields are filled in
function showHideOnChecked(layerSet, fieldId)
{
	if($('#'+fieldId).is(':checked'))
	{
		showLayerSet(layerSet);
	}
	else
	{
		hideLayerSet(layerSet);
	}
}


//Function to update a list of checkbox values of a hidden field from a given checkbox
function updateCheckboxList(checkId, hiddenField)
{
	var currentHiddenValue = document.getElementById(hiddenField).value;
	var checkValue = document.getElementById(checkId).value;

	//If checked, add the new check box value to the list of values
	if(document.getElementById(checkId).checked == true)
	{
		if(currentHiddenValue != '')
		{
			checkValue = ','+checkValue;
		}
		document.getElementById(hiddenField).value = currentHiddenValue+checkValue;
	}
	//If unchecked, remove the value from the list of values
	else
	{
		var selectedValuesArray = currentHiddenValue.split(',');
		var newValuesString = "";
		var count = 0;
		for(var i=0; i<selectedValuesArray.length; i++)
		{
			if(count > 0)
			{
				newValuesString += ",";
			}

			if(selectedValuesArray[i] != checkValue)
			{
				newValuesString += selectedValuesArray[i];
				count++;
			}
		}
		//Add the updated string to the hidden field list of values
		document.getElementById(hiddenField).value = newValuesString;
	}
}



//Function to check the box if a field is not empty
function checkIfNotEmpty(fieldId, checkBoxId)
{
	if(document.getElementById(fieldId).value != '')
	{
		document.getElementById(checkBoxId).checked = true;
	}
}


//Make empty is not checked
function makeEmptyOnChecked(fieldId, checkBoxId)
{
	if(document.getElementById(checkBoxId).checked == false)
	{
		document.getElementById(fieldId).value = '';
	}
}


//Function to clear another field based on the current field action
function clearOnActionCheck(theField, otherFieldID, otherDefaultValue){
	if(theField.checked){
		document.getElementById(otherFieldID).value = otherDefaultValue;
	}
}


//Function to show or hide a fast layer
function toggleLayer(divID, divURL, shownImg, hiddenImg, imgDiv, shownText, hiddenText, textDiv)
{
	//If the div is hidden, show it
	if(document.getElementById(divID).style.display == 'none'){

		if(divURL != '')
		{
			document.getElementById('layerid').value = divID;
			showHideSlowLayer(divURL);
		}

		$('#'+divID).slideDown('fast');
		document.getElementById(divID).style.display = 'block';

		if(shownImg != '' && imgDiv != '')
		{
			$('#'+imgDiv).html(shownImg);
		}

		if(shownText != '' && textDiv != '')
		{
			$('#'+textDiv).html(shownText);
		}
	}
	//If the div is already shown, hide it
	else
	{
		$('#'+divID).slideUp('fast');
		document.getElementById(divID).style.display = 'none';

		if(hiddenImg != '' && imgDiv != '')
		{
			$('#'+imgDiv).html(hiddenImg);
		}

		if(hiddenText != '' && textDiv != '')
		{
			$('#'+textDiv).html(hiddenText);
		}
	}

}




//Function to toggle classes of an element
function toggleStyles(elementOne,styleOne,styleTwo)
{
	if($('#'+elementOne).hasClass(styleOne))
	{
		$('#'+elementOne).removeClass(styleOne);
		$('#'+elementOne).addClass(styleTwo);
	}

	if($('#'+elementOne).hasClass(styleTwo))
	{
		$('#'+elementOne).removeClass(styleTwo);
		$('#'+elementOne).addClass(styleOne);
	}
}


//Function to change the class of an element
function changeClass(element,style)
{
	if(!$('#'+element).hasClass(style))
	{
		$('#'+element).addClass(style);
	}
}



//Function to toggle layer(s) on a condition of another layer
function toggleLayersOnCondition(conditionLayer, affectedLayers)
{
	//If the div is hidden, show other layers
	if(!$("#"+conditionLayer).is(":visible"))
	{
		showLayerSet(affectedLayers);
	}
	else
	{
		hideLayerSet(affectedLayers);
	}
}




//Function to make a text field accept only numbers
function onlyNumbers(evt)
{
	var e = event || evt; // for trans-browser compatibility
	var charCode = e.which || e.keyCode;

	if (charCode > 31 && (charCode < 48 || charCode > 57))
		return false;

	return true;
}




//Function to reject bad characters in text field entry e.g., in SQL injection
//Characters like ", $, =, < and > are not allowed in a plain input text field
$(function(){
	$(document).on('change', 'input.textfield', function(){
		$(this).val($(this).val().replace(/[\\#\=|`;+$~%'^"*<>{}]/g,''));
	});
});


//Function to format the date as it is entered to MM/DD/YYYY
function formatDateValue(dateField, keyEvent)
{
	var pickedKey = keyEvent ? keyEvent.which : window.event.keyCode;

	if (pickedKey == 8) {
		dateField.value = substr(0,dateField.value.length-1);
		return;
	}

	var dateValue = dateField.value;
	var dateArray = dateValue.split('/');

	for (var a = 0; a < dateArray.length; a++) {
		if (dateArray[a] != +dateArray[a]) dateArray[a] = dateArray[a].substr(0,dateArray[a].length-1);
	}

	if (dateArray[0] > 12) {
		dateArray[1] = dateArray[0].substr(dateArray[0].length-1,1);
		dateArray[0] = '0'+dateArray[0].substr(0,dateArray[0].length-1);
	}

	if (dateArray[1] > 31) {
		dateArray[2] = dateArray[1].substr(dateArray[1].length-1,1);
		dateArray[1] = '0'+dateArray[1].substr(0,dateArray[1].length-1);
	}

	if (dateArray[2] > 9999) dateArray[1] = dateArray[2].substr(0,dateArray[2].length-1);

	dateValue = dateArray.join('/');

	if (dateValue.length == 2 || dateValue.length == 5) dateValue += '/';

	dateField.value = dateValue;
}


//Function to format the phone as it is entered from (xxx)xxx-xxxx to xxxxxxxxxx
function formatPhoneValue(phoneField, keyEvent)
{
	var phoneValue = phoneField.value;

	if(isNaN(phoneValue) || phoneValue.length > 10){
		phoneField.value = phoneValue.substr(0, phoneValue.length-1);
		return;
	}
}





//Function to remove or add width of a table cell
function changeWidthWithDiv(cellId, divId, width)
{
	if($('#'+divId).css('display') == 'none')
	{
		document.getElementById(cellId).style.width = '0px';
	}
	else
	{
		document.getElementById(cellId).style.width = width;
	}
}

//Function to perform an array search
function arraySearch(array, value)
{
	var index;
	for (var i = 0; i < array.length; i++) {
		// use '===' if you strictly want to find the same type
		if (array[i] == value) {
			if (index == undefined) index = i;
			// return false if duplicate is found
			else return false;
		}
	}

	// return false if no element found, or index of the element
	return index == undefined ? false : index;
}


//Function to imitate PHP array_diff
function arrayDiff(a1, a2)
{
	var a=[], diff=[];
	for(var i=0;i<a1.length;i++)
		a[a1[i]]=true;
	for(var i=0;i<a2.length;i++)
		if(a[a2[i]]) delete a[a2[i]];
		else a[a2[i]]=true;
	for(var k in a)
		diff.push(k);
	return diff;
}



//Hide tabs and dispay the column background
function hideTabsAndDisplayBg(thisColId)
{
	var defaultColor = "#CCCCCC";
	var currentLevel = document.getElementById('currentlevelvalue').value;

	var colArray = Array('level_0', 'level_1', 'level_2', 'level_3', 'level_4', 'level_5', 'level_6', 'level_7', 'level_8', 'level_9', 'level_10');
	var colorArray = Array('#CCCCCC', '#56D42B', '#18C93E', '#0AC298', '#03BFCD', '#2DA0D1', '#6D76B5', '#8566AB', '#999999', '#666666', '#333333');

	var otherCols = arrayDiff(colArray, Array(thisColId));
	var thisColor = colorArray[arraySearch(colArray, thisColId)];
	document.getElementById(thisColId+'_top').style.backgroundColor = thisColor;
	document.getElementById(thisColId+'_bottom').style.backgroundColor = thisColor;

	for(var i=0; i<otherCols.length; i++)
	{
		if(otherCols[i] != currentLevel)
		{
			document.getElementById(otherCols[i]+'_top').style.backgroundColor = defaultColor;
			document.getElementById(otherCols[i]+'_bottom').style.backgroundColor = defaultColor;
		}
	}
}




//Function to show the action layers if a checkbox is selected.
function canWeShowActions(checkList)
{
	var checkListValues = $('#'+checkList).val();
	var checkListArray = checkListValues.split('|');
	var foundSelected = false;

	for(var k=0;k<checkListArray.length;k++)
	{
		if($('#'+checkListArray[k]).is(':checked'))
		{
			foundSelected = true;
			break;
		}
	}


	var showLayers = $('#showlayerslist').val();
	var showLayersArray = showLayers.split('|');

	for(var i=0; i<showLayersArray.length; i++)
	{
		if(foundSelected)
		{
			$('#'+showLayersArray[i]).show();
		}
		else
		{
			$('#'+showLayersArray[i]).hide();
		}
	}

}


//Function to check all boxes in a list
function selectAll(actionOnObj,listFieldId)
{
	// This is just one field
	if(listFieldId.charAt(0) == "*")
	{
		var fieldListArray = Array(listFieldId.substr(1,listFieldId.length));
	}
	else
	{
		var fieldList = $('#'+listFieldId).val();
		var fieldListArray = fieldList.split('|');
	}


	//Then carry out the actions on the list
	if(actionOnObj.checked)
	{
		for(var i=0; i<fieldListArray.length; i++)
		{
			$('#'+fieldListArray[i]).prop('checked', true);
		}
	}
	else
	{
		for(var i=0; i<fieldListArray.length; i++)
		{
			$('#'+fieldListArray[i]).prop('checked', false);
		}
	}
}




//Function to switch divs shown based on a given value
function showSwitchDivs(switchValue,showDivs,hideDivs)
{
	//You are going to display the layers. i.e., the switch is still OFF
	if($('#'+switchValue).val() == 'OFF')
	{
		showLayerSet(showDivs);
	}
	else
	{
		hideLayerSet(hideDivs);
	}
}


//Function to make a button active based on the value of the given fields
function makeButtonActive(fieldList, btnId, inactiveClass, activeClass)
{
	var fieldListArray = fieldList.split('<>');
	var allFilled = false;

	if(fieldListArray.length > 0)
	{
		var allFilled = true;
		for(var i=0; i<fieldListArray.length; i++)
		{
			if($('#'+fieldListArray[i]).val() == '')
			{
				allFilled = false;
				break;
			}
		}
	}

	if(allFilled)
	{
		$('#'+btnId).removeClass(inactiveClass).addClass(activeClass);
	}
	else
	{
		$('#'+btnId).removeClass(activeClass).addClass(inactiveClass);
	}
}


//Function to update a tabs list
function updateTabColors(tabId,currentTabClass,otherTabsClass)
{
	$('.'+currentTabClass).removeClass(currentTabClass).addClass(otherTabsClass);
	$('#'+tabId).removeClass(otherTabsClass).addClass(currentTabClass);
}



// Popup window code
function newPopup(url, width, height)
{
	var left = (screen.width/2)-(width/2);
	var top = (screen.height/2)-(height/2);

	popupWindow = window.open(
		url,'popUpWindow','height='+height+',width='+width+',left='+left+',top='+top+',resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,directories=no,status=yes')
}


//Open window in popup
function openInParent(url)
{
	window.opener.location.href = url;
	window.close();
}






//Submits a form to a layer
function submitLayerForm(formId)
{
	var allIn = "";

	//If there is an error message to show for the required fields
	if($("#"+formId+"_required_msg").length > 0 && $("#"+formId+"_required_msg").val() != '')
	{
		var requiredMsg = $("#"+formId+"_required_msg").val();
	}
	else
	{
		var requiredMsg = "All fields are required";
	}

	//If there are required fields.
	if($("#"+formId+"_required").length > 0 && $("#"+formId+"_required").val() != '')
	{
		var requiredFields = $("#"+formId+"_required").val().split('<>');

		//Go through and make sure all required fields are submitted
		for(var i=0; i<requiredFields.length; i++)
		{
			if(!checkEmpty(requiredFields[i], requiredMsg))
			{
				//Stop here and do not continue
				allIn = "NO";
				break;
			}
		}
	}

	if(allIn != 'NO')
	{
		//If the display layer is given, show the result there.
		if($("#"+formId+"_displaylayer").length > 0 && $("#"+formId+"_displaylayer").val() != '')
		{
			var displayLayer = $("#"+formId+"_displaylayer").val();
		}

		//If the hide layer is given, show the result there.
		if($("#"+formId+"_hidelayer").length > 0 && $("#"+formId+"_hidelayer").val() != '')
		{
			var hideLayer = $("#"+formId+"_hidelayer").val();
		}

		if($("#"+formId+"_loadingtext").length > 0 && $("#"+formId+"_loadingtext").val() != '')
		{
			var loadingText = $("#"+formId+"_loadingtext").val();
		}


		//Do not show the results layer if instructed not to
		var showToMessage = false;
		if(displayLayer.charAt(0) == "*"){
			//Remove the instruction after this point
			displayLayer = displayLayer.substr(1,displayLayer.length);
			var showToMessage = true;
		}

		$.ajax({
			type: "POST",
			url: $("#"+formId).attr('action'),
			data: $("#"+formId).serialize(),
			beforeSend: function() {
				if (typeof displayLayer !== 'undefined')
				{
					var loadingHTML = "<img src='"+getBaseURL()+"assets/images/loading.gif'>";
					if (typeof loadingText !== 'undefined')
					{
						loadingHTML += " "+loadingText;
					}
					//Display loading HTML in the meantime
					$("#"+displayLayer).html(loadingHTML);
				}
			},
			success: function(data) {
				if (typeof displayLayer !== 'undefined')
				{
					//Are you displaying the results in the system message area or to a specified div
					if(showToMessage)
					{
						showFieldValue('systemmessage', data);
						showFadingMessage();
						$("#"+displayLayer).html('');
					}
					else
					{
						$("#"+displayLayer).html(data);
						$("#"+displayLayer).show('fast');
					}
				}

				if (typeof hideLayer !== 'undefined')
				{
					$("#"+hideLayer).hide('fast');
				}

				if($("#"+formId+"_closediv").length > 0)
				{
					window.parent.parent.location.reload();
				}
			}
		});
	}

	//Prevent the form from submitting automatically
	return false;
}




//Submits to a layer without restriction of form
function submitToLayer(serverPage,fieldNameArrStr,layerShown,displayLayer,errorMsg)
{
	var allIn = ""; //To track that all fields are entered
	var fieldData = Array();

	if(fieldNameArrStr.length > 0){
		var fieldNameArr = fieldNameArrStr.split("<>");
	} else {
		var fieldNameArr = Array();
	}

	//Ge the submitted data
	if(fieldNameArr.length > 0)
	{
		for(var i=0; i<fieldNameArr.length; i++)
		{
			//If a field has a "*" at the beginning, it is optional
			if(fieldNameArr[i].charAt(0) != "*"){
				if(!checkEmpty(fieldNameArr[i], errorMsg)){
					allIn = "NO";
					break;
				} else {
					//Get the actual field value
					fieldData[fieldNameArr[i]] = replaceBadChars(document.getElementById(fieldNameArr[i]).value);
				}

			} else {
				var fieldName = fieldNameArr[i].substr(1,fieldNameArr[i].length);
				//Get the actual field value
				if(trimString(document.getElementById(fieldName).value) == ''){
					var fieldValue = '_';
				} else {
					var fieldValue = replaceBadChars(document.getElementById(fieldName).value);
				}
				fieldData[fieldName] = fieldValue;
			}
		}
	}

	if(allIn != 'NO')
	{
		$.ajax({
			type: "POST",
			url: serverPage,
			data: JSON.stringify(fieldData),
			beforeSend: function() {
				if(layerShown != "") {
					$("#"+layerShown).hide('fast');
				}

				//Do not show the results layer if instructed not to
				if(displayLayer.charAt(0) != "*"){
					$("#"+displayLayer).show('fast');
				} else {
					//Remove the instruction after this point
					displayLayer = displayLayer.substr(1,displayLayer.length);
				}

				$("#"+displayLayer).html("<img src='"+getBaseURL()+"assets/images/loading.gif'>");
			},
			success: function(data) {
				$("#"+displayLayer).html(data);
			}
		});
	}

	//Prevent the form from submitting automatically
	return false;
}





//Function to remotely click an element
function clickItem(itemId)
{
	$('#'+itemId).click();
}


// Function to click an item if another is visible
function clickIfVisible(visibleItem,clickedItem)
{
	if($('#'+visibleItem).is(':visible')) clickItem(clickedItem);
}


//Function to submit a form
function submitForm(formId)
{
	$('#'+formId).submit();
}



// Validates the email entered.
function validateEmail(fieldValue){
	// The invalid characters that should not be used in an email address
	var invalidChars = " /:,;";
	var emailAddress = fieldValue;

	var atPosition = emailAddress.indexOf("@",1);
	var periodPosition = emailAddress.indexOf(".",atPosition);

	// Checks for the invalid characters listed above.
	for (var i=0; i<invalidChars.length; i++){
		badChar = invalidChars.charAt(i);
		if (emailAddress.indexOf(badChar,0) > -1){
			return false;
		}
	}

	if (atPosition == -1){ // Checks for the @
		return false;
	}
	if (emailAddress.indexOf("@",atPosition + 1) > -1){ // Makes sure there is one @
		return false;
	}
	if (periodPosition == -1){ // Makes sure there is a period after the @
		return false;
	}
	// Makes sure there is at least 2 characters after the period
	if ((periodPosition + 3) > emailAddress.length){
		return false;
	}

	return true;
}

// function used to check email and display message
function isValidEmail(fieldname, msg) {
	if (!validateEmail(document.getElementById(fieldname).value)) {
		if(msg != '')
		{
			alert(msg);
		}
		return false;
	}
	return true;
}


// Check if this is a valid password
function isValidPassword(fieldname, msg) {
	if (!validatePassword(document.getElementById(fieldname).value, false)) {
		if(msg != '')
		{
			alert(msg);
		}
		return false;
	}
	return true;
}


// Validate a password string
function validatePassword(password,showMsg){
	errors = [];
	if (password.length < 8) {
		errors.push("Your password must be at least 8 characters");
	}
	if (password.search(/[a-z]/i) < 0) {
		errors.push("Your password must contain at least one letter.");
	}
	if (password.search(/[0-9]/) < 0) {
		errors.push("Your password must contain at least one digit.");
	}
	if (errors.length > 0) {
		if(showMsg) alert(errors.join("\n"));
		return false;
	}
	return true;
}


//Function to append a value to a hidden field
function appendValueToHiddenField(hiddenFieldId, additionalInfo)
{
	if($('#'+hiddenFieldId).val() == '')
	{
		$('#'+hiddenFieldId).val(additionalInfo);
	}
	else
	{
		var oldInfo = $('#'+hiddenFieldId).val();
		$('#'+hiddenFieldId).val(oldInfo+'|'+additionalInfo);
	}
}




//Assign a value to a field
function assignFieldValue(fieldId, newValue)
{
	$('#'+fieldId).val(newValue);
}



// Change the HTML content of an area
function changeAreaHtml(areaId, newHtml)
{
	$('#'+areaId).html(newHtml);
}



// Remove elements with the given class name
function removeElements(className)
{
	$('.'+className).each(function(){ $(this).remove();});
}



//Show the one page navigation when a user is searching
function showOnePageNav(navDiv)
{
	$('#'+navDiv).html("<div class='previousbtn' style='display:none;'>&#x25c4;</div><div class='selected'>1</div><div class='nextbtn'>&#x25ba;</div>");

}




//Function to scroll to a named page element
function scrollToAnchor(anchorName)
{
	//$(window).scrollTop($('#'+anchorName).offset().top);
	var bodyObj = $("html, body");
	var topPos = $('#'+anchorName).offset().top;

	bodyObj.animate({ scrollTop: topPos+"px" }, 700, 'swing');
}





//Scrolls through multiple items in a horizontal list
function scrollThroughItems(direction, listStub)
{
	var currentSlide = parseInt($('#'+listStub+'_current_slide').val());
	var totalSlides = parseInt($('#'+listStub+'_total_slides').val());
	var itemsPerSlide = parseInt($('#'+listStub+'_per_slide').val());

	//Going backwards
	if(direction == 'previous')
	{
		$('#'+listStub+'_next_action').show('fast');
		if(currentSlide > 1)
		{
			var newCurrentSlide = currentSlide-1;
			$('#'+listStub+'_current_slide').val(newCurrentSlide);
			if(newCurrentSlide > 1)
			{
				$('#'+listStub+'_previous_action').show('fast');
			}
			else
			{
				$('#'+listStub+'_previous_action').hide('fast');
			}
		}
		else
		{
			$('#'+listStub+'_previous_action').hide('fast');
		}

		clickItem(listStub+'_previous');
	}
	//Going forward
	else
	{
		$('#'+listStub+'_previous_action').show('fast');
		if(currentSlide < (totalSlides-1))
		{
			$('#'+listStub+'_next_action').show('fast');
			$('#'+listStub+'_current_slide').val(currentSlide+1);
		}
		else if(currentSlide < totalSlides)
		{
			$('#'+listStub+'_next_action').hide('fast');
			$('#'+listStub+'_current_slide').val(currentSlide+1);
		}
		else
		{
			$('#'+listStub+'_next_action').hide('fast');
		}

		clickItem(listStub+'_next');
	}
}



//Function to remove a table row
function removeTableRow(rowId)
{
	$('#'+rowId).remove();
}


//Run search for select
function runSearchForSelect(inputObj, inputBtnId)
{
	//Put a dash if the search by field is not given
	if(!$('#'+inputBtnId+'__searchby').length)
	{
		var searchByFieldName = '_';
	}
	else
	{
		var searchByFieldName = inputBtnId+'__searchby';
	}

	//Determine the type of data to pull
	if(inputObj.is("[data-rel]"))
	{
		var dataType = inputObj.attr("data-rel");
	}
	else
	{
		var dataType = inputBtnId;
	}

	//Use the default action url if a url is not given
	if(!$('#'+inputBtnId+'__action').length)
	{
		var actionURL = getBaseURL()+'search/load_results/type/'+dataType+'/layer/'+inputBtnId+'__searchlist';
	}
	else
	{
		var actionURL = $('#'+inputBtnId+'__action').val();
	}


	//Get extra fields list if given
	if($('#'+inputBtnId+'__extrafields').length)
	{
		actionURL += '/extrafields/'+$('#'+inputBtnId+'__extrafields').val();
	}
	startInstantSearch(inputBtnId, searchByFieldName, actionURL);
}






//Function to set a confirm if the user is sending below an expected number of items
function msgOnExceedCheck(maxCountField, currentCountField, forwardUrl,displayDiv,msgToShow)
{
	if($('#'+maxCountField).val() > $('#'+currentCountField).val())
	{
		confirmActionToLayer(forwardUrl, '', '', displayDiv, msgToShow);
	}
	else
	{
		updateFieldLayer(forwardUrl,'','',displayDiv,'');
	}
}







//Function to update the sort of the type list
function updateSideListSort(listName, listType)
{
	//1. Remove the current action sort type if any
	var actionUrl = $('#'+listName+'_action').val();
	var urlArray = actionUrl.split('/');
	if(inArray(urlArray, 'sort', 'bool'))
	{
		var sortPosition = inArray(urlArray, 'sort', 'position');
		var sortValuePosition = sortPosition+1;
		//Remove these items from the URL
		urlArray.splice(sortPosition, 1);
		urlArray.splice(sortPosition, 1);
		//Put back the URL as given
		actionUrl = urlArray.join('/');
	}

	//2. Attach the new action sort type and update the action item
	actionUrl += '/sort/'+listType+'/action/sort_list';

	$('#'+listName+'_action').val(actionUrl);

	//$('.paginationtable tr').find('.selectedpagination').removeClass('selectedpagination');
	//$('.paginationtable tr').children(':nth-child(2)').addClass('selectedpagination');
	$('.sortheader .boldlink').removeClass('boldlink');
	$('#'+listName+'__'+listType).addClass('boldlink');

	//3. Now load the first page of the new list
	updateFieldLayer(actionUrl,'','',$('#'+listName+'_showdiv').val(),'');

}




function showUrlAndDivs(actionUrl, divList)
{
	var divArray = divList.split('<>');
	updateFieldLayer(actionUrl,'','',divArray[0],'');

	//Show more layers
	if(divArray.length > 1)
	{
		showLayerSet(divList);
	}
}





function isScrolledIntoView(checkerClass)
{
	var docViewTop = $(window).scrollTop();
	var docViewBottom = docViewTop + $(window).height();

	var elemTop = $('.'+checkerClass).offset().top;
	var elemBottom = elemTop + $('.'+checkerClass).height();

	return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}






//Function to check all boxes in a list by class
function selectAllByClass(checkAllBoxId, findClassName)
{
	var totalSelected = $('.'+findClassName).length;

	if($('#'+checkAllBoxId).prop("checked") )
	{
		$('.'+findClassName).each(function (index, element) {
			if(!$(element).prop("checked") )
			{
				$(element).click();
			}
		});
		showFieldValue('systemmessage', totalSelected+' items have been selected');
	}
	else
	{
		$('.'+findClassName).each(function (index, element) {
			if($(element).prop("checked") )
			{
				$(element).click();
			}
		});
		showFieldValue('systemmessage', totalSelected+' items have been unselected');
	}

	showFadingMessage();
}





//Function to show a fading message
function showFadingMessage(){
	$(".pagemessage").show().delay(4000).fadeOut();
}


//Function to show a fading message from the server side script
function showServerSideFadingMessage(msg)
{
	$(".pagemessage").hide('fast');
	showFieldValue('systemmessage', msg);
	showFadingMessage();
}


//Function to show a wait div so that the user does not click away or click many times to resubmit an action
function showWaitDiv(doThis)
{
	// Proceed depending on action
	// Show
	if(doThis == 'start'){
		//Now add new
		$('#__waitbox').offset({ top: 0, left: 0 });
		$('#__waitbox').height($(document).height());
		//Show the waitbox after repositioning it
		repositionWaitDiv();
		$('#__waitbox').fadeIn('fast');

	}
	// End
	else if(doThis == 'end')
	{
		if($('#__waitbox').length > 0){
			$('#__waitbox').fadeOut('fast');
		}
	}
}




//Function to reposition the wait div after it has been shown
function repositionWaitDiv()
{
	var waitDiv = $('#__waitbox div');
	//Postion iframe
	waitDiv.offset({ top: ($(window).outerHeight()*0.5 - waitDiv.outerHeight()*0.5), left: ($(window).outerWidth()*0.5 - waitDiv.outerWidth()*0.5) });
}




// Check if a date value is future date
function isFutureDate(dateString){
	// Process the date string
	var months = new Array('Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
	var dateArray = dateString.split(' ').shift().split('-');
	var dateStringFormatted = (months.indexOf(dateArray[1])+1)+'/'+dateArray[0]+'/'+dateArray[2];

	var now = new Date().getTime();
	var future = new Date(dateStringFormatted).getTime();

	return (now < future)? true: false;
}







// Get the classes on an element
function getElementClasses(elementId)
{
	return $('#'+elementId).attr('class').split(/\s+/);
}




// Get the user browser location if they accept
function setUserBrowserLocation(){
	//Only request the location if the browser session does not already have the location details
	if(localStorage.getItem('__answered_location') === null && !(localStorage.getItem('__latitude') !== null && localStorage.getItem('__longitude') !== null) && navigator.geolocation){
		//On success
		navigator.geolocation.getCurrentPosition(function(position) {
				localStorage.setItem('__latitude', ''+position.coords.latitude);
				localStorage.setItem('__longitude', ''+position.coords.longitude);
			},
			// On fail - do nothing
			function() {},
			// Time out paramenters
			{
				maximumAge:Infinity,
				timeout:5000
			});

		localStorage.setItem('__answered_location','Y');
	}
}




// detect IE
//returns version of IE or false, if browser is not Internet Explorer
function detectIEVersion() {
	var ua = window.navigator.userAgent;

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
		// IE 10 or older => return version number
		return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
		// IE 11 => return version number
		var rv = ua.indexOf('rv:');
		return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
		// IE 12 => return version number
		return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}






// reposition a drop down div 
function repositionDropDownDiv(fieldId){
	var windowHeight = $(window).height();
	var windowWidth = $(window).width();
	var divHeight = $('#'+fieldId+'__div').outerHeight();
	var divWidth = $('#'+fieldId+'__div').outerWidth();
	var fieldHeight = $('#'+fieldId).outerHeight();
	var fieldWidth = $('#'+fieldId).outerWidth();
	var fieldOffsetTop = $('#'+fieldId).offset().top;
	var fieldOffsetLeft = $('#'+fieldId).offset().left;

	// Set offset top
	var offsetTop = ((fieldOffsetTop + fieldHeight + divHeight) > windowHeight)? (fieldOffsetTop - divHeight) : (fieldOffsetTop + fieldHeight);

	// Set offset left
	var offsetLeft = ((fieldOffsetLeft + divWidth) > windowWidth)? (fieldOffsetLeft + fieldWidth - divWidth) : fieldOffsetLeft;
	$('#'+fieldId+'__div').offset({ top: offsetTop, left: offsetLeft });
}





//Is variable empty 
function isEmpty(val) {

	// test results
	//---------------
	// []        true, empty array
	// {}        true, empty object
	// null      true
	// undefined true
	// ""        true, empty string
	// ''        true, empty string
	// 0         false, number
	// true      false, boolean
	// false     false, boolean
	// Date      false
	// function  false

	if (val === undefined)
		return true;

	if (typeof (val) == 'function' || typeof (val) == 'number' || typeof (val) == 'boolean' || Object.prototype.toString.call(val) === '[object Date]')
		return false;

	if (val == null || val.length === 0)        // null or 0 length array
		return true;

	if (typeof (val) == "object") {
		// empty object

		var r = true;

		for (var f in val)
			r = false;

		return r;
	}

	return false;
}


// Capitalize first letter of words
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}


// CLose in-page card div
function closeInPageCardDiv(){
	$('#add_card_div').slideUp('fast');
	$('#add_card_div').html('');
}





//Is mobile device
function isMobile(){
	var check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
}
























//****************************************************************************************************** 
//jQuery default actions
//****************************************************************************************************** 
$(function() {

//Class goes to the DIV with the id specified in "data-rel" property of the element
	$(".jumper").on("click", function( e ) {
		e.preventDefault();
		$("body, html").animate({
			scrollTop: $('#'+$(this).attr('data-rel') ).offset().top - 30
		}, 600);
	});




//Class for hiding 
	$(".closefancybox").on("click", function( e ) {
		window.parent.parent.location.reload();
	});




// --------------------------------------------------------------------------------------------------------
// Positioning styles
// --------------------------------------------------------------------------------------------------------
	$(function(){
		// Fire on first load
		recenterBlock();

		// Update position on reload
		$(window).resize(function() {
			recenterBlock();
		});
	});





//For handling mock text field functionality for automatic email list validation
	$(".mocktextfield").bind('click', function(){
		$(this).children('input').first().focus();
	});


	$(document).ready(function()
	{
		var ctrlDown = false;
		var ctrlKey = 17, vKey = 86, cKey = 67, rKey = 13;

		$(document).keydown(function(e)
		{
			if (e.keyCode == ctrlKey) ctrlDown = true;


		}).keyup(function(e)
		{
			if (e.keyCode == ctrlKey) ctrlDown = false;
		});


		var emailField = $(".mocktextfield").children('input').first();
		var hiddenField = $(".mocktextfield").children('input').last().attr('id');

		emailField.bind('paste', function(e) {
			setTimeout(function() {
				extractAndAddCleanEmails(emailField, hiddenField, emailField.val());
			}, 0); //wrap the timeout for 0 milliseconds
		});

		emailField.bind('keydown', function(e) {
			//Prevent the return key from automatically submitting the form
			if(e.keyCode == rKey){
				e.preventDefault();
				extractAndAddCleanEmails(emailField, hiddenField, emailField.val());
				return false;
			}

			//If the user has done Ctrl+V to paste the values
			if(ctrlDown && e.keyCode == vKey){
				extractAndAddCleanEmails(emailField, hiddenField, emailField.val());
			}
		});

		emailField.bind('keyup', function(e) {
			if(!ctrlDown){
				var inputValue = emailField.val();
				var lastEnteredChar = inputValue.substr(inputValue.length - 1);
				if(isBadChar(lastEnteredChar) && !inArray(Array('@','-', '_', '.'), lastEnteredChar, 'bool')) {
					extractAndAddCleanEmails(emailField, hiddenField, inputValue);
				}
			}

		});
	});



	function extractAndAddCleanEmails(fieldObj, hiddenField, inputValue){
		var emailList = getEmailsInVal(inputValue);
		//Append only the valid emails
		if(emailList.length > 0){//alert('JUST: '+emailList.join());
			for(var i=0; i<emailList.length; i++){
				fieldObj.before("<div class='listdivs'>"+emailList[i]+"</div>");
				appendValueToHiddenField(hiddenField, emailList[i]);
			}
			fieldObj.val('');
		}
	}


//Get emails in the passed string
	function getEmailsInVal(inputValue){
		var indices = getAtCharIndices(inputValue);
		var emails = [];

		//Check if there is an email around any of the char characters obtained
		for(var i=0; i<indices.length;i++) {
			var emailString = getEmailAroundIndex(inputValue, indices[i]);
			if(validateEmail(emailString)) emails.push(emailString);
		}

		return emails;
	}


//Get email around index for a string
	function getEmailAroundIndex(string, index){
		var left = getLeftPart(string, index);
		var right = getRightPart(string, index);
		if(validateEmail(left+'@'+right)) return left+'@'+right;
	}


//Get the left part of an email
	function getLeftPart(string, index){
		var leftString = "";
		for(var i=index-1; i>-1;i--) {
			if(!isBadChar(string[i]) || (inArray(Array('.','-', '_'), string[i], 'bool') && typeof string[i-1] !== 'undefined' && !isBadChar(string[i-1])) ) {
				leftString = string[i]+leftString;
			} else {
				break;
			}
		}
		return leftString;
	}


//Get the right part of an email
	function getRightPart(string, index){
		var rightString = "";
		for(var i=index+1; i<string.length;i++) {
			if(!isBadChar(string[i]) || (inArray(Array('.','-', '_'), string[i], 'bool') && typeof string[i+1] !== 'undefined' && !isBadChar(string[i+1]))) {
				rightString += string[i];
			} else {
				break;
			}
		}
		return rightString;
	}



//Get the at char indices
	function getAtCharIndices(stringVal){
		var indices = [];
		for(var i=0; i<stringVal.length;i++) {
			if(stringVal[i] === "@") indices.push(i);
		}
		return indices;
	}





//Recenter block
	function recenterBlock(){
		if($('.center-block').length){
			var centerHeight = $('.center-block').outerHeight();
			var centerWidth = $('.center-block').outerWidth();
			var container = $('.center-block').parents('td').first();
			var containerHeight = container.height();
			var containerWidth = container.width();

			var topOffset = container.offset().top + (containerHeight / 2) - (centerHeight / 2);
			var leftOffset = container.offset().left + (containerWidth / 2) - (centerWidth / 2);

			if(!($('.center-block').hasClass('right-div') || $('.center-block').hasClass('left-div'))) {
				$('.center-block').offset({left: leftOffset});
			}

			$('.center-block').offset({top: topOffset });
		}
	}




//THe search field jquery
	$(document).on('keyup', '.searchfield', function(){
		if($(this).val() != '')
		{
			$(this).toggleClass('searchfield searchfieldclear');
		}
	});
	$(document).on('keyup', '.searchfieldclear', function(){
		if($(this).val() == '')
		{
			$(this).toggleClass('searchfieldclear searchfield');
		}
	});

	$(document).on('click', '.searchfieldclear', function(){
		$(this).val('');
	});


});



//Get the pagination 
$(document).on('click', '.paginationtable td', function(){
	$(this).parent('tr').find('td').removeClass('selectedpagination');
	$(this).addClass('selectedpagination');

	//Get the page number to load
	var cellContent = $(this).html();
	var pageNumber = cellContent;
	var paginationId = $(this).closest('table').attr('id');
	var paginationParts = paginationId.split('__');
	var tableId = paginationParts[0];
	var cellId = $(this).attr('id');

	//Check for last and first items
	//First Item
	if(isNaN(pageNumber) && cellId == tableId+'__first')
	{
		pageNumber = 1;
	}
	//Last item
	else if(isNaN(pageNumber) && cellId == tableId+'__last')
	{
		//Check if the last item 
		if($('#'+tableId+'_totalpageno').length > 0)
		{
			var pageNumber = parseInt($('#'+tableId+'_totalpageno').val());
		}
		else
		{
			var pageNumber = 1;
		}
	}

	var displayLayer = $('#'+tableId+'_showdiv').val();
	var serverPage = $('#'+tableId+'_action').val();
	var noPerPage = $('#'+tableId+'_noofentries').val();

	//Now go to the actual section div
	updateFieldLayer(serverPage+'/p/'+pageNumber+'/n/'+noPerPage,'','',displayLayer,'');
	if($('#'+paginationId).is("[data-rel]"))
	{
		scrollToAnchor($('#'+paginationId).attr('data-rel'));
	}
});








//Handles button actions
$(function() {
	$(document).on('click', 'button, .btndiv', function(){
		if(typeof $(this).data('url') !== 'undefined'){
			document.location.href=getBaseURL()+$(this).data('url');
		}
	});
});






//Handles toggle option button
$(function() {
	$(document).on('click', '.toggle-radio', function(){
		// Add a hidden field to store the radio value
		if(typeof $(this).attr('id') !== 'undefined' && $('#'+$(this).attr('id')+'__value').length == 0){
			$(this).after("<input type='hidden' id='"+$(this).attr('id')+"__value' name='"+$(this).attr('id')+"__value' value='"+($(this).hasClass('on')? "ON": "OFF")+"' />");
		}

		// Toggle it on or off
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			if(typeof $(this).attr('id') !== 'undefined' && $('#'+$(this).attr('id')+'__value').length) {
				$('#'+$(this).attr('id')+'__value').val('OFF');
			}

		} else {
			$(this).addClass('on');
			if(typeof $(this).attr('id') !== 'undefined' && $('#'+$(this).attr('id')+'__value').length) {
				$('#'+$(this).attr('id')+'__value').val('ON');
			}
		}
	});
});






//Handles the range div
$(function() {
	$(document).on('click', '.range-div div', function(){

		// Record the value of the clicked range
		if(typeof $(this).parent('.range-div').attr('id') !== 'undefined' && $('#'+$(this).parent('.range-div').attr('id')+'__value').length == 0) {
			$(this).parent('.range-div').after("<input type='hidden' id='"+$(this).parent('.range-div').attr('id')+"__value' name='"+$(this).parent('.range-div').attr('id')+"__value' value='"+($(this).index()+1)+"' />");
		}

		if($('#'+$(this).parent('.range-div').attr('id')+'__value').length){
			$('#'+$(this).parent('.range-div').attr('id')+'__value').val($(this).index()+1);
		}

		var clickedDiv = $(this);
		// Clear the active bg on all
		$(this).parent('.range-div').children('div').each(function(){
			$(this).removeClass('on');
		});
		// Now only apply to those before div
		$(this).parent('.range-div').children('div').each(function(){
			if(clickedDiv.index() >= $(this).index()){
				$(this).addClass('on');
			}
		});
	});
});







//Handles file upload fields
$(function() {
	$(document).on('click', '.uploadfield input:button', function(){
		var btnId = $(this).attr('id');
		var idParts = btnId.split('_');

		//Click the real field now
		$('#'+idParts[0]).click();
	});

	//A file has been submitted
	$(document).on('change', '.uploadfield input:file', function(e){
		var fieldId = $(this).attr('id');
		var parentDiv = $('.uploadfield');
		//Add the results div next to the upload field
		parentDiv.parent('td').append('<div id="'+fieldId+'__results"></div>');

		//------------------------------------
		//Enclose the div contents into a form
		//------------------------------------
		var divHTML = parentDiv.html();
		//Is the folder given
		if($('#'+fieldId+'__folder').length)
		{
			var folder = $('#'+fieldId+'__folder').val();
		}
		else
		{
			var folder = 'documents';
		}
		if($('#'+fieldId+'__form').attr('action') == '')
		{
			$('#'+fieldId+'__form').attr('action', getBaseURL()+"documents/upload_file/f/"+folder+"/s/"+fieldId);
		}
		updateFieldValue('layerid', fieldId);
		//Then submit the layer form
		$('#'+fieldId+'__form').submit();

		parentDiv.hide('fast');
	});

});








//For accepting numbers only in a field
$(function() {
	$('.numbersonly').keyup(function(e){
		if (/\D/g.test(this.value))
		{
			// Filter non-digits from input value.
			this.value = this.value.replace(/\D/g, '');
		}
	});


	$('.telephone').keyup(function(e){
		if($(this).val().length > 11)
		{
			$(this).val($(this).val().substr(0,11));
		}
	});

});


//For showing a fading message
$(function() {
	var messageDetails = $(".pagemessage").html();
	if(messageDetails != '')
	{
		//hookup the event
		$('.pagemessage').bind('isVisible', showFadingMessage);

		//show div and trigger custom event in callback when div is visible
		$('.pagemessage').show('fast', function(){
			$(this).trigger('isVisible');
		});
	}
});


//Put the message divs on each page
$( document ).ready(function() {
	if($('#systemmessage').length == 0) $('body').append('<div id="systemmessage" class="pagemessage"></div>');
	if($('#__waitbox').length == 0) $('body').append("<div id='__waitbox' style='display:none;'><div>&nbsp;</div></div>");
});





// --------------------------------------------------------------------------------------------------------
// Handling buttons with click otions
// --------------------------------------------------------------------------------------------------------
$(function(){
	$(document).on('click', '.btn, .greybtn', function(){console.log('BTN CLICKED');
		// If it is a link proceed with the action
		if($(this).data('rel')){
			var url = $(this).data('rel');
			if(url.indexOf('://') == -1) url = getBaseURL()+$(this).data('rel');
			console.log('URL: '+url);
			//Is this a button in a popup - iframe?
			if($(this).hasClass('frompop')){
				window.top.location.href = url;
			}
			else if($(this).data('target')){
				//Open in new tab
				if($(this).data('target') == 'blank') {
					var win = window.open(url, '_blank');
					win.focus();
				}
				//TODO: Put other open options here
			}
			// Simply redirect
			else
			{
				location.href = url;
			}
		}
	});

});





// --------------------------------------------------------------------------------------------------------
// Handling fields to enter
// --------------------------------------------------------------------------------------------------------
$(function(){
	$(document).on('keyup', '.submit-on-enter', function(e){
		if (e.keyCode == 13) {
			if($(this).data('targetbtn')) $('#'+$(this).data('targetbtn')).click();
		}
	});

});





// --------------------------------------------------------------------------------------------------------
// Change string length according to instructions
// --------------------------------------------------------------------------------------------------------
$(function(){
	if($('.limited-length').length){
		limitStringLength($('.limited-length'));
		$(window).resize(function(){ limitStringLength($('.limited-length'));});
	}
});


//Limit the string length
function limitStringLength(limitObj){
	var contentString = limitObj.data('value');
	if(limitObj.data('minlength') && $(window).width() < 401){
		var minLength = limitObj.data('minlength');
		var newString = contentString.substring(0, minLength)+(contentString.length > minLength? '..': '');
		limitObj.html(newString);
	}
	else if(limitObj.data('maxlength') && $(window).width() > 400){
		var maxLength = limitObj.data('maxlength');
		var newString = contentString.substring(0, maxLength)+(contentString.length > maxLength? '..': '');
		limitObj.html(newString);
	}
	else {
		limitObj.html(contentString);
	}
}




// --------------------------------------------------------------------------------------------------------
// Redirect to a page in the parent URL
// --------------------------------------------------------------------------------------------------------
$(function(){
	// Go back to parent window
	$(document).on('click', '[data-parenturl]', function(e){
		window.top.location.href = getBaseURL()+$(this).data('parenturl');
	});

	// Go back to previous page
	$(document).on('click', '.back', function(e){
		parent.history.back();
		return false;
	});


	// add the layer id if not available on a page
	if($('#layerid').length  == 0){
		$(document).append( "<input type='hidden' id='layerid' name='layerid' value=''>" );
	}
});






// Initialize the calendars on the page
$(function() {
	if($('.calendar').length > 0){

		/*$( ".calendar.birthday" ).datepicker({
		 changeMonth: true,
		 changeYear: true,
		 yearRange: "-100:+0",
		 dateFormat: 'mm/dd/yy'
		 });

		 $( ".calendar.history" ).datepicker({
		 changeMonth: true,
		 changeYear: true,
		 yearRange: "-200:+0",
		 dateFormat: 'mm/dd/yy'
		 });
		 */
		// This will require including the timepicker-addon js file
		if($('.calendar.showtime').length > 0){
			$('.calendar.showtime').datetimepicker({
				changeMonth: true,
				changeYear: true,
				dateFormat: 'mm/dd/yy',
				timeFormat: "hh:mm tt"
			});
		}

		$(".calendar").datetimepicker({
			changeMonth: true,
			changeYear: true,
			dateFormat: 'mm/dd/yy',
			timeFormat: 'hh:mm tt'
		});

	}
});

function setDatePicker()
{
	// Date only
	$( ".calendar.clickactivated:not(.showtime)" ).datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'mm/dd/yy'
	});
	$( ".calendar.clickactivated:not(.showtime)" ).focus();


	// Date and time
	$('.showtime.clickactivated').datetimepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'mm/dd/yy',
		timeFormat: "hh:mm tt"
	});
	$('.showtime.clickactivated').focus();
}



var http = getHTTPObject();