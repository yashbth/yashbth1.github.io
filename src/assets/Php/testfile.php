<?php
    
    $username = "root";
    $password = "ume12345";
    $hostname = "localhost";
    $dbname = "swajal";

    $conn = new mysqli($hostname,$username,$password,$dbname);

    if($conn->connect_error){
        die("Connection Failed : " . $conn->connect_error);
    }
    $sql = "SELECT Total_Volume_Dispensed,Total_collection_from_card,Total_collection_from_coin,pH_of_water,Total_Collection_Sale,Total_Coin_Count1,TimeStamp,DeviceID FROM Water_Dispensing_Panel WHERE DeviceID='VSDMDV11710AAG' LIMIT 1";
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
