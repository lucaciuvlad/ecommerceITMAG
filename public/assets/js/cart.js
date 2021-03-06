import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  serverRequest,
  showNotification,
  debounce,
  appendElement,
  createElement,
  stickyTopButton,
  toggleStickyTopBtn,
} from "./global.js";

import {
  renderLocalProducts,
  removeProduct,
  addToFavFromCart,
  favItemsCounter,
  cartItemsCounter,
} from "./navigationBar.js";

const cart = document.querySelector("#cart");
toggleCssClass(cart, "active");

stickyTopButton.setAttribute("href", "#cart");
window.addEventListener("scroll", toggleStickyTopBtn);

const cartContainer = cart.querySelector(".cart");
const emtpyCart = cartContainer.querySelector(".cart__empty");
const cartInfo = cart.querySelector(".cartInfo");

let userID = null;
if (document.querySelector("#userId")) {
  userID = document.querySelector("#userId").dataset.user;
}

const cartProductsContainer = document.querySelector(".cart__products");

const cartSummary = (cartProducts) => {
  const productFinalPrice = document.querySelector(".cartInfo .productPrice");
  const wholeFinalPriceSpan = productFinalPrice.querySelector(".newFullPrice");
  const decimalFinalPriceSup = productFinalPrice.querySelector(
    ".newFullPriceDecimal"
  );
  const productWholePrices = Array.from(
    document.querySelectorAll(".cart__product .newFullPrice")
  );
  const productDecimalPrices = Array.from(
    document.querySelectorAll(".cart__product .newFullPriceDecimal")
  );
  const cartTaxWholePrice = document.querySelector(
    ".cartInfo .productTax .newFullPrice"
  );
  const cartTaxDecimalPrice = document.querySelector(
    ".cartInfo .productTax .newFullPriceDecimal"
  );
  const cartQuantity = document.querySelector(".cartInfo .productQuantity p");
  const totalCartPriceSpan = document.querySelector(".cartTotal .newFullPrice");
  const totalCartPriceSup = document.querySelector(
    ".cartTotal .newFullPriceDecimal"
  );

  let totalWholeFinalPrice = 0;
  let totalDecimalFinalPrice = 0;

  productWholePrices.forEach((productWholePrice) => {
    const wholePrice = parseInt(productWholePrice.innerHTML.trim());
    totalWholeFinalPrice += wholePrice;
  });

  productDecimalPrices.forEach((productDecimalPrice) => {
    const decimalPrice = parseInt(productDecimalPrice.innerHTML.trim());
    totalDecimalFinalPrice += decimalPrice;
  });

  if (totalDecimalFinalPrice > 99) {
    for (let i = 100; i < totalDecimalFinalPrice; i++) {
      totalDecimalFinalPrice -= i;
      totalWholeFinalPrice++;
    }
  }
  wholeFinalPriceSpan.innerHTML = totalWholeFinalPrice;
  decimalFinalPriceSup.innerHTML = totalDecimalFinalPrice;

  if (totalWholeFinalPrice > 2500) {
    cartTaxWholePrice.innerHTML = 0;
    cartTaxDecimalPrice.innerHTML = 0;
  } else {
    cartTaxWholePrice.innerHTML = 15;
    cartTaxDecimalPrice.innerHTML = 99;
  }

  let totalQuantity = 0;
  cartProducts.forEach((cartProduct) => {
    const product = JSON.parse(localStorage.getItem(cartProduct));
    totalQuantity += product.productQuantity;
  });
  cartQuantity.innerHTML = totalQuantity;

  let finalWholePrice = 0;
  let finalDecimalPrice = 0;

  finalWholePrice =
    totalWholeFinalPrice + parseInt(cartTaxWholePrice.innerHTML);
  finalDecimalPrice =
    totalDecimalFinalPrice + parseInt(cartTaxDecimalPrice.innerHTML);

  if (finalDecimalPrice > 99) {
    finalDecimalPrice -= 100;
    finalWholePrice++;
  }

  totalCartPriceSpan.innerHTML = finalWholePrice;
  totalCartPriceSup.innerHTML = finalDecimalPrice;
};

