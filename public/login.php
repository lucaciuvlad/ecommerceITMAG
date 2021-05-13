<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/pages/login.css">

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
    <title> ITMAG - Login </title>
</head>

<body>
    <?php
    require_once("./includes/navbar.php");
    ?>

    <section class="login">
        <h1> Bun venit! </h1>
        <div class="login__btns">
            <button type="button" class="login active">
                <span> Intra in cont </span>
            </button>

            <button type="button" class="register">
                <span> Creeaza un cont </span>
            </button>
        </div>

        <div class="login__carousel">
            <div class="login__carousel__slider">
                <form class="login" action="./classes/login_system.class.php" method="POST">
                    <div class="login-field" id="loginEmail">
                        <div class="login-field__input">
                            <input type="text">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <label class="active"> Introdu adresa de email </label>
                            <div class="border"></div>
                            <div class="icon-feedback">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div class="error-feedback">
                            <span> Mesaj de eroare </span>
                        </div>
                    </div>

                    <div class="login-field" id="loginPw">
                        <div class="login-field__input">
                            <input type="password">
                            <i class=" fa fa-lock" aria-hidden="true"></i>
                            <label class="active"> Introdu parola </label>
                            <div class="border"></div>
                            <div class="pw-peek">
                                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </div>
                            <div class="icon-feedback">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div class="error-feedback">
                            <span> Mesaj de eroare </span>
                        </div>
                    </div>

                    <div class="login__utilities">
                        <label for="rememberMe">
                            <input type="checkbox" id="rememberMe">
                            <span> Tine-ma minte! </span>
                            <div class="custom-checkbox <?php if (isset($_COOKIE["uE"])) {
                                                            echo "active";
                                                        } ?>">
                                <i class="fa fa-check <?php if (isset($_COOKIE["uE"])) {
                                                            echo "active";
                                                        } ?>" aria-hidden="true"></i>
                            </div>
                        </label>

                        <a href="#">
                            <span> Parola uitata? </span>
                        </a>
                    </div>

                    <button type="submit" class="login__button">
                        <span> Logare </span>
                    </button>
                </form>

                <form class="register" action="./classes/login_system.class.php" method="POST">
                    <div class="register-field" id="registerEmail">
                        <div class="register-field__input">
                            <input type="text">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            <label class="active"> Introdu adresa de email </label>
                            <div class="border"></div>
                            <div class="icon-feedback">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div class="error-feedback">
                            <span> Mesaj de eroare </span>
                        </div>
                    </div>

                    <div class="register-field" id="registerPw">
                        <div class="register-field__input">
                            <input type="password">
                            <i class="fa fa-lock" aria-hidden="true"></i>
                            <label class="active"> Introdu parola contului </label>
                            <div class="border"></div>
                            <div class="pw-peek">
                                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </div>
                            <div class="icon-feedback">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div class="pw-helper">
                            <span> Pentru o parola sigura, revedeti sa aveti: </span>
                            <ul>
                                <li> - minim 6 caractere </li>
                                <li> - minim o litera mare </li>
                                <li> - caractere mici </li>
                                <li> - minim un numar </li>
                                <li> - minim un caracter special <br>
                                    (!, @, #, $, %, etc)
                                </li>
                            </ul>
                        </div>

                        <div class="error-feedback">
                            <span> Mesaj de eroare </span>
                        </div>
                    </div>

                    <div class="register-field" id="registerRepeatPw">
                        <div class="register-field__input">
                            <input type="password">
                            <i class="fa fa-repeat" aria-hidden="true"></i>
                            <label class="active"> Reintrodu parola a contului </label>
                            <div class="border"></div>
                            <div class="pw-peek">
                                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </div>
                            <div class="icon-feedback">
                                <i class="fa fa-check" aria-hidden="true"></i>
                                <i class="fa fa-exclamation-circle" aria-hidden="true"></i>
                            </div>
                        </div>

                        <div class="error-feedback">
                            <span> Mesaj de eroare </span>
                        </div>
                    </div>

                    <div class="register__utilities">
                        <label for="terms">
                            <input type="checkbox" id="terms">
                            <span> Accept termenii si conditiile. </span>
                            <div class="custom-checkbox">
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </div>
                        </label>
                    </div>

                    <button type="submit" class="register__button">
                        <span> Creeaza cont </span>
                    </button>
                </form>
            </div>
        </div>
    </section>

    <div class="modal-feedback">
        <div class="modal-feedback__wrapper">
            <span> Ne bucuram ca ai ales ITMAG! </span>
            <div>
                <i class="fa fa-check" aria-hidden="true"></i>
            </div>
            <span> </span>
        </div>
    </div>

    <script src="./assets/js/loginSystem.js" type="module"></script>
</body>

</html>