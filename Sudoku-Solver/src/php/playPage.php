<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 29.05.2017
 * Time: 15:57
 */
$NBTIME = 9;
?>
<div class="mui-container">
    <div id="">
    <?php for($i = 0;$i < $NBTIME;$i++) {

         echo '<div class="mui-row" >';
         for($j = 0;$j < $NBTIME;$j++) {

            echo '<div class="mui-col-md-1"></div>';
        }
        echo '</div>';
    }?>
    </div>
</div>