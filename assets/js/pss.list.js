// JavaScript Document

$(function() {

	// Handle home-list tabs
	$(document).on('click', '.list-tabs td', function(){
		var clickedCell = $(this);
		var clickedId = $(this).attr('id');
		var tableType = $(this).parents('.list-tabs').first().data('type');
		var page = $(this).parents('.list-tabs').first().data('page');
		
		// a) remove the active class from every other cell
		$(this).parent('tr').children('td').each(function(){
			$(this).removeClass('active');
		});
		
		// b) add the active class to clicked cell
		clickedCell.addClass('active');
		
		// c) load the clicked cell section list
		updateFieldLayer(getBaseURL()+page+'/t/'+clickedId,'','',tableType+'_list','');
	});



});