const deleteFromCartSql = (productID) => {
  if (userID != null) {
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
};

const deleteCartProduct = debounce((removeBtns) => {
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const productID = removeBtn.dataset.productId;

      deleteFromCartSql(productID);

      localStorage.removeItem(`cartProductId${productID}`);
      showNotification("Produsul a fost sters din cos!", null, 1500, "error");
      removeProduct(removeBtn, "cartProducts");

      renderCartProducts();
      renderLocalProducts(cartItemsCounter, "cartProducts");
    });
  });
}, 100);

const addToFav = debounce((addToFavBtns) => {
  addToFavBtns.forEach((addToFavBtn) => {
    addToFavBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const productID = addToFavBtn.dataset.productId;
      const actualCartProduct = JSON.parse(
        localStorage.getItem(`cartProductId${productID}`)
      );

      if (userID != null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("userID", userID);
        formData.append("productID", productID);
        formData.append("action", "toWishlist");

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
        `favProductId${productID}`,
        JSON.stringify(actualCartProduct)
      );
      localStorage.removeItem(`cartProductId${productID}`);

      showNotification(
        "Produsul a fost adaugat la favorite!",
        null,
        1500,
        null
      );

      addToFavFromCart(addToFavBtns);
      renderLocalProducts(cartItemsCounter, "cartProducts");
      renderLocalProducts(favItemsCounter, "favProducts");
      renderCartProducts();
    });
  });
}, 100);

