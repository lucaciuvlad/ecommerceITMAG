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

        $selectSql = "  SELECT  products.id, product_name, product_price, product_image
                        FROM    products INNER JOIN product_images ON product_id = products.id
                        WHERE   product_name LIKE CONCAT('%', ?, '%') OR 
                                product_metaphone LIKE CONCAT('%', ?, '%') OR
                                products.id LIKE CONCAT('%', ?, '%')
                        GROUP BY product_name;
            ";
        $selectStmt = $this->connect()->prepare($selectSql);

        $metaphoneName = metaphone($this->searchToken);
        $selectStmt->bind_param("ssi", $this->searchToken, $metaphoneName, $this->searchToken);

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
}
?>

<?php
require_once("./validations.class.php");
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
        $searchSuggestions = $searchEngine->fetchSuggestions();
        echo json_encode($searchSuggestions);
    }
}
?>