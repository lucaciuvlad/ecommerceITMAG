<?php
require_once("./database.class.php");
require_once("./cart.class.php");

class Wishlists extends Database
{
    private $userId;
    private $productId;

    public function __construct($UserId, $ProductId)
    {
        $this->userId = $UserId;
        $this->productId = $ProductId;
    }

    public function insertLocalFavProducts()
    {
        $selectProductId = "SELECT product_id FROM wishlists WHERE product_id = ? AND user_id = ?";
        $selectProductIdStmt = $this->connect()->prepare($selectProductId);
        $selectProductIdStmt->bind_param("ii", $this->productId, $this->userId);

        if ($selectProductIdStmt->execute()) {
            $productId = $selectProductIdStmt->get_result();
            if ($productId->num_rows == 0) {
                $insertProductId = "INSERT INTO wishlists(product_id, user_id) VALUES($this->productId, $this->userId)";
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

    public function insertWishlistProduct()
    {
        $insertSql = "INSERT INTO wishlists(product_id, user_id) VALUES(?, ?)";
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

    public function deleteWishlistProduct()
    {
        $deleteSql = "DELETE FROM wishlists WHERE product_id = ? AND user_id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("ii", $this->productId, $this->userId);

        if ($deleteStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>

<?php
// Insert Local Favorite Products If Available
if (isset($_POST["userID"]) && isset($_POST["favProducts"])) {
    $userID = htmlentities($_POST["userID"]);
    $favProducts = explode(",", htmlentities($_POST["favProducts"]));

    foreach ($favProducts as $favProduct) {
        $wishListHandler = new Wishlists($userID, $favProduct);
        $insertResponse = $wishListHandler->insertLocalFavProducts();
        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
// Wishlist Insertion
if (isset($_POST["productID"]) && isset($_POST["userID"]) && isset($_POST["favInsert"])) {
    if (json_decode($_POST["favInsert"]) == true) {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $wishlistsHandler = new Wishlists($userID, $productID);
        $insertionResponse = $wishlistsHandler->insertWishlistProduct();
        echo json_encode(array("isInserted" => $insertionResponse));
    }
}
?>

<?php
// Wishlist Deletion
if (isset($_POST["productID"]) && isset($_POST["userID"]) && isset($_POST["favDelete"])) {
    if (json_decode($_POST["favDelete"]) == true) {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $wishlistsHandler = new Wishlists($userID, $productID);
        $deleteResponse = $wishlistsHandler->deleteWishlistProduct();
        echo json_encode(array("isDeleted" => $deleteResponse));
    }
}
?>

<?php
// From Wishlist To Cart
if (isset($_POST["userID"]) && isset($_POST["productID"]) && isset($_POST["toCart"])) {
    if ($_POST["toCart"] == true) {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $cartHandler = new Cart($userID, $productID);
        if ($cartHandler->insertCartProduct()) {
            echo json_encode(array("isInserted" => true));
        }

        $wishListHandler = new Wishlists($userID, $productID);
        $wishListHandler->deleteWishlistProduct();
    }
}
?>