import {
    debounce,
    setActive,
    removeActive
} from "./global.js";

const loginTrigger = document.querySelectorAll(".login__btns button")[0];
const registerTrigger = document.querySelectorAll(".login__btns button")[1];

const loginSlider = document.querySelector(".login__carousel__slider");
const loginSlides = Array.from(loginSlider.children);
loginSlider.parentElement.style.height = `${loginSlides[0].clientHeight}px`;

const loginEmailField = loginSlides[0].querySelector("#loginEmail");

const loginUserIcon = loginEmailField.querySelector(".login-field__input i.fa-user");
const loginEmailInput = loginEmailField.querySelector(".login-field__input input");
const loginEmailLabel = loginEmailField.querySelector(".login-field__input label");
const loginEmailCheckIcon = loginEmailField.querySelectorAll(".login-field__input .icon-feedback i")[0];
const loginEmailErrIcon = loginEmailField.querySelectorAll(".login-field__input .icon-feedback i")[1];
const loginEmailErr = loginEmailField.querySelector(".error-feedback");
const loginEmailErrMsg = loginEmailField.querySelector(".error-feedback span");
let loginEmailError = true;

if (loginEmailInput.value != "") {
    removeActive(loginEmailLabel);
} else {
    setActive(loginEmailLabel);
}

const loginPwField = loginSlides[0].querySelector("#loginPw");

const loginPwIcon = loginPwField.querySelector(".login-field__input i.fa-lock");
const loginPwInput = loginPwField.querySelector(".login-field__input input");
const loginPwLabel = loginPwField.querySelector(".login-field__input label");
const loginPwEyeSlash = loginPwField.querySelectorAll(".login-field__input .pw-peek i")[0];
const loginPwEye = loginPwField.querySelectorAll(".login-field__input .pw-peek i")[1];
const loginPwCheckIcon = loginPwField.querySelectorAll(".login-field__input .icon-feedback i")[0];
const loginPwErrIcon = loginPwField.querySelectorAll(".login-field__input .icon-feedback i")[1];
const loginPwErr = loginPwField.querySelector(".error-feedback");
const loginPwErrMsg = loginPwField.querySelector(".error-feedback span");
let loginPwError = true;

const loginInputs = [loginEmailInput, loginPwInput];
const loginPwEyeIcons = [loginPwEyeSlash, loginPwEye]

if (loginPwInput.value != "") {
    removeActive(loginPwLabel);
} else {
    setActive(loginPwLabel);
}

const rememberLabel = loginSlides[0].querySelector(".login__utilities label");
const rememberSpan = loginSlides[0].querySelector(".login__utilities label span");
const rememberCheckbox = loginSlides[0].querySelector(".login__utilities .custom-checkbox");
const rememberTick = loginSlides[0].querySelector(".login__utilities .custom-checkbox i.fa-check");
let remember = false;

const registerEmailField = loginSlides[1].querySelector("#registerEmail");

const registerUserIcon = registerEmailField.querySelector(".register-field__input i.fa-user");
const registerEmailInput = registerEmailField.querySelector(".register-field__input input");
const registerEmailLabel = registerEmailField.querySelector(".register-field__input label");
const registerEmailCheckIcon = registerEmailField.querySelectorAll(".register-field__input .icon-feedback i")[0];
const registerEmailErrIcon = registerEmailField.querySelectorAll(".register-field__input .icon-feedback i")[1];
const registerEmailErr = registerEmailField.querySelector(".error-feedback");
const registerEmailErrMsg = registerEmailField.querySelector(".error-feedback span");
let registerEmailError = true;

const registerPwField = loginSlides[1].querySelector("#registerPw");

const registerPwIcon = registerPwField.querySelector(".register-field__input i.fa-lock");
const registerPwInput = registerPwField.querySelector(".register-field__input input");
const registerPwLabel = registerPwField.querySelector(".register-field__input label");
const registerPwEyeSlash = registerPwField.querySelectorAll(".register-field__input .pw-peek i")[0];
const registerPwEye = registerPwField.querySelectorAll(".register-field__input .pw-peek i")[1];
const registerPwCheckIcon = registerPwField.querySelectorAll(".register-field__input .icon-feedback i")[0];
const registerPwErrIcon = registerPwField.querySelectorAll(".register-field__input .icon-feedback i")[1];
const registerPwErr = registerPwField.querySelector(".error-feedback");
const registerPwErrMsg = registerPwField.querySelector(".error-feedback span");
let registerPwError = true;

