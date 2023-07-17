<?php

ini_set('display_errors',1);
error_reporting(E_ERROR | E_PARSE);
ini_set('display_startup_errors',1);
header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Authorization');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');
require_once('class.PSDB.php');

$X=new PSDB();

$sql="select * from doc_workspace order by id";
$r=$X->sql($sql);

foreach($r as $s) {

    $ss="update doc_workspace set storage_key = '" . hash("sha256", $s['id'] . $s['create_timestamp']) . "' where id = " . $s['id'];
    $X->execute($ss);

}

$sql="select * from doc_document order by id";
$r=$X->sql($sql);

foreach($r as $s) {

    $ss="update doc_document set storage_key = '" . hash('sha256', $s['id'] . $s['create_timestamp']) . "' where id = " . $s['id'];
    echo $ss;
    $X->execute($ss);
    
}

?>