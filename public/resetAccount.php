<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Resetare cont </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="resetAccount">
    <?php
    require("./includes/loader.inc.php");
    require("./includes/notification.inc.php");
    ?>

    <main class="resetAccount">
        <header>
            <h1> Bun venit! </h1>
            <a href="index.php">
                <img src="./assets/imgs/itmag-logo.png" alt="Home Image" />
            </a>
        </header>


        <section>
            <h2> Resetare cont </h2>
            <p> Introdu noua parola pentru a-ti recupera contul. </p>
        </section>

        <form action="classes/register.class.php" class="form" method="POST">
            <div class="form__group password">
                <label for="password"> Parola </label>

                <div class="form__field">
                    <div class="form__field__wrapper pw">
                        <input type="password" id="password" name="password">
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

            <div class="form__footer">
                <button type="button" class="save"> Recuperare cont </button>
            </div>
        </form>
    </main>

    <script src="./assets/js/resetAccount.js" type="module"> </script>
</body>

</html>