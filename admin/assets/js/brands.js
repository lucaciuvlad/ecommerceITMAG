import {
  addCssClass,
  removeCssClass,
  serverRequest,
  showNotification,
  delayShowingMainContainer,
} from "./global.js";

import { opItems, visibleOperations } from "./navigationBar.js";
import { isEmpty, showError, hideError } from "./validations.js";

(function () {
  visibleOperations();

  opItems.forEach((item) => {
    if (item.classList.contains("br")) addCssClass(item, "standOut");
  });

  const brandsContainer = document.querySelector(".brands");
  delayShowingMainContainer(brandsContainer);
})();

const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const brandFunctionalities = () => {
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
brandFunctionalities();

const addBrandBtn = document.querySelector(".addBtn");

const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);

const insertForm = document.querySelector(".brandInsert");
const insertBtn = insertFormModal.querySelector(".save");
const cancelInsertBtn = insertFormModal.querySelector(".close");

const brandNameField = document.querySelector(".brandName");
const brandNameLabel = brandNameField.querySelector("label");
const brandNameInput = brandNameField.querySelector("input");
const brandNameErrMsg = brandNameField.querySelector("p.error");

const brandNameArr = [brandNameField, brandNameLabel, brandNameInput];

const insertBrand = () => {
  const request = serverRequest();

  const formData = new FormData(insertForm);

  const loader = document.querySelector(".loader");
  addCssClass(loader, "active");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");

      const response = JSON.parse(request.response);

      if (response.isInserted) {
        showNotification(
          "Producatorul a fost adaugat cu succes!",
          "brands.php",
          1500,
          null
        );
      }

      if (response.brandName != null) {
        showError(brandNameArr, brandNameErrMsg, response.brandName);
      } else {
        hideError(brandNameArr, brandNameErrMsg);
      }
    }
  };

  request.open("POST", "classes/brands.class.php");
  request.send(formData);
};

const insertBrandFunctionalities = () => {
  addBrandBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.style.overflow = "hidden";
    addCssClass(insertFormModal, "active");

    actionDropdowns.forEach((actionDropdown) => {
      removeCssClass(actionDropdown, "active");
    });
  });

  insertFormModalCloseIcon.addEventListener("click", () => {
    document.body.style.overflow = "visible";
    removeCssClass(insertFormModal, "active");
  });

  cancelInsertBtn.addEventListener("click", () => {
    document.body.style.overflow = "visible";
    removeCssClass(insertFormModal, "active");
  });

  insertBtn.addEventListener("click", () => {
    if (isEmpty(brandNameInput)) {
      showError(brandNameArr, brandNameErrMsg, "Campul este obligatoriu!");
    } else {
      hideError(brandNameArr, brandNameErrMsg);
    }

    if (brandNameErrMsg.innerHTML == "") {
      insertBrand();
    }
  });
};
insertBrandFunctionalities();

const updateBrandBtns = document.querySelectorAll(".brandUpdateBtn");

let updateFormModals = null;
let updateForms = null;

if (document.querySelectorAll(".brandUpdate")) {
  updateFormModals = Array.from(document.querySelectorAll(".modal.update"));
  updateForms = Array.from(document.querySelectorAll(".brandUpdate"));
}

const updateBrandFunctionalities = () => {
  updateBrandBtns.forEach((updateBrandBtn, index) => {
    updateBrandBtn.parentElement.addEventListener("click", () => {
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

      const updateBrandNameField =
        updateFormModals[index].querySelector(".updateBrandName");
      const updateBrandNameLabel = updateBrandNameField.querySelector("label");
      const updateBrandNameInput = updateBrandNameField.querySelector("input");
      const updateBrandNameErrMsg =
        updateBrandNameField.querySelector("p.error");

      const updateBrandNameArr = [
        updateBrandNameField,
        updateBrandNameLabel,
        updateBrandNameInput,
      ];

      const updateBrand = () => {
        const request = serverRequest();

        const formData = new FormData(updateForms[index]);
        formData.append("updateBrandId", updateBrandBtn.dataset.brandId);

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            if (response.isUpdated) {
              showNotification(
                "Producatorul a fost modificat cu succes!",
                "brands.php",
                1500,
                null
              );
            }

            if (response.updateBrandName != null) {
              showError(
                updateBrandNameArr,
                updateBrandNameErrMsg,
                response.updateBrandName
              );
            } else {
              hideError(updateBrandNameArr, updateBrandNameErrMsg);
            }
          }
        };

        request.open("POST", "classes/brands.class.php");
        request.send(formData);
      };

      const updateBtn = updateFormModals[index].querySelector(".save");

      updateBtn.addEventListener("click", () => {
        if (isEmpty(updateBrandNameInput)) {
          showError(
            updateBrandNameArr,
            updateBrandNameErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateBrandNameArr, updateBrandNameErrMsg);
        }

        if (updateBrandNameErrMsg.innerHTML == "") {
          updateBrand();
        }
      });
    });
  });
};
updateBrandFunctionalities();

const deleteBrandBtns = document.querySelectorAll(".brandDeleteBtn");

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

const deleteBrandFunctionalities = () => {
  deleteBrandBtns.forEach((deleteBrandBtn) => {
    deleteBrandBtn.parentElement.addEventListener("click", () => {
      document.body.style.overflow = "hidden";
      addCssClass(modalConfirmation, "active");

      actionDropdowns.forEach((ActionDropdown) => {
        if (ActionDropdown.classList.contains("active")) {
          removeCssClass(ActionDropdown, "active");
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
        const brandId = deleteBrandBtn.dataset.brandId;

        const request = serverRequest();

        const formData = new FormData();
        formData.append("deleteBrandId", brandId);

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            if (response.isDeleted) {
              showNotification(
                "Producatorul a fost sters cu succes!",
                "brands.php",
                1500,
                null
              );
            }
          }
        };

        request.open("POST", "classes/brands.class.php");
        request.send(formData);
      });
    });
  });
};
deleteBrandFunctionalities();
