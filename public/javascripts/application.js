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

}) // END: document ready