<?php
require_once("database.class.php");
?>

<?php
class Dashboard extends Database
{
    public function getProductsNumber()
    {
        $selectSql = "SELECT COUNT(products.id) AS productsNumber FROM products";
        $productsNumber = $this->connect()->query($selectSql)->fetch_assoc()["productsNumber"];

        return $productsNumber;
    }

    public function getAdminsNumber()
    {
        $selectSql = "SELECT COUNT(admins.id) AS adminsNumber FROM admins";
        $adminsNumber = $this->connect()->query($selectSql)->fetch_assoc()["adminsNumber"];

        return $adminsNumber;
    }

    public function getCategoriesNumber()
    {
        $selectSql = "SELECT COUNT(categories.id) AS categoriesNumber FROM categories";
        $categoriesNumber = $this->connect()->query($selectSql)->fetch_assoc()["categoriesNumber"];

        return $categoriesNumber;
    }

    public function getBrandsNumber()
    {
        $selectSql = "SELECT COUNT(brands.id) AS brandsNumber FROM brands";
        $brandsNumber = $this->connect()->query($selectSql)->fetch_assoc()["brandsNumber"];

        return $brandsNumber;
    }
}
?>