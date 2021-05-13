import {
  addCssClass,
  removeCssClass,
  serverRequest,
  showNotification,
  delayShowingMainContainer,
} from "./global.js";

import {
  isEmpty,
  emailValidation,
  showError,
  hideError,
} from "./validations.js";

const login = document.querySelector("#login");
delayShowingMainContainer(login);

// Email
const emailField = document.querySelector(".email");
const emailLabel = emailField.querySelector("label");
const emailInput = emailField.querySelector("input");
const emailErrorMsg = emailField.querySelector("p.error");
const emailArr = [emailField, emailLabel, emailInput];

// Password
const passwordField = document.querySelector(".password");
const passwordLabel = passwordField.querySelector("label");
const passwordInputWrapper = passwordField.querySelector(
  ".form__field__wrapper"
);
const passwordInput = passwordInputWrapper.querySelector("input");
const passwordHiddenIcon = passwordInputWrapper.querySelector("i.fa-eye-slash");
const passwordVisibleIcon = passwordInputWrapper.querySelector("i.fa-eye");
const passwordErrorMsg = passwordField.querySelector("p.error");
const passwordArr = [passwordInputWrapper, passwordLabel, passwordInput];

// Login Form
const loginForm = document.querySelector(".form");
const loginBtn = loginForm.querySelector(".save");

const adminLogin = () => {
  const request = serverRequest();

  const formData = new FormData(loginForm);

  const loader = document.querySelector(".loader");
  addCssClass(loader, "active");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");

      const response = JSON.parse(request.response);

      if (response.isLoggedIn) {
        showNotification("Te-ai logat cu succes!", "index.php", 1500, null);
      }

      if (response.activeAccount != null) {
        showNotification(response.activeAccount, "login.php", 1500, "error");
      }

      if (response.email != null) {
        showError(emailArr, emailErrorMsg, response.email);
      } else {
        hideError(emailArr, emailErrorMsg);
      }

      if (response.password != null) {
        showError(passwordArr, passwordErrorMsg, response.password);
      } else {
        hideError(passwordArr, passwordErrorMsg);
      }
    }
  };

  request.open("POST", "classes/login.class.php");
  request.send(formData);
};

const passwordValidation = () => {
  if (isEmpty(passwordInput)) {
    showError(passwordArr, passwordErrorMsg, "Campul este obligatoriu!");
  } else {
    hideError(passwordArr, passwordErrorMsg);
  }
};

const loginFunctionalities = () => {
  // Email
  emailInput.addEventListener("keyup", () => {
    emailValidation(emailInput, emailArr, emailErrorMsg);
  });

  // Password
  passwordInput.addEventListener("keyup", () => {
    passwordValidation();
  });

  passwordHiddenIcon.addEventListener("click", () => {
    removeCssClass(passwordHiddenIcon, "active");
    addCssClass(passwordVisibleIpasswordHiddenIcon, "active");

    passwordInput.setAttribute("type", "text");
  });

  passwordVisibleIcon.addEventListener("click", () => {
    removeCssClass(passwordVisibleIcon, "active");
    addCssClass(passwordHiddenIcopasswordVisibleIcon, "active");

    passwordInput.setAttribute("type", "password");
  });

  // Login Admin
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    emailValidation(emailInput, emailArr, emailErrorMsg);
    passwordValidation();

    if (emailErrorMsg.innerHTML == "" && passwordErrorMsg.innerHTML == "") {
      adminLogin();
    }
  });
};
loginFunctionalities();
