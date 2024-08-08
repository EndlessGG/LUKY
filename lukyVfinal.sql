-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: luky
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `tipoCategoria` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'INFORMATICA'),(2,'PLOMERIA'),(3,'CARPINTERIA'),(4,'CONTADURIA'),(5,'GASTRONOMIA'),(6,'EVENTOS'),(7,'ADMINISTRACION'),(8,'MEDICINA');
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `comentario` text NOT NULL,
  `publicacionID` int NOT NULL,
  `usuarioID` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios`
--

LOCK TABLES `comentarios` WRITE;
/*!40000 ALTER TABLE `comentarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicaciones`
--

DROP TABLE IF EXISTS `publicaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicaciones` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `tituloP` varchar(50) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT (now()),
  `descripcion` text NOT NULL,
  `precioI` decimal(10,2) DEFAULT '0.00',
  `precioF` decimal(10,2) DEFAULT '0.00',
  `categoriaID` int NOT NULL,
  `usuarioID` int NOT NULL,
  `valoracion` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`ID`),
  KEY `FK_categoria` (`categoriaID`),
  KEY `FK_user` (`usuarioID`),
  CONSTRAINT `FK_categoria` FOREIGN KEY (`categoriaID`) REFERENCES `categorias` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_user` FOREIGN KEY (`usuarioID`) REFERENCES `usuarios` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicaciones`
--

LOCK TABLES `publicaciones` WRITE;
/*!40000 ALTER TABLE `publicaciones` DISABLE KEYS */;
INSERT INTO `publicaciones` VALUES (1,'Reparacion de Compuradoras','2024-07-15 16:22:19','Se valoran y reparan computadoras a domicilio',265.00,0.00,1,1,0.00),(2,'Servicio de plomeria','2024-07-15 16:25:24','Se realizan trabajos de plomeria de cualquier tipo',150.00,600.00,2,3,0.00),(3,'Limpieza de Computadoras','2024-07-15 16:26:09','Se realiza limpieza profunda de laptops y computadoras',120.00,250.00,1,2,0.00),(4,'Mantenimiento de impresoras','2024-07-15 16:27:13','Se realiza el mantenimiento mensual a impresoras',200.00,500.00,1,1,0.00),(5,'Reparacion de PC','2024-08-05 16:51:11','Reparo pc a domicilio',125.00,455.00,1,4,0.00),(6,'PRUEBAS DE SISTEMA','2024-08-06 14:52:26','Pruebas de sistema descripcion',125.00,654.00,4,4,0.00),(7,'PRUEBAS DE SISTEMA 2','2024-08-06 14:54:20','Pruebas de sistema descripcion 2',120.00,600.00,8,4,0.00),(8,'PRUEBAS DE SISTEMA 3','2024-08-06 14:55:09','Pruebas de sistema descripcion 3',200.00,987.00,3,4,0.00),(9,'PRUEBA DE GOOGLE','2024-08-07 22:42:12','PRUEBAS',100.00,100.00,1,6,0.00),(10,'PRUEBAS','2024-08-07 22:42:24','PRUENAS 2',100.00,12.00,2,6,0.00),(11,'gatos','2024-08-07 22:44:23','gatos en promo',100.00,154.00,5,7,0.00);
/*!40000 ALTER TABLE `publicaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(50) DEFAULT NULL,
  `apellidoPaterno` varchar(75) DEFAULT NULL,
  `apellidoMaterno` varchar(75) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pass` varchar(255) DEFAULT NULL,
  `isTrabajador` tinyint DEFAULT '0',
  `fechaCreacion` datetime DEFAULT (now()),
  `fechaModif` datetime DEFAULT (now()),
  `googleId` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'AXEL','SALINAS','ANTONIO','axel@gmail.com','123',0,'2024-07-15 16:17:53','2024-07-15 16:17:53',NULL),(2,'DAVID','PARRA','SANTIZO','david@gmail.com','456',0,'2024-07-15 16:19:22','2024-07-15 16:19:22',NULL),(3,'DILAN','PALAFOX','MENDEZ','dilan@gmail.com','789',0,'2024-07-15 16:19:39','2024-07-15 16:19:39',NULL),(4,'DIlan','Palafox','Mendez','dilan.palafox.12@icloud.com','$2b$10$Br4xxYwtzIm8eZb507hL6Oix/Yf.KbWnOzv46OW.AlzXo9XflDOT.',0,'2024-08-02 16:47:50','2024-08-02 16:47:50',NULL),(5,'PRUEBA','PRUEBAP','PRUEBAM','prueba@gmail.com','$2b$10$C/dBUEI21.yq3xzK8iIfXOIHMZ4F1Fj3k0YMpVqr/Hvge.m2HoExS',0,'2024-08-06 15:58:48','2024-08-06 15:58:48',NULL),(6,'Dilan Esau Palafox Mendez',NULL,NULL,'dilan.palafox.12@gmail.com',NULL,0,'2024-08-07 22:38:39','2024-08-07 22:38:39','110513914470483227603'),(7,'vicente palafox',NULL,NULL,'v.palafox.16@gmail.com',NULL,0,'2024-08-07 22:43:56','2024-08-07 22:43:56','109977833763759272244');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valoraciones`
--

DROP TABLE IF EXISTS `valoraciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valoraciones` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `publicacionID` int NOT NULL,
  `valorP` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`ID`),
  KEY `FK_public` (`publicacionID`),
  CONSTRAINT `FK_public` FOREIGN KEY (`publicacionID`) REFERENCES `publicaciones` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valoraciones`
--

LOCK TABLES `valoraciones` WRITE;
/*!40000 ALTER TABLE `valoraciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `valoraciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `actualizarValoracion` AFTER INSERT ON `valoraciones` FOR EACH ROW BEGIN
  DECLARE sum_valoracion double;
  DECLARE count_valoracion double;

  SELECT
    SUM(v.valorP) INTO sum_valoracion
  FROM valoraciones v
  WHERE v.publicacionID = NEW.publicacionID;
  SELECT
    COUNT(*) INTO count_valoracion
  FROM valoraciones v
  WHERE v.publicacionID = NEW.publicacionID;


  UPDATE publicaciones p
  SET p.valoracion = sum_valoracion / count_valoracion
  WHERE p.ID = NEW.publicacionID;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-07 22:51:16
