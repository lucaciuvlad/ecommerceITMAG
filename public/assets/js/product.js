import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  createElement,
  appendElement,
  toggleStickyTopBtn,
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

const product = document.querySelector("#product");
toggleCssClass(product, "active");

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

const updateCarouselBullets = (currentImgIndex) => {
  productCarouselBullets.forEach((carouselBullet) => {
    removeCssClass(carouselBullet, "active");
  });

  addCssClass(productCarouselBullets[currentImgIndex], "active");
};

const carouselRight = () => {
  currentImgIndex++;

  productSlider.style.transform = `translateX(${
    -oneImgWidth * currentImgIndex
  }px)`;

  addCssClass(productCarouselLeft, "active");
  updateCarouselBullets(currentImgIndex);
};

const carouselLeft = () => {
  currentImgIndex--;

  productSlider.style.transform = `translateX(${
    -oneImgWidth * currentImgIndex
  }px)`;

  addCssClass(productCarouselRight, "active");
  updateCarouselBullets(currentImgIndex);
};

const productFunctionalities = () => {
  window.addEventListener("scroll", toggleStickyTopBtn);

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

const addToFavBtns = document.querySelectorAll(".addToFav");
const addToCartBtns = document.querySelectorAll(".addToCart");

const insertProduct = debounce((btn, index, productList) => {
  const productID = parseInt(btn.dataset.productId);

  const productName = document.querySelector(".product__name > h1").innerHTML;

  const productImage = document
    .querySelectorAll(".carousel__slider__slide")[0]
    .querySelector("img").src;

  const productOldFullPrice = parseInt(
    document.querySelector(".product__price .oldFullPrice").innerHTML.trim()
  );

  const productOldFullPriceDecimal = parseInt(
    document
      .querySelector(".product__price .oldFullPriceDecimal")
      .innerHTML.trim()
  );

  const productNewFullPrice = parseInt(
    document.querySelector(".product__price .newFullPrice").innerHTML.trim()
  );

  const productNewFullPriceDecimal = parseInt(
    document
      .querySelector(".product__price .newFullPriceDecimal")
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
    const localStorageFavProductId = JSON.parse(
      localStorage.getItem(`favProductId${productID}`)
    );
    const favBtnMessage = btn.querySelector("span");

    if (localStorageFavProductId == null) {
      if (userID !== null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("productID", productID);
        formData.append("userID", userID);
        formData.append("action", "insertFavProduct");

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

      favBtnMessage.innerHTML = "Adaugat la favorite";
    } else {
      if (userID !== null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("productID", productID);
        formData.append("userID", userID);
        formData.append("action", "deleteFavProduct");

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

      favBtnMessage.innerHTML = "Adauga la favorite";
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
        formData.append("action", "insertCartProduct");

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
        formData.append("action", "deleteCartProduct");

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
});

addToFavBtns.forEach((addToFavBtn, index) => {
  addToFavBtn.addEventListener("click", (e) => {
    e.preventDefault();
    insertProduct(addToFavBtn, index, "favProducts");
  });
});

addToCartBtns.forEach((addToCartBtn, index) => {
  addToCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    insertProduct(addToCartBtn, index, "cartProducts");
  });
});
