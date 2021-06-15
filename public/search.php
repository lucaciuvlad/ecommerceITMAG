<?php
session_start();
?>

<?php
if (isset($_GET["queryString"])) {
    $queryString = htmlentities($_GET["queryString"]);
    require_once("./classes/searchEngine.class.php");

    $searchEngineHandler = new SearchEngine($queryString);
    $searchResults = $searchEngineHandler->fetchSearchSuggestions();
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

    <main class="categories">
        <h1> Rezultate gasite
            <span>
                <?php echo $searchResults->num_rows ?> produse
            </span>
        </h1>

        <?php if ($searchResults->num_rows != 0) : ?>

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

        <?php endif; ?>
        <div class="categories__products">

            <?php
            foreach ($searchResults as $searchResult) :

                if ($searchResult["product_old_price"] != 0) {
                    $promoPercent = number_format($searchResult["product_price"] / $searchResult["product_old_price"] * 100, 0);
                }
            ?>

            <a class="categories__products__product"
                href="product.php?productID=<?php echo $searchResult["productID"] ?>">

                <div class="promoIndicator <?php if ($searchResult["product_old_price"] == 0) echo "hidden"; ?>">
                    <span> <?php echo $promoPercent;
                                ?>% </span>
                </div>

                <button type="button" class="addToFav" data-product-id="<?php echo $searchResult["productID"]; ?>">
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                    <div class="tooltip">
                        <i class="fa fa-caret-right" aria-hidden="true"></i>
                        <p> Adauga la favorite </p>
                    </div>
                </button>

                <div class="productImage">
                    <img src="../admin/assets/imgs/<?php echo $searchResult["product_image"]; ?>" />
                </div>

                <div class="productName">
                    <p> <?php echo $searchResult["product_name"]; ?> </p>
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
                        if ($searchResult["product_old_price"] != "") :
                        ?>
                    <p class="oldPrice">
                        <span class="oldFullPrice">
                            <?php
                                    echo $searchResult["product_old_price"];
                                    ?>
                        </span>
                        <sup class="oldFullPriceDecimal"> </sup>
                        <span> Lei </span>
                    </p>
                    <?php endif; ?>

                    <p class="newPrice">
                        <span class="newFullPrice"> <?php echo $searchResult["product_price"]; ?> </span>
                        <sup class="newFullPriceDecimal"> </sup>
                        <span> Lei </span>
                    </p>
                </div>

                <button type="button" class="addToCart" data-product-id="<?php echo $searchResult["productID"]; ?>">
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