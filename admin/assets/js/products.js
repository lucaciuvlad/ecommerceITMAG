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

(function () {
  visibleOperations();

  opItems.forEach((item) => {
    if (item.classList.contains("pr")) addCssClass(item, "standOut");
  });

  const productsContainer = document.querySelector(".products");
  delayShowingMainContainer(productsContainer);
})();

const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const productFunctionalities = () => {
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
productFunctionalities();

const addProductBtn = document.querySelector(".addBtn");

const insertFormModal = document.querySelector(".modal.insert");
const insertFormModalCloseIcon = insertFormModal.querySelector(
  ".modal__close .fa-times"
);

const insertForm = document.querySelector(".productInsert");
const insertBtn = insertFormModal.querySelector(".save");
const cancelInsertBtn = insertFormModal.querySelector(".close");

const productNameField = document.querySelector(".productName");
const productNameLabel = productNameField.querySelector("label");
const productNameInput = productNameField.querySelector("input");
const productNameErrMsg = productNameField.querySelector("p.error");

const productNameArr = [productNameField, productNameLabel, productNameInput];

const productPriceTaxField = document.querySelector(".productPriceTax");
const productPriceTaxLabel = productPriceTaxField.querySelector("label");
const productPriceTaxTab = productPriceTaxField.querySelector(
  ".form__field__dropdown__tab"
);
const productPriceTaxSpan = productPriceTaxTab.querySelector("span");
const productPriceTaxOptionsBox = productPriceTaxField.querySelector(
  ".form__field__dropdown__options"
);
const productPriceTaxOptions = Array.from(productPriceTaxOptionsBox.children);

const productFullPriceField = document.querySelector(".fullPrice");
const productFullPriceLabel = productFullPriceField.querySelector("label");
const productFullPriceTool = productFullPriceField.querySelector(".tool");
const productFullPriceMinus = productFullPriceField.querySelector("i.fa-minus");
const productFullPriceInput = productFullPriceField.querySelector("input");
const productFullPricePlus = productFullPriceField.querySelector("i.fa-plus");
const productFullPriceErrMsg = productFullPriceField.querySelector("p.error");

const productFullPriceArr = [
  productFullPriceLabel,
  productFullPriceTool,
  productFullPriceMinus,
  productFullPricePlus,
];

const productNetPriceField = document.querySelector(".netPrice");
const productNetPriceValue = productNetPriceField.querySelector("p");

const productOldPriceField = document.querySelector(".productOldPrice");
const productOldPriceLabel = productOldPriceField.querySelector("label");
const productOldPriceErrMsg = productOldPriceField.querySelector("p.error");
const productOldPriceWrapper =
  productOldPriceField.querySelector(".oldPrice__wrapper");
const productOldPriceSpan = productOldPriceWrapper.querySelector("span");

const productOldPriceArr = [
  productOldPriceLabel,
  productOldPriceWrapper,
  productOldPriceSpan,
];

const productOldPriceSwitch =
  productOldPriceField.querySelector(".form__switch");
const productOldPriceSwitchBtn = productOldPriceSwitch.children[0];

const productOldPrice = productOldPriceField.querySelector(".oldPrice");
const productOldPriceInput = productOldPrice.querySelector(
  ".oldPrice__wrapper input"
);

const productCategoryField = document.querySelector(".productCategory");
const productCategoryLabel = productCategoryField.querySelector("label");
const productCategoryTab = productCategoryField.querySelector(
  ".form__field__dropdown__tab"
);
const productCategorySpan = productCategoryTab.querySelector("span");
const productCategoryOptionsBox = productCategoryField.querySelector(
  ".form__field__dropdown__options"
);
const productCategoryOptions = Array.from(productCategoryOptionsBox.children);
const productCategoryErrMsg = productCategoryField.querySelector("p.error");

const productCategoryArr = [
  productCategoryLabel,
  productCategoryTab,
  productCategoryOptionsBox,
];

const productBrandField = document.querySelector(".productBrand");
const productBrandLabel = productBrandField.querySelector("label");
const productBrandTab = productBrandField.querySelector(
  ".form__field__dropdown__tab"
);
const productBrandSpan = productBrandTab.querySelector("span");
const productBrandOptionsBox = productBrandField.querySelector(
  ".form__field__dropdown__options"
);
const productBrandOptions = Array.from(productBrandOptionsBox.children);
const productBrandErrMsg = productBrandField.querySelector("p.error");

const productBrandArr = [
  productBrandLabel,
  productBrandTab,
  productBrandOptionsBox,
];

const productStockField = document.querySelector(".productStock");
const productStockLabel = productStockField.querySelector("label");
const productStockTool = productStockField.querySelector(".tool");
const productStockMinus = productStockField.querySelector("i.fa-minus");
const productStockInput = productStockField.querySelector("input");
const productStockPlus = productStockField.querySelector("i.fa-plus");
const productStockErrMsg = productStockField.querySelector("p.error");

const productStockArr = [
  productStockLabel,
  productStockTool,
  productStockMinus,
  productStockPlus,
];

const toggleTabOptions = (optionsBox, optionsTab) => {
  toggleCssClass(optionsBox, "active");
  toggleCssClass(optionsTab, "active");
};

const hideTabOptions = (optionsBox, optionsTab) => {
  removeCssClass(optionsBox, "active");
  removeCssClass(optionsTab, "active");
};

const chooseDropdownOption = (
  option,
  optionsList,
  optionsTab,
  tabSpan,
  optionsBox
) => {
  option.addEventListener("click", (e) => {
    const optionTarget = e.target;

    for (let i = 0; i <= optionsList.length - 1; i++) {
      removeCssClass(optionsList[i], "active");

      if (optionsList[i] == optionTarget) {
        tabSpan.innerHTML = optionsList[i].innerHTML;
        tabSpan.setAttribute("data-id", optionsList[i].dataset.id);

        addCssClass(optionsList[i], "active");
        hideTabOptions(optionsBox, optionsTab);
      }
    }

    const dropdownField = optionTarget.parentElement.parentElement;

    if (dropdownField.classList.contains("productPrice")) {
      productPriceInput.value = "0.00";
      productNetPrice.innerHTML = "0";
    }

    if (
      dropdownField.classList.contains("productCategory") ||
      dropdownField.classList.contains("productBrand")
    ) {
      tabSpan.setAttribute("data-id", optionTarget.dataset.id);
    }
  });
};

const addActiveToolInput = (toolBox, minus, plus) => {
  addCssClass(toolBox, "active");
  addCssClass(minus, "active");
  addCssClass(plus, "active");
};

const removeActiveToolInput = (toolBox, minus, plus) => {
  removeCssClass(toolBox, "active");
  removeCssClass(minus, "active");
  removeCssClass(plus, "active");
};

const addOneUnit = (input) => {
  let actualValue = parseInt(input.value);
  actualValue++;

  input.value = actualValue;
};

const substractOneUnit = (input) => {
  let actualValue = parseInt(input.value);
  actualValue--;

  input.value = actualValue;

  if (actualValue < 0) {
    input.value = 0;
    return;
  }
};

const updateNetPrice = (input, taxSpan, netPriceValue) => {
  if (input.value.length != 0) {
    const tva = 0.19;
    const fullPrice = input.value;
    const netPrice = input.value - input.value * tva;

    if (taxSpan.innerHTML.trim() == "TVA - 19%") {
      netPriceValue.innerHTML = `${Number(netPrice).toFixed(2)} RON`;
    } else {
      netPriceValue.innerHTML = `${Number(fullPrice).toFixed(2)} RON`;
    }
  } else {
    netPriceValue.innerHTML = "0 RON";
  }
};

const insertProduct = () => {
  const request = serverRequest();

  const formData = new FormData(insertForm);
  formData.append("productCategoryId", productCategorySpan.dataset.id);
  formData.append("productBrandId", productBrandSpan.dataset.id);

  if (productOldPriceSwitchBtn.classList.contains("active")) {
    formData.append("productOldPrice", productOldPriceInput.value);
  }

  const loader = document.querySelector(".loader");
  addCssClass(loader, "active");

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      removeCssClass(loader, "active");

      const response = JSON.parse(request.response);

      if (response.isInserted) {
        showNotification(
          "Produsul a fost adaugat cu succes!",
          "products.php",
          1500,
          null
        );
      }

      if (response.productName != undefined) {
        showError(productNameArr, productNameErrMsg, response.productName);
      } else {
        hideError(productNameArr, productNameErrMsg);
      }

      if (response.productPrice != undefined) {
        showError(
          productFullPriceArr,
          productFullPriceErrMsg,
          response.productPrice
        );
      } else {
        hideError(productFullPriceArr, productFullPriceErrMsg);
      }

      if (response.productOldPrice != undefined) {
        showError(
          productOldPriceArr,
          productOldPriceErrMsg,
          response.productOldPrice
        );
      } else {
        hideError(productOldPriceArr, productOldPriceErrMsg);
      }

      if (response.productCategory != undefined) {
        showError(
          productCategoryArr,
          productCategoryErrMsg,
          response.productCategory
        );
      } else {
        hideError(productCategoryArr, productCategoryErrMsg);
      }

      if (response.productBrand != undefined) {
        showError(productBrandArr, productBrandErrMsg, response.productBrand);
      } else {
        hideError(productBrandArr, productBrandErrMsg);
      }

      if (response.productStock != undefined) {
        showError(productStockArr, productStockErrMsg, response.productStock);
      } else {
        hideError(productStockArr, productStockErrMsg);
      }
    }
  };

  request.open("POST", "classes/products.class.php");
  request.send(formData);
};

