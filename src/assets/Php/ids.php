<?php require_once("./db_connection.php"); ?>
<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');

    $id = $_POST['hint'];
    $table = $_POST['table'];

    $sql = "SELECT DISTINCT DeviceID FROM $table WHERE DeviceID LIKE '$id%'";

    $result = $conn->query($sql);
	if($result->num_rows>0){
        $all_rows = array();
		while($row = $result->fetch_assoc()){
			$all_rows[]= $row;
}	
} 
 echo json_encode($all_rows);	
    $conn->close();
?>
