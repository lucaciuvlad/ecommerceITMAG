<?php
session_start();

require_once("./classes/product.class.php");
$productId = $_GET["productID"];

$productHandler = new Product();
$productHandler->setProductId($productId);
$productInfo = $productHandler->getProductInfo();
$productImages = $productHandler->getProductImages();
$productDescriptions = $productHandler->getProductDescriptions();
$productSpecifications = $productHandler->getProductSpecifications();
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
    <title> <?php echo $productInfo["product_name"]; ?> </title>
</head>

<body id="product">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./includes/stickyTopBtn.inc.php");

    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none;'data-user='$_SESSION[userID]'></div>";
    }
    ?>

    <main class="product">
        <ul class="product__breadcrumbs">
            <li>
                <a href="index.php"> Acasa </a>
            </li>
            <li>
                <a href="category.php?categoryID=<?php echo $productInfo["categoryID"]; ?>">
                    <?php
                    echo $productInfo["category_name"];
                    ?>
                </a>
            </li>
            <li>
                <a
                    href="category.php?categoryID=<?php echo $productInfo["categoryID"]; ?>&brandID=<?php echo $productInfo["brandID"]; ?>">
                    <?php
                    echo "$productInfo[category_name] $productInfo[brand_name]";
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
                foreach ($productImages as $productImage) :
                ?>

                <div class="carousel__slider__slide">
                    <img src="../admin/assets/imgs/<?php echo $productImage["product_image"]; ?>" />
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
                <span class="oldFullPrice">
                    <?php
                    if ($productInfo["product_old_price"] == "") {
                        echo "";
                    } else {
                        echo $productInfo["product_old_price"];
                    }
                    ?>
                </span>
                <sup class="oldFullPriceDecimal"> </sup>
                <span> Lei </span>

                <span class="promo">
                    <?php
                    if ($productInfo["product_old_price"] != 0) {
                        $promoPercent = number_format($productInfo["product_price"] / $productInfo["product_old_price"] * 100, 0);
                        echo "($promoPercent%)";
                    }
                    ?>
                </span>
            </p>

            <p class="newPrice">
                <span class="newFullPrice"> <?php echo $productInfo["product_price"]; ?> </span>
                <sup class="newFullPriceDecimal"> </sup>
                <span> Lei </span>
            </p>
        </div>

        <div class="product__state">
            <p>
                <span class="<?php if ($productInfo["product_stock"] <= 5) {
                                    echo "badState";
                                } else {
                                    echo "goodState";
                                } ?>">
                    <?php echo $productInfo["product_stock"]; ?> produse ramase
                </span>
            </p>
        </div>

        <div class="product__actions">
            <div class="product__actions__cartBtn">
                <button type="button" class="addToCart" data-product-id="<?php echo $productInfo["productID"]; ?>">
                    <span> Adauga in cos </span>
                </button>
            </div>

            <div class="product__actions__favoriteBtn">
                <button type="button" class="addToFav" data-product-id="<?php echo $productInfo["productID"]; ?>">
                    <span> Adauga la favorite </span>
                </button>
            </div>
        </div>
    </main>

    <section class="productDescription">
        <a id="productDescription">
            <h2> Descriere </h2>
        </a>

        <h2> <?php echo $productInfo["product_name"]; ?> </h2>

        <?php
        foreach ($productDescriptions as $productDescription) :
        ?>

        <div class="productDescription__group">
            <h2> <?php echo $productDescription["product_description_title"]; ?> </h2>
            <img src="../admin/assets/imgs/<?php echo $productDescription["product_description_image"]; ?>" />
            <p>
                <?php
                    echo $productDescription["product_description_body"];
                    ?>
            </p>
        </div>

        <?php endforeach; ?>
    </section>

    <section class="productSpecifications">
        <a id="productSpecifications">
            <h2> Specificatii </h2>
        </a>

        <table>

            <?php
            foreach ($productSpecifications as $productSpecification) :
            ?>
            <tr>
                <td> <?php echo $productSpecification["product_specification_key"]; ?> </td>
                <td> <?php echo $productSpecification["product_specification_value"]; ?> </td>
            </tr>

            <?php endforeach;
            ?>

        </table>
    </section>

    <div class="productFixedNavigation">
        <ul>
            <li>
                <a href="#productDescription"> Descriere </a>
            </li>
            <li>
                <a href="#productSpecifications"> Specificatii </a>
            </li>
        </ul>
    </div>

    <?php
    require_once("./includes/footer.inc.php");
    ?>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/product.js" type="module"></script>
</body>

</html>