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

// Navigation
const navigationBar = document.querySelector(".navbar");

// Left
const leftMenu = document.querySelector(".navbar__left__menu");
const hamburgerBtn = leftMenu.querySelector(".hamburger");
const hamburgerIcon = hamburgerBtn.querySelector("i");
const leftMenuCategories = leftMenu.querySelector(
  ".navbar__left__menu__categories"
);

// Serach Bar
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

// Right Search Btn
const searchToolBtn = document.querySelector(".navbar__right > button");

// User
const userContainer = document.querySelector(".navbar__right__user");
const userLink = userContainer.querySelector("a");
const userIcon = userLink.querySelector("i");
const userPanel = userContainer.querySelector(".navbar__right__user__panel");

// FUNCTIONALITIES
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

      console.log(response);

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

const navigationBarFunctionalities = () => {
  // Sticky Navigation Bar
  window.addEventListener("scroll", toggleStickyNavigationBar);

  // Toggle Left Menu Categories
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

  // Toggle Search Bar
  searchToolBtn.addEventListener("click", () => {
    toggleCssClass(searchBar, "active");
    hideLeftMenuCategories();
  });

  // Hide Search Bar
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

  // Search Engine
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

  // Show User Panel
  userContainer.addEventListener("mouseenter", showUserPanel);

  // Hide User Panel
  userContainer.addEventListener("mouseleave", hideUserPanel);

  // Logout Request
  let logout = false;
  let logoutBtn = null;

  if (document.querySelector(".logout")) {
    logoutBtn = document.querySelector(".logout");

    logoutBtn.addEventListener("click", (e) => {
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

          console.log("Index");

          if (response.isLoggedOut) {
            showNotification(
              "Te-ai delogat cu succes",
              "index.php",
              1500,
              null
            );
          }
        }
      };

      request.open("POST", "logout.php", true);
      request.send(formData);
    });
  }
};
navigationBarFunctionalities();
