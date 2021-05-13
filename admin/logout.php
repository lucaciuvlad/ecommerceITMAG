<?php
// Logout
if (isset($_POST["logout"])) {
    session_start();
    $logout = $_POST["logout"];

    if ($logout) {
        session_destroy();
        echo json_encode(array("isLoggedOut" => true));
    }
}