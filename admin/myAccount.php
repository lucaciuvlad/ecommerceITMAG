<?php
session_start();
if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

require_once("./classes/myAccount.class.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Panou de control </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body>
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/sideMenu.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    ?>

    <?php

    if (isset($_SESSION["adminID"])) {
        echo "<div id='adminId' style='display: none;'data-admin='$_SESSION[adminID]'></div>";

        $myAccountHandler = new MyAccount();
        $myAccountHandler->setAdminId($_SESSION["adminID"]);
        $adminDetails = $myAccountHandler->getAdminDetails();
    }
    ?>

    <main class="accountInfo">
        <h1> Informatii cont </h1>

        <div class="accountInfo__card generalInfo">
            <p> Nume: <span> <?php echo $adminDetails["admin_first_name"]; ?> </span> </p>
            <p> Prenume: <span><?php echo $adminDetails["admin_last_name"]; ?> </span> </p>
            <p> Adresa de email: <span> <?php echo $adminDetails["admin_email"]; ?> </span> </p>
        </div>

        <div class="modal updatePassword">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form updatePasswordForm">
                    <div class="form__group oldPassword">
                        <label for="oldPassword"> Parola veche </label>

                        <div class="form__field">
                            <div class="form__field__wrapper pw">
                                <input type="password" id="oldPassword" name="oldPassword">
                                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </div>

                            <p class="error"> </p>
                        </div>
                    </div>

                    <div class="form__group newPassword">
                        <label for="newPassword"> Parola noua </label>

                        <div class="form__field">
                            <div class="form__field__wrapper pw">
                                <input type="password" id="newPassword" name="newPassword">
                                <i class="fa fa-eye-slash" aria-hidden="true"></i>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </div>

                            <div class="form__field__helper">
                                <p> Pentru o parola sigura, va rugam, revedeti sa aveti: </p>

                                <ul>
                                    <li> mai multe litere mici </li>
                                    <li> minim o litera mare </li>
                                    <li> minim 8 caractere </li>
                                    <li> minim un numar </li>
                                    <li> minim un caracter special (!, @, #, $, etc.) </li>
                                </ul>
                            </div>

                            <p class="error"> </p>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal__footer">
                <button type="button" class="save"> Modifica </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>

        <button type="button" class="updatePasswordBtn"> Schimba parola </button>
    </main>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/myAccount.js" type="module"></script>
</body>

</html>