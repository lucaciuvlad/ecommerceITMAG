import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  debounce,
  serverRequest,
  createElement,
  appendElement,
  showNotification,
} from "./global.js";

const currentPageName = document.URL.lastIndexOf("/");
const currentURL = document.URL.slice(currentPageName + 1);

const navigationBar = document.querySelector(".navbar");

const leftMenu = document.querySelector(".navbar__left__menu");
const hamburgerBtn = leftMenu.querySelector(".hamburger");
const hamburgerIcon = hamburgerBtn.querySelector("i");
const leftMenuCategories = leftMenu.querySelector(
  ".navbar__left__menu__categories"
);

const searchBar = document.querySelector(".navbar__search");
const searchBarInput = searchBar.querySelector(".navbar__search__input");
const searchInput = searchBar.querySelector(".navbar__search__input > input");
const searchCloseIcon = searchBar.querySelector(
  ".navbar__search__input > i.fa-times"
);
const searchBtn = searchBar.querySelector(
  ".navbar__search__input > i.fa-search"
);
const searchSuggestions = document.querySelector(
  ".navbar__search__suggestions"
);
const searchSuggestionsList = searchSuggestions.querySelector("ul");
const searchBackBtn = searchSuggestions.querySelector(
  ".navbar__search__suggestions__back"
);

const searchToolBtn = document.querySelector(".navbar__right > button");

const userContainer = document.querySelector(".navbar__right__user");
const userLink = userContainer.querySelector("a");
const userIcon = userLink.querySelector("i");
const userPanel = userContainer.querySelector(".navbar__right__user__panel");

const showLeftMenuCategories = () => {
  addCssClass(leftMenuCategories, "active");
  addCssClass(hamburgerBtn, "active");
  addCssClass(hamburgerIcon, "active");
};

const hideLeftMenuCategories = () => {
  removeCssClass(leftMenuCategories, "active");
  removeCssClass(hamburgerBtn, "active");
  removeCssClass(hamburgerIcon, "active");
};

const showUserPanel = () => {
  addCssClass(userPanel, "active");
  addCssClass(userLink, "active");
  addCssClass(userIcon, "active");
};
const hideUserPanel = () => {
  removeCssClass(userPanel, "active");
  removeCssClass(userLink, "active");
  removeCssClass(userIcon, "active");
};

const searchEngine = () => {
  const request = serverRequest();

  const formData = new FormData();
  formData.append("searchString", searchInput.value);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      searchSuggestionsList.innerHTML = "";

      if (response.rowNr != 0) {
        for (let i = 0; i < response.rowNr; i++) {
          const suggestionItem = createElement("li", null, null);
          appendElement(suggestionItem, searchSuggestionsList);

          const suggestionLink = createElement(
            "a",
            "href",
            `product.php?productID=${response.product_id[i]}`
          );
          appendElement(suggestionLink, suggestionItem);

          const suggestionImage = createElement(
            "img",
            "src",
            `../admin/assets/imgs/${response.product_image[i]}`
          );
          appendElement(suggestionImage, suggestionLink);

          const suggestionName = createElement("span", null, null);
          suggestionName.innerHTML = response.product_name[i];
          appendElement(suggestionName, suggestionLink);
        }
      } else {
        const noItemFoundMessage = createElement("p", null, null);
        noItemFoundMessage.innerHTML = "Nu a fost gasit niciun rezultat.";
        appendElement(noItemFoundMessage, searchSuggestionsList);
      }

      if (response.searchString != null) {
        const noItemFoundMessage = createElement("p", null, null);
        noItemFoundMessage.innerHTML = "Nu a fost gasit niciun rezultat.";
        appendElement(noItemFoundMessage, searchSuggestionsList);
      }
    }
  };

  request.open("POST", "classes/searchEngine.class.php");
  request.send(formData);
};

const toggleStickyNavigationBar = () => {
  const scrolledY = window.scrollY;
  const bodyHeight = document.body.clientHeight;
  const boundary = bodyHeight / 6;

  if (scrolledY > boundary) {
    addCssClass(navigationBar, "sticky");
  } else {
    removeCssClass(navigationBar, "sticky");
  }
};

