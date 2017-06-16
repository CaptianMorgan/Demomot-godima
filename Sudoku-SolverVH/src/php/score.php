<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 12.06.2017
 * Time: 08:48
 */
include ("classes/DB.php");
$db = new DB();

?>
<div class="mui-container mui--text-center">
    <ul class="mui-tabs__bar mui-tabs__bar--justified">
        <li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="pane-justified-3">Classement général</a></li>
        <li><a data-mui-toggle="tab" data-mui-controls="pane-justified-4">score personnel</a></li>
    </ul>
    <div class="mui-tabs__pane mui--is-active" id="pane-justified-3"><?php include("bestScore.php")?></div>
    <div class="mui-tabs__pane" id="pane-justified-4"><?php include("userScore.php")?></div>

</div>