const registerPwHelper = loginSlides[1].querySelector(".pw-helper");
const registerPwLengthReq = registerPwHelper.querySelectorAll("ul li")[0];
const registerPwUpperReq = registerPwHelper.querySelectorAll("ul li")[1];
const registerPwLowerReq = registerPwHelper.querySelectorAll("ul li")[2];
const registerPwNumberReq = registerPwHelper.querySelectorAll("ul li")[3];
const registerPwSpecialCharReq = registerPwHelper.querySelectorAll("ul li")[4];

let pwLength = false;
let pwUpper = false;
let pwLower = false;
let pwNumber = false;
let pwSpecialChar = false;

const registerRepeatPwField = loginSlides[1].querySelector("#registerRepeatPw");

const registerRepeatPwIcon = registerRepeatPwField.querySelector(".register-field__input i.fa-repeat");
const registerRepeatPwInput = registerRepeatPwField.querySelector(".register-field__input input");
const registerRepeatPwLabel = registerRepeatPwField.querySelector(".register-field__input label");
const registerRepeatPwEyeSlash = registerRepeatPwField.querySelectorAll(".register-field__input .pw-peek i")[0];
const registerRepeatPwEye = registerRepeatPwField.querySelectorAll(".register-field__input .pw-peek i")[1];
const registerRepeatPwCheckIcon = registerRepeatPwField.querySelectorAll(".register-field__input .icon-feedback i")[0];
const registerRepeatPwErrIcon = registerRepeatPwField.querySelectorAll(".register-field__input .icon-feedback i")[1];
const registerRepeatPwErr = registerRepeatPwField.querySelector(".error-feedback");
const registerRepeatPwErrMsg = registerRepeatPwField.querySelector(".error-feedback span");
let registerRepeatPwError = true;

const registerInputs = [registerEmailInput, registerPwInput, registerRepeatPwInput];
const registerPwEyeIcons = [registerPwEyeSlash, registerPwEye];
const registerRepeatPwEyeIcons = [registerRepeatPwEyeSlash, registerRepeatPwEye];

const conditionsLabel = document.querySelector(".register__utilities label");
const conditionsSpan = document.querySelector(".register__utilities label span");
const conditionsCheckbox = document.querySelector(".register__utilities .custom-checkbox");
const conditionsTick = document.querySelector(".register__utilities .custom-checkbox i.fa-check");
let conditions = false;

const loginBtn = document.querySelector(".login__button");
const registerBtn = document.querySelector(".register__button");

const modalFeedback = document.querySelector(".modal-feedback");
const modalFeedbackWrapper = modalFeedback.children[0];
const modalFeedbackCheckIcon = modalFeedback.querySelector("i");
const modalFeedbackMsg = modalFeedback.querySelectorAll("span")[1];


// Validate Login || Register Email Fields On Server-Side
const emailDbValidation = Input => {
    const request = new XMLHttpRequest();

    request.open("POST", "./classes/login_system.class.php");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if (Input.parentElement.classList.contains("register-field__input")) {
        request.send(`checkRegisterEmail=${Input.value}`);
    } else {
        request.send(`checkLoginEmail=${Input.value}`);
    }

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const requestResponse = request.response;

            if (requestResponse == "Campul este obligatoriu!" || requestResponse == "Adresa de email nu este corecta!") {
                errorActive(
                    loginEmailErr,
                    loginEmailErrMsg,
                    requestResponse,
                    loginEmailCheckIcon,
                    loginEmailErrIcon
                );
            } else if (requestResponse != "Adresa exista deja!") {
                errorActive(
                    loginEmailErr,
                    loginEmailErrMsg,
                    "Cont inexistent!",
                    loginEmailCheckIcon,
                    loginEmailErrIcon
                );

                loginEmailError = true;
            } else {
                errorInactive(
                    loginEmailErr,
                    loginEmailErrMsg,
                    loginEmailCheckIcon,
                    loginEmailErrIcon
                );

                loginEmailError = false;
            }

            if (Input.parentElement.classList.contains("register-field__input")) {
                if (
                    requestResponse == "Campul este obligatoriu!" ||
                    requestResponse == "Adresa de email nu este corecta!" ||
                    requestResponse == "Adresa exista deja!"
                ) {
                    errorActive(
                        registerEmailErr,
                        registerEmailErrMsg,
                        requestResponse,
                        registerEmailCheckIcon,
                        registerEmailErrIcon
                    );

                    registerEmailError = true;
                } else {
                    errorInactive(
                        registerEmailErr,
                        registerEmailErrMsg,
                        registerEmailCheckIcon,
                        registerEmailErrIcon
                    );

                    registerEmailError = false;
                }
            }
        }
    };
};

