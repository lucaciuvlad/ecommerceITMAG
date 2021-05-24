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
    ?>

    <main class="cart">
        <h1> Cosul meu </h1>

        <section class="cart__products">
            <div class="cart__product">
                <img src="../admin/assets/imgs/huawei-mate-xs-interstellar-blue-1.png">
                <a href="#"> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque amet impedit perferendis?
                </a>
                <div class="range">
                    <div class="range-header">
                        <span class="number"> 1
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                        </span>
                        <span> buc </span>
                    </div>
                    <ul class="numbers">
                        <li class="active"> 1 </li>
                        <li> 2 </li>
                        <li> 3 </li>
                        <li> 4 </li>
                        <li> 5 </li>
                        <li> 6 </li>
                        <li> 7 </li>
                        <li> 8 </li>
                        <li> 9 </li>
                        <li> 10 </li>
                    </ul>
                </div>
                <div class="actions">
                    <button type="button" class="addToFav"> Adauga la favorite </button>
                    <button type="button" class="removeFromCart"> Sterge </button>
                </div>
                <div class="price">
                    <p class="oldPrice">
                        <span class="oldFullPrice"> 2500 </span>
                        <sup class="oldFullPriceDecimal"> 99 </sup>
                        <span> Lei </span>
                    </p>
                    <p class="newPrice">
                        <span class="newFullPrice"> 2500 </span>
                        <sup class="newFullPriceDecimal"> 99 </sup>
                        <span> Lei </span>
                    </p>
                </div>
            </div>
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
                        <span class="newFullPrice"> 2500 </span>
                        <sup class="newFullPriceDecimal"> 99 </sup>
                        <span> Lei </span>
                    </p>
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