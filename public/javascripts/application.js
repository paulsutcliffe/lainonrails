// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults

$(document).ready(function(){

/*
==============================================================
Form Testimonios
==============================================================
*/
$('#testimonio_video_link').hide();
$('#testimonio_foto').hide();

$('#testimonio_tipo_testimonio').click(function() {
	$('#testimonio_video_link').show();
	$('#testimonio_foto').hide();
});

$('#testimonio_tipo_antesydespues').click(function() {
	$('#testimonio_video_link').hide();
	$('#testimonio_foto').show();
});






}) // END: document ready