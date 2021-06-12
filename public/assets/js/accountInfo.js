import {
  addCssClass,
  removeCssClass,
  serverRequest,
  showNotification,
  toggleCssClass,
} from "./global.js";

import {
  isEmpty,
  notNumeric,
  hasSpecifiedLength,
  matchSpecifiedRegExp,
  showError,
  hideError,
} from "./validations.js";

const accountInfo = document.querySelector("#accountInfo");
toggleCssClass(accountInfo, "active");

const userPanelActions = document.querySelector(".userPanel__user__actions");
const userActions = Array.from(userPanelActions.children);

userActions.forEach((userAction) => {
  if (userAction.classList.contains("accInfo")) {
    const spanText = userAction.querySelector("span");
    const icon = userAction.querySelector("i");
    addCssClass(userAction, "active");
    addCssClass(spanText, "active");
    addCssClass(icon, "active");
  }
});

// New Address
let addNewAddressBtn = null;

let insertAddressModal = null;
let modalCloseIcon = null;
let modalCloseBtn = null;
let modalInsertAddressBtn = null;

let addressField = null;
let addressLabel = null;
let addressInput = null;
let addressErrorMsg = null;
let addressArr = null;

let phoneNumberField = null;
let phoneNumberLabel = null;
let phoneNumberInput = null;
let phoneNumberErrorMsg = null;
let phoneNumberArr = null;

if (document.querySelector(".newAddress > .addAddress")) {
  addNewAddressBtn = document.querySelector(".newAddress > .addAddress");

  insertAddressModal = document.querySelector(".insertAddress");
  modalCloseIcon = insertAddressModal.querySelector(".modal__close");
  modalCloseBtn = insertAddressModal.querySelector(".modal__footer > .close");
  modalInsertAddressBtn = insertAddressModal.querySelector(
    ".modal__footer > .save"
  );

  addressField = insertAddressModal.querySelector(".address");
  addressLabel = addressField.querySelector("label");
  addressInput = addressField.querySelector("input");
  addressErrorMsg = addressField.querySelector("p.error");
  addressArr = [addressField, addressLabel, addressInput];

  phoneNumberField = insertAddressModal.querySelector(".phoneNumber");
  phoneNumberLabel = phoneNumberField.querySelector("label");
  phoneNumberInput = phoneNumberField.querySelector("input");
  phoneNumberErrorMsg = phoneNumberField.querySelector("p.error");
  phoneNumberArr = [phoneNumberField, phoneNumberLabel, phoneNumberInput];
}

let updateAddressBtn = null;

let updateAddressModal = null;
let updateModalCloseIcon = null;
let updateModalCloseBtn = null;
let modalUpdateAddressBtn = null;

let updateAddressField = null;
let updateAddressLabel = null;
let updateAddressInput = null;
let updateAddressErrorMsg = null;
let updateAddressArr = null;

// New Phone Number
let updatePhoneNumberField = null;
let updatePhoneNumberLabel = null;
let updatePhoneNumberInput = null;
let updatePhoneNumberErrorMsg = null;
let updatePhoneNumberArr = null;

if (document.querySelector(".accountInfo__card.address > .updateAddress")) {
  updateAddressBtn = document.querySelector(
    ".accountInfo__card.address > .updateAddress"
  );

  updateAddressModal = document.querySelector(".updateAddress");
  updateModalCloseIcon = updateAddressModal.querySelector(".modal__close");
  updateModalCloseBtn = updateAddressModal.querySelector(
    ".modal__footer > .close"
  );
  modalUpdateAddressBtn = updateAddressModal.querySelector(
    ".modal__footer > .save"
  );

  updateAddressField = updateAddressModal.querySelector(".address");
  updateAddressLabel = updateAddressField.querySelector("label");
  updateAddressInput = updateAddressField.querySelector("input");
  updateAddressErrorMsg = updateAddressField.querySelector("p.error");
  updateAddressArr = [
    updateAddressField,
    updateAddressLabel,
    updateAddressInput,
  ];

  updatePhoneNumberField = updateAddressModal.querySelector(".phoneNumber");
  updatePhoneNumberLabel = updatePhoneNumberField.querySelector("label");
  updatePhoneNumberInput = updatePhoneNumberField.querySelector("input");
  updatePhoneNumberErrorMsg = updatePhoneNumberField.querySelector("p.error");
  updatePhoneNumberArr = [
    updatePhoneNumberField,
    updatePhoneNumberLabel,
    updatePhoneNumberInput,
  ];
}

// Old Password
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

// New Password
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

const userId = document.querySelector("#userId").dataset.user;

const addressInputValidation = (Input, ArrayItems, ErrorMessage) => {
  if (isEmpty(Input)) {
    showError(ArrayItems, ErrorMessage, "Campul este obligatoriu!");
  } else {
    hideError(ArrayItems, ErrorMessage);
  }
};

