<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

require_once "classes/products.class.php";
require_once "classes/productDescriptions.class.php";

if (!isset($_GET["productID"])) {
    header("location: products.php");
} else {
    $productID = htmlentities($_GET["productID"]);

    $productHandle = new Products();
    $productHandle->setProductId($productID);
    $productInfo = $productHandle->selectProduct()->fetch_assoc();

    $productDescriptionsHandle = new ProductDescriptions();
    $productDescriptionsHandle->setProductId($productID);
    $productDescriptions = $productDescriptionsHandle->selectProductDescriptions();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/main.css">
    <title> <?php echo $productInfo["product_name"]; ?> </title>

    <?php
    require_once("includes/fonts.inc.php");
    ?>
</head>

<body>
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/sideMenu.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/notification.inc.php");
    ?>

    <main class="productDescriptions">
        <h1> Descrieri produs - <?php echo $productInfo["product_name"]; ?> </h1>

        <button class="addBtn" data-product-id=<?php echo $productID; ?>>
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span> Adauga o noua descriere </span>
        </button>

        <?php if ($productDescriptions->num_rows == 0) : ?>
        <p class="error <?php echo 'active'; ?>"> Momentan nu exista descrieri asociate produsului </p>
        <?php else : ?>


        <table class="table">
            <thead>
                <th> Imagine descriere </th>
                <th> Titlu descriere </th>
                <th> Corp descriere </th>
                <th> Actiuni </th>
            </thead>

            <tbody>
                <?php foreach ($productDescriptions as $productDescription) : ?>

                <tr>
                    <td class="image">
                        <img src="assets/imgs/<?php echo $productDescription["product_description_image"]; ?>" />

                        <div class="tooltip">
                            <i class="fa fa-caret-left"></i>
                            <p> Vezi imaginea </p>
                        </div>

                        <div class="modal peek">
                            <div class="modal__close">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>

                            <div class="modal__content">
                                <img
                                    src="assets/imgs/<?php echo $productDescription["product_description_image"]; ?>" />
                            </div>
                        </div>
                    </td>
                    <td class="productDescriptionTitle">
                        <?php echo $productDescription["product_description_title"]; ?>
                    </td>
                    <td class="productDescriptionBody">
                        <?php echo $productDescription["product_description_body"]; ?>
                    </td>
                    <td class="dropdown">
                        <div class="dropdown__tab">
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <div class="dropdown__actions">
                            <ul>
                                <li>
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    <span class="productDescriptionUpdateBtn"
                                        data-product-desc-id="<?php echo $productDescription["productDescriptionID"]; ?>">
                                        Editeaza </span>
                                </li>
                                <li>
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    <span
                                        data-product-desc-id="<?php echo $productDescription["productDescriptionID"]; ?>"
                                        class="productDescriptionDeleteBtn">
                                        Sterge
                                    </span>
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
        foreach ($productDescriptions as $productDescription) :
            $indexId++;
        ?>

        <div class="modal update">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form updateProductDescription">
                    <div class="form__group">
                        <div class="form__header">
                            <h2> Setari generale </h2>
                            <h3> Introdu informatiile necesare pentru descrierea produsului. </h3>
                        </div>

                        <div class="form__field updateProductTitleDescription">
                            <label for="roductTitle<?php echo $indexId; ?>"> Titlu descriere </label>
                            <textarea id="productTitle<?php echo $indexId; ?>"
                                name="updateProductDescTitle"><?php echo $productDescription["product_description_title"]; ?></textarea>
                            <p class="error"></p>
                        </div>

                        <div class="form__field updateProductBodyDescription">
                            <label for="productBody<?php echo $indexId; ?>"> Corp descriere </label>
                            <textarea id="productBody<?php echo $indexId; ?>"
                                name="updateProductDescBody"><?php echo $productDescription["product_description_body"]; ?></textarea>
                            <p class="error"></p>
                        </div>
                    </div>

                    <div class="form__group">
                        <div class="form__header">
                            <h3> Introdu poza specifica descrierii curente </h3>
                        </div>

                        <div class="form__field updateProductDescImgFile">
                            <label for="file"> Imagine descriere </label>

                            <div class="form__field__file">
                                <div class="form__field__file__images">
                                    <div class="form__field__file__images__image">
                                        <button type="button" data-purpose="delete">
                                            <i class="fa fa-trash-o"></i>
                                        </button>
                                        <img
                                            src="./assets/imgs/<?php echo $productDescription["product_description_image"]; ?>">
                                        <span> <?php echo $productDescription["product_description_image"]; ?>
                                        </span>
                                    </div>
                                </div>

                                <label for="file<?php echo $indexId; ?>">
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                    <span> Selecteaza o imagine </span>
                                </label>

                                <input type="file" id="file<?php echo $indexId; ?>" />
                            </div>

                            <p class="error"> </p>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal__footer">
                <button type="button" class="save"> Salveaza </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>

        <?php endforeach; ?>

        <div class="modal insert">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form insertProductDescription">
                    <div class="form__group">
                        <div class="form__header">
                            <h2> Setari generale </h2>
                            <h3> Introdu informatiile necesare pentru descrierea produsului. </h3>
                        </div>

                        <div class="form__field productTitleDescription">
                            <label for="productTitle"> Titlu descriere </label>
                            <textarea id="productTitle" name="productDescTitle"></textarea>
                            <p class="error"></p>
                        </div>

                        <div class="form__field productBodyDescription">
                            <label for="productBody"> Corp descriere </label>
                            <textarea id="productBody" name="productDescBody"></textarea>
                            <p class="error"></p>
                        </div>
                    </div>

                    <div class="form__group">
                        <div class="form__header">
                            <h3> Introdu poza specifica descrierii curente </h3>
                        </div>

                        <div class="form__field productDescImgFile">
                            <label for="file"> Imagine descriere </label>

                            <div class="form__field__file">
                                <div class="form__field__file__images"></div>

                                <label for="file">
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                    <span> Selecteaza o imagine </span>
                                </label>

                                <input type="file" id="file" />
                            </div>

                            <p class="error"> </p>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal__footer">
                <button type="button" class="save"> Salveaza </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>
    </main>

    <?php
    foreach ($productDescriptions as $productDescription) :
    ?>

    <div class="modal delete">
        <div class="modal__close">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div class="modal__content">
            <div class="modal__confirmation">
                <p> Esti sigur ca vrei sa stergi descrierea produsului? </p>
                <div class="modal__confirmation__actions">
                    <button type="button" id="confirm"> Da </button>
                    <button type="button" id="reject"> Nu </button>
                </div>
            </div>
        </div>
    </div>

    <?php endforeach; ?>

    <script src="assets/js/productDescriptions.js" type="module"></script>
</body>

</html>