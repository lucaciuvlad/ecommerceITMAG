import {
  addCssClass,
  removeCssClass,
  serverRequest,
  showNotification,
  delayShowingMainContainer,
} from "./global.js";

import { opItems, visibleOperations } from "./navigationBar.js";
import { isEmpty, showError, hideError } from "./validations.js";

// Self-Active Current Side Menu Link
(function () {
  visibleOperations();

  opItems.forEach((item) => {
    if (item.classList.contains("br")) addCssClass(item, "standOut");
  });

  const brandsContainer = document.querySelector(".brands");
  delayShowingMainContainer(brandsContainer);
})();

// BRAND VIEW
// Table Data Options
const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const brandFunctionalities = () => {
  // Toggle Table Data Dropdowns
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

// INSERT BRAND
// Add Brand Btn
const addBrandBtn = document.querySelector(".addBtn");

// Insert Brand Form Modal
const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);

// Insert Modal Form Btns
const insertForm = document.querySelector(".brandInsert");
const insertBtn = insertFormModal.querySelector(".save");
const cancelInsertBtn = insertFormModal.querySelector(".close");

// Brand Name
const brandNameField = document.querySelector(".brandName");
const brandNameLabel = brandNameField.querySelector("label");
const brandNameInput = brandNameField.querySelector("input");
const brandNameErrMsg = brandNameField.querySelector("p.error");

const brandNameArr = [brandNameField, brandNameLabel, brandNameInput];

// Insert Brand
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

      // Backend Validations
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
  // Show Insert Modal Form
  addBrandBtn.addEventListener("click", () => {
    addCssClass(insertFormModal, "active");
  });

  // Hide Insert Modal Form
  insertFormModalCloseIcon.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");
  });

  cancelInsertBtn.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");
  });

  // Brand Insert Request
  insertBtn.addEventListener("click", () => {
    // Brand Name Validation
    if (isEmpty(brandNameInput)) {
      showError(brandNameArr, brandNameErrMsg, "Campul este obligatoriu!");
    } else {
      hideError(brandNameArr, brandNameErrMsg);
    }

    // Insert Brand Into Database
    if (brandNameErrMsg.innerHTML == "") {
      insertBrand();
    }
  });
};
insertBrandFunctionalities();

// UPDATE CATEGORY
// Table Update Btns
const updateBrandBtns = document.querySelectorAll(".brandUpdateBtn");

// Update Modal Form
let updateFormModals = null;
let updateForms = null;

if (document.querySelectorAll(".brandUpdate")) {
  updateFormModals = Array.from(document.querySelectorAll(".modal.update"));
  updateForms = Array.from(document.querySelectorAll(".brandUpdate"));
}

const updateCategoryFunctionalities = () => {
  updateBrandBtns.forEach((updateBrandBtn, index) => {
    updateBrandBtn.addEventListener("click", () => {
      // Show Update Modal Form
      addCssClass(updateFormModals[index], "active");

      // Hide Table Action Dropdown
      actionDropdowns.forEach((actionDropdown) => {
        removeCssClass(actionDropdown, "active");
      });

      // Hide Update Modal Form
      const updateFormCloseBtn =
        updateFormModals[index].querySelector(".modal__close");
      updateFormCloseBtn.addEventListener("click", () => {
        removeCssClass(updateFormModals[index], "active");
      });

      const updateModalFormCancelBtn =
        updateFormModals[index].querySelector(".close");
      updateModalFormCancelBtn.addEventListener("click", () => {
        removeCssClass(updateFormModals[index], "active");
      });

      // Update Brand Name
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

      // Update Brand Request
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

            // Backend Validations
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

      // Brand Update Request
      const updateBtn = updateFormModals[index].querySelector(".save");

      updateBtn.addEventListener("click", () => {
        // Brand Name Validation
        if (isEmpty(updateBrandNameInput)) {
          showError(
            updateBrandNameArr,
            updateBrandNameErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateBrandNameArr, updateBrandNameErrMsg);
        }

        // Update Brand
        if (updateBrandNameErrMsg.innerHTML == "") {
          updateBrand();
        }
      });
    });
  });
};
updateCategoryFunctionalities();

// DELETE BRAND
// Table Delete Btns
const deleteBrandBtns = document.querySelectorAll(".brandDeleteBtn");

// Deletion Confirmation Modal
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
    deleteBrandBtn.addEventListener("click", () => {
      // Show Modal Deletion Confirmation
      addCssClass(modalConfirmation, "active");

      // Remove Any Active Action Dropdown
      actionDropdowns.forEach((ActionDropdown) => {
        if (ActionDropdown.classList.contains("active")) {
          removeCssClass(ActionDropdown, "active");
        } else {
          return;
        }
      });

      // Hide Modal Deletion Confirmation
      if (modalConfirmation !== null) {
        closeModal.addEventListener("click", () => {
          removeCssClass(modalConfirmation, "active");
        });

        rejectBtn.addEventListener("click", () => {
          removeCssClass(modalConfirmation, "active");
        });
      }

      // Brand Deletion
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
