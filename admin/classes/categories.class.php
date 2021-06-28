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

    public function selectCategories()
    {
        $sql = "SELECT categories.id as categoryID, category_name, category_icon, category_created_at FROM categories";
        $categories = $this->connect()->query($sql);

        return $categories;
    }

    public function insertCategory()
    {
        $sql = "INSERT INTO categories(category_name, category_icon) VALUES(?, ?)";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("ss", $this->categoryName, $this->categoryIcon);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }

    public function updateCategory()
    {
        $sql = "UPDATE categories SET category_name = ?, category_icon = ? WHERE id = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("ssi", $this->categoryName, $this->categoryIcon, $this->categoryId);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }

    public function deleteCategory()
    {
        $sql = "DELETE FROM categories WHERE id = ?";
        $stmt = $this->connect()->prepare($sql);

        $stmt->bind_param("i", $this->categoryId);

        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }

        $stmt->close();
        $this->close();
    }
}
?>

<?php
if (isset($_POST["categoryName"]) && isset($_POST["categoryIcon"])) {
    $categoryName = htmlentities($_POST["categoryName"]);
    $categoryIcon = htmlentities($_POST["categoryIcon"]);

    $validation = new Validation();
    $validation->setField($categoryName);
    $validation->setFlag("categoryName");
    $validation->isEmpty();
    $validation->isNumeric();

    $validation->setField($categoryIcon);
    $validation->setFlag("categoryIcon");
    $validation->isEmpty();
    $validation->isNumeric();

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $categoriesHandler = new Categories();
        $categoriesHandler->setCategoryName($categoryName);
        $categoriesHandler->setCategoryIcon($categoryIcon);
        $insertResult = $categoriesHandler->insertCategory();

        echo json_encode(array("isInserted" => $insertResult));
    }
}
?>

<?php
if (isset($_POST["updateCategoryId"]) && isset($_POST["updateCategoryName"]) && isset($_POST["updateCategoryIcon"])) {
    $categoryId = htmlentities($_POST["updateCategoryId"]);
    $updateCategoryName = htmlentities($_POST["updateCategoryName"]);
    $updateCategoryIcon = htmlentities($_POST["updateCategoryIcon"]);

    $validation = new Validation();
    $validation->setField($updateCategoryName);
    $validation->setFlag("updateCategoryName");
    $validation->isEmpty();
    $validation->isNumeric();
    $validation->dbValidation("category_name", "categories", "s");

    $validation->setField($updateCategoryIcon);
    $validation->setFlag("updateCategoryIcon");
    $validation->isEmpty();
    $validation->isNumeric();

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $categoriesHandler = new Categories();
        $categoriesHandler->setCategoryId($categoryId);
        $categoriesHandler->setCategoryName($updateCategoryName);
        $categoriesHandler->setCategoryIcon($updateCategoryIcon);
        $updateResult = $categoriesHandler->updateCategory();

        echo json_encode(array("isUpdated" => $updateResult));
    }
}
?>

<?php
if (isset($_POST["deleteCategoryId"])) {
    $categoryId = htmlentities($_POST["deleteCategoryId"]);

    $categoriesHandle = new Categories();
    $categoriesHandle->setCategoryId($categoryId);
    $deleteResult = $categoriesHandle->deleteCategory();

    echo json_encode(array("isDeleted" => $deleteResult));
}
?>