<?php

declare(strict_types=1);
//Headers
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
spl_autoload_register(function ($classname) {

    require_once "../Classes/$classname.php";
});
require_once "../models/TaskModel.php";


//sign up
$firstname = is_null($_POST['firstname']) ? $_POST['firstname']:die("Enter firstName");
$lastname = is_null($_POST['lastname']) ? $_POST['lastname']:die("Enter lastName");
$userEmail = is_null($_POST['userEmail']) ? $_POST['userEmail']:die("Enter userEmail");
$password = is_null($_POST['password']) ? $_POST['password']:die("Enter password");

//instanciate user
$service = new User($firstname, $lastname,$userEmail, $password);

//register user 
$service->registerUser();

