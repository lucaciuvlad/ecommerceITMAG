import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  serverRequest,
  appendElement,
  createElement,
} from "./global.js";

import { insertProduct } from "./navigationBar.js";

const categories = document.querySelector("#categories");
toggleCssClass(categories, "active");

const commonFiltersBtn = document.querySelector(".commonFilters");
const filtersList = document.querySelector(".filters");
const filters = Array.from(filtersList.children);

const actualFilter = document.querySelector(".actualFilter");
const resetFilter = commonFiltersBtn.querySelector(".fa-times");

// Product Price Formatting
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

const filterRequest = (filterName) => {
  const request = serverRequest();

  const equalUrlMark = document.URL.indexOf("=");
  const categoryId = document.URL.slice(equalUrlMark + 1);

  const formData = new FormData();
  formData.append("filterName", filterName);
  formData.append("categoryID", categoryId);

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

      // Add Current Product To Favorite LocalStorage And wishlists MySQL
      addToFavBtns.forEach((addToFavBtn, index) => {
        addToFavBtn.addEventListener("click", (e) => {
          e.preventDefault();
          insertProduct(addToFavBtn, index, "favProducts", productSlides);
        });
      });

      // Add Current Product To Cart LocalStorage And MySQL
      addToCartBtns.forEach((addToCartBtn, index) => {
        addToCartBtn.addEventListener("click", (e) => {
          e.preventDefault();
          insertProduct(addToCartBtn, index, "cartProducts", productSlides);
        });
      });
    }
  };

  request.open("POST", "classes/category.class.php");
  request.send(formData);
};

const addToFavBtns = document.querySelectorAll(".addToFav");
const addToCartBtns = document.querySelectorAll(".addToCart");

const categoriesFunctionalities = () => {
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
