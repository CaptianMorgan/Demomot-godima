/**
 * Created by godima on 30.05.2017.
 */

//nombre de cases
const NBTIME = 9;

//nombre de cases à supprimer
var difficultyMax = 31;
var difficultyMin = 0;

var difficultyLowerBoundByRowsCols = 5;

//dernière case modifée
var lastCaseChange = "";


/**
 * change la valeur d'une case et lance la vérification si la dernière case est changé
 * @param id id de la case
 */
function changeNumber(id,number)
{
    var elements = document.getElementsByClassName("mui-col-md-1");
    var element = document.getElementById(id);
    if (element.style.fontWeight != "900") {
    if(number === undefined) {
        lastCaseChange = id;
        //recuperation de la case
        resetColor(elements);

            //changement de la valeur
            switch (element.innerHTML) {
                case "":
                    element.innerHTML = "1";
                    break;
                case "1":
                    element.innerHTML = "2";
                    break;
                case "2":
                    element.innerHTML = "3";
                    break;
                case "3":
                    element.innerHTML = "4";
                    break;
                case "4":
                    element.innerHTML = "5";
                    break;
                case "5":
                    element.innerHTML = "6";
                    break;
                case "6":
                    element.innerHTML = "7";
                    break;
                case "7":
                    element.innerHTML = "8";
                    break;
                case "8":
                    element.innerHTML = "9";
                    break;
                case "9":
                    element.innerHTML = "";
                    break;
                default:
                    break;
            }
    } else {
            if(number > 96)
            {
                number -= 48;
            }
            if(number === 96 || number === 48)
            {
                element.innerHTML = "";
            }else {
                element.innerHTML = String.fromCharCode(number);
            }
    }




    var allIsCheck = true;

    for(var i = 0;i <elements.length;i++)
    {
        if(elements[i].innerHTML == "")
        {
            allIsCheck = false;

            break;

        }
    }

    if(allIsCheck)
    {
        verification(elements);
    }

        if (element.style.backgroundColor !== "red")
            element.style.backgroundColor = "lightblue";
        else
            element.style.backgroundColor = "orange"
    }

}

/**
 * géneration d'une solution de sudoku de A à Z
 */
function generateSudoku()
{
    var start = Date.now();
    resetColor(document.getElementsByClassName("mui-col-md-1"));
    //tableau de jeu
    var sudokuArray = new Array();

    //tableau de ligne
    var sudokuValueDefault = [1,2,3,4,5,6,7,8,9];
    var sudokuValue = sudokuValueDefault.slice();

    //génération de toutes les lignes dans le tableau de jeu
    for(var i = 0;i<NBTIME;i++) {
        sudokuArray[i] = new Array();
    }

    //génération de la solution
    //chaque linge
    for(var i = 0;i<NBTIME;i++)
    {
        //chaque case
        for(var j = 0;j<NBTIME;j++)
        {
            //vérification des chiffres possibles de la ligne
            for(var k = 0;k<NBTIME;k++)
            {
                if(sudokuValue.indexOf(sudokuArray[i][k]) > -1)
                {
                    //enlève la solution des solutions possibles
                    sudokuValue.splice(sudokuValue.indexOf(sudokuArray[i][k]), 1);
                }
            }

            //vérification des chiffres de la colonne
            for (var k = 0; k < NBTIME; k++) {
                if (sudokuValue.indexOf(sudokuArray[k][j]) > -1) {
                    //enlève la solution des solutions possibles
                    sudokuValue.splice(sudokuValue.indexOf(sudokuArray[k][j]), 1);
                }
            }

            //vérification des chiffres possibles de la section
            for (var k = 0; k < 3; k++) {
                for (var l = 0; l < 3; l++) {

                    if (sudokuValue.indexOf(sudokuArray[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]) > -1) {
                        sudokuValue.splice(sudokuValue.indexOf(sudokuArray[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]), 1);
                    }
                }
            }

            //si aucune solution possible pour la case on recommence depuis le début
            if(sudokuValue.length < 1) {

                //reset du tableau de jeu
                for(var i = 0;i<NBTIME;i++) {
                    sudokuArray[i] = new Array();
                }

                //resmise à zero des boucles
                i = -1;
                j = 8;

            }else {//sinon ajout d'une valeur aléatoire parmis les solutions possibles
                sudokuArray[i][j] = sudokuValue[ Math.floor((Math.random() * sudokuValue.length))];
            }
            //remise à neuf des solutions possible
            sudokuValue = sudokuValueDefault.slice();
        }
    }

    //lance l'affichage des chiffres et supprime des chiffres pour le rendre jouable
    addNumberToGamePlace(suppNumber(difficultyMax,difficultyMin,sudokuArray));
    //alert(Date.now() - start + "ms");
}

