import {
  addCssClass,
  removeCssClass,
  createElement,
  appendElement,
} from "./global.js";

const productCarousel = document.querySelector(".product .carousel");
const productSlider = productCarousel.children[0];
const productSliderImgs = Array.from(productSlider.children);
const productCarouselLeft = productCarousel.querySelector(".leftBtn");
const productCarouselRight = productCarousel.querySelector(".rightBtn");
const productCarouselBulletsContainer = productCarousel.querySelector(
  ".carousel__bulletBtns"
);

const oneImgWidth = productSliderImgs[0].clientWidth;
let currentImgIndex = 0;

// Generate Product Carousel Bullet Buttons
const generateCarouselBullets = () => {
  productSliderImgs.forEach((slideImg, slideImgIndex) => {
    const bulletBtn = createElement("button", "type", "button");
    appendElement(bulletBtn, productCarouselBulletsContainer);
  });
};
generateCarouselBullets();

const productCarouselBullets = Array.from(
  productCarouselBulletsContainer.children
);
addCssClass(productCarouselBullets[0], "active");

// Update The Current Product Carousel Bullet Button
const updateCarouselBullets = (currentImgIndex) => {
  productCarouselBullets.forEach((carouselBullet) => {
    removeCssClass(carouselBullet, "active");
  });

  addCssClass(productCarouselBullets[currentImgIndex], "active");
};

// Right Product Carousel Movement
const carouselRight = () => {
  currentImgIndex++;

  productSlider.style.transform = `translateX(${
    -oneImgWidth * currentImgIndex
  }px)`;

  addCssClass(productCarouselLeft, "active");
  updateCarouselBullets(currentImgIndex);
};

// Left Product Carousel Movement
const carouselLeft = () => {
  currentImgIndex--;

  productSlider.style.transform = `translateX(${
    -oneImgWidth * currentImgIndex
  }px)`;

  addCssClass(productCarouselRight, "active");
  updateCarouselBullets(currentImgIndex);
};

const product = () => {
  // Product Carousel Left Button Functionality
  productCarouselLeft.addEventListener("click", () => {
    if (currentImgIndex == 0) {
      return;
    }

    productSlider.addEventListener("transitionend", () => {
      if (currentImgIndex == 0) {
        removeCssClass(productCarouselLeft, "active");
      }
    });

    carouselLeft();
  });

  // Product Carousel Right Button Functionality
  productCarouselRight.addEventListener("click", () => {
    if (currentImgIndex == productSliderImgs.length - 1) {
      return;
    }

    productSlider.addEventListener("transitionend", () => {
      if (currentImgIndex == productSliderImgs.length - 1) {
        removeCssClass(productCarouselRight, "active");
      }
    });

    carouselRight();
  });
};
product();
