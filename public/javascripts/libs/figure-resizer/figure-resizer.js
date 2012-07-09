// $fluidEl = $(".gallery.video li"); is the parent of the frame

$(function() {
   
    var $figures = $('img'),
    $fluidEl = $("#sidebar-first-inner");
	    	
	$figures.each(function() {
	
	  $(this)
	    // jQuery .data does not work on object/embed elements
	    .attr('data-aspectRatio', this.height / this.width)
	    .removeAttr('height')
	    .removeAttr('width');
	
	});
	
	$(window).resize(function() {
	
	  var newWidth = $fluidEl.width();	  
	  $figures.each(function() {
	  
	    var $el = $(this);
	    $el
	        .width($el.parent().width())
	        .height($el.parent().width() * $el.attr('data-aspectRatio'));
			
		
	  });
	
	}).resize();

});