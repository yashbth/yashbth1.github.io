<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>

<?php

if($_POST["username"]==''){
    redirect_with_message('message_failure',"Please enter a valid username.");
}
$username = "'".$_POST["username"]."'";
$pass = $_POST['admin_pass'];

$update_pass_query = "UPDATE Dashboard_Users SET Password = '" .$pass. "' WHERE Username = ". $username;
echo($update_pass_query);
$conn->query($update_pass_query);
$conn->close();

redirect_with_message('message_success',"Password successfully changed for username ".$username.".");


?>