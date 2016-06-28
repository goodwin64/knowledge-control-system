DROP DATABASE IF EXISTS `testsdb`;

--
-- Database: `testsdb`
--
CREATE DATABASE IF NOT EXISTS `testsdb` DEFAULT CHARACTER SET `utf8`;
USE `testsdb`;

-- --------------------------------------------------------

--
-- Table structure for table `tests`
--
CREATE TABLE IF NOT EXISTS `tests` (
	`id` INT NOT NULL UNIQUE AUTO_INCREMENT,
	`complexity` TINYINT, 					# percents: 1..100
	`duration` SMALLINT, 					# in seconds
	`title` VARCHAR(45),					# test name
	`subject` VARCHAR(45),					# field of knowledge of the test
	`description` VARCHAR(255),				# description

	PRIMARY KEY (`id`)
) ENGINE=InnoDB;

--
-- Table structure for table `questions`
--
CREATE TABLE IF NOT EXISTS `questions` (
	`id` INT NOT NULL UNIQUE AUTO_INCREMENT,
	`id_test` INT,						# FOREIGN KEY (question -> test)
	`answers` SMALLINT, 					# *1 (see "sql-instructions.txt")
	`title` VARCHAR(45),					# what is the question
	`options_concat` VARCHAR(1000), 			# concatenation of options
	`options_content` TINYINT, 				# *2 (see "sql-instructions.txt")

	PRIMARY KEY (`id`),
	FOREIGN KEY (`id_test`) REFERENCES `tests`(`id`)
) ENGINE=InnoDB;

--
-- Dumping data for table `tests`
--
INSERT INTO `tests` (`complexity`, `duration`, `title`, `subject`, `description`) VALUES
	(25,	180,	'Programming',		'C++ beginner',			'des1'),
	(50,	900,	'Math',			'Algebra',			'des2'),
	(100,	1200,	'Programming',		'C++ master',			'des3'),
	(75,	600,	'Chemistry',		'Acids',			'des4');

--
-- Dumping data for table `questions`
--
INSERT INTO `questions` (`id_test`, `answers`, `title`, `options_content`, `options_concat`) VALUES
	(1,	1,		'question1',	1,	'a\0b\0c\0d\0'),	# only text questions, a
	(1,	3,		'question2',	1,	'a\0b\0c\0d\0'),	# only text questions, a+b
	(1,	4,		'question3',	1,	'a\0b\0c\0d\0'),	# only text questions, c
	(2,	11,		'question4',	1,	'a\0b\0c\0d\0'),	# only text questions, a+b+d
	(2,	9,		'question5',	1,	'a\0b\0c\0d\0'),	# only text questions, a+d
	(3,	9,		'question6',	1,	'a\0b\0c\0d\0'),	# only text questions, a+d
	(4,	12,		'question7',	1,	'a\0b\0c\0d\0');	# only text questions, c+d
