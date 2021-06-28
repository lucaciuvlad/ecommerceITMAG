import { hideError, isEmpty, showError } from "./validations.js";
import {
  delayShowingMainContainer,
  addCssClass,
  removeCssClass,
  serverRequest,
  showNotification,
} from "./global.js";

import { visibleOperations, opItems } from "./navigationBar.js";

const productSpecificationsContainer = document.querySelector(
  ".productSpecifications"
);

(function () {
  visibleOperations();

  opItems.forEach((item) => {
    if (item.classList.contains("pr")) addCssClass(item, "standOut");
  });

  delayShowingMainContainer(productSpecificationsContainer);
})();

const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const productSpecificationFunctionalities = () => {
  optionsToggles.forEach((optionToggle, index) => {
    optionToggle.addEventListener("click", () => {
      if (!actionDropdowns[index].classList.contains("active")) {
        addCssClass(actionDropdowns[index], "active");
      } else {
        removeCssClass(actionDropdowns[index], "active");
      }
    });
  });
};
productSpecificationFunctionalities();

const productSpecificationAddBtn = document.querySelector(".addBtn");
const productId = productSpecificationAddBtn.dataset.productId;

const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);
const insertForm = document.querySelector(".insertProductSpec");
const insertFormSaveBtn = insertFormModal.querySelector(".save");
const insertFormCloseBtn = insertFormModal.querySelector(".close");

const productSpecificationKeyField = document.querySelector(".productSpecKey");
const productSpecificationKeyLabel =
  productSpecificationKeyField.querySelector("label");
const productSpecificationKeyInput =
  productSpecificationKeyField.querySelector("input");
const productSpecificationKeyErrMsg =
  productSpecificationKeyField.querySelector("p.error");

const productSpecificationKeyArr = [
  productSpecificationKeyField,
  productSpecificationKeyLabel,
  productSpecificationKeyInput,
];

const productSpecificationValueField =
  document.querySelector(".productSpecValue");
const productSpecificationValueLabel =
  productSpecificationValueField.querySelector("label");
const productSpecificationValueInput =
  productSpecificationValueField.querySelector("input");
const productSpecificationValueErrMsg =
  productSpecificationValueField.querySelector("p.error");

const productSpecificationValueArr = [
  productSpecificationValueField,
  productSpecificationValueLabel,
  productSpecificationValueInput,
];

const insertProductSpecification = () => {
  const request = serverRequest();

  const formData = new FormData(insertForm);
  formData.append("productSpecKey", productSpecificationKeyInput.value);
  formData.append("productSpecificValue", productSpecificationValueInput);
  formData.append("productId", productId);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      if (response.isInserted) {
        showNotification(
          "Specificatia produsului a fost adaugata cu succes!",
          `productSpecifications.php?productID=${productId}`,
          1500,
          null
        );
      }
    }
  };

  request.open("POST", "./classes/productSpecifications.class.php");
  request.send(formData);
};

const insertProductSpecificationFunctionalities = () => {
  productSpecificationAddBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
    addCssClass(insertFormModal, "active");
  });

  insertFormModalCloseIcon.addEventListener("click", () => {
    document.body.style.overflow = "visible";
    removeCssClass(insertFormModal, "active");
  });

  insertFormCloseBtn.addEventListener("click", () => {
    document.body.style.overflow = "visible";
    removeCssClass(insertFormModal, "active");
  });

  insertFormSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (isEmpty(productSpecificationKeyInput)) {
      showError(
        productSpecificationKeyArr,
        productSpecificationKeyErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(productSpecificationKeyArr, productSpecificationKeyErrMsg);
    }

    if (isEmpty(productSpecificationValueInput)) {
      showError(
        productSpecificationValueArr,
        productSpecificationValueErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(productSpecificationValueArr, productSpecificationValueErrMsg);
    }

    if (
      productSpecificationKeyErrMsg.innerHTML == "" &&
      productSpecificationValueErrMsg.innerHTML == ""
    ) {
      insertProductSpecification();
    }
  });
};
insertProductSpecificationFunctionalities();

const updateProductBtns = document.querySelectorAll(
  ".productSpecificationUpdateBtn"
);

let updateFormModals = null;
let updateForms = null;

if (document.querySelectorAll(".updateProductSpec")) {
  updateFormModals = Array.from(document.querySelectorAll(".modal.update"));
  updateForms = Array.from(document.querySelectorAll(".updateProductSpec"));
}