export const userLogout = (e) => {
  e.preventDefault();

  const request = serverRequest();

  const formData = new FormData();
  formData.append("logout", true);

  const loader = document.querySelector(".loader");
  addCssClass(loader, "active");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");

      const response = JSON.parse(request.response);

      if (response.isLoggedOut) {
        showNotification("Te mai asteptam!", "index.php", 1500, null);
      }
    }
  };

  request.open("POST", "logout.php", true);
  request.send(formData);
};

const navigationBarFunctionalities = () => {
  window.addEventListener("scroll", toggleStickyNavigationBar);

  hamburgerBtn.addEventListener("click", () => {
    if (!leftMenuCategories.classList.contains("active")) {
      showLeftMenuCategories();
      removeCssClass(searchBar, "active");
    } else {
      hideLeftMenuCategories();
    }
  });

  if (window.innerWidth > 1200) {
    leftMenu.addEventListener("mouseenter", () => {
      showLeftMenuCategories();
      removeCssClass(searchBar, "active");
    });

    leftMenu.addEventListener("mouseleave", hideLeftMenuCategories);
  }

  searchToolBtn.addEventListener("click", () => {
    toggleCssClass(searchBar, "active");
    hideLeftMenuCategories();
  });

  searchCloseIcon.addEventListener("click", () => {
    if (searchInput.value.length != "") {
      searchInput.value = "";
    } else {
      removeCssClass(searchBar, "active");
      removeCssClass(searchSuggestions, "active");

      if (window.innerWidth >= 768) {
        removeCssClass(searchBarInput, "activeSuggestions");
        removeCssClass(searchCloseIcon, "active");
      }
    }
  });

  searchBackBtn.addEventListener("click", () => {
    removeCssClass(searchBar, "active");
    removeCssClass(searchSuggestions, "active");
    searchInput.value = "";
  });

  searchInput.addEventListener(
    "keyup",
    debounce(() => {
      if (searchInput.value.length != "") {
        addCssClass(searchSuggestions, "active");
        searchEngine();

        if (window.innerWidth >= 768) {
          addCssClass(searchBarInput, "activeSuggestions");
          addCssClass(searchCloseIcon, "active");
        }
      } else {
        removeCssClass(searchSuggestions, "active");

        if (window.innerWidth >= 768) {
          removeCssClass(searchBarInput, "activeSuggestions");
          removeCssClass(searchCloseIcon, "active");
        }
      }
    }, 150)
  );

  searchBtn.addEventListener("click", () => {
    const queryString = `?queryString=${searchInput.value}`;
    window.location.assign(`search.php${queryString}`);
  });

  userContainer.addEventListener("mouseenter", showUserPanel);
  userContainer.addEventListener("mouseleave", hideUserPanel);

  // Logout Request
  let logoutBtn = null;

  if (document.querySelector(".logout")) {
    logoutBtn = document.querySelector(".logout");

    logoutBtn.addEventListener("click", (e) => {
      userLogout(e);
    });
  }
};
navigationBarFunctionalities();

// Database | Localstoarge Work
const favTab = document.querySelector(".navbar__right__favoriteProducts");
const favPanel = document.querySelector(
  ".navbar__right__favoriteProducts__panel"
);
const favPanelSpan = favPanel.querySelector("span");
const favLink = favTab.querySelector("a");
const favLinkIcon = favLink.querySelector("i");
const favLinkSpan = favLink.querySelector("span");
const favLinkCounter = favLink.querySelector("div.counter");
export const favItemsCounter = favLinkCounter.querySelector("span");
const favPanelProductList = favPanel.querySelector("ul");

const cartTab = document.querySelector(".navbar__right__shoppingCart");
const cartPanel = document.querySelector(".navbar__right__shoppingCart__panel");
const cartPanelSpan = cartPanel.querySelector("span");
const cartLink = cartTab.querySelector("a");
const cartLinkIcon = cartLink.querySelector("i");
const cartLinkSpan = cartLink.querySelector("span");
const cartLinkCounter = cartLink.querySelector("div.counter");
export const cartItemsCounter = cartLinkCounter.querySelector("span");
const cartPanelProductList = cartPanel.querySelector("ul");

