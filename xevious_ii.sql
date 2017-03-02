-- Progettazione Web 
DROP DATABASE if exists xevious_ii; 
CREATE DATABASE xevious_ii; 
USE xevious_ii; 
-- MySQL dump 10.13  Distrib 5.6.20, for Win32 (x86)
--
-- Host: localhost    Database: xevious_ii
-- ------------------------------------------------------
-- Server version	5.6.20

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `classifica`
--

DROP TABLE IF EXISTS `classifica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `classifica` (
  `id_partita` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `score` int(11) NOT NULL,
  `data` date NOT NULL,
  `seed` int(11) NOT NULL,
  `std_rank` int(11) DEFAULT NULL,
  `ord_rank` int(11) DEFAULT NULL,
  PRIMARY KEY (`id_partita`),
  KEY `score` (`score`),
  KEY `ordinal ranking` (`ord_rank`),
  KEY `username` (`username`),
  CONSTRAINT `username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=672 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classifica`
--

LOCK TABLES `classifica` WRITE;
/*!40000 ALTER TABLE `classifica` DISABLE KEYS */;
INSERT INTO `classifica` VALUES (233,'MasterZi',51,'2015-05-10',50662,48,48),(235,'pippo',170,'2015-05-10',68853,10,10),(238,'MasterZi',21,'2015-05-10',68853,103,104),(240,'MasterZi',40,'2015-05-10',68853,62,62),(246,'MasterZi',27,'2015-05-10',68853,87,88),(249,'MasterZi',20,'2015-05-10',68853,110,110),(251,'MasterZi',37,'2015-05-10',68853,70,70),(252,'MasterZi',21,'2015-05-10',68853,103,103),(253,'MasterZi',151,'2015-05-10',68853,14,14),(256,'MasterZi',27,'2015-05-10',34333,87,87),(257,'MasterZi',30,'2015-05-10',34333,81,82),(259,'MasterZi',58,'2015-05-10',34333,42,42),(263,'MasterZi',30,'2015-05-10',7128,81,81),(264,'MasterZi',26,'2015-05-10',7128,94,94),(266,'MasterZi',63,'2015-05-10',7128,39,39),(268,'MasterZi',35,'2015-05-10',7128,71,71),(270,'MasterZi',48,'2015-05-10',7128,55,55),(271,'raffa',89,'2015-05-11',26795,23,23),(272,'raffa',33,'2015-05-13',38796,74,74),(275,'raffa',31,'2015-05-14',80788,77,77),(280,'raffa',39,'2015-05-14',74591,65,65),(281,'raffa',29,'2015-05-14',34333,83,83),(282,'raffa',24,'2015-05-14',89096,97,97),(283,'raffa',50,'2015-05-14',89096,52,52),(286,'raffa',109,'2015-05-14',54055,22,22),(287,'raffa',59,'2015-05-14',23125,41,41),(292,'raffa',72,'2015-05-14',23125,34,34),(293,'raffa',27,'2015-05-14',76600,87,90),(294,'raffa',27,'2015-05-14',76600,87,89),(295,'raffa',114,'2015-05-14',76600,20,20),(296,'raffa',139,'2015-05-14',335,17,17),(301,'raffa',83,'2015-05-14',5229,29,29),(351,'raffa',71,'2015-05-15',39951,35,35),(358,'raffa',21,'2015-05-16',80035,103,106),(363,'raffa',21,'2015-05-16',41467,103,105),(366,'raffa',25,'2015-05-16',41467,95,95),(370,'raffa',35,'2015-05-16',26897,71,72),(371,'raffa',45,'2015-05-16',26897,58,58),(372,'raffa',65,'2015-05-16',26897,37,37),(373,'raffa',223,'2015-05-16',13464,7,7),(396,'Claudia',261,'2015-05-17',57524,6,6),(407,'raffa',75,'2015-05-18',52306,33,33),(419,'raffa',51,'2015-05-18',29317,48,50),(420,'raffa',56,'2015-05-18',29317,44,44),(427,'enrico',40,'2015-05-18',46141,62,63),(429,'enrico',53,'2015-05-18',46141,46,46),(431,'enrico',140,'2015-05-18',46141,16,16),(432,'enrico',51,'2015-05-18',46141,48,49),(433,'enrico',82,'2015-05-18',46141,30,30),(434,'enrico',152,'2015-05-18',30603,13,13),(435,'enrico',116,'2015-05-18',30603,19,19),(437,'enrico',87,'2015-05-18',30603,24,24),(438,'enrico',55,'2015-05-18',30603,45,45),(440,'enrico',86,'2015-05-18',30603,26,26),(442,'enrico',84,'2015-05-18',30603,28,28),(445,'enrico',21,'2015-05-18',30603,103,107),(451,'raffa',80,'2015-05-19',80165,31,31),(452,'raffa',285,'2015-05-19',81545,5,5),(453,'raffa',64,'2015-05-19',66707,38,38),(454,'enrico',565,'2015-05-19',66707,3,3),(480,'raffa',20,'2015-05-22',13610,110,111),(487,'raffa',209,'2015-05-22',4445,9,9),(488,'raffa',46,'2015-05-22',4445,57,57),(489,'MasterZi',596,'2015-05-22',4445,2,2),(501,'agoblu',43,'2015-05-22',91935,60,60),(502,'raffa',49,'2015-05-22',99126,53,54),(505,'raffa',34,'2015-05-22',65449,73,73),(514,'Claudia',158,'2015-05-22',43798,12,12),(515,'Claudia',79,'2015-05-22',43798,32,32),(516,'Claudia',215,'2015-05-22',43798,8,8),(552,'raffa',33,'2015-05-22',76441,74,75),(555,'Claudia',61,'2015-05-22',64235,40,40),(557,'raffa',87,'2015-05-22',76441,24,25),(558,'Claudia',27,'2015-05-22',64235,87,93),(560,'raffa',31,'2015-05-22',70366,77,79),(561,'Claudia',24,'2015-05-22',64235,97,98),(562,'raffa',49,'2015-05-22',70366,53,53),(563,'Claudia',45,'2015-05-22',64235,58,59),(564,'Claudia',27,'2015-05-22',64235,87,92),(584,'ZMA',27,'2015-05-22',63222,87,91),(590,'ZMA',29,'2015-05-22',63222,83,84),(597,'ZMA',32,'2015-05-22',63222,76,76),(609,'raffa',31,'2015-05-22',48123,77,78),(629,'ZMA',22,'2015-05-23',9377,100,101),(631,'ZMA',22,'2015-05-23',9377,100,100),(633,'ZMA',21,'2015-05-23',9377,103,109),(634,'ZMA',39,'2015-05-23',9377,65,66),(637,'raffa',57,'2015-05-23',5140,43,43),(640,'raffa',21,'2015-05-23',95216,103,108),(644,'raffa',41,'2015-06-04',38330,61,61),(645,'raffa',38,'2015-06-04',38330,68,68),(646,'pippo',22,'2015-06-11',53358,100,102),(649,'raffa',51,'2015-06-11',89252,48,51),(650,'raffa',38,'2015-06-11',57524,68,69),(652,'raffa',86,'2015-06-12',46617,26,27),(654,'raffa',23,'2015-06-12',46617,99,99),(655,'raffa',25,'2015-06-12',46617,95,96),(656,'raffa',28,'2015-06-12',46617,86,86),(657,'raffa',20,'2015-06-12',66525,110,112),(658,'pippo',40,'2015-06-13',102,62,64),(659,'pippo',47,'2015-06-13',102,56,56),(660,'pippo',113,'2015-06-13',102,21,21),(661,'raffa',145,'2015-06-14',78963,15,15),(662,'raffa',824,'2015-06-14',78963,1,1),(663,'raffa',39,'2015-06-26',46839,65,67),(664,'raffa',29,'2015-06-26',67937,83,85),(665,'raffa',138,'2015-06-26',67937,18,18),(666,'agoblu',159,'2015-07-03',85028,11,11),(667,'pippo',31,'2015-07-03',75848,77,80),(668,'agoblu',53,'2015-07-03',57524,46,47),(669,'agoblu',8,'2015-07-03',57524,113,113),(670,'agoblu',71,'2015-07-03',57524,35,36),(671,'raffa',297,'2015-07-03',70406,4,4);
/*!40000 ALTER TABLE `classifica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `coins` int(11) unsigned NOT NULL DEFAULT '10',
  PRIMARY KEY (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('agoblu','s14jvbw@6nup5.apf','Agoblu123',28),('Ciaoa','ciaoa@ciaoa.it','Ciaoa123',70),('Claudia','ciao@babbonatale.it','Claudia123',37),('enrico','lol@hot.it','Enrico123',101),('europa','tk@oh.pa','Europa123',70),('livia','liv@liv.it','Livia123',10),('MasterZi','dario@hotmail.it','Aurora1',43),('Pappa','pappa@pappa.it','Pappa123',70),('pippo','pippo@pippo.it','Pippo123',93),('raffa','raffa@zippo.it','Raffa123',157),('ZMA','mario@live.com','Inter2015',24);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_store`
--

DROP TABLE IF EXISTS `user_store`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_store` (
  `username` varchar(45) CHARACTER SET latin1 COLLATE latin1_general_cs NOT NULL,
  `missili` int(11) NOT NULL DEFAULT '0',
  `bomba` int(11) NOT NULL DEFAULT '0',
  `scudo` int(11) NOT NULL DEFAULT '0',
  `speeder` bit(1) NOT NULL DEFAULT b'0',
  `doubleshot` bit(1) NOT NULL DEFAULT b'0',
  `xevious` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`username`),
  KEY `username` (`username`),
  KEY `us_username` (`username`),
  CONSTRAINT `us_username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_store`
--

LOCK TABLES `user_store` WRITE;
/*!40000 ALTER TABLE `user_store` DISABLE KEYS */;
INSERT INTO `user_store` VALUES ('agoblu',2,2,2,'','\0','\0'),('Ciaoa',0,0,0,'\0','\0','\0'),('Claudia',1,0,0,'\0','\0','\0'),('enrico',1,0,0,'\0','\0','\0'),('europa',0,0,0,'\0','\0','\0'),('livia',0,0,0,'\0','\0','\0'),('MasterZi',3,3,0,'','',''),('Pappa',0,0,0,'\0','\0','\0'),('pippo',2,2,1,'\0','\0','\0'),('raffa',3,3,3,'','',''),('ZMA',1,1,1,'\0','\0','\0');
/*!40000 ALTER TABLE `user_store` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-07-04 20:36:01
