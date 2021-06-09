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
    <title> Cosul meu </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="cart">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/notification.inc.php");

    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none;'data-user='$_SESSION[userID]'></div>";
    }
    ?>

    <main class="cart">
        <h1> Cosul meu </h1>

        <div class="cart__empty">
            <h3> Cosul tau este gol! </h3>
            <p> Pentru a adauga produse, te rugam intoarce-te in magazin. </p>
            <a href="index.php"> Intoarce-te in magazin </a>
        </div>

        <section class="cart__products">
        </section>

        <section class="cartInfo">
            <h2> Sumar comanda </h2>

            <div class="productInfo">
                <div class="productPrice">
                    <span> Cost produse: </span>
                    <p class="newPrice">
                        <span class="newFullPrice"> 2500 </span>
                        <sup class="newFullPriceDecimal"> 99 </sup>
                        <span> Lei </span>
                    </p>
                </div>

                <div class="productTax">
                    <span> Cost livrare: </span>
                    <p class="newPrice">
                        <span class="newFullPrice"> 15 </span>
                        <sup class="newFullPriceDecimal"> 99 </sup>
                        <span> Lei </span>
                    </p>
                </div>

                <div class="productQuantity">
                    <span> Numar produse: </span>
                    <p> 17 </p>
                </div>
            </div>

            <div class="cartTotal">
                <div class="total">
                    <span> Total: </span>
                    <p class="newPrice">
                        <span class="newFullPrice"> 2500 </span>
                        <sup class="newFullPriceDecimal"> 99 </sup>
                        <span> Lei </span>
                    </p>
                </div>

                <button type="button" class="checkoutBtn"> Continua </button>
            </div>
        </section>
    </main>

    <?php
    require_once("./includes/footer.inc.php");
    ?>


    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/cart.js" type="module"></script>
</body>

</html>