import { delayShowingMainContainer } from "./global.js";

const accountInfoContainer = document.querySelector(".accountInfo");
delayShowingMainContainer(accountInfoContainer);

import {
  addCssClass,
  removeCssClass,
  serverRequest,
  showNotification,
} from "./global.js";

import {
  isEmpty,
  hasSpecifiedLength,
  matchSpecifiedRegExp,
  showError,
  hideError,
} from "./validations.js";

const oldPasswordField = document.querySelector(".oldPassword");
const oldPasswordLabel = oldPasswordField.querySelector("label");
const oldPasswordInputWrapper = oldPasswordField.querySelector(
  ".form__field__wrapper"
);
const oldPasswordInput = oldPasswordInputWrapper.querySelector("input");
const oldPasswordHiddenIcon =
  oldPasswordInputWrapper.querySelector("i.fa-eye-slash");
const oldPasswordVisibleIcon =
  oldPasswordInputWrapper.querySelector("i.fa-eye");
const oldPasswordErrorMsg = oldPasswordField.querySelector("p.error");
const oldPasswordArr = [
  oldPasswordInputWrapper,
  oldPasswordLabel,
  oldPasswordInput,
];

const newPasswordField = document.querySelector(".newPassword");
const newPasswordLabel = newPasswordField.querySelector("label");
const newPasswordInputWrapper = newPasswordField.querySelector(
  ".form__field__wrapper"
);
const newPasswordInput = newPasswordInputWrapper.querySelector("input");
const newPasswordHiddenIcon =
  newPasswordInputWrapper.querySelector("i.fa-eye-slash");
const newPasswordVisibleIcon =
  newPasswordInputWrapper.querySelector("i.fa-eye");
const newPasswordErrorMsg = newPasswordField.querySelector("p.error");
const newPasswordArr = [
  newPasswordInputWrapper,
  newPasswordLabel,
  newPasswordInput,
];

const passwordHelper = newPasswordField.querySelector(".form__field__helper");
const smallLettersItem = passwordHelper.querySelectorAll("ul li")[0];
const capitalLettersItem = newPasswordField.querySelectorAll("ul li")[1];
const charsLengthItem = newPasswordField.querySelectorAll("ul li")[2];
const numbersItem = newPasswordField.querySelectorAll("ul li")[3];
const specialCharsItem = newPasswordField.querySelectorAll("ul li")[4];

let hasCapitalLetters = false;
let hasSmallLetters = false;
let hasCharsLength = false;
let hasNumbers = false;
let hasSpecialChars = false;

const newPasswordLengthArr = [
  newPasswordLabel,
  newPasswordInputWrapper,
  charsLengthItem,
];

const newPasswordCapitalLettersArr = [
  newPasswordLabel,
  newPasswordInputWrapper,
  capitalLettersItem,
];

const newPasswordSmallLettersArr = [
  newPasswordLabel,
  newPasswordInputWrapper,
  smallLettersItem,
];

const newPasswordNumberArr = [
  newPasswordLabel,
  newPasswordInputWrapper,
  numbersItem,
];
const newPasswordSpecialCharsArr = [
  newPasswordLabel,
  newPasswordInputWrapper,
  specialCharsItem,
];

const updatePasswordBtn = document.querySelector(".updatePasswordBtn");
const updatePasswordModal = document.querySelector(".modal.updatePassword");
const passwordModalCloseIcon =
  updatePasswordModal.querySelector(".modal__close");
const passwordModalCloseBtn = updatePasswordModal.querySelector(
  ".modal__footer .close"
);
const passwordModalUpdateBtn = updatePasswordModal.querySelector(
  ".modal__footer .save"
);

const adminId = document.querySelector("#adminId").dataset.admin;

