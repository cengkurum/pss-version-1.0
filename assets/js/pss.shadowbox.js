// JavaScript Document


// Make shadow box link show popup
$(function() {
	
	// Load the shadow box
	$(document).on('touchstart click', '.shadowbox', function(e){
		e.preventDefault();
		var parent = $(document);
		var parentWindow = $(window);
		var clickedItem = $(this);
		
		// Remove the shadow box if it is already on the page
		if($('#__shadowbox').length > 0){
			$('#__shadowbox').remove();
		}
		
		// Get url of the trigger element
		var url = $(this).attr('href')? $(this).attr('href'): $(this).data('url');
		
		
		// Check the view screen size to show full on small screens
		if(parentWindow.width() < 701)
		{
			// Put the div and iframe to load the link href
			$("<div id='__shadowbox' style='position:absolute;display:none;min-height:200px;overflow-y:auto;'><div id='__shadowbox_closer'></div><iframe src='"+url+"' style='width:100%;height:100vh;' marginheight='0' frameborder='0' id='__shadowbox_iframe'></iframe></div>").prependTo('body');
			
			// resize and reposition the div
			$('#__shadowbox').offset({ top:0, left:0 });
			$('#__shadowbox').height(parent.height());
			$('#__shadowbox').width(parent.width());
			
			//Add the black class if instructed so
			if(clickedItem.hasClass('black')) $('#__shadowbox iframe').addClass('black');
			
			// Position closer
			var closer = $('#__shadowbox_closer');
			closer.offset({top: ($(window).scrollTop()+2), left: (parentWindow.width() - closer.outerWidth() - 2) });
			// Position iFrame
			var iFrame = $('#__shadowbox iframe');
			iFrame.offset({ top:  $(window).scrollTop(), left: 0 });
		}
		
		// Large screen sizes
		else
		{
			var closable = $(this).hasClass('closable')? " class='closableframe' ": "";
		
			// If this URL requires in-system load, then do not pass the URL 
			if($(this).data('type') && $(this).data('type') == 'in-sys-load') {
				url = getBaseURL()+'page/redirect_url/url/'+replaceBadChars(url);
			}
		
			// Put the div and iframe to load the link href
			$("<div id='__shadowbox' style='display:none;'><iframe src='"+url+"' "+closable+" onload='repositionFrame()' marginheight='0' frameborder='0' id='__shadowbox_iframe'></iframe><div id='__shadowbox_closer'></div></div>").prependTo('body');
		
			// resize and reposition the div
			$('#__shadowbox').offset({ top:0, left:0 });
			$('#__shadowbox').height(parent.height());
			$('#__shadowbox').width(parent.width());
		
			var iFrame = $('#__shadowbox iframe');
			//Add the black class if instructed so
			if(clickedItem.hasClass('black')) iFrame.addClass('black');
			
			iFrame.css('max-height', (parentWindow.height()*0.8)+'px');
			iFrame.css('min-height', (clickedItem.data('minheight')? clickedItem.data('minheight'): '200')+'px');
			iFrame.css('min-width', (clickedItem.data('minwidth')? clickedItem.data('minwidth'): parentWindow.width()*0.4)+'px');
			iFrame.css('max-width', (parentWindow.width()*0.8)+'px');
		}
		
		
		
		//Show the shadowbox after loading the iframe
		$('#__shadowbox').fadeIn('fast');
	});
	
	
	// Close the shadowbox
	$(document).on('touchstart click', '#__shadowbox_closer', function(e){
		$('#__shadowbox').fadeOut('fast');
		$('#__shadowbox').remove();
	});
	
	
	
	

	// Close shadow box if user clicks outside and it allows closing
	$(document).on('touchend mouseup', function (e){
    	if($(".closableframe").length > 0)
		{
			var calloutContainer = $(".closableframe");
			var calloutContainerChildren = calloutContainer.find('body, table, div');
		
			//If the target of the click isn't the container... nor a descendant of the container, hide it
   			if (!calloutContainer.is(e.target) && calloutContainer.has(e.target).length === 0 && !calloutContainerChildren.is(e.target) && calloutContainerChildren.has(e.target).length === 0) 
    		{
       	 		$('#__shadowbox_closer').click();
    		}
		}
	});
	
	
	
	//Close the shadow box if the user resizes the window
	$(window).resize(function() { 
		if($('#__shadowbox').length){
			if(isMobile()){
				repositionFrame();
			}
			else $('#__shadowbox').remove();
		}
	});
	
	
	
	
	
	
	
	
	
});


//Function to reposition the iframe after it has been loaded
function repositionFrame()
{
	var iFrame = $('#__shadowbox iframe');
	var contentObj = iFrame.contents().find('table, div').first();
	iFrame.width(contentObj.width());
	iFrame.height(contentObj.height());
	
	//Postion iframe
	iFrame.offset({ top: ($(window).scrollTop() + (($(window).outerHeight() - iFrame.outerHeight())*0.5)), left: ($(window).outerWidth()*0.5 - iFrame.outerWidth()*0.5) });
	
	//Now position closer div
	repositionCloser(iFrame);
}


//Function to reposition the closer
function repositionCloser(iFrame)
{
	var closer = $('#__shadowbox_closer');
	closer.offset({top: (iFrame.offset().top + 3), left: (iFrame.offset().left + iFrame.outerWidth() - closer.outerWidth() - 5)});
}



// Close shadowbox inside iframe
function closeShadowBoxInFrame()
{
	$('#__shadowbox_closer', window.parent.document).click();
}