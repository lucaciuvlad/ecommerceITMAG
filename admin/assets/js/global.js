const toggleCssClass = (item, cssClass) => {
  item.classList.toggle(`${cssClass}`);
};

const addCssClass = (item, cssClass) => {
  item.classList.add(`${cssClass}`);
};

const removeCssClass = (item, cssClass) => {
  item.classList.remove(`${cssClass}`);
};

const createElement = (item, attrName, attrValue) => {
  const newItem = document.createElement(`${item}`);

  if (attrName !== null) newItem.setAttribute(`${attrName}`, `${attrValue}`);

  return newItem;
};

const appendElement = (createdElement, parentElement) => {
  parentElement.appendChild(createdElement);
};

const insertBeforeElement = (createdElement, parentElement, beforeElement) => {
  parentElement.insertBefore(createdElement, beforeElement);
};

const debounce = (fn, delay) => {
  let timer;

  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const serverRequest = () => {
  const http = new XMLHttpRequest();
  return http;
};

const notificationContainer = document.querySelector(".notificationContainer");
const notification = notificationContainer.children[0];
const notificationMsg = notification.children[0];

const showNotification = (msg, page, delay, error) => {
  notificationContainer.style.height = `${notificationContainer.parentElement.clientHeight}px`;
  addCssClass(notificationContainer, "active");
  addCssClass(notification, "active");

  if (error === "error") {
    addCssClass(notification, "error");
  }

  notificationMsg.innerHTML = msg;

  const hideNotification = setTimeout(() => {
    removeCssClass(notification, "active");
    removeCssClass(notificationContainer, "active");

    if (error !== null) {
      removeCssClass(notification, "error");
    }

    notificationMsg.innerHTML = "";

    clearTimeout(hideNotification);
  }, delay);

  const redirect = setTimeout(() => {
    window.location.assign(`http://localhost/itmag/admin/${page}`);

    clearTimeout(redirect);
  }, delay + 150);
};

const delayShowingMainContainer = (mainContainer) => {
  const delay = setTimeout(() => {
    addCssClass(mainContainer, "active");

    clearTimeout(delay);
  }, 50);
};

export {
  toggleCssClass,
  addCssClass,
  removeCssClass,
  createElement,
  appendElement,
  insertBeforeElement,
  debounce,
  serverRequest,
  showNotification,
  delayShowingMainContainer,
};
