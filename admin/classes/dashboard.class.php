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
}
?>