/**
 * supprime un nombre de chiffre à la solution d'un sudoku
 * @param nbNumberToSuppr nombre de chiffre à supprimer
 * @param sudokuArray solution d'un sudoku
 * @returns {*} solution du sudoku avec des trous
 */
function suppNumber(nbNumberToSupprMax,nbNumberToSupprMin,sudokuArray)
{
    var numberEmpty = 0;
    //temps que il n'y a pas assez de vide
    do {
        var lastNumberEmpty = numberEmpty
        //supprime des chiffres le nombre de fois parametré
        for (var i = 0; i < nbNumberToSupprMax - lastNumberEmpty; i++) {
            //supression d'un chiffre aléatoire
            var x = Math.floor((Math.random() * 9));
            var y = Math.floor((Math.random() * 9));
            //vérification des parametres nombres de case par ligne et colonnes
            if(sudokuArray[x][y] !== "" && getLowerFilledByACol(y,sudokuArray) > difficultyLowerBoundByRowsCols && getLowerFilledByARow(x,sudokuArray) > difficultyLowerBoundByRowsCols)
            {
                sudokuArray[x][y] = "";
                numberEmpty++;
            }
        }
    }while ( numberEmpty < nbNumberToSupprMin);
    return sudokuArray;
}

/**
 * recuperation du nombre de case remplie d'une colonne
 * @param nbCol numero de la colonne
 * @param sudokuArray tableau de jeu
 * @returns {number} nombre de case remplie
 */
function getLowerFilledByACol(nbCol,sudokuArray)
{
    var nbBound = 0;
    for(var i = 0;i < NBTIME;i++)
    {
        if(sudokuArray[i][nbCol] !== "")
        {
            nbBound++;
        }
    }
    return nbBound;
}
/**
 * recuperation du nombre de case remplie d'une ligne
 * @param nbCol numero de la ligne
 * @param sudokuArray tableau de jeu
 * @returns {number} nombre de case remplie
 */
function getLowerFilledByARow(nbRow,sudokuArray)
{
    var nbBound = 0;
    for(var i = 0;i < NBTIME;i++)
    {
        if(sudokuArray[nbRow][i] !== "")
        {
            nbBound++;
        }
    }
    return nbBound;
}

/**
 * affichage des chiffre
 * @param sudokuArray tableau de solution d'un sudoku
 */
function addNumberToGamePlace(sudokuArray)
{
    //desactive le gras des cases
    for(var i = 1;i<NBTIME+1;i++)
    {
        for(var j = 1;j<NBTIME+1;j++)
        {
            var element = document.getElementById("" +i +j);
            element.style.fontWeight = "500";
        }
    }
    //affichage
    for(var i = 1;i<NBTIME+1;i++)
    {
        for(var j = 1;j<NBTIME+1;j++)
        {
            var element = document.getElementById("" +i +j);
            element.innerHTML = sudokuArray[i-1][j-1];
            if(element.innerHTML != "") {
                element.style.fontWeight = "900";
            }
        }
    }
}

/**
 * change le nombre de case à supprimer
 * @param numberMax nombre max de case à supprimer
 * @param numberMin nombre min de case à supprimer
 */
function changeDifficulty(numberMax,numberMin,LowerBoundByRowsCols)
{
    difficultyMax = numberMax;
    difficultyMin = numberMin;
    difficultyLowerBoundByRowsCols = LowerBoundByRowsCols;
}


