<?php
require_once("database.class.php");
?>

<?php
class Dashboard extends Database
{
    public function getEntriesNumber($table, $alias)
    {
        $selectSql = "SELECT COUNT($table.id) AS $alias FROM $table";
        $entriesNumber = $this->connect()->query($selectSql)->fetch_assoc()[$alias];

        return $entriesNumber;
    }

    public function getOrdersSum()
    {
        $selectSumDetails =
            "   SELECT  product_price, quantity 
                FROM    order_details, products
                WHERE   order_details.product_id = products.id;
            ";
        $sumDetails = $this->connect()->query($selectSumDetails);

        $finalSum = 0;
        foreach ($sumDetails as $sumDetail) {
            $finalSum += $sumDetail["quantity"] * $sumDetail["product_price"];
        }

        return $finalSum;
    }
}
?>