export const renderCartProducts = () => {
  const localStorageLength = localStorage.length;
  const localStorageProducts = [];
  const localStorageCartProducts = [];

  for (let i = 0; i <= localStorageLength - 1; i++) {
    const actualProduct = localStorage.key(i);
    localStorageProducts.push(actualProduct);
  }

  localStorageProducts.forEach((product) => {
    if (product.startsWith("cartProductId")) {
      localStorageCartProducts.push(product);
    }
  });

  if (localStorageCartProducts.length === 0) {
    addCssClass(cartContainer, "emptyCart");
    addCssClass(cartInfo, "hidden");
    removeCssClass(emtpyCart, "hidden");
  } else {
    removeCssClass(cartInfo, "hidden");
    removeCssClass(cartContainer, "emptyCart");
    addCssClass(emtpyCart, "hidden");
  }

  cartProductsContainer.innerHTML = "";

  localStorageCartProducts.forEach((cartProduct) => {
    const localStorageCartProduct = JSON.parse(
      localStorage.getItem(cartProduct)
    );

    const cartProductContainer = createElement("div", "class", "cart__product");
    cartProductContainer.setAttribute(
      "data-id",
      localStorageCartProduct.productID
    );
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
    rangeNumber.innerHTML = localStorageCartProduct.productQuantity;
    appendElement(rangeNumber, rangeHeader);

    const caretDown = createElement("i", "class", "fa fa-caret-right");
    appendElement(caretDown, rangeHeader);

    const numberList = createElement("ul", "class", "numbers");
    for (let i = 0; i < 10; i++) {
      const numberItem = createElement("li", null, null);
      numberItem.innerHTML = i + 1;

      if (numberItem.innerHTML.trim() == rangeNumber.innerHTML.trim()) {
        addCssClass(numberItem, "active");
      } else {
        removeCssClass(numberItem, "active");
      }
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
    appendElement(addToFavBtn, cartActions);

    const favIcon = createElement("i", "class", "fa fa-heart-o");
    appendElement(favIcon, addToFavBtn);

    const addToFavMsg = createElement("span", null, null);
    addToFavMsg.innerHTML = "Adauga la favorite";
    appendElement(addToFavMsg, addToFavBtn);

    const removeBtn = createElement("button", "type", "button");
    removeBtn.setAttribute("class", "removeFromCart");
    removeBtn.setAttribute(
      "data-product-id",
      localStorageCartProduct.productID
    );
    appendElement(removeBtn, cartActions);

    const removeIcon = createElement("i", "class", "fa fa-trash");
    appendElement(removeIcon, removeBtn);

    const removeFromCartMsg = createElement("span", null, null);
    removeFromCartMsg.innerHTML = "Sterge";
    appendElement(removeFromCartMsg, removeBtn);

    const productPrice = createElement("div", "class", "price");
    appendElement(productPrice, cartProductContainer);

    if (localStorageCartProduct.productOldFullPrice != undefined) {
      const oldPrice = createElement("p", "class", "oldPrice");
      appendElement(oldPrice, productPrice);

      const oldFullPrice = createElement("span", "class", "oldFullPrice");
      if (localStorageCartProduct.oldWholePrice != undefined) {
        oldFullPrice.innerHTML = localStorageCartProduct.oldWholePrice;
      } else {
        oldFullPrice.innerHTML = localStorageCartProduct.productOldFullPrice;
      }
      appendElement(oldFullPrice, oldPrice);

      const oldFullPriceDecimal = createElement(
        "sup",
        "class",
        "oldFullPriceDecimal"
      );

      if (localStorageCartProduct.oldDecimalPrice != undefined) {
        oldFullPriceDecimal.innerHTML = localStorageCartProduct.oldDecimalPrice;
      } else {
        oldFullPriceDecimal.innerHTML =
          localStorageCartProduct.productOldFullPriceDecimal;
      }
      appendElement(oldFullPriceDecimal, oldPrice);

      const oldFullPriceCurr = createElement("span", null, null);
      oldFullPriceCurr.innerHTML = "Lei";
      appendElement(oldFullPriceCurr, oldPrice);
    }

    const newPrice = createElement("p", "class", "newPrice");
    appendElement(newPrice, productPrice);

    const newFullPrice = createElement("span", "class", "newFullPrice");
    if (localStorageCartProduct.newWholePrice != undefined) {
      newFullPrice.innerHTML = localStorageCartProduct.newWholePrice;
    } else {
      newFullPrice.innerHTML = localStorageCartProduct.productNewFullPrice;
    }
    appendElement(newFullPrice, newPrice);

    const newFullPriceDecimal = createElement(
      "sup",
      "class",
      "newFullPriceDecimal"
    );
    if (localStorageCartProduct.newDecimalPrice != undefined) {
      newFullPriceDecimal.innerHTML = localStorageCartProduct.newDecimalPrice;
    } else {
      newFullPriceDecimal.innerHTML =
        localStorageCartProduct.productNewFullPriceDecimal;
    }
    appendElement(newFullPriceDecimal, newPrice);

    const newFullPriceCurr = createElement("span", null, null);
    newFullPriceCurr.innerHTML = "Lei";
    appendElement(newFullPriceCurr, newPrice);

    cartSummary(localStorageCartProducts);

    const deleteProductBtns = Array.from(
      cartProductsContainer.querySelectorAll(".removeFromCart")
    );
    deleteCartProduct(deleteProductBtns);

    const addToFavBtns = cartProductsContainer.querySelectorAll(".addToFav");
    addToFav(addToFavBtns);
  });
};
renderCartProducts();

const updateProduct = (product, newQuantity) => {
  const productID = product.dataset.id;
  const currentProductInfo = JSON.parse(
    localStorage.getItem(`cartProductId${productID}`)
  );

  currentProductInfo.productQuantity = 0;
  currentProductInfo.productQuantity = newQuantity;

  let newWholePrice = 0;
  newWholePrice = currentProductInfo.productNewFullPrice * newQuantity;

  let newDecimalPrice = 0;
  newDecimalPrice = currentProductInfo.productNewFullPriceDecimal * newQuantity;

  let oldWholePrice = 0;
  oldWholePrice = currentProductInfo.productOldFullPrice * newQuantity;

  let oldDecimalPrice = 0;
  oldDecimalPrice = currentProductInfo.productOldFullPriceDecimal * newQuantity;

  if (newDecimalPrice > 99) {
    for (let i = 100; i <= newDecimalPrice; i++) {
      newDecimalPrice -= i;

      newWholePrice++;
    }
  }

  if (oldDecimalPrice > 99) {
    for (let i = 100; i <= oldDecimalPrice; i++) {
      oldDecimalPrice -= i;

      oldWholePrice++;
    }
  }

  currentProductInfo["newWholePrice"] = newWholePrice;
  currentProductInfo["newDecimalPrice"] = newDecimalPrice;
  currentProductInfo["oldWholePrice"] = oldWholePrice;
  currentProductInfo["oldDecimalPrice"] = oldDecimalPrice;

  const productNewFullPrice = product.querySelector(".newFullPrice");
  const productNewPriceDecimal = product.querySelector(".newFullPriceDecimal");
  let productOldFullPrice = null;
  let productOldPriceDecimal = null;

  if (product.querySelector(".oldFullPrice")) {
    productOldFullPrice = product.querySelector(".oldFullPrice");
    productOldPriceDecimal = product.querySelector(".oldFullPriceDecimal");

    productOldFullPrice.innerHTML = oldWholePrice;
    productOldPriceDecimal.innerHTML = oldDecimalPrice;
  }

  productNewFullPrice.innerHTML = newWholePrice;
  productNewPriceDecimal.innerHTML = newDecimalPrice;

  if (userID != null) {
    const request = serverRequest();

    const formData = new FormData();
    formData.append("newQuantity", newQuantity);
    formData.append("userId", userID);
    formData.append("productId", productID);

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status == 200) {
        const response = JSON.parse(request.response);

        if (!response.isUpdated) {
          console.error("EROARE SERVER");
        }
      }
    };

    request.open("POST", "classes/cart.class.php");
    request.send(formData);
  }

  localStorage.setItem(
    `cartProductId${productID}`,
    JSON.stringify(currentProductInfo)
  );

  renderCartProducts();
  renderLocalProducts(cartItemsCounter, "cartProducts");
};

