<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

require_once "classes/products.class.php";
require_once "classes/productImages.class.php";

if (!isset($_GET["productID"])) {
    header("location: products.php");
} else {
    $productID = htmlentities($_GET["productID"]);

    $productHandle = new Products();
    $productHandle->setProductId($productID);
    $productInfo = $productHandle->selectProduct()->fetch_assoc();

    $productImagesHandle = new ProductImages();
    $productImagesHandle->setProductId($productID);
    $productImages = $productImagesHandle->selectProductImages();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/main.css">
    <title> Imagini produs </title>

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

    <main class="productImages">
        <h1> Imagini produs - <?php echo $productInfo["product_name"]; ?> </h1>

        <?php if ($productImages->num_rows == 0) : ?>
        <p class="error <?php echo 'active'; ?>"> Momentan nu exista nicio imagine asociata produsului </p>
        <?php else : ?>


        <table class="table">
            <thead>
                <th> Imagine produs </th>
                <th> Actiuni </th>
            </thead>

            <tbody>
                <?php foreach ($productImages as $productImage) : ?>

                <tr>
                    <td class="image">
                        <img src="assets/imgs/<?php echo $productImage["product_image"]; ?>" />

                        <div class="tooltip">
                            <i class="fa fa-caret-left"></i>
                            <p> Vezi imaginea </p>
                        </div>

                        <div class="modal peek">
                            <div class="modal__close">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </div>

                            <div class="modal__content">
                                <img src="assets/imgs/<?php echo $productImage["product_image"]; ?>" />
                            </div>
                        </div>
                    </td>
                    <td class="dropdown">
                        <div class="dropdown__tab">
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <div class="dropdown__actions">
                            <ul>

                                <li>
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    <span data-product-image-id="<?php echo $productImage["productImageID"]; ?>"
                                        class="productImageDeleteBtn">
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

        <div class="modal insert">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form">
                    <div class="form__group">
                        <div class="form__header">
                        </div>

                        <div class="form__field productImgFiles">
                            <label for="file"> Imagini </label>

                            <div class="form__field__file">
                                <div class="form__field__file__images"></div>

                                <label for="file">
                                    <i class="fa fa-picture-o" aria-hidden="true"></i>
                                    <span> Selecteaza imagini </span>
                                </label>

                                <input type="file" id="file" multiple />
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

        <button class="addBtn" data-product-id=<?php echo $productID; ?>>
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span> Adauga o noua imagine </span>
        </button>
    </main>

    <?php
    foreach ($productImages as $productImage) :
    ?>

    <div class="modal delete">
        <div class="modal__close">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div class="modal__content">
            <div class="modal__confirmation">
                <p> Esti sigur ca vrei sa stergi imaginea produsului? </p>
                <div class="modal__confirmation__actions">
                    <button type="button" id="confirm"> Da </button>
                    <button type="button" id="reject"> Nu </button>
                </div>
            </div>
        </div>
    </div>

    <?php endforeach; ?>

    <script src="assets/js/productImages.js" type="module"></script>
</body>

</html>