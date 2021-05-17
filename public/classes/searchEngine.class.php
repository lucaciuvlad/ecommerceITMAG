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

    public function fetchSuggestions()
    {

        $selectSql = "  SELECT  products.id, product_name, product_image
                        FROM    products INNER JOIN product_images ON product_id = products.id
                        WHERE   product_metaphone LIKE CONCAT('%', ?, '%')
                        GROUP BY product_name
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
            $productImages = array();

            while ($returnedSearch = $returnedRows->fetch_assoc()) {
                array_push($productIds, $returnedSearch["id"]);
                array_push($productNames, $returnedSearch["product_name"]);
                array_push($productImages, $returnedSearch["product_image"]);
            }

            return array(
                "rowNr" => $rowNr,
                "product_id" => $productIds,
                "product_name" => $productNames,
                "product_image" => $productImages
            );
        }

        $selectStmt->close();
        $this->connect()->close();
    }
}
?>

<?php
require_once("./validations.class.php");
if (isset($_POST["searchString"])) {
    $searchString = htmlentities($_POST["searchString"]);

    $validation = new Validation();
    $validation->setField($searchString);
    $validation->setFlag("searchString");
    $validation->isEmpty();
    $validation->isNumeric();

    $validationErrors = $validation->getErrorMessges();

    if ($validationErrors != null) {
        echo json_encode($validationErrors);
    } else {
        $searchEngine = new SearchEngine($searchString);
        $searchSuggestions = $searchEngine->fetchSuggestions();
        echo json_encode($searchSuggestions);
    }
}
?>