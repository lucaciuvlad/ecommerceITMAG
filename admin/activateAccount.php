<?php
if (isset($_GET["adminId"])) {
    require_once("./classes/database.class.php");

    $adminId = htmlentities($_GET["adminId"]);

    $dbHandler = new Database();
    $dbConn = $dbHandler->connect();

    $activateQuery = "UPDATE admins SET admin_active_account = 1 WHERE id = ?";
    $activateStmt = $dbConn->prepare($activateQuery);
    $activateStmt->bind_param("i", $adminId);

    if ($activateStmt->execute()) {
        header("location: login.php");
    }

    $activateStmt->close();
    $dbConn->close();
}