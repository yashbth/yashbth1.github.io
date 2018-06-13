<?php ob_start() ?>
<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>

<?php

if($_POST["username"]==''){
    redirect_with_message('message_failure',"Please enter a valid username.");
}
$username = "'".$_POST["username"]."'";
$pass = $_POST['admin_pass'];
$hashed_pass = password_hash($pass,PASSWORD_DEFAULT);
$update_pass_query = "UPDATE Dashboard_Users SET Password = '" .$hashed_pass. "' WHERE Username = ". $username;
echo($update_pass_query);
$conn->query($update_pass_query);
$conn->close();

redirect_with_message('message_success',"Password successfully changed for username ".$username.".");


?>