<?php
declare(strict_types=1);
session_start();


//Headers
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
spl_autoload_register(function ($classname) {
    require_once "../Classes/$classname.php";

});
require_once "../config/config.php";
require_once "../models/UserModel.php";
require_once "../models/TaskModel.php";
require_once '../vendor/autoload.php';


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

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




//fetch all tasks GET
echo $task->getAllTask();

//fetch DELETE Multple tasks DELETE
//echo $task->deleteManyTasks($ids);