<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Produse favorite </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="favProducts">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./includes/userSideMenu.inc.php");

    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none; position: absolute; top: 0; left: 0;'data-user='$_SESSION[userID]'></div>";
    }
    ?>

    <main class="favProducts">
        <div class="favProducts__header">
            <h2> Favorite </h2>
            <span> 2 produse </span>
        </div>

        <div class="favProducts__empty">
            <h3> Lista ta de produse favorite este goala! </h3>
            <p> Pentru a adauga produse, te rugam intoarce-te in magazin. </p>
            <a href="index.php"> Intoarce-te in magazin </a>
        </div>

        <div class="favProducts__products">
        </div>
    </main>

    <?php
    require_once("./includes/footer.inc.php");
    ?>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/favProducts.js" type="module"></script>
</body>

</html>