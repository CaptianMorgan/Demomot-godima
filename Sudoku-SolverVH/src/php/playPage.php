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
    <div id="time"></div>
    <!--Génération du tableau de jeu-->
    <?php for($i = 1;$i < $NBTIME+1;$i++) {
        if($i % 3 == 1)
        {
            echo '<div class="mui-row dark-top">';
        }else {
            if($i == $NBTIME)
            {
                echo '<div class="mui-row dark-bot">';
            }else{
                echo '<div class="mui-row">';
            }
        }
         for($j = 1;$j < $NBTIME+1;$j++) {
             if($j % 3 == 1)
             {
                 echo '<div onclick="changeNumber('.$i.$j.')" class="mui-col-md-1 mui--align-middle dark-left" id="'.$i.$j.'"></div>';
             }else {
                 if($j == $NBTIME)
                 {
                     echo '<div onclick="changeNumber('.$i.$j.')" class="mui-col-md-1 mui--align-middle dark-right" id="'.$i.$j.'"></div>';
                 }else{
                     echo '<div onclick="changeNumber('.$i.$j.')" class="mui-col-md-1 mui--align-middle" id="'.$i.$j.'"></div>';
                 }
             }
        }
        echo '</div>';
    }?>
    </div>

    <button class="mui-btn" onclick="generateSudoku()">Générer</button>
    <div class="mui-dropdown">
        <button class="mui-btn mui-btn--primary" id="difficultyList" data-mui-toggle="dropdown" type="button">
            Extrêmement Facile
            <span class="mui-caret"></span>
        </button>

        <ul class="mui-dropdown__menu">
            <li><a onclick="changeDifficulty(31,0,5,'Extrêmement Facile')">Extrêmement Facile</a></li>
            <li><a onclick="changeDifficulty(45,32,4,'Facile')">Facile</a></li>
            <li><a onclick="changeDifficulty(49,46,3,'Moyen')">Moyen</a></li>
            <li><a onclick="changeDifficulty(53,50,2,'Difficile')">Difficile</a></li>
            <li><a onclick="changeDifficulty(59,54,0,'Diabolique')">Diabolique</a></li>
        </ul>
    </div>
    <button class="mui-btn" onclick="resolution()">Résoudre</button>
</div>