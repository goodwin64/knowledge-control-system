# knowledge-control-system
Course project for EPAM Academy. Subject: "Knowledge control system (tests)".
You can see the result [HERE](https://goodwin64.github.io/knowledge-control-system/)

## TODO-list
###### Общие требования [Task-commn]:
1. Верхний блок - слайдер изображений (или видео) основное и меню сайта. Пункты меню расположены горизонтально с отступом, разделяясь вертикальной чертой.
    (пункты меню готовы; осталось реализовать слайдер)
2. Обязательно должны быть подменю.
    (базовая реализация, в будущем - дополнение контента)
3. Основной блок: наверху находятся breadcrumbs (“хлебные крошки”), если есть необходимость (предпочтительно, но не обязательно). Под ними расположен блок с контентом. 
4. Блок контента должен обладать (при необходимости) вертикальным скролом.
5. При изменении размеров окна браузера - блок контента должен растягиваться на всё доступное ему пространство, за вычетом левого меню (если есть), шапки и хлебных крошек.
    (готово; см. текущий коммит)
6. При прокрутке блока контента - остальные блоки должны быть неподвижны.
7. На одной из страниц блока с контентом должна находится галерея картинок 300x300 px. Предусмотреть вариант когда картинки в галерее имеют разную высоту.
8. На одной из страниц использовать клиентскую пагинацию: данные необходимо отображать постранично, максимум 10 элементов на страницу, необходимо предоставить пользовательскую навигацию для перехода по страницам.
9. На странице «Контакты» должна быть карта с указанием места расположения.
10. Страницы веб-приложения должны занимать всю ширину окна и корректно отображаться во всех браузерах (кросс-браузерность включительно с IE8/IE9)
    (в данном случае 10/12 ширины окна; прием, схожий с http://worldoftanks.ru/; осталось реализовать кросс-браузерность)
11. Предусмотреть возможность поиска по сайту.
12. На странице с данными должна быть возможность сортировки и фильтрации.
13. При вёрстке нельзя использовать таблицы, фреймы. Таблицы можно использовать только в случае таблицы с данными.
14. Можно использовать любые изображения и видео
 
###### Обязательно [Task-neces]:
- Особое внимание следует уделить скорости работы, зависание интерфейса при выполнении операций загрузки данных, фильтрации, сортировки недопустимо;
- Пишите код так, как бы вы его писали в работе - внутренности задания будут оцениваться даже тщательней, чем внешнее соответствие заданию;
- Код должен быть организован так, чтобы его можно было заново использовать;
- Помните про обработку ошибок!
 
###### Дополнительно [Task-addit]:
- Левый блок - дополнительное меню, оно может иметь несколько уровней вложенности, каждый последующий уровень должен иметь отступ на Х px больше предыдущего уровня. Ширина меню – Y px. Если меню превышает высоту страница - то должен показываться системный вертикальный скролл. Этот скролл должен прокручивать только меню.
- Использовать Landing Page/ реализовать приложение в виде SPA.
- Шаринг в соц. Сетях.
- Регистрация.

###### По заданию [Task-specf] (Система тестирования знаний):
- Выбор (поиск) теста. 
- Прохождение теста с контролем времени. 
- Статистика тестирования.  
- `*`Редактирование тестов. 
- `*`Расширенная статистика тестирования.<br>
`* - Дополнительно`
