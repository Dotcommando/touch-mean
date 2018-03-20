# Express + MongoDB
Получение навыка создания приложения на базе Express + MongoDB.
Получены навыки:

1. Установка. *То, что не пишут в мануалах*: Во время установки MongoDB нужно отказаться от установки Compass, ибо он вешает всю установку и не устанавливается на Win7x64.
2. Настройка MongoDB. *То, что не пишут в мануалах*: после установки попытка запуска ни к чему не приводит, потому что руками надо создать создать папки по адресу `C:\data\db`.
3. Установка СУБД *Studio 3T*. Нужна для визуальной работы с БД.
4. Создание БД в Studio 3T. `Connect -> New Connection` и вводим название БД `ИМЯ_БД` для дальнейшей работы с ней.
5. Создание подключения к БД. В файле `server.js` создаём подключение:

        var MongoClient = require('mongodb').MongoClient;

        MongoClient.connect('mongodb://localhost:27017/', function(err, database) {
        	if (err) return console.log(err);
        	db = database.db('ИМЯ_БД');    // В видеомануале это сделано неправильно
        	app.listen(3012, function(){
        		console.log('API app started');
        	});
        });

6. Обязательная шапка, которую придётся прописывать в любом приложении Express + MongoDB:

        var express = require('express');         // Собственно Express
        var app = express();
        var bodyParser = require('body-parser');  // Парсер для получения данных форм из запроса
        var MongoClient = require('mongodb').MongoClient;
        var db;
        var ObjectID = require('mongodb').ObjectID;   // Для работы с _id, ибо _id это отдельный тип данных, а не строка

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
