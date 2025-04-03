var swiper = new Swiper(".mySwiper", {
  slidesPerView: 4, 
  spaceBetween: 20, 
  navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
  },
  loop: false, 
  breakpoints: {
      1024: { slidesPerView: 4 },
      768: { slidesPerView: 2 },  
      480: { slidesPerView: 1 }   
  }
});