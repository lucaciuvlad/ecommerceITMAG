<?php
require_once("database.class.php");

class Product extends Database
{
    private $productId;

    public function setProductId($ProductId)
    {
        $this->productId = $ProductId;
    }

    public function getProductInfo()
    {
        $selectProductInfo =
            "   SELECT  product_name, product_price, product_old_price, product_stock, brand_name, category_name,
                        brands.id as brandID, categories.id as categoryID
                FROM    products, brands, categories
                WHERE   products.id = $this->productId;    
            ";

        $productInfo = $this->connect()->query($selectProductInfo)->fetch_assoc();
        $this->connect()->close();

        return $productInfo;
    }

    public function getProductImages()
    {
        $selectProductImages = "SELECT product_image FROM product_images WHERE product_id = $this->productId";
        $productImages = $this->connect()->query($selectProductImages);
        $this->connect()->close();

        return $productImages;
    }

    public function getProductDescriptions()
    {
        $selectProductDescriptions =
            "   SELECT  product_description_title, product_description_body, product_description_image
                FROM    product_descriptions
                WHERE   product_id = $this->productId
            ";
        $productDescriptions = $this->connect()->query($selectProductDescriptions);
        $this->connect()->close();

        return $productDescriptions;
    }
}