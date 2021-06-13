import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  debounce,
  serverRequest,
  showNotification,
} from "./global.js";

import {
  renderLocalProducts,
  favItemsCounter,
  cartItemsCounter,
  userID,
} from "./navigationBar.js";

const homepage = document.querySelector("#homepage");
toggleCssClass(homepage, "active");

// Product Carousel
const sliders = document.querySelectorAll(".productSection__carousel__slider");

sliders.forEach((slider) => {
  const nextBtn = slider.parentElement.querySelector(".rightBtn");
  const prevBtn = slider.parentElement.querySelector(".leftBtn");
  const slides = Array.from(slider.children);

  // Slider Initial Styles | Values
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

  // Slider Functionalities
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

  // For Each Slider Functionality Triggers
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

  // Product Price Formatting
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

// Local Favorite + Cart Products
const productSlides = document.querySelectorAll(
  ".productSection__carousel__slider__slide"
);

// Local Products Persistent State
productSlides.forEach((productSlide) => {
  const productFavBtn = productSlide.querySelector(".addToFav > i");
  const productFavBtnTooltipMessage = productSlide.querySelector(
    ".addToFav > .tooltip > p"
  );
  const productAddToCartBtn = productSlide.querySelector(".addToCart");
  const productName = productSlide.querySelector(".productName > p").innerHTML;

  const localStorageLength = localStorage.length;

  for (let i = 0; i <= localStorageLength - 1; i++) {
    const actualProduct = localStorage.key(i);

    if (actualProduct.startsWith("favProduct")) {
      const localStorageObject = JSON.parse(
        localStorage.getItem(actualProduct)
      );
      const localProductName = localStorageObject.productName;

      if (productName === localProductName) {
        productFavBtn.setAttribute("class", "fa fa-heart");
        productFavBtnTooltipMessage.innerHTML = "Adaugat la favorite";
      }
    } else if (actualProduct.startsWith("cartProduct")) {
      const localStorageObject = JSON.parse(
        localStorage.getItem(actualProduct)
      );
      const localProductName = localStorageObject.productName;

      if (productName === localProductName) {
        addCssClass(productAddToCartBtn, "active");
        const addToCartMsg = productAddToCartBtn.querySelector("span");
        addToCartMsg.innerHTML = "Adaugat in cos";
      }
    }
  }
});

const addToFavBtns = document.querySelectorAll(".addToFav");
const addToCartBtns = document.querySelectorAll(".addToCart");

const insertProduct = debounce((btn, index, productList) => {
  const asignmentOperator = productSlides[index].href.indexOf("=");
  const productID = parseInt(
    productSlides[index].href.slice(asignmentOperator + 1)
  );

  const productName =
    productSlides[index].querySelector(".productName > p").innerHTML;
  const productImage = productSlides[index].querySelector(
    ".productImage > img"
  ).src;
  const productOldFullPrice = parseInt(
    productSlides[index]
      .querySelector(".productPrice .oldFullPrice")
      .innerHTML.trim()
  );
  const productOldFullPriceDecimal = parseInt(
    productSlides[index]
      .querySelector(".productPrice .oldFullPriceDecimal")
      .innerHTML.trim()
  );
  const productNewFullPrice = parseInt(
    productSlides[index]
      .querySelector(".productPrice .newFullPrice")
      .innerHTML.trim()
  );
  const productNewFullPriceDecimal = parseInt(
    productSlides[index]
      .querySelector(".productPrice .newFullPriceDecimal")
      .innerHTML.trim()
  );

  let productInfo = null;

  if (productOldFullPrice == "" && productOldFullPriceDecimal == "") {
    productInfo = {
      productID: productID,
      productName: productName,
      productImage: productImage,
      productQuantity: 1,
      productNewFullPrice: productNewFullPrice,
      productNewFullPriceDecimal: productNewFullPriceDecimal,
    };
  } else {
    productInfo = {
      productID: productID,
      productName: productName,
      productImage: productImage,
      productQuantity: 1,
      productOldFullPrice: productOldFullPrice,
      productOldFullPriceDecimal: productOldFullPriceDecimal,
      productNewFullPrice: productNewFullPrice,
      productNewFullPriceDecimal: productNewFullPriceDecimal,
    };
  }

  if (productList == "favProducts") {
    const actualFavIcon = btn.querySelector("i");
    const actualFavToolTip = productSlides[index].querySelector(".tooltip > p");

    const localStorageFavProductId = JSON.parse(
      localStorage.getItem(`favProductId${productID}`)
    );

    if (localStorageFavProductId == null) {
      if (userID !== null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("productId", productID);
        formData.append("userId", userID);
        formData.append("action", "insertProduct");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.response);

            if (!response.isInserted) {
              console.error("EROARE SERVER");
            }
          }
        };

        request.open("POST", "classes/wishlist.class.php");
        request.send(formData);
      }

      localStorage.setItem(
        `favProductId${productID}`,
        JSON.stringify(productInfo)
      );

      showNotification(
        "Produsul a fost adaugat la favorite!",
        null,
        1500,
        null
      );
      renderLocalProducts(favItemsCounter, "favProducts");

      actualFavIcon.setAttribute("class", "fa fa-heart");
      actualFavToolTip.innerHTML = "Adaugat la favorite";
    } else {
      if (userID !== null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("productId", productID);
        formData.append("userId", userID);
        formData.append("action", "deleteProduct");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.response);

            if (!response.isDeleted) {
              console.error("EROARE SERVER");
            }
          }
        };

        request.open("POST", "classes/wishlist.class.php");
        request.send(formData);
      }

      localStorage.removeItem(`favProductId${productID}`);
      showNotification(
        "Produsul a fost sters de la favorite!",
        null,
        1500,
        "error"
      );
      renderLocalProducts(favItemsCounter, "favProducts");

      actualFavIcon.setAttribute("class", "fa fa-heart-o");
      actualFavToolTip.innerHTML = "Adauga la favorite";
    }
  }

  if (productList == "cartProducts") {
    const localStorageCartProductId = JSON.parse(
      localStorage.getItem(`cartProductId${productID}`)
    );

    if (localStorageCartProductId === null) {
      if (userID !== null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("productID", productID);
        formData.append("userID", userID);
        formData.append("action", "insertProduct");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.response);

            if (!response.isInserted) {
              console.error("EROARE SERVER");
            }
          }
        };

        request.open("POST", "classes/cart.class.php");
        request.send(formData);
      }

      localStorage.setItem(
        `cartProductId${productID}`,
        JSON.stringify(productInfo)
      );

      showNotification("Produsul a fost adaugat in cos!", null, 1500, null);
      renderLocalProducts(cartItemsCounter, "cartProducts");

      addCssClass(btn, "active");
      btn.querySelector("span").innerHTML = "Adaugat in cos";
    } else {
      if (userID !== null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("productID", productID);
        formData.append("userID", userID);
        formData.append("action", "deleteProduct");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.response);

            if (!response.isDeleted) {
              console.error("EROARE SERVER");
            }
          }
        };

        request.open("POST", "classes/cart.class.php");
        request.send(formData);
      }

      localStorage.removeItem(`cartProductId${productID}`);
      showNotification("Produsul a fost sters din cos!", null, 1500, "error");
      renderLocalProducts(cartItemsCounter, "cartProducts");

      removeCssClass(btn, "active");
      btn.querySelector("span").innerHTML = "Adauga in cos";
    }
  }
}, 100);

const indexPageFunctionalities = () => {
  // Add Current Product To Favorite LocalStorage And wishlists MySQL
  addToFavBtns.forEach((addToFavBtn, index) => {
    addToFavBtn.addEventListener("click", (e) => {
      e.preventDefault();
      insertProduct(addToFavBtn, index, "favProducts");
    });
  });

  // Add Current Product To Cart LocalStorage And MySQL
  addToCartBtns.forEach((addToCartBtn, index) => {
    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      insertProduct(addToCartBtn, index, "cartProducts");
    });
  });
};
indexPageFunctionalities();
