<?php
session_start();

if (isset($_SESSION["client"])) {
    session_destroy();

    header("location: index.php");
}