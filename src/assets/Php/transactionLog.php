<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>

<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PATCH,PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");

    $id = $_POST['id'];
    $table = $_POST['table'];
  
 
    $tor = $_POST['tor'];
    $fromDate = $_POST['fromDate'];
    $toDate = $_POST['toDate'];
    
    if($tor === '00'){
        $sql = "SELECT * FROM ".$table." WHERE DeviceID='".$id."' AND Type_of_Request='0' AND TapNo ='0' AND date BETWEEN '". $fromDate ."' AND '". $toDate ."' ORDER BY date DESC";  
    }
    else if($tor === '0'){
        $sql = "SELECT * FROM ".$table." WHERE DeviceID='".$id."' AND Type_of_Request='".$tor."' AND TapNo != '0' AND date BETWEEN '". $fromDate ."' AND '". $toDate ."' ORDER BY date DESC";
    }
    else{
        $sql = "SELECT * FROM ".$table." WHERE DeviceID='".$id."' AND Type_of_Request='".$tor."' AND date BETWEEN '". $fromDate ."' AND '". $toDate ."' ORDER BY date DESC";
        
    }

    // echo("<script>console.log('PHP: ".$sql."');</script>");

    $result = $conn->query($sql);

    if($result->num_rows>0){
        $all_rows = array();        
        while($row = $result->fetch_assoc()){
            $all_rows[]=$row;
        }   
    }
    else{
        // redirect_with_message('message_failure',"No details.");
        
    }
        
    echo  json_encode($all_rows);
    $conn->close();

?>
