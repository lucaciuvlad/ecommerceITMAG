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
            "   SELECT  products.id AS productID, product_name, product_price, product_old_price, product_stock, 
                        brands.id AS brandID, brand_name, categories.id AS categoryID, category_name
                FROM    products, brands, categories
                WHERE   products.id = $this->productId AND 
                        products.brand_id = brands.id AND products.category_id = categories.id
                GROUP BY products.id;    
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

    public function getProductSpecifications()
    {
        $selectProductSpecifications =
            "   SELECT  product_specification_key, product_specification_value
                FROM    product_specifications
                WHERE   product_id = $this->productId
            ";
        $productSpecifications = $this->connect()->query($selectProductSpecifications);
        $this->connect()->close();

        return $productSpecifications;
    }
}