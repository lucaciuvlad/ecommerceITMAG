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

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
    <title>ITMAG - Acasa</title>
</head>

<body id="homepage">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./classes/homepage.class.php");


    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none;'data-user='$_SESSION[userID]'></div>";
    }
    ?>

    <section class="productSection">
        <h1> Telefoane Samsung </h1>

        <div class="productSection__carousel">
            <div class="productSection__carousel__slider">
                <?php
                $homepageHandler = new Homepage();
                $products = $homepageHandler->fetchCarouselProducts(3, 1);


                foreach ($products as $product) :
                    if ($product["product_old_price"] != 0) {
                        $promoPercent = number_format($product["product_price"] / $product["product_old_price"] * 100, 0);
                    }
                ?>

                <a class="productSection__carousel__slider__slide"
                    href="product.php?productID=<?php echo $product["productID"] ?>">
                    <div class="promoIndicator">
                        <span> <?php echo $promoPercent; ?>% </span>
                    </div>

                    <button type="button" class="addToFav" data-product-id="<?php echo $product["productID"]; ?>">
                        <i class="fa fa-heart-o" aria-hidden="true"></i>
                        <div class="tooltip">
                            <i class="fa fa-caret-right" aria-hidden="true"></i>
                            <p> Adauga la favorite </p>
                        </div>
                    </button>

                    <div class="productImage">
                        <img src="../admin/assets/imgs/<?php echo $product["product_image"]; ?>" />
                    </div>

                    <div class="productName">
                        <p> <?php echo $product["product_name"]; ?> </p>
                    </div>

                    <div class="productRating">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                    </div>

                    <div class="productPrice">
                        <p class="oldPrice">
                            <span class="oldFullPrice">
                                <?php
                                    if ($product["product_old_price"] == "") {
                                        echo "";
                                    } else {
                                        echo $product["product_old_price"];
                                    }
                                    ?>
                            </span>
                            <sup class="oldFullPriceDecimal"> </sup>
                            <span> Lei </span>
                        </p>
                        <p class="newPrice">
                            <span class="newFullPrice"> <?php echo $product["product_price"]; ?> </span>
                            <sup class="newFullPriceDecimal"> </sup>
                            <span> Lei </span>
                        </p>
                    </div>

                    <button type="button" class="addToCart" data-product-id="<?php echo $product["productID"]; ?>">
                        <span> Adauga in cos </span>
                    </button>
                </a>

                <?php endforeach; ?>

            </div>

            <button type=" button" class="leftBtn">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>

            <button type="button" class="rightBtn">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
        </div>
    </section>

    <section class="productSection">
        <h1> Telefoane Huawei </h1>

        <div class="productSection__carousel">
            <div class="productSection__carousel__slider">
                <?php
                $homepageHandler = new Homepage();
                $products = $homepageHandler->fetchCarouselProducts(3, 2);


                foreach ($products as $product) :
                    if ($product["product_old_price"] != 0) {
                        $promoPercent = number_format($product["product_price"] / $product["product_old_price"] * 100, 0);
                    }
                ?>

                <a class="productSection__carousel__slider__slide"
                    href="product.php?productID=<?php echo $product["productID"] ?>">
                    <div class="promoIndicator">
                        <span> <?php echo $promoPercent; ?>% </span>
                    </div>

                    <button type="button" class="addToFav" data-product-id="<?php echo $product["productID"]; ?>">
                        <i class=" fa fa-heart-o" aria-hidden="true"></i>
                        <div class="tooltip">
                            <i class="fa fa-caret-right" aria-hidden="true"></i>
                            <p> Adauga la favorite </p>
                        </div>
                    </button>

                    <div class="productImage">
                        <img src="../admin/assets/imgs/<?php echo $product["product_image"]; ?>" />
                    </div>

                    <div class="productName">
                        <p> <?php echo $product["product_name"]; ?> </p>
                    </div>

                    <div class="productRating">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                    </div>

                    <div class="productPrice">
                        <p class="oldPrice">
                            <span class="oldFullPrice">
                                <?php
                                    if ($product["product_old_price"] == "") {
                                        echo "";
                                    } else {
                                        echo $product["product_old_price"];
                                    }
                                    ?>
                            </span>
                            <sup class="oldFullPriceDecimal"> </sup>
                            <span> Lei </span>
                        </p>
                        <p class="newPrice">
                            <span class="newFullPrice"> <?php echo $product["product_price"]; ?> </span>
                            <sup class="newFullPriceDecimal"> </sup>
                            <span> Lei </span>
                        </p>
                    </div>

                    <button type="button" class="addToCart" data-product-id="<?php echo $product["productID"]; ?>">
                        <span> Adauga in cos </span>
                    </button>
                </a>

                <?php endforeach; ?>

            </div>

            <button type="button" class="leftBtn">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
            </button>

            <button type="button" class="rightBtn">
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </button>
        </div>
    </section>

    <?php
    require_once("./includes/footer.inc.php");
    ?>

    <script src="./assets/js/index.js" type="module"></script>
    <script src="./assets/js/navigationBar.js" type="module"></script>
</body>

</html>