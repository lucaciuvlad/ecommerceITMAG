<?php
require_once("database.class.php");

class MyAccount extends Database
{
    private $adminId;

    public function setAdminId($AdminId)
    {
        $this->adminId = $AdminId;
    }

    public function getAdminDetails()
    {
        $selectAdminDetails = "SELECT * FROM admins WHERE id = $this->adminId";
        $adminDetails = $this->connect()->query($selectAdminDetails)->fetch_assoc();

        return $adminDetails;
    }

    public function updateAdminPassword($oldPassword, $newPassword)
    {
        $selectOldPassword = "SELECT admin_password FROM admins WHERE id = $this->adminId";
        $oldPasswordHash = $this->connect()->query($selectOldPassword)->fetch_assoc()["admin_password"];

        if (password_verify($oldPassword, $oldPasswordHash)) {
            $updatePasswordSql = "UPDATE admins SET admin_password = ? WHERE id = ?";
            $updatePasswordStmt = $this->connect()->prepare($updatePasswordSql);
            $updatePasswordStmt->bind_param("si", $hashNewPassword, $this->adminId);

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
if (isset($_POST["oldPassword"]) && isset($_POST["newPassword"]) && isset($_POST["adminId"])) {
    $adminId = htmlentities($_POST["adminId"]);
    $oldPassword = htmlentities($_POST["oldPassword"]);
    $newPassword = htmlentities($_POST["newPassword"]);

    $myAccountHandler = new MyAccount();
    $myAccountHandler->setAdminId($adminId);
    $updatePasswordResponse = $myAccountHandler->updateAdminPassword($oldPassword, $newPassword);

    echo json_encode(array("isUpdated" => $updatePasswordResponse));
}
?>