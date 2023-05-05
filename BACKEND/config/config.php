<?php
declare(strict_types=1);
require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

define('HOSTNAME',$_ENV['HOSTNAME']);
define('USERNAME',$_ENV['USERNAME']);
define('PASSWORD',$_ENV['PASSWORD']);
define('DBNAME',$_ENV['DBNAME']);
define('KEYS',$_ENV['KEYS']);
