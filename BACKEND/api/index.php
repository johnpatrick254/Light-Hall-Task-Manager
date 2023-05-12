<?php

declare(strict_types=1);


//Headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods:PUT,DELETE");

spl_autoload_register(function ($classname) {
    require_once dirname(__DIR__) ."/Classes/$classname.php";
});
require_once dirname(__DIR__) ."/models/UserModel.php";
require_once dirname(__DIR__)."/models/TaskModel.php";
require_once dirname(__DIR__) ."/controllers/routeControllers.php";
require_once dirname(__DIR__) ."/services/loginservice.php";
require_once dirname(__DIR__) ."/config/config.php";
require_once dirname(__DIR__) .'/vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;


$url = explode("/", $_SERVER['REQUEST_URI']);


if ($url[1] !== "api" || count($url) > 3) {
    http_response_code(400);
    exit(print_r($url));
}
$id = $url[2] ?? null;

//login and sign up

if (isset($id) && $id === "login" || isset($id) && $id === "signup") {
if ($id === "login" && $_SERVER['REQUEST_METHOD'] == 'POST') {
    //LOGIN
     echo LoginService\signin();
    } else if ($id === "signup" && $_SERVER['REQUEST_METHOD'] == 'POST') {
    //SIGN UP    
    $data = json_decode(file_get_contents('php://input'));
    $changes = (array) $data;
 
        $firstname = !is_null($changes['firstname']) ? $changes['firstname'] : exit("Enter firstname");
        $lastname = !is_null($changes['lastname']) ? $changes['lastname'] : die("Enter lastName");
        $userEmail = !is_null($changes['userEmail']) ? $changes['userEmail'] : die("Enter userEmail");
        $password = !is_null($changes['password']) ? $changes['password'] : die("Enter password");

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
        $headers = getallheaders();

        echo $headers['authorization'];
        die("Sign in to view tasks");
    } else if ($token === " Invalid authorization header format") {
        die("Invalid Header Format");
    }else if($token === null){
        die("No token provided");

    };
    //decode token
    $key = KEYS;
    $tokenData = JWT::decode((string)$token, new Key($key, 'HS256'));

    //instanciate task
    $tokenData = (array) $tokenData;
    $user = (array) $tokenData['data'];
    $task = new Task($user['userEmail']);
    echo Route\handleReq($_SERVER['REQUEST_METHOD'], $id, $task);
}
