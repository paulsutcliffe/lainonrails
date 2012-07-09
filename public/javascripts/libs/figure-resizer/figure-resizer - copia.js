// $fluidEl = $(".gallery.video li"); is the parent of the frame

$(function() {
   
    //var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
    //$fluidEl = $(".gallery.video li");
	var $figures = $('img'),
    $fluidEl = $('#sidebar-first-inner'),
	$registerContainer = $('#block-registrate');
	  
	$figures.each(function() {
	
	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');
	
	});
	
	$(window).resize(function() {
	
	  var newWidth = $fluidEl.width();
	  var registerContainerWidth = $registerContainer.width();
	  $figures.each(function() {
	  
	    var $el = $(this).not('[src*="registrate"]');
	    $el
	        .width(newWidth)
	        .height(newWidth * $el.attr('data-aspectRatio'));
		
		var $register = $('img[src*="registrate"]');
		$register
		    .width(registerContainerWidth)
			.height(registerContainerWidth * $register.attr('data-aspectRatio'));
	  
	  });
	
	}).resize();

});