const cartFunctionalities = () => {
  cartProductsContainer.addEventListener("click", (e) => {
    const rangeHeader = e.target;

    if (
      rangeHeader.classList.contains("range-header") ||
      rangeHeader.classList.contains("number") ||
      rangeHeader.classList.contains("fa-caret-right")
    ) {
      const rangeNumberList =
        rangeHeader.parentElement.querySelector(".range > ul") ||
        rangeHeader.parentElement.parentElement.querySelector(".range > ul");

      if (
        rangeHeader.classList.contains("number") ||
        rangeHeader.classList.contains("fa-caret-right")
      ) {
        toggleCssClass(rangeHeader.parentElement, "activeNumbers");
      } else {
        toggleCssClass(rangeHeader, "activeNumbers");
      }

      toggleCssClass(rangeNumberList, "active");

      rangeNumberList.addEventListener("click", (e) => {
        const spanNumber =
          rangeHeader.querySelector(".number") || rangeHeader.parentElement;
        const clickTarget = e.target;

        if (clickTarget.nodeName == "LI") {
          spanNumber.innerHTML = clickTarget.innerHTML;

          removeCssClass(rangeNumberList, "active");
          removeCssClass(rangeHeader, "activeNumbers");

          const quantity = Number(clickTarget.innerHTML.trim());
          const product = rangeNumberList.parentElement.parentElement;
          updateProduct(product, quantity);
        }
      });
    }
  });
};
cartFunctionalities();

const checkoutBtn = document.querySelector(".checkoutBtn");

const checkUserAddress = () => {
  const request = serverRequest();

  const formData = new FormData();
  formData.append("userId", userID);
  formData.append("checkUserAddress", true);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      if (response.userAddress == null) {
        showNotification(
          "Trebuie sa introduceti o adresa pentru a putea plasa o comanda!",
          "accountInfo.php",
          2500,
          "error"
        );
      } else {
        placeOrder();
      }
    }
  };

  request.open("POST", "classes/userAccount.class.php");
  request.send(formData);
};

const placeOrder = () => {
  const request = serverRequest();

  const formData = new FormData();
  formData.append("userId", userID);

  const cartProductCards = Array.from(
    document.querySelectorAll(".cart__product")
  );

  const loader = document.querySelector(".loader");
  loader.style.minHeight = `${window.innerHeight}px`;
  addCssClass(loader, "active");
  addCssClass(cart, "activeModal");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");
      removeCssClass(cart, "activeModal");
      const response = JSON.parse(request.response);

      if (response.orderId) {
        showNotification(
          `Comanda cu numarul ${response.orderId} a fost plasata cu succes!`,
          "index.php",
          2500,
          null
        );

        cartProductCards.forEach((productCard) => {
          const productId = productCard.dataset.id;
          deleteFromCartSql(productId);
          localStorage.removeItem(`cartProductId${productId}`);
        });
      }
    }
  };

  const productDetails = [];

  cartProductCards.forEach((productCard) => {
    const productId = productCard.dataset.id;
    const productQuantity = productCard.querySelector(
      ".range-header > .number"
    ).innerHTML;

    const productInfo = {
      productId: productId,
      productQuantity: productQuantity,
    };
    productDetails.push(JSON.stringify(productInfo));
  });

  productDetails.forEach((product) => {
    formData.append("product[]", product);
  });

  request.open("POST", "classes/orders.class.php");
  request.send(formData);
};

checkoutBtn.addEventListener("click", () => {
  checkUserAddress();
});
