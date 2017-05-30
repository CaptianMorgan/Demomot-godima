<?php
/**
 * Created by PhpStorm.
 * User: godima
 * Date: 29.05.2017
 * Time: 15:57
 */
$NBTIME = 9;
?>
<div class="mui-container mui--text-center">
    <h2>Sudoku</h2>
    <p>Le Sudoku est un jeu de réflexion créé en 1979 par un Américain. Ce jeu est une grille qu'il faut remplir de chiffre manquant (de 1 à 9) de façon à ce que ceux-ci ne se répètent pas au sein d'un carré de 9 cases ou d'une ligne verticale et horizontale.</p>
    <div id="gamePlace">
    <?php for($i = 0;$i < $NBTIME;$i++) {
        if($i % 3 == 0)
        {
            echo '<div class="mui-row dark-top">';
        }else {
            if($i == $NBTIME - 1)
            {
                echo '<div class="mui-row dark-bot">';
            }else{
                echo '<div class="mui-row">';
            }
        }
         for($j = 0;$j < $NBTIME;$j++) {
             if($j % 3 == 0)
             {
                 echo '<div class="mui-col-md-1 dark-left" id="'.$i.$j.'"></div>';
             }else {
                 if($j == $NBTIME - 1)
                 {
                     echo '<div class="mui-col-md-1 dark-right" id="'.$i.$j.'"></div>';
                 }else{
                     echo '<div class="mui-col-md-1" id="'.$i.$j.'"></div>';
                 }
             }
        }
        echo '</div>';
    }?>
    </div>
    <button class="mui-btn">Générer</button>
    <div class="mui-dropdown">
        <button class="mui-btn mui-btn--primary" data-mui-toggle="dropdown" type="button">
            Difficulté
            <span class="mui-caret"></span>
        </button>

        <ul class="mui-dropdown__menu">
            <li><a href="#">Facile</a></li>
            <li><a href="#">Moyen</a></li>
            <li><a href="#">Dure</a></li>
        </ul>
    </div>
    <button class="mui-btn">Résoudre</button>

</div>