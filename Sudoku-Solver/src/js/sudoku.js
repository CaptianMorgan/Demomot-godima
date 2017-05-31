/**
 * Created by godima on 30.05.2017.
 */

const NBTIME = 9;
var difficulty = 1;
function changeNumber(id)
{
    var element = document.getElementById(id);
    switch(element.innerHTML)
    {
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
    var elements = document.getElementsByClassName("mui-col-md-1");
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
}

function generateSudoku()
{

    var sudokuArray = new Array();
    var sudokuValueDefault = [1,2,3,4,5,6,7,8,9];
    var sudokuValue = sudokuValueDefault.slice();
    for(var i = 0;i<NBTIME;i++) {
        sudokuArray[i] = new Array();
    }

    for(var i = 0;i<NBTIME;i++)
    {
        for(var j = 0;j<NBTIME;j++)
        {
            for(var k = 0;k<NBTIME;k++)
            {
                if(sudokuValue.indexOf(sudokuArray[i][k]) > -1)
                {
                    sudokuValue.splice(sudokuValue.indexOf(sudokuArray[i][k]), 1);
                }
            }
            for (var k = 0; k < NBTIME; k++) {
                if (sudokuValue.indexOf(sudokuArray[k][j]) > -1) {
                    sudokuValue.splice(sudokuValue.indexOf(sudokuArray[k][j]), 1);
                }
            }
            for (var k = 0; k < 3; k++) {
                for (var l = 0; l < 3; l++) {

                    if (sudokuValue.indexOf(sudokuArray[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]) > -1) {
                        sudokuValue.splice(sudokuValue.indexOf(sudokuArray[Math.floor(i / 3) * 3 + k][Math.floor(j / 3) * 3 + l]), 1);
                    }
                }
            }
            if(sudokuValue.length < 1) {

                for(var i = 0;i<NBTIME;i++) {
                    sudokuArray[i] = new Array();
                }
                i = -1;
                j = 8;
            }else {
                sudokuArray[i][j] = sudokuValue[ Math.floor((Math.random() * sudokuValue.length))];
            }
            sudokuValue = sudokuValueDefault.slice();
        }
    }
    addNumberToGamePlace(suppNumber(difficulty,sudokuArray));
}

function suppNumber(nbNumberToSuppr,sudokuArray)
{
    for(var i = 0; i < nbNumberToSuppr;i++)
    {
        sudokuArray[Math.floor((Math.random() * 9))][Math.floor((Math.random() * 9))] = "";
    }
    return sudokuArray;
}

function addNumberToGamePlace(sudokuArray)
{
    for(var i = 1;i<NBTIME+1;i++)
    {
        for(var j = 1;j<NBTIME+1;j++)
        {
            var element = document.getElementById("" +i +j);
            element.innerHTML = sudokuArray[i-1][j-1];
        }
    }
}

function changeDifficulty(number)
{
    difficulty = number;
}

function verification(elements)
{
    var sudokuToCheck = new Array();
    var sudokuValue = new Array();
    var nbElement = 0;
    var numberFalse = new Array();
    var nbNumberFalse = 0;
    for(var i = 0; i < NBTIME;i++)
    {
        sudokuToCheck[i] = new Array();
        for (var j = 0; j < NBTIME;j++) {
            sudokuToCheck[i][j] = [elements[nbElement].innerHTML]
            nbElement++;
        }
    }
    for(var i = 0; i < NBTIME;i++)
    {
        for(var j = 0; j < NBTIME;j++)
        {
            alert(sudokuValue.indexOf(sudokuToCheck[i][j]) > -1);
            if(sudokuValue.indexOf(sudokuToCheck[i][j]) > -1)
            {
                numberFalse[nbNumberFalse] = "" + (i+1) + (j+1);
                //numberFalse[nbNumberFalse] = "" + (i+1) + (sudokuValue.indexOf(sudokuToCheck[i][j])+1);
                nbNumberFalse++;
            }else {
                sudokuValue[j] = sudokuToCheck[i][j];
            }

        }
        sudokuValue = new Array();
    }
    for(var i = 0; i < NBTIME;i++)
    {
        for(var j = 0; j < NBTIME;j++)
        {
            if(sudokuValue.indexOf(sudokuToCheck[j][i]) > -1)
            {
                numberFalse[nbNumberFalse] = "" + (j+1) + (i+1);
                //numberFalse[nbNumberFalse] = "" + (i+1) + (sudokuValue.indexOf(sudokuToCheck[i][j])+1);
                nbNumberFalse++;
            }else {
                sudokuValue[j] = sudokuToCheck[j][i];
            }
        }
        sudokuValue = new Array();
    }
    changeColor(numberFalse);
}

function changeColor(numberFalse)
{
    alert(numberFalse);
    for(var i = 0; i < numberFalse.length;i++)
    {
        document.getElementById(numberFalse[i]).style.backgroundColor = "red";
    }
}



