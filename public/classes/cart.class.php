<?php
require_once("database.class.php");
require_once("wishlist.class.php");

class Cart extends Database
{
    private $userId;
    private $productId;
    private $quantity;

    public function __construct($UserId, $ProductId)
    {
        $this->userId = $UserId;
        $this->productId = $ProductId;
    }

    public function setQuantity($Quantity)
    {
        $this->quantity = $Quantity;
    }

    public function insertLocalCartProducts()
    {
        $selectProductId = "SELECT product_id FROM carts WHERE product_id = ? AND user_id = ?";
        $selectProductIdStmt = $this->connect()->prepare($selectProductId);
        $selectProductIdStmt->bind_param("ii", $this->productId, $this->userId);

        if ($selectProductIdStmt->execute()) {
            $productId = $selectProductIdStmt->get_result();
            if ($productId->num_rows == 0) {
                $insertProductId = "INSERT INTO carts(product_id, user_id) VALUES($this->productId, $this->userId)";
                if ($this->connect()->query($insertProductId)) {
                    return true;
                } else {
                    return false;
                }
            }
        }

        $selectProductIdStmt->close();
        $this->connect()->close();
    }

    public function insertCartProduct()
    {
        $insertSql = "INSERT INTO carts(product_id, user_id) VALUES(?, ?)";
        $insertStmt = $this->connect()->prepare($insertSql);
        $insertStmt->bind_param("ii", $this->productId, $this->userId);

        if ($insertStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $insertStmt->close();
        $this->connect()->close();
    }

    public function updateCartQuantity()
    {
        $updateSql =
            "   UPDATE  carts 
                SET     cart_quantity = $this->quantity 
                WHERE   product_id = $this->productId AND user_id = $this->userId
            ";
        if ($this->connect()->query($updateSql)) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteCartProduct()
    {
        $deleteSql = "DELETE FROM carts WHERE product_id = ? AND user_id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("ii", $this->productId, $this->userId);

        if ($deleteStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $deleteStmt->close();
        $this->connect()->close();
    }
}
?>

<?php
// Insert Available Cart Products From Local Storage When User Is Logged In
if (isset($_POST["userID"]) && isset($_POST["cartProducts"])) {
    $userID = htmlentities($_POST["userID"]);
    $cartProducts = explode(",", htmlentities($_POST["cartProducts"]));

    foreach ($cartProducts as $cartProduct) {
        $cartHandler = new Cart($userID, $cartProduct);
        $insertResponse = $cartHandler->insertLocalCartProducts();
        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
// Insert Cart Product
if (isset($_POST["productID"]) && isset($_POST["userID"]) && isset($_POST["cartInsert"])) {
    if (json_decode($_POST["cartInsert"]) === true) {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $cartHandler = new Cart($userID, $productID);
        $insertResponse = $cartHandler->insertCartProduct();
        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
// Delete Cart Product
if (isset($_POST["productID"]) && isset($_POST["userID"]) && isset($_POST["cartDelete"])) {
    if (json_decode($_POST["cartDelete"]) === true) {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $cartHandler = new Cart($userID, $productID);
        $deleteResponse = $cartHandler->deleteCartProduct();
        echo json_encode(array("isDeleted" => $deleteResponse));
    }
}
?>

<?php
// From Cart To Wishlist
if (isset($_POST["userID"]) && isset($_POST["productID"]) && isset($_POST["toWishlist"])) {
    if ($_POST["toWishlist"] == true) {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $wishlistHandler = new Wishlist($userID, $productID);
        if ($wishlistHandler->insertWishlistProduct()) {
            echo json_encode(array("isInserted" => true));
        }

        $cartHandler = new Cart($userID, $productID);
        $cartHandler->deleteCartProduct();
    }
}
?>

<?php
// Update Cart Quantity
if (isset($_POST["newQuantity"]) && isset($_POST["productId"]) && isset($_POST["userId"])) {
    $newQuantity = htmlentities($_POST["newQuantity"]);
    $productId = htmlentities($_POST["productId"]);
    $userId = htmlentities($_POST["userId"]);

    $cartHandler = new Cart($userId, $productId);
    $cartHandler->setQuantity($newQuantity);
    $updateResponse = $cartHandler->updateCartQuantity();

    echo json_encode(array("isUpdated" => $updateResponse));
}
?>