import Accordion from "@/modules/containers/accordion/index";

Accordion();

// var stickyFooter = document.getElementsByClassName('page-footer--sticky')[0]


// document.addEventListener('DOMContentLoaded', function(e) {
//     document.addEventListener('scroll', function(e) {
//         let documentHeight = document.body.scrollHeight;
//         let currentScroll = window.scrollY + window.innerHeight;
//         // When the user is [modifier]px from the bottom, fire the event.
//         let modifier = 200; 
//         if(currentScroll + modifier > documentHeight) {
//             stickyFooter.classList.remove("page-footer--sticky");
//         } else {
//             stickyFooter.classList.add("page-footer--sticky");
//         }
//     })
// })

// $(window).scroll(function() {
//     var scrollBottom = $(window).scrollTop() + $(window).height();
//     if(scrollBottom > 100){
//         console.log('321')
//         $('.page-footer').removeClass('page-footer--sticky');
//     } else{
//         $('.page-footer').addClass('page-footer--sticky');
//     }

$(window).scroll(function() {
    var scrollBottom = $(window).scrollTop() + $(window).height() >= $(document).height() - 80
    if(scrollBottom) {
        $('.page-footer').removeClass('page-footer--sticky');
    } else {
        $('.page-footer').addClass('page-footer--sticky');
    }
 });

$(window).scroll(function() {
    var height = $(window).scrollTop();
    if(height > 100){
        $('.go-back-link').addClass('go-back-link--fixed');
    } else{
        $('.go-back-link').removeClass('go-back-link--fixed');
    }
});