<?php
namespace App\Infra\Database;

define('DB_PATH', __DIR__ . '/database.db');
class DatabaseManager{

    private static $instance;
    private function __construct(){}
    public static function getInstance(){
        if(self::$instance == null){
            try{
                self::$instance = new \PDO("sqlite:" . DB_PATH);
            } catch(\Exception $e){
                echo $e->getMessage();
            }
        }
        return self::$instance;
    }

    private function __clone(){}
}