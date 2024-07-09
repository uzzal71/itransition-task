-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: itransition_task
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.22.04.3

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
-- Table structure for table `tblProductData`
--

DROP TABLE IF EXISTS `tblProductData`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblProductData` (
  `intProductDataId` int NOT NULL AUTO_INCREMENT,
  `strProductCode` varchar(10) NOT NULL,
  `strProductName` varchar(50) NOT NULL,
  `strProductDesc` text NOT NULL,
  `Stock` int NOT NULL,
  `Price` decimal(10,2) NOT NULL,
  `dtmAdded` datetime DEFAULT NULL,
  `dtmDiscontinued` datetime DEFAULT NULL,
  `stmTimestamp` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`intProductDataId`),
  UNIQUE KEY `strProductCode` (`strProductCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProductData`
--

LOCK TABLES `tblProductData` WRITE;
/*!40000 ALTER TABLE `tblProductData` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblProductData` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProductDataDuplicated`
--

DROP TABLE IF EXISTS `tblProductDataDuplicated`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblProductDataDuplicated` (
  `intProductDataId` int NOT NULL AUTO_INCREMENT,
  `strProductCode` varchar(10) DEFAULT NULL,
  `strProductName` varchar(50) DEFAULT NULL,
  `strProductDesc` text,
  `Stock` varchar(50) DEFAULT NULL,
  `Price` varchar(50) DEFAULT NULL,
  `dtmAdded` varchar(50) DEFAULT NULL,
  `dtmDiscontinued` varchar(50) DEFAULT NULL,
  `stmTimestamp` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`intProductDataId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProductDataDuplicated`
--

LOCK TABLES `tblProductDataDuplicated` WRITE;
/*!40000 ALTER TABLE `tblProductDataDuplicated` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblProductDataDuplicated` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tblProductDataFailed`
--

DROP TABLE IF EXISTS `tblProductDataFailed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tblProductDataFailed` (
  `intProductDataId` int NOT NULL AUTO_INCREMENT,
  `strProductCode` varchar(10) DEFAULT NULL,
  `strProductName` varchar(50) DEFAULT NULL,
  `strProductDesc` text,
  `Stock` varchar(50) DEFAULT NULL,
  `Price` varchar(50) DEFAULT NULL,
  `dtmAdded` varchar(50) DEFAULT NULL,
  `dtmDiscontinued` varchar(50) DEFAULT NULL,
  `stmTimestamp` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`intProductDataId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tblProductDataFailed`
--

LOCK TABLES `tblProductDataFailed` WRITE;
/*!40000 ALTER TABLE `tblProductDataFailed` DISABLE KEYS */;
/*!40000 ALTER TABLE `tblProductDataFailed` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-10  5:39:26
