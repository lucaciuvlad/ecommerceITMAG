<?php
require_once("database.class.php");
require_once("validations.class.php");
?>

<?php
class Products extends Database
{
    private $productId;
    private $productName;
    private $productPrice;
    private $productOldPrice;
    private $productStock;
    private $productCategoryId;
    private $productBrandId;

    public function setProductId($ProductId)
    {
        $this->productId = $ProductId;
    }

    public function setProductName($ProductName)
    {
        $this->productName = $ProductName;
    }

    public function setProductPrice($ProductPrice)
    {
        $this->productPrice = $ProductPrice;
    }

    public function setProductOldPrice($ProductOldPrice)
    {
        $this->productOldPrice = $ProductOldPrice;
    }

    public function setProductCategoryId($ProductCategoryId)
    {
        $this->productCategoryId = $ProductCategoryId;
    }

    public function setProductBrandId($ProductBrandId)
    {
        $this->productBrandId = $ProductBrandId;
    }

    public function setProductStock($ProductStock)
    {
        $this->productStock = $ProductStock;
    }

    public function selectProducts()
    {
        $selectProducts =
            "   SELECT	products.id AS productID, product_name, product_price, product_old_price, product_stock, 
                        category_name, brand_name

                FROM	products, categories, brands
                
                WHERE	products.category_id = categories.id AND 
                        products.brand_id = brands.id;
            ";
        $products = $this->connect()->query($selectProducts);

        return $products;
    }

    public function selectProduct()
    {
        $selectProduct =
            "   SELECT	products.id AS productID, product_name, product_price, product_old_price, product_stock, 
                        category_name, brand_name

                FROM	products, categories, brands
    
                WHERE	products.category_id = categories.id AND 
                        products.brand_id = brands.id AND
                        products.id = ?;
            ";
        $selectProductStmt = $this->connect()->prepare($selectProduct);
        $selectProductStmt->bind_param("i", $this->productId);

        if ($selectProductStmt->execute()) {
            $product = $selectProductStmt->get_result();
            return $product;
        }
        $selectProductStmt->close();
        $this->connect()->close();
    }