/**
 * vérification de la solution (non fonctionnel)
 * @param elements tableau des cases du sudoku
 */
function verification(elements)
{
    //tableau de jeu
    var sudokuToCheck = new Array();

    //tableau de ligne
    var sudokuValue = new Array();

    //tableau de chiffre faux
    var numberFalse = new Array();
    var nbNumberFalse = 0;
    tabSudoku = new Array();
    //recuperation des valeur des cases dans un tableau à 2 dimension
    var nbElement = 0;
    for(var i = 0; i < NBTIME;i++)
    {
        sudokuToCheck[i] = new Array();
        for (var j = 0; j < NBTIME;j++) {
            sudokuToCheck[i][j] = elements[nbElement].innerHTML
            nbElement++;
        }
    }
    //vérification de chaque ligne
    for(var i = 0; i < NBTIME;i++)
    {
        //chaque case
        for(var j = 0; j < NBTIME;j++)
        {
            //vérification si le chiffre est déjà apparu dans la ligne
            if(indexOfArray(sudokuValue,sudokuToCheck[i][j]) > -1)
            {
                //si il est déjà marqué comme faux
                if(numberFalse.indexOf("" + (i+1) + (j+1)) === -1 /*&& sudokuToCheck[i][j] !== ""*/) {

                    //ajout du chiffre au tableau de chiffre faux
                    numberFalse[nbNumberFalse] = "" + (i + 1) + (j + 1);
                    nbNumberFalse++;
                }

                //si il est déjà marqué comme faux
                if(numberFalse.indexOf("" + (i+1) + (indexOfArray(sudokuValue,sudokuToCheck[i][j])+1) === -1) /*&& sudokuToCheck[i][j] !== ""*/) {

                    //ajout de l'autre chiffre au tableau de chiffre faux
                    numberFalse[nbNumberFalse] = "" + (i+1) + (indexOfArray(sudokuValue,sudokuToCheck[i][j])+1);
                    nbNumberFalse++;
                }
                sudokuValue[j] = 0;
            }else {
                sudokuValue[j] = sudokuToCheck[i][j];
            }

        }
        sudokuValue = new Array();
    }

    //vérification de chaque colonne
    for(var i = 0; i < NBTIME;i++)
    {
        //chaque case
        for(var j = 0; j < NBTIME;j++)
        {
            //vérification si le chiffre est déjà apparu dans la colonne
            if(indexOfArray(sudokuValue,sudokuToCheck[j][i]) > -1)
            {

                //si il est déjà marqué comme faux
                if(numberFalse.indexOf("" + (j+1) + (i+1)) === -1 /*&& sudokuToCheck[j][i] !== ""*/) {
                    //ajout du chiffre au tableau de chiffre faux
                    numberFalse[nbNumberFalse] = "" + (j + 1) + (i + 1);
                    nbNumberFalse++;
                }

                //si il est déjà marqué comme faux
                if(numberFalse.indexOf("" + (indexOfArray(sudokuValue,sudokuToCheck[j][i])+1)+ (i+1)) === -1 /*&& sudokuToCheck[j][i] !== ""*/){
                    //ajout de l'autre chiffre au tableau de chiffre faux
                    numberFalse[nbNumberFalse] = "" + (indexOfArray(sudokuValue,sudokuToCheck[j][i])+1)+ (i+1);
                    nbNumberFalse++;
                }
                sudokuValue[j] = 0;
            }else {
                sudokuValue[j] = sudokuToCheck[j][i];
            }
        }
        sudokuValue = new Array();
    }

    //pour chaque carré
    var nbTime = 0;
    for(var i = 0; i < 3;i++)
    {
        for(var j = 0; j < 3;j++)
        {
            for(var k = 0;k < 3;k++) {
                for(var l = 0;l < 3;l++) {

                    //vérification si le chiffre est déjà apparu dans le carré
                    if (indexOfArray(sudokuValue, sudokuToCheck[j*3+k][i*3+l]) > -1) {
                        //if(sudokuToCheck[j*3+k][i*3+l] !== "") {

                            //si il est déjà marqué comme faux
                            if (numberFalse.indexOf("" + (j * 3 + k + 1) + (i * 3 + l + 1)) === -1) {
                                //ajout du chiffre au tableau de chiffre faux
                                numberFalse[nbNumberFalse] = "" + (j * 3 + k + 1) + (i * 3 + l + 1);
                                nbNumberFalse++;
                            }

                            //ajout de l'autre chiffre au tableau de chiffre faux
                            switch (indexOfArray(sudokuValue, sudokuToCheck[j*3+k][i*3+l])) {
                                case 0:
                                    numberFalse[nbNumberFalse] = 3 * i + 1 + "" + (3 * j + 1);
                                    break;
                                case 1:
                                    numberFalse[nbNumberFalse] = 3 * i + 1 + "" + (3 * j + 2);
                                    break;
                                case 2:
                                    numberFalse[nbNumberFalse] = 3 * i + 1 +"" + (3 * j + 3);
                                    break;
                                case 3:
                                    numberFalse[nbNumberFalse] = 3 * i + 2 + "" + (3 * j + 1);
                                    break;
                                case 4:
                                    numberFalse[nbNumberFalse] = 3 * i + 2 + "" + (3 * j + 2);
                                    break;
                                case 5:
                                    numberFalse[nbNumberFalse] = 3 * i + 2 + "" + (3 * j + 3);
                                    break;
                                case 6:
                                    numberFalse[nbNumberFalse] = 3 * i + 3 + "" + (3 * j+ 1);
                                    break;
                                case 7:
                                    numberFalse[nbNumberFalse] = 3 * i + 3 + "" + (3 * j + 2);
                                    break;
                                case 8:
                                    numberFalse[nbNumberFalse] = 3 * i + 3 + "" + (3 * j + 3);
                                    break;
                                default:
                                    break;
                            }
                            nbNumberFalse++;
                            sudokuValue[nbTime] = 0;
                            nbTime++;
                        //}
                    } else {
                        sudokuValue[nbTime] = sudokuToCheck[j*3+k][i*3+l];
                        nbTime++;
                    }
                }
            }
            sudokuValue = new Array();
            nbTime = 0;
        }
    }
    resetColor(elements);
    //affiche les erreurs
    if(numberFalse.length > 0)
        changeColor(numberFalse,"red");
    else
        //TODO une vrai win
        alert("Vous avez gagné");
}

