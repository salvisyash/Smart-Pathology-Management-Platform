/*
SQLyog Community Edition- MySQL GUI v7.01 
MySQL - 5.0.27-community-nt : Database - pathology
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

CREATE DATABASE /*!32312 IF NOT EXISTS*/`pathology` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `pathology`;

/*Table structure for table `regpatient` */

DROP TABLE IF EXISTS `regpatient`;

CREATE TABLE `regpatient` (
  `id` int(255) NOT NULL auto_increment,
  `adminname` varchar(255) default NULL,
  `typeofuser` varchar(255) default NULL,
  `todaydate` varchar(255) default NULL,
  `labno` varchar(255) default NULL,
  `sampledate` varchar(255) default NULL,
  `patientname` varchar(255) default NULL,
  `contactno` varchar(255) default NULL,
  `age` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `patientaddress` longtext,
  `pincode` varchar(255) default NULL,
  `totalamount` varchar(255) default NULL,
  `amountpaid` varchar(255) default NULL,
  `balanceamount` varchar(255) default NULL,
  `gender` varchar(255) default NULL,
  `contry` varchar(255) default NULL,
  `state` varchar(255) default NULL,
  `city` varchar(255) default NULL,
  `alltests` longtext,
  `imgpath` longtext,
  `drname` varchar(255) default NULL,
  `billpdf` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `regpatient` */

insert  into `regpatient`(`id`,`adminname`,`typeofuser`,`todaydate`,`labno`,`sampledate`,`patientname`,`contactno`,`age`,`email`,`patientaddress`,`pincode`,`totalamount`,`amountpaid`,`balanceamount`,`gender`,`contry`,`state`,`city`,`alltests`,`imgpath`,`drname`,`billpdf`) values (1,'a','Admin','2023-10-31','5','2023-10-31','Yash salvi','56523214587','23','yashsalvi1999@gmail.com','Vashi navi mumbai','56585453','8850','8850','0','Male','India','Andhra Pradesh','Mumbai','URINARY PROTEINS,A.S.O. TITRE IN PATIENT`S SERUM,ANTI - NUCLEAR ANTIBODY,BLOOD CULTURE AND SENSITIVITY TEST','C:/testfolder/XU23YO4WH3.jpg','Amol nerlekar','C:/testfolder/OS55NBRGOZ.pdf'),(2,'a','Admin','2023-10-31','10','2023-09-13','Kishori salvi','8547589658','29','yashsalvi1999@gmail.com','Navi mumbai','8565665','7498','7498','0','Female','Aland Islands','Arunachal Pradesh','Delhi','URINARY PROTEINS,DENGUE -IgG/ IgM,DIRECT COOMBS TEST','C:/testfolder/EL5NLF6FWB.jpg','Dr. sanjeev parekh','C:/testfolder/9TG5DEEOPN.pdf'),(3,'a','Admin','2023-10-31','85','2023-09-13','Mayur katkar','9658545458','23','yashsalvi1999@gmail.com','Navi mumbai','8596553','8000','8000','0','Male','Antigua And Barbuda','Arunachal Pradesh','Indore','REPORT ON BLOOD SUGAR ESTIMATION,SERUM ELECTROLYTES,CARDIAC PROFILE','C:/testfolder/SS241W3KOK.jpg','Dr. sanjeev parekh','C:/testfolder/UBBE6UKVV2.pdf');

/*Table structure for table `testinfo` */

DROP TABLE IF EXISTS `testinfo`;

CREATE TABLE `testinfo` (
  `id` int(255) NOT NULL auto_increment,
  `testname` varchar(255) default NULL,
  `cost` varchar(255) default NULL,
  `description` longtext,
  `valuesoftest` longtext,
  `actualvalues` varchar(255) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `testinfo` */

insert  into `testinfo`(`id`,`testname`,`cost`,`description`,`valuesoftest`,`actualvalues`) values (1,'URINARY PROTEINS','5000','The urine protein dipstick test measures the presence of all proteins, including albumin, in a urine sample. Albumin and protein can also be measured using a blood test. Urine is usually tested for protein when kidney disease is suspected.','Urinary volume,Urinary Protien','85,96'),(2,'URINE ALBUMIN','1500','This test looks for a protein called albumin in your urine. The test is used to check for kidney damage or disease. Albumin is a protein in your blood. It helps keep the correct balance of fluid between your blood vessels and the body tissues they supply.','Volume,Result','87,96'),(3,'A.S.O. TITRE IN PATIENT`S SERUM','2050','An antistreptolysin O titer (ASO) is a blood test used to determine if you\'ve had a recent infection caused by group A streptococcus bacteria. It\'s not used to diagnose a current strep infection, such as strep throat','Result,TITRE','78,23'),(4,'ANTI - NUCLEAR ANTIBODY','800','An ANA test detects antinuclear antibodies (ANA) in your blood. Your immune system normally makes antibodies to help you fight infection. In contrast, antinuclear antibodies often attack your body\'s own tissues â€” specifically targeting each cell\'s nucleus.','RESULT','89'),(5,'BLOOD CULTURE AND SENSITIVITY TEST','1000','A blood culture is a test that checks for foreign invaders like bacteria, yeast, and other microorganisms in your blood. Having these pathogens in your bloodstream can be a sign of a blood infection, a condition known as bacteremia. A positive blood culture means that you have bacteria in your blood.','Result,Note','96,122'),(6,'REPORT ON BLOOD SUGAR ESTIMATION','1500','A blood sugar test can be used to determine the amount of glucose in the blood. It may be used to diagnose diabetes or to help those with diabetes check their blood sugar and insulin levels.','Urine Sugar,Urine Acetone','74,93'),(7,'C.S.F. EXAMINATION ROUTINE','2000','A CSF analysis is used to measure different substances in your cerebrospinal fluid. It may include tests to diagnose: Infectious diseases of the brain and spinal cord, including meningitis and encephalitis. CSF tests for infections look at white blood cells, bacteria, and other substances in the cerebrospinal fluid.','Chloride,Colour,Quantity,Blood,Proteins,Sugar','75,90,45,78,56,12'),(8,'CARDIAC PROFILE','3500','The purpose of a Cardiac Profile Test is to assess the overall health and functioning of the heart. This test provides valuable information about various cardiac markers, such as cholesterol levels, triglycerides, lipoproteins, and other important factors that can indicate potential cardiovascular risks.','Cholesterol,S.G.O.T.,LDH,LDH','69,15,78,36'),(9,'CMV IgG','2000','The enzyme-linked immunosorbent assay (ELISA) is the most common serologic test for measuring antibody to CMV. A positive test for CMV IgG indicates that a person was infected with CMV at some time during their life but does not indicate when a person was infected.','CMV IgG (CytoMegalo  Virus)','85'),(10,'CMV IgG (CytoMegalo  Virus)','1500','The enzyme-linked immunosorbent assay (ELISA) is the most common serologic test for measuring antibody to CMV. A positive test for CMV IgG indicates that a person was infected with CMV at some time during their life but does not indicate when a person was infected.','C - Reactive Protein,TITRE','96,78'),(11,'DENGUE -IgG/ IgM','1998','The Dengue IgM Rapid Test is a diagnostic test that involves drawing a small amount of blood from the patient\'s arm. A healthcare provider or phlebotomist will collect the blood sample by inserting a needle into a vein in your arm.','Dengue - IgG,Dengue - IgM','85,89'),(12,'DIRECT COOMBS TEST','500','The direct Coombs test is used to detect antibodies that are stuck to the surface of red blood cells. Many diseases and drugs can cause this to happen. These antibodies sometimes destroy red blood cells and cause anemia.','DIRECT COOMBS Result','85'),(13,'SERUM ELECTROLYTES','3000','An electrolyte panel, also known as a serum electrolyte test, is a blood test that measures levels of the body\'s main electrolytes: Sodium, which helps control the amount of fluid in the body. It also helps your nerves and muscles work properly.','Sodium,Potassium,Chlorides,Bicarbonate','85,26,96,36'),(14,'ELISA TEST FOR ANTI TUBERCULOSIS','2500','It is claimed to have about 95% sensitivity and specificity. Both IgG and IgM antibodies can be separately tested. IgM antibodies appear early in the disease and IgG appear later. The test is negative in healthy, normal subjects and is not related to tuberculin test or BCG vaccination status.','IgM,IgG','36,78'),(15,'HEPATITIS C VIRUS ANTIBODIES','5200','The direct Coombs test is used to detect antibodies that are stuck to the surface of red blood cells. Many diseases and drugs can cause this to happen. These antibodies sometimes destroy red blood cells and cause anemia.','Chloride,Colour,Quantity,Blood,Proteins,Sugar','23,45,67,89,85,96'),(16,'New test','3000','New test description','test1,test2','45,78'),(17,'New test today','1499','New test today New test today New test today New test today New test today','value1,value2,value3,value3','23,45,67,89');

/*Table structure for table `userdetails` */

DROP TABLE IF EXISTS `userdetails`;

CREATE TABLE `userdetails` (
  `id` int(255) NOT NULL auto_increment,
  `username` varchar(255) default NULL,
  `email` varchar(255) default NULL,
  `mobile` varchar(255) default NULL,
  `password` varchar(255) default NULL,
  `address` varchar(255) default NULL,
  `type` varchar(255) default NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `userdetails` */

insert  into `userdetails`(`id`,`username`,`email`,`mobile`,`password`,`address`,`type`) values (1,'a','yashsalvi1999@gmail.com','9930090883','a','vedika soc sagar nagar vikhroli park site','Admin'),(2,'b','yashsalvi1999@gmail.com','9930090883','b','vedika soc sagar nagar vikhroli park site','Lab Incharge'),(3,'yash','yashsalvi1999@gmail.com','9930090883','yash','vedika soc sagar nagar vikhroli park site','Admin');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
