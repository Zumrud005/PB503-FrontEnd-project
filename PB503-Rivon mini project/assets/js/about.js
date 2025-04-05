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


window.onscroll = function () {
  const btn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
      btn.style.display = "block";
  } else {
      btn.style.display = "none";
  }
};


document.getElementById("scrollToTopBtn").addEventListener("click", function () {
  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });
});



wishlist = new Set();

function loadWishlistFromLocalStorage() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
        const wishlistArray = JSON.parse(storedWishlist);
        wishlist = new Set(wishlistArray.map(id => id.toString()));
    }
}

function updateWishlistCounter() {
    const counterElement = document.getElementById("wishlistCount");
    if (counterElement) {
        counterElement.textContent = wishlist.size; 
    }
}

document.addEventListener("DOMContentLoaded", function () {
    loadWishlistFromLocalStorage();  
    updateWishlistCounter(); 
});
