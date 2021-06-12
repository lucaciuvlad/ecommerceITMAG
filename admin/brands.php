<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

require_once("classes/brands.class.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="assets/css/main.css">
    <title> Administrare producatori </title>

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
    $brandsHandler = new Brands();
    $brands = $brandsHandler->selectBrands();
    ?>

    <main class="brands">
        <h1> Toti producatorii </h1>

        <button class="addBtn">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span> Adauga un nou producator </span>
        </button>

        <?php
        if ($brands->num_rows == 0) :
        ?>

        <p class="error <?php echo "active"; ?>"> Momentan nu exista niciun producator in baza de date. </p>
        <?php else : ?>

        <!-- Brands View -->
        <table class="table">
            <thead>
                <tr>
                    <th> Nume producator </th>
                    <th> Data adaugarii </th>
                    <th> Optiuni </th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($brands as $brand) :
                    ?>
                <tr>
                    <td> <?php echo $brand["brand_name"]; ?> </td>
                    <td> <?php echo $brand["brand_created_at"] ?> </td>

                    <td class="dropdown">
                        <div class="dropdown__tab">
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <div class="dropdown__actions">
                            <ul>
                                <li>
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    <span class="brandUpdateBtn" data-brand-id="<?php echo $brand["brandID"]; ?>">
                                        Editeaza </span>
                                </li>
                                <li>
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    <span class="brandDeleteBtn" data-brand-id="<?php echo $brand["brandID"]; ?>">
                                        Sterge </span>
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
        foreach ($brands as $brand) :
            $indexId++;
        ?>

        <div class="modal update">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form brandUpdate">
                    <div class="form__group">
                        <div class="form__field updateBrandName">
                            <label for="updateBrandName<?php echo $indexId; ?>"> Nume producator </label>
                            <input type="text" name="updateBrandName" id="updateBrandName<?php echo $indexId; ?>"
                                value=" <?php echo $brand["brand_name"]; ?>" />

                            <p class="error"></p>
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

        <div class="modal insert">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form brandInsert">
                    <div class="form__group">
                        <div class="form__field brandName">
                            <label for="brandName"> Nume producator </label>
                            <input type="text" name="brandName" id="brandName" />
                            <p class="error"></p>
                        </div>
                    </div>
                </form>
            </div>

            <div class="modal__footer">
                <button type="button" class="save"> Adauga </button>
                <button type="button" class="close"> Anuleaza </button>
            </div>
        </div>
    </main>

    <?php
    foreach ($brands as $brand) :
    ?>

    <div class="modal delete">
        <div class="modal__close">
            <i class="fa fa-times" aria-hidden="true"></i>
        </div>

        <div class="modal__content">
            <div class="modal__confirmation">
                <p> Esti sigur ca vrei sa stergi producatorul? </p>
                <div class="modal__confirmation__actions">
                    <button type="button" id="confirm"> Da </button>
                    <button type="button" id="reject"> Nu </button>
                </div>
            </div>
        </div>
    </div>

    <?php endforeach; ?>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/brands.js" type="module"></script>
</body>

</html>