<?php
session_start();

if (!isset($_SESSION["userID"])) {
    header("location: login.php");
}

require_once("classes/userAccount.class.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Informatii cont </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="accountInfo">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/userSideMenu.inc.php");

    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none;'data-user='$_SESSION[userID]'></div>";

        $userAccountHandler = new UserAccount($_SESSION["userID"]);
        $userDetails = $userAccountHandler->getUserDetails();
        $userAddress = $userAccountHandler->getUserAddress();
    }
    ?>

    <main class="accountInfo">
        <h2> Informatii cont </h2>

        <div class="accountInfo__card generalInfo">
            <p> Nume: <span> <?php echo $userDetails["user_first_name"]; ?> </span> </p>
            <p> Prenume: <span><?php echo $userDetails["user_last_name"]; ?> </span> </p>
            <p> Adresa de email: <span> <?php echo $userDetails["user_email"]; ?> </span> </p>
        </div>

        <h2> Adresa </h2>

        <?php
        if ($userAddress == "") :
        ?>

        <div class="modal insertAddress">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form">
                    <div class="form__field address">
                        <label for="address"> Adresa completa (Strada, Numar, Apartament, Etaj, Localitate, Judet)
                        </label>
                        <input type="text" id="address" />
                        <p class="error"></p>
                    </div>

                    <div class="form__field phoneNumber">
                        <label for="phoneNumber"> Numar de telefon (07 -- --- ---) </label>
                        <input type="text" id="phoneNumber" />
                        <p class="error"></p>
                    </div>
                </form>
            </div>

            <div class="modal__footer">
                <button type="button" class="save"> Adauga </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>

        <div class="newAddress">
            <p class="error active"> Momentan nu exista nicio adresa de livrare. Este indispensabila la plasarea unei
                comenzi!
            </p>

            <button type="button" class="addAddress">
                <i class="fa fa-plus" aria-hidden="true"></i>
                <span> Adauga adresa </span>
            </button>
        </div>

        <?php else : ?>

        <div class="modal updateAddress">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form">
                    <div class="form__field address">
                        <label for="address"> Noua adresa completa (Strada, Numar, Etaj, Localitate, Judet) </label>
                        <input type="text" id="address" value="<?php echo $userAddress["user_full_address"]; ?>" />
                        <p class="error"></p>
                    </div>

                    <div class="form__field phoneNumber">
                        <label for="phoneNumber"> Noul numar de telefon (07 -- --- ---) </label>
                        <input type="text" id="phoneNumber" value="<?php echo $userAddress["user_phone_number"];  ?>" />
                        <p class="error"></p>
                    </div>
                </form>
            </div>

            <div class="modal__footer">
                <button type="button" class="save"> Modifica </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>

        <div class="accountInfo__card address">
            <p> Adresa: <span> <?php echo $userAddress["user_full_address"]; ?> </span> </p>
            <p> Numar telefon: <span> <?php echo $userAddress["user_phone_number"]; ?> </span> </p>
            <button type="button" class="updateAddress"> Modifica </button>
        </div>

        <?php endif; ?>

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

    <?php
    require_once("./includes/footer.inc.php");
    ?>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/accountInfo.js" type="module"></script>
</body>

</html>