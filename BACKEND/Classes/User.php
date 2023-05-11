<?php

declare(strict_types=1);
spl_autoload_register(function ($classname) {
    require_once __DIR__ . "/models/$classname.php";
});

class User extends UserModel
{
    private $userEmail;
    private $firstname;
    private $lastName;
    private $pwd;
    private $conn;
    private $userexist = true;



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

    public function UserExist(string $userEmail):bool
    {

        $query = "SELECT * FROM  `users_table` WHERE userEmail ='" . $userEmail . "'; ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        if (!$result) {
            $this->userexist = false;
            return false;
        } else {
            $this->userexist = true;
            return true;
        }
        
    }
    //register User
    public function registerUser():string
    {

        try {
            /*Save User in DB*/
            //prepare query
            $user = $this->UserExist($this->userEmail);
            if ($user === false) {
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
            } else {
                die("User exists");
            }

           
        } catch (PDOException $e) {
            http_response_code(501);
            echo $e;
        }
    }
}