// Validate Login Password Field On Server-Side
const pwSvValidation = () => {
    const request = new XMLHttpRequest();

    request.open("POST", "./classes/login_system.class.php");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.send(`checkingLoginEmail=${loginEmailInput.value}&checkingLoginPw=${loginPwInput.value}`);

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const requestResponse = request.response;

            if (
                requestResponse == "Campul este obligatoriu!" ||
                requestResponse == "Introdu mai intai adresa de email!" ||
                requestResponse == "Parola nu este corecta!"
            ) {
                errorActive(
                    loginPwErr,
                    loginPwErrMsg,
                    requestResponse,
                    loginPwCheckIcon,
                    loginPwErrIcon
                );

                loginPwError = true;
            } else if (requestResponse == "Password Ok") {
                errorInactive(
                    loginPwErr,
                    loginPwErrMsg,
                    loginPwCheckIcon,
                    loginPwErrIcon
                );

                loginPwError = false;
            }
        }
    };
};

// Validate Password Field Validation On Server-Side
const registerPwSvValidation = () => {
    const request = new XMLHttpRequest();

    request.open("POST", "./classes/login_system.class.php");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    request.send(`checkingRegisterPw=${registerPwInput.value}`);

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const requestResponse = request.response;

            if (
                requestResponse == "Campul este obligatoriu!" ||
                requestResponse == "Este nevoie de 6 caractere!" ||
                requestResponse == "Este nevoie de o litera mare!" ||
                requestResponse == "Este nevoie de litere mici!" ||
                requestResponse == "Este nevoie de un numar!" ||
                requestResponse == "Este nevoie de un caracter special!"
            ) {
                errorActive(
                    registerPwErr,
                    registerPwErrMsg,
                    requestResponse,
                    registerPwCheckIcon,
                    registerPwErrIcon,
                    registerPwError
                );
            } else {
                errorInactive(
                    registerPwErr,
                    registerPwErrMsg,
                    registerPwCheckIcon,
                    registerPwErrIcon,
                    registerPwError
                );
            }
        }
    };
};

// Validate Password && Repeat Password Fields On Server-Side
const repeatPwSvValidation = () => {
    const request = new XMLHttpRequest();

    request.open("POST", "./classes/login_system.class.php");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`registerPw=${registerPwInput.value}&checkingRegisterRepeatPw=${registerRepeatPwInput.value}`);


    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const requestResponse = request.response;

            if (
                requestResponse == "Campul este obligatoriu!" ||
                requestResponse == "Trebuie introdusa parola inainte!" ||
                requestResponse == "Parolele nu se potrivesc!"
            ) {
                errorActive(
                    registerRepeatPwErr,
                    registerRepeatPwErrMsg,
                    requestResponse,
                    registerRepeatPwCheckIcon,
                    registerRepeatPwErrIcon,
                    registerRepeatPwError
                );
            } else {
                errorInactive(
                    registerRepeatPwErr,
                    registerRepeatPwErrMsg,
                    registerRepeatPwCheckIcon,
                    registerRepeatPwErrIcon,
                    registerRepeatPwError
                );
            }
        }
    };
};

// Register User
const registerUser = () => {
    if (registerEmailError == false && registerPwError == false && registerRepeatPwError == false && conditions) {
        const request = new XMLHttpRequest();

        request.open("POST", "./classes/login_system.class.php");
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.send(`registerEmail=${registerEmailInput.value}&registerPw=${registerPwInput.value}`);

        request.onreadystatechange = () => {
            if (request.readyState == 4 && request.status == 200) {
                const requestResponse = request.response;

                if (requestResponse == "Inregistrat cu succes!") {
                    modalFeedbackMsg.innerText = "Logheaza-te acum si fii la curent cu cele mai bune reduceri!";
                    showModal();

                    const hidingModal = setTimeout(() => {
                        hideModal();

                        clearTimeout(hidingModal);
                    }, 2000);

                    const redirect = setTimeout(() => {
                        window.location.assign("http://localhost/licenta/itmag/public/login.php");

                        clearTimeout(redirect);
                    }, 1900);
                }
            }
        };
    }
};

