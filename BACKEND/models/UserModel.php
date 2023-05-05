<?php

declare(strict_types=1);

abstract class UserModel{
    
    
abstract function __construct(string $firstname, string $lastname, string $userEmail, string $password);
    //check if user exists
   abstract public function UserExist(string $userEmail):bool;
    //register User
   abstract public function registerUser():string;
  


}