const updateProductSpecFunctionalities = () => {
  updateProductBtns.forEach((updateProductBtn, index) => {
    updateProductBtn.parentElement.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
      addCssClass(updateFormModals[index], "active");

      actionDropdowns.forEach((actionDropdown) => {
        removeCssClass(actionDropdown, "active");
      });

      const updateFormCloseBtn =
        updateFormModals[index].querySelector(".modal__close");
      updateFormCloseBtn.addEventListener("click", () => {
        document.body.style.overflow = "visible";
        removeCssClass(updateFormModals[index], "active");
      });

      const updateModalFormCancelBtn =
        updateFormModals[index].querySelector(".close");
      updateModalFormCancelBtn.addEventListener("click", () => {
        document.body.style.overflow = "visible";
        removeCssClass(updateFormModals[index], "active");
      });

      const updateProductSpecKeyField = updateForms[index].querySelector(
        ".updateProductSpecKey"
      );
      const updateProductSpecKeyLabel =
        updateProductSpecKeyField.querySelector("label");
      const updateProductSpecKeyInput =
        updateProductSpecKeyField.querySelector("input");
      const updateProductSpecKeyErrMsg =
        updateProductSpecKeyField.querySelector("p.error");

      const updateProductSpecKeyArr = [
        updateProductSpecKeyField,
        updateProductSpecKeyLabel,
        updateProductSpecKeyInput,
      ];

      const updateProductSpecValueField = updateForms[index].querySelector(
        ".updateProductSpecValue"
      );
      const updateProductSpecValueLabel =
        updateProductSpecValueField.querySelector("label");
      const updateProductSpecValueInput =
        updateProductSpecValueField.querySelector("input");
      const updateProductSpecValueErrMsg =
        updateProductSpecValueField.querySelector("p.error");

      const updateProductSpecValueArr = [
        updateProductSpecValueField,
        updateProductSpecValueLabel,
        updateProductSpecValueInput,
      ];

      const updateBtn = updateFormModals[index].querySelector(".save");
      const productSpecificationID = updateProductBtn.dataset.productSpecId;

      const updateProductSpecification = () => {
        const request = serverRequest();

        const formData = new FormData(updateForms[index]);
        formData.append("productSpecId", productSpecificationID);

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.response);

            if (response.isUpdated) {
              showNotification(
                "Specificatia produsului a fost modificata cu succes!",
                `productSpecifications.php?productID=${productId}`,
                1500,
                null
              );
            }
          }
        };

        request.open("POST", "./classes/productSpecifications.class.php");
        request.send(formData);
      };

      updateBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (isEmpty(updateProductSpecKeyInput)) {
          showError(
            updateProductSpecKeyArr,
            updateProductSpecKeyErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductSpecKeyArr, updateProductSpecKeyErrMsg);
        }

        if (isEmpty(updateProductSpecValueInput)) {
          showError(
            updateProductSpecValueArr,
            updateProductSpecValueErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductSpecValueArr, updateProductSpecValueErrMsg);
        }

        if (
          updateProductSpecKeyErrMsg.innerHTML == "" &&
          updateProductSpecValueErrMsg.innerHTML == ""
        ) {
          updateProductSpecification();
        }
      });
    });
  });
};
updateProductSpecFunctionalities();

const deleteProductSpecBtns = document.querySelectorAll(
  ".productSpecificationDeleteBtn"
);

let modalConfirmation = null;
let confirmBtn = null;
let rejectBtn = null;
let closeModal = null;

if (document.querySelector(".modal.delete")) {
  modalConfirmation = document.querySelector(".modal.delete");
  confirmBtn = modalConfirmation.querySelector("#confirm");
  rejectBtn = modalConfirmation.querySelector("#reject");
  closeModal = modalConfirmation.querySelector(".modal__close");
}

const deleteProductSpecFunctionalities = () => {
  deleteProductSpecBtns.forEach((deleteProductSpecBtn) => {
    deleteProductSpecBtn.parentElement.addEventListener("click", () => {
      document.body.style.overflow = "hidden";
      addCssClass(modalConfirmation, "active");

      actionDropdowns.forEach((actionDropdown) => {
        if (actionDropdown.classList.contains("active")) {
          removeCssClass(actionDropdown, "active");
        } else {
          return;
        }
      });

      if (modalConfirmation !== null) {
        closeModal.addEventListener("click", () => {
          document.body.style.overflow = "visible";
          removeCssClass(modalConfirmation, "active");
        });

        rejectBtn.addEventListener("click", () => {
          document.body.style.overflow = "visible";
          removeCssClass(modalConfirmation, "active");
        });
      }

      confirmBtn.addEventListener("click", () => {
        const productSpecId = deleteProductSpecBtn.dataset.productSpecId;

        const request = serverRequest();

        const formData = new FormData();
        formData.append("deleteProductSpecId", productSpecId);

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.response);

            if (response.isDeleted) {
              showNotification(
                "Specificatia produsului a fost stearsa cu succes!",
                `productSpecifications.php?productID=${productId}`,
                1500,
                "error"
              );
            }
          }
        };

        request.open("POST", "classes/productSpecifications.class.php");
        request.send(formData);
      });
    });
  });
};
deleteProductSpecFunctionalities();