const oldPasswordValidation = () => {
  const capitalLetters = /[A-Z]+/g;
  const smallLetters = /[a-z]{4,}/g;
  const numbers = /[0-9]+/g;
  const specialChars = /[!, @, #, $, %, ^, &, *, \.]+/g;

  if (isEmpty(oldPasswordInput)) {
    showError(oldPasswordArr, oldPasswordErrorMsg, "Campul este obligatoriu!");
    removeCssClass(oldPasswordHiddenIcon, "active");
  } else if (!hasSpecifiedLength(oldPasswordInput, 8, null)) {
    showError(
      oldPasswordArr,
      oldPasswordErrorMsg,
      "Campul trebuia sa aiba minim 8 caractere!"
    );
    addCssClass(oldPasswordHiddenIcon, "active");
  } else if (!matchSpecifiedRegExp(oldPasswordInput, capitalLetters)) {
    showError(
      oldPasswordArr,
      oldPasswordErrorMsg,
      "Campul trebuia sa contina minim o litera mare!"
    );
  } else if (!matchSpecifiedRegExp(oldPasswordInput, smallLetters)) {
    showError(
      oldPasswordArr,
      oldPasswordErrorMsg,
      "Campul trebuia sa contina mai multe caractere mici!"
    );
  } else if (!matchSpecifiedRegExp(oldPasswordInput, numbers)) {
    showError(
      oldPasswordArr,
      oldPasswordErrorMsg,
      "Campul trebuia sa contina cel putin un numar!"
    );
  } else if (!matchSpecifiedRegExp(oldPasswordInput, specialChars)) {
    showError(
      oldPasswordArr,
      oldPasswordErrorMsg,
      "Campul trebuia sa contina cel putin un caracter special!"
    );
  } else {
    hideError(oldPasswordArr, oldPasswordErrorMsg);
  }
};

const passwordValidation = () => {
  const capitalLetters = /[A-Z]+/g;
  const smallLetters = /[a-z]{4,}/g;
  const numbers = /[0-9]+/g;
  const specialChars = /[!, @, #, $, %, ^, &, *, \.]+/g;

  if (isEmpty(newPasswordInput)) {
    showError(newPasswordArr, newPasswordErrorMsg, "Campul este obligatoriu!");
    removeCssClass(newPasswordHiddenIcon, "active");
  } else {
    hideError(newPasswordArr, newPasswordErrorMsg);
    addCssClass(newPasswordHiddenIcon, "active");
  }

  if (!hasSpecifiedLength(newPasswordInput, 8, null)) {
    showError(newPasswordLengthArr, null, null);
    hasCharsLength = false;
  } else {
    hideError(newPasswordLengthArr, null);
    hasCharsLength = true;
  }

  if (!matchSpecifiedRegExp(newPasswordInput, capitalLetters)) {
    showError(newPasswordCapitalLettersArr, null, null);
    hasCapitalLetters = false;
  } else {
    hideError(newPasswordCapitalLettersArr, null);
    hasCapitalLetters = true;
  }

  if (!matchSpecifiedRegExp(newPasswordInput, smallLetters)) {
    showError(newPasswordSmallLettersArr, null, null);
    addCssClass(newPasswordLabel, "error");
    hasSmallLetters = false;
  } else {
    hideError(newPasswordSmallLettersArr, null);
    hasSmallLetters = true;
  }

  if (!matchSpecifiedRegExp(newPasswordInput, numbers)) {
    showError(newPasswordNumberArr, null, null);
    hasNumbers = false;
  } else {
    hideError(newPasswordNumberArr, null);
    hasNumbers = true;
  }

  if (!matchSpecifiedRegExp(newPasswordInput, specialChars)) {
    showError(newPasswordSpecialCharsArr, null, null);
    hasSpecialChars = false;
  } else {
    hideError(newPasswordSpecialCharsArr, newPasswordErrorMsg);
    hasSpecialChars = true;
  }
};

const updatePassword = () => {
  const request = serverRequest();

  const updatePasswordForm = document.querySelector(".updatePasswordForm");

  const formData = new FormData(updatePasswordForm);
  formData.append("adminId", adminId);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      if (response.isUpdated === true) {
        showNotification(
          "Parola a fost modificata cu succes!",
          "myAccount.php",
          1500,
          null
        );
      } else if (response.isUpdated != true || response.isUpdated != false) {
        showError(oldPasswordArr, oldPasswordErrorMsg, response.isUpdated);
      } else {
        hideError(oldPasswordArr, oldPasswordErrorMsg);
      }
    }
  };

  request.open("POST", "classes/myAccount.class.php");
  request.send(formData);
};

const adminInfoFunctionalities = () => {
  updatePasswordBtn.addEventListener("click", () => {
    addCssClass(updatePasswordModal, "active");
  });

  passwordModalCloseIcon.addEventListener("click", () => {
    removeCssClass(updatePasswordModal, "active");
  });

  passwordModalCloseBtn.addEventListener("click", () => {
    removeCssClass(updatePasswordModal, "active");
  });

  oldPasswordLabel.addEventListener("click", () => {
    addCssClass(oldPasswordInputWrapper, "active");
  });

  oldPasswordInput.addEventListener("focus", () => {
    addCssClass(oldPasswordInputWrapper, "active");
  });

  oldPasswordInput.addEventListener("blur", () => {
    removeCssClass(oldPasswordInputWrapper, "active");
  });

  oldPasswordInput.addEventListener("keyup", oldPasswordValidation);

  oldPasswordHiddenIcon.addEventListener("click", () => {
    removeCssClass(oldPasswordHiddenIcon, "active");
    addCssClass(oldPasswordVisibleIcon, "active");
    oldPasswordInput.setAttribute("type", "text");
  });

  oldPasswordVisibleIcon.addEventListener("click", () => {
    removeCssClass(oldPasswordVisibleIcon, "active");
    addCssClass(oldPasswordHiddenIcon, "active");
    oldPasswordInput.setAttribute("type", "password");
  });

  newPasswordLabel.addEventListener("click", () => {
    addCssClass(newPasswordInputWrapper, "active");
  });

  newPasswordInput.addEventListener("focus", () => {
    addCssClass(newPasswordInputWrapper, "active");
  });

  newPasswordInput.addEventListener("blur", () => {
    removeCssClass(newPasswordInputWrapper, "active");
  });

  newPasswordInput.addEventListener("keyup", () => {
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

  newPasswordHiddenIcon.addEventListener("click", () => {
    removeCssClass(newPasswordHiddenIcon, "active");
    addCssClass(newPasswordVisibleIcon, "active");
    newPasswordInput.setAttribute("type", "text");
  });

  newPasswordVisibleIcon.addEventListener("click", () => {
    removeCssClass(newPasswordVisibleIcon, "active");
    addCssClass(newPasswordHiddenIcon, "active");
    newPasswordInput.setAttribute("type", "password");
  });

  passwordModalUpdateBtn.addEventListener("click", () => {
    oldPasswordValidation();
    passwordValidation();

    if (newPasswordInput.value == oldPasswordInput.value) {
      showError(
        newPasswordArr,
        newPasswordErrorMsg,
        "Parola noua nu poate sa coincida cu parola veche!"
      );
    } else {
      hideError(newPasswordArr, newPasswordErrorMsg);
    }

    if (
      newPasswordErrorMsg.innerHTML == "" &&
      oldPasswordErrorMsg.innerHTML == ""
    ) {
      updatePassword();
    }
  });
};
adminInfoFunctionalities();
