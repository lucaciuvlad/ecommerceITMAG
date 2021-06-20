<?php
require_once("database.class.php");
require_once("validations.class.php");
?>

<?php
class UserAccount extends Database
{
    private $userId;

    public function __construct($UserId)
    {
        $this->userId = $UserId;
    }

    public function getFavoriteProducts()
    {
        $selectFavorites = "SELECT id FROM wishlists WHERE user_id = $this->userId";
        $favListId = $this->connect()->query($selectFavorites)->fetch_assoc()["id"];

        $selectFavProducts = "SELECT COUNT(product_id) AS favProductsCount FROM wishlist_details WHERE wishlist_id = $favListId";
        $favProductCount = $this->connect()->query($selectFavProducts)->fetch_assoc()["favProductsCount"];

        return $favProductCount;
    }

    public function getCartProducts()
    {
        $selectCartProducts = "SELECT id FROM carts WHERE user_id = $this->userId";
        $cartId = $this->connect()->query($selectCartProducts)->fetch_assoc()["id"];

        $selectCartProducts = "SELECT COUNT(product_id) AS cartProductsCount FROM cart_details WHERE cart_id = $cartId";
        $cartProductCount = $this->connect()->query($selectCartProducts)->fetch_assoc()["cartProductsCount"];


        return $cartProductCount;
    }

    public function getOrders()
    {
        $selectOrders = "SELECT COUNT(id) AS ordersCount FROM orders WHERE user_id = $this->userId";
        $ordersCount = $this->connect()->query($selectOrders)->fetch_assoc()["ordersCount"];

        return $ordersCount;
    }

    public function getUserDetails()
    {
        $selectUserDetails = "SELECT * FROM users WHERE id = $this->userId";
        $userDetails = $this->connect()->query($selectUserDetails)->fetch_assoc();

        return $userDetails;
    }

    public function getUserAddress()
    {
        $selectUserAddress = "SELECT * FROM user_addresses WHERE user_id = $this->userId";
        $userAddress = $this->connect()->query($selectUserAddress)->fetch_assoc();

        return $userAddress;
    }

    public function getUserOrders()
    {
        $selectOrders =
            "   SELECT	orders.id AS orderId, created_at
                FROM	orders
                WHERE	orders.user_id = $this->userId
            ";
        $orders = $this->connect()->query($selectOrders);

        return $orders;
    }

    public function getUserOrderDetails($orderId)
    {
        $selectOrderDetails =
            "   SELECT	quantity, product_name, product_price, product_image 
                FROM	orders, order_details, products, product_images
                WHERE	orders.user_id = $this->userId AND order_details.order_id = orders.id AND
                        orders.id = $orderId AND order_details.product_id = products.id AND
                        product_images.product_id = products.id
                GROUP BY order_details.product_id;
            ";
        $orderDetails = $this->connect()->query($selectOrderDetails);

        return $orderDetails;
    }

    public function updateUserPassword($oldPassword, $newPassword)
    {
        $selectOldPassword = "SELECT user_password FROM users WHERE id = $this->userId";
        $oldPasswordHash = $this->connect()->query($selectOldPassword)->fetch_assoc()["user_password"];

        if (password_verify($oldPassword, $oldPasswordHash)) {
            $updatePasswordSql = "UPDATE users SET user_password = ? WHERE id = ?";
            $updatePasswordStmt = $this->connect()->prepare($updatePasswordSql);
            $updatePasswordStmt->bind_param("si", $hashNewPassword, $this->userId);

            $hashNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            if ($updatePasswordStmt->execute()) {
                return true;
            } else {
                return false;
            }
        } else {
            return "Parola introdusa nu este corecta!";
        }
    }
}
?>

<?php
if (isset($_POST["oldPassword"]) && isset($_POST["newPassword"]) && isset($_POST["userId"])) {
    $userId = htmlentities($_POST["userId"]);
    $oldPassword = htmlentities($_POST["oldPassword"]);
    $newPassword = htmlentities($_POST["newPassword"]);

    $userAccountHandler = new UserAccount($userId);
    $updatePasswordResponse = $userAccountHandler->updateUserPassword($oldPassword, $newPassword);

    echo json_encode(array("isUpdated" => $updatePasswordResponse));
}
?>

<?php
if (isset($_POST["userId"]) && isset($_POST["checkUserAddress"]) && $_POST["checkUserAddress"]) {
    $userId = htmlentities($_POST["userId"]);
    $userAccountHandler = new UserAccount($userId);

    echo json_encode(array("userAddress" => $userAccountHandler->getUserAddress()));
}
?>