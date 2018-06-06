<?php

function redirect_with_message($message_type,$message){
    setrawcookie($message_type,rawurlencode($message),time() + (10), "/" );
    redirect_to("http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
}

function redirect_to($location){
    header("Location: ".$location);
    exit;
}
?>