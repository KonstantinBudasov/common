import Accordion from "@/modules/containers/accordion/index";

Accordion();

var VISIBLE = 'is-visible';
var modalWindow = document.getElementById('modal-validation')

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

modalWindow.addEventListener("click", function(event) {
    var target = event.target.className
    if (target === 'modal__overlay' || target === 'button button--modal') {
        closeModal(modalWindow);
    }
});

document.addEventListener('keydown', function(event) {
    var key = event.key; 
    if (key === "Escape") {
        closeModal(modalWindow);
    }
});

// function showModal(e) {
//     e.classList.add(VISIBLE)
// }

function closeModal(e) {
    e.classList.remove(VISIBLE)
}