<?php 
require_once("db_connect.php");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($dbi) {
   $q = "SELECT id as likes FROM COFFEE_SHARE_LIKES WHERE user_id = ? AND image_id = ?";

    
    $rArray = array();

    if ($stmt = $dbi->prepare($q)) {
        
        $User_id = $_REQUEST['user_id'];
        $Image_id = $_REQUEST['image_id'];
        
        $stmt->bind_param("ii",$User_id,$Image_id);
       
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rLikes);

        while($stmt->fetch()) {
            $rArray[] = [
                "likes"=>$rLikes                
            ];
        }
        
        echo json_encode($rArray);
        
        $stmt->close();        
    }
    else {
        echo "no execute statement";
    }
}
else {
        echo "Connection Error: " . mysqli_connect_error();
}

mysqli_close($dbi);
    
?>