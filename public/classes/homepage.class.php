<?php

require_once("database.class.php");

class Homepage extends Database
{
    public function fetchCategories()
    {
        $selectSql = "SELECT category_name, category_icon, id FROM categories";
        $categories = $this->connect()->query($selectSql);

        return $categories;
        $this->connect()->close();
    }

    public function fetchCarouselProducts($categoryId, $brandId)
    {
        $selectSql =
            "   SELECT		products.id as productID, product_name, product_price, product_old_price, product_image
                FROM 		products, product_images
                WHERE 		product_images.product_id = products.id AND 
                            products.brand_id = $brandId AND 
                            products.category_id = $categoryId
                GROUP BY 	product_name
                LIMIT 10;
            ";
        $products = $this->connect()->query($selectSql);

        return $products;
        $this->connect()->close();
    }
}