import {
  addCssClass,
  removeCssClass,
  serverRequest,
  showNotification,
  delayShowingMainContainer,
} from "./global.js";

import {
  showError,
  hideError,
  isEmpty,
  hasSpecifiedLength,
  matchSpecifiedRegExp,
  emailValidation,
} from "./validations.js";

const register = document.querySelector("#register");
delayShowingMainContainer(register);

// First Name
const firstNameField = document.querySelector(".firstName");
const firstNameLabel = firstNameField.querySelector("label");
const firstNameInput = firstNameField.querySelector("input");
const firstNameErrorMsg = firstNameField.querySelector("p.error");
const firstNameArr = [firstNameField, firstNameLabel, firstNameInput];

// Last Name
const lastNameField = document.querySelector(".lastName");
const lastNameLabel = lastNameField.querySelector("label");
const lastNameInput = lastNameField.querySelector("input");
const lastNameErrorMsg = lastNameField.querySelector("p.error");
const lastNameArr = [lastNameField, lastNameLabel, lastNameInput];

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

// Register Form
const form = document.querySelector(".form");
const registerBtn = form.querySelector(".save");

// Register Admin Request
const registerAdmin = () => {
  const request = serverRequest();

  const formData = new FormData(form);

  const loader = document.querySelector(".loader");
  addCssClass(loader, "active");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");

      const response = JSON.parse(request.response);

      console.log(response);

      if (response.isRegistered) {
        showNotification(
          "Te-ai inregistrat cu succes! Un email de confirmare a contului fost trimis!",
          "login.php",
          3000,
          null
        );
      }

      if (response.lastName != null) {
        showError(lastNameArr, lastNameErrorMsg, response.lastName);
      } else {
        hideError(lastNameArr, lastNameErrorMsg);
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

  request.open("POST", "classes/register.class.php", true);
  request.send(formData);
};

// Full Name Validation
const nameValidation = (input, label, errorMessage) => {
  const numbers = /[0-9]/g;
  const nameArr = [input, label];

  if (isEmpty(input)) {
    showError(nameArr, errorMessage, "Campul este obligatoriu!");
  } else if (!hasSpecifiedLength(input, 3, null)) {
    showError(nameArr, errorMessage, "Nume incorect!");
  } else if (matchSpecifiedRegExp(input, numbers)) {
    showError(nameArr, errorMessage, "Campul nu poate contine numere!");
  } else {
    hideError(nameArr, errorMessage);
  }
};

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

// Register System Functionalities Trigger
const registerFunctionalities = () => {
  // First Name Validation
  firstNameInput.addEventListener("keyup", () => {
    nameValidation(firstNameInput, firstNameLabel, firstNameErrorMsg);
  });

  // Last Name Validation
  lastNameInput.addEventListener("keyup", () => {
    nameValidation(lastNameInput, lastNameLabel, lastNameErrorMsg);
  });

  // Email Validation
  emailInput.addEventListener("keyup", () => {
    emailValidation(emailInput, emailArr, emailErrorMsg);
  });

  // Password
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

  // Register Admin
  registerBtn.addEventListener("click", (e) => {
    e.preventDefault();

    nameValidation(firstNameInput, firstNameLabel, firstNameErrorMsg);
    nameValidation(lastNameInput, lastNameLabel, lastNameErrorMsg);
    emailValidation(emailInput, emailArr, emailErrorMsg);
    passwordValidation();

    if (
      firstNameErrorMsg.innerHTML == "" &&
      lastNameErrorMsg.innerHTML == "" &&
      emailErrorMsg.innerHTML == "" &&
      passwordErrorMsg.innerHTML == ""
    ) {
      registerAdmin();
    }
  });
};
registerFunctionalities();