const insertProductFunctionalities = () => {
  addProductBtn.addEventListener("click", () => {
    insertFormModal.style.minHeight = "100%";
    addCssClass(insertFormModal, "active");

    actionDropdowns.forEach((actionDropdown) => {
      removeCssClass(actionDropdown, "active");
    });
  });

  insertFormModalCloseIcon.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");
  });

  cancelInsertBtn.addEventListener("click", () => {
    removeCssClass(insertFormModal, "active");
  });

  productPriceTaxLabel.addEventListener("click", () => {
    toggleTabOptions(productPriceTaxOptionsBox, productPriceTaxTab);
  });

  productPriceTaxTab.addEventListener("click", () => {
    toggleTabOptions(productPriceTaxOptionsBox, productPriceTaxTab);
  });

  productPriceTaxOptions.forEach((option) => {
    chooseDropdownOption(
      option,
      productPriceTaxOptions,
      productPriceTaxTab,
      productPriceTaxSpan,
      productPriceTaxOptionsBox
    );
  });

  productFullPriceLabel.addEventListener("click", () => {
    if (!productFullPriceTool.classList.contains("active")) {
      addActiveToolInput(
        productFullPriceTool,
        productFullPriceMinus,
        productFullPricePlus
      );
    } else {
      removeActiveToolInput(
        productFullPriceTool,
        productFullPriceMinus,
        productFullPricePlus
      );
    }
  });

  productFullPriceInput.addEventListener("focus", () => {
    addActiveToolInput(
      productFullPriceTool,
      productFullPriceMinus,
      productFullPricePlus
    );
  });

  productFullPriceInput.addEventListener("blur", () => {
    removeActiveToolInput(
      productFullPriceTool,
      productFullPriceMinus,
      productFullPricePlus
    );
  });

  productFullPriceInput.addEventListener("keyup", () => {
    if (!productFullPriceInput.value.match(/\d+/g)) {
      productFullPriceInput.value = "";
      showError(
        productFullPriceArr,
        productFullPriceErrMsg,
        "Campul trebuie exprimat prin cifre!"
      );
    } else {
      hideError(productFullPriceArr, productFullPriceErrMsg);
    }

    updateNetPrice(
      productFullPriceInput,
      productPriceTaxSpan,
      productNetPriceValue
    );
  });

  productFullPriceMinus.addEventListener("click", () => {
    substractOneUnit(productFullPriceInput);
    updateNetPrice(
      productFullPriceInput,
      productPriceTaxSpan,
      productNetPriceValue
    );
  });

  productFullPricePlus.addEventListener("click", () => {
    addOneUnit(productFullPriceInput);
    updateNetPrice(
      productFullPriceInput,
      productPriceTaxSpan,
      productNetPriceValue
    );
  });

  productOldPriceLabel.addEventListener("click", () => {
    toggleCssClass(productOldPriceSwitchBtn, "active");
    toggleCssClass(productOldPrice, "active");
  });

  productOldPriceSwitch.addEventListener("click", () => {
    toggleCssClass(productOldPriceSwitchBtn, "active");
    toggleCssClass(productOldPrice, "active");
  });

  productOldPriceInput.addEventListener("keyup", () => {
    if (!productOldPriceInput.value.match(/\d+/g)) {
      productOldPriceInput.value = "";
      showError(
        productOldPriceArr,
        productOldPriceErrMsg,
        "Campul trebuie exprimat prin cifre!"
      );
    } else {
      hideError(productOldPriceArr, productOldPriceErrMsg);
    }
  });

  productCategoryLabel.addEventListener("click", () => {
    toggleTabOptions(productCategoryOptionsBox, productCategoryTab);
  });

  productCategoryTab.addEventListener("click", () => {
    toggleTabOptions(productCategoryOptionsBox, productCategoryTab);
  });

  productCategoryOptions.forEach((option) => {
    chooseDropdownOption(
      option,
      productCategoryOptions,
      productCategoryTab,
      productCategorySpan,
      productCategoryOptionsBox
    );
  });

  productBrandLabel.addEventListener("click", () => {
    toggleTabOptions(productBrandOptionsBox, productBrandTab);
  });

  productBrandTab.addEventListener("click", () => {
    toggleTabOptions(productBrandOptionsBox, productBrandTab);
  });

  productBrandOptions.forEach((option) => {
    chooseDropdownOption(
      option,
      productBrandOptions,
      productBrandTab,
      productBrandSpan,
      productBrandOptionsBox
    );
  });

  productStockLabel.addEventListener("click", () => {
    if (!productStockTool.classList.contains("active")) {
      addActiveToolInput(productStockTool, productStockMinus, productStockPlus);
    } else {
      removeActiveToolInput(
        productStockTool,
        productStockMinus,
        productStockPlus
      );
    }
  });

  productStockInput.addEventListener("focus", () => {
    addActiveToolInput(productStockTool, productStockMinus, productStockPlus);
  });

  productStockInput.addEventListener("blur", () => {
    removeActiveToolInput(
      productStockTool,
      productStockMinus,
      productStockPlus
    );
  });

  productStockInput.addEventListener("keyup", () => {
    if (!productStockInput.value.match(/\d+/g)) {
      productStockInput.value == "";
      showError(
        productStockArr,
        productStockErrMsg,
        "Campul trebuie exprimat prin cifre!"
      );
    } else {
      hideError(productStockArr, productStockErrMsg);
    }
  });

  productStockMinus.addEventListener("click", () => {
    substractOneUnit(productStockInput);
  });

  productStockPlus.addEventListener("click", () => {
    addOneUnit(productStockInput);
  });

  insertBtn.addEventListener("click", () => {
    if (isEmpty(productNameInput)) {
      showError(productNameArr, productNameErrMsg, "Campul este obligatoriu!");
    } else {
      hideError(productNameArr, productNameErrMsg);
    }

    if (isEmpty(productFullPriceInput)) {
      showError(
        productFullPriceArr,
        productFullPriceErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(productFullPriceArr, productFullPriceErrMsg);
    }

    if (productOldPriceSwitchBtn.classList.contains("active")) {
      if (isEmpty(productOldPriceInput)) {
        showError(
          productOldPriceArr,
          productOldPriceErrMsg,
          "Campul este obligatoriu!"
        );
      } else if (
        parseFloat(productOldPriceInput.value) <=
        parseFloat(productFullPriceInput.value)
      ) {
        showError(
          productOldPriceArr,
          productOldPriceErrMsg,
          "Pretul redus nu poate fi <= cu pretul de baza!"
        );
      } else {
        hideError(productOldPriceArr, productOldPriceErrMsg);
      }
    }

    if (productCategorySpan.innerHTML.trim() === "Selecteaza categoria") {
      showError(
        productCategoryArr,
        productCategoryErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(productCategoryArr, productCategoryErrMsg);
    }

    if (productBrandSpan.innerHTML.trim() === "Selecteaza producatorul") {
      showError(
        productBrandArr,
        productBrandErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(productBrandArr, productBrandErrMsg);
    }

    if (isEmpty(productStockInput)) {
      showError(
        productStockArr,
        productStockErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(
        productStockArr,
        productStockErrMsg,
        "Campul este obligatoriu!"
      );
    }

    if (
      productNameErrMsg.innerHTML == "" &&
      productFullPriceErrMsg.innerHTML == "" &&
      productOldPriceErrMsg.innerHTML == "" &&
      productCategoryErrMsg.innerHTML == "" &&
      productBrandErrMsg.innerHTML == "" &&
      productStockErrMsg.innerHTML == ""
    ) {
      insertProduct();
    }
  });
};
insertProductFunctionalities();

const updateProductBtns = document.querySelectorAll(".productUpdateBtn");

let updateFormModals = null;
let updateForms = null;

if (document.querySelectorAll(".productUpdate")) {
  updateFormModals = Array.from(document.querySelectorAll(".modal.update"));
  updateForms = Array.from(document.querySelectorAll(".productUpdate"));
}

const updateProductFunctionalities = () => {
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

      const updateProductNameField =
        updateFormModals[index].querySelector(".updateProductName");
      const updateProductNameLabel =
        updateProductNameField.querySelector("label");
      const updateProductNameInput =
        updateProductNameField.querySelector("input");
      const updateProductNameErrMsg =
        updateProductNameField.querySelector("p.error");

      const updateProductNameArr = [
        updateProductNameField,
        updateProductNameLabel,
        updateProductNameInput,
      ];

      const updateProductPriceTaxField = updateFormModals[index].querySelector(
        ".updateProductPriceTax"
      );
      const updateProductPriceTaxLabel =
        updateProductPriceTaxField.querySelector("label");
      const updateProductPriceTaxTab = updateProductPriceTaxField.querySelector(
        ".form__field__dropdown__tab"
      );
      const updateProductPriceTaxSpan =
        updateProductPriceTaxField.querySelector("span");
      const updateProductPriceTaxOptionsBox =
        updateProductPriceTaxField.querySelector(
          ".form__field__dropdown__options"
        );
      const updateProductPriceTaxOptions = Array.from(
        updateProductPriceTaxOptionsBox.children
      );

      const updateProductFullPriceField =
        updateFormModals[index].querySelector(".updateFullPrice");
      const updateProductFullPriceLabel =
        updateProductFullPriceField.querySelector("label");
      const updateProductFullPriceTool =
        updateProductFullPriceField.querySelector(".tool");
      const updateProductFullPriceMinus =
        updateProductFullPriceField.querySelector("i.fa-minus");
      const updateProductFullPriceInput =
        updateProductFullPriceField.querySelector("input");
      const updateProductFullPricePlus =
        updateProductFullPriceField.querySelector("i.fa-plus");
      const updateProductFullPriceErrMsg =
        updateProductFullPriceField.querySelector("p.error");

      const updateProductFullPriceArr = [
        updateProductFullPriceLabel,
        updateProductFullPriceTool,
        updateProductFullPriceMinus,
        updateProductFullPricePlus,
      ];

      const updateProductNetPriceField =
        updateFormModals[index].querySelector(".updateNetPrice");
      const updateProductNetPriceValue =
        updateProductNetPriceField.querySelector("p");

      const updateProductOldPriceField = updateFormModals[index].querySelector(
        ".updateProductOldPrice"
      );
      const updateProductOldPriceLabel =
        updateProductOldPriceField.querySelector("label");
      const updateProductOldPriceErrMsg =
        updateProductOldPriceField.querySelector("p.error");
      const updateProductOldPriceWrapper =
        updateProductOldPriceField.querySelector(".oldPrice__wrapper");
      const updateProductOldPriceSpan =
        updateProductOldPriceWrapper.querySelector("span");

      const updateProductOldPriceArr = [
        updateProductOldPriceLabel,
        updateProductOldPriceWrapper,
        updateProductOldPriceSpan,
      ];

      const updateProductOldPriceSwitch =
        updateProductOldPriceField.querySelector(".form__switch");
      const updateProductOldPriceSwitchBtn =
        updateProductOldPriceSwitch.children[0];

      const updateProductOldPrice =
        updateProductOldPriceField.querySelector(".oldPrice");
      const updateProductOldPriceInput = updateProductOldPrice.querySelector(
        ".oldPrice__wrapper input"
      );

      const updateProductCategoryField = updateFormModals[index].querySelector(
        ".updateProductCategory"
      );
      const updateProductCategoryLabel =
        updateProductCategoryField.querySelector("label");
      const updateProductCategoryTab = updateProductCategoryField.querySelector(
        ".form__field__dropdown__tab"
      );
      const updateProductCategorySpan =
        updateProductCategoryTab.querySelector("span");
      const updateProductCategoryOptionsBox =
        updateProductCategoryField.querySelector(
          ".form__field__dropdown__options"
        );
      const updateProductCategoryOptions = Array.from(
        updateProductCategoryOptionsBox.children
      );
      const updateProductCategoryErrMsg =
        updateProductCategoryField.querySelector("p.error");

      const updateProductCategoryArr = [
        updateProductCategoryLabel,
        updateProductCategoryTab,
        updateProductCategoryOptionsBox,
      ];

      const updateProductBrandField = updateFormModals[index].querySelector(
        ".updateProductBrand"
      );
      const updateProductBrandLabel =
        updateProductBrandField.querySelector("label");
      const updateProductBrandTab = updateProductBrandField.querySelector(
        ".form__field__dropdown__tab"
      );
      const updateProductBrandSpan =
        updateProductBrandTab.querySelector("span");
      const updateProductBrandOptionsBox =
        updateProductBrandField.querySelector(
          ".form__field__dropdown__options"
        );
      const updateProductBrandOptions = Array.from(
        updateProductBrandOptionsBox.children
      );
      const updateProductBrandErrMsg =
        updateProductBrandField.querySelector("p.error");

      const updateProductBrandArr = [
        updateProductBrandLabel,
        updateProductBrandTab,
        updateProductBrandOptionsBox,
      ];

      const updateProductStockField = updateFormModals[index].querySelector(
        ".updateProductStock"
      );
      const updateProductStockLabel =
        updateProductStockField.querySelector("label");
      const updateProductStockTool =
        updateProductStockField.querySelector(".tool");
      const updateProductStockMinus =
        updateProductStockField.querySelector("i.fa-minus");
      const updateProductStockInput =
        updateProductStockField.querySelector("input");
      const updateProductStockPlus =
        updateProductStockField.querySelector("i.fa-plus");
      const updateProductStockErrMsg =
        updateProductStockField.querySelector("p.error");

      const updateProductStockArr = [
        updateProductStockLabel,
        updateProductStockTool,
        updateProductStockMinus,
        updateProductStockPlus,
      ];

      const updateProduct = () => {
        const request = serverRequest();

        const formData = new FormData(updateForms[index]);
        formData.append("updateProductId", updateProductBtn.dataset.productId);
        formData.append(
          "updateProductCategoryId",
          updateProductCategorySpan.dataset.id
        );
        formData.append(
          "updateProductBrandId",
          updateProductBrandSpan.dataset.id
        );

        if (updateProductOldPriceSwitchBtn.classList.contains("active")) {
          formData.append(
            "updateProductOldPrice",
            updateProductOldPriceInput.value
          );
        }

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            if (response.isUpdated) {
              showNotification(
                "Produsul a fost modificat cu succes!",
                "products.php",
                1500,
                null
              );
            }

            if (response.updateProductName != undefined) {
              showError(
                updateProductNameArr,
                updateProductNameErrMsg,
                response.updateProductName
              );
            } else {
              hideError(updateProductNameArr, updateProductNameErrMsg);
            }

            if (response.updateProductPrice != undefined) {
              showError(
                updateProductFullPriceArr,
                updateProductFullPriceErrMsg,
                response.updateProductPrice
              );
            } else {
              hideError(
                updateProductFullPriceArr,
                updateProductFullPriceErrMsg
              );
            }

            if (response.updateProductOldPrice != undefined) {
              showError(
                updateProductOldPriceArr,
                updateProductOldPriceErrMsg,
                response.updateProductOldPrice
              );
            } else {
              hideError(updateProductOldPriceArr, updateProductOldPriceErrMsg);
            }

            if (response.updateProductCategory != undefined) {
              showError(
                updateProductCategoryArr,
                updateProductCategoryErrMsg,
                response.updateProductCategory
              );
            } else {
              hideError(updateProductCategoryArr, updateProductCategoryErrMsg);
            }

            if (response.updateProductBrand != undefined) {
              showError(
                updateProductBrandArr,
                updateProductBrandErrMsg,
                response.updateProductBrand
              );
            } else {
              hideError(updateProductBrandArr, updateProductBrandErrMsg);
            }

            if (response.updateProductStock != undefined) {
              showError(
                updateProductStockArr,
                updateProductStockErrMsg,
                response.updateProductStock
              );
            } else {
              hideError(updateProductStockArr, updateProductStockErrMsg);
            }
          }
        };

        request.open("POST", "classes/products.class.php");
        request.send(formData);
      };

      const getVisibleDropdownOption = (options, span) => {
        options.forEach((option) => {
          if (span.innerHTML.trim() === option.innerHTML.trim()) {
            addCssClass(option, "active");
            span.setAttribute("data-id", `${option.dataset.id}`);
          }
        });
      };
      getVisibleDropdownOption(
        updateProductCategoryOptions,
        updateProductCategorySpan
      );
      getVisibleDropdownOption(
        updateProductBrandOptions,
        updateProductBrandSpan
      );

      updateProductPriceTaxLabel.addEventListener("click", () => {
        toggleTabOptions(
          updateProductPriceTaxOptionsBox,
          updateProductPriceTaxTab
        );
      });

      updateProductPriceTaxTab.addEventListener("click", () => {
        toggleTabOptions(
          updateProductPriceTaxOptionsBox,
          updateProductPriceTaxTab
        );
      });

      updateProductPriceTaxOptions.forEach((option) => {
        chooseDropdownOption(
          option,
          updateProductPriceTaxOptions,
          updateProductPriceTaxTab,
          updateProductPriceTaxSpan,
          updateProductPriceTaxOptionsBox
        );
      });

      updateProductFullPriceLabel.addEventListener("click", () => {
        if (!updateProductFullPriceTool.classList.contains("active")) {
          addActiveToolInput(
            updateProductFullPriceTool,
            updateProductFullPriceMinus,
            updateProductFullPricePlus
          );
        } else {
          removeActiveToolInput(
            updateProductFullPriceTool,
            updateProductFullPriceMinus,
            updateProductFullPricePlus
          );
        }
      });

      updateProductFullPriceInput.addEventListener("focus", () => {
        addActiveToolInput(
          updateProductFullPriceTool,
          updateProductFullPriceMinus,
          updateProductFullPricePlus
        );
      });

      updateProductFullPriceInput.addEventListener("blur", () => {
        removeActiveToolInput(
          updateProductFullPriceTool,
          updateProductFullPriceMinus,
          updateProductFullPricePlus
        );
      });

      updateProductFullPriceInput.addEventListener("keyup", () => {
        if (!updateProductFullPriceInput.value.match(/\d+/g)) {
          updateProductFullPriceInput.value = "";
          showError(
            updateProductFullPriceArr,
            updateProductFullPriceErrMsg,
            "Campul trebuie exprimat prin cifre!"
          );
        } else {
          hideError(updateProductFullPriceArr, updateProductFullPriceErrMsg);
        }

        updateNetPrice(
          updateProductFullPriceInput,
          updateProductPriceTaxSpan,
          updateProductNetPriceValue
        );
      });

      updateProductFullPriceMinus.addEventListener("click", () => {
        substractOneUnit(updateProductFullPriceInput);
        updateNetPrice(
          updateProductFullPriceInput,
          updateProductPriceTaxSpan,
          updateProductNetPriceValue
        );
      });

      updateProductFullPricePlus.addEventListener("click", () => {
        addOneUnit(updateProductFullPriceInput);
        updateNetPrice(
          updateProductFullPriceInput,
          updateProductPriceTaxSpan,
          updateProductNetPriceValue
        );
      });

      updateProductOldPriceLabel.addEventListener("click", () => {
        toggleCssClass(updateProductOldPriceSwitchBtn, "active");
        toggleCssClass(updateProductOldPrice, "active");
      });

      updateProductOldPriceSwitch.addEventListener("click", () => {
        toggleCssClass(updateProductOldPriceSwitchBtn, "active");
        toggleCssClass(updateProductOldPrice, "active");
      });

      updateProductOldPriceInput.addEventListener("keyup", () => {
        if (!updateProductOldPriceInput.value.match(/\d+/g)) {
          updateProductOldPriceInput.value = "";
          showError(
            updateProductOldPriceArr,
            updateProductOldPriceErrMsg,
            "Campul trebuie exprimat prin cifre!"
          );
        } else {
          hideError(updateProductOldPriceArr, updateProductOldPriceErrMsg);
        }
      });

      updateProductCategoryLabel.addEventListener("click", () => {
        toggleTabOptions(
          updateProductCategoryOptionsBox,
          updateProductCategoryTab
        );
      });

      updateProductCategoryTab.addEventListener("click", () => {
        toggleTabOptions(
          updateProductCategoryOptionsBox,
          updateProductCategoryTab
        );
      });

      updateProductCategoryOptions.forEach((option) => {
        chooseDropdownOption(
          option,
          updateProductCategoryOptions,
          updateProductCategoryTab,
          updateProductCategorySpan,
          updateProductCategoryOptionsBox
        );
      });

      updateProductBrandLabel.addEventListener("click", () => {
        toggleTabOptions(updateProductBrandOptionsBox, updateProductBrandTab);
      });

      updateProductBrandTab.addEventListener("click", () => {
        toggleTabOptions(updateProductBrandOptionsBox, updateProductBrandTab);
      });

      updateProductBrandOptions.forEach((option) => {
        chooseDropdownOption(
          option,
          updateProductBrandOptions,
          updateProductBrandTab,
          updateProductBrandSpan,
          updateProductBrandOptionsBox
        );
      });

      updateProductStockLabel.addEventListener("click", () => {
        if (!updateProductStockTool.classList.contains("active")) {
          addActiveToolInput(
            updateProductStockTool,
            updateProductStockMinus,
            updateProductStockPlus
          );
        } else {
          removeActiveToolInput(
            updateProductStockTool,
            updateProductStockMinus,
            updateProductStockPlus
          );
        }
      });

      updateProductStockInput.addEventListener("focus", () => {
        addActiveToolInput(
          updateProductStockTool,
          updateProductStockMinus,
          updateProductStockPlus
        );
      });

      updateProductStockInput.addEventListener("blur", () => {
        removeActiveToolInput(
          updateProductStockTool,
          updateProductStockMinus,
          updateProductStockPlus
        );
      });

      updateProductStockInput.addEventListener("keyup", () => {
        if (!updateProductStockInput.value.match(/\d+/g)) {
          updateProductStockInput.value == "";
          showError(
            updateProductStockArr,
            updateProductStockErrMsg,
            "Campul trebuie exprimat prin cifre!"
          );
        } else {
          hideError(updateProductStockArr, updateProductStockErrMsg);
        }
      });

      updateProductStockMinus.addEventListener("click", () => {
        substractOneUnit(updateProductStockInput);
      });

      updateProductStockPlus.addEventListener("click", () => {
        addOneUnit(updateProductStockInput);
      });

      const updateBtn = updateFormModals[index].querySelector(".save");

      updateBtn.addEventListener("click", () => {
        if (isEmpty(updateProductNameInput)) {
          showError(
            updateProductNameArr,
            updateProductNameErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductNameArr, updateProductNameErrMsg);
        }

        if (isEmpty(updateProductFullPriceInput)) {
          showError(
            updateProductFullPriceArr,
            updateProductFullPriceErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductFullPriceArr, updateProductFullPriceErrMsg);
        }

        if (updateProductOldPriceSwitchBtn.classList.contains("active")) {
          if (isEmpty(updateProductOldPriceInput)) {
            showError(
              updateProductOldPriceArr,
              updateProductOldPriceErrMsg,
              "Campul este obligatoriu!"
            );
          } else if (
            parseFloat(updateProductOldPriceInput.value) <=
            parseFloat(updateProductFullPriceInput.value)
          ) {
            showError(
              updateProductOldPriceArr,
              updateProductOldPriceErrMsg,
              "Pretul redus nu poate fi <= cu pretul de baza!"
            );
          } else {
            hideError(updateProductOldPriceArr, updateProductOldPriceErrMsg);
          }
        }

        if (
          updateProductCategorySpan.innerHTML.trim() === "Selecteaza categoria"
        ) {
          showError(
            updateProductCategoryArr,
            updateProductCategoryErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductCategoryArr, updateProductCategoryErrMsg);
        }

        if (
          updateProductBrandSpan.innerHTML.trim() === "Selecteaza producatorul"
        ) {
          showError(
            updateProductBrandArr,
            updateProductBrandErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductBrandArr, updateProductBrandErrMsg);
        }

        if (isEmpty(updateProductStockInput)) {
          showError(
            updateProductStockArr,
            updateProductStockErrMsg,
            "Campul este obligatoriu!"
          );
        } else {
          hideError(updateProductStockArr, updateProductStockErrMsg);
        }

        if (
          updateProductNameErrMsg.innerHTML == "" &&
          updateProductFullPriceErrMsg.innerHTML == "" &&
          updateProductOldPriceErrMsg.innerHTML == "" &&
          updateProductCategoryErrMsg.innerHTML == "" &&
          updateProductBrandErrMsg.innerHTML == "" &&
          updateProductStockErrMsg.innerHTML == ""
        ) {
          updateProduct();
        }
      });
    });
  });
};
updateProductFunctionalities();

const deleteProductBtns = document.querySelectorAll(".productDeleteBtn");

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

const deleteProductFunctionalities = () => {
  deleteProductBtns.forEach((deleteProductBtn) => {
    deleteProductBtn.parentElement.addEventListener("click", () => {
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
        const productId = deleteProductBtn.dataset.productId;

        const request = serverRequest();

        const formData = new FormData();
        formData.append("deleteProductId", productId);

        const loader = document.querySelector(".loader");
        addCssClass(loader, "active");

        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            removeCssClass(loader, "active");

            const response = JSON.parse(request.response);

            if (response.isDeleted) {
              showNotification(
                "Produsul a fost sters cu succes!",
                "products.php",
                1500,
                "error"
              );
            }
          }
        };

        request.open("POST", "classes/products.class.php");
        request.send(formData);
      });
    });
  });
};
deleteProductFunctionalities();