// Login User
const loginUser = () => {
    const request = new XMLHttpRequest();

    request.open("POST", "./classes/login_system.class.php");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    if (loginEmailError == false && loginPwError == false && remember) {
        request.send(`loginEmail=${loginEmailInput.value}&loginPw=${loginPwInput.value}&remember=true`);
        persistentLogin();
    } else if (loginEmailError == false && loginPwError == false && remember == false) {
        request.send(`loginEmail=${loginEmailInput.value}&loginPw=${loginPwInput.value}&remember=false`);
    }

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const requestResponse = request.response;

            if (requestResponse == "Logat cu succes!") {
                modalFeedbackMsg.innerText = "Fii pregatit pentru cele mai bune reduceri!";
                showModal();

                const hidingModal = setTimeout(() => {
                    hideModal();

                    clearTimeout(hidingModal);
                }, 2000);

                const redirect = setTimeout(() => {
                    window.location.assign("http://localhost/licenta/itmag/public/index.php");

                    clearTimeout(redirect);
                }, 1900);
            }
        }
    };
};

// Persistent Login
const persistentLogin = () => {
    const request = new XMLHttpRequest();

    request.open("POST", "./classes/login_system.class.php");
    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    request.send(`userEmail=${loginEmailInput.value}`);

    request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
            const requestResponse = JSON.parse(request.response);

            loginEmailInput.value = requestResponse.usrEmail;
            loginPwInput.value = requestResponse.usrPw;
        }
    };
};

// Show The Custom Error Feedback
const errorActive = (ErrorContainer, ErrorSpan, ErrorMessage, CheckIcon, ErrIcon) => {
    setActive(ErrorContainer);
    ErrorSpan.innerText = ErrorMessage;

    removeActive(CheckIcon);
    setActive(ErrIcon);
};

// Hide The Custom Error Feedback
const errorInactive = (ErrorContainer, ErrorSpan, CheckIcon, ErrIcon) => {
    removeActive(ErrorContainer);
    ErrorSpan.innerText = "";

    removeActive(ErrIcon);
    setActive(CheckIcon);
};

// Check For Empty Fields
const emptyFieldValidation = (ErrorContainer, ErrorSpan, CheckIcon, ErrIcon) => {
    errorActive(
        ErrorContainer,
        ErrorSpan,
        "Campul este obligatoriu!",
        CheckIcon,
        ErrIcon
    );
};

// Validate Login || Register Email Fields
const emailValidation = (Input, InputErr, InputErrMsg, InputCheckIcon, InputErrIcon, InputError) => {
    const emailInput = Input.value;
    const emailTemplate = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (emailInput == "") {
        emptyFieldValidation(InputErr, InputErrMsg, InputCheckIcon, InputErrIcon);

        InputError = true;
    } else if (!emailInput.match(emailTemplate)) {
        if (Input.parentElement.classList.contains("register-field__input")) {
            errorActive(
                registerEmailErr,
                registerEmailErrMsg,
                "Adresa de email nu este corecta!",
                registerEmailCheckIcon,
                registerEmailErrIcon
            );

            registerEmailError = true;
        } else {
            errorActive(
                loginEmailErr,
                loginEmailErrMsg,
                "Adresa de email nu este corecta!",
                loginEmailCheckIcon,
                loginEmailErrIcon
            );

            loginEmailError = true;
        }
    }
};

// Validate Login Password Field
const passwordValidation = () => {
    if (loginPwInput.value == "") {
        emptyFieldValidation(loginPwErr, loginPwErrMsg, loginPwCheckIcon, loginPwErrIcon);

        loginPwError = true;
    } else if (loginEmailInput.value == "") {
        errorActive(
            loginPwErr,
            loginPwErrMsg,
            "Introdu mai intai adresa de email!",
            loginPwCheckIcon,
            loginPwErrIcon
        );

        loginPwError = true;
    }
};

