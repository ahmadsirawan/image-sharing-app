<?php 
//First load the DB connection
require_once("db_connect.php");
//This will show errors in the browser if there are some
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if ($dbi) {
    // SQL query
    $q = "SELECT COFFEE_SHARE_COMMENTS.content, COFFEE_SHARE_COMMENTS.user_id, COFFEE_SHARE_USERS.username 
            FROM COFFEE_SHARE_COMMENTS
            JOIN COFFEE_SHARE_USERS ON COFFEE_SHARE_COMMENTS.user_id = COFFEE_SHARE_USERS.id
            WHERE image_id = ?";
    // Array to translate to json
    $rArray = array();
    if ($stmt = $dbi->prepare($q)) {
        //Prepare input
        $image_id = $_REQUEST['image_id'];
        $stmt->bind_param("i",$image_id);
        //Prepare output
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($rContent,$rUser_Id, $rUsername);
        //Collect results
        while($stmt->fetch()) {
            $rArray[] = [
                "content"=>$rContent,
                "user_id"=>$rUser_Id,
                "username"=>$rUsername
            ];
        }
        
        //Encode JSON
        echo json_encode($rArray);
        
        $stmt->close();        
    }
    else {
        echo "no execute statement";
    }
}
//Inform user if error
else {
        echo "Connection Error: " . mysqli_connect_error();
}
//Close connection
mysqli_close($dbi);
    
?>
