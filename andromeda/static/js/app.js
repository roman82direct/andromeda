AOS.init();

new Swiper('.collections-slider', {
speed: 900,
loop: true,
autoplay: {
    delay: 3000,
    disableOnInteraction: false
},
slidesPerView: 'auto',
pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
},
navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
},
breakpoints: {
    320: {
    slidesPerView: 1
    },
    1540: {
    slidesPerView: 1
    }
}
});
