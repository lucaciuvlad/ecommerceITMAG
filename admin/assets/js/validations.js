import { addCssClass, removeCssClass } from "./global.js";

const isEmpty = (field) => {
  let emptyField = null;

  if (field.value.length == 0) {
    emptyField = true;
  } else if (field.value == 0) {
    emptyField = true;
  } else {
    emptyField = false;
  }

  return emptyField;
};

const hasSpecifiedLength = (field, minLength, maxLength) => {
  let hasLength = null;

  if (minLength != null) {
    if (field.value.length < minLength) {
      hasLength = false;
    } else {
      hasLength = true;
    }
  }

  if (maxLength != null) {
    if (field.value.length > maxLength) {
      hasLength = false;
    } else {
      hasLength = true;
    }
  }

  return hasLength;
};

const matchSpecifiedRegExp = (field, regExp) => {
  let matching = null;

  if (!field.value.match(regExp)) {
    matching = false;
  } else {
    matching = true;
  }

  return matching;
};

const emailValidation = (emailInput, emailArr, emailErrMsg) => {
  const email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (isEmpty(emailInput)) {
    showError(emailArr, emailErrMsg, "Campul este obligatoriu!");
  } else if (!matchSpecifiedRegExp(emailInput, email)) {
    showError(emailArr, emailErrMsg, "Adresa de email este invalida!");
  } else {
    hideError(emailArr, emailErrMsg);
  }
};

const showError = (errItems, errMsg, msg) => {
  errItems.forEach((errItem) => {
    addCssClass(errItem, "error");
  });

  if (errMsg != null && msg != null) {
    addCssClass(errMsg, "active");
    errMsg.innerHTML = msg;
  }
};
const hideError = (errItems, errMsg) => {
  errItems.forEach((errItem) => {
    removeCssClass(errItem, "error");
  });

  if (errMsg != null) {
    removeCssClass(errMsg, "active");
    errMsg.innerHTML = "";
  }
};

export {
  isEmpty,
  hasSpecifiedLength,
  matchSpecifiedRegExp,
  emailValidation,
  showError,
  hideError,
};
