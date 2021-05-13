<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

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
    $categoriesHandler = new Categories();
    $categories = $categoriesHandler->selectCategories();
    ?>

    <main class="categories">
        <h1> Toate categoriile </h1>

        <?php
        if ($categories->num_rows == 0) :
        ?>

        <p class="error <?php echo "active"; ?>"> Momentan nu exista nicio categorie in baza de date. </p>
        <?php else : ?>

        <!-- Delete Modal Confirmation -->
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

        <!-- Category View -->
        <table class="table">
            <thead>
                <tr>
                    <th> Nume categorie </th>
                    <th> Iconita categorie </th>
                    <th> Data adaugarii </th>
                    <th> Optiuni </th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($categories as $category) :
                    ?>
                <tr>
                    <td> <?php echo $category["category_name"]; ?> </td>
                    <td>
                        <i class="fa <?php echo $category["category_icon"] ?>"></i>
                    </td>
                    <td> <?php echo $category["category_created_at"] ?> </td>

                    <td class="dropdown">
                        <div class="dropdown__tab">
                            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                            <i class="fa fa-caret-down" aria-hidden="true"></i>
                        </div>
                        <div class="dropdown__actions">
                            <ul>
                                <li>
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                    <span class="categoryUpdateBtn"
                                        data-category-id="<?php echo $category["categoryID"]; ?>">
                                        Editeaza </span>
                                </li>
                                <li>
                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                    <span class="categoryDeleteBtn"
                                        data-category-id="<?php echo $category["categoryID"]; ?>"> Sterge </span>
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
        foreach ($categories as $category) :
            $indexId++;
        ?>

        <!-- Update Modal Form -->
        <div class="modal update">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form categoryUpdate">
                    <div class="form__group generalSettings">
                        <div class="form__header">
                            <h2> Setari generale </h2>
                            <h3> Introdu setarile si informatiile de baza ale categoriei. </h3>
                        </div>

                        <div class="form__field updateCategoryName">
                            <label for="updateCategoryName<?php echo $indexId; ?>"> Nume categorie </label>
                            <input type="text" name="updateCategoryName" id="updateCategoryName<?php echo $indexId; ?>"
                                value=" <?php echo $category["category_name"]; ?>" />

                            <p class="error"></p>
                        </div>

                        <div class="form__field updateCategoryIcon">
                            <label for="updateCategoryIcon<?php echo $indexId; ?>"> Nume categorie </label>
                            <input type="text" name="updateCategoryIcon" id="updateCategoryIcon<?php echo $indexId; ?>"
                                value=" <?php echo $category["category_icon"]; ?>" />

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

        <!-- Product Insert -->
        <div class="modal insert">
            <div class="modal__close">
                <i class="fa fa-times" aria-hidden="true"></i>
            </div>

            <div class="modal__content">
                <form class="form categoryInsert">
                    <div class="form__group generalSettings">
                        <div class="form__header">
                            <h2> Setari generale </h2>
                            <h3> Introdu setarile si informatiile de baza ale categoriei. </h3>
                        </div>

                        <div class="form__field categoryName">
                            <label for="categoryName"> Nume categorie </label>
                            <input type="text" name="categoryName" id="categoryName" />

                            <p class="error"></p>
                        </div>
                    </div>

                    <div class="form__group generalSettings">
                        <div class="form__header">
                            <h2> Setari generale </h2>
                            <h3> Introdu setarile si informatiile de baza ale categoriei. </h3>
                        </div>

                        <div class="form__field categoryIcon">
                            <label for="categoryIcon"> Iconita categorie </label>
                            <input type="text" name="categoryIcon" id="categoryIcon" />

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

        <button class="addBtn">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <span> Adauga o noua categorie </span>
        </button>
    </main>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/categories.js" type="module"></script>
</body>

</html>