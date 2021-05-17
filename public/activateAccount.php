<?php
if (isset($_GET["userId"])) {
    require_once("./classes/database.class.php");

    $userId = htmlentities($_GET["userId"]);

    $dbHandler = new Database();
    $dbConn = $dbHandler->connect();

    $activateQuery = "UPDATE users SET user_active_account = 1 WHERE id = ?";
    $activateStmt = $dbConn->prepare($activateQuery);
    $activateStmt->bind_param("i", $userId);

    if ($activateStmt->execute()) {
        header("location: login.php");
    }

    $activateStmt->close();
    $dbConn->close();
}