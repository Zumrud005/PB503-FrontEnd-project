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


