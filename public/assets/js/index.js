import { addCssClass, removeCssClass, toggleCssClass } from "./global.js";

const homepage = document.querySelector("#homepage");
toggleCssClass(homepage, "active");

const sliders = document.querySelectorAll(".productSection__carousel__slider");

sliders.forEach((slider) => {
  const nextBtn = slider.parentElement.querySelector(".rightBtn");
  const prevBtn = slider.parentElement.querySelector(".leftBtn");
  const slides = Array.from(slider.children);

  const oneSlideWidth = slides[0].clientWidth;
  const oneSlideMargin = parseFloat(
    window
      .getComputedStyle(slides[0])
      .getPropertyValue("margin")
      .split(" ")[1]
      .trim()
  );
  slider.style.width = `${
    oneSlideWidth * slides.length + oneSlideMargin * slides.length
  }px`;
  addCssClass(prevBtn, "hidden");

  let initialTouch = null;
  let currentTouch = null;
  let differenceTouch = null;
  let translatedValue = 0;
  let moving = false;

  const startGesture = (e) => {
    e.preventDefault();

    initialTouch = e.pageX;
    moving = true;

    const transformMatrix = window
      .getComputedStyle(slider)
      .getPropertyValue("transform");

    if (transformMatrix != "none") {
      translatedValue = parseFloat(transformMatrix.split(",")[4].trim());
    }
  };

  const moveGesture = (e) => {
    e.preventDefault();

    if (moving) {
      currentTouch = e.pageX;
      differenceTouch = initialTouch - currentTouch;

      slider.style.transform = `translateX(${
        -differenceTouch + translatedValue
      }px)`;
    }
  };

  const endGesture = (e) => {
    e.preventDefault();
    moving = false;

    const transformed = -differenceTouch + translatedValue;
    let visibleSlides = 0;

    if (transformed > 0) {
      slider.style.transform = `translateX(0px)`;
      addCssClass(prevBtn, "hidden");
      removeCssClass(nextBtn, "hidden");

      moving = false;
    }

    if (window.innerWidth >= 1200) {
      visibleSlides = 5.95;

      if (
        transformed <
        -(
          slider.clientWidth -
          oneSlideWidth * visibleSlides -
          oneSlideMargin * visibleSlides
        )
      ) {
        slider.style.transform = `translateX(${-(
          slider.clientWidth -
          oneSlideWidth * visibleSlides -
          oneSlideMargin * visibleSlides
        )}px)`;

        addCssClass(nextBtn, "hidden");
        removeCssClass(prevBtn, "hidden");

        moving = false;
      }
    }

    if (window.innerWidth < 768) {
      visibleSlides = 2.26;

      if (
        transformed <
        -(
          slider.clientWidth -
          oneSlideWidth * visibleSlides -
          oneSlideMargin * visibleSlides
        )
      ) {
        slider.style.transform = `translateX(${-(
          slider.clientWidth -
          oneSlideWidth * visibleSlides -
          oneSlideMargin * visibleSlides
        )}px)`;

        moving = false;
      }
    }
  };

  const nextSlides = (visibleSlides) => {
    slider.style.transform = `translateX(${-(
      slider.clientWidth -
      oneSlideWidth * visibleSlides -
      oneSlideMargin * visibleSlides
    )}px)`;

    slider.addEventListener("transitionend", () => {
      addCssClass(nextBtn, "hidden");
      removeCssClass(prevBtn, "hidden");
    });
  };

  const prevSlides = () => {
    slider.style.transform = `translateX(0px)`;
    slider.addEventListener("transitionend", () => {
      addCssClass(prevBtn, "hidden");
      removeCssClass(nextBtn, "hidden");
    });
  };

  slider.addEventListener("mousedown", (e) => {
    startGesture(e);
  });

  slider.addEventListener("mousemove", (e) => {
    moveGesture(e);
  });

  slider.addEventListener("mouseup", (e) => {
    endGesture(e);
  });

  nextBtn.addEventListener("click", () => {
    if (window.innerWidth >= 1200) {
      nextSlides(5.95);
    }
  });

  prevBtn.addEventListener("click", prevSlides);

  const productOldFullPrices = slider.querySelectorAll(
    "p.oldPrice > .oldFullPrice"
  );
  const productOldPriceDecimals = slider.querySelectorAll(
    "p.oldPrice > .oldFullPriceDecimal"
  );

  const formatProductPrice = (productPrices, productDecimals) => {
    productPrices.forEach((productPrice, index) => {
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
      productDecimals[index].innerHTML = decimalPart;
    });
  };
  formatProductPrice(productOldFullPrices, productOldPriceDecimals);

  const productNewFullPrices = slider.querySelectorAll(
    "p.newPrice > .newFullPrice"
  );
  const productNewPriceDecimals = slider.querySelectorAll(
    "p.newPrice > .newFullPriceDecimal"
  );
  formatProductPrice(productNewFullPrices, productNewPriceDecimals);
});

// Persisten Visualise Inserted Product
const productSlides = document.querySelectorAll(
  ".productSection__carousel__slider__slide"
);

productSlides.forEach((productSlide) => {
  const productFavBtn = productSlide.querySelector(".addToFav > i");
  const productFavBtnTooltipMessage = productSlide.querySelector(
    ".addToFav > .tooltip > p"
  );
  const productAddToCartBtn = productSlide.querySelector(".addToCart");
  const productName = productSlide
    .querySelector(".productName > p")
    .innerHTML.trim();

  const localStorageLength = localStorage.length;

  for (let i = 0; i <= localStorageLength - 1; i++) {
    const actualProduct = localStorage.key(i);

    if (actualProduct.startsWith("favProductId")) {
      const localStorageObject = JSON.parse(
        localStorage.getItem(actualProduct)
      );
      const localProductName = localStorageObject.productName.trim();

      if (productName == localProductName) {
        productFavBtn.setAttribute("class", "fa fa-heart");
        productFavBtnTooltipMessage.innerHTML = "Adaugat la favorite";
      }
    } else if (actualProduct.startsWith("cartProductId")) {
      const localStorageObject = JSON.parse(
        localStorage.getItem(actualProduct)
      );
      const localProductName = localStorageObject.productName;

      if (productName == localProductName) {
        addCssClass(productAddToCartBtn, "active");
        const addToCartMsg = productAddToCartBtn.querySelector("span");
        addToCartMsg.innerHTML = "Adaugat in cos";
      }
    }
  }
});
