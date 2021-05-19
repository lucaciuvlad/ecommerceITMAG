import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  createElement,
  appendElement,
  toggleStickyTopBtn,
} from "./global.js";

const product = document.querySelector("#product");
toggleCssClass(product, "active");

// Product Price Formatting
const productOldFullPrice = document.querySelector(
  "p.oldPrice > .oldFullPrice"
);
const productOldPriceDecimal = document.querySelector(
  "p.oldPrice > .oldFullPriceDecimal"
);

const formatProductPrice = (productPrice, productDecimal) => {
  const fullProductPrice = productPrice.innerHTML;
  let intPart = null;
  let decimalPart = null;

  if (productPrice.innerHTML.trim() == "") {
    addCssClass(productPrice.parentElement, "hidden");
  } else {
    const dotPosition = fullProductPrice.search(/\./g);
    intPart = fullProductPrice.slice(0, dotPosition);
    decimalPart = fullProductPrice.slice(dotPosition + 1);
  }

  productPrice.innerHTML = intPart;
  productDecimal.innerHTML = decimalPart;
};
formatProductPrice(productOldFullPrice, productOldPriceDecimal);

const productNewFullPrice = document.querySelector(
  "p.newPrice > .newFullPrice"
);
const productNewPriceDecimal = document.querySelector(
  "p.newPrice > .newFullPriceDecimal"
);
formatProductPrice(productNewFullPrice, productNewPriceDecimal);

// Product Carousel
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

const productFunctionalities = () => {
  // Back To Top Button
  window.addEventListener("scroll", toggleStickyTopBtn);

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
productFunctionalities();
