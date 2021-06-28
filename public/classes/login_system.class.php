<?php
session_start();

require_once("db.class.php");

class LoginSystem
{
    private $db;
    private $email;
    private $pw;

    public function __construct($Db)
    {
        $this->db = $Db;
    }

    public function setEmail($Email)
    {
        $this->email = $Email;
    }

    public function setPw($Pw)
    {
        $this->pw = $Pw;
    }

    public function checkEmail()
    {
        $selectEmail = " SELECT client_email FROM client WHERE client_email = ? ";

        $prepSelectEmail = $this->db->prepare($selectEmail);

        $prepSelectEmail->bind_param("s", $this->email);

        if ($prepSelectEmail->execute()) {
            $returnedEmail = $prepSelectEmail->get_result();

            if ($returnedEmail->num_rows > 0) {
                print "Adresa exista deja!";
            }
        }
    }

    public function checkLoginCredentials()
    {
        $selectCredentials = " SELECT client_email, client_password FROM client WHERE client_email = ? ";
        $prepSelectCredentials = $this->db->prepare($selectCredentials);
        $prepSelectCredentials->bind_param("s", $this->email);

        if ($prepSelectCredentials->execute()) {
            $credentialsReturned = $prepSelectCredentials->get_result();

            if ($credentialsReturned->num_rows > 0) {
                $credentialsPw = $credentialsReturned->fetch_assoc()["client_password"];

                if (password_verify($this->pw, $credentialsPw)) {
                    print "Password Ok";
                } else {
                    print "Parola nu este corecta!";
                }
            }
        }
    }

    public function registerUser()
    {
        $registerQuery = " INSERT INTO client(client_email, client_password) VALUES(?, ?) ";

        $prepRegister = $this->db->prepare($registerQuery);

        $hashedPw = password_hash($this->pw, PASSWORD_DEFAULT);
        $prepRegister->bind_param("ss", $this->email, $hashedPw);

        if ($prepRegister->execute()) {
            print "Inregistrat cu succes!";
        } else {
            print "Eroare la inregistrare!" . mysqli_error($this->db);
        }
    }

    public function loginUser()
    {
        $selectUserEmail = " SELECT client_email FROM client WHERE client_email = ? ";
        $prepSelectUserEmail = $this->db->prepare($selectUserEmail);
        $prepSelectUserEmail->bind_param("s", $this->email);

        if ($prepSelectUserEmail->execute()) {
            $credentialsEmail = $prepSelectUserEmail->get_result()->fetch_assoc()["client_email"];
            $_SESSION["client"] = $credentialsEmail;

            print "Logat cu succes!";
        }
    }
}

function emailValidation($emailField)
{
    $registerEmailTemplate = "/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/";
    $checkRegisterEmailErr = "";

    if ($emailField == "") {
        $checkRegisterEmailErr = "Campul este obligatoriu!";
    } elseif (!preg_match($registerEmailTemplate, $emailField)) {
        $checkRegisterEmailErr = "Adresa de email nu este corecta!";
    } else {
        $checkRegisterEmailErr = "";
    }

    print $checkRegisterEmailErr;
}

if (isset($_POST["checkRegisterEmail"])) {
    $checkRegisterEmail = htmlentities($_POST["checkRegisterEmail"]);
    emailValidation($checkRegisterEmail);


    $checkingRegisterEmail = new LoginSystem($dbConn);
    $checkingRegisterEmail->setEmail($checkRegisterEmail);
    $checkingRegisterEmail->checkEmail();
} else if (isset($_POST["checkLoginEmail"])) {
    $checkLoginEmail = htmlentities($_POST["checkLoginEmail"]);
    emailValidation($checkLoginEmail);

    $checkingLoginEmail = new LoginSystem($dbConn);

    $checkingLoginEmail->setEmail($checkLoginEmail);

    $checkingLoginEmail->checkEmail();
}

if (isset($_POST["checkingRegisterPw"])) {
    $checkingRegisterPw = htmlentities($_POST["checkingRegisterPw"]);

    $registerPwErr = "";

    $upperCaseLetters = "/[A-Z]+/";
    $lowerCaseLetters = "/[a-z]+/";
    $numbers = "/[0-9]+/";
    $specialChars = "/[!@#$%^&*]+/";

    if ($checkingRegisterPw == "") {
        $registerPwErr = "Campul este obligatoriu!";
    } elseif (strlen($checkingRegisterPw) < 6) {
        $registerPwErr = "Este nevoie de 6 caractere!";
    } elseif (!preg_match($upperCaseLetters, $checkingRegisterPw)) {
        $registerPwErr = "Este nevoie de o litera mare!";
    } elseif (!preg_match($lowerCaseLetters, $checkingRegisterPw)) {
        $registerPwErr = "Este nevoie de litere mici!";
    } elseif (!preg_match($numbers, $checkingRegisterPw)) {
        $registerPwErr = "Este nevoie de un numar!";
    } elseif (!preg_match($specialChars, $checkingRegisterPw)) {
        $registerPwErr = "Este nevoie de un caracter special!";
    } else {
        $registerPwErr = "";
    }

    print $registerPwErr;
} else if (isset($_POST["registerPw"]) && isset($_POST["checkingRegisterRepeatPw"])) {
    $registerPassword = htmlentities($_POST["registerPw"]);
    $checkingRegisterRepeatPw = htmlentities($_POST["checkingRegisterRepeatPw"]);

    $registerRepeatPwErr = "";

    if ($checkingRegisterRepeatPw == "") {
        $registerRepeatPwErr = "Campul este obligatoriu!";
    } elseif ($registerPassword == "") {
        $registerRepeatPwErr = "Trebuie introdusa parola inainte!";
    } elseif ($checkingRegisterRepeatPw != $registerPassword) {
        $registerRepeatPwErr = "Parolele nu se potrivesc!";
    } else {
        $registerRepeatPwErr = "";
    }

    print $registerRepeatPwErr;
}

if (isset($_POST["checkingLoginEmail"]) && isset($_POST["checkingLoginPw"])) {
    $checkingLoginEmail = htmlentities($_POST["checkingLoginEmail"]);
    $checkingLoginPw = htmlentities($_POST["checkingLoginPw"]);

    $loginPwErr = "";

    if ($checkingLoginPw == "") {
        $loginPwErr = "Campul este obligatoriu!";
    } else if ($checkingLoginEmail == "") {
        $loginPwErr = "Introdu mai intai adresa de email!";
    } else {
        $loginPwErr = "";
    }

    print $loginPwErr;

    $checkingLoginPsw = new LoginSystem($dbConn);

    $checkingLoginPsw->setEmail($checkingLoginEmail);
    $checkingLoginPsw->setPw($checkingLoginPw);

    $checkingLoginPsw->checkLoginCredentials();
}

if (isset($_POST["registerEmail"]) && isset($_POST["registerPw"])) {
    $registerEmail = htmlentities($_POST["registerEmail"]);
    $registerPw = htmlentities($_POST["registerPw"]);

    $register = new LoginSystem($dbConn);

    $register->setEmail($registerEmail);
    $register->setPw($registerPw);

    $register->registerUser();
}

if (isset($_POST["loginEmail"]) && isset($_POST["loginPw"]) && isset($_POST["remember"])) {
    $loginEmail = htmlentities($_POST["loginEmail"]);
    $loginPw = htmlentities($_POST["loginPw"]);

    $login = new LoginSystem($dbConn);

    $login->setEmail($loginEmail);
    $login->setPw($loginPw);

    $login->loginUser();
}

$dbConn->close();