/**
 * change la couleur des cases passées en parametre
 * @param numberFalse chiffre faux
 * @param color couleur
 */
function changeColor(number,color)
{
    //change le backgroundcolor
    for(var i = 0; i < number.length;i++)
    {
        //si c'est pas un chiffre de la solution de base
        if(document.getElementById(number[i]).style.fontWeight != "900")
        document.getElementById(number[i]).style.backgroundColor = color;
    }
}

/**
 * même principe que la fonction indexOf de base mais avec un try catch
 * @param array tableau
 * @param item l'élément
 * @returns {number} id de l'élément dans le tableau
 */
function indexOfArray(array, item) {
    for (var i = 0; i < array.length; i++) {
        try {
            if (array[i].toString() === item.toString()) return i;
        }catch (err)
        {
            //alert(err.message);
        }
    }
    return -1;
}

/**
 * reset les couleurs
 * @param elements tableau de jeu (div)
 */
function resetColor(elements)
{
    for(var i = 0;i < elements.length; i++)
        elements[i].style.backgroundColor = "#eee";
}

var tabSudoku = new Array();
/**
 * résolution du sudoku
 */
function resolution()
{
    var start = Date.now();
    //recuperation des chiffres dans le tableau
    var elements = document.getElementsByClassName("mui-col-md-1");

    var sudokuIsTrue;

    var nbElement = 0;
    for(var i = 0; i < NBTIME;i++)
    {
        tabSudoku[i] = new Array();
        for (var j = 0; j < NBTIME;j++) {
            tabSudoku[i][j] = elements[nbElement].innerHTML;
            nbElement++;
        }
    }
    sudokuIsTrue = fillTrueCase();
    if(!sudokuIsTrue)
    {
        alert("Le sudoku n'a pas de solution")
    }else {
        var nbElementEmpty = 0;

        for (var i = 0; i < NBTIME; i++) {

            for (var j = 0; j < NBTIME; j++) {
                if (tabSudoku[i][j] == "") {
                    nbElementEmpty++;
                }
            }
        }
        if (nbElementEmpty > 0) {
            sudokuIsTrue = fillCaseRec(0, 0);
        }

        if (!sudokuIsTrue) {
            alert("Le Sudoku n'a pas de solution. Vérifier les valeurs que vous avez changez")
        } else {
            addNumberToGamePlace(tabSudoku);
        }
    }
    //alert(Date.now() - start + "ms");
}

