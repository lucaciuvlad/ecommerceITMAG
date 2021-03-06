<?php
require_once("database.class.php");
?>

<?php
class ProductImages extends Database
{
    private $productId;
    private $productImageId;
    private $productImage;
    private $errorMessage;

    public function setProductId($ProductId)
    {
        $this->productId = $ProductId;
    }

    public function setProductImageId($ProductImageId)
    {
        $this->productImageId = $ProductImageId;
    }

    public function setProductImages($ProductImage)
    {
        $this->productImage = $ProductImage;
    }

    private function addErrorMessage($key, $error)
    {
        $this->errorMessage[$key] = $error;
    }

    public function validateProductImageName()
    {
        $selectSql = "SELECT product_image FROM product_images WHERE product_image = ?";
        $selectStmt = $this->connect()->prepare($selectSql);
        $selectStmt->bind_param("s", $this->productImage);

        if ($selectStmt->execute()) {
            $productImage = $selectStmt->get_result();

            if ($productImage->num_rows != 0) {
                $productImageName = $productImage->fetch_assoc()["product_image"];
                $this->addErrorMessage("imageError", "Imaginea '$productImageName' exista deja in baza de date!");

                return $this->errorMessage;
            }
        }
    }

    public function selectProductImages()
    {
        $selectProductImagesSql =
            "SELECT product_images.id as productImageID, product_image FROM product_images WHERE product_id = ?";
        $selectProductImagesStmt = $this->connect()->prepare($selectProductImagesSql);
        $selectProductImagesStmt->bind_param("s", $this->productId);

        if ($selectProductImagesStmt->execute()) {
            $productImages = $selectProductImagesStmt->get_result();
            return $productImages;
        }
    }

    public function insertProductImages()
    {
        $insertSql = "INSERT INTO product_images(product_image, product_id) VALUES(?, ?)";
        $insertStmt = $this->connect()->prepare($insertSql);

        $insertStmt->bind_param("si", $this->productImage, $this->productId);
        if ($insertStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $insertStmt->close();
        $this->connect()->close();
    }

    public function deleteProductImage()
    {
        $deleteSql = "DELETE FROM product_images WHERE product_images.id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("i", $this->productImageId);

        if ($deleteStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $deleteStmt->close();
        $this->close();
    }
}
?>

<?php
if (isset($_FILES["productImageInfo"]) && isset($_POST["productImageUpload"])) {
    $productImageInfo = $_FILES["productImageInfo"];
    $productImageName = basename($productImageInfo["name"]);

    $temporaryDirectory = "../assets/imgs/";
    $newTemporaryFilePath = $temporaryDirectory . $productImageName;

    if (move_uploaded_file($productImageInfo["tmp_name"], $newTemporaryFilePath)) {
        $productImage = array("productImage" => $productImageInfo["name"]);
        echo json_encode($productImage);
    }
}
?>

<?php
if (isset($_FILES["productImageInfo"]) && isset($_POST["productId"])) {
    $productId = htmlentities($_POST["productId"]);

    $productImageInfo = $_FILES["productImageInfo"];
    $productImageName = basename($productImageInfo["name"]);

    $productImagesHandle = new ProductImages();
    $productImagesHandle->setProductId($productId);
    $productImagesHandle->setProductImages($productImageName);

    $productImageValidation = $productImagesHandle->validateProductImageName();

    if ($productImageValidation != null) {
        echo json_encode($productImageValidation);
    } else {
        $insertResponse = $productImagesHandle->insertProductImages();
        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
if (isset($_POST["deleteProductImageId"])) {
    $deleteProductImageId = htmlentities($_POST["deleteProductImageId"]);

    $productImagesHandle = new ProductImages();
    $productImagesHandle->setProductImageId($deleteProductImageId);

    $deleteResult = $productImagesHandle->deleteProductImage();

    echo json_encode(array("isDeleted" => $deleteResult));
}
?>