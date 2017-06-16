<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 12.06.2017
 * Time: 10:08
 */
include ("classes/DB.php");

$db = new DB();

if($_POST['usePassword'] == $_POST['usePasswordCheck']) {
    if ($db->insertUser($_POST['usePseudo'], $_POST['usePassword']) == false) {
        header("Location:index.php?signin=false&message=le pseudo est déjà utiliser");
    } else {
        session_start();
        $users = $db->getUser();
        $id = 0;
        foreach($users as $user)
        {
            if($id < $user['idUser'])
                $id = $user['idUser'];
        }
        $_SESSION['pseudo'] = $_POST['usePseudo'];
        $_SESSION['id'] = $id;
        header("Location:index.php");
    }
}else{
    header("Location:index.php?signin=false&message=Les deux mots de passe ne sont pas identique");
}