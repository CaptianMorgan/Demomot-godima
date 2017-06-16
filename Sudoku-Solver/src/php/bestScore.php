<?php
/**
 * Created by PhpStorm.
 * User: GODima
 * Date: 14.06.2017
 * Time: 09:56
 */
if(isset($_GET['difficulty']))
{
    $scores = $db->getAllScoreOrderByValueByDifficulty($_GET['difficulty']);
?>
<div class="mui-dropdown">
    <button style="float: left" class="mui-btn mui-btn--primary" data-mui-toggle="dropdown" type="button">
    <?php echo $_GET['difficulty']?>
    <span class="mui-caret"></span>
    </button>
    <ul class="mui-dropdown__menu">
    <li><a href="index.php?page=score&difficulty=Extrêmement Facile">Extrêmement Facile</a></li>
    <li><a href="index.php?page=score&difficulty=Facile">Facile</a></li>
    <li><a href="index.php?page=score&difficulty=Moyen">Moyen</a></li>
    <li><a href="index.php?page=score&difficulty=Difficile">Difficile</a></li>
    <li><a href="index.php?page=score&difficulty=Diabolique">Diabolique</a></li>
    </ul>
</div>
<table class="mui-table">
    <thead>
    <tr>
        <th>Temps</th>
        <th>Difficulté</th>
        <th>Joueur</th>
    </tr>
    </thead>
    <tbody>
    <?php
    if(count($scores) > 0) {
        foreach ($scores as $score) {
            ?>
            <tr>
                <td><?php echo $score['scoValue'] ?></td>
                <td><?php echo $score['scoDifficulty'] ?></td>
                <td><?php echo $score['usePseudo'] ?></td>
            </tr>

            <?php
        }
    }else{
        echo "<tr><td>Il n'y a pas de scores enregistré dans cette cathégorie</td></tr>";
    }
    ?>
    </tbody>
</table>
<?php }?>