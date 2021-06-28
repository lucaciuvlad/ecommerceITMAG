import { hideError, isEmpty, showError } from "./validations.js";
import {
  delayShowingMainContainer,
  addCssClass,
  removeCssClass,
  createElement,
  appendElement,
  serverRequest,
  showNotification,
} from "./global.js";

import { visibleOperations, opItems } from "./navigationBar.js";

(function () {
  visibleOperations();

  opItems.forEach((item) => {
    if (item.classList.contains("pr")) addCssClass(item, "standOut");
  });

  const productDescriptionsContainer = document.querySelector(
    ".productDescriptions"
  );
  delayShowingMainContainer(productDescriptionsContainer);
})();

const tableProductImages = document.querySelectorAll(".image > img");
const peekImageModals = document.querySelectorAll(".modal.peek");
const peekModalCloseIcons = document.querySelectorAll(
  ".modal.peek .modal__close"
);

const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const productDescriptionFunctionalities = () => {
  optionsToggles.forEach((optionToggle, index) => {
    optionToggle.addEventListener("click", () => {
      if (!actionDropdowns[index].classList.contains("active")) {
        addCssClass(actionDropdowns[index], "active");
      } else {
        removeCssClass(actionDropdowns[index], "active");
      }
    });
  });

  tableProductImages.forEach((ProductImage, Index) => {
    ProductImage.addEventListener("click", () => {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, behavior: "smooth" });
      peekImageModals[Index].style.height = "calc(100vh - 3rem)";
      addCssClass(peekImageModals[Index], "active");
    });

    peekModalCloseIcons[Index].addEventListener("click", () => {
      document.body.style.overflow = "visible";
      removeCssClass(peekImageModals[Index], "active");
    });
  });
};
productDescriptionFunctionalities();

const productDescriptionAddBtn = document.querySelector(".addBtn");
const productId = productDescriptionAddBtn.dataset.productId;

const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);
const insertForm = document.querySelector(".insertProductDescription");
const insertFormSaveBtn = insertFormModal.querySelector(".save");
const insertFormCloseBtn = insertFormModal.querySelector(".close");

const productTitleDescField = document.querySelector(
  ".productTitleDescription"
);
const productTitleDescLabel = productTitleDescField.querySelector("label");
const productTitleDescInput = productTitleDescField.querySelector("textarea");
const productTitleDescErrMsg = productTitleDescField.querySelector("p.error");

const productTitleDescArr = [
  productTitleDescField,
  productTitleDescLabel,
  productTitleDescInput,
];

const productBodyDescField = document.querySelector(".productBodyDescription");
const productBodyDescLabel = productBodyDescField.querySelector("label");
const productBodyDescInput = productBodyDescField.querySelector("textarea");
const productBodyDescErrMsg = productBodyDescField.querySelector("p.error");

const productBodyDescArr = [
  productBodyDescField,
  productBodyDescLabel,
  productBodyDescInput,
];

const productDescImgsField = insertFormModal.querySelector(
  ".productDescImgFile"
);
const productDescImgsLabels = productDescImgsField.querySelectorAll("label");
const productUploadedDescImgsBox = productDescImgsField.querySelector(
  ".form__field__file__images"
);
const productDescImgsInput = productDescImgsField.querySelector("input#file");
const productDescImgsErrMsg = productDescImgsField.querySelector("p.error");

const uploadProductDescImage = (input, uploadedDescImgsBox) => {
  const image = input.files[0];

  const request = serverRequest();

  const formData = new FormData();
  formData.append("productDescImageInfo", image);
  formData.append("productDescImageUpload", true);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      uploadedDescImgsBox.innerHTML = "";

      const uploadedImageContainer = createElement(
        "div",
        "class",
        "form__field__file__images__image"
      );
      appendElement(uploadedImageContainer, uploadedDescImgsBox);

      const imageDeleteBtn = createElement("button", "type", "button");
      imageDeleteBtn.setAttribute("data-purpose", "delete");
      appendElement(imageDeleteBtn, uploadedImageContainer);
      const imageDeleteIcon = createElement("i", "class", "fa fa-trash-o");
      appendElement(imageDeleteIcon, imageDeleteBtn);

      const uploadedImage = createElement(
        "img",
        "src",
        `./assets/imgs/${response.productDescImage}`
      );
      appendElement(uploadedImage, uploadedImageContainer);

      const uploadedimageName = createElement("span", null, null);
      uploadedimageName.innerHTML = `${response.productDescImage}`;
      appendElement(uploadedimageName, uploadedImageContainer);
    }
  };

  request.open("POST", "classes/productDescriptions.class.php");
  request.send(formData);
};

