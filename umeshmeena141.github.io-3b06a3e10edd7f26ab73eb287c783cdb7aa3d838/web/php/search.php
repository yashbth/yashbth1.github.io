<?php
    $hostname = "localhost";
    $username = "root";
    $password = "ume12345";
    $dbname = "myDB";

    $conn = new mysqli ( $hostname, $username, $password, $dbname);
    $id = $_REQUEST['id'];

    if($conn->connect_error){
        die("Connection Error : ". $conn->connect_error);
    }
    
    $query = "SELECT * FROM MyGuests WHERE lastname LIKE '$id%' ";
    $result = $conn->query($query);
    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo $row['firstname']." ".$row['lastname']."<br>";
        }
    }
    else{
        echo "No Suggestions";
    }
    $conn->close();
    
?>