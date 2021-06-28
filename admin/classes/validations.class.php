<?php
require_once("database.class.php");
?>

<?php
class Validation extends Database
{
    private $field;
    private $email;
    private $password;
    private $flag;
    private $errorMessages;

    public function setField($Field)
    {
        $this->field = $Field;
    }

    public function setEmail($Email)
    {
        $this->email = $Email;
    }

    public function setPassword($Password)
    {
        $this->password = $Password;
    }

    public function setFlag($Flag)
    {
        $this->flag = $Flag;
    }

    private function setErrorMessage($key, $message)
    {
        $this->errorMessages[$key] = $message;
    }

    public function getErrorMessges()
    {
        return $this->errorMessages;
    }

    public function isEmpty()
    {
        if (strlen($this->field) == 0) {
            $this->setErrorMessage($this->flag, "Campul este obligatoriu!");
        }
    }

    public function hasSpecifiedLength($minLength, $maxLength)
    {
        if ($minLength != null) {
            if (strlen($this->field) < $minLength) {
                $this->setErrorMessage($this->flag, "Campul trebuie sa aiba minim $minLength caractere!");
            }
        }

        if ($maxLength != null) {
            if (strlen($this->field) > $maxLength) {
                $this->setErrorMessage($this->flag, "Campul trebuie sa aiba maxim $maxLength caractere!");
            }
        }
    }

    public function matchSpecifiedRegExp($regExp)
    {
        if (!preg_match($regExp, $this->field)) {
            $this->setErrorMessage($this->flag, "Revezi inca odata valorile necesare campului!");
        }
    }

    public function isNumeric()
    {
        if (is_numeric($this->field))
            $this->setErrorMessage($this->flag, "Campul nu poate contine numere!");
    }

    public function emailValidation()
    {
        if (!filter_var($this->field, FILTER_VALIDATE_EMAIL)) {
            $this->setErrorMessage($this->field, "Adresa de email este invalida!");
        }
    }

    public function dbValidation($column, $table, $dataType)
    {
        $selectSql = "SELECT $column FROM $table WHERE $column = ?";
        $selectStmt = $this->connect()->prepare($selectSql);

        $selectStmt->bind_param($dataType, $this->field);

        if ($selectStmt->execute()) {
            $returnedRow = $selectStmt->get_result();
            if ($returnedRow->num_rows != 0) {
                $this->setErrorMessage($this->flag, "Exista deja in baza de date!");
            }
        }
    }

    public function loginValidation()
    {
        if (strlen($this->email) == 0) {
            $this->setErrorMessage("email", "Campul este obligatoriu!");
        } else if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $this->setErrorMessage("email", "Adresa de email este invalida!");
        }

        $sql = "SELECT admin_email, admin_password, admin_active_account FROM admins WHERE admin_email = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("s", $this->email);

        if ($stmt->execute()) {
            $adminRow = $stmt->get_result();

            $adminPassword = null;
            $adminActiveAccount = null;

            foreach ($adminRow as $field) {
                $adminPassword = $field["admin_password"];
                $adminActiveAccount = $field["admin_active_account"];
            }

            if ($adminRow->num_rows == 0) {
                $this->setErrorMessage("email", "Adresa de email este inexistenta!");
            } else if (!password_verify($this->password, $adminPassword)) {
                $this->setErrorMessage("password", "Parola introdusa nu este corecta!");
            } else if ($adminActiveAccount == 0) {
                $this->setErrorMessage("activeAccount", "Contul nu este activat! Revezi adresa de email!");
            }
        }

        $stmt->close();
        $this->close();
    }
}