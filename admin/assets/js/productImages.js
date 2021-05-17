import { isEmpty } from "./validations.js";
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

// Self-Active Current Side Menu Link - Not A Visible Link
(function () {
  visibleOperations();

  opItems.forEach((item) => {
    if (item.classList.contains("pr")) addCssClass(item, "standOut");
  });

  const productImagesContainer = document.querySelector(".productImages");
  delayShowingMainContainer(productImagesContainer);
})();

// PRODUCT IMAGES VIEW
// Image Peek Modal
const tableProductImages = document.querySelectorAll(".image > img");
const peekImageModals = document.querySelectorAll(".modal.peek");
const peekModalCloseIcons = document.querySelectorAll(
  ".modal.peek .modal__close"
);

// Table Data Options
const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const productImageFunctionalities = () => {
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

  // Show Peek Product Image Modal
  tableProductImages.forEach((ProductImage, Index) => {
    ProductImage.addEventListener("click", () => {
      addCssClass(peekImageModals[Index], "active");
    });

    // Hide Peek Product Image Modal
    peekModalCloseIcons[Index].addEventListener("click", () => {
      removeCssClass(peekImageModals[Index], "active");
    });
  });
};
productImageFunctionalities();

// INSERT PRODUCT IMAGES
// Add Image Btn
const productImageAddBtn = document.querySelector(".addBtn");
const productId = productImageAddBtn.dataset.productId;

// Insert Images Form Modal
const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);
const insertFormSaveBtn = insertFormModal.querySelector(".save");
const insertFormCloseBtn = insertFormModal.querySelector(".close");

// Insert Images Field
const productImgsField = insertFormModal.querySelector(".productImgFiles");
const productImgsLabels = productImgsField.querySelectorAll("label");
const productUploadedImgsBox = productImgsField.querySelector(
  ".form__field__file__images"
);
const productImgsInput = productImgsField.querySelector("input#file");
const productImgsErrMsg = productImgsField.querySelector("p.error");

// Upload Product Images Request
const uploadProductImages = () => {
  const images = productImgsInput.files;
  const imageInfos = [];

  for (let i = 0; i < images.length; i++) {
    imageInfos.push(images[i]);
  }

  imageInfos.forEach((imageInfo) => {
    const request = serverRequest();

    const formData = new FormData();
    formData.append("productImageInfo", imageInfo);
    formData.append("productImageUpload", true);

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.response);

        // Create Uploaded Images Container
        const uploadedImageContainer = createElement(
          "div",
          "class",
          "form__field__file__images__image"
        );
        appendElement(uploadedImageContainer, productUploadedImgsBox);

        // Create Delete Btn
        const imageDeleteBtn = createElement("button", "type", "button");
        imageDeleteBtn.setAttribute("data-purpose", "delete");
        appendElement(imageDeleteBtn, uploadedImageContainer);
        const imageDeleteIcon = createElement("i", "class", "fa fa-trash-o");
        appendElement(imageDeleteIcon, imageDeleteBtn);

        // Create The Uploaded Image
        const uploadedImage = createElement(
          "img",
          "src",
          `./assets/imgs/${response.productImage}`
        );
        appendElement(uploadedImage, uploadedImageContainer);

        // Create The Uploaded Image Name
        const uploadedimageName = createElement("span");
        uploadedimageName.innerHTML = `${response.productImage}`;
        appendElement(uploadedimageName, uploadedImageContainer);
      }
    };

    request.open("POST", "classes/productImages.class.php");
    request.send(formData);
  });
};

// Insert Product Images Request
const insertProductImages = () => {
  const images = productImgsInput.files;
  const imageInfos = [];

  for (let i = 0; i < images.length; i++) {
    imageInfos.push(images[i]);
  }

  imageInfos.forEach((imageInfo) => {
    const request = serverRequest();

    const formData = new FormData();
    formData.append("productImageInfo", imageInfo);
    formData.append("productId", productId);

    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const response = JSON.parse(request.response);

        if (response.imageError != null) {
          productImgsLabels.forEach((imgsLabel) => {
            addCssClass(imgsLabel, "error");
          });
          addCssClass(productImgsErrMsg, "active");
          productImgsErrMsg.innerHTML = response.imageError;
        } else {
          productImgsLabels.forEach((imgsLabel) => {
            removeCssClass(imgsLabel, "error");
          });
          removeCssClass(productImgsErrMsg, "active");
          productImgsErrMsg.innerHTML = "";
        }

        if (response.isInserted) {
          showNotification(
            "Imaginile au fost adaugate cu succes!",
            `productImages.php?productID=${productId}`,
            1500,
            null
          );
        }
      }
    };

    request.open("POST", "classes/productImages.class.php");
    request.send(formData);
  });
};

const insertProductImageFunctionalities = () => {
  // Show Add New Product Image Modal
  productImageAddBtn.addEventListener("click", () => {
    addCssClass(insertFormModal, "active");
  });

  // Hide New Product Image Modal
  insertFormModalCloseIcon.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");

    productUploadedImgsBox.innerHTML = "";
    productImgsInput.value = "";
    removeCssClass(productImgsErrMsg, "active");
  });

  insertFormCloseBtn.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");

    productUploadedImgsBox.innerHTML = "";
    productImgsInput.value = "";
    removeCssClass(productImgsErrMsg, "active");
  });

  // Upload Product Image
  productImgsInput.addEventListener("input", uploadProductImages);

  // Delete Uploaded Product Image
  productUploadedImgsBox.addEventListener("click", (e) => {
    const clickedElement = e.target;

    if (clickedElement.dataset.purpose == "delete") {
      const deleteBtnParent = clickedElement.parentElement;
      productUploadedImgsBox.removeChild(deleteBtnParent);
    } else if (clickedElement.classList.contains("fa-trash-o")) {
      const deleteIconParent = clickedElement.parentElement.parentElement;
      productUploadedImgsBox.removeChild(deleteIconParent);
    }
  });

  // Insert Images
  insertFormSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    // Product Images Validation
    if (isEmpty(productImgsInput)) {
      productImgsLabels.forEach((imgsLabel) => {
        addCssClass(imgsLabel, "error");
      });
      addCssClass(productImgsErrMsg, "active");
      productImgsErrMsg.innerHTML = "Campul este obligatoriu!";
    } else {
      productImgsLabels.forEach((imgsLabel) => {
        removeCssClass(imgsLabel, "error");
      });
      removeCssClass(productImgsErrMsg, "active");
      productImgsErrMsg.innerHTML = "";

      insertProductImages();
    }
  });
};
insertProductImageFunctionalities();

// DELETE PRODUCT IMAGES
// Table Delete Btns
const deleteProductImageBtns = document.querySelectorAll(
  ".productImageDeleteBtn"
);

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

const deleteProductImageFunctionalities = () => {
  deleteProductImageBtns.forEach((deleteProductImageBtn) => {
    deleteProductImageBtn.addEventListener("click", () => {
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

      // Product Image Deletion
      confirmBtn.addEventListener("click", () => {
        const productImageId = deleteProductImageBtn.dataset.productImageId;

        const request = serverRequest();

        const formData = new FormData();
        formData.append("deleteProductImageId", productImageId);

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            console.log(productId);

            if (response.isDeleted) {
              showNotification(
                "Imaginea produsului a fost stearsa cu succes!",
                `productImages.php?productID=${productId}`,
                1500,
                null
              );
            }
          }
        };

        request.open("POST", "classes/productImages.class.php");
        request.send(formData);
      });
    });
  });
};
deleteProductImageFunctionalities();
