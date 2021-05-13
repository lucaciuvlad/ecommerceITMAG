<?php
class Database
{
    private $serverName = "localhost";
    private $userName = "root";
    private $userPassword = "";
    private $database = "itmag";
    private $connection;

    public function connect()
    {
        $this->connection = new mysqli($this->serverName, $this->userName, $this->userPassword, $this->database);
        return $this->connection;
    }

    public function close()
    {
        return $this->connection->close();
    }
}