<?php
session_start();

require_once("./validations.class.php");
?>

<?php
class Login extends Database
{
    private $email;
    private $password;

    public function __construct($Email, $Password)
    {
        $this->email = $Email;
        $this->password = $Password;
    }

    public function login()
    {
        $sql = "SELECT users.id AS userID, user_last_name, user_first_name FROM users WHERE user_email = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("s", $this->email);

        if ($stmt->execute()) {
            $user = $stmt->get_result()->fetch_assoc();

            $_SESSION["userFullName"] =
                $user["user_last_name"] . " " .  $user["user_first_name"];
            $_SESSION["userID"] = $user["userID"];

            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }
}
?>

<?php
// Login
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
        $login = new Login($email, $password);
        echo json_encode(array("isLoggedIn" => $login->login()));
    }
}
?>