const insertProductDescription = () => {
  const image = productDescImgsInput.files[0];

  const request = serverRequest();

  const formData = new FormData(insertForm);
  formData.append("productDescImageInfo", image);
  formData.append("productId", productId);

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      const response = JSON.parse(request.response);

      if (response.isInserted) {
        showNotification(
          "Descrierea produsului a fost adaugata cu succes!",
          `productDescriptions.php?productID=${productId}`,
          1500,
          null
        );
      }

      if (response.imageDescError != null) {
        productDescImgsLabels.forEach((imgsLabel) => {
          addCssClass(imgsLabel, "error");
        });
        addCssClass(productImgsErrMsg, "active");
        productDescImgsErrMsg.innerHTML = response.imageDescError;
      } else {
        productDescImgsLabels.forEach((imgsLabel) => {
          removeCssClass(imgsLabel, "error");
        });
        removeCssClass(productDescImgsErrMsg, "active");
        productDescImgsErrMsg.innerHTML = "";
      }
    }
  };

  request.open("POST", "./classes/productDescriptions.class.php");
  request.send(formData);
};

const insertProductDescFunctionalities = () => {
  productDescriptionAddBtn.addEventListener("click", () => {
    insertFormModal.style.minHeight = "100%";
    addCssClass(insertFormModal, "active");
  });

  insertFormModalCloseIcon.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");

    productTitleDescInput.value = "";
    productBodyDescInput.value = "";

    productUploadedDescImgsBox.innerHTML = "";
    productDescImgsInput.value = "";
    removeCssClass(productDescImgsErrMsg, "active");
  });

  insertFormCloseBtn.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");

    productTitleDescInput.value = "";
    productBodyDescInput.value = "";

    productUploadedDescImgsBox.innerHTML = "";
    productDescImgsInput.value = "";
    removeCssClass(productDescImgsErrMsg, "active");
  });

  productDescImgsInput.addEventListener("input", () => {
    uploadProductDescImage(productDescImgsInput, productUploadedDescImgsBox);
  });

  productUploadedDescImgsBox.addEventListener("click", (e) => {
    const clickedElement = e.target;

    if (clickedElement.dataset.purpose == "delete") {
      const deleteBtnParent = clickedElement.parentElement;
      productUploadedImgsBox.removeChild(deleteBtnParent);
      productDescImgsInput.value = "";
    } else if (clickedElement.classList.contains("fa-trash-o")) {
      const deleteIconParent = clickedElement.parentElement.parentElement;
      productUploadedDescImgsBox.removeChild(deleteIconParent);
      productDescImgsInput.value = "";
    }
  });

  insertFormSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (isEmpty(productTitleDescInput)) {
      showError(
        productTitleDescArr,
        productTitleDescErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(productTitleDescArr, productTitleDescErrMsg);
    }

    if (isEmpty(productBodyDescInput)) {
      showError(
        productBodyDescArr,
        productBodyDescErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(productBodyDescArr, productBodyDescErrMsg);
    }

    if (isEmpty(productDescImgsInput)) {
      productDescImgsLabels.forEach((imgsLabel) => {
        addCssClass(imgsLabel, "error");
      });
      addCssClass(productDescImgsErrMsg, "active");
      productDescImgsErrMsg.innerHTML = "Campul este obligatoriu!";
    } else {
      productDescImgsLabels.forEach((imgsLabel) => {
        removeCssClass(imgsLabel, "error");
      });
      removeCssClass(productDescImgsErrMsg, "active");
      productDescImgsErrMsg.innerHTML = "";
    }

    if (
      productTitleDescErrMsg.innerHTML == "" &&
      productBodyDescErrMsg.innerHTML == "" &&
      productDescImgsErrMsg.innerHTML == ""
    ) {
      insertProductDescription();
    }
  });
};
insertProductDescFunctionalities();

const updateProductBtns = document.querySelectorAll(
  ".productDescriptionUpdateBtn"
);

let updateFormModals = null;
let updateForms = null;

if (document.querySelectorAll(".updateProductDescription")) {
  updateFormModals = Array.from(document.querySelectorAll(".modal.update"));
  updateForms = Array.from(
    document.querySelectorAll(".updateProductDescription")
  );
}

