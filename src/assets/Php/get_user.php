<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>

<?php

if($_POST["username"]==''){
    redirect_with_message('message_failure',"Please enter a valid username.");
}
$username = "'".$_POST['username']."'";

setcookie('UN',$_POST['username'],time() + (60*5), "/");

$sql = "SELECT * FROM Dashboard_Users WHERE Username =" . $username; 

$result = $conn->query($sql);
if($result->num_rows>0){
    $all_rows = array();    
    while($row = $result->fetch_assoc()){
        $keys = array_keys($row);
        foreach($keys as $key){
            if($row[$key]=='1'){
                $cookie_index = "'".$key."'";
                setcookie($key,'1',time() + (60*5), "/");
            }
        }
        $all_rows[]=$row;
    }   
}

$conn->close();

setcookie('priv-vis','1',time() + (60), "/");

header("Location: "."http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
exit;

?>