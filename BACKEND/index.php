<?php
declare(strict_types=1);
session_start();


//Headers
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
spl_autoload_register(function ($classname) {
    require_once "Classes/$classname.php";

});
require_once "models/UserModel.php";
require_once "models/TaskModel.php";
$url = explode("/",$_SERVER['REQUEST_URI']);


if($url[2]!=="tasks"){
    echo $url[2];
     http_response_code(400);
     exit();
}
$id =$url[3] ?? null;
$requestHandler= new HandleRequest();
echo $requestHandler->handleReq($_SERVER['REQUEST_METHOD'],$id);