// Validate Register Password Field
const registerPwValidation = () => {
    const registerPw = registerPwInput.value;
    const lowerCaseLetters = /[a-z]+/g;
    const upperCaseLetters = /[A-Z]+/g;
    const numbers = /[0-9]+/g;
    const specialChars = /[!@#$%^&*]+/g;

    if (registerPw.length < 6) {
        registerPwLengthReq.classList.remove("true");
        registerPwLengthReq.classList.add("false");

        errorActive(
            registerPwErr,
            registerPwErrMsg,
            "Este nevoie de minim 6 caractere!",
            registerPwCheckIcon,
            registerPwErrIcon
        );

        pwLength = false;
    } else {
        registerPwLengthReq.classList.remove("false");
        registerPwLengthReq.classList.add("true");

        pwLength = true;

        errorInactive(
            registerPwErr,
            registerPwErrMsg,
            registerPwCheckIcon,
            registerPwErrIcon
        );
    }

    if (!registerPw.match(upperCaseLetters)) {
        registerPwUpperReq.classList.remove("true");
        registerPwUpperReq.classList.add("false");

        pwUpper = false;

        errorActive(
            registerPwErr,
            registerPwErrMsg,
            "Este nevoie de minim o litera mare!",
            registerPwCheckIcon,
            registerPwErrIcon
        );
    } else {
        removeActive(registerPwErr);
        registerPwUpperReq.classList.remove("false");
        registerPwUpperReq.classList.add("true");

        pwUpper = true;

        errorInactive(
            registerPwErr,
            registerPwErrMsg,
            registerPwCheckIcon,
            registerPwErrIcon
        );
    }

    if (!registerPw.match(lowerCaseLetters)) {
        registerPwLowerReq.classList.remove("true");
        registerPwLowerReq.classList.add("false");

        pwLower = false;

        errorActive(
            registerPwErr,
            registerPwErrMsg,
            "Este nevoie de litere mici!",
            registerPwCheckIcon,
            registerPwErrIcon
        );
    } else {
        removeActive(registerPwErr);
        registerPwLowerReq.classList.remove("false");
        registerPwLowerReq.classList.add("true");

        pwLower = true;

        errorInactive(
            registerPwErr,
            registerPwErrMsg,
            registerPwCheckIcon,
            registerPwErrIcon
        );
    }

    if (!registerPw.match(numbers)) {
        registerPwNumberReq.classList.remove("true");
        registerPwNumberReq.classList.add("false");

        pwNumber = false;

        errorActive(
            registerPwErr,
            registerPwErrMsg,
            "Este nevoie de minim un numar!",
            registerPwCheckIcon,
            registerPwErrIcon
        );
    } else {
        removeActive(registerPwErr);
        registerPwNumberReq.classList.remove("false");
        registerPwNumberReq.classList.add("true");

        pwNumber = true;

        errorInactive(
            registerPwErr,
            registerPwErrMsg,
            registerPwCheckIcon,
            registerPwErrIcon
        );
    }

    if (!registerPw.match(specialChars)) {
        registerPwSpecialCharReq.classList.remove("true");
        registerPwSpecialCharReq.classList.add("false");

        pwSpecialChar = false;

        errorActive(
            registerPwErr,
            registerPwErrMsg,
            "Este nevoie de minim un caracter special!",
            registerPwCheckIcon,
            registerPwErrIcon
        );
    } else {
        removeActive(registerPwErr);
        registerPwSpecialCharReq.classList.remove("false");
        registerPwSpecialCharReq.classList.add("true");

        pwSpecialChar = true;

        errorInactive(
            registerPwErr,
            registerPwErrMsg,
            registerPwCheckIcon,
            registerPwErrIcon
        );
    }

    if (pwLength && pwUpper && pwLower && pwNumber && pwSpecialChar) {
        removeActive(registerPwHelper);

        removeActive(registerPwErrIcon);
        setActive(registerPwCheckIcon);

        errorInactive(
            registerPwErr,
            registerPwErrMsg,
            registerPwCheckIcon,
            registerPwErrIcon
        );

        registerPwError = false;
    } else {
        setActive(registerPwHelper);

        removeActive(registerPwCheckIcon);
        setActive(registerPwErrIcon);

        errorActive(
            registerPwErr,
            registerPwErrMsg,
            "Parola este incorecta!",
            registerPwCheckIcon,
            registerPwErrIcon
        );

        registerPwError = true;
    }

    if (registerPw == "") {
        emptyFieldValidation(registerPwErr, registerPwErrMsg, registerPwCheckIcon, registerPwErrIcon);

        registerPwError = true;
    }
};

// Validate Repeat Password Field
const confirmPasswordValidation = () => {
    if (registerRepeatPwInput.value == "") {
        emptyFieldValidation(registerRepeatPwErr, registerRepeatPwErrMsg, registerRepeatPwCheckIcon, registerRepeatPwErrIcon);

        registerRepeatPwError = true;
    } else if (registerPwInput.value == "") {
        errorActive(
            registerRepeatPwErr,
            registerRepeatPwErrMsg,
            "Trebuie introdusa parola inainte!",
            registerRepeatPwCheckIcon,
            registerRepeatPwErrIcon,
            registerRepeatPwError
        );

        registerRepeatPwError = true;
    } else if (registerRepeatPwInput.value != registerPwInput.value) {
        errorActive(
            registerRepeatPwErr,
            registerRepeatPwErrMsg,
            "Parolele nu se potrivesc!",
            registerRepeatPwCheckIcon,
            registerRepeatPwErrIcon
        );

        registerRepeatPwError = true;
    } else {
        errorInactive(
            registerRepeatPwErr,
            registerRepeatPwErrMsg,
            registerRepeatPwCheckIcon,
            registerRepeatPwErrIcon
        );

        registerRepeatPwError = false;
    }
};

// Validate Conditions Checkbox
const conditionsCheckboxValidation = () => {
    if (conditions) {
        conditionsCheckbox.classList.remove("error");
        conditionsSpan.classList.remove("error");

        setActive(conditionsCheckbox);
        setActive(conditionsTick);
    } else {
        conditionsCheckbox.classList.add("error");
        conditionsSpan.classList.add("error");

        removeActive(conditionsCheckbox);
        removeActive(conditionsTick);
    }
};

// Tick The Checkboxes
const tickCheckBox = (Span, Checkbox, Icon) => {
    Span.classList.remove("error");
    Checkbox.classList.remove("error");

    setActive(Checkbox);
    setActive(Icon);
};

// Untick The Checbkboxes
const untickCheckBox = (Span, Checkbox, Icon) => {
    Span.classList.add("error");
    Checkbox.classList.add("error");

    removeActive(Checkbox);
    removeActive(Icon);
};

// Move From Login To Register Slide
const moveToRegister = () => {
    loginSlider.style.transform = `translateX(-${loginSlides[0].clientWidth}px)`;
    loginSlider.parentElement.style.height = `${loginSlides[1].clientHeight}px`;

    loginEmailInput.value = "";
    loginPwInput.value = "";

    blurInput(loginUserIcon, loginEmailInput, loginEmailLabel);
    blurInput(loginPwIcon, loginPwInput, loginPwLabel);

    removeActive(loginEmailErr);
    removeActive(loginEmailCheckIcon);
    removeActive(loginEmailErrIcon);

    removeActive(loginPwErr);
    removeActive(loginPwCheckIcon);
    removeActive(loginPwErrIcon);

    removeActive(loginTrigger);
    setActive(registerTrigger);
};

// Move From Register To Login Slide
const moveToLogin = () => {
    loginSlider.style.transform = "translateX(0)";
    loginSlider.parentElement.style.height = `${loginSlides[0].clientHeight}px`;

    registerEmailInput.value = "";
    registerPwInput.value = "";
    registerRepeatPwInput.value = "";

    blurInput(registerUserIcon, registerEmailInput, registerEmailLabel);
    blurInput(registerPwIcon, registerPwInput, registerPwLabel);
    blurInput(registerRepeatPwIcon, registerRepeatPwInput, registerRepeatPwLabel);

    removeActive(registerEmailErr);
    removeActive(registerEmailCheckIcon);
    removeActive(registerEmailErrIcon);

    removeActive(registerPwErr);
    removeActive(registerPwCheckIcon);
    removeActive(registerPwErrIcon);

    removeActive(registerRepeatPwErr);
    removeActive(registerRepeatPwCheckIcon);
    removeActive(registerRepeatPwErrIcon);

    conditionsCheckbox.classList.remove("active");
    conditionsCheckbox.classList.remove("error");

    conditionsTick.classList.remove("active");
    conditionsTick.classList.remove("error");

    conditionsSpan.classList.remove("error");

    removeActive(registerTrigger);
    setActive(loginTrigger);
};

// Blur The Input
const blurInput = (InputStartIcon, Input, Label) => {
    removeActive(InputStartIcon);

    if (Input.value !== "") {
        removeActive(Label);
    } else {
        setActive(Label);
    }
};

// Password Peek
const pwPeek = (Input, IconSlash, IconEye) => {
    if (Input.type == "password") {
        Input.removeAttribute("type", "password");
        Input.setAttribute("type", "text");

        removeActive(IconSlash);
        setActive(IconEye);
    } else {
        Input.removeAttribute("type", "text");
        Input.setAttribute("type", "password");

        removeActive(IconEye);
        setActive(IconSlash);
    }
};

// Toggle On Password Peek Icon
const togglePeekPwIcon = (Input, Icon) => {
    if (Input.value != "") {
        setActive(Icon);
    } else {
        removeActive(Icon);
    }
};

// Showing Modal After Register|Login Completion
const showModal = () => {
    setActive(modalFeedback);
    setActive(modalFeedbackWrapper);
    setActive(modalFeedbackCheckIcon);
};

// Hiding Modal After A Specifing Timeout
const hideModal = () => {
    removeActive(modalFeedback);
    removeActive(modalFeedbackWrapper);
    removeActive(modalFeedbackCheckIcon);
};

// Login Functionalities Trigger
const loginFunctionalities = () => {
    loginInputs.forEach(Input => {
        Input.addEventListener("blur", () => {
            if (Input == loginEmailInput) {
                blurInput(loginUserIcon, loginEmailInput, loginEmailLabel);
            } else if (Input == loginPwInput) {
                blurInput(loginPwIcon, loginPwInput, loginPwLabel);
            }
        });
    });

    loginEmailInput.addEventListener("keyup", debounce(() => {
        emailValidation(loginEmailInput, loginEmailErr, loginEmailErrMsg, loginEmailCheckIcon, loginEmailErrIcon, loginEmailError);
        emailDbValidation(loginEmailInput);

        if (loginPwInput.value != "") {
            loginPwInput.value = "";

            setActive(loginPwLabel);

            removeActive(loginPwErr);
            removeActive(loginPwErrIcon);
            removeActive(loginPwEyeSlash);
        }
    }, 100));

    loginPwInput.addEventListener("keyup", debounce(() => {
        togglePeekPwIcon(loginPwInput, loginPwEyeSlash);

        passwordValidation();

        pwSvValidation();
    }, 100));

    if ((window.innerWidth < 768 || window.innerWidth) <= 2740 && window.TouchEvent) {
        registerTrigger.addEventListener("touchstart", moveToRegister);

        loginPwEyeIcons.forEach(Icon => {
            Icon.addEventListener("touchstart", () => {
                pwPeek(loginPwInput, loginPwEyeSlash, loginPwEye);
            });
        });

        rememberLabel.addEventListener("touchstart", () => {
            if (remember) {
                untickCheckBox(rememberSpan, rememberCheckbox, rememberTick);
                rememberSpan.classList.remove("error");
                rememberCheckbox.classList.remove("error");

                remember = false;
            } else {
                tickCheckBox(rememberSpan, rememberCheckbox, rememberTick);

                remember = true;
            }
        });

        loginBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();

            emailValidation(loginEmailInput, loginEmailErr, loginEmailErrMsg, loginEmailCheckIcon, loginEmailErrIcon, loginEmailError);
            emailDbValidation(loginEmailInput);

            passwordValidation();
            pwSvValidation();

            loginUser();
        });
    }

    if (window.innerWidth > 1200 && window.MouseEvent) {
        registerTrigger.addEventListener("click", moveToRegister);

        loginPwEyeIcons.forEach(Icon => {
            Icon.addEventListener("click", () => {
                pwPeek(loginPwInput, loginPwEyeSlash, loginPwEye);
            });
        });

        rememberLabel.addEventListener("click", (e) => {
            e.preventDefault();

            if (remember) {
                untickCheckBox(rememberSpan, rememberCheckbox, rememberTick);
                rememberSpan.classList.remove("error");
                rememberCheckbox.classList.remove("error");

                remember = false;
            } else {
                tickCheckBox(rememberSpan, rememberCheckbox, rememberTick);

                remember = true;
            }
        });

        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();

            emailValidation(loginEmailInput, loginEmailErr, loginEmailErrMsg, loginEmailCheckIcon, loginEmailErrIcon, loginEmailError);
            emailDbValidation(loginEmailInput);

            passwordValidation();
            pwSvValidation();

            loginUser();
        });
    }
};
loginFunctionalities();

