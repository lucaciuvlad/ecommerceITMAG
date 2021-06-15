import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  serverRequest,
  showNotification,
  debounce,
  appendElement,
  createElement,
  toggleStickyTopBtn,
  stickyTopButton,
} from "./global.js";

import {
  renderLocalProducts,
  removeProduct,
  addToCartFromFav,
  favItemsCounter,
  cartItemsCounter,
} from "./navigationBar.js";

const favProducts = document.querySelector("#favProducts");
toggleCssClass(favProducts, "active");

stickyTopButton.setAttribute("href", "#favProducts");
window.addEventListener("scroll", toggleStickyTopBtn);

const userPanelActions = document.querySelector(".userPanel__user__actions");
const userActions = Array.from(userPanelActions.children);

userActions.forEach((userAction) => {
  if (userAction.classList.contains("favoriteProducts")) {
    const spanText = userAction.querySelector("span");
    const icon = userAction.querySelector("i");
    addCssClass(userAction, "active");
    addCssClass(spanText, "active");
    addCssClass(icon, "active");
  }
});

const favProductsContainer = document.querySelector(".favProducts__products");
const emptyFavProducts = document.querySelector(".favProducts__empty");
const favProductsCounter = document.querySelector(
  ".favProducts__header > span"
);

let userID = null;
if (document.querySelector("#userId")) {
  userID = document.querySelector("#userId").dataset.user;
}

const deleteFavProduct = debounce((removeBtns) => {
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const productID = removeBtn.dataset.productId;

      if (userID != null) {
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
      showNotification("Produsul a fost sters din lista!", null, 1500, "error");
      removeProduct(removeBtn, "favProducts");

      renderFavProducts();
      renderLocalProducts(favItemsCounter, "favProducts");
    });
  });
}, 100);

const addToCart = debounce((addToCartBtns) => {
  addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const productID = addToCartBtn.dataset.productId;
      const actualFavProduct = JSON.parse(
        localStorage.getItem(`favProductId${productID}`)
      );

      if (userID != null) {
        const request = serverRequest();

        const formData = new FormData();
        formData.append("userID", userID);
        formData.append("productID", productID);
        formData.append("action", "toCart");

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
        `cartProductId${productID}`,
        JSON.stringify(actualFavProduct)
      );
      localStorage.removeItem(`favProductId${productID}`);

      showNotification(
        "Produsul a fost adaugat in cosul de cumparaturi!",
        null,
        1500,
        null
      );

      addToCartFromFav(addToCartBtns);
      renderFavProducts();
      renderLocalProducts(cartItemsCounter, "cartProducts");
      renderLocalProducts(favItemsCounter, "favProducts");
    });
  });
}, 100);

