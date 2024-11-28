const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
const dotsNav = document.querySelector('.carousel-dots');
const dots = Array.from(dotsNav.children);
const nextButton = document.querySelector('.next-btn');
let currentIndex = 0;

const updateCarousel = (index) => {
    items.forEach((item, i) => {
        item.classList.remove('active');
        if (i === index) item.classList.add('active');
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) dot.classList.add('active');
    });

    track.style.transform = `translateX(-${index * items[0].offsetWidth}px)`;
};

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel(currentIndex);
    });
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length; 
    updateCarousel(currentIndex);
});
