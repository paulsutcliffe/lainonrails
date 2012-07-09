$(document).ready(function() {
  $(':password').showPassword({


    linkClass: 'show-password-link', //Class to use for the toggle link
	linkText: 'Mostrar', //Text for the link
	showPasswordLinkText: 'Ocultar', //Text for the link when password is not masked
	showPasswordInputClass: 'password-showing', //Class for the text input that will show the password
	linkRightOffset: 15, //Offset from the right of the parent
	linkTopOffset: 9 //Offset from the top of the parent
  });
});