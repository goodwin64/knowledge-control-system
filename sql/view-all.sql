# all tests, all info
SELECT * FROM `testsdb`.`tests`;

# all questions, all info
SELECT * FROM `testsdb`.`questions`;

# all questions, info for user 
SELECT `id_test`, `title`, `options_content`, `options_concat` FROM `testsdb`.`questions`;

# question №2, info for user 
SELECT `id_test`, `title`, `options_content`, `options_concat` FROM `testsdb`.`questions` WHERE `id`=2;