const phoneNumberValidation = (Input, ArrayItems, ErrorMessage) => {
  if (isEmpty(Input)) {
    showError(ArrayItems, ErrorMessage, "Campul este obligatoriu!");
  } else if (!notNumeric(Input)) {
    showError(ArrayItems, ErrorMessage, "Numar de telefon invalid!");
  } else {
    hideError(ArrayItems, ErrorMessage);
  }
};

const insertAddress = () => {
  const request = serverRequest();

  const formData = new FormData();
  formData.append("address", addressInput.value);
  formData.append("phoneNumber", phoneNumberInput.value);
  formData.append("userId", userId);
  formData.append("action", "insert");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      if (response.isInserted) {
        showNotification(
          "Adresa a fost adaugata cu succes!",
          "accountInfo.php",
          1500,
          null
        );
      }
    }
  };

  request.open("POST", "classes/userAddress.class.php");
  request.send(formData);
};

const updateAddress = () => {
  const request = serverRequest();

  const formData = new FormData();
  formData.append("updateAddress", updateAddressInput.value);
  formData.append("updatePhoneNumber", updatePhoneNumberInput.value);
  formData.append("userId", userId);
  formData.append("action", "update");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);
      console.log(response);

      if (response.isUpdated) {
        showNotification(
          "Adresa a fost modificata cu succes!",
          "accountInfo.php",
          1500,
          null
        );
      }
    }
  };

  request.open("POST", "classes/userAddress.class.php");
  request.send(formData);
};

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
  formData.append("userId", userId);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);
      console.log(response);

      if (response.isUpdated === true) {
        showNotification(
          "Parola a fost modificata cu succes!",
          "accountInfo.php",
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

  request.open("POST", "classes/userAccount.class.php");
  request.send(formData);
};

const userInfoFunctionalities = () => {
  // New Address
  if (addNewAddressBtn != null) {
    addNewAddressBtn.addEventListener("click", () => {
      addCssClass(insertAddressModal, "active");
    });

    modalCloseIcon.addEventListener("click", () => {
      removeCssClass(insertAddressModal, "active");
    });

    modalCloseBtn.addEventListener("click", () => {
      removeCssClass(insertAddressModal, "active");
    });

    addressInput.addEventListener("keyup", () => {
      addressInputValidation(addressInput, addressArr, addressErrorMsg);
    });
    phoneNumberInput.addEventListener("keyup", () => {
      phoneNumberValidation(
        phoneNumberInput,
        phoneNumberArr,
        phoneNumberErrorMsg
      );
    });

    modalInsertAddressBtn.addEventListener("click", () => {
      addressInputValidation(addressInput, addressArr, addressErrorMsg);
      phoneNumberValidation(
        phoneNumberInput,
        phoneNumberArr,
        phoneNumberErrorMsg
      );

      if (
        addressErrorMsg.innerHTML == "" &&
        phoneNumberErrorMsg.innerHTML == ""
      ) {
        insertAddress();
      }
    });
  }

  // New Phone Number
  if (updateAddressBtn != null) {
    updateAddressBtn.addEventListener("click", () => {
      addCssClass(updateAddressModal, "active");
    });

    updateModalCloseIcon.addEventListener("click", () => {
      removeCssClass(updateAddressModal, "active");
    });

    updateModalCloseBtn.addEventListener("click", () => {
      removeCssClass(updateAddressModal, "active");
    });

    updateAddressInput.addEventListener("keyup", () => {
      addressInputValidation(
        updateAddressInput,
        updateAddressArr,
        updateAddressErrorMsg
      );
    });

    updatePhoneNumberInput.addEventListener("keyup", () => {
      phoneNumberValidation(
        updatePhoneNumberInput,
        updatePhoneNumberArr,
        updatePhoneNumberErrorMsg
      );
    });

    modalUpdateAddressBtn.addEventListener("click", () => {
      addressInputValidation(
        updateAddressInput,
        updateAddressArr,
        updateAddressErrorMsg
      );
      phoneNumberValidation(
        updatePhoneNumberInput,
        updatePhoneNumberArr,
        updatePhoneNumberErrorMsg
      );

      if (
        updateAddressErrorMsg.innerHTML == "" &&
        updatePhoneNumberErrorMsg.innerHTML == ""
      ) {
        updateAddress();
      }
    });
  }

  // Update Password
  updatePasswordBtn.addEventListener("click", () => {
    addCssClass(updatePasswordModal, "active");
  });

  passwordModalCloseIcon.addEventListener("click", () => {
    removeCssClass(updatePasswordModal, "active");
  });

  passwordModalCloseBtn.addEventListener("click", () => {
    removeCssClass(updatePasswordModal, "active");
  });

  // Old Password
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

  // New Password
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
userInfoFunctionalities();
