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

(function () {
  visibleOperations();

  opItems.forEach((item) => {
    if (item.classList.contains("pr")) addCssClass(item, "standOut");
  });

  const productImagesContainer = document.querySelector(".productImages");
  delayShowingMainContainer(productImagesContainer);
})();

const tableProductImages = document.querySelectorAll(".image > img");
const peekImageModals = document.querySelectorAll(".modal.peek");
const peekModalCloseIcons = document.querySelectorAll(
  ".modal.peek .modal__close"
);

const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const productImageFunctionalities = () => {
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
      window.scrollTo({ top: 1, behavior: "smooth" });
      peekImageModals[Index].style.height = "100%";
      addCssClass(peekImageModals[Index], "active");
    });

    peekModalCloseIcons[Index].addEventListener("click", () => {
      document.body.style.overflow = "visible";
      removeCssClass(peekImageModals[Index], "active");
    });
  });
};
productImageFunctionalities();

const productImageAddBtn = document.querySelector(".addBtn");
const productId = productImageAddBtn.dataset.productId;

const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);
const insertFormSaveBtn = insertFormModal.querySelector(".save");
const insertFormCloseBtn = insertFormModal.querySelector(".close");

const productImgsField = insertFormModal.querySelector(".productImgFiles");
const productImgsLabels = productImgsField.querySelectorAll("label");
const productUploadedImgsBox = productImgsField.querySelector(
  ".form__field__file__images"
);
const productImgsInput = productImgsField.querySelector("input#file");
const productImgsErrMsg = productImgsField.querySelector("p.error");

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

        const uploadedImageContainer = createElement(
          "div",
          "class",
          "form__field__file__images__image"
        );
        appendElement(uploadedImageContainer, productUploadedImgsBox);

        const imageDeleteBtn = createElement("button", "type", "button");
        imageDeleteBtn.setAttribute("data-purpose", "delete");
        appendElement(imageDeleteBtn, uploadedImageContainer);
        const imageDeleteIcon = createElement("i", "class", "fa fa-trash-o");
        appendElement(imageDeleteIcon, imageDeleteBtn);

        const uploadedImage = createElement(
          "img",
          "src",
          `./assets/imgs/${response.productImage}`
        );
        appendElement(uploadedImage, uploadedImageContainer);

        const uploadedimageName = createElement("span");
        uploadedimageName.innerHTML = `${response.productImage}`;
        appendElement(uploadedimageName, uploadedImageContainer);
      }
    };

    request.open("POST", "classes/productImages.class.php");
    request.send(formData);
  });
};

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
  productImageAddBtn.addEventListener("click", () => {
    window.scrollTo({ top: 1, behavior: "smooth" });
    addCssClass(insertFormModal, "active");
  });

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

  productImgsInput.addEventListener("input", uploadProductImages);

  productUploadedImgsBox.addEventListener("click", (e) => {
    const clickedElement = e.target;

    if (clickedElement.dataset.purpose == "delete") {
      const deleteBtnParent = clickedElement.parentElement;
      productUploadedImgsBox.removeChild(deleteBtnParent);
      productImgsInput.value = "";
    } else if (clickedElement.classList.contains("fa-trash-o")) {
      const deleteIconParent = clickedElement.parentElement.parentElement;
      productUploadedImgsBox.removeChild(deleteIconParent);
      productImgsInput.value = "";
    }
  });

  insertFormSaveBtn.addEventListener("click", (e) => {
    e.preventDefault();

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

const deleteProductImageBtns = document.querySelectorAll(
  ".productImageDeleteBtn"
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

const deleteProductImageFunctionalities = () => {
  deleteProductImageBtns.forEach((deleteProductImageBtn) => {
    deleteProductImageBtn.parentElement.addEventListener("click", () => {
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

            if (response.isDeleted) {
              showNotification(
                "Imaginea produsului a fost stearsa cu succes!",
                `productImages.php?productID=${productId}`,
                1500,
                "error"
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