export let userID = null;
if (document.querySelector("#userId")) {
  userID = document.querySelector("#userId").dataset.user;
}

export const addToCartFromFav = (addToCartBtns) => {
  addToCartBtns.forEach((addToCartBtn) => {
    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const actualProductID = addToCartBtn.dataset.productId;
      const actualProductObject = JSON.parse(
        localStorage.getItem(`favProductId${actualProductID}`)
      );

      if (actualProductObject.productID == actualProductID) {
        if (userID !== null) {
          const request = serverRequest();

          const formData = new FormData();
          formData.append("userID", userID);
          formData.append("productID", actualProductID);
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
          `cartProductId${actualProductID}`,
          JSON.stringify(actualProductObject)
        );

        renderLocalProducts(cartItemsCounter, "cartProducts");

        if (currentURL == "favoriteProducts.php") {
          import("./favProducts.js").then((favProductsModule) => {
            favProductsModule.renderFavProducts();
          });
        }

        showNotification("Produsul a fost adaugat in cos!", null, 1500, null);

        localStorage.removeItem(`favProductId${actualProductID}`);
        renderLocalProducts(favItemsCounter, "favProducts");

        if (currentURL == "cart.php") {
          import("./cart.js").then((cartModule) => {
            cartModule.renderCartProducts();
          });
        } else if (currentURL == "favProducts.php") {
          import("./favProducts.js").then((favProductsModule) => {
            favProductsModule.renderFavProducts();
          });
        }

        const cartBtns = document.querySelectorAll(".addToCart");
        cartBtns.forEach((cartBtn) => {
          const cartBtnProductId = cartBtn.dataset.productId;

          if (actualProductID == cartBtnProductId) {
            addCssClass(cartBtn, "active");
          }
        });

        const favBtns = document.querySelectorAll(".addToFav");
        favBtns.forEach((favBtn) => {
          const favBtnProductId = favBtn.dataset.productId;

          if (actualProductID == favBtnProductId) {
            favBtn.children[0].setAttribute("class", "fa fa-heart-o");

            const favToolTip = favBtn.querySelector(".tooltip > p");
            favToolTip.innerHTML = "Adauga la favorite";
          }
        });
      }
    });
  });
};

export const addToFavFromCart = (addToFavBtns) => {
  addToFavBtns.forEach((addToFavBtn) => {
    addToFavBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const actualProductID = addToFavBtn.dataset.productId;

      const actualProductObject = JSON.parse(
        localStorage.getItem(`cartProductId${actualProductID}`)
      );

      if (actualProductObject.productID == actualProductID) {
        if (userID !== null) {
          const request = serverRequest();

          const formData = new FormData();
          formData.append("userID", userID);
          formData.append("productID", actualProductID);
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
          `favProductId${actualProductID}`,
          JSON.stringify(actualProductObject)
        );
        renderLocalProducts(favItemsCounter, "favProducts");

        showNotification(
          "Produsul a fost adaugat la favorite!",
          null,
          1500,
          null
        );

        localStorage.removeItem(`cartProductId${actualProductID}`);
        renderLocalProducts(cartItemsCounter, "cartProducts");

        if (currentURL == "cart.php") {
          import("./cart.js").then((cartModule) => {
            cartModule.renderCartProducts();
          });
        } else if (currentURL == "favProducts.php") {
          import("./favProducts.js").then((favProductsModule) => {
            favProductsModule.renderFavProducts();
          });
        }
      }

      const cartBtns = document.querySelectorAll(".addToCart");
      cartBtns.forEach((cartBtn) => {
        const cartBtnProductId = cartBtn.dataset.productId;

        if (actualProductID == cartBtnProductId) {
          removeCssClass(cartBtn, "active");
        }
      });

      const favBtns = document.querySelectorAll(".addToFav");
      console.log(favBtns);

      favBtns.forEach((favBtn) => {
        const favBtnProductId = favBtn.dataset.productId;

        if (actualProductID == favBtnProductId) {
          favBtn.children[0].setAttribute("class", "fa fa-heart");

          const favToolTip = favBtn.querySelector(".tooltip > p");
          favToolTip.innerHTML = "Adaugat la favorite";
        }
      });
    });
  });
};

