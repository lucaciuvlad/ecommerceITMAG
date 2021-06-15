<?php
require_once("database.class.php");
require_once("wishlist.class.php");
?>

<?php
class Cart extends Database
{
    private $userId;

    public function __construct($UserId)
    {
        $this->userId = $UserId;
    }

    public function getUserCart()
    {
        $selectSql = "SELECT id FROM carts WHERE user_id = ?";
        $selectStmt = $this->connect()->prepare($selectSql);
        $selectStmt->bind_param("i", $this->userId);
        if ($selectStmt->execute()) {
            $cart = $selectStmt->get_result();
            return $cart;
        }
    }

    public function createCart()
    {
        $insertSql = "INSERT INTO carts(user_id) VALUES(?)";
        $insertStmt = $this->connect()->prepare($insertSql);
        $insertStmt->bind_param("i", $this->userId);

        if ($insertStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>

<?php
class CartDetails extends Database
{
    private $cartId;
    private $productId;
    private $quantity;

    public function __construct($CartId, $ProductId)
    {
        $this->cartId = $CartId;
        $this->productId = $ProductId;
    }

    public function setQuantity($Quantity)
    {
        $this->quantity = $Quantity;
    }

    public function insertCartDetails()
    {
        $selectProductSql = "SELECT product_id FROM cart_details WHERE product_id = ?";
        $selectProductStmt = $this->connect()->prepare($selectProductSql);
        $selectProductStmt->bind_param("i", $this->productId);

        if ($selectProductStmt->execute()) {
            $product = $selectProductStmt->get_result();

            if ($product->num_rows == 0) {
                $insertSql = "INSERT INTO cart_details(cart_id, product_id) VALUES(?, ?)";
                $insertStmt = $this->connect()->prepare($insertSql);
                $insertStmt->bind_param("ii", $this->cartId, $this->productId);

                if ($insertStmt->execute()) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        }
    }

    public function deleteCartDetails()
    {
        $deleteSql = "DELETE FROM cart_details WHERE product_id = ? AND cart_id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("ii", $this->productId, $this->cartId);

        if ($deleteStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateCartQuantity()
    {
        $updateSql = "UPDATE cart_details SET quantity = ? WHERE product_id = ? AND cart_id = ?";
        $updateStmt = $this->connect()->prepare($updateSql);
        $updateStmt->bind_param("iii", $this->quantity, $this->productId, $this->cartId);

        if ($updateStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>

<?php
// Insert Local Cart Products
if (isset($_POST["userID"]) && isset($_POST["cartProducts"])) {
    $userID = htmlentities($_POST["userID"]);
    $cartProducts = explode(",", htmlentities($_POST["cartProducts"]));

    $cartHandler = new Cart($userID);
    $userCart = $cartHandler->getUserCart();

    if ($userCart->num_rows != 0) {
        $userCartId = $userCart->fetch_assoc()["id"];

        foreach ($cartProducts as $cartProduct) {
            $cartDetailsHandler = new CartDetails($userCartId, $cartProduct);
            $insertResponse = $cartDetailsHandler->insertCartDetails();
        }
        echo json_encode(array("isInserted" => $insertResponse));
    } else {
        $cartHandler->createCart();
        $createdCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

        foreach ($cartProducts as $cartProduct) {
            $cartDetailsHandler = new CartDetails($createdCartId, $cartProduct);
            $insertResponse = $cartDetailsHandler->insertCartDetails();
        }
        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
// Insert Product Into Cart
if (isset($_POST["userID"]) && isset($_POST["productID"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "insertCartProduct") {
        $userId = htmlentities($_POST["userID"]);
        $productId = htmlentities($_POST["productID"]);

        $cartHandler = new Cart($userId);
        $userCart = $cartHandler->getUserCart();

        if ($userCart->num_rows != 0) {
            $userCartId = $userCart->fetch_assoc()["id"];

            $cartDetailsHandler = new CartDetails($userCartId, $productId);
            $insertResponse = $cartDetailsHandler->insertCartDetails();
            echo json_encode(array("isInserted" => $insertResponse));
        } else {
            $cartHandler->createCart();
            $createdCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

            $cartDetailsHandler = new CartDetails($createdCartId, $productId);
            $insertResponse = $cartDetailsHandler->insertCartDetails();
            echo json_encode(array("isInserted" => $insertResponse));
        }
    }
}
?>

<?php
// Remove Product From Cart
if (isset($_POST["userID"]) && isset($_POST["productID"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "deleteCartProduct") {
        $userId = htmlentities($_POST["userID"]);
        $productId = htmlentities($_POST["productID"]);

        $cartHandler = new Cart($userId);
        $userCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

        $cartDetailsHandler = new CartDetails($userCartId, $productId);
        $deleteResponse = $cartDetailsHandler->deleteCartDetails();
        echo json_encode(array("isDeleted" => $deleteResponse));
    }
}
?>

<?php
// From Cart To Wishlist
if (isset($_POST["userID"]) && isset($_POST["productID"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "toWishlist") {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $wishlistHandler = new Wishlist($userID);
        $userWishlist = $wishlistHandler->getUserWishlists();

        if ($userWishlist->num_rows == 0) {
            $wishlistHandler->createWishlist();
            $createdWishlistId = $wishlistHandler->getUserWishlists()->fetch_assoc()["id"];

            $wishlistDetailsHandler = new WishlistDetails($createdWishlistId, $productID);
            $insertResponse = $wishlistDetailsHandler->insertWishlistDetails();
            echo json_encode(array("isInserted" => true));

            $cartHandler = new Cart($userID);
            $userCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

            $cartDetailsHandler = new CartDetails($userCartId, $productID);
            $cartDetailsHandler->deleteCartDetails();
        } else {
            $userWishlistId = $userWishlist->fetch_assoc()["id"];

            $wishlistDetailsHandler = new WishlistDetails($userWishlistId, $productID);
            $insertResponse = $wishlistDetailsHandler->insertWishlistDetails();
            echo json_encode(array("isInserted" => true));

            $cartHandler = new Cart($userID);
            $userCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

            $cartDetailsHandler = new CartDetails($userCartId, $productID);
            $cartDetailsHandler->deleteCartDetails();
        }
    }
}
?>

<?php
// Update Cart Quantity
if (isset($_POST["newQuantity"]) && isset($_POST["productId"]) && isset($_POST["userId"])) {
    $newQuantity = htmlentities($_POST["newQuantity"]);
    $productId = htmlentities($_POST["productId"]);
    $userId = htmlentities($_POST["userId"]);

    $cartHandler = new Cart($userId);
    $userCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

    $cartDetailsHandler = new CartDetails($userCartId, $productId);
    $cartDetailsHandler->setQuantity($newQuantity);
    $updateResponse = $cartDetailsHandler->updateCartQuantity();
    echo json_encode(array("isUpdated" => $updateResponse));
}
?>