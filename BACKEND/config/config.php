<?php
declare(strict_types=1);
require dirname(__DIR__) .'/vendor/autoload.php';

//$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__) );
//$dotenv->load();

define('HOSTNAME',$_ENV['HOSTNAME']);
define('USERNAME',$_ENV['USERNAME']);
define('PASSWORD',$_ENV['PASSWORD']);
define('DBNAME',$_ENV['DBNAME']);
define('KEYS',$_ENV['KEYS']);
