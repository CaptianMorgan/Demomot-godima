#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------
DROP DATABASE IF EXISTS `db_sudoku`;
CREATE DATABASE `db_sudoku`;
USE `db_sudoku`;

DROP USER IF EXISTS 'dbLoginUser'@'localhost' ;
CREATE USER 'dbLoginUser'@'localhost' identified by '.Etml-';
grant all privileges on `db_sudoku`.* to 'dbLoginUser'@'localhost';
#------------------------------------------------------------
# Table: t_user
#------------------------------------------------------------

CREATE TABLE t_user(
        idUser      int (11) Auto_increment  NOT NULL ,
        usePseudo   Varchar (25) ,
        usePassword Varchar (100) ,
        PRIMARY KEY (idUser )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_score
#------------------------------------------------------------

CREATE TABLE t_score(
        idScore  int (11) Auto_increment  NOT NULL ,
        scoValue Time ,
		scoDifficulty VARCHAR (25),
        idUser   Int  NOT NULL,
        PRIMARY KEY (idScore )
)ENGINE=InnoDB;

ALTER TABLE t_score ADD CONSTRAINT FK_t_score_idUser FOREIGN KEY (idUser) REFERENCES t_user(idUser);
