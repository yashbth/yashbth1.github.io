<?php require_once("./db_connection.php"); ?>
<?php

if($_POST["username"]==''){
    setrawcookie('message_failure',rawurlencode("Please enter a valid username."),time() + (3), "/" );
    header("Location: "."http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
    exit;
}
if($_POST["password"]==''){
    setrawcookie('message_failure',rawurlencode("Please enter a valid password."),time() + (3), "/" );
    header("Location: "."http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
    exit;
}
$username = "'".$_POST["username"]."'";
$password = "'".$_POST["password"]."'";

$booleans = '';
$boolean_flag = 0;
$selected_panels = '';
$panel_flag = 0;

function add_boolean ($flag){
    global $booleans;
    global $boolean_flag;

    if($flag == 0){
        $booleans .= '1';
        $boolean_flag = 1;
    }
    else{
        $booleans .= ',' . '1';
    }
}

foreach($_POST['panel'] as $selected){
    echo ($selected);
    echo ('<br>');
    if($panel_flag == 0){
        $selected_panels .= $selected;
        $panel_flag = 1;
        add_boolean($boolean_flag);
    }
    else{
        $selected_panels .= ','.$selected;
        add_boolean($boolean_flag);
    }
}
$selected_clusters = '';
$cluster_flag = 0;

foreach($_POST['cluster'] as $selected){
    echo ($selected);
    echo ('<br>');
    if($cluster_flag == 0){
        $selected_clusters .= $selected;
        $cluster_flag = 1;
        add_boolean($boolean_flag);
    }
    else{
        $selected_clusters .= ','.$selected;
        add_boolean($boolean_flag);
    }
}
$sql = "INSERT INTO Dashboard_Users ( Username , Password ,"  . $selected_clusters ."," . $selected_panels .") VALUES (" . $username ."," . $password . "," . $booleans . ")" ; 
echo($sql);
$result = $conn->query($sql);
$conn->close();

setrawcookie('message_success',rawurlencode("New user (".$_POST["username"]. ") successfully created."),time() + (10), "/" );

header("Location: "."http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
exit;
?>