<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Acces cont </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="login">
    <?php
    require_once("./includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    ?>

    <main class="login">
        <header>
            <img src="./assets/imgs/itmag-logo.png" alt="Logo Magazin">
            <h1> Panou de control </h1>
        </header>

        <section>
            <h2> Acces cont </h2>
            <p> Introdu datele pentru a-ti accesa contul. </p>
        </section>

        <form action="" class="form" method="POST">
            <div class="form__field email">
                <label for="email"> Email </label>
                <input type="text" id="email" name="email">
                <p class="error"> </p>
            </div>

            <div class="form__group password">
                <div class="form__wrapper">
                    <label for="password"> Parola </label>
                    <a href="resetPassword.php"> Ai uitat parola? </a>
                </div>

                <div class="form__field">
                    <div class="form__field__wrapper pw">
                        <input type="password" id="password" name="password">
                        <i class="fa fa-eye-slash" aria-hidden="true"></i>
                        <i class="fa fa-eye" aria-hidden="true"></i>
                    </div>

                    <p class="error"> </p>
                </div>
            </div>

            <div class="form__footer">
                <button type="button" class="save"> Logare </button>
            </div>
        </form>

        <div class="login__option">
            <p> Nu ai inca un cont? </p>
            <a href="register.php"> Inregistreaza-te </a>
        </div>
    </main>

    <script src="./assets/js/login.js" type="module"> </script>
</body>

</html>