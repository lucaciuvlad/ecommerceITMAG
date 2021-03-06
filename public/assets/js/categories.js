import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  serverRequest,
  appendElement,
  createElement,
} from "./global.js";

import { insertProduct } from "./navigationBar.js";

// Popping Out The Content
const categories = document.querySelector("#categories");
toggleCssClass(categories, "active");

// DOM Elements
const commonFiltersBtn = document.querySelector(".commonFilters");
const filtersList = document.querySelector(".filters");
const filters = Array.from(filtersList.children);

const actualFilter = document.querySelector(".actualFilter");
const resetFilter = commonFiltersBtn.querySelector(".fa-times");

const mainCategories = document.querySelector(".categories");

const productOldFullPrices = mainCategories.querySelectorAll(
  "p.oldPrice > .oldFullPrice"
);
const productOldPriceDecimals = mainCategories.querySelectorAll(
  "p.oldPrice > .oldFullPriceDecimal"
);

const productNewFullPrices = mainCategories.querySelectorAll(
  "p.newPrice > .newFullPrice"
);
const productNewPriceDecimals = mainCategories.querySelectorAll(
  "p.newPrice > .newFullPriceDecimal"
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
formatProductPrice(productNewFullPrices, productNewPriceDecimals);

// Back-end Filtering
const filterRequest = (filterName) => {
  const request = serverRequest();

  const equalUrlMark = document.URL.indexOf("=");
  const firstAmpSign = document.URL.indexOf("&");
  let categoryId = null;
  if (firstAmpSign != -1) {
    categoryId = document.URL.slice(equalUrlMark + 1, firstAmpSign);
  } else {
    categoryId = document.URL.slice(equalUrlMark + 1);
  }

  const formData = new FormData();
  formData.append("filterName", filterName);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      const productIds = response.productId;

      const productContainer = document.querySelector(".categories__products");
      productContainer.innerHTML = "";

      for (let i = 0; i < productIds.length; i++) {
        const productLink = createElement(
          "a",
          "class",
          "categories__products__product"
        );
        productLink.setAttribute(
          "href",
          `product.php?productID=${productIds[i]}`
        );
        appendElement(productLink, productContainer);

        if (response.productOldPrice[i] != null) {
          const promoIndicator = createElement(
            "div",
            "class",
            "promoIndicator"
          );
          appendElement(promoIndicator, productLink);

          const promoPercent = createElement("span", null, null);
          const percent = Number(
            (response.productPrice[i] / response.productOldPrice[i]) * 100
          ).toFixed(0);
          promoPercent.innerHTML = `${percent}%`;
          appendElement(promoPercent, promoIndicator);
        }

        const addToFavBtn = createElement("button", "class", "addToFav");
        addToFavBtn.setAttribute("data-product-id", productIds[i]);
        addToFavBtn.setAttribute("type", "button");
        appendElement(addToFavBtn, productLink);

        const favIcon = createElement("i", "class", "fa fa-heart-o");
        appendElement(favIcon, addToFavBtn);

        const favToolTip = createElement("div", "class", "tooltip");
        appendElement(favToolTip, addToFavBtn);

        const favToolTipCaret = createElement(
          "i",
          "class",
          "fa fa-caret-right"
        );
        appendElement(favToolTipCaret, favToolTip);

        const favToolMessage = createElement("p", null, null);
        favToolMessage.innerHTML = "Adauga la favorite";
        appendElement(favToolMessage, favToolTip);

        const productImageContainer = createElement(
          "div",
          "class",
          "productImage"
        );
        appendElement(productImageContainer, productLink);

        const productImage = createElement(
          "img",
          "src",
          `../admin/assets/imgs/${response.productImage[i]}`
        );
        appendElement(productImage, productImageContainer);

        const productNameContainer = createElement(
          "div",
          "class",
          "productName"
        );
        appendElement(productNameContainer, productLink);

        const productName = createElement("p", null, null);
        productName.innerHTML = response.productName[i];
        appendElement(productName, productNameContainer);

        const productRatingContainer = createElement(
          "div",
          "class",
          "productRating"
        );
        appendElement(productRatingContainer, productLink);

        for (let j = 0; j < 5; j++) {
          const ratingStar = createElement("i", "class", "fa fa-star");
          appendElement(ratingStar, productRatingContainer);
        }

        const productPrice = createElement("div", "class", "productPrice");
        appendElement(productPrice, productLink);

        if (response.productOldPrice[i] != null) {
          const oldPrice = createElement("p", "class", "oldPrice");
          appendElement(oldPrice, productPrice);

          const oldFullPrice = createElement("span", "class", "oldFullPrice");
          oldFullPrice.innerHTML = response.productOldPrice[i];
          appendElement(oldFullPrice, oldPrice);

          const oldFullPriceDecimal = createElement(
            "sup",
            "class",
            "oldFullPriceDecimal"
          );
          appendElement(oldFullPriceDecimal, oldPrice);

          const oldFullPriceCurr = createElement("span", null, null);
          oldFullPriceCurr.innerHTML = "Lei";
          appendElement(oldFullPriceCurr, oldPrice);
        }

        const newPrice = createElement("p", "class", "newPrice");
        appendElement(newPrice, productPrice);

        const newFullPrice = createElement("span", "class", "newFullPrice");
        newFullPrice.innerHTML = response.productPrice[i];
        appendElement(newFullPrice, newPrice);

        const newFullPriceDecimal = createElement(
          "sup",
          "class",
          "newFullPriceDecimal"
        );
        appendElement(newFullPriceDecimal, newPrice);

        const newFullPriceCurr = createElement("span", null, null);
        newFullPriceCurr.innerHTML = "Lei";
        appendElement(newFullPriceCurr, newPrice);

        const addToCart = createElement("button", "class", "addToCart");
        addToCart.setAttribute("data-product-id", productIds[i]);
        appendElement(addToCart, productLink);

        const addToCartMessage = createElement("span", null, null);
        addToCartMessage.innerHTML = "Adauga in cos";
        appendElement(addToCartMessage, addToCart);
      }

      const productOldFullPrices = document.querySelectorAll(
        "p.oldPrice > .oldFullPrice"
      );
      const productOldPriceDecimals = document.querySelectorAll(
        "p.oldPrice > .oldFullPriceDecimal"
      );
      formatProductPrice(productOldFullPrices, productOldPriceDecimals);

      const productNewFullPrices = document.querySelectorAll(
        "p.newPrice > .newFullPrice"
      );
      const productNewPriceDecimals = document.querySelectorAll(
        "p.newPrice > .newFullPriceDecimal"
      );
      formatProductPrice(productNewFullPrices, productNewPriceDecimals);

      const addToFavBtns = document.querySelectorAll(".addToFav");
      const addToCartBtns = document.querySelectorAll(".addToCart");

      const productSlides = document.querySelectorAll(
        ".categories__products__product"
      );

      addToFavBtns.forEach((addToFavBtn, index) => {
        addToFavBtn.addEventListener("click", (e) => {
          e.preventDefault();

          insertProduct(addToFavBtn, index, "favProducts", productSlides);
        });
      });

      addToCartBtns.forEach((addToCartBtn, index) => {
        addToCartBtn.addEventListener("click", (e) => {
          e.preventDefault();

          insertProduct(addToCartBtn, index, "cartProducts", productSlides);
        });
      });
    }
  };

  const lastURLForwardSlash = document.URL.lastIndexOf("/");
  const pageName = document.URL.slice(lastURLForwardSlash + 1);

  // Format The Query String Parameter
  if (pageName.startsWith("category.php")) {
    formData.append("categoryID", categoryId);

    if (pageName.indexOf("brandID") != -1) {
      const lastIndexOfEqual = document.URL.lastIndexOf("=");
      const brandId = document.URL.slice(lastIndexOfEqual + 1);

      formData.append("brandID", brandId);
    }

    request.open("POST", "classes/category.class.php");
  } else if (pageName.startsWith("search.php")) {
    const equalOperator = document.URL.indexOf("=");
    const queryString = document.URL.slice(equalOperator + 1);

    formData.append("queryString", queryString);

    request.open("POST", "classes/category.class.php");
  }

  request.send(formData);
};

const categoriesFunctionalities = () => {
  // Filtering Events
  commonFiltersBtn.addEventListener("click", () => {
    toggleCssClass(filtersList, "active");
  });

  filters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const filterName = filter.innerHTML.trim();
      actualFilter.innerHTML = filterName;

      addCssClass(resetFilter, "active");
      removeCssClass(filtersList, "active");

      filterRequest(filterName);
    });
  });

  resetFilter.addEventListener("click", (e) => {
    removeCssClass(filtersList, "active");
    window.location.reload();
  });
};
categoriesFunctionalities();

// Persistent Visual Inserted Products
const productSlides = document.querySelectorAll(
  ".categories__products__product"
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

      if (productName === localProductName) {
        productFavBtn.setAttribute("class", "fa fa-heart");
        productFavBtnTooltipMessage.innerHTML = "Adaugat la favorite";
      }
    } else if (actualProduct.startsWith("cartProductId")) {
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
