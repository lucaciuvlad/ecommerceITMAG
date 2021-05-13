import {
    createHTMLElement,
    appendHTMLElement,
    setActive,
    removeActive,
    overlay
} from "./global.js";

overlay.style.height = `${document.body.clientHeight}px`;

const productCarousels = document.querySelectorAll(".product-carousel");

// Functionalities For All Carousels
productCarousels.forEach(ProductCarousel => {
    const slider = ProductCarousel.querySelector(".product-carousel__slider");

    const cards = ProductCarousel.querySelectorAll(".product-carousel__slider__slide");
    const oneCardWidth = cards[0].clientWidth + 10;

    const prevBtn = ProductCarousel.querySelector(".product-carousel>i.fa-chevron-left");
    const nextBtn = ProductCarousel.querySelector(".product-carousel>i.fa-chevron-right");

    const bulletsContainer = ProductCarousel.querySelector(".product-carousel__bullets");

    // Generate Bullet Navigation For Product Carousel
    const generateProductCarouselBullets = () => {
        for (let i = 6; i <= cards.length; i += 6) {
            const bullet = createHTMLElement("div", null);
            appendHTMLElement(bulletsContainer, bullet);
        }
    };
    generateProductCarouselBullets();

    // Set And Data Custom Attribute With The Proper Index For Each Bullet
    const productCarouselBullets = Array.from(bulletsContainer.children);
    productCarouselBullets.forEach((Bullet, Index) => {
        Bullet.setAttribute("data-index", `${Index}`);
    });


    // Initialize The Slider
    let sliderWidth = null;

    const initializeSlider = () => {
        setActive(nextBtn);
        setActive(productCarouselBullets[0]);

        slider.style.width = `${oneCardWidth * cards.length}px`;
        sliderWidth = parseInt(slider.style.width);
    };
    initializeSlider();

    // Update Bullet Navigation Based On Current Slide Index
    const updateProductCarouselBullets = SlideIndex => {
        productCarouselBullets.forEach((Bullet, Index) => {
            if (Bullet.classList.contains("active")) {
                Bullet.classList.remove("active");
            }

            if (SlideIndex == Index) {
                Bullet.classList.add("active");
            }
        });
    };

    // Next Visible Cards Slide
    let cardCounter = 0;
    let slideCounter = 0;

    const nextProductSlide = VisibleCards => {
        let remainingCards = null;

        if (VisibleCards !== null) {
            remainingCards = VisibleCards;
            cardCounter += VisibleCards;
        } else {
            cardCounter += 6;
            slideCounter++;
        }

        slider.style.transform = `translateX(-${oneCardWidth * cardCounter}px)`;

        setActive(prevBtn);
        updateProductCarouselBullets(slideCounter);

        if (cardCounter == cards.length - remainingCards) {
            removeActive(nextBtn);
            return;
        }
    };

    // Previous Visible Cards Slide
    const prevProductSlide = VisibleCards => {
        if (VisibleCards !== null) {
            cardCounter -= VisibleCards;
        } else {
            cardCounter -= 6;
            slideCounter--;
        }

        slider.style.transform = `translateX(-${oneCardWidth * cardCounter}px)`;

        setActive(nextBtn);
        updateProductCarouselBullets(slideCounter);

        if (cardCounter == 0) {
            removeActive(prevBtn);
            return;
        }
    };

    // Pointed Bullet Cards Slide
    const pointedBulletSlide = e => {
        const pointedBullet = e.target;

        if (pointedBullet.dataset.index) {
            const slideIndex = pointedBullet.dataset.index;

            if (pointedBullet.classList.contains("active")) {
                return;
            }

            if (slideIndex != 0) {
                nextProductSlide(null);
            } else {
                prevProductSlide(null);
            }
        } else {
            return;
        }
    };

    // Index Functionalities Trigger
    const indexFunctionalities = () => {
        nextBtn.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                nextProductSlide(3);
            } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
                nextProductSlide(4);
            } else if (window.innerWidth >= 1200) {
                nextProductSlide(null);

                if (cardCounter == cards.length / 2) {
                    removeActive(nextBtn);
                    return;
                }
            }
        });

        prevBtn.addEventListener("click", () => {
            if (window.innerWidth < 768) {
                prevProductSlide(3);
            } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
                prevProductSlide(4);
            } else if (window.innerWidth >= 1200) {
                prevProductSlide(null);
            }
        });

        bulletsContainer.addEventListener("click", pointedBulletSlide);
    };
    indexFunctionalities();
});