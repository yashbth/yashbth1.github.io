<?php

function redirect_with_message($message_type,$message){
    setrawcookie($message_type,rawurlencode($message),time() + (10), "/" );
    redirect_to("https://swajal.in/iiot/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");
    // redirect_to("http://localhost:4200/#/".$_COOKIE['cluster']."/".$_COOKIE['id']."/settings");


}

function redirect_to($location){
    header("Location: ".$location);
    exit;

}
function unitConv(&$value,$key){
    if(substr_count($key,"olume")!=0){
        $value=number_format($value/1000,2);
    }; // To dodge case senstivity;

}
?>