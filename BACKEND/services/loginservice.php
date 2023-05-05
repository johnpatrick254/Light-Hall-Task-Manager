<?php

declare(strict_types=1);

//Headers
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
spl_autoload_register(function ($classname) {

    require_once "../Classes/$classname.php";
});
require_once "../models/TaskModel.php";
require_once "../config/config.php";

require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;




function signin()
{
    $userEmail =  $_POST['userEmail'];
    $password = $_POST['password'];
    //sign in

    $service = new Login($userEmail, $password);

    //checkStatus
    $status = $service->checkLoginStatus();
    if ($status === "wrong username or password" || $status === "User is not registered") {
        return $status;
    } else {
         //return token
        $payload = array(
            "iat" => time(),
            "exp" => time() + 3600,
            "sub" => "user",
            "data" => array(
                "firstname" =>  $status['firstname'],
                "userEmail" => $status['userEmail']
            )

        );
        $key = KEYS;
        $jwt = JWT::encode($payload, $key, 'HS256');
        $jwt= json_encode($jwt);
        
        return $jwt;
    }
}
echo signin();