export const renderFavProducts = () => {
  const localStorageLength = localStorage.length;
  const localStorageProducts = [];
  const localStorageFavProducts = [];

  for (let i = 0; i <= localStorageLength - 1; i++) {
    const actualProduct = localStorage.key(i);
    localStorageProducts.push(actualProduct);
  }

  localStorageProducts.forEach((product) => {
    if (product.startsWith("fav")) {
      localStorageFavProducts.push(product);
    }
  });

  favProductsCounter.innerHTML = `${
    localStorageFavProducts.length == 1
      ? localStorageFavProducts.length + " produs"
      : localStorageFavProducts.length + " produse"
  }`;

  if (localStorageFavProducts.length === 0) {
    removeCssClass(emptyFavProducts, "hidden");
  } else {
    addCssClass(emptyFavProducts, "hidden");
  }

  favProductsContainer.innerHTML = "";
  localStorageFavProducts.forEach((favProduct) => {
    const localStorageFavProduct = JSON.parse(localStorage.getItem(favProduct));

    const favProductContainer = createElement(
      "div",
      "class",
      "favProducts__products__product"
    );
    appendElement(favProductContainer, favProductsContainer);

    const favProductImage = createElement(
      "img",
      "src",
      `${localStorageFavProduct.productImage}`
    );
    appendElement(favProductImage, favProductContainer);

    const favProductLink = createElement(
      "a",
      "href",
      `${localStorageFavProduct.productID}`
    );
    favProductLink.innerHTML = localStorageFavProduct.productName;
    appendElement(favProductLink, favProductContainer);

    const favActions = createElement("div", "class", "actions");
    appendElement(favActions, favProductContainer);

    const addToCartBtn = createElement("button", "type", "button");
    addToCartBtn.setAttribute("class", "addToCart");
    addToCartBtn.setAttribute(
      "data-product-id",
      localStorageFavProduct.productID
    );
    appendElement(addToCartBtn, favActions);

    const cartIcon = createElement("i", "class", "fa fa-shopping-cart");
    appendElement(cartIcon, addToCartBtn);

    const addToCartMsg = createElement("span", null, null);
    addToCartMsg.innerHTML = "Adauga in cos";
    appendElement(addToCartMsg, addToCartBtn);

    const removeBtn = createElement("button", "type", "button");
    removeBtn.setAttribute("class", "removeFromFav");
    removeBtn.setAttribute("data-product-id", localStorageFavProduct.productID);
    appendElement(removeBtn, favActions);

    const removeIcon = createElement("i", "class", "fa fa-trash");
    appendElement(removeIcon, removeBtn);

    const removeFromFavMsg = createElement("span", null, null);
    removeFromFavMsg.innerHTML = "Sterge";
    appendElement(removeFromFavMsg, removeBtn);

    const productPrice = createElement("div", "class", "price");
    appendElement(productPrice, favProductContainer);

    if (localStorageFavProduct.productOldFullPrice != undefined) {
      const oldPrice = createElement("p", "class", "oldPrice");
      appendElement(oldPrice, productPrice);

      const oldFullPrice = createElement("span", "class", "oldFullPrice");
      if (localStorageFavProduct.oldWholePrice != undefined) {
        oldFullPrice.innerHTML = localStorageFavProduct.oldWholePrice;
      } else {
        oldFullPrice.innerHTML = localStorageFavProduct.productOldFullPrice;
      }
      appendElement(oldFullPrice, oldPrice);

      const oldFullPriceDecimal = createElement(
        "sup",
        "class",
        "oldFullPriceDecimal"
      );

      if (localStorageFavProduct.oldDecimalPrice != undefined) {
        oldFullPriceDecimal.innerHTML = localStorageFavProduct.oldDecimalPrice;
      } else {
        oldFullPriceDecimal.innerHTML =
          localStorageFavProduct.productOldFullPriceDecimal;
      }
      appendElement(oldFullPriceDecimal, oldPrice);

      const oldFullPriceCurr = createElement("span", null, null);
      oldFullPriceCurr.innerHTML = "Lei";
      appendElement(oldFullPriceCurr, oldPrice);
    }

    const newPrice = createElement("p", "class", "newPrice");
    appendElement(newPrice, productPrice);

    const newFullPrice = createElement("span", "class", "newFullPrice");
    if (localStorageFavProduct.newWholePrice != undefined) {
      newFullPrice.innerHTML = localStorageFavProduct.newWholePrice;
    } else {
      newFullPrice.innerHTML = localStorageFavProduct.productNewFullPrice;
    }
    appendElement(newFullPrice, newPrice);

    const newFullPriceDecimal = createElement(
      "sup",
      "class",
      "newFullPriceDecimal"
    );
    if (localStorageFavProduct.newDecimalPrice != undefined) {
      newFullPriceDecimal.innerHTML = localStorageFavProduct.newDecimalPrice;
    } else {
      newFullPriceDecimal.innerHTML =
        localStorageFavProduct.productNewFullPriceDecimal;
    }
    appendElement(newFullPriceDecimal, newPrice);

    const newFullPriceCurr = createElement("span", null, null);
    newFullPriceCurr.innerHTML = "Lei";
    appendElement(newFullPriceCurr, newPrice);

    const deleteProductBtns =
      favProductsContainer.querySelectorAll(".removeFromFav");
    deleteFavProduct(deleteProductBtns);

    const addToCartBtns = favProductsContainer.querySelectorAll(".addToCart");
    addToCart(addToCartBtns);
  });
};
renderFavProducts();