    public function insertProduct()
    {
        $insertSql = "INSERT INTO products(product_name, product_metaphone, product_price, product_old_price, product_stock, brand_id, category_id) VALUES(?, ?, ?, ?, ?, ?, ?)";
        $insertStmt = $this->connect()->prepare($insertSql);

        $productMetaphone = metaphone($this->productName);

        $insertStmt->bind_param(
            "ssddiii",
            $this->productName,
            $productMetaphone,
            $this->productPrice,
            $this->productOldPrice,
            $this->productStock,
            $this->productBrandId,
            $this->productCategoryId
        );

        if ($insertStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $insertStmt->close();
        $this->connect()->close();
    }

    public function updateProduct()
    {
        $updateSql =
            "   UPDATE products 
                SET product_name = ?, product_metaphone = ?, product_price = ?, product_old_price = ?, product_stock = ?, category_id = ?, brand_id = ?
                WHERE id = ?;
            ";
        $updateStmt = $this->connect()->prepare($updateSql);

        $productMetaphone = metaphone($this->productName);

        $updateStmt->bind_param(
            "ssddiiii",
            $this->productName,
            $productMetaphone,
            $this->productPrice,
            $this->productOldPrice,
            $this->productStock,
            $this->productCategoryId,
            $this->productBrandId,
            $this->productId
        );

        if ($updateStmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function deleteProduct()
    {
        $deleteSql = "DELETE FROM products WHERE products.id = ?";
        $deleteStmt = $this->connect()->prepare($deleteSql);
        $deleteStmt->bind_param("i", $this->productId);

        if ($deleteStmt->execute()) {
            return true;
        } else {
            return false;
        }

        $deleteStmt->close();
        $this->connect()->close();
    }
}
?>

<?php
// Insert Product
if (
    isset($_POST["productName"]) && isset($_POST["productPrice"]) &&
    isset($_POST["productCategoryId"]) && isset($_POST["productBrandId"])
    && isset($_POST["productStock"])
) {
    $productName = htmlentities($_POST["productName"]);
    $productPrice = htmlentities($_POST["productPrice"]);
    $productCategoryId = htmlentities($_POST["productCategoryId"]);
    $productBrandId = htmlentities($_POST["productBrandId"]);
    $productStock = htmlentities($_POST["productStock"]);

    $validation = new Validation();
    $validation->setField($productName);
    $validation->setFlag("productName");
    $validation->isEmpty();
    $validation->dbValidation("product_name", "products", "s");

    $validation->setField($productPrice);
    $validation->setFlag("productPrice");
    $validation->isEmpty();

    $validation->setField($productCategoryId);
    $validation->setFlag("productCategory");
    $validation->isEmpty();

    $validation->setField($productBrandId);
    $validation->setFlag("productBrand");
    $validation->isEmpty();

    $validation->setField($productStock);
    $validation->setFlag("productStock");
    $validation->isEmpty();

    if (isset($_POST["productOldPrice"])) {
        $productOldPrice = htmlentities($_POST["productOldPrice"]);

        $validation->setField($productOldPrice);
        $validation->setFlag("productOldPrice");
        $validation->isEmpty();
    }

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($errorMessages);
    } else {
        $productsHandle = new Products();

        $productsHandle->setProductName($productName);
        $productsHandle->setProductPrice($productPrice);

        if (isset($_POST["productOldPrice"])) {
            $productOldPrice = htmlentities($_POST["productOldPrice"]);
            $productsHandle->setProductOldPrice($productOldPrice);
        }

        $productsHandle->setProductCategoryId($productCategoryId);
        $productsHandle->setProductBrandId($productBrandId);
        $productsHandle->setProductStock($productStock);
        $insertResult = $productsHandle->insertProduct();

        echo json_encode(array("isInserted" => $insertResult));
    }
}
?>

<?php
// Update Product
if (
    isset($_POST["updateProductName"]) && isset($_POST["updateProductPrice"]) &&
    isset($_POST["updateProductCategoryId"]) && isset($_POST["updateProductBrandId"])
    && isset($_POST["updateProductStock"]) && isset($_POST["updateProductId"])
) {
    $updateProductName = htmlentities($_POST["updateProductName"]);
    $updateProductPrice = htmlentities($_POST["updateProductPrice"]);
    $updateProductCategoryId = htmlentities($_POST["updateProductCategoryId"]);
    $updateProductBrandId = htmlentities($_POST["updateProductBrandId"]);
    $updateProductStock = htmlentities($_POST["updateProductStock"]);
    $updateProductId = htmlentities($_POST["updateProductId"]);

    $validation = new Validation();
    $validation->setField($updateProductName);
    $validation->setFlag("updateProductName");
    $validation->isEmpty();
    $validation->dbValidation("product_name", "products", "s");

    $validation->setField($updateProductPrice);
    $validation->setFlag("updateProductPrice");
    $validation->isEmpty();

    $validation->setField($updateProductCategoryId);
    $validation->setFlag("updateProductCategory");
    $validation->isEmpty();

    $validation->setField($updateProductBrandId);
    $validation->setFlag("updateProductBrand");
    $validation->isEmpty();

    $validation->setField($updateProductStock);
    $validation->setFlag("updateProductStock");
    $validation->isEmpty();

    if (isset($_POST["updateProductOldPrice"])) {
        $updateProductOldPrice = htmlentities($_POST["updateProductOldPrice"]);

        $validation->setField($updateProductOldPrice);
        $validation->setFlag("updateProductOldPrice");
        $validation->isEmpty();
    }

    $validationErrors = $validation->getErrorMessges();
    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $productsHandle = new Products();

        $productsHandle->setProductId($updateProductId);
        $productsHandle->setProductName($updateProductName);
        $productsHandle->setProductPrice($updateProductPrice);

        if (isset($_POST["updateProductOldPrice"])) {
            $productOldPrice = htmlentities($_POST["updateProductOldPrice"]);
            $productsHandle->setProductOldPrice($updateProductOldPrice);
        }

        $productsHandle->setProductCategoryId($updateProductCategoryId);
        $productsHandle->setProductBrandId($updateProductBrandId);
        $productsHandle->setProductStock($updateProductStock);
        $updateResult = $productsHandle->updateProduct();

        echo json_encode(array("isUpdated" => $updateResult));
    }
}
?>

<?php
// Delete Product
if (isset($_POST["deleteProductId"])) {
    $productId = htmlentities($_POST["deleteProductId"]);

    $productsHandle = new Products();
    $productsHandle->setProductId($productId);
    $deleteResult = $productsHandle->deleteProduct();

    echo json_encode(array("isDeleted" => $deleteResult));
}
?>