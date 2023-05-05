<?php

declare(strict_types=1);

//Headers
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
spl_autoload_register(function ($classname) {
    require_once "../Classes/$classname.php";
});
require_once "../models/UserModel.php";
require_once "../models/TaskModel.php";
require_once "../controllers/routeControllers.php";
require_once "../services/loginservice.php";
require_once "../config/config.php";
require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$url = explode("/", $_SERVER['REQUEST_URI']);

if ($url[2] !== "api" || count($url) > 4) {
    http_response_code(400);
    exit(print_r($url));
}
$id = $url[3] ?? null;

//login and sign up

if (isset($url[3]) && $url[3] === "login" || isset($url[3]) && $url[3] === "signup") {
if ($url[3] === "login" && $_SERVER['REQUEST_METHOD'] == 'POST') {
    //LOGIN
     echo  LoginService\signin();
    } else if ($url[3] === "signup" && $_SERVER['REQUEST_METHOD'] == 'POST') {
    //SIGN UP    
        $firstname = !is_null($_POST['firstname']) ? $_POST['firstname'] : exit("Enter firstname");
        $lastname = !is_null($_POST['lastname']) ? $_POST['lastname'] : die("Enter lastName");
        $userEmail = !is_null($_POST['userEmail']) ? $_POST['userEmail'] : die("Enter userEmail");
        $password = !is_null($_POST['password']) ? $_POST['password'] : die("Enter password");

        //instanciate user
        $service = new User($firstname, $lastname, $userEmail, $password);

        //register user 
        echo $service->registerUser();
    }
} else {
    
    //get token from headers
    $header = new Header();
    $token = $header->getToken();
    //validate token
    if ($token === "Authorization header is missing") {
        die("Sign in to view tasks");
    } else if ($token === " Invalid authorization header format") {
        die("Invalid Header Format");
    };
    //decode token
    $key = KEYS;
    $tokenData = JWT::decode(json_decode($token), new Key($key, 'HS256'));

    //instanciate task
    $tokenData = (array) $tokenData;
    $user = (array) $tokenData['data'];
    $task = new Task($user['userEmail']);
    echo Route\handleReq($_SERVER['REQUEST_METHOD'], $id, $task);
}
