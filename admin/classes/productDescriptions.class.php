<?php
require_once("database.class.php");
?>

<?php
class ProductDescriptions extends Database
{
    private $productId;
    private $productDescriptionId;
    private $productDescriptionTitle;
    private $productDescriptionBody;
    private $productDescriptionImage;
    private $errorMessage;

    public function setProductDescriptionId($ProductDescriptionId)
    {
        $this->productDescriptionId = $ProductDescriptionId;
    }

    public function setProductDescriptionTitle($ProductDescriptionTitle)
    {
        $this->productDescriptionTitle = $ProductDescriptionTitle;
    }

    public function setProductDescriptionBody($ProductDescriptionBody)
    {
        $this->productDescriptionBody = $ProductDescriptionBody;
    }

    public function setProductDescriptionImage($ProductDescriptionImage)
    {
        $this->productDescriptionImage = $ProductDescriptionImage;
    }

    public function setProductId($ProductId)
    {
        $this->productId = $ProductId;
    }

    private function addErrorMessage($key, $error)
    {
        $this->errorMessage[$key] = $error;
    }

    public function validateProductDescImageName()
    {
        $selectSql = "SELECT product_description_image FROM product_descriptions WHERE product_description_image = ?";
        $selectStmt = $this->connect()->prepare($selectSql);
        $selectStmt->bind_param("s", $this->productDescriptionImage);

        if ($selectStmt->execute()) {
            $productDescImage = $selectStmt->get_result();

            if ($productDescImage->num_rows != 0) {
                $productDescImageName = $productDescImage->fetch_assoc()["product_description_image"];
                $this->addErrorMessage("imageDescError", "Imaginea '$productDescImageName' exista deja in baza de date!");

                return $this->errorMessage;
            }
        }
    }

    public function selectProductDescriptions()
    {
        $selectProductDescriptionsSql =
            "   SELECT  product_descriptions.id as productDescriptionID, product_description_title, 
                        product_description_body, product_description_image
                FROM    product_descriptions 
                WHERE   product_id = ?
            ";
        $selectProductDescriptionsStmt = $this->connect()->prepare($selectProductDescriptionsSql);
        $selectProductDescriptionsStmt->bind_param("i", $this->productId);

        if ($selectProductDescriptionsStmt->execute()) {
            $productDesriptions = $selectProductDescriptionsStmt->get_result();
            return $productDesriptions;
        }
    }

    public function insertProductDescription()
    {
        $insertSql =
            "   INSERT INTO product_descriptions(product_description_title, product_description_body, product_description_image, product_id) 
                VALUES(?, ?, ?, ?)
            ";
        $insertStmt = $this->connect()->prepare($insertSql);

        $insertStmt->bind_param(
            "sssi",
            $this->productDescriptionTitle,
            $this->productDescriptionBody,
            $this->productDescriptionImage,
            $this->productId
        );
        if ($insertStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $insertStmt->close();
        $this->connect()->close();
    }

    public function updateProductDescription()
    {
        $updateSql =
            "   UPDATE  product_descriptions 
                SET     product_description_title = ?, product_description_body = ?, product_description_image = ?
                WHERE   product_descriptions.id = ?
            ";
        $updateStmt = $this->connect()->prepare($updateSql);

        $updateStmt->bind_param(
            "sssi",
            $this->productDescriptionTitle,
            $this->productDescriptionBody,
            $this->productDescriptionImage,
            $this->productDescriptionId
        );
        if ($updateStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $updateStmt->close();
        $this->connect()->close();
    }

    public function deleteProductDescription()
    {
        $deleteSql = "DELETE FROM product_descriptions WHERE product_descriptions.id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("i", $this->productDescriptionId);

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
// Upload Product Description Image
if (isset($_FILES["productDescImageInfo"]) && isset($_POST["productDescImageUpload"])) {
    $productDescImageInfo = $_FILES["productDescImageInfo"];
    $productDescImageName = basename($productDescImageInfo["name"]);

    $temporaryDirectory = "../assets/imgs/";
    $newTemporaryFilePath = $temporaryDirectory . $productDescImageName;

    if (move_uploaded_file($productDescImageInfo["tmp_name"], $newTemporaryFilePath)) {
        $productDescImage = array("productDescImage" => $productDescImageInfo["name"]);
        echo json_encode($productDescImage);
    }
}
?>

<?php
// Insert Product Description
if (
    isset($_POST["productDescTitle"]) &&
    isset($_POST["productDescBody"]) &&
    isset($_FILES["productDescImageInfo"]) &&
    isset($_POST["productId"])
) {
    $productId = htmlentities($_POST["productId"]);

    $productDescTitle = htmlentities($_POST["productDescTitle"]);
    $productDescBody = htmlentities($_POST["productDescBody"]);

    $productDescImageInfo = $_FILES["productDescImageInfo"];
    $productDescImageName = basename($productDescImageInfo["name"]);

    $productDescImagesHandle = new ProductDescriptions();
    $productDescImagesHandle->setProductId($productId);
    $productDescImagesHandle->setProductDescriptionTitle($productDescTitle);
    $productDescImagesHandle->setProductDescriptionBody($productDescBody);
    $productDescImagesHandle->setProductDescriptionImage($productDescImageName);

    $productDescImageValidation = $productDescImagesHandle->validateProductDescImageName();

    if ($productDescImageValidation != null) {
        echo json_encode($productDescImageValidation);
    } else {
        $insertResponse = $productDescImagesHandle->insertProductDescription();
        echo json_encode(array("isInserted" => $insertResponse));
    }
}
?>

<?php
// Update Product Description
if (
    isset($_POST["updateProductDescTitle"]) &&
    isset($_POST["updateProductDescBody"]) &&
    isset($_POST["productDescId"])
) {
    $productDescId = htmlentities($_POST["productDescId"]);

    $updateProductDescTitle = htmlentities($_POST["updateProductDescTitle"]);
    $updateProductDescBody = htmlentities($_POST["updateProductDescBody"]);

    $productDescImagesHandle = new ProductDescriptions();
    $productDescImagesHandle->setProductDescriptionId($productDescId);
    $productDescImagesHandle->setProductDescriptionTitle($updateProductDescTitle);
    $productDescImagesHandle->setProductDescriptionBody($updateProductDescBody);

    if (isset($_POST["updateProductDescImageName"])) {
        $updateProductDescImageName = htmlentities($_POST["updateProductDescImageName"]);
        $productDescImagesHandle->setProductDescriptionImage($updateProductDescImageName);
    } elseif (isset($_FILES["updateProductDescImageInfo"])) {
        $updateProductDescImageInfo = $_FILES["updateProductDescImageInfo"];
        $updateProductDescImageName = basename($updateProductDescImageInfo["name"]);
        $productDescImagesHandle->setProductDescriptionImage($updateProductDescImageName);
    }

    $productDescImageValidation = $productDescImagesHandle->validateProductDescImageName();

    if ($productDescImageValidation != null) {
        echo json_encode($productDescImageValidation);
    } else {
        $updateResponse = $productDescImagesHandle->updateProductDescription();
        echo json_encode(array("isUpdated" => $updateResponse));
    }
}
?>

<?php
// Delete Product Images
if (isset($_POST["deleteProductDescId"])) {
    $deleteProductDescId = htmlentities($_POST["deleteProductDescId"]);

    $productDescHandle = new ProductDescriptions();
    $productDescHandle->setProductDescriptionId($deleteProductDescId);

    $deleteResult = $productDescHandle->deleteProductDescription();

    echo json_encode(array("isDeleted" => $deleteResult));
}
?>