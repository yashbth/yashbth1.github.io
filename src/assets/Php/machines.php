<?php require_once("./db_connection.php"); ?>
<?php

    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    
    $table = $_POST['table'];
//     if (!(isset($_SERVER['PHP_AUTH_USER'], $_SERVER['PHP_AUTH_PW']) 
//     && $_SERVER['PHP_AUTH_USER'] == 'myuser' 
//     && $_SERVER['PHP_AUTH_PW'] == 'mypswd')) {
//     header('WWW-Authenticate: Basic realm="Restricted area"');
//     header('HTTP/1.1 401 Unauthorized');
// }
    $sql = "SELECT DISTINCT * FROM $table ORDER BY Cluster_Name ASC";
    $result = $conn->query($sql);
	if($result->num_rows>0){
        $all_rows=array();
		while($row = $result->fetch_assoc()){
			$all_rows[]= $row;
}	
} 
 echo json_encode($all_rows);	
    $conn->close();
?>
