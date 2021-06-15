<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

require_once "classes/products.class.php";
require_once "classes/productSpecifications.class.php";

if (!isset($_GET["productID"])) {
    header("location: products.php");
} else {
    $productID = htmlentities($_GET["productID"]);

    $productHandle = new Products();
    $productHandle->setProductId($productID);
    $productInfo = $productHandle->selectProduct()->fetch_assoc();

    $productSpecificationsHandle = new ProductSpecifications();
    $productSpecificationsHandle->setProductId($productID);
    $productSpecifications = $productSpecificationsHandle->selectProductSpecifications();
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

    <main class="productSpecifications">
        <h1> Specificatii produs - <?php echo $productInfo["product_name"]; ?> </h1>

        <button class="addBtn" data-product-id=<?php echo $productID; ?>>
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span> Adauga un nou set de specificatii </span>
        </button>

        <?php if ($productSpecifications->num_rows == 0) : ?>
        <p class="error <?php echo 'active'; ?>"> Momentan nu exista specificatii asociate produsului </p>
        <?php else : ?>


        <table class="table">
            <thead>
                <th> Cheie specificatie </th>
                <th> Valoare specificatie </th>
                <th> Actiuni </th>
            </thead>

            <tbody>
                <?php foreach ($productSpecifications as $productSpecification) : ?>

                <tr>
                    <td>
                        <?php echo $productSpecification["product_specification_key"]; ?>
                    </td>
                    <td>
                        <?php echo $productSpecification["product_specification_value"]; ?>
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
                                    <span class="productSpecificationUpdateBtn"
                                        data-product-spec-id="<?php echo $productSpecification["productSpecificationID"]; ?>">
                                        Editeaza </span>
                                </li>
                                <li>
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    <span
                                        data-product-spec-id="<?php echo $productSpecification["productSpecificationID"]; ?>"
                                        class="productSpecificationDeleteBtn">
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
        foreach ($productSpecifications as $productSpecification) :
            $indexId++;
        ?>

        <div class="modal update">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form updateProductSpec">
                    <div class="form__field updateProductSpecKey">
                        <label for="productSpecKey<?php echo $indexId; ?>"> Cheie specificatie </label>
                        <input type="text" id="productSpecKey<?php echo $indexId; ?>" name="updateProductSpecKey"
                            value="<?php echo $productSpecification["product_specification_key"]; ?>" />
                        <p class="error"></p>
                    </div>

                    <div class="form__field updateProductSpecValue">
                        <label for="productSpecValue<?php echo $indexId; ?>"> Valoare specificatie </label>
                        <input type="text" id="productSpecValue<?php echo $indexId; ?>" name="updateProductSpecValue"
                            value="<?php echo $productSpecification["product_specification_value"]; ?>" />
                        <p class="error"></p>
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
                <form class="form insertProductSpec">
                    <div class="form__field productSpecKey">
                        <label for="productSpecKey"> Cheie specificatie </label>
                        <input type="text" id="productSpecKey" name="productSpecKey"></input>
                        <p class="error"></p>
                    </div>

                    <div class="form__field productSpecValue">
                        <label for="productSpecValue"> Valoare specificatie </label>
                        <input type="text" id="productSpecValue" name="productSpecValue"></input>
                        <p class="error"></p>
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
    foreach ($productSpecifications as $productSpecification) :
    ?>

    <div class="modal delete">
        <div class="modal__close">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div class="modal__content">
            <div class="modal__confirmation">
                <p> Esti sigur ca vrei sa stergi specificatia produsului? </p>
                <div class="modal__confirmation__actions">
                    <button type="button" id="confirm"> Da </button>
                    <button type="button" id="reject"> Nu </button>
                </div>
            </div>
        </div>
    </div>

    <?php endforeach; ?>

    <script src="assets/js/productSpecifications.js" type="module"></script>
</body>

</html>