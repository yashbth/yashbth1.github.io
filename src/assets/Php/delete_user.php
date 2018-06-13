<?php ob_start() ?>
<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>

<?php


if($_POST["username"]==''){
    redirect_with_message('message_failure',"Please enter a valid username.");
}

$username = "'".$_POST["username"]."'";
$sql = "DELETE FROM Dashboard_Users WHERE Username =". $username;


$result = $conn->query($sql);
$conn->close();

redirect_with_message('message_success',"User ".$username." deleted.");

?>