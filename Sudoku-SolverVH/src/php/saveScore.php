<?php
/**
 * Created by PhpStorm.
 * User: GODima
 * Date: 12.06.2017
 * Time: 15:26
 */
session_start();
include ("classes/DB.php");
$db = new DB();

$time = $_POST['score'];

$secondes = $time/1000;
$minutes = 0;
$heures = 0;
while($secondes >= 60){
    $secondes -= 60;
    $minutes += 1;
}
while($minutes >= 60){
    $minutes -= 60;
    $heures += 1;
}

$time = $heures.":".$minutes.":".$secondes;
$db->insertScore($time,$_POST['difficulty'],$_SESSION['id']);

header("Location:index.php");