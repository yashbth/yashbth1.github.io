
<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>
<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    
    $id = $_POST['id'];
    $table = $_POST['table'];
    $sql1= "SELECT Time FROM $table WHERE DeviceID='$id' ORDER BY date DESC LIMIT 1";
    $result1 = $conn->query($sql1);
    if($result1->num_rows>0) {
        while ($row = $result1->fetch_assoc()) {   
            $lastUpdated = $row['Time'];
        }
    }
    $sql2 ="SELECT DISTINCT CardNo FROM $table WHERE DeviceID='$id'"; 
    // echo($sql);
    $result2 = $conn->query($sql2);
	 if($result2->num_rows>0) {
		    $all_rows=array();
            while ($row = $result2->fetch_assoc()) {   
                array_walk($row,"unitConv") ;  
                $row['lastUpdated']=$lastUpdated;        
                $all_rows[]=$row;
            }
}
    echo json_encode($all_rows);  
    $conn->close();
?>
