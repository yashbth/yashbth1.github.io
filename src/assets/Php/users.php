<?php
// Start the session
ini_set('session.cookie_lifetime', 9*3060); 
session_start();
?>
<?php require_once("./db_connection.php"); ?>
<?php
    header("Access-Control-Allow-Origin: https://swajal.in/iiot/");
    // header("Access-Control-Allow-Origin: http://localhost:4200");    
    header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    header('Access-Control-Allow-Credential: true');

    $username = $_POST['uname'];
    $password = $_POST['psw'];
    $sql = "SELECT * FROM Dashboard_Users WHERE Username='$username' ";
    $result = $conn->query($sql);
	if($result->num_rows>0){
        $all_rows=array();
		while($row = $result->fetch_assoc()){
            if (strtolower($username)==strtolower($row['Username']) && password_verify($password,$row['Password'])) {
                $row['Password']='';
                $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
                // Create token payload as a JSON string
                    $payload = json_encode([$row,'exp'=>time()+3600*9]);
                
                    // Encode Header to Base64Url String
                    $base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
                
                    // Encode Payload to Base64Url String
                    $base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));
                
                    // Create Signature Hash
                    $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'abC123!', true);
                
                    // Encode Signature to Base64Url String
                    $base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));
                
                    // Create JWT
                    $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
                
                $row['jwttoken']=$jwt;
                $_SESSION['JWTtoken']=$jwt;
                echo json_encode($row);
            }
        }	
    } 

//  	
    $conn->close();
?>
