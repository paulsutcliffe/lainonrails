// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function(){

	/*
	==============================================================
	Form Testimonios
	==============================================================
	*/

	$('#testimonio_tipo_testimonio').click(function() {
		$('#testimonio_video_link').show();
	});

	$('#testimonio_tipo_antesydespues').click(function() {
		$('#testimonio_video_link').hide();
	});
	
	
	/*
	==============================================================
	Notify
	==============================================================
	*/

	$('#flash_alert').fadeOut(12000);
	$('#flash_notice').fadeOut(12000);
 
    /*
	==============================================================
	Tables
	==============================================================
	*/
	
	
	


}) // END: document ready