// Register Functionalities Trigger
const registerFunctionalities = () => {
    registerInputs.forEach(Input => {
        Input.addEventListener("blur", () => {
            if (Input == registerEmailInput) {
                blurInput(registerUserIcon, registerEmailInput, registerEmailLabel);
            } else if (Input == registerPwInput) {
                blurInput(registerPwIcon, registerPwInput, registerPwLabel);
            } else if (Input == registerRepeatPwInput) {
                blurInput(registerRepeatPwIcon, registerRepeatPwInput, registerRepeatPwLabel);
            }
        });
    });

    registerEmailInput.addEventListener("keyup", debounce(() => {
        emailValidation(registerEmailInput, registerEmailErr, registerEmailErrMsg, registerEmailCheckIcon, registerEmailErrIcon, registerEmailError);

        emailDbValidation(registerEmailInput);
    }, 100));

    registerPwInput.addEventListener("keyup", debounce(() => {
        togglePeekPwIcon(registerPwInput, registerPwEyeSlash);

        if (registerRepeatPwInput.value != "") {
            registerRepeatPwInput.value = "";

            setActive(registerRepeatPwLabel);

            removeActive(registerRepeatPwErr);
            removeActive(registerRepeatPwErrIcon);
            removeActive(registerRepeatPwEyeSlash);
        }

        registerPwValidation();
        registerPwSvValidation();
    }, 100));

    registerRepeatPwInput.addEventListener("keyup", debounce(() => {
        togglePeekPwIcon(registerRepeatPwInput, registerRepeatPwEyeSlash);

        confirmPasswordValidation();
        repeatPwSvValidation();
    }, 100));

    if ((window.innerWidth < 768 || window.innerWidth) <= 2740 && window.TouchEvent) {
        loginTrigger.addEventListener("touchstart", moveToLogin);

        registerPwEyeIcons.forEach(Icon => {
            Icon.addEventListener("touchstart", () => {
                pwPeek(registerPwInput, registerPwEyeSlash, registerPwEye);
            });
        });

        registerRepeatPwEyeIcons.forEach(Icon => {
            Icon.addEventListener("touchstart", () => {
                pwPeek(registerRepeatPwInput, registerRepeatPwEyeSlash, registerRepeatPwEye);
            });
        });

        conditionsLabel.addEventListener("touchstart", () => {
            if (conditions) {
                untickCheckBox(conditionsSpan, conditionsCheckbox, conditionsTick);

                conditions = false;
            } else {
                tickCheckBox(conditionsSpan, conditionsCheckbox, conditionsTick);

                conditions = true;
            }
        });

        registerBtn.addEventListener("touchstart", (e) => {
            e.preventDefault();

            emailValidation(registerEmailInput, registerEmailErr, registerEmailErrMsg, registerEmailCheckIcon, registerEmailErrIcon);
            emailDbValidation(registerEmailInput);

            registerPwValidation();
            registerPwSvValidation();

            confirmPasswordValidation();
            repeatPwSvValidation();

            conditionsCheckboxValidation();

            registerUser();
        });
    }

    if (window.innerWidth > 1200 && window.MouseEvent) {
        loginTrigger.addEventListener("click", moveToLogin);

        registerPwEyeIcons.forEach(Icon => {
            Icon.addEventListener("click", () => {
                pwPeek(registerPwInput, registerPwEyeSlash, registerPwEye);
            });
        });

        registerRepeatPwEyeIcons.forEach(Icon => {
            Icon.addEventListener("click", () => {
                pwPeek(registerRepeatPwInput, registerRepeatPwEyeSlash, registerRepeatPwEye);
            });
        });

        conditionsLabel.addEventListener("click", (e) => {
            e.preventDefault();

            if (conditions) {
                untickCheckBox(conditionsSpan, conditionsCheckbox, conditionsTick);

                conditions = false;
            } else {
                tickCheckBox(conditionsSpan, conditionsCheckbox, conditionsTick);

                conditions = true;
            }
        });

        registerBtn.addEventListener("click", (e) => {
            e.preventDefault();

            emailValidation(registerEmailInput, registerEmailErr, registerEmailErrMsg, registerEmailCheckIcon, registerEmailErrIcon);
            emailDbValidation(registerEmailInput);

            registerPwValidation();
            registerPwSvValidation();

            confirmPasswordValidation();
            repeatPwSvValidation();

            conditionsCheckboxValidation();

            registerUser();
        });
    }
};
registerFunctionalities();