<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 29.05.2017
 * Time: 15:36
 */
?>
<!doctype html>
<html lang="fr">
<head>
    <title>Sudoku Solver</title>
    <link href="../../resources/css/default.css" rel="Stylesheet" type="text/css">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" media="screen" href="//cdn.muicss.com/mui-0.9.16/css/mui.css" />
    <script src="//cdn.muicss.com/mui-0.9.16/js/mui.js"></script>
    <script type="text/javascript" src="../js/sudoku.js"></script>
</head>
<body>

    <header>
    <div class="mui-appbar mui--text-center">
        <table width="100%">
            <tr style="height:50px;">
                <td width="100%" class="mui--align-middle mui--text-title">Sudoku Solver</td>
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
