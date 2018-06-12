<?php require_once("./db_connection.php"); ?>
<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    $id = $_POST['id'];
    $table = $_POST['table'];

    $sql = "SELECT DISTINCT OperatorID FROM $table WHERE DeviceID='$id'";
    // echo($sql);
    $result = $conn->query($sql);
	if($result->num_rows>0){
		$all_rows=array();
		while($row = $result->fetch_assoc()){
            // print_r($row);
            // echo('space');
            $all_rows[]= $row;
            // print_r($all_rows);
}	
} 
 echo json_encode($all_rows);	
    $conn->close();
?>
