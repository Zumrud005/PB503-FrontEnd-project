document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', function () {
        const accordionItem = this.parentElement;
        accordionItem.classList.toggle('active');
    });
});



async function fetchProducts() {
    try {
        const response = await fetch("https://rivon-api.vercel.app/products");
        const products = await response.json();

        displayRecommendProducts(products);
        displayRecentlyProducts(products);
       

    } catch (error) {
        console.error("Failed to fetch products:", error);
    }
}

function displayRecommendProducts(products) {
    const container = document.getElementById("recommendContainer-2");
    container.innerHTML = "";

    const newArrivals = products.filter(product => product.recommended === true);

    newArrivals.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const price = product.price ? (product.price / 100).toFixed(2) : "0.00";
        const oldPrice = product.oldPrice ? (product.oldPrice / 100).toFixed(2) : null;

        card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" />
                ${product.hoverImage ? `<img src="${product.hoverImage}" class="hover-image" alt="Hover Image">` : ""}
            </div>
            <h3>${product.name}</h3>
            <div class="rating">${generateStars(Math.round(product.rating || 0))}</div>
            <p>
                <h6>€${price}</h6>
                ${oldPrice ? `<span>€${oldPrice}</span>` : ""}
            </p>
            ${product.sale ? `<div class="badge">Sale</div>` : ""}
        `;

        container.appendChild(card);
    });
}



function displayRecentlyProducts(products) {
    const container = document.getElementById("recentlyViewedContainer");
    container.innerHTML = "";

    const newArrivals = products.filter(product => product.recently === true);

    newArrivals.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        const price = product.price ? (product.price / 100).toFixed(2) : "0.00";
        const oldPrice = product.oldPrice ? (product.oldPrice / 100).toFixed(2) : null;

        card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" />
                ${product.hoverImage ? `<img src="${product.hoverImage}" class="hover-image" alt="Hover Image">` : ""}
            </div>
            <h3>${product.name}</h3>
            <div class="rating">${generateStars(Math.round(product.rating || 0))}</div>
            <p style="margin-top:-30px;">
                <h6>€${price}</h6>
                ${oldPrice ? `<span>€${oldPrice}</span>` : ""}
            </p>
            ${product.sale ? `<div class="badge">Sale</div>` : ""}
        `;

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



function getProductIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}


async function fetchProductById(id) {
    try {
        const response = await fetch(`https://rivon-api.vercel.app/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const product = await response.json();
        displayProductDetail(product);
    } catch (err) {
        console.error(err);
    }
}


function displayProductDetail(product) {
    document.getElementById("mainProductImage").src = product.image;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = `€${(product.price / 100).toFixed(2)}`;
   

}



document.addEventListener("DOMContentLoaded", () => {
    const productId = getProductIdFromURL();
    if (productId) {
        fetchProductById(productId);
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

function addToWishlist(itemId) {
    wishlist.add(itemId.toString());
    saveWishlistToLocalStorage(); 
    updateWishlistCounter(); 
}
