import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  serverRequest,
  showNotification,
} from "./global.js";

import {
  showError,
  hideError,
  isEmpty,
  hasSpecifiedLength,
  matchSpecifiedRegExp,
} from "./validations.js";

const resetAccountContainer = document.querySelector("#resetAccount");
toggleCssClass(resetAccountContainer, "active");

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

// Password Helper
const passwordHelper = passwordField.querySelector(".form__field__helper");
const smallLettersItem = passwordHelper.querySelectorAll("ul li")[0];
const capitalLettersItem = passwordField.querySelectorAll("ul li")[1];
const charsLengthItem = passwordField.querySelectorAll("ul li")[2];
const numbersItem = passwordField.querySelectorAll("ul li")[3];
const specialCharsItem = passwordField.querySelectorAll("ul li")[4];

let hasCapitalLetters = false;
let hasSmallLetters = false;
let hasCharsLength = false;
let hasNumbers = false;
let hasSpecialChars = false;

const passwordLengthArr = [
  passwordLabel,
  passwordInputWrapper,
  charsLengthItem,
];
const passwordCapitalLettersArr = [
  passwordLabel,
  passwordInputWrapper,
  capitalLettersItem,
];
const passwordSmallLettersArr = [
  passwordLabel,
  passwordInputWrapper,
  smallLettersItem,
];
const passwordNumberArr = [passwordLabel, passwordInputWrapper, numbersItem];
const passwordSpecialCharsArr = [
  passwordLabel,
  passwordInputWrapper,
  specialCharsItem,
];

const resetAccountBtn = document.querySelector(".save");

const passwordValidation = () => {
  const capitalLetters = /[A-Z]+/g;
  const smallLetters = /[a-z]{4,}/g;
  const numbers = /[0-9]+/g;
  const specialChars = /[!, @, #, $, %, ^, &, *, \.]+/g;

  if (isEmpty(passwordInput)) {
    showError(passwordArr, passwordErrorMsg, "Campul este obligatoriu!");
    removeCssClass(passwordHiddenIcon, "active");
  } else {
    hideError(passwordArr, passwordErrorMsg);
    addCssClass(passwordHiddenIcon, "active");
  }

  if (!hasSpecifiedLength(passwordInput, 8, null)) {
    showError(passwordLengthArr, null, null);
    hasCharsLength = false;
  } else {
    hideError(passwordLengthArr, null);
    hasCharsLength = true;
  }

  if (!matchSpecifiedRegExp(passwordInput, capitalLetters)) {
    showError(passwordCapitalLettersArr, null, null);
    hasCapitalLetters = false;
  } else {
    hideError(passwordCapitalLettersArr, null);
    hasCapitalLetters = true;
  }

  if (!matchSpecifiedRegExp(passwordInput, smallLetters)) {
    showError(passwordSmallLettersArr, null, null);
    addCssClass(passwordLabel, "error");
    hasSmallLetters = false;
  } else {
    hideError(passwordSmallLettersArr, null);
    hasSmallLetters = true;
  }

  if (!matchSpecifiedRegExp(passwordInput, numbers)) {
    showError(passwordNumberArr, null, null);
    hasNumbers = false;
  } else {
    hideError(passwordNumberArr, null);
    hasNumbers = true;
  }

  if (!matchSpecifiedRegExp(passwordInput, specialChars)) {
    showError(passwordSpecialCharsArr, null, null);
    hasSpecialChars = false;
  } else {
    hideError(passwordSpecialCharsArr, passwordErrorMsg);
    hasSpecialChars = true;
  }
};

const resetAccount = () => {
  const request = serverRequest();

  const queryParam = document.URL.indexOf("=");
  const userId = document.URL.slice(queryParam + 1);

  const formData = new FormData();
  formData.append("newPassword", passwordInput.value);
  formData.append("userId", userId);

  const loader = document.querySelector(".loader");
  addCssClass(loader, "active");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");

      const response = JSON.parse(request.response);

      if (response.isUpdated) {
        showNotification(
          "Parola a fost modificata cu succes!",
          "login.php",
          3000,
          null
        );
      }
    }
  };

  request.open("POST", "classes/login.class.php", true);
  request.send(formData);
};

const resetAccountFunctionalities = () => {
  passwordLabel.addEventListener("click", () => {
    addCssClass(passwordInputWrapper, "active");
  });

  passwordInput.addEventListener("focus", () => {
    addCssClass(passwordInputWrapper, "active");
  });

  passwordInput.addEventListener("blur", () => {
    removeCssClass(passwordInputWrapper, "active");
  });

  passwordInput.addEventListener("keyup", () => {
    passwordValidation();

    if (
      hasCharsLength &&
      hasCapitalLetters &&
      hasSmallLetters &&
      hasNumbers &&
      hasSpecialChars
    )
      removeCssClass(passwordHelper, "active");
    else {
      addCssClass(passwordHelper, "active");
    }
  });

  passwordHiddenIcon.addEventListener("click", () => {
    removeCssClass(passwordHiddenIcon, "active");
    addCssClass(passwordVisibleIcon, "active");
    passwordInput.setAttribute("type", "text");
  });

  passwordVisibleIcon.addEventListener("click", () => {
    removeCssClass(passwordVisibleIcon, "active");
    addCssClass(passwordHiddenIcon, "active");
    passwordInput.setAttribute("type", "password");
  });

  resetAccountBtn.addEventListener("click", () => {
    if (passwordErrorMsg.innerHTML == "") {
      resetAccount();
    }
  });
};
resetAccountFunctionalities();
