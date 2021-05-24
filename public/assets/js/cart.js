import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  serverRequest,
  showNotification,
  appendElement,
  createElement,
} from "./global.js";

const cart = document.querySelector("#cart");
toggleCssClass(cart, "active");

// Render Local Storage Cart Products
const renderCartProducts = () => {
  const localStorageLength = localStorage.length;
  const localStorageProducts = [];
  const localStorageCartProducts = [];

  for (let i = 0; i <= localStorageLength - 1; i++) {
    const actualProduct = localStorage.key(i);
    localStorageProducts.push(actualProduct);
  }

  localStorageProducts.forEach((product) => {
    if (product.startsWith("cart")) {
      localStorageCartProducts.push(product);
    }
  });

  const cartProductsContainer = document.querySelector(".cart__products");
  cartProductsContainer.innerHTML = "";

  localStorageCartProducts.forEach((cartProduct) => {
    const localStorageCartProduct = JSON.parse(
      localStorage.getItem(cartProduct)
    );

    const cartProductContainer = createElement("div", "class", "cart__product");
    appendElement(cartProductContainer, cartProductsContainer);

    const productImg = createElement(
      "img",
      "src",
      `${localStorageCartProduct.productImage}`
    );
    appendElement(productImg, cartProductContainer);

    const productLink = createElement(
      "a",
      "href",
      `product.php?productID=${localStorageCartProduct.productID}`
    );
    productLink.innerHTML = localStorageCartProduct.productName;
    appendElement(productLink, cartProductContainer);

    const productRange = createElement("div", "class", "range");
    appendElement(productRange, cartProductContainer);

    const rangeHeader = createElement("div", "class", "range-header");
    appendElement(rangeHeader, productRange);

    const rangeNumber = createElement("span", "class", "number");
    rangeNumber.innerHTML = "1";
    appendElement(rangeNumber, rangeHeader);

    const caretDown = createElement("i", "class", "fa fa-caret-down");
    appendElement(caretDown, rangeNumber);

    const rangeUnit = createElement("span", null, null);
    appendElement(rangeUnit, rangeHeader);

    const numberList = createElement("ul", "class", "numbers");
    for (let i = 0; i < 10; i++) {
      const numberItem = createElement("li", null, null);
      numberItem.innerHTML = i + 1;
      appendElement(numberItem, numberList);
    }
    appendElement(numberList, productRange);

    const cartActions = createElement("div", "class", "actions");
    appendElement(cartActions, cartProductContainer);

    const addToFavBtn = createElement("button", "type", "button");
    addToFavBtn.setAttribute("class", "addToFav");
    addToFavBtn.setAttribute(
      "data-product-id",
      localStorageCartProduct.productID
    );
    addToFavBtn.innerHTML = "Adauga la favorite";
    appendElement(addToFavBtn, cartActions);

    const removeBtn = createElement("button", "type", "button");
    removeBtn.setAttribute("class", "removeFromCart");
    removeBtn.setAttribute(
      "data-product-id",
      localStorageCartProduct.productID
    );
    removeBtn.innerHTML = "Sterge";
    appendElement(removeBtn, cartActions);

    const productPrice = createElement("div", "class", "price");
    appendElement(productPrice, cartProductContainer);

    if (localStorageCartProduct.productOldFullPrice != undefined) {
      const oldPrice = createElement("p", "class", "oldPrice");
      appendElement(oldPrice, productPrice);

      const oldFullPrice = createElement("span", "class", "oldFullPrice");
      oldFullPrice.innerHTML = localStorageCartProduct.productOldFullPrice;
      appendElement(oldFullPrice, oldPrice);

      const oldFullPriceDecimal = createElement(
        "sup",
        "class",
        "oldFullPriceDecimal"
      );
      oldFullPriceDecimal.innerHTML =
        localStorageCartProduct.productOldFullPriceDecimal;
      appendElement(oldFullPriceDecimal, oldPrice);

      const oldFullPriceCurr = createElement("span", null, null);
      oldFullPriceCurr.innerHTML = "Lei";
      appendElement(oldFullPriceCurr, oldPrice);
    }

    const newPrice = createElement("p", "class", "newPrice");
    appendElement(newPrice, productPrice);

    const newFullPrice = createElement("span", "class", "newFullPrice");
    newFullPrice.innerHTML = localStorageCartProduct.productNewFullPrice;
    appendElement(newFullPrice, newPrice);

    const newFullPriceDecimal = createElement(
      "sup",
      "class",
      "newFullPriceDecimal"
    );
    newFullPriceDecimal.innerHTML =
      localStorageCartProduct.productNewFullPriceDecimal;
    appendElement(newFullPriceDecimal, newPrice);

    const newFullPriceCurr = createElement("span", null, null);
    newFullPriceCurr.innerHTML = "Lei";
    appendElement(newFullPriceCurr, newPrice);
  });
};

renderCartProducts();

const rangeNumbers = document.querySelectorAll(".range .number");
const rangeNumberLists = document.querySelectorAll(".range > ul");

const cartFunctionalities = () => {
  rangeNumbers.forEach((rangeNumber, index) => {
    rangeNumber.addEventListener("click", () => {
      toggleCssClass(rangeNumberLists[index], "active");
      toggleCssClass(rangeNumber, "activeNumbers");
    });
  });
};
cartFunctionalities();
