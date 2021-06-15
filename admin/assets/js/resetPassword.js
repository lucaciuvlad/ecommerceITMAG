import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
  serverRequest,
  showNotification,
} from "./global.js";

import { emailValidation } from "./validations.js";

const resetPasswordContainer = document.querySelector("#resetPassword");
toggleCssClass(resetPasswordContainer, "active");

const resetPassword = () => {
  const request = serverRequest();

  const formData = new FormData();
  formData.append("adminEmail", emailInput.value);
  formData.append("resetAccount", true);

  const loader = document.querySelector(".loader");
  addCssClass(loader, "active");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");

      const response = JSON.parse(request.response);

      if (response.resetStatus === "Email-ul a fost trimis cu succes!") {
        showNotification(
          "Un email de resetare a contului fost trimis! Urmeaza pasii din email!",
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

const emailField = document.querySelector(".email");
const emailLabel = emailField.querySelector("label");
const emailInput = emailField.querySelector("input");
const emailErrorMsg = emailField.querySelector("p.error");
const emailArr = [emailField, emailLabel, emailInput];

const resetPasswordBtn = document.querySelector(".save");

const resetPasswordFunctionalities = () => {
  emailInput.addEventListener("keyup", () => {
    emailValidation(emailInput, emailArr, emailErrorMsg);
  });

  resetPasswordBtn.addEventListener("click", () => {
    emailValidation(emailInput, emailArr, emailErrorMsg);

    if (emailErrorMsg.innerHTML == "") {
      resetPassword();
    }
  });
};
resetPasswordFunctionalities();
