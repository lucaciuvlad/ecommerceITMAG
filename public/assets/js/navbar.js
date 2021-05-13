import {
    debounce,
    setActive,
    removeActive,
} from "./global.js";

import {
    hideProductCategories
} from "./innerNavbar.js";

const navbar = document.querySelector(".navbar");

const navbarLeftArea = navbar.querySelector(".navbar__left-area");
const navbarLeftHamburger = navbarLeftArea.children[0];
const navbarLeftCategoriesMenu = navbarLeftArea.children[1];

const navbarLogoLink = navbar.querySelector(".navbar__logo>a");
const navbarLogoImg = navbar.querySelector(".navbar__logo>a>img");

const navbarSearchContainer = navbar.querySelector(".navbar__search__container");
const navbarSearch = navbarSearchContainer.parentElement;
const navbarSearchCloseIcon = navbarSearchContainer.children[1];
const navbarSearchBackBtn = navbarSearch.querySelector(".navbar__search__suggestions__back");
const navbarSearchInput = navbarSearchContainer.children[0];
export const navbarSearchSuggestions = navbarSearch.children[1];

const navbarSearchRightIcon = navbar.querySelector(".navbar__right-area").children[0];
const navbarUserTab = navbar.querySelector(".navbar__right-area").children[1];
const navbarUserPanel = navbarUserTab.children[1];

const navbarStickyItems = [
    navbar, navbarLeftArea, navbarLogoLink,
    navbarLogoImg, navbarSearchContainer, navbarSearchSuggestions, navbarUserPanel
];

// Toggle The Sticky State To The Top Navigation Bar
const toggleNavbarSticky = () => {
    const scrolled = window.scrollY;

    navbarStickyItems.forEach(Item => {
        if (scrolled > (navbar.clientHeight + 35 + 350)) {
            Item.classList.add("sticky");
            document.body.style.paddingTop = `${navbar.clientHeight}px`;

            removeNavbarElementActive(navbarLeftCategoriesMenu);
            removeNavbarElementActive(navbarSearchSuggestions);
            removeNavbarElementActive(navbarSearch);
            hideProductCategories();
        } else {
            Item.classList.remove("sticky");
            document.body.style.paddingTop = `0px`;
        }
    });
};

// Set The Active State To A Top Navigation Bar Element
const setNavbarElementActive = Elem => {
    setActive(Elem);

    if (Elem == navbarLeftCategoriesMenu) {
        navbarLeftHamburger.removeAttribute("class", "fa fa-bars");
        navbarLeftHamburger.setAttribute("class", "fa fa-times");
    }

    if (Elem == navbarSearchSuggestions) {
        setActive(navbarSearchContainer);
        setActive(navbarSearchCloseIcon);

        hideProductCategories();
    }
};

// Remove The Active State From A Top Navigation Bar Element
export const removeNavbarElementActive = Elem => {
    removeActive(Elem);

    if (Elem == navbarLeftCategoriesMenu) {
        navbarLeftHamburger.removeAttribute("class", "fa fa-times");
        navbarLeftHamburger.setAttribute("class", "fa fa-bars");
    }

    if (Elem == navbarSearchSuggestions) {
        removeActive(navbarSearchContainer);
        removeActive(navbarSearchCloseIcon);
    }
};

// Top Navigation Bar Functionalitites Trigger
const navbarFunctionalities = () => {
    window.addEventListener("scroll", toggleNavbarSticky);

    // Search Bar
    navbarSearchRightIcon.addEventListener("click", () => {
        setNavbarElementActive(navbarSearch);
        removeNavbarElementActive(navbarLeftCategoriesMenu);
    });

    navbarSearchCloseIcon.addEventListener("click", () => {
        if (navbarSearchInput.value === "") {
            removeNavbarElementActive(navbarSearch);

            if (window.innerWidth >= 768) {
                removeNavbarElementActive(navbarSearchSuggestions);
            }
        } else {
            navbarSearchInput.value = "";
        }
    });

    navbarSearchBackBtn.addEventListener("click", () => {
        removeNavbarElementActive(navbarSearch);
        navbarSearchInput.value = "";
    });

    navbarSearchInput.addEventListener("click", () => {
        setNavbarElementActive(navbarSearchSuggestions);
        removeNavbarElementActive(navbarLeftCategoriesMenu);
    });

    // Left Area
    navbarLeftHamburger.addEventListener("click", () => {
        if (navbarLeftCategoriesMenu.classList.contains("active")) {
            removeNavbarElementActive(navbarLeftCategoriesMenu);
        } else {
            setNavbarElementActive(navbarLeftCategoriesMenu);
            removeNavbarElementActive(navbarSearchSuggestions);

        }
    });

    if (window.innerWidth >= 1200) {
        navbarLeftArea.addEventListener("mouseenter", () => {
            setNavbarElementActive(navbarLeftCategoriesMenu);
            removeNavbarElementActive(navbarSearchSuggestions);
        });

        navbarLeftArea.addEventListener("mouseleave", () => {
            removeNavbarElementActive(navbarLeftCategoriesMenu);
        });
    }

    // Right Area
    navbarUserTab.addEventListener("mouseenter", () => {
        setNavbarElementActive(navbarUserPanel);

        removeNavbarElementActive(navbarSearchSuggestions);
    });

    navbarUserTab.addEventListener("mouseleave", () => {
        removeNavbarElementActive(navbarUserPanel);
    });
};
navbarFunctionalities();

// After Login Settings
const userEmailInCircle = document.querySelector(".navbar__right-area .user") || null;

if (userEmailInCircle) {
    const userEmailFirstLetter = userEmailInCircle.innerText.slice(0, 1).toUpperCase();
    userEmailInCircle.innerText = userEmailFirstLetter;
}

const navbarUserActions = navbarUserPanel.children[0];

if (navbarUserActions.classList.contains("active")) {
    navbarUserPanel.style.left = "-25%";

    const userEmail = navbarUserActions.children[0];
    const userEmailAt = userEmail.innerHTML.search("@");
    const user = userEmail.innerHTML.slice(0, userEmailAt);
    userEmail.innerHTML = `Salut, ${user}!`;
}