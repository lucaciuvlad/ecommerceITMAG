<?php
require_once("database.class.php");
?>

<?php
class SearchEngine extends Database
{
    private $searchToken;

    public function __construct($SearchToken)
    {
        $this->searchToken = $SearchToken;
    }

    public function fetchNavbarSuggestions()
    {

        $selectSql = "  SELECT  products.id, product_name, product_price, product_image
                        FROM    products INNER JOIN product_images ON product_id = products.id
                        WHERE   product_metaphone LIKE CONCAT('%', ?, '%')
                        GROUP BY product_metaphone
                        LIMIT 7;
            ";
        $selectStmt = $this->connect()->prepare($selectSql);

        $metaphoneName = metaphone($this->searchToken);
        $selectStmt->bind_param("s", $metaphoneName);

        if ($selectStmt->execute()) {
            $returnedRows = $selectStmt->get_result();
            $rowNr = $returnedRows->num_rows;

            $productIds = array();
            $productNames = array();
            $productPrices = array();
            $productImages = array();

            while ($returnedSearch = $returnedRows->fetch_assoc()) {
                array_push($productIds, $returnedSearch["id"]);
                array_push($productNames, $returnedSearch["product_name"]);
                array_push($productPrices, $returnedSearch["product_price"]);
                array_push($productImages, $returnedSearch["product_image"]);
            }

            return array(
                "rowNr" => $rowNr,
                "product_id" => $productIds,
                "product_name" => $productNames,
                "product_price" => $productPrices,
                "product_image" => $productImages
            );
        }

        $selectStmt->close();
        $this->connect()->close();
    }

    public function fetchSearchSuggestions()
    {

        $selectSql = "  SELECT  products.id as productID, product_name, product_price, product_old_price, 
                                product_stock, category_name, brand_name
                        FROM    products, categories, brands
                        WHERE   product_metaphone LIKE CONCAT('%', ?, '%') AND
                                products.category_id = categories.id AND
                                products.brand_id = brands.id
                        GROUP BY product_metaphone;
            ";
        $selectStmt = $this->connect()->prepare($selectSql);

        $metaphoneName = metaphone($this->searchToken);
        $selectStmt->bind_param("s", $metaphoneName);

        if ($selectStmt->execute()) {
            $searchSuggestions = $selectStmt->get_result();
            return $searchSuggestions;
        }

        $selectStmt->close();
        $this->connect()->close();
    }
}
?>

<?php
require_once("validations.class.php");
if (isset($_POST["searchToken"])) {
    $searchString = htmlentities($_POST["searchToken"]);

    $validation = new Validation();
    $validation->setField($searchString);
    $validation->setFlag("search");
    $validation->isEmpty();

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $searchEngine = new SearchEngine($searchString);
        $searchSuggestions = $searchEngine->fetchNavbarSuggestions();
        echo json_encode($searchSuggestions);
    }
}
?>