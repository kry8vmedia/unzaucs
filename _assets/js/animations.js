//VISIBILITY ANIMATIONS
//Navbar Opacity
$(window).scroll(function() {
    if($(this).scrollTop() > 500) {
        $('#home-nav').addClass('opaque');
    } else {
        $('#home-nav').removeClass('opaque');
    }
});

//Go Up Arrow
var offset = 600;
var duration = 300;
$(window).scroll(function() {
    if($(this).scrollTop() > offset) {
        $('#go-up').addClass('opaque');
    } else {
        $('#go-up').removeClass('opaque');
    }
});

/*$('#go-up').click(function(event) {
  event.preventDefault();
  $('html, body').animate({scrollTop: 0}, duration);
  return false;
});*/

/*DROPDOWN ANIMATIONS
// ADD SLIDEDOWN ANIMATION TO DROPDOWN //
$('.dropdown').on('show.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

// ADD SLIDEUP ANIMATION TO DROPDOWN //
$('.dropdown').on('hide.bs.dropdown', function(e){
  $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});*/

/*//Wait for Image to Load
$(function() {
	$('img').imgPreload()
})*/

/*
//TYPING ANIMATION
$(function(){
		$("#typed").typed({
			stringsElement: $('#typed-strings'),
			typeSpeed: 20,
			startDelay: 2000,
		});
	});*/
