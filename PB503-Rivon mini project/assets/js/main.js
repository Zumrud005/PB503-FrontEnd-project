let index = 0;

let wishlist = new Set();




function loadWishlistFromLocalStorage() {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
        const wishlistArray = JSON.parse(storedWishlist);
        wishlist = new Set(wishlistArray.map(id => id.toString())); 
    }
}

function saveWishlistToLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
}


function updateLocalStorage() {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
}

function updateWishlistCounter() {
    document.getElementById("wishlistCount").textContent = wishlist.size;
}


      
function addToWishlist(itemId) {
    wishlist.add(itemId.toString()); 
    saveWishlistToLocalStorage(); 
    updateWishlistCounter(); 
}



function updateHeartIcon(iconElement, productId) {
    if (wishlist.has(productId)) {
        iconElement.classList.remove("far");
        iconElement.classList.add("fas");
        iconElement.style.color = "black";
    } else {
        iconElement.classList.remove("fas");
        iconElement.classList.add("far");
        iconElement.style.color = "black";
    }
}





function moveSlide(step) {
    const wrapper = document.getElementById("testimonialWrapper");
    const cards = document.querySelectorAll(".testimonial-card");
    const totalSlides = cards.length;
    const visibleSlides = 2;
    index += step;
    if (index < 0) index = totalSlides - visibleSlides;
    if (index > totalSlides - visibleSlides) index = 0;
    wrapper.style.transform = `translateX(-${index * (100 / visibleSlides)}%)`;
}





async function fetchProducts() {
    try {
        const response = await fetch("http://localhost:3000/products");
        const products = await response.json();

        displayProducts(products);           
        displayArrivalProducts(products);  

    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}



function displayProducts(products) {

    const container = document.getElementById("productContainer");
    container.innerHTML = "";

    const limitedProducts = products.slice(0, 8);

    limitedProducts.forEach(product => {
        const productId = product.id.toString(); 
        const card = document.createElement("div");
        card.classList.add("product-card");
        card.style.position = "relative";

        const price = (product.price / 100).toFixed(2);
        const oldPrice = product.oldPrice ? (product.oldPrice / 100).toFixed(2) : null;

        card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" />
                ${product.hoverImage ? `<img src="${product.hoverImage}" class="hover-image" alt="Hover Image">` : ""}
                <div class="wishlist-icon">
                    <i class="far fa-heart"></i>
                </div>

            </div>
            <h3>${product.name}</h3>
            <div class="rating">${generateStars(Math.round(product.rating))}</div> 
            <p>
                <strong>€${price}</strong>
                ${oldPrice ? `<span>€${oldPrice}</span>` : ""}
            </p>
            ${product.sale ? `<div class="badge">Sale</div>` : ""}
        `;

      
        card.addEventListener("click", () => {
            window.location.href = `/PB503-Rivon%20mini%20project/detail.html?id=${product.id}`;
        });
        const heartIcon = card.querySelector(".wishlist-icon i");

        
        updateHeartIcon(heartIcon, productId);

      
        heartIcon.addEventListener("click", function (event) {
            event.stopPropagation();
            if (wishlist.has(productId)) {
                wishlist.delete(productId);
            } else {
                wishlist.add(productId);
            }

            updateHeartIcon(this, productId);
            updateLocalStorage();
            updateWishlistCounter();
        });

        container.appendChild(card);
    });

    updateWishlistCounter();
}


function displayArrivalProducts(products) {
    const container = document.getElementById("arrivalContainer");
    container.innerHTML = "";

    
    const newArrivals = products.filter(product => product.arrival === "new");

    newArrivals.forEach(product => {
        const productId = product.id.toString(); 
        const card = document.createElement("div");
        card.classList.add("product-card");

        const price = product.price ? (product.price / 100).toFixed(2) : "0.00";
        const oldPrice = product.oldPrice ? (product.oldPrice / 100).toFixed(2) : null;

        card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" />
                ${product.hoverImage ? `<img src="${product.hoverImage}" class="hover-image" alt="Hover Image">` : ""}
                <div class="wishlist-icon">
                <i class="far fa-heart"></i>
            </div> 
            </div>
            <h3>${product.name}</h3>
            <div class="rating">${generateStars(Math.round(product.rating || 0))}</div>
            <p>
                <strong>€${price}</strong>
                ${oldPrice ? `<span>€${oldPrice}</span>` : ""}
            </p>
            ${product.sale ? `<div class="badge">Sale</div>` : ""}
        `;

        card.addEventListener("click", () => {
            window.location.href = `/PB503-Rivon%20mini%20project/detail.html?id=${product.id}`;
        });

        
        const heartIcon = card.querySelector(".wishlist-icon i");

        updateHeartIcon(heartIcon, productId);

        heartIcon.addEventListener("click", function (event) {
            event.stopPropagation();
            if (wishlist.has(productId)) {
                wishlist.delete(productId);
            } else {
                wishlist.add(productId);
            }

            updateHeartIcon(this, productId);
            updateLocalStorage();
            updateWishlistCounter();
        });

        container.appendChild(card);
    });
}





fetchProducts();



function generateStars(rating) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            starsHTML += `<i class="fas fa-star"></i>`; 
        } else {
            starsHTML += `<i class="far fa-star"></i>`; 
        }
    }
    return starsHTML;
}



document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainProductImage");
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function () {
            mainImage.src = this.src;
            mainImage.alt = this.alt;
            thumbnails.forEach(thumb => thumb.classList.remove("active-thumbnail"));

            this.classList.add("active-thumbnail");
        });
    });

    const sizeButtons = document.querySelectorAll(".size-button");
    sizeButtons.forEach(button => {
        button.addEventListener("click", function () {
            sizeButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

  
    const decreaseBtn = document.getElementById("decrease");
    const increaseBtn = document.getElementById("increase");
    const quantityInput = document.getElementById("quantity");

    decreaseBtn.addEventListener("click", function () {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    increaseBtn.addEventListener("click", function () {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });
});


document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', function () {
        const accordionItem = this.parentElement;
        accordionItem.classList.toggle('active');
    });
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




document.addEventListener("DOMContentLoaded", function () {
    loadWishlistFromLocalStorage();
    updateWishlistCounter();
    fetchProducts();
});

