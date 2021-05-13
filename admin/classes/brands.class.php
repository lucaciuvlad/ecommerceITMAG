<?php
require_once("database.class.php");
require_once("validations.class.php");
?>

<?php
class Brands extends Database
{
    private $brandId;
    private $brandName;

    public function setBrandId($BrandId)
    {
        $this->brandId = $BrandId;
    }

    public function setBrandName($BrandName)
    {
        $this->brandName = $BrandName;
    }

    public function selectBrands()
    {
        $sql = "SELECT brands.id as brandID, brand_name, brand_created_at FROM brands";
        $brands = $this->connect()->query($sql);

        return $brands;
    }

    public function insertBrand()
    {
        $sql = "INSERT brands(brand_name) VALUES(?)";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("s", $this->brandName);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }

    public function updateBrand()
    {
        $sql = "UPDATE brands SET brand_name = ? WHERE id = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("si", $this->brandName, $this->brandId);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }

    public function deleteBrand()
    {
        $sql = "DELETE FROM brands WHERE id = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("i", $this->brandId);

        if ($stmt->execute()) {
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
// Insert Brand
if (isset($_POST["brandName"])) {
    $brandName = htmlentities($_POST["brandName"]);

    $validation = new Validation();
    $validation->setField($brandName);
    $validation->setFlag("brandName");
    $validation->isEmpty();
    $validation->isNumeric();

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $brandsHandler = new Brands();
        $brandsHandler->setBrandName($brandName);
        $insertResult = $brandsHandler->insertBrand();

        echo json_encode(array("isInserted" => $insertResult));
    }
}
?>

<?php
// Update Brand
if (isset($_POST["updateBrandId"]) && isset($_POST["updateBrandName"])) {
    $brandId = htmlentities($_POST["updateBrandId"]);
    $updateBrandName = htmlentities($_POST["updateBrandName"]);

    $validation = new Validation();
    $validation->setField($updateBrandName);
    $validation->setFlag("updateBrandName");
    $validation->isEmpty();
    $validation->isNumeric();
    $validation->dbValidation("brand_name", "brands", "s");

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $brandsHandler = new Brands();
        $brandsHandler->setBrandId($brandId);
        $brandsHandler->setBrandName($updateBrandName);
        $updateResult = $brandsHandler->updateBrand();

        echo json_encode(array("isUpdated" => $updateResult));
    }
}
?>

<?php
// Delete Brand
if (isset($_POST["deleteBrandId"])) {
    $brandId = htmlentities($_POST["deleteBrandId"]);

    $brandHandle = new Brands();
    $brandHandle->setBrandId($brandId);
    $deleteResult = $brandHandle->deleteBrand();

    echo json_encode(array("isDeleted" => $deleteResult));
}
?>