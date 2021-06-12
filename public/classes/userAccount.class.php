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
        $selectFavorites = "SELECT COUNT(wishlists.id) AS favProducts FROM wishlists WHERE user_id = $this->userId";
        $favProducts = $this->connect()->query($selectFavorites)->fetch_assoc()["favProducts"];

        return $favProducts;
    }

    public function getCartProducts()
    {
        $selectCartProducts = "SELECT COUNT(carts.id) AS cartProducts FROM carts WHERE user_id = $this->userId";
        $cartProducts = $this->connect()->query($selectCartProducts)->fetch_assoc()["cartProducts"];

        return $cartProducts;
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