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

<body id="resetPassword">
    <?php
    require_once("./includes/loader.inc.php");
    require_once("./includes/notification.inc.php");
    ?>


    <main class="resetPassword">
        <header>
            <img src="./assets/imgs/itmag-logo.png" alt="Home Image" />
            <h1> Bun venit! </h1>
        </header>

        <section>
            <h2> Recuperare parola </h2>
            <p> Introdu adresa de email pentru a-ti recupera parola. </p>
        </section>

        <form action="" class="form" method="POST">
            <div class="form__field email">
                <label for="email"> Email </label>
                <input type="text" id="email" name="email">
                <p class="error"> </p>
            </div>

            <div class="form__footer">
                <button type="button" class="save"> Resetare </button>
            </div>
        </form>
    </main>

    <script src="./assets/js/resetPassword.js" type="module"> </script>
</body>

</html>