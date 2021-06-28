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
    if (item.classList.contains("cat")) addCssClass(item, "standOut");
  });

  const categoriesContainer = document.querySelector(".categories");
  delayShowingMainContainer(categoriesContainer);
})();

const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const categoryFunctionalities = () => {
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

const addCategoryBtn = document.querySelector(".addBtn");

const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);

const insertForm = document.querySelector(".categoryInsert");
const insertBtn = insertFormModal.querySelector(".save");
const cancelInsertBtn = insertFormModal.querySelector(".close");

const categoryNameField = document.querySelector(".categoryName");
const categoryNameLabel = categoryNameField.querySelector("label");
const categoryNameInput = categoryNameField.querySelector("input");
const categoryNameErrMsg = categoryNameField.querySelector("p.error");

const categoryNameArr = [
  categoryNameField,
  categoryNameLabel,
  categoryNameInput,
];

const categoryIconField = document.querySelector(".categoryIcon");
const categoryIconLabel = categoryIconField.querySelector("label");
const categoryIconInput = categoryIconField.querySelector("input");
const categoryIconErrMsg = categoryIconField.querySelector("p.error");

const categoryIconArr = [
  categoryIconField,
  categoryIconLabel,
  categoryIconInput,
];

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

const insertCategoryFunctionalities = () => {
  addCategoryBtn.addEventListener("click", () => {
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
    if (isEmpty(categoryNameInput)) {
      showError(
        categoryNameArr,
        categoryNameErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(categoryNameArr, categoryNameErrMsg);
    }

    if (isEmpty(categoryIconInput)) {
      showError(
        categoryIconArr,
        categoryIconErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(categoryIconArr, categoryIconErrMsg);
    }

    if (
      categoryNameErrMsg.innerHTML == "" &&
      categoryIconErrMsg.innerHTML == ""
    ) {
      insertCategory();
    }
  });
};
insertCategoryFunctionalities();

const updateCategoryBtns = document.querySelectorAll(".categoryUpdateBtn");

let updateFormModals = null;
let updateForms = null;

if (document.querySelectorAll(".categoryUpdate")) {
  updateFormModals = Array.from(document.querySelectorAll(".modal.update"));
  updateForms = Array.from(document.querySelectorAll(".categoryUpdate"));
}

const updateCategoryFunctionalities = () => {
  updateCategoryBtns.forEach((updateCategoryBtn, index) => {
    updateCategoryBtn.parentElement.addEventListener("click", () => {
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

      const updateCategory = () => {
        const request = serverRequest();

        const formData = new FormData(updateForms[index]);
        formData.append(
          "updateCategoryId",
          updateCategoryBtn.dataset.categoryId
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

      const updateBtn = updateFormModals[index].querySelector(".save");

      updateBtn.addEventListener("click", () => {
        if (isEmpty(updateCategoryNameInput)) {
          showError(
            updateCategoryNameArr,
            updateCategoryNameErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateCategoryNameArr, updateCategoryNameErrMsg);
        }

        if (isEmpty(updateCategoryIconInput)) {
          showError(
            updateCategoryIconArr,
            updateCategoryIconErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateCategoryIconArr, updateCategoryIconErrMsg);
        }

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
updateCategoryFunctionalities();

const deleteCategoryBtns = document.querySelectorAll(".categoryDeleteBtn");

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

const deleteCategoryFunctionalities = () => {
  deleteCategoryBtns.forEach((deleteCategoryButton) => {
    deleteCategoryButton.parentElement.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
      addCssClass(modalConfirmation, "active");

      actionDropdowns.forEach((ActionDropdown) => {
        if (ActionDropdown.classList.contains("active")) {
          document.body.style.overflow = "visible";
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
          removeCssClass(modalConfirmation, "active");
        });
      }

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
                "categories.php",
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