const addToFavBtns = document.querySelectorAll(".addToFav");
const addToCartBtns = document.querySelectorAll(".addToCart");

let productSlides = null;

const lastURLForwardSlash = document.URL.lastIndexOf("/");
const pageName = document.URL.slice(lastURLForwardSlash + 1);

if (pageName.startsWith("category.php") || pageName.startsWith("search.php")) {
  productSlides = document.querySelectorAll(".categories__products__product");
} else if (pageName.startsWith("index.php")) {
  productSlides = document.querySelectorAll(
    ".productSection__carousel__slider__slide"
  );
}

export const insertProduct = debounce(
  (btn, index, productList, productSlides) => {
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
      const actualFavToolTip =
        productSlides[index].querySelector(".tooltip > p");

      const localStorageFavProductId = JSON.parse(
        localStorage.getItem(`favProductId${productID}`)
      );

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

        actualFavIcon.setAttribute("class", "fa fa-heart");
        actualFavToolTip.innerHTML = "Adaugat la favorite";
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
  },
  100
);

export const removeProduct = debounce((removeBtns, productList) => {
  removeBtns.forEach((removeBtn) => {
    removeBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const productID = removeBtn.dataset.deleteId;

      if (productList === "favProducts") {
        const currentFavProduct = JSON.parse(
          localStorage.getItem(`favProductId${productID}`)
        );

        if (currentFavProduct !== null) {
          if (userID !== null) {
            const request = serverRequest();

            const formData = new FormData();
            formData.append("productID", productID);
            formData.append("userID", userID);
            formData.append("action", "deleteFavProduct");

            request.onreadystatechange = () => {
              if (request.readyState === 4 && request.status === 200) {
                const response = request.response;

                if (!response.isDeleted) {
                  console.error("Eroare");
                }
              }
            };

            request.open("POST", "classes/wishlist.class.php");
            request.send(formData);
          }

          localStorage.removeItem(`favProductId${productID}`);

          if (currentURL == "favoriteProducts.php") {
            import("./favProducts.js").then((favProductsModule) => {
              favProductsModule.renderFavProducts();
            });
          }

          showNotification(
            "Produsul a fost sters din lista de favorite!",
            null,
            1500,
            "error"
          );
          renderLocalProducts(favItemsCounter, "favProducts");

          const favBtns = document.querySelectorAll(".addToFav");
          favBtns.forEach((favBtn) => {
            const favBtnProductId = favBtn.dataset.productId;

            if (productID == favBtnProductId) {
              favBtn.children[0].setAttribute("class", "fa fa-heart-o");

              const favToolTip = favBtn.querySelector(".tooltip > p");
              favToolTip.innerHTML = "Adauga la favorite";
            }
          });
        }
      }

      if (productList === "cartProducts") {
        const currentCartProduct = JSON.parse(
          localStorage.getItem(`cartProductId${productID}`)
        );

        if (currentCartProduct !== null) {
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

          if (currentURL == "cart.php") {
            import("./cart.js").then((cartModule) => {
              cartModule.renderCartProducts();
            });
          }

          showNotification(
            "Produsul a fost sters din cosul de cumparaturi!",
            null,
            1500,
            "error"
          );
          renderLocalProducts(cartItemsCounter, "cartProducts");
          if (currentURL == "cart.php") {
            import("./cart.js").then((cartModule) => {
              cartModule.renderCartProducts();
            });
          }

          const cartBtns = document.querySelectorAll(".addToCart");
          cartBtns.forEach((cartBtn) => {
            const cartBtnProductId = cartBtn.dataset.productId;

            if (productID == cartBtnProductId) {
              removeCssClass(cartBtn, "active");
            }
          });
        }
      }
    });
  });
}, 100);

