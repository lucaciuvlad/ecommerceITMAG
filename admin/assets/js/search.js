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
    if (item.classList.contains("pr")) addCssClass(item, "standOut");
  });

  const productsContainer = document.querySelector(".products");
  delayShowingMainContainer(productsContainer);
})();

// PRODUCT VIEW
// Table Data Options
const optionsToggles = document.querySelectorAll(".dropdown__tab");
const actionDropdowns = document.querySelectorAll(".dropdown__actions");

const productFunctionalities = () => {
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
productFunctionalities();

// COMMON FUNCTIONALITIES
// Toggle Tab Options
const toggleTabOptions = (optionsBox, optionsTab) => {
  toggleCssClass(optionsBox, "active");
  toggleCssClass(optionsTab, "active");
};

// Hide Tab Options
const hideTabOptions = (optionsBox, optionsTab) => {
  removeCssClass(optionsBox, "active");
  removeCssClass(optionsTab, "active");
};

// Choose A Dropdown Tab Option
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

// Add Active State On Full Price Tool
const addActiveToolInput = (toolBox, minus, plus) => {
  addCssClass(toolBox, "active");
  addCssClass(minus, "active");
  addCssClass(plus, "active");
};

// Remove Active State On Full Price Tool
const removeActiveToolInput = (toolBox, minus, plus) => {
  removeCssClass(toolBox, "active");
  removeCssClass(minus, "active");
  removeCssClass(plus, "active");
};

// Add 1 Unit For Full Price & State
const addOneUnit = (input) => {
  let actualValue = parseInt(input.value);
  actualValue++;

  input.value = actualValue;
};

// Substract 1 Unit For Full Price & State
const substractOneUnit = (input) => {
  let actualValue = parseInt(input.value);
  actualValue--;

  input.value = actualValue;

  if (actualValue < 0) {
    input.value = 0;
    return;
  }
};

// Update The Net Price Based On Given Full Price
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

// UPDATE PRODUCT
// Table Update Btns
const updateProductBtn = document.querySelector(".productUpdateBtn");
const productID = updateProductBtn.dataset.productId;

// Update Modal Form
let updateFormModal = document.querySelector(".modal.update");
let updateForm = document.querySelector(".productUpdate");
const modalCloseBtn = updateFormModal.querySelector(".close");
const modalUpdateBtn = updateFormModal.querySelector(".save");

// Update Product Name
const updateProductNameField =
  updateFormModal.querySelector(".updateProductName");
const updateProductNameLabel = updateProductNameField.querySelector("label");
const updateProductNameInput = updateProductNameField.querySelector("input");
const updateProductNameErrMsg = updateProductNameField.querySelector("p.error");

const updateProductNameArr = [
  updateProductNameField,
  updateProductNameLabel,
  updateProductNameInput,
];

// Update Product Price Tax
const updateProductPriceTaxField = updateFormModal.querySelector(
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
  updateProductPriceTaxField.querySelector(".form__field__dropdown__options");
const updateProductPriceTaxOptions = Array.from(
  updateProductPriceTaxOptionsBox.children
);

// Update Product Full Price
const updateProductFullPriceField =
  updateFormModal.querySelector(".updateFullPrice");
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

// Update Product Net Price
const updateProductNetPriceField =
  updateFormModal.querySelector(".updateNetPrice");
const updateProductNetPriceValue =
  updateProductNetPriceField.querySelector("p");

// Upate Product Old Price Field
const updateProductOldPriceField = updateFormModal.querySelector(
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

// Update Product Old Price Switch Btn
const updateProductOldPriceSwitch =
  updateProductOldPriceField.querySelector(".form__switch");
const updateProductOldPriceSwitchBtn = updateProductOldPriceSwitch.children[0];

// Update Product Old Price Input
const updateProductOldPrice =
  updateProductOldPriceField.querySelector(".oldPrice");
const updateProductOldPriceInput = updateProductOldPrice.querySelector(
  ".oldPrice__wrapper input"
);

// Update Product Category
const updateProductCategoryField = updateFormModal.querySelector(
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
  updateProductCategoryField.querySelector(".form__field__dropdown__options");
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

// Update Product Brand
const updateProductBrandField = updateFormModal.querySelector(
  ".updateProductBrand"
);
const updateProductBrandLabel = updateProductBrandField.querySelector("label");
const updateProductBrandTab = updateProductBrandField.querySelector(
  ".form__field__dropdown__tab"
);
const updateProductBrandSpan = updateProductBrandTab.querySelector("span");
const updateProductBrandOptionsBox = updateProductBrandField.querySelector(
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

// Update Product Stock
const updateProductStockField = updateFormModal.querySelector(
  ".updateProductStock"
);
const updateProductStockLabel = updateProductStockField.querySelector("label");
const updateProductStockTool = updateProductStockField.querySelector(".tool");
const updateProductStockMinus =
  updateProductStockField.querySelector("i.fa-minus");
const updateProductStockInput = updateProductStockField.querySelector("input");
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

// Get Visible Dropdown Option Id
const getVisibleDropdownOption = (options, span) => {
  options.forEach((option) => {
    if (span.innerHTML.trim() === option.innerHTML.trim()) {
      addCssClass(option, "active");
      span.setAttribute("data-id", `${option.dataset.id}`);
    }
  });
};

// Fetch Current Product Category
getVisibleDropdownOption(
  updateProductCategoryOptions,
  updateProductCategorySpan
);

// Fetch Current Product Brand
getVisibleDropdownOption(updateProductBrandOptions, updateProductBrandSpan);

// Update Product Request
const updateProduct = () => {
  const request = serverRequest();

  const formData = new FormData(updateForm);
  formData.append("updateProductId", updateProductBtn.dataset.productId);
  formData.append(
    "updateProductCategoryId",
    updateProductCategorySpan.dataset.id
  );
  formData.append("updateProductBrandId", updateProductBrandSpan.dataset.id);

  if (updateProductOldPriceSwitchBtn.classList.contains("active")) {
    formData.append("updateProductOldPrice", updateProductOldPriceInput.value);
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
          `search.php?productID=${productID}`,
          1500,
          null
        );
      }

      // Backend Validations
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
        hideError(updateProductFullPriceArr, updateProductFullPriceErrMsg);
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

const updateProductFunctionalities = () => {
  updateProductBtn.addEventListener("click", () => {
    // Show Update Modal Form
    addCssClass(updateFormModal, "active");

    // Hide Table Action Dropdown
    actionDropdowns.forEach((actionDropdown) => {
      removeCssClass(actionDropdown, "active");
    });
  });

  // Hide Update Modal Form
  modalCloseBtn.addEventListener("click", () => {
    removeCssClass(updateFormModal, "active");
  });

  // Update Product Price Tax
  updateProductPriceTaxLabel.addEventListener("click", () => {
    toggleTabOptions(updateProductPriceTaxOptionsBox, updateProductPriceTaxTab);
  });

  updateProductPriceTaxTab.addEventListener("click", () => {
    toggleTabOptions(updateProductPriceTaxOptionsBox, updateProductPriceTaxTab);
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

  // Update Product Full Price
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

  // Update Product Old Price
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

  // Update Product Category
  updateProductCategoryLabel.addEventListener("click", () => {
    toggleTabOptions(updateProductCategoryOptionsBox, updateProductCategoryTab);
  });

  updateProductCategoryTab.addEventListener("click", () => {
    toggleTabOptions(updateProductCategoryOptionsBox, updateProductCategoryTab);
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

  // Update Product Brand
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

  // Update Product Stock
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

  // Update Product
  modalUpdateBtn.addEventListener("click", () => {
    // Product Name Validation
    if (isEmpty(updateProductNameInput)) {
      showError(
        updateProductNameArr,
        updateProductNameErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(updateProductNameArr, updateProductNameErrMsg);
    }

    // Product Price Validation
    if (isEmpty(updateProductFullPriceInput)) {
      showError(
        updateProductFullPriceArr,
        updateProductFullPriceErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(updateProductFullPriceArr, updateProductFullPriceErrMsg);
    }

    // Product Old Price Validation
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

    // Product Category Validation
    if (updateProductCategorySpan.innerHTML.trim() === "Selecteaza categoria") {
      showError(
        updateProductCategoryArr,
        updateProductCategoryErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(updateProductCategoryArr, updateProductCategoryErrMsg);
    }

    // Product Brand Validation
    if (updateProductBrandSpan.innerHTML.trim() === "Selecteaza producatorul") {
      showError(
        updateProductBrandArr,
        updateProductBrandErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(updateProductBrandArr, updateProductBrandErrMsg);
    }

    // Product Stock Validation
    if (isEmpty(updateProductStockInput)) {
      showError(
        updateProductStockArr,
        updateProductStockErrMsg,
        "Campul este obligatoriu!"
      );
    } else {
      hideError(updateProductStockArr, updateProductStockErrMsg);
    }

    // Update Product
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
};
updateProductFunctionalities();

// DELETE PRODUCT
// Table Delete Btns
const deleteProductBtn = document.querySelector(".productDeleteBtn");
const productId = deleteProductBtn.dataset.productId;

// Deletion Confirmation Modal
let modalConfirmation = document.querySelector(".modal.delete");
let confirmBtn = modalConfirmation.querySelector("#confirm");
let rejectBtn = modalConfirmation.querySelector("#reject");
let closeModal = modalConfirmation.querySelector(".modal__close");

const deleteProductFunctionalities = () => {
  deleteProductBtn.addEventListener("click", () => {
    // Show Modal Deletion Confirmation
    addCssClass(modalConfirmation, "active");

    // Remove Any Active Action Dropdown
    actionDropdowns.forEach((actionDropdown) => {
      if (actionDropdown.classList.contains("active")) {
        removeCssClass(actionDropdown, "active");
      } else {
        return;
      }
    });
  });

  // Hide Modal Deletion Confirmation
  closeModal.addEventListener("click", () => {
    removeCssClass(modalConfirmation, "active");
  });

  rejectBtn.addEventListener("click", () => {
    removeCssClass(modalConfirmation, "active");
  });

  // Product Deletion
  confirmBtn.addEventListener("click", () => {
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
            null
          );
        }
      }
    };

    request.open("POST", "classes/products.class.php");
    request.send(formData);
  });
};
deleteProductFunctionalities();
