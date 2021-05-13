import {
  addCssClass,
  removeCssClass,
  toggleCssClass,
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
    if (item.classList.contains("cat")) addCssClass(item, "standOut");
  });

  const productsContainer = document.querySelector(".categories");
  delayShowingMainContainer(productsContainer);
})();

// CATEGORY VIEW
// Table Data Options
const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

// Category Functionality Triggers
const categoryFunctionalities = () => {
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
categoryFunctionalities();

// INSERT PRODUCT
// Add Category Btn
const addCategoryBtn = document.querySelector(".addBtn");

// Insert Category Form Modal
const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);

// Insert Modal Form Btns
const insertForm = document.querySelector(".categoryInsert");
const insertBtn = insertFormModal.querySelector(".save");
const cancelInsertBtn = insertFormModal.querySelector(".close");

// Category Name
const categoryNameField = document.querySelector(".categoryName");
const categoryNameLabel = categoryNameField.querySelector("label");
const categoryNameInput = categoryNameField.querySelector("input");
const categoryNameErrMsg = categoryNameField.querySelector("p.error");

const categoryNameArr = [
  categoryNameField,
  categoryNameLabel,
  categoryNameInput,
];

// Category Icon
const categoryIconField = document.querySelector(".categoryIcon");
const categoryIconLabel = categoryIconField.querySelector("label");
const categoryIconInput = categoryIconField.querySelector("input");
const categoryIconErrMsg = categoryIconField.querySelector("p.error");

const categoryIconArr = [
  categoryIconField,
  categoryIconLabel,
  categoryIconInput,
];

// Insert Category
const insertCategory = () => {
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
          "Categoria a fost adaugat cu succes!",
          "categories.php",
          1500,
          null
        );
      }

      // Backend Validations
      if (response.categoryName != undefined) {
        showError(categoryNameArr, categoryNameErrMsg, response.categoryName);
      } else {
        hideError(categoryNameArr, categoryNameErrMsg);
      }

      if (response.categoryIcon != undefined) {
        showError(categoryIconArr, categoryIconErrMsg, response.categoryIcon);
      } else {
        hideError(categoryIconArr, categoryIconErrMsg);
      }
    }
  };

  request.open("POST", "classes/categories.class.php");
  request.send(formData);
};