export const renderLocalProducts = (productCounter, productList) => {
  productCounter.innerHTML = "";

  // Favorite Products VS Cart Products
  const localStorageLength = localStorage.length;
  const localStorageProducts = [];
  const localStorageFavProducts = [];
  const localStorageCartProducts = [];

  for (let i = 0; i <= localStorageLength - 1; i++) {
    const actualProduct = localStorage.key(i);
    localStorageProducts.push(actualProduct);
  }

  localStorageProducts.forEach((product) => {
    if (product.startsWith("favProduct")) {
      localStorageFavProducts.push(product);
    } else if (product.startsWith("cartProduct")) {
      localStorageCartProducts.push(product);
    }
  });

  if (productList === "favProducts") {
    productCounter.innerHTML = localStorageFavProducts.length;

    const goToFavBtn = favPanel.querySelector(".goToFav");

    if (localStorageFavProducts.length === 0) {
      favPanelSpan.innerHTML = "Nu exista niciun produs";
      removeCssClass(goToFavBtn, "active");
    } else {
      favPanelSpan.innerHTML = "Ultimele adaugate";
      addCssClass(goToFavBtn, "active");
    }

    favPanelProductList.innerHTML = "";

    // Generate The DOM For Favorites
    localStorageFavProducts.forEach((favProduct) => {
      const localFavProduct = JSON.parse(localStorage.getItem(favProduct));

      const productItem = createElement("li", null, null);
      appendElement(productItem, favPanelProductList);

      const productLink = createElement(
        "a",
        "href",
        `product.php?productID=${localFavProduct.productID}`
      );
      appendElement(productLink, productItem);

      const productInfoContainer = createElement("div", "class", "productInfo");
      appendElement(productInfoContainer, productLink);

      const productInfoImage = createElement(
        "img",
        "src",
        `${localFavProduct.productImage}`
      );
      appendElement(productInfoImage, productInfoContainer);

      const productInfoName = createElement("p", "class", "name");
      productInfoName.innerHTML = `${localFavProduct.productName}`;
      appendElement(productInfoName, productInfoContainer);

      const productInfoPrices = createElement("div", "class", "prices");
      appendElement(productInfoPrices, productInfoContainer);

      const productInfoOldPrice = createElement("p", "class", "oldPrice");
      appendElement(productInfoOldPrice, productInfoPrices);

      if (localFavProduct.productOldFullPrice != undefined) {
        const productInfoOldFullPrice = createElement(
          "span",
          "class",
          "oldFullPrice"
        );
        productInfoOldFullPrice.innerHTML = `${localFavProduct.productOldFullPrice}`;
        appendElement(productInfoOldFullPrice, productInfoOldPrice);

        const productInfoOldFullPriceDecimal = createElement(
          "sup",
          "class",
          "oldFullPriceDecimal"
        );
        productInfoOldFullPriceDecimal.innerHTML = `${localFavProduct.productOldFullPriceDecimal}`;
        appendElement(productInfoOldFullPriceDecimal, productInfoOldPrice);

        const productInfoOldPriceCurr = createElement("span", null, null);
        productInfoOldPriceCurr.innerHTML = "Lei";
        appendElement(productInfoOldPriceCurr, productInfoOldPrice);
      }

      const productInfoNewPrice = createElement("p", "class", "newPrice");
      appendElement(productInfoNewPrice, productInfoPrices);

      const productInfoNewFullPrice = createElement(
        "span",
        "class",
        "newFullPrice"
      );
      productInfoNewFullPrice.innerHTML = `${localFavProduct.productNewFullPrice}`;
      appendElement(productInfoNewFullPrice, productInfoNewPrice);

      const productInfoNewFullPriceDecimal = createElement(
        "sup",
        "class",
        "newFullPriceDecimal"
      );
      productInfoNewFullPriceDecimal.innerHTML = `${localFavProduct.productNewFullPriceDecimal}`;
      appendElement(productInfoNewFullPriceDecimal, productInfoNewPrice);

      const productInfoNewPriceCurr = createElement("span", null, null);
      productInfoNewPriceCurr.innerHTML = "Lei";
      appendElement(productInfoNewPriceCurr, productInfoNewPrice);

      const productActionsContainer = createElement("div", "class", "actions");
      appendElement(productActionsContainer, productLink);

      const productAddToCartBtn = createElement("button", "type", "button");
      productAddToCartBtn.setAttribute("class", "favAddToCart");
      productAddToCartBtn.setAttribute(
        "data-product-id",
        `${localFavProduct.productID}`
      );
      appendElement(productAddToCartBtn, productActionsContainer);

      const productAddToCartIcon = createElement(
        "i",
        "class",
        "fa fa-shopping-cart"
      );
      appendElement(productAddToCartIcon, productAddToCartBtn);

      const productAddToCartMsg = createElement("span", null, null);
      productAddToCartMsg.innerHTML = "Adauga in cos";
      appendElement(productAddToCartMsg, productAddToCartBtn);

      const productRemoveBtn = createElement("button", "type", "button");
      productRemoveBtn.setAttribute("class", "removeFromFav");
      productRemoveBtn.setAttribute(
        "data-delete-id",
        `${localFavProduct.productID}`
      );
      appendElement(productRemoveBtn, productActionsContainer);

      const productRemoveIcon = createElement("i", "class", "fa fa-trash-o");
      appendElement(productRemoveIcon, productRemoveBtn);

      const addToCartFromFavBtns = favPanel.querySelectorAll(".favAddToCart");
      const removeFromFavBtns = favPanel.querySelectorAll(".removeFromFav");
      removeProduct(removeFromFavBtns, "favProducts");
      addToCartFromFav(addToCartFromFavBtns);
    });
  }

  if (productList === "cartProducts") {
    productCounter.innerHTML = localStorageCartProducts.length;

    const cartProductsSummary = cartPanel.querySelector(".summary");
    const goToCartBtn = cartPanel.querySelector(".goToCart");

    if (localStorageCartProducts.length === 0) {
      cartPanelSpan.innerHTML = "Nu exista niciun produs";
      removeCssClass(cartProductsSummary, "active");
      removeCssClass(goToCartBtn, "active");
    } else {
      cartPanelSpan.innerHTML = "Ultimele adaugate";
      addCssClass(cartProductsSummary, "active");
      addCssClass(goToCartBtn, "active");
    }

    cartPanelProductList.innerHTML = "";

    // Generate The DOM For Cart
    localStorageCartProducts.forEach((cartProduct) => {
      const localCartProduct = JSON.parse(localStorage.getItem(cartProduct));

      const productItem = createElement("li", null, null);
      appendElement(productItem, cartPanelProductList);

      const productLink = createElement(
        "a",
        "href",
        `product.php?productID=${localCartProduct.productID}`
      );
      appendElement(productLink, productItem);

      const productInfoContainer = createElement("div", "class", "productInfo");
      appendElement(productInfoContainer, productLink);

      const productInfoImage = createElement(
        "img",
        "src",
        `${localCartProduct.productImage}`
      );
      appendElement(productInfoImage, productInfoContainer);

      const productInfoName = createElement("p", "class", "name");
      productInfoName.innerHTML = `${localCartProduct.productName}`;
      appendElement(productInfoName, productInfoContainer);

      const productQuantity = createElement("p", "class", "quantity");
      productQuantity.innerHTML = `${localCartProduct.productQuantity}x`;
      appendElement(productQuantity, productInfoContainer);

      const productInfoPrices = createElement("div", "class", "prices");
      appendElement(productInfoPrices, productInfoContainer);

      const productInfoOldPrice = createElement("p", "class", "oldPrice");
      appendElement(productInfoOldPrice, productInfoPrices);

      if (localCartProduct.productOldFullPrice != undefined) {
        const productInfoOldFullPrice = createElement(
          "span",
          "class",
          "oldFullPrice"
        );
        appendElement(productInfoOldFullPrice, productInfoOldPrice);

        if (localCartProduct.oldWholePrice != undefined) {
          productInfoOldFullPrice.innerHTML = localCartProduct.oldWholePrice;
        } else {
          productInfoOldFullPrice.innerHTML =
            localCartProduct.productOldFullPrice;
        }

        const productInfoOldFullPriceDecimal = createElement(
          "sup",
          "class",
          "oldFullPriceDecimal"
        );
        appendElement(productInfoOldFullPriceDecimal, productInfoOldPrice);

        if (localCartProduct.oldDecimalPrice != undefined) {
          productInfoOldFullPriceDecimal.innerHTML =
            localCartProduct.oldDecimalPrice;
        } else {
          productInfoOldFullPriceDecimal.innerHTML =
            localCartProduct.productOldFullPriceDecimal;
        }

        const productInfoOldPriceCurr = createElement("span", null, null);
        productInfoOldPriceCurr.innerHTML = "Lei";
        appendElement(productInfoOldPriceCurr, productInfoOldPrice);
      }

      const productInfoNewPrice = createElement("p", "class", "newPrice");
      appendElement(productInfoNewPrice, productInfoPrices);

      const productInfoNewFullPrice = createElement(
        "span",
        "class",
        "newFullPrice"
      );
      appendElement(productInfoNewFullPrice, productInfoNewPrice);

      if (localCartProduct.newWholePrice != undefined) {
        productInfoNewFullPrice.innerHTML = localCartProduct.newWholePrice;
      } else {
        productInfoNewFullPrice.innerHTML =
          localCartProduct.productNewFullPrice;
      }

      const productInfoNewFullPriceDecimal = createElement(
        "sup",
        "class",
        "newFullPriceDecimal"
      );
      appendElement(productInfoNewFullPriceDecimal, productInfoNewPrice);

      if (localCartProduct.newDecimalPrice != undefined) {
        productInfoNewFullPriceDecimal.innerHTML =
          localCartProduct.newDecimalPrice;
      } else {
        productInfoNewFullPriceDecimal.innerHTML =
          localCartProduct.productNewFullPriceDecimal;
      }

      const productInfoNewPriceCurr = createElement("span", null, null);
      productInfoNewPriceCurr.innerHTML = "Lei";
      appendElement(productInfoNewPriceCurr, productInfoNewPrice);

      const productActionsContainer = createElement("div", "class", "actions");
      appendElement(productActionsContainer, productLink);

      const productAddToFavBtn = createElement("button", "type", "button");
      productAddToFavBtn.setAttribute("class", "cartAddToFav");
      productAddToFavBtn.setAttribute(
        "data-product-id",
        `${localCartProduct.productID}`
      );
      appendElement(productAddToFavBtn, productActionsContainer);

      const productAddToFavIcon = createElement("i", "class", "fa fa-heart-o");
      appendElement(productAddToFavIcon, productAddToFavBtn);

      const productAddToCartMsg = createElement("span", null, null);
      productAddToCartMsg.innerHTML = "Adauga la favorite";
      appendElement(productAddToCartMsg, productAddToFavBtn);

      const productRemoveBtn = createElement("button", "type", "button");
      productRemoveBtn.setAttribute("class", "removeFromCart");
      productRemoveBtn.setAttribute(
        "data-delete-id",
        `${localCartProduct.productID}`
      );
      appendElement(productRemoveBtn, productActionsContainer);

      const productRemoveIcon = createElement("i", "class", "fa fa-trash-o");
      appendElement(productRemoveIcon, productRemoveBtn);

      const cartTotalProducts = cartPanel.querySelector(
        ".summary .totalCounter"
      );

      let totalQuantity = 0;
      localStorageCartProducts.forEach((cartProduct) => {
        const product = JSON.parse(localStorage.getItem(cartProduct));
        totalQuantity += product.productQuantity;
      });

      cartTotalProducts.innerHTML = `${
        totalQuantity == 1
          ? `${totalQuantity} produs`
          : `${totalQuantity} produse`
      }`;

      const cartTotalWholePrice = cartPanel.querySelector(
        ".summary > .newPrice > .whole"
      );
      const cartTotalDecimalPrice = cartPanel.querySelector(
        ".summary > .newPrice > .decimal"
      );
      const totalWholePrices = cartPanel.querySelectorAll(".newFullPrice");
      const totalDecimalPrices = cartPanel.querySelectorAll(
        ".newFullPriceDecimal"
      );
      let finalWholePrice = 0;

      totalWholePrices.forEach((wholePrice) => {
        const price = parseInt(wholePrice.innerHTML.trim());
        finalWholePrice += price;
      });

      let finalDecimalPrice = 0;
      totalDecimalPrices.forEach((decimalPrice) => {
        const decimal = parseInt(decimalPrice.innerHTML.trim());
        finalDecimalPrice += decimal;

        if (finalDecimalPrice > 99) {
          finalDecimalPrice -= 100;
          finalWholePrice++;
        }
      });

      cartTotalWholePrice.innerHTML = finalWholePrice;
      cartTotalDecimalPrice.innerHTML = finalDecimalPrice;

      const addToFavFromCartBtns = cartPanel.querySelectorAll(".cartAddToFav");
      const removeFromCartBtns = cartPanel.querySelectorAll(".removeFromCart");
      removeProduct(removeFromCartBtns, "cartProducts");
      addToFavFromCart(addToFavFromCartBtns);
    });
  }
};
renderLocalProducts(cartItemsCounter, "cartProducts");
renderLocalProducts(favItemsCounter, "favProducts");

