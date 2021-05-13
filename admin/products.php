<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}
require_once("classes/products.class.php");
require_once("classes/brands.class.php");
require_once("classes/categories.class.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/main.css">
    <title> Administrare produse </title>

    <?php
    require_once("includes/fonts.inc.php");
    ?>
</head>

<body>
    <?php
    require_once("includes/navigationBar.inc.php");
    require_once("includes/sideMenu.inc.php");
    require_once("includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    ?>

    <?php
    $productHandler = new Products();
    $products = $productHandler->selectProducts();

    $brandsHandler = new Brands();
    $brands = $brandsHandler->selectBrands();

    $categoriesHandler = new Categories();
    $categories = $categoriesHandler->selectCategories();
    ?>

    <main class="products">
        <h1> Toate produsele </h1>

        <?php
        if ($products->num_rows == 0) :
        ?>

        <p class="error <?php echo "active"; ?>"> Momentan nu exista niciun produs in baza de date. </p>
        <?php else : ?>

        <!-- Product View -->
        <table class="table">
            <thead>
                <tr>
                    <th> Nume produs </th>
                    <th> Categorie produs </th>
                    <th> Brand produs </th>
                    <th> Pret total </th>
                    <?php if ($products->fetch_assoc()["product_old_price"] != null) : ?>
                    <th> Pret redus </th>
                    <?php endif; ?>
                    <th> Stoc </th>
                    <th> Optiuni </th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($products as $product) :
                    ?>
                <tr>
                    <td> <?php echo $product["product_name"]; ?> </td>

                    <td> <?php echo $product["category_name"] ?> </td>

                    <td> <?php echo $product["brand_name"] ?> </td>

                    <td> <?php echo $product["product_price"]; ?> Lei </td>

                    <?php if ($product["product_old_price"] != null) : ?>
                    <td> <?php echo $product["product_old_price"]; ?> </td>
                    <?php endif; ?>

                    <td> <?php echo $product["product_stock"] ?> </td>

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
                                        data-product-id="<?php echo $product["productID"]; ?>">
                                        Editeaza </span>
                                </li>
                                <li>
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    <span class="productDeleteBtn"
                                        data-product-id="<?php echo $product["productID"]; ?>"> Sterge </span>
                                </li>
                                <li>
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                    <a href="productImages.php?productID=<?php echo $product["productID"]; ?>">
                                        Imagini
                                    </a>
                                </li>
                                <li>
                                    <i class="fa fa-book" aria-hidden="true"></i>
                                    <a href="productDescriptions.php?productID=<?php echo $product["productID"]; ?>">
                                        Descrieri
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
        foreach ($products as $product) :
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
                                value=" <?php echo $product["product_name"]; ?>" />

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
                                        value="<?php echo $product["product_price"]; ?>" />
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </div>

                                <p class="error"></p>
                            </div>

                            <div class="form__field__wrapper__column updateNetPrice">
                                <label class="netPriceLabel"> Pret net </label>
                                <p> 0 RON </p>
                            </div>
                        </div>

                        <?php if ($product["product_old_price"]) : ?>

                        <div class="form__field updateProductOldPrice">
                            <label for="updateProductOldPrice<?php echo $indexId; ?>"> Afiseaza o reducere de pret
                                pentru acest produs
                            </label>

                            <div class="form__switch">
                                <div class="active"></div>
                            </div>

                            <div class="oldPrice active">
                                <div class="oldPrice__wrapper">
                                    <input type="text" value="<?php echo $product["product_old_price"]; ?>"
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

                        <?php endif; ?>
                    </div>

                    <div class="form__group">
                        <div class="form__header">
                            <h2> Organizare catalog </h2>
                        </div>

                        <div class="form__field__dropdown updateProductCategory">
                            <label> Categorie </label>

                            <div class="form__field__dropdown__tab">
                                <span>
                                    <?php echo $product["category_name"]; ?> </span>
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
                                <span> <?php echo $product["brand_name"]; ?> </span>
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
                                        value="<?php echo $product["product_stock"]; ?>"
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

        <div class="modal delete">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <div class="modal__confirmation">
                    <p> Esti sigur ca vrei sa stergi categoria? </p>
                    <div class="modal__confirmation__actions">
                        <button type="button" id="confirm"> Da </button>
                        <button type="button" id="reject"> Nu </button>
                    </div>
                </div>
            </div>
        </div>
        <?php endforeach; ?>

        <div class="modal insert">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form productInsert">
                    <div class="form__group">
                        <div class="form__header">
                            <h2> Setari generale </h2>
                            <h3> Introdu setarile si informatiile de baza ale produsului. </h3>
                        </div>

                        <div class="form__field productName">
                            <label for="productName"> Nume produs </label>
                            <input type="text" name="productName" id="productName" />

                            <p class="error"></p>
                        </div>
                    </div>

                    <div class="form__group">
                        <div class="form__header">
                            <h2> Informatii pret </h2>
                            <h3> Introdu setarile si informatiile de pret pentru produs. </h3>
                        </div>

                        <div class="form__field__dropdown productPriceTax">
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
                            <div class="form__field__wrapper__column fullPrice">
                                <label for="fullPrice"> Pret total (taxe incluse) </label>

                                <div class="tool">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                    <input type="text" name="productPrice" id="fullPrice" value="0" />
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </div>

                                <p class="error"></p>
                            </div>

                            <div class="form__field__wrapper__column netPrice">
                                <label class="netPriceLabel"> Pret net </label>
                                <p> 0 RON </p>
                            </div>
                        </div>

                        <div class="form__field productOldPrice">
                            <label for="productOldPrice"> Afiseaza o reducere de pret pentru acest produs </label>

                            <div class="form__switch">
                                <div></div>
                            </div>

                            <div class="oldPrice">
                                <div class="oldPrice__wrapper">
                                    <input type="text" id="productOldPrice" value="0" />
                                    <span> RON </span>
                                </div>

                                <p class="info"> Introdu pretul vechi total al produsului. Discount-ul procentual va
                                    fi
                                    calculat
                                    automat, in functie de pretul vechi si pretul actual.
                                </p>
                            </div>

                            <p class="error"></p>
                        </div>
                    </div>

                    <div class="form__group productCatalog">
                        <div class="form__header">
                            <h2> Organizare catalog </h2>
                        </div>

                        <div class="form__field__dropdown productCategory">
                            <label> Categorie </label>

                            <div class="form__field__dropdown__tab">
                                <span> Selecteaza categoria </span>
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

                        <div class="form__field__dropdown productBrand">
                            <label> Producator </label>

                            <div class="form__field__dropdown__tab">
                                <span> Selecteaza producatorul </span>
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
                            <div class="form__field__wrapper__column productStock">
                                <label for="productStock"> Stoc produs </label>

                                <div class="tool">
                                    <i class="fa fa-minus" aria-hidden="true"></i>
                                    <input type="text" name="productStock" id="productStock" value="0" />
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                </div>

                                <p class="error"></p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal__footer">
                <button type="button" class="save"> Adauga </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>

        <button class="addBtn">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span> Adauga un produs nou </span>
        </button>
    </main>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/products.js" type="module"></script>
</body>

</html>