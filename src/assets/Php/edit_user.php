<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>

<?php


if($_POST["username"]==''){
    redirect_with_message('message_failure',"Please enter a valid username.");
}
if(!$_POST['clusterP']){
    redirect_with_message('message_failure',"Please select atleast one cluster.");
}
if(!$_POST['panelP']){
    redirect_with_message('message_failure',"Please select atleast one privilege.");
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

redirect_with_message('message_success',"Changes successfully saved.");

?>