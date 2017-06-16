<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 12.06.2017
 * Time: 11:17
 */
session_start();
session_destroy();
header("Location:index.php");