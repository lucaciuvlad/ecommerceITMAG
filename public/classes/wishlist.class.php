<?php
require_once("./database.class.php");
require_once("./cart.class.php");

class Wishlist extends Database
{
    private $userId;

    public function __construct($UserId)
    {
        $this->userId = $UserId;
    }

    public function getUserWishlists()
    {
        $selectSql = "SELECT id FROM wishlists WHERE user_id = ?";
        $selectStmt = $this->connect()->prepare($selectSql);
        $selectStmt->bind_param("i", $this->userId);
        if ($selectStmt->execute()) {
            $wishlists = $selectStmt->get_result();
            return $wishlists;
        }
    }

    public function createWishlist()
    {
        $insertSql = "INSERT INTO wishlists(user_id) VALUES(?)";
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
class WishlistDetails extends Database
{
    private $wishlistId;
    private $productId;

    public function __construct($WishlistId, $ProductId)
    {
        $this->wishlistId = $WishlistId;
        $this->productId = $ProductId;
    }

    public function insertWishlistDetails()
    {
        $selectProductSql = "SELECT product_id FROM wishlist_details WHERE product_id = ?";
        $selectProductStmt = $this->connect()->prepare($selectProductSql);
        $selectProductStmt->bind_param("i", $this->productId);

        if ($selectProductStmt->execute()) {
            $product = $selectProductStmt->get_result();

            if ($product->num_rows == 0) {
                $insertSql = "INSERT INTO wishlist_details(wishlist_id, product_id) VALUES(?, ?)";
                $insertStmt = $this->connect()->prepare($insertSql);
                $insertStmt->bind_param("ii", $this->wishlistId, $this->productId);

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

    public function deleteWishlistDetails()
    {
        $deleteSql = "DELETE FROM wishlist_details WHERE product_id = ? AND wishlist_id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("ii", $this->productId, $this->wishlistId);

        if ($deleteStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>

<?php
// Insert Local Favorite Products
if (isset($_POST["userID"]) && isset($_POST["favProducts"])) {
    $userID = htmlentities($_POST["userID"]);
    $favProducts = explode(",", htmlentities($_POST["favProducts"]));

    $wishlistHandler = new Wishlist($userID);
    $userWishlist = $wishlistHandler->getUserWishlists();

    if ($userWishlist->num_rows != 0) {
        $userWishlistId = $userWishlist->fetch_assoc()["id"];
        foreach ($favProducts as $favProduct) {
            $wishlistDetailsHandler = new WishlistDetails($userWishlistId, $favProduct);
            $insertResponse = $wishlistDetailsHandler->insertWishlistDetails();
        }

        echo json_encode(array("isInserted" => $insertResponse));
    } else {
        $wishlistHandler->createWishlist();
        $createdWishlistId = $wishlistHandler->getUserWishlists()->fetch_assoc()["id"];

        foreach ($favProducts as $favProduct) {
            $wishlistDetailsHandler = new WishlistDetails($userWishlistId, $favProduct);
            $insertResponse = $wishlistDetailsHandler->insertWishlistDetails();
        }
        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
// Insert Product Into Wishlists
if (isset($_POST["userId"]) && isset($_POST["productId"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "insertProduct") {
        $userId = htmlentities($_POST["userId"]);
        $productId = htmlentities($_POST["productId"]);

        $wishlistHandler = new Wishlist($userId);
        $userWishlist = $wishlistHandler->getUserWishlists();

        if ($userWishlist->num_rows != 0) {
            $userWishlistId = $userWishlist->fetch_assoc()["id"];

            $wishlistDetailsHandler = new WishlistDetails($userWishlistId, $productId);
            $insertResponse = $wishlistDetailsHandler->insertWishlistDetails();

            echo json_encode(array("isInserted" => $insertResponse));
        } else {
            $wishlistHandler->createWishlist();
            $createdWishlistId = $wishlistHandler->getUserWishlists()->fetch_assoc()["id"];

            $wishlistDetailsHandler = new WishlistDetails($createdWishlistId, $productId);
            $insertResponse = $wishlistDetailsHandler->insertWishlistDetails();
            echo json_encode(array("isInserted" => $insertResponse));
        }
    }
}
?>

<?php
// Remove Product From Wishlists
if (isset($_POST["userId"]) && isset($_POST["productId"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "deleteProduct") {
        $userId = htmlentities($_POST["userId"]);
        $productId = htmlentities($_POST["productId"]);

        $wishlistHandler = new Wishlist($userId);
        $userWishlistId = $wishlistHandler->getUserWishlists()->fetch_assoc()["id"];

        $wishlistDetailsHandler = new WishlistDetails($userWishlistId, $productId);
        $deleteResponse = $wishlistDetailsHandler->deleteWishlistDetails();
        echo json_encode(array("isDeleted" => $deleteResponse));
    }
}
?>

<?php
// From Wishlist To Cart
if (isset($_POST["userID"]) && isset($_POST["productID"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "toCart") {
        $productID = htmlentities($_POST["productID"]);
        $userID = htmlentities($_POST["userID"]);

        $cartHandler = new Cart($userID);
        $userCart = $cartHandler->getUserCart();

        if ($userCart->num_rows == 0) {
            $cartHandler->createCart();
            $createdCartId = $cartHandler->getUserCart()->fetch_assoc()["id"];

            $cartDetailsHandler = new CartDetails($createdCartId, $productID);
            $insertResponse = $cartDetailsHandler->insertCartDetails();
            echo json_encode(array("isInserted" => true));

            $wishlistHandler = new Wishlist($userID);
            $userWishlistId = $wishlistHandler->getUserWishlists()->fetch_assoc()["id"];

            $wishListHandler = new WishlistDetails($userWishlistId, $productID);
            $wishListHandler->deleteWishlistDetails();
        } else {
            $userCartId = $userCart->fetch_assoc()["id"];

            $cartDetailsHandler = new CartDetails($userCartId, $productID);
            $insertResponse = $cartDetailsHandler->insertCartDetails();
            echo json_encode(array("isInserted" => true));

            $wishlistHandler = new Wishlist($userID);
            $userWishlistId = $wishlistHandler->getUserWishlists()->fetch_assoc()["id"];

            $wishListDetailsHandler = new WishlistDetails($userWishlistId, $productID);
            $wishListDetailsHandler->deleteWishlistDetails();
        }
    }
}
?>