const dynamicBarFunctionalities = () => {
  // Toggle Favorite Panel
  favTab.addEventListener("mouseenter", () => {
    addCssClass(favPanel, "active");
    addCssClass(favLink, "active");
    addCssClass(favLinkIcon, "active");
    addCssClass(favLinkSpan, "active");
    addCssClass(favLinkCounter, "active");
  });

  favTab.addEventListener("mouseleave", () => {
    removeCssClass(favPanel, "active");
    removeCssClass(favLink, "active");
    removeCssClass(favLinkIcon, "active");
    removeCssClass(favLinkSpan, "active");
    removeCssClass(favLinkCounter, "active");
  });

  // Toggle Cart Panel
  cartTab.addEventListener("mouseenter", () => {
    addCssClass(cartPanel, "active");
    addCssClass(cartLink, "active");
    addCssClass(cartLinkIcon, "active");
    addCssClass(cartLinkSpan, "active");
    addCssClass(cartLinkCounter, "active");
  });

  cartTab.addEventListener("mouseleave", () => {
    removeCssClass(cartPanel, "active");
    removeCssClass(cartLink, "active");
    removeCssClass(cartLinkIcon, "active");
    removeCssClass(cartLinkSpan, "active");
    removeCssClass(cartLinkCounter, "active");
  });

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
};
dynamicBarFunctionalities();

