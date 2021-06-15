<?php
require_once("database.class.php");

class Category extends Database
{
    private $categoryId;
    private $brandId;

    public function setCategoryId($CategoryId)
    {
        $this->categoryId = $CategoryId;
    }

    public function setBrandId($BrandId)
    {
        $this->brandId = $BrandId;
    }

    public function getCategoryName()
    {
        $selectSql = "SELECT category_name FROM categories WHERE id = $this->categoryId";
        $categoryName = $this->connect()->query($selectSql);

        return $categoryName;
    }

    public function getCategoryProducts()
    {
        $selectSql =
            "   SELECT	products.id as productID, product_name, product_price, product_old_price, product_image
                FROM	products, product_images
                WHERE 	products.category_id = $this->categoryId AND product_images.product_id = products.id
                GROUP BY products.id
            ";
        $categoryProducts = $this->connect()->query($selectSql);

        return $categoryProducts;
    }

    public function getCategoryBrandProducts()
    {
        $selectSql =
            "   SELECT	products.id as productID, product_name, product_price, product_old_price, product_image
                FROM	products, product_images
                WHERE 	products.category_id = $this->categoryId AND products.brand_id = $this->brandId AND 
                        product_images.product_id = products.id
                GROUP BY products.id
        ";
        $categoryBrandProducts = $this->connect()->query($selectSql);

        return $categoryBrandProducts;
    }

    public function getFilteredProducts($filter)
    {
        $selectSql =
            "   SELECT	products.id as productID, product_name, product_price, product_old_price, product_image
                FROM	products, product_images
                WHERE 	products.category_id = $this->categoryId AND product_images.product_id = products.id
                GROUP BY products.id
                ORDER BY product_price $filter;
            ";

        $filteredProducts = $this->connect()->query($selectSql);

        $productIds = array();
        $productNames = array();
        $productPrices = array();
        $productOldPrices = array();
        $productImages = array();

        foreach ($filteredProducts as $filteredProduct) {
            array_push($productIds, $filteredProduct["productID"]);
            array_push($productNames, $filteredProduct["product_name"]);
            array_push($productPrices, $filteredProduct["product_price"]);
            array_push($productOldPrices, $filteredProduct["product_old_price"]);
            array_push($productImages, $filteredProduct["product_image"]);
        }

        $filteredResults = array(
            "productId" => $productIds,
            "productName" => $productNames,
            "productPrice" => $productPrices,
            "productOldPrice" => $productOldPrices,
            "productImage" => $productImages
        );

        return $filteredResults;
    }

    public function getColumnFilteredProducts($columnName)
    {
        $selectSql =
            "   SELECT	products.id as productID, product_name, product_price, product_old_price, product_image
                FROM	products, product_images
                WHERE 	products.category_id = $this->categoryId AND product_images.product_id = products.id AND
                        $columnName IS NOT NULL
                GROUP BY products.id
        ";

        $filteredProducts = $this->connect()->query($selectSql);

        $productIds = array();
        $productNames = array();
        $productPrices = array();
        $productOldPrices = array();
        $productImages = array();

        foreach ($filteredProducts as $filteredProduct) {
            array_push($productIds, $filteredProduct["productID"]);
            array_push($productNames, $filteredProduct["product_name"]);
            array_push($productPrices, $filteredProduct["product_price"]);
            array_push($productOldPrices, $filteredProduct["product_old_price"]);
            array_push($productImages, $filteredProduct["product_image"]);
        }

        $filteredResults = array(
            "productId" => $productIds,
            "productName" => $productNames,
            "productPrice" => $productPrices,
            "productOldPrice" => $productOldPrices,
            "productImage" => $productImages
        );

        return $filteredResults;
    }
}
?>

<?php
if (isset($_POST["filterName"]) && isset($_POST["categoryID"])) {
    $filterName = htmlentities($_POST["filterName"]);
    $categoryID = htmlentities($_POST["categoryID"]);

    if ($filterName == "Pret crescator") {
        $filterName = "ASC";
    } else if ($filterName == "Pret descrescator") {
        $filterName = "DESC";
    }

    $categoryHandler = new Category();
    $categoryHandler->setCategoryId($categoryID);

    if ($filterName == "La reducere") {
        $filterResults = $categoryHandler->getColumnFilteredProducts("product_old_price");
    } else {
        $filterResults = $categoryHandler->getFilteredProducts($filterName);
    }

    echo json_encode($filterResults);
}
?>