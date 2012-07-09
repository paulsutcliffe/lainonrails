// rails-jConfirm
// patch for jquery-alerts script done by Ricardo Castañeda

// INSTRUCTIONS
// to change text of the heading of the alert
// :"data-heading" => 'Your Heading'
// to change question you must add this attribute to the link_to
// :"data-question" => '¿Your Question?'

$(document).ready(function(){
	function confirm_replace(){
	  // select all links with the data attribute delete, store all in a btn_del variable and then hide all
	  var btn_del = $('a[data-method="delete"]');
	  btn_del.hide();
	  
	  // insert a link before each btn_del
	  // this link must have the .jConfirm class 
	  btn_del.each(function(){
		$('<a class="jConfirm captiontext">' + $(this).text() + '</a>').insertBefore(this);		
	  })
	  
	  // Set the click method to the inserted links with the class jConfirm
	  $(".jConfirm").click(function(){
	    
	    // this will search the parent of the parent of the current element, in this case (ul)
	    // then it will remove the class current-jConfirm of all his children.
	    $(this).parent().parent().children().removeClass('current-jConfirm');
	    // the class current-jConfirm will be added to the parent of the current element
	    $(this).parent().addClass('current-jConfirm');
		
		
		
		// execute the jConfirm function, the (r) is true
		// the data('question') will become the text of the link
		jConfirm($('.current-jConfirm a[data-question]').data("question"), $('.current-jConfirm a[data-question]').data("heading"), function(r) {
	      if(r) {
		   // it will trigger the click method to the data attribute delete, that is children of the current parent of the .jConfirm link.
            $('.current-jConfirm a[data-method="delete"]').trigger('click');
	      } 
	    });
	
	  })
	
	  
	}
	
	// start the function
	confirm_replace();
	
	
})