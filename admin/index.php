<?php
session_start();

if (!isset($_SESSION["adminName"])) {
    header("location: login.php");
}

require_once("./classes/dashboard.class.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Panou de control </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body>
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/sideMenu.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    ?>

    <main class="dashboard">
        <div class="dashboard__header">
            <h1> Panou de control </h1>
        </div>

        <?php
        $dashboardHandler = new Dashboard();
        $productsNumber = $dashboardHandler->getEntriesNumber("products", "productsNumber");
        $adminsNumber = $dashboardHandler->getEntriesNumber("admins", "adminsNumber");
        $usersNumber = $dashboardHandler->getEntriesNumber("users", "usersNumber");
        $categoriesNumber = $dashboardHandler->getEntriesNumber("categories", "categoriesNumber");
        $brandsNumber = $dashboardHandler->getEntriesNumber("brands", "brandsNumber");
        ?>

        <div class="dashboard__cards">
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Produse </p>
                    <span> <?php echo $productsNumber; ?> </span>
                </div>
                <div class="icon">
                    <i class="fa fa-pie-chart" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Categorii </p>
                    <span> <?php echo $categoriesNumber; ?> </span>
                </div>
                <div class="icon">
                    <i class="fa fa-pie-chart" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Producatori </p>
                    <span> <?php echo $brandsNumber; ?> </span>
                </div>
                <div class="icon">
                    <i class="fa fa-pie-chart" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Vanzari </p>
                    <span> 10 000 Lei </span>
                </div>
                <div class="icon">
                    <i class="fa fa-credit-card" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Comenzi </p>
                    <span> 100 </span>
                </div>
                <div class="icon">
                    <i class="fa fa-handshake-o" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Clienti </p>
                    <span> <?php echo $usersNumber; ?> </span>
                </div>
                <div class="icon">
                    <i class="fa fa-users" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Admini </p>
                    <span> <?php echo $adminsNumber; ?> </span>
                </div>
                <div class="icon">
                    <i class="fa fa-users" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </main>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/index.js" type="module"></script>
</body>

</html>