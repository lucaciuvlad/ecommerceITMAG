<?php
session_start();

require_once("./classes/product.class.php");
$product = new Product();
$productId = $_GET["productId"];
$product->setProductId($productId);
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
    <title> Product ITMAG </title>
</head>

<body>
    <?php
    $productInfo = $product->getProductInfo();
    ?>

    <main class="product">
        <ul class="product__breadcrumbs">
            <li>
                <a href="#">
                    <?php
                    echo $productInfo["category_name"];
                    ?>
                </a>
            </li>
            <li>
                <a href="#">
                    <?php
                    echo $productInfo["category_name"] . $productInfo["brand_name"];
                    ?>
                </a>
            </li>
        </ul>

        <header class="product__name">
            <h1>
                <?php
                echo $productInfo["product_name"];
                ?>
            </h1>
        </header>

        <div class="carousel">
            <div class="carousel__slider">

                <?php
                $productImages = $product->getProductImages();
                $imageBasePath = "../admin/assets/imgs/ProductTest/";

                foreach ($productImages as $productImage) :
                ?>

                <div class="carousel__slider__slide">
                    <?php
                        $finalImage = $imageBasePath . $productImage["product_image"];
                        ?>
                    <img src="<?php echo $finalImage; ?>" />
                </div>

                <?php endforeach; ?>
            </div>

            <div class="carousel__arrowBtns">
                <button type="button" class="leftBtn">
                    <i class="fa fa-angle-left" aria-hidden="true"></i>
                </button>
                <button type="button" class="rightBtn active">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </button>
            </div>

            <div class="carousel__bulletBtns"> </div>
        </div>

        <div class="product__rating">
            <a href="#">
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <i class="fa fa-star" aria-hidden="true"></i>
                <span> 5 </span>
            </a>
        </div>

        <div class="product__price">
            <p class="oldPrice">
                <span class="old"> 2399 </span>
                <sup class="old"> 99 </sup>
                <span class="old"> Lei </span>

                <span class="promo"> (-15%) </span>
            </p>

            <p class="actualPrice">
                <span> 2039 </span>
                <sup> 99 </sup>
                <span> Lei </span>
            </p>
        </div>

        <div class="product__state">
            <p>
                <span class="badState"> 10 produse </span>
            </p>
        </div>

        <div class="product__actions">
            <div class="product__actions__cartBtn">
                <button type="button" class="cart">
                    <span> Adauga in cos </span>
                </button>
            </div>

            <div class="product__actions__favoriteBtn">
                <button type="button" class="favorite">
                    <span> Adauga la favorite </span>
                </button>
            </div>
        </div>
    </main>

    <div class="productFixedNavigation">
        <ul>
            <li>
                <a href="#"> Descriere </a>
            </li>
            <li>
                <a href="#productSpecs"> Specificatii </a>
            </li>
            <li>
                <a href="#">
                    <span> Recenzii </span>
                    <span> (25) </span>
                </a>
            </li>
        </ul>
    </div>


    <script src="./assets/js/product.js" type="module"></script>
</body>

</html>