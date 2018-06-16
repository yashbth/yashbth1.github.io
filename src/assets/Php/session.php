<?php
    session_id($_COOKIE['PHPSESSID']);
    session_start();
?>
<?php
    error_reporting(0);
    // header("Access-Control-Allow-Origin: http://localhost:4200");
    header("Access-Control-Allow-Origin: https://swajal.in/iiot/");
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    header('Access-Control-Allow-Credential: true');
    $action = $_GET['action'];
    if($action=='start'){
        echo(json_encode($_SESSION));
    }
    if($action == 'destroy'){
        session_unset();        
        session_destroy();


        $past = time() - 3600;
        foreach ( $_COOKIE as $key => $value )
        {
            setcookie( $key, $value, $past, '/' );
        }
        echo(json_encode($_SESSION));
    }


?>
