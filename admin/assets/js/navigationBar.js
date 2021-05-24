import {
  toggleCssClass,
  addCssClass,
  removeCssClass,
  createElement,
  appendElement,
  serverRequest,
  showNotification,
  debounce,
} from "./global.js";

import { isEmpty } from "./validations.js";

// Hamburger & Side Menu
const hamburger = document.querySelector(".navigationBar .hamburger");
const sideMenu = document.querySelector(".sideMenu");
const opTrigger = document.querySelector(".sideMenu__operations__trigger");
const opList = opTrigger.nextElementSibling;
export const opItems = Array.from(opList.children);

// Search
const searchContainer = document.querySelector(".navigationBar__search__field");
const searchIcon = searchContainer.children[0];
const searchInput = searchContainer.children[1];
const searchCloseIcon = searchContainer.children[2];
const searchSuggestions = document.querySelector(
  ".navigationBar__search__suggestions"
);
const searchResultsList = document.querySelector(
  ".navigationBar__search__suggestions__results > ul"
);
const searchLink = searchSuggestions.querySelector(
  ".navigationBar__search__suggestions__header > a"
);

// Admin
const adminTab = document.querySelector(".navigationBar__user__tab");
const adminIcon = adminTab.children[0];
const adminName = adminTab.children[1];
const adminPanel = document.querySelector(".navigationBar__user__panel");
const adminLogout = adminPanel.querySelector(".logout");
let logout = false;

// Search Request
const searchEngine = () => {
  const request = serverRequest();

  const formData = new FormData();
  formData.append("searchToken", searchInput.value);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      searchResultsList.innerHTML = "";

      if (response.rowNr != 0) {
        for (let i = 0; i < response.rowNr; i++) {
          const item = createElement("li", null, null);
          appendElement(item, searchResultsList);

          const link = createElement(
            "a",
            "href",
            `search.php?searchString=${encodeURIComponent(
              response.product_name[i].replace(/\s+/g, "%20")
            )}`
          );
          appendElement(link, item);

          const image = createElement(
            "img",
            "src",
            `assets/imgs/${response.product_image[i]}`
          );
          appendElement(image, link);

          const divInfo = createElement("div", null, null);
          appendElement(divInfo, link);

          const productName = createElement("p", null, null);
          productName.innerHTML = `${response.product_name[i]}`;
          appendElement(productName, divInfo);

          const productIdPrice = createElement("p", null, null);
          productIdPrice.innerHTML = `ID : ${response.product_id[i]}, Pret: ${response.product_price[i]} Lei`;
          appendElement(productIdPrice, divInfo);
        }
      } else {
        const item = createElement("li", null, null);
        appendElement(item, searchResultsList);

        const noResult = createElement("p", null, null);
        noResult.innerHTML = "Niciun rezultat gasit";
        appendElement(noResult, item);
      }

      if (!isEmpty(searchInput)) {
        visibleSearchSuggestions();
      } else {
        hiddenSearchSuggestions();
      }
    }
  };

  request.open("POST", "classes/searchEngine.class.php");
  request.send(formData);
};

// Toggle SideMenu For Mobile
const toggleLeftMenu = () => {
  toggleCssClass(hamburger, "active");
  toggleCssClass(sideMenu, "active");
};

// Toggle Side Menu Operations
const toggleOperations = () => {
  toggleCssClass(opTrigger, "active");
  toggleCssClass(opList, "active");

  opItems.forEach((item, i) => {
    toggleCssClass(item, "active");
    item.style.transitionDelay = `${i / 15}s`;
  });
};

// Show Current Visible Operation Link
export const visibleOperations = () => {
  addCssClass(opTrigger, "active");
  addCssClass(opList, "active");

  opItems.forEach((item, i) => {
    addCssClass(item, "active");
    item.style.transitionDelay = `${i / 15}s`;
  });
};

// Search Engine Functionalities
const searchResults = searchResultsList.children;

const visibleSearchSuggestions = () => {
  if (adminPanel.classList.contains("active")) {
    removeCssClass(adminPanel, "active");
  }

  if (window.innerWidth < 992 && sideMenu.classList.contains("active")) {
    removeCssClass(sideMenu, "active");
  }

  for (let i = 0; i < searchResults.length; i++) {
    addCssClass(searchResults[i], "active");
    searchResults[i].style.transitionDelay = `${i} / 10s`;
  }

  addCssClass(searchSuggestions, "active");
};

const hiddenSearchSuggestions = () => {
  removeCssClass(searchSuggestions, "active");

  for (let i = 0; i < searchResults.length; i++) {
    removeCssClass(searchResults[i], "active");
  }
};

const toggleAdminPanel = () => {
  toggleCssClass(adminTab, "active");
  toggleCssClass(adminIcon, "active");
  toggleCssClass(adminName, "active");
  toggleCssClass(adminPanel, "active");
};

const navigationFunctionalities = () => {
  // Hamburger + Side Menu
  hamburger.addEventListener("click", toggleLeftMenu);

  opTrigger.addEventListener("click", toggleOperations);

  searchInput.addEventListener("focus", () => {
    addCssClass(searchIcon, "active");
  });

  // Search
  searchInput.addEventListener("blur", () => {
    removeCssClass(searchIcon, "active");
  });

  searchInput.addEventListener(
    "keyup",
    debounce(() => {
      if (isEmpty(searchInput)) {
        removeCssClass(searchCloseIcon, "active");
        hiddenSearchSuggestions();
      } else {
        addCssClass(searchCloseIcon, "active");
        searchEngine();
      }
    }, 150)
  );

  searchCloseIcon.addEventListener("click", () => {
    if (!isEmpty(searchInput)) {
      searchInput.value = "";

      removeCssClass(searchCloseIcon, "active");
      removeCssClass(searchSuggestions, "active");
    }
  });

  searchLink.addEventListener("click", (e) => {
    e.preventDefault();

    if (searchInput.value != "") {
      const stringParam = `?searchString=${encodeURIComponent(
        searchInput.value.replace(/\s+/g, "%20")
      )}`;
      window.location.assign(`${searchLink.href}${stringParam}`);
    }
  });

  // Admin
  adminTab.addEventListener("click", toggleAdminPanel);

  // Logout Request
  adminLogout.addEventListener("click", (e) => {
    e.preventDefault();

    logout = true;

    const request = serverRequest();

    const formData = new FormData();
    formData.append("logout", logout);

    const loader = document.querySelector(".loader");
    addCssClass(loader, "active");

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        removeCssClass(loader, "active");

        const response = JSON.parse(request.response);

        if (response.isLoggedOut) {
          showNotification("Te-ai delogat cu succes", "login.php", 1500, null);
        }
      }
    };

    request.open("POST", "logout.php", true);
    request.send(formData);
  });
};
navigationFunctionalities();
