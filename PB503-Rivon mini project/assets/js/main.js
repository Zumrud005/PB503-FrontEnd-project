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


