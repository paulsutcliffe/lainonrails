// $fluidEl = $(".gallery.video li"); is the parent of the frame

$(function() {
   
    var $figures = $('img'),
    $fluidEl = $("#sidebar-first-inner");
	$registerContainer = $('#block-registrate .inner');
	    	
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
	    $register.parent().parent().width(registerContainerWidth).height(registerContainerWidth * $register.attr('data-aspectRatio'));
	  });
	
	}).resize();

});