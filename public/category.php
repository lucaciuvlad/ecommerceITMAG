<?php
session_start();
require_once("./classes/category.class.php");
?>

<?php
if (isset($_GET["categoryID"])) {
    $categoryID = htmlentities($_GET["categoryID"]);

    $categoryHandler = new Category();
    $categoryHandler->setCategoryId($categoryID);
    $categoryProducts = $categoryHandler->getCategoryProducts();
    $categoryName = $categoryHandler->getCategoryName($categoryID)->fetch_assoc()["category_name"];
}

if (isset($_GET["categoryID"]) && isset($_GET["brandID"])) {
    $categoryID = htmlentities($_GET["categoryID"]);
    $brandID = htmlentities($_GET["brandID"]);

    $categoryHandler = new Category();
    $categoryHandler->setCategoryId($categoryID);
    $categoryHandler->setBrandId($brandID);
    $categoryProducts = $categoryHandler->getCategoryBrandProducts();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="categories">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/notification.inc.php");

    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none;'data-user='$_SESSION[userID]'></div>";
    }
    ?>

    <ul class="breadcrumbs">
        <li>
            <a href="index.php"> Acasa </a>
        </li>

        <li>
            <a href="category.php?categoryID=<?php echo $categoryID; ?>"> <?php echo $categoryName; ?> </a>
        </li>
    </ul>

    <main class="categories">
        <h1> Laptopuri <span> <?php echo $categoryProducts->num_rows ?> produse </span> </h1>

        <div class="categories__filters">
            <button type="button" class="commonFilters">
                <i class="fa fa-times" aria-hidden="true"></i>
                <span> Ordoneaza dupa </span>
                <span class="actualFilter"> Niciun filtru </span>
            </button>

            <ul class="filters">
                <li> Pret crescator </li>
                <li> Pret descrescator </li>
                <li> La reducere </li>
            </ul>
        </div>

        <div class="categories__products">

            <?php
            foreach ($categoryProducts as $categoryProduct) :

                if ($categoryProduct["product_old_price"] != 0) {
                    $promoPercent = number_format($categoryProduct["product_price"] / $categoryProduct["product_old_price"] * 100, 0);
                }
            ?>

            <a class="categories__products__product"
                href="product.php?productID=<?php echo $categoryProduct["productID"] ?>">

                <div class="promoIndicator <?php if ($categoryProduct["product_old_price"] == 0) echo "hidden"; ?>">
                    <span> <?php echo $promoPercent;
                                ?>% </span>
                </div>

                <button type="button" class="addToFav" data-product-id="<?php echo $categoryProduct["productID"]; ?>">
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                    <div class="tooltip">
                        <i class="fa fa-caret-right" aria-hidden="true"></i>
                        <p> Adauga la favorite </p>
                    </div>
                </button>

                <div class="productImage">
                    <img src="../admin/assets/imgs/<?php echo $categoryProduct["product_image"]; ?>" />
                </div>

                <div class="productName">
                    <p> <?php echo $categoryProduct["product_name"]; ?> </p>
                </div>

                <div class="productRating">
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                    <i class="fa fa-star" aria-hidden="true"></i>
                </div>

                <div class="productPrice">
                    <?php
                        if ($categoryProduct["product_old_price"] != "") :
                        ?>
                    <p class="oldPrice">
                        <span class="oldFullPrice">
                            <?php
                                    echo $categoryProduct["product_old_price"];
                                    ?>
                        </span>
                        <sup class="oldFullPriceDecimal"> </sup>
                        <span> Lei </span>
                    </p>
                    <?php endif; ?>

                    <p class="newPrice">
                        <span class="newFullPrice"> <?php echo $categoryProduct["product_price"]; ?> </span>
                        <sup class="newFullPriceDecimal"> </sup>
                        <span> Lei </span>
                    </p>
                </div>

                <button type="button" class="addToCart" data-product-id="<?php echo $categoryProduct["productID"]; ?>">
                    <span> Adauga in cos </span>
                </button>
            </a>

            <?php endforeach; ?>
        </div>
    </main>

    <?php
    require_once("./includes/footer.inc.php");
    ?>


    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/categories.js" type="module"></script>
</body>

</html>