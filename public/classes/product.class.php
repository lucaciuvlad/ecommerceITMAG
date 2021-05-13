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
            "   SELECT  product_name, product_price, product_old_price, brand_name, category_name
                FROM    products, brands, categories
                WHERE   products.id = $this->productId;    
            ";

        $productInfo = $this->connect()->query($selectProductInfo)->fetch_assoc();
        $this->close();

        return $productInfo;
    }

    public function getProductImages()
    {
        $selectProductImages = "SELECT product_image FROM product_images WHERE product_id = $this->productId";
        $productImages = $this->connect()->query($selectProductImages);
        $this->close();

        return $productImages;
    }

    public function getProductSpecTabs()
    {
        $selectProductSpecTabs =
            "   SELECT DISTINCT (product_specification_tab), product_id, product_specification_tab_id
                FROM	product_full_specs, product_specification_tabs
                WHERE 	product_id = $this->productId AND product_specification_tab_id = product_specification_tabs.id;
            ";
        $productSpecTabs = $this->connect()->query($selectProductSpecTabs);
        $this->close();

        return $productSpecTabs;
    }

    public function getProductSpecSubtabs()
    {
        $selectProductSpecSubtabs =
            "   SELECT DISTINCT (product_specification_subtab), product_id, product_specification_subtab_id
                FROM	product_full_specs, product_specification_subtabs
                WHERE 	product_id = $this->productId AND product_specification_subtab_id = product_specification_subtabs.id;
            ";
        $productSpecSubtabs = $this->connect()->query($selectProductSpecSubtabs);
        $this->close();

        return $productSpecSubtabs;
    }

    public function getProductSpecs()
    {
        $selectProductSpecs =
            "   SELECT DISTINCT (product_specification), product_id, product_specification_id
                FROM	product_full_specs, product_specifications
                WHERE 	product_id = $this->productId AND product_specification_id = product_specifications.id;
            ";
        $productSpecs = $this->connect()->query($selectProductSpecs);
        $this->close();

        return $productSpecs;
    }
}