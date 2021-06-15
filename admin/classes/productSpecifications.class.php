<?php
require_once("database.class.php");
?>

<?php
class ProductSpecifications extends Database
{
    private $productId;
    private $productSpecificationId;
    private $productSpecificationKey;
    private $productSpecificationValue;
    private $errorMessage;

    public function setProductSpecificationId($ProductSpecificationId)
    {
        $this->productSpecificationId = $ProductSpecificationId;
    }

    public function setProductSpecificationKey($ProductSpecificationKey)
    {
        $this->productSpecificationKey = $ProductSpecificationKey;
    }

    public function setProductSpecificationValue($ProductSpecificationValue)
    {
        $this->productSpecificationValue = $ProductSpecificationValue;
    }

    public function setProductId($ProductId)
    {
        $this->productId = $ProductId;
    }

    private function addErrorMessage($key, $error)
    {
        $this->errorMessage[$key] = $error;
    }

    public function selectProductSpecifications()
    {
        $selectProductSpecificationsSql =
            "   SELECT  product_specifications.id AS productSpecificationID, product_specification_key, product_specification_value 
                FROM    product_specifications 
                WHERE   product_id = ?
            ";
        $selectProductSpecificationsStmt = $this->connect()->prepare($selectProductSpecificationsSql);
        $selectProductSpecificationsStmt->bind_param("i", $this->productId);

        if ($selectProductSpecificationsStmt->execute()) {
            $productSpecifications = $selectProductSpecificationsStmt->get_result();
            return $productSpecifications;
        }
    }

    public function insertProductSpecification()
    {
        $insertSql =
            "   INSERT INTO product_specifications(product_specification_key, product_specification_value, product_id) 
                VALUES(?, ?, ?)
            ";
        $insertStmt = $this->connect()->prepare($insertSql);

        $insertStmt->bind_param(
            "ssi",
            $this->productSpecificationKey,
            $this->productSpecificationValue,
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

    public function updateProductSpecification()
    {
        $updateSql =
            "   UPDATE  product_specifications
                SET     product_specification_key = ?, product_specification_value = ?
                WHERE   product_specifications.id = ?
            ";
        $updateStmt = $this->connect()->prepare($updateSql);

        $updateStmt->bind_param(
            "ssi",
            $this->productSpecificationKey,
            $this->productSpecificationValue,
            $this->productSpecificationId
        );

        if ($updateStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $updateStmt->close();
        $this->connect()->close();
    }

    public function deleteProductSpecification()
    {
        $deleteSql = "DELETE FROM product_specifications WHERE product_specifications.id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("i", $this->productSpecificationId);

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
if (
    isset($_POST["productSpecKey"]) &&
    isset($_POST["productSpecValue"]) &&
    isset($_POST["productId"])
) {
    $productId = htmlentities($_POST["productId"]);
    $productSpecKey = htmlentities($_POST["productSpecKey"]);
    $productSpecValue = htmlentities($_POST["productSpecValue"]);

    $productSpecificationHandle = new ProductSpecifications();
    $productSpecificationHandle->setProductId($productId);
    $productSpecificationHandle->setProductSpecificationKey($productSpecKey);
    $productSpecificationHandle->setProductSpecificationValue($productSpecValue);

    $insertResponse = $productSpecificationHandle->insertProductSpecification();
    echo json_encode(array("isInserted" => $insertResponse));
}
?>

<?php
if (
    isset($_POST["updateProductSpecKey"]) &&
    isset($_POST["updateProductSpecValue"]) &&
    isset($_POST["productSpecId"])
) {
    $productSpecId = htmlentities($_POST["productSpecId"]);

    $updateProductSpecKey = htmlentities($_POST["updateProductSpecKey"]);
    $updateProductSpecValue = htmlentities($_POST["updateProductSpecValue"]);

    $productSpecificationHandle = new ProductSpecifications();
    $productSpecificationHandle->setProductSpecificationId($productSpecId);
    $productSpecificationHandle->setProductSpecificationKey($updateProductSpecKey);
    $productSpecificationHandle->setProductSpecificationValue($updateProductSpecValue);

    $updateResponse = $productSpecificationHandle->updateProductSpecification();
    echo json_encode(array("isUpdated" => $updateResponse));
}
?>

<?php
if (isset($_POST["deleteProductSpecId"])) {
    $deleteSpecId = htmlentities($_POST["deleteProductSpecId"]);

    $productSpecificationHandle = new ProductSpecifications();
    $productSpecificationHandle->setProductSpecificationId($deleteSpecId);

    $deleteResponse = $productSpecificationHandle->deleteProductSpecification();
    echo json_encode(array("isDeleted" => $deleteResponse));
}
?>