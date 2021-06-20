import {
  addCssClass,
  toggleCssClass,
  stickyTopButton,
  toggleStickyTopBtn,
} from "./global.js";
import { userLogout } from "./navigationBar.js";

const myOrders = document.querySelector("#myOrders");
toggleCssClass(myOrders, "active");

stickyTopButton.setAttribute("href", "#myOrders");
window.addEventListener("scroll", toggleStickyTopBtn);

const userPanelActions = document.querySelector(".userPanel__user__actions");
const userActions = Array.from(userPanelActions.children);
const logoutBtn = userPanelActions.querySelector(".logout");

userActions.forEach((userAction) => {
  if (userAction.classList.contains("myOrders")) {
    const spanText = userAction.querySelector("span");
    const icon = userAction.querySelector("i");
    addCssClass(userAction, "active");
    addCssClass(spanText, "active");
    addCssClass(icon, "active");
  }
});

const productFinalFullPrices = document.querySelectorAll(
  ".dashboard__orderCard .newPrice"
);

const formatProductPrice = () => {
  productFinalFullPrices.forEach((productFinalFullPrice) => {
    const fullFinalPrice = productFinalFullPrice.children[1];
    const decimalPrice = productFinalFullPrice.children[2];
    let intPart = null;
    let decimalPart = null;

    const dotPosition = fullFinalPrice.innerHTML.search(/\./g);
    intPart = fullFinalPrice.innerHTML.slice(0, dotPosition);
    decimalPart = fullFinalPrice.innerHTML.slice(dotPosition + 1);

    fullFinalPrice.innerHTML = intPart;
    decimalPrice.innerHTML = decimalPart;
  });
};
formatProductPrice();

const orderDetailsBtns = document.querySelectorAll(".detailsCommand");
const detailsContainers = document.querySelectorAll(
  ".dashboard__orderCard__details"
);
const orderCards = document.querySelectorAll(".dashboard__orderCard__wrapper");

orderDetailsBtns.forEach((detailBtn, index) => {
  detailBtn.addEventListener("click", () => {
    toggleCssClass(detailBtn, "active");
    toggleCssClass(detailsContainers[index], "active");
    toggleCssClass(orderCards[index], "activeDetails");
  });
});

logoutBtn.addEventListener("click", (e) => {
  userLogout(e);
});