/****
 * Trouve toutes les cases avec qu'une seul solution possible
 * @returns {boolean}
 */
function fillTrueCase()
{
    //tableau de ligne
    var sudokuValueDefault = [1,2,3,4,5,6,7,8,9];
    var sudokuValue = sudokuValueDefault.slice(0);
    var lastSudokuToSolve;
    do {
        //copie du tableau de jeu pour faire une comparaison avant-apres
        lastSudokuToSolve = [];
        lastSudokuToSolve += tabSudoku.slice(0);

        for (var i = 0; i < NBTIME; i++) {
            //chaque case
            for (var j = 0; j < NBTIME; j++) {
                if (tabSudoku[i][j] == "") {
                    //vérification des chiffres possibles de la ligne
                    for (var k = 0; k < NBTIME; k++) {
                        if (indexOfArray(sudokuValue,tabSudoku[i][k]) > -1) {
                            //enlève la solution des solutions possibles
                            sudokuValue.splice(indexOfArray(sudokuValue,tabSudoku[i][k]), 1);
                        }
                    }

                    //vérification des chiffres de la colonne
                    for (var k = 0; k < NBTIME; k++) {
                        if (indexOfArray(sudokuValue,tabSudoku[k][j]) > -1) {
                            //enlève la solution des solutions possibles
                            sudokuValue.splice(indexOfArray(sudokuValue,tabSudoku[k][j]), 1);
                        }
                    }

                    //vérification des chiffres possibles de la section
                    for (var k = 0; k < 3; k++) {
                        for (var l = 0; l < 3; l++) {
                            if (indexOfArray(sudokuValue,tabSudoku[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]) > -1) {
                                sudokuValue.splice(indexOfArray(sudokuValue,tabSudoku[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]), 1);
                            }
                        }
                    }

                    //ajoute la seul valeur possible si il y en a une
                    if(sudokuValue.length === 1)
                    {
                        tabSudoku[i][j] = sudokuValue[0] + "";
                    }
                    if(sudokuValue.length === 0)
                    {
                        return false;
                    }
                }
                sudokuValue = sudokuValueDefault.slice(0);
            }
        }
    }while (tabSudoku.toString() !== lastSudokuToSolve.toString());
    return true;
}

/**
 * Trouve la solution du sudoku en recusife (backtracking)
 * @param nbLine position de la ligne de la case à modifier
 * @param nbCols position de la colonne de la case à modifier
 * @returns {boolean}
 */
