<?php
	define("DB_SERVER", "localhost");
	define("DB_USER", "root");
	define("DB_PASS", "yashX8mysql");
	define("DB_NAME", "swajal");

	// 1. Create a database connection
    $conn = new mysqli(DB_SERVER, DB_USER, DB_PASS, DB_NAME);
	//Test if connection occured.
    if($conn->connect_error){
        die("Connection Failed : " . $conn->connect_error);
    }
?>
