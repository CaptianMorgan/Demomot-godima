<?php

/**
 * Created by PhpStorm.
 * User: godima
 * Date: 12.06.2017
 * Time: 08:20
 */
class DB
{
    private $user = "dbLoginUser";
    private $password= ".Etml-";
    private $host = "localhost";
    private $dbName = "db_sudoku";
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
    public function getAllScoreOrderByValue()
    {
        $sqlQuerry = "Select idScore, scoValue,t_user.usePseudo From t_score";
        $sqlQuerry .= "Join t_user on t_user.idUser = t_score.idUser Order By scoValue DESC";

        return $this->doQuerryReturn($sqlQuerry);
    }


    /***
     * @param $scoValue format: "00:00:00"
     * @param $idUser
     */
    public function insertScore($scoValue,$idUser)
    {
        $sqlQuerry = "Insert into t_score";
        $sqlQuerry .= "(`scoValue`,`idUser`)Values";
        $sqlQuerry .= "(".$scoValue.",".$idUser.")";

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
                echo "false";
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
        $sqlQuerry = "Select idScore, scoValue,t_user.usePseudo From t_score";
        $sqlQuerry .= "Join t_user on t_user.idUser = t_score.idUser where t_user.idUser = '".$idUser."'' Order By scoValue DESC";

        return $this->doQuerryReturn($sqlQuerry);
    }


    public  function  getUser()
    {


    }
}