function fillCaseRec(nbLine,nbCols)
{
    //si la case est vide
    var isEmpty = true;

    //si le jeu est fini
    var isFull = true;
    for(var i = 0;i < NBTIME;i++) {
        if (indexOfArray(tabSudoku[i], "") > -1)
        {
            isFull = false;
            break;
        }
    }
    if(isFull) {
        return true;
    }
    var valueSudoku = [1,2,3,4,5,6,7,8,9];
    //test toutes les possiblités
    for(var j = 1; j <= NBTIME;j++) {

        //si la case est vide
        if(tabSudoku[nbLine][nbCols] == "") {
            tabSudoku[nbLine][nbCols] = valueSudoku[Math.floor((Math.random() * valueSudoku.length))] + "";
            if (gridIsValid(tabSudoku,nbLine,nbCols)) {
                //si la valeur est possible
                if (nbCols == 8) {
                    nbLine++;
                    nbCols = 0;
                }
                else
                    nbCols++;

                //va dans la case suivante
                if (fillCaseRec(nbLine, nbCols) == true) {
                    return true;
                }
                else {
                    if (nbCols == 0) {
                        nbLine--;
                        nbCols = 8;
                    }
                    else
                        nbCols--;
                    valueSudoku.splice(indexOfArray(valueSudoku,tabSudoku[nbLine][nbCols]),1);
                    tabSudoku[nbLine][nbCols] = "";

                }
            }else {
                valueSudoku.splice(indexOfArray(valueSudoku,tabSudoku[nbLine][nbCols]),1);
                tabSudoku[nbLine][nbCols] = "";
            }
        //si la case est déjà remplir
        }else {
            if (nbCols == 8) {
                nbLine++;
                nbCols = 0;
            }
            else
                nbCols++;

            //va dans la case suivante
            if (fillCaseRec(nbLine, nbCols) == true)
            {
                return true;
            }else {
                isEmpty = false;
                break;
            }
        }
    }
    //si la case était vide
    if(isEmpty)
    {
        tabSudoku[nbLine][nbCols] = "";
    }
    return false;
}

/**
 * valide la ligne, la colonne et le carré d'une case
 * @param tabSudoku
 * @returns {boolean}
 */
function gridIsValid(tabSudoku,nbLine,nbCols) {

    //tableau de ligne
    var sudokuValue = new Array();


    //vérification de la ligne
    for (var i = 0; i < NBTIME; i++) {
        //vérification si le chiffre est déjà apparu dans la ligne
        if (indexOfArray(sudokuValue, tabSudoku[nbLine][i]) > -1) {
            if (tabSudoku[nbLine][i] !== "") {
                return false;
            }
        } else {
            sudokuValue[i] = tabSudoku[nbLine][i];
        }
    }
    sudokuValue = new Array();
    //vérification de la colonne
    for (var i = 0; i < NBTIME; i++) {
        //vérification si le chiffre est déjà apparu dans la colonne
        if (indexOfArray(sudokuValue, tabSudoku[i][nbCols]) > -1) {
            if (tabSudoku[i][nbCols] !== "")
                return false;
        } else {
            sudokuValue[i] = tabSudoku[i][nbCols];
        }
    }
    sudokuValue = new Array();
    //pour chaque carré
    var nbTime = 0;
    for (var k = 0; k < 3; k++) {
        for (var l = 0; l < 3; l++) {

            //vérification si le chiffre est déjà apparu dans le carré
            if (indexOfArray(sudokuValue, tabSudoku[Math.floor(nbLine / 3) * 3 + k][Math.floor(nbCols / 3) * 3 + l]) > -1) {
                if (tabSudoku[Math.floor(nbLine / 3) * 3 + k][Math.floor(nbCols / 3) * 3 + l] !== "")
                    return false;
            } else {
                sudokuValue[nbTime] = tabSudoku[Math.floor(nbLine / 3) * 3 + k][Math.floor(nbCols / 3) * 3 + l];
                nbTime++;
            }
        }
    }
    return true;
}

/**
 * si on appuie sur une touche
 * @param event
 */
function  pressKey(event)
{
    //lance le reset
    reset(event);
    //lance le changement de chiffre si c'est un chiffre
    if(event.which >= 48 && event.which <= 57 || event.which >= 96 && event.which <= 105)
        changeNumber(lastCaseChange,event.which)
}

/**
 * reset du tableau de jeu
 * @param event
 */
function reset(event)
{
    //si la touche r est enfoncée
    if(event.which == 114 ||event.which == 82)
    {
        //création d'un tableau de jeu vide
        sudokuReset = new Array();
        for(var i = 0;i < NBTIME;i++)
        {
            sudokuReset[i] = new Array();
            for(var j = 0;j < NBTIME;j++)
            {
                sudokuReset[i][j] = "";
            }
        }
        //affichage du tableau vide
        resetColor(document.getElementsByClassName("mui-col-md-1"));
        addNumberToGamePlace(sudokuReset);
    }
}