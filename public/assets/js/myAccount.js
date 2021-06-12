import { addCssClass, toggleCssClass } from "./global.js";
import { userLogout } from "./navigationBar.js";

const myAccount = document.querySelector("#myAccount");
toggleCssClass(myAccount, "active");

const userPanelActions = document.querySelector(".userPanel__user__actions");
const userActions = Array.from(userPanelActions.children);
const logoutBtn = userPanelActions.querySelector(".logout");

userActions.forEach((userAction) => {
  if (userAction.classList.contains("myAcc")) {
    const spanText = userAction.querySelector("span");
    const icon = userAction.querySelector("i");
    addCssClass(userAction, "active");
    addCssClass(spanText, "active");
    addCssClass(icon, "active");
  }
});

logoutBtn.addEventListener("click", (e) => {
  userLogout(e);
});
