<?php require_once("./db_connection.php"); ?>
<?php


if($_POST["username"]==''){
    setrawcookie('message_failure',rawurlencode("Please enter a valid username."),time() + (3), "/" );
    header("Location: "."http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
    exit;
}

$username = "'".$_POST["username"]."'";
$update_query = '';
$update_query .= "UPDATE Dashboard_Users SET Username =". $username;

foreach($_POST['panelP'] as $selected){
    echo ($selected);
    echo ('<br>');
    $update_query .= " , ". $selected . " = 1 " ;
}

foreach($_POST['clusterP'] as $selected){
    echo ($selected);
    echo ('<br>');
    $update_query .= " , ". $selected . " = 1 " ;
}
$update_query .= " WHERE Username = " . $username;


$delete_query='';
$sql1 = "SELECT * FROM Dashboard_Users WHERE Username = ". $username;
$result1 = $conn->query($sql1);
if($result1->num_rows>0){
    $all_rows1 = array();    
    while($row1 = $result1->fetch_assoc()){
        $keys = array_keys($row1);
        $delete_query .= "UPDATE Dashboard_Users SET Username =". $username;
        foreach($keys as $key){
            
            if($row1[$key]=='1'){
                $delete_query .=  " , ". $key . " = 0 " ;
            }

        }
        $delete_query .= " WHERE Username = " . $username;
        $resultD = $conn->query($delete_query);
        
    }   
}

$resultU = $conn->query($update_query);
$conn->close();

setrawcookie('message_success',rawurlencode("Changes successfully saved."),time() + (10), "/" );

header("Location: "."http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
exit;

?>