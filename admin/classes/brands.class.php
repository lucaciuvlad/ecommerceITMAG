<?php
require_once("database.class.php");
require_once("validations.class.php");
?>

<?php
class Brands extends Database
{
    private $brandId;
    private $brandName;

    public function setBrandId($BrandId)
    {
        $this->brandId = $BrandId;
    }

    public function setBrandName($BrandName)
    {
        $this->brandName = $BrandName;
    }

    public function selectBrands()
    {
        $sql = "SELECT brands.id as brandID, brand_name, brand_created_at FROM brands";
        $brands = $this->connect()->query($sql);

        return $brands;
    }

    public function insertCategory()
    {
        $sql = "INSERT brands (brand_name, brand_metaphone) VALUES(?, ?)";
        $stmt = $this->connect()->prepare($sql);

        $brandMetaphone = metaphone($this->brandName);
        $stmt->bind_param("ss", $this->brandName, $brandMetaphone);

        $stmt->execute();

        $stmt->close();
        $this->close();
    }

    public function updateCategory()
    {
        $sql = "UPDATE brands SET brand_name = ?, category_metaphone = ? WHERE brand_id = ?";
        $stmt = $this->connect()->prepare($sql);

        $brandMetaphone = metaphone($this->brandName);
        $stmt->bind_param("ssi", $this->brandName, $brandMetaphone, $this->categoryId);

        $stmt->execute();

        $stmt->close();
        $this->close();
    }

    public function deleteCategory()
    {
        $sql = "DELETE FROM brands WHERE brand_id = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("i", $this->brandId);

        $stmt->execute();

        $stmt->close();
        $this->close();
    }
}
?>