const localStorageLength = localStorage.length;
const localStorageProducts = [];
const localStorageFavProducts = [];
const localStorageCartProducts = [];

for (let i = 0; i <= localStorageLength - 1; i++) {
  const actualProduct = localStorage.key(i);
  localStorageProducts.push(actualProduct);
}

localStorageProducts.forEach((product) => {
  if (product.startsWith("favProduct")) {
    localStorageFavProducts.push(product);
  } else if (product.startsWith("cartProduct")) {
    localStorageCartProducts.push(product);
  }
});

if (userID !== null) {
  const insertLocalProducts = (flag) => {
    const request = serverRequest();

    const formData = new FormData();
    formData.append("userID", userID);

    if (flag === "cartProducts") {
      const productIDs = [];
      localStorageCartProducts.forEach((product) => {
        const productId = JSON.parse(localStorage.getItem(product)).productID;
        productIDs.push(productId);
      });

      formData.append("cartProducts", productIDs);

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
    } else {
      const productIDs = [];
      localStorageFavProducts.forEach((product) => {
        const productId = JSON.parse(localStorage.getItem(product)).productID;
        productIDs.push(productId);
      });

      formData.append("favProducts", productIDs);

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
  };

  if (localStorageCartProducts.length !== 0) {
    insertLocalProducts("cartProducts");
  }
  if (localStorageFavProducts.length !== 0) {
    insertLocalProducts("favProducts");
  }
}