const updateProductDescFunctionalities = () => {
  updateProductBtns.forEach((updateProductBtn, index) => {
    updateProductBtn.parentElement.addEventListener("click", () => {
      updateFormModals[index].style.minHeight = "100%";
      addCssClass(updateFormModals[index], "active");

      actionDropdowns.forEach((actionDropdown) => {
        removeCssClass(actionDropdown, "active");
      });

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

      const updateProductTitleDescField = updateForms[index].querySelector(
        ".updateProductTitleDescription"
      );
      const updateProductTitleDescLabel =
        updateProductTitleDescField.querySelector("label");
      const updateProductTitleDescInput =
        updateProductTitleDescField.querySelector("textarea");
      const updateProductTitleDescErrMsg =
        updateProductTitleDescField.querySelector("p.error");

      const updateProductTitleDescArr = [
        updateProductTitleDescField,
        updateProductTitleDescLabel,
        updateProductTitleDescInput,
      ];

      const updateProductBodyDescField = updateForms[index].querySelector(
        ".updateProductBodyDescription"
      );
      const updateProductBodyDescLabel =
        updateProductBodyDescField.querySelector("label");
      const updateProductBodyDescInput =
        updateProductBodyDescField.querySelector("textarea");
      const updateProductBodyDescErrMsg =
        updateProductBodyDescField.querySelector("p.error");

      const updateProductBodyDescArr = [
        updateProductBodyDescField,
        updateProductBodyDescLabel,
        updateProductBodyDescInput,
      ];

      const updateProductDescImgsField = updateForms[index].querySelector(
        ".updateProductDescImgFile"
      );
      const updateProductDescImgsLabels =
        updateProductDescImgsField.querySelectorAll("label");
      const updateProductUploadedDescImgsBox =
        updateProductDescImgsField.querySelector(".form__field__file__images");
      const updateProductDescImgsInput =
        updateProductDescImgsField.querySelector("input");
      const updateProductDescImgsErrMsg =
        updateProductDescImgsField.querySelector("p.error");

      updateProductDescImgsInput.addEventListener("input", () => {
        uploadProductDescImage(
          updateProductDescImgsInput,
          updateProductUploadedDescImgsBox
        );
      });

      updateProductUploadedDescImgsBox.addEventListener("click", (e) => {
        const clickedElement = e.target;

        if (clickedElement.dataset.purpose == "delete") {
          const deleteBtnParent = clickedElement.parentElement;
          updateProductUploadedImgsBox.removeChild(deleteBtnParent);
        } else if (clickedElement.classList.contains("fa-trash-o")) {
          const deleteIconParent = clickedElement.parentElement.parentElement;
          updateProductUploadedDescImgsBox.removeChild(deleteIconParent);
        }
      });

      const updateBtn = updateFormModals[index].querySelector(".save");
      const productDescriptionID = updateProductBtn.dataset.productDescId;

      const updateProductDescription = () => {
        const image = updateProductDescImgsInput.files[0] || null;
        let imageDescName = null;

        const request = serverRequest();

        const formData = new FormData(updateForms[index]);
        formData.append("productDescId", productDescriptionID);

        if (image === null) {
          imageDescName = updateForms[index]
            .querySelector(".form__field__file__images__image > span")
            .innerHTML.trim();

          formData.append("updateProductDescImageName", imageDescName);
        } else {
          formData.append("updateProductDescImageInfo", image);
        }

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const response = JSON.parse(request.response);

            if (response.isUpdated) {
              showNotification(
                "Descrierea produsului a fost modificata cu succes!",
                `productDescriptions.php?productID=${productId}`,
                1500,
                null
              );
            }
          }
        };

        request.open("POST", "./classes/productDescriptions.class.php");
        request.send(formData);
      };

      updateBtn.addEventListener("click", (e) => {
        e.preventDefault();

        if (isEmpty(updateProductTitleDescInput)) {
          showError(
            updateProductTitleDescArr,
            updateProductTitleDescErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductTitleDescArr, updateProductTitleDescErrMsg);
        }

        if (isEmpty(updateProductBodyDescInput)) {
          showError(
            updateProductBodyDescArr,
            updateProductBodyDescErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductBodyDescArr, updateProductBodyDescErrMsg);
        }

        if (updateProductUploadedDescImgsBox.children.length === 0) {
          updateProductDescImgsLabels.forEach((imgsLabel) => {
            addCssClass(imgsLabel, "error");
          });
          addCssClass(updateProductDescImgsErrMsg, "active");
          updateProductDescImgsErrMsg.innerHTML = "Campul este obligatoriu!";
        } else {
          updateProductDescImgsLabels.forEach((imgsLabel) => {
            removeCssClass(imgsLabel, "error");
          });
          removeCssClass(updateProductDescImgsErrMsg, "active");
          updateProductDescImgsErrMsg.innerHTML = "";
        }

        if (
          updateProductTitleDescErrMsg.innerHTML == "" &&
          updateProductBodyDescErrMsg.innerHTML == "" &&
          updateProductDescImgsErrMsg.innerHTML == ""
        ) {
          updateProductDescription();
        }
      });
    });
  });
};
updateProductDescFunctionalities();

const deleteProductDescBtns = document.querySelectorAll(
  ".productDescriptionDeleteBtn"
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

const deleteProductDescFunctionalities = () => {
  deleteProductDescBtns.forEach((deleteProductDescBtn) => {
    deleteProductDescBtn.parentElement.addEventListener("click", () => {
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
        const productDescId = deleteProductDescBtn.dataset.productDescId;

        const request = serverRequest();

        const formData = new FormData();
        formData.append("deleteProductDescId", productDescId);

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            if (response.isDeleted) {
              showNotification(
                "Descrierea produsului a fost stearsa cu succes!",
                `productDescriptions.php?productID=${productId}`,
                1500,
                "error"
              );
            }
          }
        };

        request.open("POST", "classes/productDescriptions.class.php");
        request.send(formData);
      });
    });
  });
};
deleteProductDescFunctionalities();
