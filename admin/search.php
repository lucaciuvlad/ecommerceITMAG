<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

require_once("classes/products.class.php");
require_once("classes/categories.class.php");
require_once("classes/brands.class.php");
require_once("classes/searchEngine.class.php");


if (isset($_GET["productID"])) {
    $productID = htmlentities($_GET["productID"]);

    $searchEngineHandler = new SearchEngine($productID);
    $searchSuggestions = $searchEngineHandler->fetchSearchSuggestions();
}

if (isset($_GET["searchString"])) {
    $searchString = $_GET["searchString"];

    $searchEngineHandler = new SearchEngine($searchString);
    $searchSuggestions = $searchEngineHandler->fetchSearchSuggestions();

    $categoriesHandler = new Categories();
    $categories = $categoriesHandler->selectCategories();

    $brandsHandler = new Brands();
    $brands = $brandsHandler->selectBrands();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Cautari </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body>
    <?php
    require_once("includes/navigationBar.inc.php");
    require_once("includes/sideMenu.inc.php");
    require_once("includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    ?>

    <main class="products">

        <?php

        if ($searchSuggestions->num_rows == 0) :
        ?>

        <p class="error active"> Nu a fost gasit niciun rezultat. </p>
        <?php else : ?>

        <h1>
            <?php
                if ($searchSuggestions->num_rows == 1) {
                    echo "A fost gasit $searchSuggestions->num_rows produs";
                } else {
                    echo "Au fost gasite $searchSuggestions->num_rows produse";
                }
                ?>


        </h1>

        <!-- Product View -->
        <table class="table">
            <thead>
                <tr>
                    <th> Nume produs </th>
                    <th> Categorie produs </th>
                    <th> Brand produs </th>
                    <th> Pret total </th>
                    <th> Pret redus </th>
                    <th> Stoc </th>
                    <th> Optiuni </th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($searchSuggestions as $searchSuggestion) :
                    ?>
                <tr>
                    <td class="prName"> <?php echo $searchSuggestion["product_name"]; ?> </td>

                    <td> <?php echo $searchSuggestion["category_name"] ?> </td>

                    <td> <?php echo $searchSuggestion["brand_name"] ?> </td>

                    <td> <?php echo $searchSuggestion["product_price"]; ?> Lei </td>

                    <td>
                        <?php if ($searchSuggestion["product_old_price"] != null) {
                                    echo $searchSuggestion["product_old_price"];
                                } else {
                                    echo "0";
                                }
                                ?>
                        Lei
                    </td>

                    <td> <?php echo $searchSuggestion["product_stock"] ?> </td>

                    <td class="dropdown">
                        <div class="dropdown__tab">
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <div class="dropdown__actions">
                            <ul>
                                <li>
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    <span class="productUpdateBtn"
                                        data-product-id="<?php echo $searchSuggestion["productID"]; ?>">
                                        Editeaza </span>
                                </li>
                                <li>
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    <span class="productDeleteBtn"
                                        data-product-id="<?php echo $searchSuggestion["productID"]; ?>"> Sterge </span>
                                </li>
                                <li>
                                    <a href="productImages.php?productID=<?php echo $searchSuggestion["productID"]; ?>">
                                        <i class="fa fa-picture-o" aria-hidden="true"></i>
                                        <span> Imagini </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="productDescriptions.php?productID=<?php echo $searchSuggestion["productID"]; ?>">
                                        <i class="fa fa-info-circle" aria-hidden="true"></i>
                                        <span> Descrieri </span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="productSpecifications.php?productID=<?php echo $searchSuggestion["productID"]; ?>">
                                        <i class="fa fa-book" aria-hidden="true"></i>
                                        <span> Specificatii </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
        <?php endif; ?>

        <?php
        $indexId = 0;
        foreach ($searchSuggestions as $searchSuggestion) :
            $indexId++;
        ?>

        <div class="modal update">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form productUpdate">
                    <div class="form__group">
                        <div class="form__header">
                            <h2> Setari generale </h2>
                            <h3> Introdu setarile si informatiile de baza ale produsului. </h3>
                        </div>

                        <div class="form__field updateProductName">
                            <label for="updateProductName<?php echo $indexId; ?>"> Nume produs </label>
                            <input type="text" name="updateProductName" id="updateProductName<?php echo $indexId; ?>"
                                value=" <?php echo $searchSuggestion["product_name"]; ?>" />

                            <p class="error"></p>
                        </div>
                    </div>

                    <div class="form__group">
                        <div class="form__header">
                            <h2> Informatii pret </h2>
                            <h3> Introdu setarile si informatiile de pret pentru produs. </h3>
                        </div>

                        <div class="form__field__dropdown updateProductPriceTax">
                            <label> Taxa aplicata </label>

                            <div class="form__field__dropdown__tab">
                                <span> TVA - 19% </span>
                                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>

                            <div class="form__field__dropdown__options">
                                <p class="active"> TVA - 19% </p>
                                <p> Nu se aplica nicio taxa </p>
                            </div>
                        </div>

                        <div class="form__field__wrapper">
                            <div class="form__field__wrapper__column updateFullPrice">
                                <label for="updateProductPrice<?php echo $indexId; ?>"> Pret total (taxe incluse)
                                </label>

                                <div class="tool">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                    <input type="text" name="updateProductPrice"
                                        id="updateProductPrice<?php echo $indexId; ?>"
                                        value="<?php echo $searchSuggestion["product_price"]; ?>" />
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </div>

                                <p class="error"></p>
                            </div>

                            <div class="form__field__wrapper__column updateNetPrice">
                                <label class="netPriceLabel"> Pret net </label>
                                <p> 0 RON </p>
                            </div>
                        </div>

                        <div class="form__field updateProductOldPrice">
                            <label for="updateProductOldPrice<?php echo $indexId; ?>"> Afiseaza o reducere de pret
                                pentru acest produs
                            </label>

                            <div class="form__switch">
                                <div class="<?php if ($product["product_old_price"] != null) echo "active"; ?>">
                                </div>
                            </div>

                            <div class="oldPrice active">
                                <div class="oldPrice__wrapper">
                                    <input type="text" value="<?php if ($searchSuggestion["product_old_price"] == null) {
                                                                        echo "0";
                                                                    } else {
                                                                        echo $searchSuggestion["product_old_price"];
                                                                    } ?>"
                                        id="updateProductOldPrice<?php echo $indexId; ?>" />
                                    <span> RON </span>
                                </div>

                                <p class="info"> Introdu pretul vechi total al produsului. Discount-ul
                                    procentual va fi
                                    calculat
                                    automat, in functie de pretul vechi si pretul actual.
                                </p>
                            </div>

                            <p class="error"></p>
                        </div>
                    </div>

                    <div class="form__group">
                        <div class="form__header">
                            <h2> Organizare catalog </h2>
                        </div>

                        <div class="form__field__dropdown updateProductCategory">
                            <label> Categorie </label>

                            <div class="form__field__dropdown__tab">
                                <span>
                                    <?php echo $searchSuggestion["category_name"]; ?> </span>
                                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>

                            <div class="form__field__dropdown__options">
                                <?php
                                    if ($categories->num_rows != 0) :
                                        foreach ($categories as $category) :
                                    ?>
                                <p data-id=<?php echo $category["categoryID"]; ?>>
                                    <?php echo $category["category_name"]; ?> </p>
                                <?php endforeach;
                                    endif; ?>
                            </div>

                            <p class="error"></p>
                        </div>

                        <div class="form__field__dropdown updateProductBrand">
                            <label> Producator </label>

                            <div class="form__field__dropdown__tab">
                                <span> <?php echo $searchSuggestion["brand_name"]; ?> </span>
                                <i class="fa fa-chevron-down" aria-hidden="true"></i>
                            </div>

                            <div class="form__field__dropdown__options">
                                <?php
                                    if ($brands->num_rows != 0) :
                                        foreach ($brands as $brand) :

                                    ?>
                                <p data-id=<?php echo $brand["brandID"]; ?>> <?php echo $brand["brand_name"]; ?> </p>
                                <?php endforeach;
                                    endif; ?>
                            </div>

                            <p class="error"></p>
                        </div>

                        <div class="form__field__wrapper">
                            <div class="form__field__wrapper__column updateProductStock">
                                <label for="updateProductStock<?php echo $indexId; ?>"> Stoc produs </label>

                                <div class="tool">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                    <input type="text" name="updateProductStock"
                                        value="<?php echo $searchSuggestion["product_stock"]; ?>"
                                        id="updateProductStock<?php echo $indexId; ?>" />

                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </div>

                                <p class="error"></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal__footer">
                <button type="button" class="save"> Modifica </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>

        <?php endforeach; ?>
    </main>

    <?php
    foreach ($searchSuggestions as $searchSuggestion) :
    ?>

    <div class="modal delete">
        <div class="modal__close">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div class="modal__content">
            <div class="modal__confirmation">
                <p> Esti sigur ca vrei sa stergi produsul? </p>
                <div class="modal__confirmation__actions">
                    <button type="button" id="confirm"> Da </button>
                    <button type="button" id="reject"> Nu </button>
                </div>
            </div>
        </div>
    </div>

    <?php endforeach; ?>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/search.js" type="module"></script>
</body>

</html>