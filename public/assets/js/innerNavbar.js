import {
    debounce,
    setActive,
    removeActive,
    createHTMLElement,
    appendHTMLElement
} from "./global.js";

import {
    removeNavbarElementActive,
    navbarSearchSuggestions
} from "./navbar.js"

const carousel = document.querySelector(".inner-nav-header__carousel");
const carouselSlider = carousel.children[0]
const carouselSlides = Array.from(carouselSlider.children);
const carouselBulletsContainer = carousel.children[1];
const carouselPrevBtn = carousel.children[2];
const carouselNextBtn = carousel.children[3];

const oneSlideWidth = carouselSlides[0].clientWidth;
carouselSlider.style.width = `${oneSlideWidth * carouselSlides.length}px`;

let slideCounter = 0;

// Generate Bullets Navigation For Carousel
const generateBullets = () => {
    for (let i = 0; i <= carouselSlides.length - 1; i++) {
        const createdElement = createHTMLElement("div", null);
        appendHTMLElement(carouselBulletsContainer, createdElement);
    }
};
generateBullets();

// Update The Carousel's Bullets
const carouselBullets = Array.from(carouselBulletsContainer.children);
setActive(carouselBullets[0]);

carouselBullets.forEach((Bullet, Index) => {
    Bullet.setAttribute("data-index", `${Index}`);
});

const updateBullets = (Bullets, BulletIndex) => {
    Bullets.forEach(Bullet => {
        const bulletId = Bullet.dataset.index;

        if (bulletId == BulletIndex) {
            setActive(Bullet);
        } else {
            removeActive(Bullet);
        }
    });
};

// Move The Carousel To The Next Slide
const moveToNextSlide = BulletId => {
    if (BulletId !== null) {
        slideCounter = BulletId;
    }

    slideCounter++;
    carouselSlider.style.transform = `translateX(-${oneSlideWidth * slideCounter}px)`;
    updateBullets(carouselBullets, slideCounter);

    if (slideCounter > carouselSlides.length - 1) {
        slideCounter = 0;
        carouselSlider.style.transform = `translateX(-${oneSlideWidth * slideCounter}px)`;
        updateBullets(carouselBullets, slideCounter);
    }
};

// Move The Carousel To The Previous Slide
const moveToPrevSlide = () => {
    slideCounter--;
    carouselSlider.style.transform = `translateX(-${oneSlideWidth * slideCounter}px)`;
    updateBullets(carouselBullets, slideCounter);

    if (slideCounter < 0) {
        slideCounter = carouselSlides.length - 1;
        carouselSlider.style.transform = `translateX(-${oneSlideWidth * slideCounter}px)`;
        updateBullets(carouselBullets, slideCounter);
    }
};

// Move The Carousel Automatically To The Next Slide
let automaticSlider = setInterval(() => {
    moveToNextSlide(null);
}, 2000);

// Move The Carousel To Specific Bullet Pointed Slide
const moveToPointedSlide = e => {
    const targetElement = e.target;

    if (targetElement.dataset.index) {
        clearInterval(automaticSlider);

        const targetBulletId = targetElement.dataset.index;
        carouselSlider.style.transform = `translateX(-${oneSlideWidth * targetBulletId}px)`;
        updateBullets(carouselBullets, targetBulletId);

        // Start The Automatic Slider From Last Bullet Pointed Slide
        automaticSlider = setInterval(() => {
            moveToNextSlide(targetBulletId);
        }, 2000);
    }
};

// Carousel Functionalities Trigger
const carouselFunctionalities = () => {
    carouselNextBtn.addEventListener("click", () => {
        clearInterval(automaticSlider);

        moveToNextSlide(null);

        automaticSlider = setInterval(() => {
            moveToNextSlide(null);
        }, 2000);
    });

    carouselPrevBtn.addEventListener("click", () => {
        clearInterval(automaticSlider);

        moveToPrevSlide();

        automaticSlider = setInterval(() => {
            moveToNextSlide(null);
        }, 2000);
    });

    carouselBulletsContainer.addEventListener("click", moveToPointedSlide);
};
carouselFunctionalities();


// Inner Navbar Categories
const innerNavCategoriesTab = document.querySelector(".inner-nav .categories");
const innerNavCategories = document.querySelector(".inner-nav-header__categories");

// Show Product Categories
const showProductCategories = () => {
    setActive(innerNavCategories);

    if (navbarSearchSuggestions.classList.contains("active")) {
        removeNavbarElementActive(navbarSearchSuggestions);
    }
};

// Hide Product Categories
export const hideProductCategories = () => {
    removeActive(innerNavCategories);
};

// Inner Navigation Bar Category Tab Functionalities
const innerNavCategoryFunctionalities = () => {
    if (window.innerWidth < 1200) {
        innerNavCategoriesTab.addEventListener("click", () => {
            if (!innerNavCategories.classList.contains("active")) {
                showProductCategories();
            } else {
                hideProductCategories();
            }
        });
    }

    if (window.innerWidth >= 1200) {
        innerNavCategoriesTab.addEventListener("mouseenter", () => {
            showProductCategories();
        });

        innerNavCategories.addEventListener("mouseleave", () => {
            hideProductCategories();
        });
    }
};
innerNavCategoryFunctionalities();