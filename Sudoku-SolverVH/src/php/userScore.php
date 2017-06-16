<?php
/**
 * Created by PhpStorm.
 * User: GODima
 * Date: 14.06.2017
 * Time: 09:56
 */
if(isset($_SESSION['id']))
{
    $scores = $db->getUserScores($_SESSION['id']);
    $x = 3600;
    $average = 0;
    foreach($scores as $time)
    {
        for($i = 0;$i < count(str_split($time['scoValue']));$i+=3) {
            $average += (str_split($time['scoValue'])[$i].str_split($time['scoValue'])[$i + 1]) * $x;
            $x = $x / 60;
        }
        $x = 3600;
    }
    $second = $average/count($scores);
    $minutes = 0;
    $heures = 0;
    while($second >= 60){
        $second -= 60;
        $minutes += 1;
    }
    while($minutes >= 60){
        $minutes -= 60;
        $heures += 1;
    }
    $average= $heures.":".$minutes.":".$second;
?>
    <h2><?php echo $_SESSION['pseudo'] ?></h2>

    <p>Moyenne : <?php echo $average ?></p>
<table class="mui-table">
    <thead>
    <tr>
        <th>Temps</th>
        <th>Difficulté</th>
    </tr>
    </thead>
    <tbody>
    <?php
    foreach($scores as $score)
    {
        ?>
        <tr>
            <td><?php echo $score['scoValue'] ?></td>
            <td><?php echo $score['scoDifficulty'] ?></td>
        </tr>

        <?php
    }
    ?>
    </tbody>
</table>
<?php }else
{
    echo "vous devez vous connecter pour voir vos scores personnels";
}?>