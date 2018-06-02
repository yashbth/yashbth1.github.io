<?php require_once("./db_connection.php"); ?>
<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    
    $username = $_POST['uname'];
    $password = $_POST['psw'];
    $sql = "SELECT * FROM Dashboard_Users WHERE Username='$username' ";
    $result = $conn->query($sql);
	if($result->num_rows>0){
        $all_rows=array();
		while($row = $result->fetch_assoc()){
            if ($username==$row['Username'] && $password == $row['Password']) {
                echo json_encode($row);
            }
        }	
    } 

//  	
    $conn->close();
?>
