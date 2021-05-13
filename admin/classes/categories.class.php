<?php
require_once("database.class.php");
require_once("validations.class.php");
?>

<?php
class Categories extends Database
{
    private $categoryId;
    private $categoryName;
    private $categoryIcon;
    private $categorySpecs;

    public function setCategoryId($CategoryId)
    {
        $this->categoryId = $CategoryId;
    }

    public function setCategoryName($CategoryName)
    {
        $this->categoryName = $CategoryName;
    }

    public function setCategoryIcon($CategoryIcon)
    {
        $this->categoryIcon = $CategoryIcon;
    }

    public function setCategorySpecs($CategorySpecs)
    {
        $this->categorySpecs = $CategorySpecs;
    }

    public function selectCategories()
    {
        $sql = "SELECT categories.id as categoryID, category_name, category_icon, category_created_at FROM categories";
        $categories = $this->connect()->query($sql);

        return $categories;
    }

    public function insertCategory()
    {
        $sql = "INSERT INTO categories(category_name, category_metaphone, category_image, category_specs) VALUES(?, ?, ?, ?)";
        $stmt = $this->connect()->prepare($sql);

        $categoryMetaphone = metaphone($this->categoryName);
        $stmt->bind_param("ssss", $this->categoryName, $categoryMetaphone, $this->categoryIcon, $this->categorySpecs);

        $stmt->execute();

        $stmt->close();
        $this->close();
    }

    public function updateCategory()
    {
        $sql = "UPDATE categories SET category_name = ?, category_metaphone = ?, category_image = ?, category_specs = ? WHERE category_id = ?";
        $stmt = $this->connect()->prepare($sql);

        $categoryMetaphone = metaphone($this->categoryName);
        $stmt->bind_param("ssssi", $this->categoryName, $categoryMetaphone, $this->categoryIcon, $this->categorySpecs, $this->categoryId);

        $stmt->execute();

        $stmt->close();
        $this->close();
    }

    public function deleteCategory()
    {
        $sql = "DELETE FROM categories WHERE category_id = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("i", $this->categoryId);

        $stmt->execute();

        $stmt->close();
        $this->close();
    }
}
?>