// Insert Product Functionality Triggers
const insertCategoryFunctionalities = () => {
  // Show Insert Modal Form
  addCategoryBtn.addEventListener("click", () => {
    addCssClass(insertFormModal, "active");
  });

  // Hide Insert Modal Form
  insertFormModalCloseIcon.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");
  });

  cancelInsertBtn.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");
  });

  // Category Insert Request
  insertBtn.addEventListener("click", () => {
    // Category Name Validation
    if (isEmpty(categoryNameInput)) {
      showError(
        categoryNameArr,
        categoryNameErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(categoryNameArr, categoryNameErrMsg);
    }

    // Category Icon Validation
    if (isEmpty(categoryIconInput)) {
      showError(
        categoryIconArr,
        categoryIconErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(categoryIconArr, categoryIconErrMsg);
    }

    // Insert Category Into Database
    if (
      categoryNameErrMsg.innerHTML == "" &&
      categoryIconErrMsg.innerHTML == ""
    ) {
      insertCategory();
    }
  });
};
insertCategoryFunctionalities();

// UPDATE PRODUCT
// Table Update Btns
const updateCategoryBtns = document.querySelectorAll(".categoryUpdateBtn");

// Update Modal Form
let updateFormModals = null;
let updateForms = null;

if (document.querySelectorAll(".categoryUpdate")) {
  updateFormModals = Array.from(document.querySelectorAll(".modal.update"));
  updateForms = Array.from(document.querySelectorAll(".categoryUpdate"));
}

// Update Category Functionality Triggers
const updateCategoryFunctionalities = () => {
  // Functionalities For Each Update Modal Form
  updateCategoryBtns.forEach((updateCategoryBtn, index) => {
    updateCategoryBtn.addEventListener("click", () => {
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

      // Update Category Name
      const updateCategoryNameField = updateFormModals[index].querySelector(
        ".updateCategoryName"
      );
      const updateCategoryNameLabel =
        updateCategoryNameField.querySelector("label");
      const updateCategoryNameInput =
        updateCategoryNameField.querySelector("input");
      const updateCategoryNameErrMsg =
        updateCategoryNameField.querySelector("p.error");

      const updateCategoryNameArr = [
        updateCategoryNameField,
        updateCategoryNameLabel,
        updateCategoryNameInput,
      ];

      // Update Category Icon
      const updateCategoryIconField = updateFormModals[index].querySelector(
        ".updateCategoryIcon"
      );
      const updateCategoryIconLabel =
        updateCategoryNameField.querySelector("label");
      const updateCategoryIconInput =
        updateCategoryIconField.querySelector("input");
      const updateCategoryIconErrMsg =
        updateCategoryIconField.querySelector("p.error");

      const updateCategoryIconArr = [
        updateCategoryIconField,
        updateCategoryIconLabel,
        updateCategoryIconInput,
      ];

      // Update Category Request
      const updateCategory = () => {
        const request = serverRequest();

        const formData = new FormData(updateForms[index]);
        formData.append(
          "updateCategoryId",
          updateProductBtn.dataset.categoryId
        );

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            if (response.isUpdated) {
              showNotification(
                "Categoria a fost modificata cu succes!",
                "categories.php",
                1500,
                null
              );
            }

            // Backend Validations
            if (response.updateCategoryName != undefined) {
              showError(
                updateCategoryNameArr,
                updateCategoryNameErrMsg,
                response.updateCategoryName
              );
            } else {
              hideError(updateCategoryNameArr, updateCategoryNameErrMsg);
            }

            if (response.updateCategoryIcon != undefined) {
              showError(
                updateCategoryIconArr,
                updateCategoryIconErrMsg,
                response.updateCategoryIcon
              );
            } else {
              hideError(updateCategoryIconArr, updateCategoryIconErrMsg);
            }
          }
        };

        request.open("POST", "classes/categories.class.php");
        request.send(formData);
      };

      // Category Update Request
      const updateBtn = updateFormModals[index].querySelector(".save");

      updateBtn.addEventListener("click", () => {
        // Category Name Validation
        if (isEmpty(updateCategoryNameInput)) {
          showError(
            updateCategoryNameArr,
            updateCategoryNameErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateCategoryNameArr, updateCategoryNameErrMsg);
        }

        // Category Icon Validation
        if (isEmpty(updateIconNameInput)) {
          showError(
            updateIconNameArr,
            updateIconNameErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateIconNameArr, updateIconNameErrMsg);
        }

        // Update Category
        if (
          updateCategoryNameErrMsg.innerHTML == "" &&
          updateCategoryIconErrMsg.innerHTML == ""
        ) {
          updateCategory();
        }
      });
    });
  });
};
updateProductFunctionalities();

// DELETE CATEGORY
// Table Delete Btns
const deleteProductBtns = document.querySelectorAll(".categoryDeleteBtn");

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

// Delete Category Functionalities Trigger
const deleteCategoryFunctionalities = () => {
  deleteProductBtns.forEach((deleteCategoryButton) => {
    deleteCategoryButton.addEventListener("click", () => {
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

      // Category Deletion
      confirmBtn.addEventListener("click", () => {
        const categoryId = deleteCategoryButton.dataset.categoryId;

        const request = serverRequest();

        const formData = new FormData();
        formData.append("deleteCategoryId", categoryId);

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            if (response.isDeleted) {
              showNotification(
                "Categoria a fost stearsa cu succes!",
                "products.php",
                1500,
                null
              );
            }
          }
        };

        request.open("POST", "classes/categories.class.php");
        request.send(formData);
      });
    });
  });
};
deleteCategoryFunctionalities();
