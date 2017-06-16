<?php

/**
 * Created by PhpStorm.
 * User: godima
 * Date: 12.06.2017
 * Time: 08:20
 */
class DB
{
    private $user = "u701099821_user";
    private $password= "matthieu12";
    private $host = "localhost";
    private $dbName = "u701099821_sudok";
    private $db;
    /***************************************
     * conection à la BD     *
     */
    private function connectBD()
    {
        try{
            $this->db = new PDO('mysql:host='.$this->host.';dbname='.$this->dbName.'',$this->user,$this->password);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch(PDOException $e) {
            $msg = 'ERREUR PDO dans ' . $e->getFile() . ' L.' . $e->getLine() . ' : ' . $e->getMessage();
            die($msg);
        }
    } //end connectBD()

    /**********
     * deconnection à la base de données
     */
    private function disconctBD()
    {
        $this->bd = null;
    }

    /*******
     * @param $sqlQuery
     */
    private function doQuerry($sqlQuerry)
    {
        $this->connectBD();
        $sth = $this->db->prepare($sqlQuerry);
        $sth->execute();
        $this->disconctBD();
    }

    /**********
     * @param $sqlQuery
     * @return mixed
     */
    private  function doQuerryReturn($sqlQuerry)
    {
        $this->connectBD();
        $sth = $this->db->prepare($sqlQuerry);
        $sth->execute();
        return $sections = $sth->fetchAll();
        $this->disconctBD();
    }

    /****
     * @return mixed
     */
    public function getAllScoreOrderByValueByDifficulty($difficulty)
    {
        $sqlQuerry = "Select idScore, scoValue ,scoDifficulty ,`t_user`.`usePseudo` From t_score Inner Join t_user On t_user.idUser = t_score.idUser where t_score.scoDifficulty = '".$difficulty."' Order By scoValue Limit 20";

        return $this->doQuerryReturn($sqlQuerry);
    }

    /***
     * @param $scoValue format: "00:00:00"
     * @param $idUser
     */
    public function insertScore($scoValue,$scoDifficulty,$idUser)
    {
        $sqlQuerry = "Insert into t_score";
        $sqlQuerry .= "(`scoValue`,`scoDifficulty`,`idUser`)Values";
        $sqlQuerry .= "('".$scoValue."','".$scoDifficulty."','".$idUser."')";

        $this->doQuerry($sqlQuerry);
    }

    /***
     * @param $usePseudo
     * @param $usePassword
     */
    public function insertUser($usePseudo,$usePassword)
    {
        $sqlQuerry = "SELECT `usePseudo` FROM `t_user`";

        $users = $this->doQuerryReturn($sqlQuerry);

        foreach($users as $user)
        {
            if($user['usePseudo'] == $usePseudo)
            {
                return false;
            }
        }

        $sqlQuerry = "Insert into `t_user`";
        $sqlQuerry .= "(`usePseudo`,`usePassword`)VALUES";
        $sqlQuerry .= "('".$usePseudo."','".password_hash($usePassword,1)."')";

        $this->doQuerry($sqlQuerry);
        return true;
    }

    /***
     * @param $idUser
     */
    public function getUserScores($idUser)
    {
        $sqlQuerry = "Select idScore, scoValue, scoDifficulty From t_score Where t_score.idUser = '".$idUser."' Order By scoValue";

        return $this->doQuerryReturn($sqlQuerry);
    }

    /***
     * @return mixed
     */
    public  function  getUser()
    {
        $sqlQuerry = "Select * From t_user";

        return $this->doQuerryReturn($sqlQuerry);

    }

    public function getUserAverage($idUser)
    {
        $times = $this->getUserScores($idUser);
        $x = 3600;
        $average = 0;
        foreach($times as $time)
        {
            for($i = 0;$i < count(str_split($time['scoValue']));$i+=3) {
                $average += str_split($time['scoValue'])[$i] * $x;
                $x = $x / 60;
            }
        }
        $average = $average/count($times);
        $minutes = 0;
        $heures = 0;
        while($average >= 60){
            $average -= 60;
            $minutes += 1;
        }
        while($minutes >= 60){
            $minutes -= 60;
            $heures += 1;
        }
        $time = $heures.":".$minutes.":".$average;
        return $time;
    }
}