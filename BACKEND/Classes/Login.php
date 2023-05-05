<?php

declare(strict_types=1);

class Login
{

    private $userEmail;
    private $firstname;
    private $password;
    private $conn;
    private $status;
    private $userexist=true;
    private $err;

    function __construct($userEmail, $password)
    {
        $db = new Database();
        $this->conn = $db->getConnection();
        $this->userEmail = $userEmail;
        $this->password = $password;


        try {
            $user = $this->UserExist($this->userEmail);
             if($user !== false){
                $query = "SELECT firstname,password FROM  `users_table` WHERE userEmail ='" . $this->userEmail . "'; ";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result['password'] === $this->password) {
                $this->status = "success";
                $this->firstname =$result['firstname'];
            } else if ($result['password'] !== $this->password) {
                $this->status = "failed";
            }
             }
            
        } catch (PDOException $e) {
            $this->err = $e;
        }
    }

    //check if user exists

    public function UserExist($userEmail)
    {

        $query = "SELECT * FROM  `users_table` WHERE userEmail ='" . $userEmail . "'; ";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        if (!$result) {
            $this->userexist = false;
            return false;
            
        }else{
            $this->userexist = true;
            return json_encode($result);
        }
        
    }

    //check login status
    public function checkLoginStatus()
    {
        if ($this->status === "success") {
            http_response_code(200);
            $user=[
                "userEmail"=>$this->getUserEmail(),
                "firstname"=>$this->getUserFirstName()
                ];
            return $user;

        } else if ($this->status === "failed"){
            return "wrong username or password";
        } else if(!$this->userexist){
            
            return "User is not registered";
        }
    }

    
     //GETTERS

    //getUserEmail
    public function getUserEmail(): string
    {
        return $this->userEmail;
    }
    //getUserFirstName
    public function getUserFirstName(): string
    {
        return $this->firstname;
    }
}
