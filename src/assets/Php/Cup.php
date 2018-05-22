<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, PATCH,PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token");
    
    $username = "root";
    $password = "yashX8mysql";
    $hostname = "localhost";
    $dbname = "swajal";

    $id = $_POST['id'];
    $conn = new mysqli($hostname,$username,$password,$dbname);


    if($conn->connect_error){
        die("Connection Failed : " . $conn->connect_error);
    }
    $sql = "SELECT * FROM CupDispensing WHERE DeviceID='$id' LIMIT 10";
    $result = $conn->query($sql);
    $all_rows = array();
    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            $all_rows[]=$row;
}   
} 
        
    echo  json_encode($all_rows);
    $conn->close();

?>
