USE 'testsdb';

# all tests, all info
SELECT * FROM `tests`;

# all questions, all info
SELECT * FROM `questions`;

# all questions, info for user 
SELECT `id_test`, `title`, `options_content`, `options_concat` FROM `questions`;

# question №2, info for user 
SELECT `id_test`, `title`, `options_content`, `options_concat` FROM `questions` WHERE `id`=2;

# test №1, info for user
SELECT 
questions.id_test, questions.title, questions.options_content, questions.options_concat, 
tests.duration, tests.complexity, tests.subject 
FROM questions INNER JOIN tests 
ON questions.id_test=tests.id
WHERE questions.id_test=1;
