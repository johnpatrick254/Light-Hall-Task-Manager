<?php

declare(strict_types=1);
header('Access-Control-Allow-Origin:*');
header('Content-Type:application/json');
spl_autoload_register(function ($classname) {
    require_once "../models/$classname.php";
});

class Task extends TaskModel
{
    private $title;
    private $description;
    private $dateCreated;
    private $dueDate;
    private $status;
    private $user;
    private $conn;

    function __construct($userEmail)
    {
        $db = new Database();
        $this->conn = $db->getConnection();
        $this->user = $userEmail;
    }

    public function createTask(array $data)
    {
        //set class properties
        foreach ($data as $key => $value) {
            $this->{$key} = $data["$key"];
        };

        try {
            /*save to db*/
            //prepare query
            $query = "INSERT INTO `task_table`(title,description,dueDate,status,userEmail) VALUES(:title,:description,:dueDate,:status,'" . $this->user . "');";
            $stmt = $this->conn->prepare($query);

            //bind credentials
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", "$value");
            };


            //execute
            $stmt->execute();

            return http_response_code(200);
        } catch (PDOException $e) {
            http_response_code(501);
            echo $e;
        }
    }

    function getOneTask($id)
    {
        try {
            $query = "SELECT title,description,dateCreated,dueDate,status FROM `task_table` WHERE userEmail ='" . $this->user . "'AND id = $id ;";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $task = $stmt->fetchAll(PDO::FETCH_OBJ);
            return json_encode($task);
        } catch (PDOException $e) {
            echo $e;
            return http_response_code(501);
        }
    }
    function getAllTask()
    {
        $query = "SELECT id,title,description,dateCreated,dueDate,status FROM `task_table` WHERE userEmail =  '" . $this->user . "';";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $alltask = $stmt->fetchAll(PDO::FETCH_OBJ);
        return json_encode($alltask);
    }
    public function updateTask($id, array $data)
    {

        try {
            //prepare query
            $params = "";

            foreach ($data as $key => $value) {
                $params = $params . " $key=:$key,";
            };
            $params = substr($params, 0, -1);
            $query = "UPDATE `task_table` SET $params WHERE userEmail ='" . $this->user . "'AND id = $id;";
            $stmt = $this->conn->prepare($query);

            //bind credentials
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", "$value");
            };


            //execute
            $stmt->execute();

            return http_response_code(200);
        } catch (PDOException $e) {
            http_response_code(501);
            echo $e;
        }
    }

    public function deleteTask($id)
    {

        try {
            //prepare query
            $query = "DELETE FROM `task_table` WHERE userEmail ='" . $this->user . "'AND id = $id ;";

            $stmt = $this->conn->prepare($query);

            //execute
            $stmt->execute();

            return http_response_code(200);
        } catch (PDOException $e) {
            http_response_code(501);
            echo $e;
        }
    }
    public function deleteManyTasks(array $data)
    {

        $ids = '';
        foreach ($data as $value) {
            $ids = $ids . " $value,";
        };
         $ids = substr($ids,0,-1);
        try {
            //prepare query
            $query = "DELETE FROM `task_table` WHERE userEmail ='" . $this->user . "'AND id IN ($ids) ;";

            $stmt = $this->conn->prepare($query);

            //execute
            $stmt->execute();

            return http_response_code(200);
        } catch (PDOException $e) {
            http_response_code(501);
            echo $e;
        }
    }
}
