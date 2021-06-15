<?php
session_start();

require_once("validations.class.php");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once("../../vendor/autoload.php");
?>

<?php
class Login extends Database
{
    private $email;
    private $password;
    private $adminId;

    public function setEmail($Email)
    {
        $this->email = $Email;
    }

    public function setPassword($Password)
    {
        $this->password = $Password;
    }

    public function setAdminId($AdminId)
    {
        $this->adminId = $AdminId;
    }

    public function login()
    {
        $sql = "SELECT id, admin_last_name, admin_first_name FROM admins WHERE admin_email = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("s", $this->email);

        if ($stmt->execute()) {
            $admin = $stmt->get_result()->fetch_assoc();

            $_SESSION["adminName"] =
                $admin["admin_last_name"] . " " .  $admin["admin_first_name"];
            $_SESSION["adminID"] = $admin["id"];

            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }

    public function resetAdminPassword()
    {
        $selectAdminId = "SELECT id FROM admins WHERE admin_email = ?";
        $selectAdminIdStmt = $this->connect()->prepare($selectAdminId);
        $selectAdminIdStmt->bind_param("s", $this->email);

        if ($selectAdminIdStmt->execute()) {
            $adminId = $selectAdminIdStmt->get_result()->fetch_assoc()["id"];

            $email = new PHPMailer(true);

            try {
                // $email->SMTPDebug = SMTP::DEBUG_SERVER;
                $email->isSMTP();
                $email->Host = "smtp.gmail.com";
                $email->SMTPAuth = true;
                $email->Username = "noreply.itmag@gmail.com";
                $email->Password = "Itmag123#";
                $email->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $email->Port = 587;

                $email->setFrom("noreply.itmag@gmail.com", "ITMAG Admin");
                $email->addAddress($this->email);
                $email->addEmbeddedImage("../assets/imgs/itmag-logo.png", "itmag-logo", "itmag-logo.png");

                $email->isHTML(true);
                $email->Subject = "Resetare parola cont!";

                $email->Body = "
            <!DOCTYPE html>
            <html>
                <head>
                </head>
                <body>
                    <main>
                        <header>
                            <img src='cid:itmag-logo' alt='ITMAG Logo' width='100' height='50'>
                        </header>
                        <div>
                            <p> Buna $this->email, </p>
                            <p> Acceseaza pagina de mai jos pentru a-ti reseta parola! </p>

                            <a href=\"http://localhost/itmag/admin/resetAccount.php?userId=$adminId\"> 
                                Click pentru resetarea contului 
                            </a>

                            <p> O zi buna, </p>
                            <p> Echipa ITMAG </p>
                        </div>
                    </main>
                </body>
            </html>
            ";

                $email->send();
                return "Email-ul a fost trimis cu succes!";
            } catch (Exception $e) {
                return "A aparut o eroare la trimiterea email-ului!" . $e->getMessage();
            }
        }

        $selectAdminIdStmt->close();
        $this->connect()->close();
    }

    public function updateAdminPassword()
    {
        $updatePassword = "UPDATE admins SET admin_password = ? WHERE id = ?";
        $updatePasswordStmt = $this->connect()->prepare($updatePassword);

        $updatePasswordStmt->bind_param("si", $newAdminPassword, $this->adminId);
        $newAdminPassword = password_hash($this->password, PASSWORD_DEFAULT);

        if ($updatePasswordStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $updatePasswordStmt->close();
        $this->connect()->close();
    }
}
?>

<?php
if (isset($_POST["email"]) && isset($_POST["password"])) {
    $email = htmlentities($_POST["email"]);
    $password = htmlentities($_POST["password"]);

    $validation = new Validation();
    $validation->setField($email);
    $validation->setFlag("email");
    $validation->isEmpty();
    $validation->emailValidation();

    $validation->setField($password);
    $validation->setFlag("password");
    $validation->isEmpty();

    $validation->setEmail($email);
    $validation->setPassword($password);
    $validation->loginValidation();

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $loginHandler = new Login();
        $loginHandler->setEmail($email);
        $loginHandler->setPassword($password);
        echo json_encode(array("isLoggedIn" => $loginHandler->login()));
    }
}
?>

<?php
if (isset($_POST["adminEmail"]) && isset($_POST["resetAccount"])) {
    if ($_POST["resetAccount"]) {
        $adminEmail = htmlentities($_POST["adminEmail"]);

        $loginHandler = new Login();
        $loginHandler->setEmail($adminEmail);

        echo json_encode(array("resetStatus" => $loginHandler->resetAdminPassword()));
    }
}
?>

<?php
if (isset($_POST["newPassword"]) && isset($_POST["adminId"])) {
    $newPassword = htmlentities($_POST["newPassword"]);
    $adminId = htmlentities($_POST["adminId"]);

    $loginHandler = new Login();
    $loginHandler->setAdminId($adminId);
    $loginHandler->setPassword($newPassword);

    $updateResponse = $loginHandler->updateAdminPassword();
    echo json_encode(array("isUpdated" => $updateResponse));
}
?>