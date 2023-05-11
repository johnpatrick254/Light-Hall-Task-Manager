<?php

declare(strict_types=1);

namespace LoginService;
//Headers
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
spl_autoload_register(function ($classname) {

    require_once "../Classes/$classname.php";
});
require_once dirname(__DIR__) ."/models/TaskModel.php";
require_once dirname(__DIR__) ."/config/config.php";

require_once dirname(__DIR__) .'/vendor/autoload.php';

use Firebase\JWT\JWT;
use Login;


function signin()
{
    $data = json_decode(file_get_contents('php://input'));
    $changes = (array) $data;
    $userEmail = !is_null($changes['userEmail']) ? $changes['userEmail'] : die("Enter userEmail");
    $password = !is_null($changes['password']) ? $changes['password'] : exit("Enter password");
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
