/**
 * Created by godima on 30.05.2017.
 */

//nombre de cases
const NBTIME = 9;

//nombre de cases à supprimer
var difficulty = 1;

/**
 * change la valeur d'une case et lance la vérification si la dernière case est changé
 * @param id id de la case
 */
function changeNumber(id)
{
    //recuperation de la case
    var element = document.getElementById(id);
    if(element.style.fontWeight != "900") {
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

        //recuperation de toutes les cases
        var elements = document.getElementsByClassName("mui-col-md-1");

        //vérification si toutes les cases on une valeur
        var allIsCheck = true;
        for (var i = 0; i < elements.length; i++) {
            if (elements[i].innerHTML == "") {
                allIsCheck = false;
                break;
            }
        }

        //si oui lance la vérification de la solution proposée
        if (allIsCheck) {
            verification(elements);
        }
    }

}//end changeNumber

/**
 * géneration d'une solution de sudoku de A à Z
 */
function generateSudoku()
{

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
    addNumberToGamePlace(suppNumber(difficulty,sudokuArray));
}

/**
 * supprime un nombre de chiffre à la solution d'un sudoku
 * @param nbNumberToSuppr nombre de chiffre à supprimer
 * @param sudokuArray solution d'un sudoku
 * @returns {*} solution du sudoku avec des trous
 */
function suppNumber(nbNumberToSuppr,sudokuArray)
{
    //supprime des chiffres le nombre de fois parametré
    for(var i = 0; i < nbNumberToSuppr;i++)
    {
        //supretion d'un chiffre aléatoire
        sudokuArray[Math.floor((Math.random() * 9))][Math.floor((Math.random() * 9))] = "";
    }
    return sudokuArray;
}

/**
 * affichage des chiffre
 * @param sudokuArray solution d'un sudoku
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
 * @param number
 */
function changeDifficulty(number)
{
    difficulty = number;
}


/**
 * vérification de la solution (non fonctionnel)
 * @param elements tableau des cases du sudoku
 */
function verification(elements)
{
    var sudokuToCheck = new Array();
    var sudokuValue = new Array();
    var nbElement = 0;
    var numberFalse = new Array();
    var nbNumberFalse = 0;

    //recuperation des valeur des cases dans un tableau à 2 dimension
    for(var i = 0; i < NBTIME;i++)
    {
        sudokuToCheck[i] = new Array();
        for (var j = 0; j < NBTIME;j++) {
            sudokuToCheck[i][j] = [elements[nbElement].innerHTML]
            nbElement++;
        }
    }
    //vérification de chaque ligne
    for(var i = 0; i < NBTIME;i++)
    {
        for(var j = 0; j < NBTIME;j++)
        {
            //alert(sudokuValue +" = " + sudokuToCheck[i][j])
            //alert(indexOfArray(sudokuValue,sudokuToCheck[i][j]) > -1)
            if(indexOfArray(sudokuValue,sudokuToCheck[i][j]) > -1)
            {
                if(numberFalse.indexOf("" + (i+1) + (j+1)) === -1) {
                    numberFalse[nbNumberFalse] = "" + (i + 1) + (j + 1);
                    nbNumberFalse++;
                }
                numberFalse[nbNumberFalse] = "" + (i+1) + (sudokuValue.indexOf(sudokuToCheck[i][j])+1);
                nbNumberFalse++;
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
        for(var j = 0; j < NBTIME;j++)
        {
            if(indexOfArray(sudokuValue,sudokuToCheck[j][i]) > -1)
            {
                if(numberFalse.indexOf("" + (j+1) + (i+1)) === -1) {
                    numberFalse[nbNumberFalse] = "" + (j + 1) + (i + 1);
                    nbNumberFalse++;
                }
                numberFalse[nbNumberFalse] = "" + (sudokuValue.indexOf(sudokuToCheck[j][i])+1)+ (j+1);
                nbNumberFalse++;
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

                    if (indexOfArray(sudokuValue, sudokuToCheck[j*3+k][i*3+l]) > -1) {
                        if(numberFalse.indexOf("" + (j * 3 + k + 1) + (i * 3 + l + 1)) === -1) {
                            numberFalse[nbNumberFalse] = "" + (j * 3 + k + 1) + (i * 3 + l + 1);
                            nbNumberFalse++;
                        }
                        //numberFalse[nbNumberFalse] = "" + (i+1) + (sudokuValue.indexOf(sudokuToCheck[i][j])+1);

                        sudokuValue[nbTime] = 0;
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

    if(numberFalse.length > 0)
        changeColor(numberFalse,"red");
    else
        alert("win");
}

/**
 * change la couleur des cases passées en parametre
 * @param numberFalse chiffre faux
 * @param color couleur
 */
function changeColor(number,color)
{
    alert(number);
    //change le backgroundcolor
    for(var i = 0; i < number.length;i++)
    {
        if(document.getElementById(number[i]).style.fontWeight != "900")
        document.getElementById(number[i]).style.backgroundColor = color;
    }
}

/**
 *
 * @param array
 * @param item
 * @returns {number}
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
 * @param elements tableau de jeu
 */
function resetColor(elements)
{
    for(var i = 0;i < elements.length; i++)
        elements[i].style.backgroundColor = "#eee";
}