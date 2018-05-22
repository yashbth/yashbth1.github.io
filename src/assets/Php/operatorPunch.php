<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    $username = "root";
    $password = "yashX8mysql";
    $hostname = "localhost";
    $dbname = "swajal";

    
    $operatorId = $_POST['operatorId'];
    $id = $_POST['id'];
    $date = $_POST['date'];

    $conn = new mysqli($hostname,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection Failed : " . $conn->connect_error);
    }
    if($date!=''){
	$sql = "SELECT * FROM Operator_Attendence WHERE OperatorID='$operatorId' AND DeviceID='$id' AND PunchTime LIKE '$date%'";
    }
    else{
	$sql = "SELECT * FROM Operator_Attendence WHERE OperatorID='$operatorId' AND DeviceID='$id'";
    }
    
    $result = $conn->query($sql);
	$all_rows=[];
	if($result->num_rows>0){
		while($row = $result->fetch_assoc()){
			$all_rows[]= $row;
}	
} 
 echo json_encode($all_rows);	
    $conn->close();
?>
