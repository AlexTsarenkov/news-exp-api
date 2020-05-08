# news-exp-api
## Yandex Praktikum diploma
-----
## IP и Домен
### 84.201.135.199
### alekseytsarenkov.com
## О проекте. 
Данный проект является дипломной работой по курсу web-разработки на [Яндекс.Практикум](https://praktikum.yandex.ru/).
## Функционал
Данный репозиторий является backend частью дипломной работы и представляет собой сервер на express для обработки запросов сайта. В качесnве БД выступает MongoDB

-----
## Запросы
 Запрос | Результат
 --- | ---
 GET /api/users/me	| возвращает информацию о текущем пользователе
 GET /api/articles | возвращает все сохраненные пользователем статьи
 POST /api/articles |создает статью. Поля: keyword - обязательное, title - обязательное, text - обязательное, date - обязательное, source - обязательное, link - обязательное, image - обязательное, owner - id пользователя, обязательное.
 DELETE /api/articles/:id |удаляет статью по id
 POST /api/signup | создает пользователя. Поля: email - обязательное, password - обязательное, name - обязательное, 2-30 символов.
 POST /api/sigin | логин пользователя. Поля: email - обязательное, password - обязательное.
 POST /api/signout | логаут пользователя
## Необходимые пакеты
Пакет|
---|
express|
body-parser|
mongoose|
bcryptjs|
jsonwebtoken|
joi|
joi-objectid|
celebrate|
winston|
express-winston|
cross-env|
dotenv|
cookie-parser|
validator|
helmet|
express-rate-limit|

## dev-пакеты
Пакет|
---|
nodemon
eslint
eslint-config-airbnb-base
eslint-plugin-import

-----

## Запуск
Билд | Команда
--- | ---
dev билд| npm run dev
prod билд | npm run start

-----

## Логи
Файл | Тип
--- | ---
request.log | лог запросов
error.log | лог ошибок
