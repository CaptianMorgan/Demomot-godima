<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 12.06.2017
 * Time: 10:53
 */
include ("classes/DB.php");
session_start();
$db = new DB();
$users = $db->getUser();
$login = false;
echo"<pre>";
print_r($users);
echo"</pre>";
foreach($users as $user)
{
    if($user['usePseudo'] == $_POST['usePseudo'])
    {
        echo'yo';
        if(password_verify($_POST['usePassword'],$user['usePassword']))
        {
            $login = true;
            break;
        }
    }
}
if($login)
{
    $_SESSION['pseudo'] = $_POST['usePseudo'];
    //header("Location:index.php");
}else{
    session_destroy();
    //header("Location:index.php?login=false&message=le pseudo ou le mot de passe sont faux");
}
