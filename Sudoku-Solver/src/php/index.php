<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 29.05.2017
 * Time: 15:36
 */
session_start();
?>
<!doctype html>
<html lang="fr" onkeydown="pressKey(event)">
<head>
    <title>Sudoku Solver</title>
    <link href="../../resources/css/default.css" rel="Stylesheet" type="text/css">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" type="text/css" media="screen" href="//cdn.muicss.com/mui-0.9.16/css/mui.css" />
    <script src="//cdn.muicss.com/mui-0.9.16/js/mui.js"></script>
    <script type="text/javascript" src="../js/sudoku.js"></script>
    <script type="text/javascript" src="../js/connection.js"></script>
</head>
<body>
    <?php
    if(isset($_GET['signin']))
    {
        if($_GET['signin'] == "false")
        {
            echo '<script type="text/javascript">signinOverlay();</script>';
            echo '<script>alert("'.$_GET['message'].'")</script>';
        }
    }
    if(isset($_GET['login']))
    {
        if($_GET['login'] == "false")
        {
            echo '<script type="text/javascript">loginOverlay();</script>';
            echo '<script>alert("'.$_GET['message'].'")</script>';
        }
    }?>
    <header>
    <div class="mui-appbar mui--text-center">
        <table width="100%">
            <tr style="height:50px;">
                <td width="100%" class="mui--align-middle mui--text-title"><span id="title">Sudoku Solver</span></span>
                    <?php if(!isset($_SESSION['pseudo'])){?>
                        <a id="login" onclick="loginOverlay()">connexion <i class="fa fa-sign-in"></i>
                    <?php }else{?>
                        <a id="login" href="deconnection.php">déconnexion <i class="fa fa-sign-in"></i>
                    <?php }?>
                    </a></td>
            </tr>
        </table>
    </div>
    </header>
    <nav>
    </nav>
    <section>
        <?php
        if(isset($_GET['page'])) {
            if(file_exists($_GET['page'] . '.php')) {
                include $_GET['page'] . '.php';
            }else{
                include "playPage.php";
            }
        }else{
            include "playPage.php";
        }
        ?>
    </section>
    <footer>
        <div class="mui-appbar mui--text-center">
            <table width="100%">
                <tr style="height:50px;">
                    <td width="100%" class="mui--align-middle">Matthieu Godi &copy</td>
                </tr>
            </table>
        </div>
    </footer>

</body>
</html>
