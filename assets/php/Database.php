<?php
  class Database {
    private $host;
    private $user;
    private $password;
    private $database;
    private $port;
    
    private $conn = null;

    function __construct($connectionObj) {
      $this->host = $connectionObj["host"];
      $this->user = $connectionObj["user"];
      $this->port = $connectionObj["port"];
      $this->password = $connectionObj["password"];
      $this->database = $connectionObj["database"];
    }

    function openConnection() {
      try {
        $this->conn = new PDO("mysql:host=".$this->host.";dbname=".$this->database.";port=".$this->port, $this->user, $this->password);
      } catch(PDOException $exception) {
        echo "Cannot find server: ".$exception->getMessage();
        $this->conn = null;
      }
      return $this->conn;
    }

    function closeConnection() {
      $this->conn = null;
    }
  }
?>