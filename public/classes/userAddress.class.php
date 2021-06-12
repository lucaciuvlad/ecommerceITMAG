<?php
require_once("database.class.php");
require_once("validations.class.php");
?>

<?php
class UserAddress extends Database
{
    private $userId;
    private $address;
    private $phoneNumber;

    public function __construct($UserId)
    {
        $this->userId = $UserId;
    }

    public function setAddress($Address)
    {
        $this->address = $Address;
    }

    public function setPhoneNumber($PhoneNumber)
    {
        $this->phoneNumber = $PhoneNumber;
    }

    public function insertAddress()
    {
        $insertAddressSql = "INSERT INTO user_addresses(user_full_address, user_phone_number, user_id) VALUES(?, ?, ?)";
        $insertAddressStmt = $this->connect()->prepare($insertAddressSql);
        $insertAddressStmt->bind_param("ssi", $this->address, $this->phoneNumber, $this->userId);

        if ($insertAddressStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function updateAddress()
    {
        $updateAddressSql = "UPDATE user_addresses SET user_full_address = ?, user_phone_number = ? WHERE user_id = ?";
        $updateAddressStmt = $this->connect()->prepare($updateAddressSql);
        $updateAddressStmt->bind_param("ssi", $this->address, $this->phoneNumber, $this->userId);

        if ($updateAddressStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
?>

<?php
if (isset($_POST["address"]) && isset($_POST["phoneNumber"]) && isset($_POST["userId"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "insert") {
        $insertAddress = htmlentities($_POST["address"]);
        $insertPhoneNumber = htmlentities($_POST["phoneNumber"]);
        $userId = htmlentities($_POST["userId"]);

        $userAddressHandler = new UserAddress($userId);
        $userAddressHandler->setAddress($insertAddress);
        $userAddressHandler->setPhoneNumber($insertPhoneNumber);
        $insertResponse = $userAddressHandler->insertAddress();

        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
if (isset($_POST["updateAddress"]) && isset($_POST["updatePhoneNumber"]) && isset($_POST["userId"]) && isset($_POST["action"])) {
    if ($_POST["action"] == "update") {
        $updateAddress = htmlentities($_POST["updateAddress"]);
        $updatePhoneNumber = htmlentities($_POST["updatePhoneNumber"]);
        $userId = htmlentities($_POST["userId"]);

        $userAddressHandler = new UserAddress($userId);
        $userAddressHandler->setAddress($updateAddress);
        $userAddressHandler->setPhoneNumber($updatePhoneNumber);
        $updateResponse = $userAddressHandler->updateAddress();

        echo json_encode(array("isUpdated" => $updateResponse));
    }
}
?>