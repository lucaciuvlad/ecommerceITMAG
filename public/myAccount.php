<?php
session_start();

if (!isset($_SESSION["userID"])) {
    header("location: login.php");
}

require_once("classes/userAccount.class.php");
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./assets/css/main.css">
    <title> Contul meu </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="myAccount">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/userSideMenu.inc.php");

    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none;'data-user='$_SESSION[userID]'></div>";
    }
    ?>

    <main class="dashboard">
        <div class="dashboard__header">
            <h1> Activitatea mea </h1>
        </div>

        <?php
        $userID = $_SESSION["userID"];
        $userAccountHandler = new UserAccount($userID);
        $favProducts = $userAccountHandler->getFavoriteProducts();
        $cartProducts = $userAccountHandler->getCartProducts();
        ?>

        <div class="dashboard__cards">
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Favorite </p>
                    <span> <?php echo $favProducts; ?> </span>
                </div>
                <div class="icon">
                    <i class="fa fa-heart" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Produse in cos </p>
                    <span> <?php echo $cartProducts; ?> </span>
                </div>
                <div class="icon">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                </div>
            </div>
            <div class="dashboard__cards__card">
                <div class="info">
                    <p> Comenzi plasate </p>
                    <span> 0 </span>
                </div>
                <div class="icon">
                    <i class="fa fa-credit-card" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    </main>

    <?php
    require_once("./includes/footer.inc.php");
    ?>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/myAccount.js" type="module"></script>
</body>

</html>