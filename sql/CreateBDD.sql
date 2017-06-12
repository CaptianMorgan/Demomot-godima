#------------------------------------------------------------
#        Script MySQL.
#------------------------------------------------------------


#------------------------------------------------------------
# Table: t_user
#------------------------------------------------------------

CREATE TABLE t_user(
        idUser      int (11) Auto_increment  NOT NULL ,
        usePseudo   Varchar (25) ,
        usePassword Varchar (25) ,
        PRIMARY KEY (idUser )
)ENGINE=InnoDB;


#------------------------------------------------------------
# Table: t_score
#------------------------------------------------------------

CREATE TABLE t_score(
        idScore  int (11) Auto_increment  NOT NULL ,
        scoValue Time ,
        idUser   Int ,
        PRIMARY KEY (idScore )
)ENGINE=InnoDB;

ALTER TABLE t_score ADD CONSTRAINT FK_t_score_idUser FOREIGN KEY (idUser) REFERENCES t_user(idUser);
