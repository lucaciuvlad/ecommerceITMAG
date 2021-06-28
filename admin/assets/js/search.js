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

            const questionMark = document.URL.indexOf("?");
            const actualUrl = document.URL.slice(questionMark);

            if (response.isUpdated) {
              showNotification(
                "Produsul a fost modificat cu succes!",
                `search.php${actualUrl}`,
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

            const questionMark = document.URL.indexOf("?");
            const actualUrl = document.URL.slice(questionMark);

            if (response.isDeleted) {
              showNotification(
                "Produsul a fost sters cu succes!",
                `search.php${actualUrl}`,
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
