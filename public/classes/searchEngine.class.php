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

    public function fetchSearchSuggestions()
    {
        $metaphoneSearch = metaphone($this->searchToken);
        $selectSql =
            "   SELECT	products.id as productID, product_name, product_price, product_old_price, product_image
                FROM	products, product_images
                WHERE 	product_metaphone LIKE concat('%', \"$metaphoneSearch\", '%') AND product_images.product_id = products.id
                GROUP BY products.id
            ";
        $suggestionsProducts = $this->connect()->query($selectSql);

        return $suggestionsProducts;
    }

    public function fetchFilteredSearchSuggestions($filterName)
    {
        $metaphoneSearch = metaphone($this->searchToken);
        $selectSql =
            "   SELECT	products.id as productID, product_name, product_price, product_old_price, product_image
                FROM	products, product_images
                WHERE 	product_metaphone LIKE concat('%', \"$metaphoneSearch\", '%') AND product_images.product_id = products.id
                GROUP BY products.id
                ORDER BY product_price $filterName
            ";
        $suggestionsProducts = $this->connect()->query($selectSql);

        $productIds = array();
        $productNames = array();
        $productPrices = array();
        $productOldPrices = array();
        $productImages = array();

        foreach ($suggestionsProducts as $suggestionsProduct) {
            array_push($productIds, $suggestionsProduct["productID"]);
            array_push($productNames, $suggestionsProduct["product_name"]);
            array_push($productPrices, $suggestionsProduct["product_price"]);
            array_push($productOldPrices, $suggestionsProduct["product_old_price"]);
            array_push($productImages, $suggestionsProduct["product_image"]);
        }

        $filteredResults = array(
            "productId" => $productIds,
            "productName" => $productNames,
            "productPrice" => $productPrices,
            "productOldPrice" => $productOldPrices,
            "productImage" => $productImages
        );

        return $filteredResults;
    }

    public function fetchColumnFilteredSearchSuggestions($columnName)
    {
        $metaphoneSearch = metaphone($this->searchToken);
        $selectSql =
            "   SELECT	products.id as productID, product_name, product_price, product_old_price, product_image
                FROM	products, product_images
                WHERE 	product_metaphone LIKE concat('%', \"$metaphoneSearch\", '%') AND product_images.product_id = products.id AND
                        $columnName IS NOT NULL
                GROUP BY products.id
            ";
        $suggestionsProducts = $this->connect()->query($selectSql);

        $productIds = array();
        $productNames = array();
        $productPrices = array();
        $productOldPrices = array();
        $productImages = array();

        foreach ($suggestionsProducts as $suggestionsProduct) {
            array_push($productIds, $suggestionsProduct["productID"]);
            array_push($productNames, $suggestionsProduct["product_name"]);
            array_push($productPrices, $suggestionsProduct["product_price"]);
            array_push($productOldPrices, $suggestionsProduct["product_old_price"]);
            array_push($productImages, $suggestionsProduct["product_image"]);
        }

        $filteredResults = array(
            "productId" => $productIds,
            "productName" => $productNames,
            "productPrice" => $productPrices,
            "productOldPrice" => $productOldPrices,
            "productImage" => $productImages
        );

        return $filteredResults;
    }
}
?>

<?php
require_once("validations.class.php");
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

<?php
if (isset($_POST["queryString"]) && isset($_POST["filterName"])) {
    $queryString = htmlentities($_POST["queryString"]);
    $filterName = htmlentities($_POST["filterName"]);

    if ($filterName == "Pret crescator") {
        $filterName = "ASC";
    } else if ($filterName == "Pret descrescator") {
        $filterName = "DESC";
    }

    $searchEngineHandler = new SearchEngine($queryString);

    if ($filterName == "La reducere") {
        $filterResults = $searchEngineHandler->fetchColumnFilteredSearchSuggestions("product_old_price");
    } else {
        $filterResults = $searchEngineHandler->fetchFilteredSearchSuggestions($filterName);
    }

    echo json_encode($filterResults);
}
?>