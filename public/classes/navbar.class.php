<?php
class Navbar
{
    private $db;

    public function __construct($Db)
    {
        $this->db = $Db;
    }

    public function getProductCategories()
    {
        $selectCategories = "SELECT category_name, category_image FROM category";
        $catResults = $this->db->query($selectCategories);

        if ($catResults->num_rows > 0) {
            while ($catResult = $catResults->fetch_assoc()) {
                $tidyCategoryName = urlencode($catResult["category_name"]);
                $output =
                    "   <li> 
                            <a href=\"category.php?cat=$tidyCategoryName\">
                                <i class=\"$catResult[category_image]\" aria-hidden=\"true\"> </i>
                                <span> $catResult[category_name] </span>
                            </a>
                        </li>
                    ";
                echo $output;
            }
        }
    }
}