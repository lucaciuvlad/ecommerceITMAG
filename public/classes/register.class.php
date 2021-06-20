<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

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

    public function __construct($userFirstName, $userLastName, $userEmail, $userPassword)
    {
        $this->firstName = $userFirstName;
        $this->lastName = $userLastName;
        $this->email = $userEmail;
        $this->password = $userPassword;
    }

    public function registerUser()
    {
        if ($this->register() && $this->getUserId()) {
            return true;
        } else {
            return false;
        }
    }

    private function register()
    {
        $sql = "INSERT INTO users(user_email, user_password, user_first_name, user_last_name) VALUES(?, ?, ?, ?)";
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

    private function getUserId()
    {
        $selectUserId = "SELECT id FROM users WHERE user_email = ?";
        $userIdStmt = $this->connect()->prepare($selectUserId);
        $userIdStmt->bind_param("s", $this->email);

        if ($userIdStmt->execute()) {
            $userId = $userIdStmt->get_result()->fetch_assoc()["id"];

            if ($userId) {
                $this->sendEmail($userId);
                return true;
            } else {
                return false;
            }
        }
    }

    private function sendEmail($userId)
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
            $email->Subject = "Iti multumim pentru ca ai ales ITMAG!";

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
                            <p> Buna $this->lastName $this->firstName, </p>
                            <p> Activeaza contul si fii la curent cu cele mai noi reduceri! </p>

                            <a href=\"http://localhost/itmag/public/activateAccount.php?userId=$userId\"> 
                                Click pentru activarea contului 
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
    $validation->dbValidation("user_email", "users", "s");

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
        echo json_encode(array("isRegistered" => $registration->registerUser()));
    }
}
?>