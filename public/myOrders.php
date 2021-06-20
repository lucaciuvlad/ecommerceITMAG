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
    <title> Comenzile mele </title>

    <?php
    require_once("./includes/fonts.inc.php");
    ?>
</head>

<body id="myOrders">
    <?php
    require_once("./includes/navigationBar.inc.php");
    require_once("./includes/notification.inc.php");
    require_once("./includes/loader.inc.php");
    require_once("./includes/userSideMenu.inc.php");
    require_once("./includes/stickyTopBtn.inc.php");

    if (isset($_SESSION["userID"])) {
        echo "<div id='userId' style='display: none;'data-user='$_SESSION[userID]'></div>";
    }
    ?>

    <main class="dashboard">
        <div class="dashboard__header">
            <h1> Comenzile mele </h1>
        </div>

        <?php
        $userID = $_SESSION["userID"];
        $userAccountHandler = new UserAccount($userID);
        $userInfo = $userAccountHandler->getUserDetails();
        $userAddress = $userAccountHandler->getUserAddress();
        $orders = $userAccountHandler->getUserOrders();
        ?>

        <?php
        if ($orders->num_rows == 0) {
            echo "<p class='error active'> Momentan nu exista nicio comanda. </p>";
        }
        ?>


        <?php
        foreach ($orders as $order) :
            $orderDetails = $userAccountHandler->getUserOrderDetails($order["orderId"]);
            $totalPrice = 0;
            $shippingTax = 0;
            $finalPrice = 0;

            foreach ($orderDetails as $orderDetail) {
                $totalPrice += $orderDetail["quantity"] * $orderDetail["product_price"];

                if ($totalPrice > 2500) {
                    $shippingTax = 0;
                    $finalPrice = $shippingTax + $totalPrice;
                } else {
                    $shippingTax = 15.99;
                    $finalPrice = $shippingTax + $totalPrice;
                }
            }
        ?>

        <div class="dashboard__orderCard">
            <div class="dashboard__orderCard__wrapper">
                <div class="dashboard__orderCard__wrapper__info">
                    <p> Comanda cu numarul <?php echo $order["orderId"]; ?> </p>

                    <p> Data: <?php echo $order["created_at"]; ?> </p>

                    <p class="newPrice">
                        <span> Total: </span>
                        <span> <?php echo $finalPrice; ?> </span>
                        <sup> </sup>
                        <span> Lei </span>
                    </p>

                    <p class="newPrice">
                        <span> Taxa livrare: </span>
                        <span> <?php echo $shippingTax; ?> </span>
                        <sup> </sup>
                        <span> Lei </span>
                    </p>
                </div>

                <button type="button" class="detailsCommand"> Detalii Comanda </button>
            </div>

            <div class="dashboard__orderCard__details">
                <h2> Detalii produse </h2>

                <?php
                    foreach ($orderDetails as $orderDetail) :
                    ?>
                <div class="product_details">
                    <img src="../admin/assets/imgs/<?php echo $orderDetail["product_image"]; ?>">
                    <p> <?php echo $orderDetail["product_name"]; ?> </p>
                    <p> Cantitate: <?php echo $orderDetail["quantity"]; ?> </p>
                    <p class="newPrice">
                        <span> Pret: </span>
                        <span> <?php echo $orderDetail["product_price"]; ?> </span>
                        <sup> </sup>
                        <span> Lei </span>
                    </p>
                </div>
                <?php endforeach; ?>

                <div class="user_details">
                    <h2> Detalii adresa </h2>
                    <p> Nume: <?php echo "$userInfo[user_first_name] $userInfo[user_last_name]"; ?> </p>
                    <p> Telefon: <?php echo $userAddress["user_phone_number"]; ?> </p>
                    <p> Email: <?php echo $userInfo["user_email"]; ?> </p>
                    <p> Adresa: <?php echo $userAddress["user_full_address"]; ?> </p>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </main>

    <?php
    require_once("./includes/footer.inc.php");
    ?>

    <script src="./assets/js/navigationBar.js" type="module"></script>
    <script src="./assets/js/myOrders.js" type="module"></script>
</body>

</html>