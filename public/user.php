<?php
session_start();
?>

<a href="logout.php"> Logout </a>


<?php
echo $_SESSION["client"];
?>