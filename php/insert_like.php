<?php
require_once("db_connect.php");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if ($dbi) {
    $user_id = $_REQUEST['user_id'];
    $image_id= $_REQUEST['image_id'];
    
    $q = "INSERT INTO COFFEE_SHARE_LIKES (user_id, image_id) VALUES (?,?)";
    $insertedRows = 0;
    if ($insertStmt = $dbi->prepare($q)) {
        $insertStmt->bind_param("ii", $user_id, $image_id);
        $insertStmt->execute();
        $insertedRows += $insertStmt->affected_rows;
    } else {
        echo "Error";
    }
    $insertStmt->close();
    $dbi->close();
}
echo "OK: $insertedRows item added";
?>