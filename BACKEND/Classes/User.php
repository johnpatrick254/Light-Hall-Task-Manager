<?php

declare(strict_types=1);
spl_autoload_register(function ($classname) {
    require_once "../models/$classname.php";
});

class User extends UserModel
{
    private $userEmail;
    private $firstname;
    private $lastName;
    private $pwd;
    private $conn;


    function __construct(string $firstname, string $lastname, string $userEmail, string $password)
    {
        //set user details in class
        $db = new Database;
        $this->conn = $db->getConnection();
        $this->userEmail = $userEmail;
        $this->firstname = $firstname;
        $this->lastName = $lastname;
        $this->pwd = $password;
    }

    //check if user exists

    public function UserExist()
    {

        $query = "SELECT * FROM  `users_table` WHERE userEmail ='" . $this->userEmail . "'; ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        if (!$result) {
            return false;
        }else{

            return json_encode($result);
        }

    }
    //register User
    public function registerUser()
    {

        try {
            /*Save User in DB*/
            //prepare query
            if ($this->UserExist()!== false) {
                die("User already exists");
            }

            $query = "INSERT INTO `users_table`(firstname,lastname,userEmail,password) VALUES(:firstname,:lastname,:userEmail,:password);";
            $stmt = $this->conn->prepare($query);

            //bind credentials
            $stmt->bindValue(':firstname', $this->firstname);
            $stmt->bindValue(':lastname', $this->lastName);
            $stmt->bindValue(':userEmail', $this->userEmail);
            $stmt->bindValue(':password', $this->pwd);

            //execute
            $stmt->execute();
            http_response_code(200);
            return "Success";
        } catch (PDOException $e) {
            http_response_code(501);
            echo $e;
        }
    }



}
