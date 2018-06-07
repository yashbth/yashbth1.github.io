<?php require_once("./db_connection.php"); ?>
<?php

$username = "'".$_GET['user']."'";
$curr_pass = $_POST['curr_pass'];
$new_pass = $_POST['new_pass'];
$new_pass_confirm =$_POST['new_pass_check'];

$sql = "SELECT Password FROM Dashboard_Users WHERE Username =" . $username; 
echo($sql);
echo('<br>');
$result = $conn->query($sql);
if($result->num_rows>0){
    $all_rows = array();    
    while($row = $result->fetch_assoc()){
        $all_rows[]=$row;
    }   
}

if(password_verify($curr_pass,$all_rows[0]['Password'])){
    if($new_pass==$new_pass_confirm){
        $new_pass=password_hash($new_pass,PASSWORD_DEFAULT);
        $update_pass_query = "UPDATE Dashboard_Users SET Password = '" .$new_pass. "' WHERE Username = ". $username;
        echo($update_pass_query);
        $conn->query($update_pass_query);
        setrawcookie('message_success',rawurlencode("Password successfully changed."),time() + (10), "/" );
    }
    else{
        setrawcookie('message_failure',rawurlencode("New passwords did not match, please try again."),time() + (10), "/" );
        
    }
}
else{
         setrawcookie('message_failure',rawurlencode("Incorrect password, please try again."),time() + (10), "/" );     
}
$conn->close();

header("Location: "."http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
exit;


?>