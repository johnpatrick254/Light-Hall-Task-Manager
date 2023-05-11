<?php

declare(strict_types=1);

require_once dirname(__DIR__) ."/config/config.php";

/**
 * Summary of Database
 */
class Database
{
    private $dbhost = HOSTNAME;
    private $dbname = DBNAME;
    private $username = USERNAME;
    private $password = PASSWORD;
    private $conn;
    private $err;
    private $connStatus = false;

    /**
     * Summary of __construct
     */
    function __construct()
    {

        $dsn = "mysql:host=$this->dbhost;dbname=$this->dbname";
        $user = $this->username;
        $pwd = $this->password;
        $options = [
            PDO::ATTR_PERSISTENT => true,
            PDO::ATTR_STRINGIFY_FETCHES => false,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        ];

        try {
            $this->conn = new PDO($dsn, $user, $pwd, $options);
            $this->connStatus = true;
        
        } catch (PDOException $e) {
            $this->connStatus = false;
            $this->err = $e;
        }
    }


    function getConnection()
    {
        if (!$this->connStatus) {
            die("DB connection unsuccessful! Error: $this->err ");
        };
            
        return $this->conn;
        
    }
}
