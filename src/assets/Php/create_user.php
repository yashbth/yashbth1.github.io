<?php require_once("./db_connection.php"); ?>
<?php require_once("./functions.php"); ?>

<?php

                                                // fields' verification
if($_POST["username"]==''){
    redirect_with_message('message_failure',"Please enter a valid username.");
}

$username = "'".$_POST["username"]."'";

$check_no_duplicate = "SELECT * FROM Dashboard_Users WHERE Username =" . $username;
$result_check = $conn->query($check_no_duplicate);
if($result_check->num_rows>0){ 
    redirect_with_message('message_failure',"Username '".$_POST["username"]. "' already exists. Please try again.");
}
if(!$_POST['cluster']){
    redirect_with_message('message_failure',"Please select atleast one cluster.");
}
if(!$_POST['panel']){
    redirect_with_message('message_failure',"Please select atleast one privilege.");
}
if($_POST["password"]==''){
    redirect_with_message('message_failure',"Please enter a valid password.");
}
                                                // fields' verification

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

redirect_with_message('message_success',"New user (".$_POST["username"]. ") successfully created.");
?>