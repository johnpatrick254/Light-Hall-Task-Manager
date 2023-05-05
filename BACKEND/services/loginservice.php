<?php

declare(strict_types=1);

namespace LoginService;
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
use Login;


function signin()
{
    $password = !is_null($_POST['password']) ? $_POST['password'] : exit("Enter password");

    $userEmail = !is_null($_POST['userEmail']) ? $_POST['userEmail'] : die("Enter userEmail");
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
        $jwt = json_encode($jwt);

        return $jwt;
    }
}
