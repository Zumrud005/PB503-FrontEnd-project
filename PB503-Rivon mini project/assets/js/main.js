let index = 0;
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
        const card = document.createElement("div");
        card.classList.add("product-card");

        const price = (product.price / 100).toFixed(2);
        const oldPrice = product.oldPrice ? (product.oldPrice / 100).toFixed(2) : null;

        card.innerHTML = `
            <div class="image-container">
                <img src="${product.image}" alt="${product.name}" />
                ${product.hoverImage ? `<img src="${product.hoverImage}" class="hover-image" alt="Hover Image">` : ""}
            </div>
            <h3>${product.name}</h3>
            <div class="rating">${generateStars(Math.round(product.rating))}</div> 
            <p>
                <strong>€${price}</strong>
                ${oldPrice ? `<span>€${oldPrice}</span>` : ""}
            </p>
            ${product.sale ? `<div class="badge">Sale</div>` : ""}
        `;

        container.appendChild(card);
    });
}



function displayArrivalProducts(products) {
    const container = document.getElementById("arrivalContainer");
    container.innerHTML = "";

    
    const newArrivals = products.filter(product => product.arrival === "new");

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
                <strong>€${price}</strong>
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
