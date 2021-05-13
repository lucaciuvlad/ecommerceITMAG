<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require("../../vendor/autoload.php");

require_once("database.class.php");
?>

<?php
class Register extends Database
{
    private $firstName;
    private $lastName;
    private $email;
    private $password;

    public function __construct($adminFirstName, $adminLastName, $adminEmail, $adminPassword)
    {
        $this->firstName = $adminFirstName;
        $this->lastName = $adminLastName;
        $this->email = $adminEmail;
        $this->password = $adminPassword;
    }

    public function registerAdmin()
    {
        if ($this->register() && $this->getAdminId()) {
            return true;
        } else {
            return false;
        }
    }

    private function register()
    {
        $sql = "INSERT INTO admins(admin_email, admin_password, admin_first_name, admin_last_name) VALUES(?, ?, ?, ?)";
        $stmt = $this->connect()->prepare($sql);

        $hashedPassword = password_hash($this->password, PASSWORD_DEFAULT);
        $stmt->bind_param("ssss", $this->email, $hashedPassword, $this->firstName, $this->lastName);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }

    private function getAdminId()
    {
        $selectAdminId = "SELECT id FROM admins WHERE admin_email = ?";
        $adminIdStmt = $this->connect()->prepare($selectAdminId);
        $adminIdStmt->bind_param("s", $this->email);

        if ($adminIdStmt->execute()) {
            $adminId = $adminIdStmt->get_result()->fetch_assoc()["id"];

            if ($adminId) {
                $this->sendEmail($adminId);

                return true;
            } else {
                return false;
            }
        }
    }

    private function sendEmail($adminId)
    {
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
            $email->Subject = "Ai fost adaugat ca administrator al magazinului ITMAG";

            $email->Body = "
            <!DOCTYPE html>
            <html>
                <head>
                    <style type='text/css'>
                        .emailContent {
                            width: 80%;
                            margin: 0 auto;
                            border: 1px solid black;
                        }
                    </style>
                </head>
                <body>
                    <main class='emailContent'>
                        <header class='emailContent__header'>
                            <img src='cid:itmag-logo' alt='ITMAG Logo' width='100' height='50'>
                        </header>
                        <div class='emailContent__header__message'>
                            <p> Buna $this->lastName $this->firstName, </p>
                            <p> Ai fost invitat sa devii administrator al magazinului online ITMAG. </p>

                            <a href=\"http://localhost/itmag/admin/activateAccount.php?adminId=$adminId\"> 
                                Click pentru activarea contului 
                            </a>

                            <p> O zi buna,</p>
                            <p> Echipa ITMAG </p>
                        </div>
                    </main>
                </body>
            </html>
            ";

            $email->send();
            return "Email-ul a fost trimis cu succes!";
        } catch (Exception $e) {
            return "A aparut o eroare la trimiterea email-ului!";
        }
    }
}
?>

<?php
require("./validations.class.php");

if (
    isset($_POST["firstName"]) && isset($_POST["lastName"]) &&
    isset($_POST["email"]) && isset($_POST["password"])
) {
    $firstName = htmlentities($_POST["firstName"]);
    $lastName = htmlentities($_POST["lastName"]);
    $email = htmlentities($_POST["email"]);
    $password = htmlentities($_POST["password"]);

    $validation = new Validation();

    $validation->setField($firstName);
    $validation->setFlag("firstName");
    $validation->isEmpty();
    $validation->hasSpecifiedLength(3, null);
    $validation->isNumeric();

    $validation->setField($lastName);
    $validation->setFlag("lastName");
    $validation->isEmpty();
    $validation->hasSpecifiedLength(3, null);
    $validation->isNumeric();

    $validation->setField($email);
    $validation->setFlag("email");
    $validation->isEmpty();
    $validation->emailValidation();
    $validation->dbValidation("admin_email", "admins", "s");

    $capitalizedLetters = "/[A-Z]+/";
    $smallLetters = "/[a-z]{4,}/";
    $numbers = "/[0-9]+/";
    $specialChars = "/[!@#$%^&*\.]+/";

    $validation->setField($password);
    $validation->setFlag("password");
    $validation->isEmpty();
    $validation->hasSpecifiedLength(8, null);
    $validation->matchSpecifiedRegExp($capitalizedLetters);
    $validation->matchSpecifiedRegExp($smallLetters);
    $validation->matchSpecifiedRegExp($numbers);
    $validation->matchSpecifiedRegExp($specialChars);

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $registration = new Register($firstName, $lastName, $email, $password);
        echo json_encode(array("isRegistered" => $registration->registerAdmin()));
    }
}
?>