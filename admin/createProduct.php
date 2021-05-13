<?php
session_start();

if (!isset($_SESSION["adminName"]))
    header("location: login.php");
?>

<?php
require_once("classes/categories.class.php");
$cat = new Categories();

require_once("classes/brands.class.php");
$br = new Brands();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/main.css">
    <title> Adauga produs </title>

    <?php
    require_once("includes/fonts.inc.php");
    ?>
</head>

<body>
    <?php
    require_once("includes/navigationBar.inc.php");
    require_once("includes/sideMenu.inc.php");
    require_once("includes/notification.inc.php");
    ?>

    <main class="newProduct">
        <h1> Adauga produs </h1>

        <form class="basicForm insertProductForm" method="POST" enctype="multipart/form-data">
            <section class="basicForm__section generalSettings">
                <header>
                    <h2> Setari generale </h2>
                    <h3> Introdu setarile si informatiile de baza ale produsului </h3>
                </header>

                <div class="basicForm__field productName">
                    <label for="productName"> Nume produs </label>
                    <input type="text" id="productName" name="productName" />
                    <p class="error"></p>
                </div>
            </section>

            <section class="basicForm__section productInfo">
                <header>
                    <h2> Informatii pret </h2>
                    <h3> Introdu setarile si informatiile de pret pentru produs </h3>
                </header>

                <div class="basicForm__dropdownField productPrice">
                    <label> Taxa aplicata </label>

                    <div class="basicForm__dropdownField__input">
                        <span> TVA - 19% </span>
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>

                    <div class="basicForm__dropdownField__options">
                        <p> Nu se aplica nicio taxa </p>
                        <p class="active"> TVA - 19% </p>
                    </div>
                </div>

                <div class="basicForm__field__wrapper">
                    <div class="column price">
                        <label> Pret total (taxe incluse) </label>

                        <div class="step">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                            <input type="text" value="0" name="productPrice" />
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </div>

                        <p class="error"> </p>
                    </div>

                    <div class="column netPrice">
                        <label> Pret net </label>
                        <div>
                            <span> 0 </span>
                            <span> RON </span>
                        </div>
                    </div>

                    <p class="info"> Introdu pretul total al produsului, cu taxe incluse. </p>
                </div>

                <div class="basicForm__field productPromo">
                    <label> Afiseaza reducere de pret pentru acest produs </label>

                    <div class="basicForm__field__toggle">
                        <div></div>
                    </div>

                    <div class="oldPrice">
                        <input type="" name="productOldPrice" />
                        <span> RON </span>
                        <p class="info"> Introdu pretul vechi total al produsului. </p>
                    </div>

                    <p class="error"></p>
                </div>
            </section>

            <section class="basicForm__section productOrganization">
                <header>
                    <h2> Organizare catalog </h2>
                    <h3> Introdu preferintele cu privire la incadrarea produsului in catalogul de produse </h3>
                </header>

                <div class="basicForm__dropdownField productCategory">
                    <label> Categorie </label>

                    <div class="basicForm__dropdownField__input">
                        <span> Selecteaza categorie </span>
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>

                    <p class="error"> </p>

                    <div class="basicForm__dropdownField__options">
                        <?php
                        $categories = $cat->selectCategories();

                        if ($categories->num_rows > 0) {
                            while ($category = $categories->fetch_assoc()) {
                                $outputCategory = "<p data-id=\"$category[id]\"> $category[category_name] </p>";
                                echo $outputCategory;
                            }
                        }
                        ?>
                    </div>
                </div>

                <div class="basicForm__dropdownField productBrand">
                    <label> Producator </label>

                    <div class="basicForm__dropdownField__input">
                        <span> Selecteaza producator </span>
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>

                    <p class="error"> </p>

                    <div class="basicForm__dropdownField__options">
                        <?php
                        $brands = $br->selectBrands();

                        if ($brands->num_rows > 0) {
                            while ($brand = $brands->fetch_assoc()) {
                                $outputBrand = "<p data-id=\"$brand[id]\"> $brand[brand_name] </p>";
                                echo $outputBrand;
                            }
                        }
                        ?>
                    </div>
                </div>

                <div class="basicForm__field__wrapper productState">
                    <div class="column">
                        <label for="productState"> Stoc produs </label>

                        <div class="step">
                            <i class="fa fa-minus" aria-hidden="true"></i>
                            <input type="text" id="productState" value="0" name="productState" />
                            <i class="fa fa-plus" aria-hidden="true"></i>
                        </div>

                        <p class="error"></p>
                    </div>
                </div>
            </section>

            <section class="basicForm__section images">
                <header>
                    <h2> Imagini </h2>
                    <h3> Incarca imaginile asociate acestui produs </h3>
                </header>

                <div class="basicForm__field productImages">
                    <label> Imagini </label>

                    <div class="basicForm__field__images">
                    </div>

                    <div class="basicForm__field__file">
                        <label for="file">
                            <i class="fa fa-picture-o" aria-hidden="true"></i>
                            <span> Selecteaza imagini </span>
                            <p>
                                <i class="fa fa-search" aria-hidden="true"></i>
                                <span> Selecteaza </span>
                            </p>
                        </label>

                        <input type="file" id="file" multiple />
                    </div>

                    <p class="error"> Mesaj de eroare </p>
                </div>
            </section>

            <div class="basicForm__footer">
                <button type="submit" id="insertProduct"> Salveaza </button>
                <a href="dashboard.php"> Anuleaza </a>
            </div>
        </form>
    </main>

    <script src="./assets/js/createProduct.js" type="module"></script>
</body>

</html>