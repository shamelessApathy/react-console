<?php 

// Juuuuust building a basic MVC here
require_once('uri_router.php');
require_once('constants.php');
$router = new uri_router();

$request_uri = $_SERVER['REQUEST_URI'];


echo "Getting to index.php";

//$router->load($request_uri);










?>