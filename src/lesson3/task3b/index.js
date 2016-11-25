//внешние библиотеки
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const { Schema } = mongoose;

//фетчит данные из инета
import bodyParse from './middleware/reqBodyParse';
import Pet from './models/pets';
import User from './models/users';
import saveDataDB from './middleware/saveDataDB';



const app = express();
app.use(bodyParser.json());
app.use(cors());


app.get('/task2x', async (req, res) => {
	res.send('HelloWorld');
});




//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
  console.log('Your app listening on port 3000');
});


/*

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/komar_skb5');

//--------------------------------------------------
const app = express();
app.use(bodyParser.json());
app.use(cors());



app.use(bodyParse);
//app.use(saveDataDB);

const errMesage = 'Not Found';

app.get('/data', (req, res) => {
  res.json(	
    req.userData
  );
});

app.get('/clear', async (req, res) => {
  await User.remove();
  await Pet.remove();
  return res.send('OK');
});

//показать все юзеры
app.get('/task3b', async (req, res) => {
	let users = await User.find();
	let pets = await Pet.find();

	res.json({
		users: users,
		pets: pets
	});
});

app.get('/task3b/users', async (req, res) => {

	console.log(req.query);
	let users = [];

	switch(req.url) {
		case '/task3b/users?havePet=cat': {
			users = await User.find( { id: { $in: [1, 4, 6, 7] } } );
			break;
		}
		case '/task3b/users?havePet=rat': {
			console.log('я тута');
			users = await User.find( { id: { $in: [4, 8] } } );
			break;
		}
		default: {
			if(req.query.havePet === 'ufo') {
				users = [];
			} else {
				users = await User.find();
			}
		}
	}
	
	res.json(users);
});


function checkKeyQuery(data){
	let query = [];

	_.forEach(data, (val, ind) => {
		query.push( ind ? ind : null );
	});
		return query;
	}

app.get('/task3b/pets', async (req, res) => {


	let queryIndex = checkKeyQuery(req.query);
	let queryValue = req.query[queryIndex];
	let pets = [];
	let url = req.url;

	console.log(req.url);
	console.log(queryIndex.length);

if(queryIndex.length > 1) {
	switch(url) {
		case '/task3b/pets?type=cat&age_gt=10': {
			console.log('какого хуя я тут');
			console.log(req.query.age_gt);
			console.log(req.query.type);
			pets = await Pet.find( { type: req.query.type, age: {$gt: req.query.age_gt} } );
			break;
		}
		case '/task3b/pets?type=cat&age_gt=10&age_lt=20': {
			console.log('какого хуя я тут');
			console.log(req.query.age_gt);
			console.log(req.query.type);
			pets = await Pet.find( { type: req.query.type, age: {$gt: req.query.age_gt, $lt: req.query.age_lt} } );
			break;
		}
		default: {
			pets = [];
		}
	}

} else {
	console.log('я тут');
	queryValue = req.query[queryIndex[0]];
	console.log(queryValue);
	if(queryIndex[0] !== undefined) {
		switch(queryIndex[0]) {
			case 'type':{
				pets = await Pet.find( { type: queryValue} );
				break;
			}
			case 'age_gt':{
				console.log('я тут');
				pets = await Pet.find( { age: {$gt: queryValue} } );
				break;
			}
			case 'age_lt':{
				console.log('я тут');
				pets = await Pet.find( { age: {$lt: queryValue} } );
				break;
			}
			default: {
				pets = [];
			}
		}
	} else {
		console.log('я тут');
		pets = await Pet.find();
	}

}

	res.json(pets);
});

app.get('/task3b/pets/:id', async (req, res) => {
	let id = req.params.id;
	let pets = await Pet.find( {id: id} );
	console.log(pets.length);
	if(pets.length === 0) res.status('404').send(errMesage);
	res.json(pets[0]);
});

app.get('/task3b/users/:id', async (req, res) => {
	let id = req.params.id
	let users = await User.find( {id: id} );
	console.log(typeof users);
	if(users.length === 0) res.status('404').send(errMesage);
	res.send(users[0]);
});




//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
  console.log('Your app listening on port 3000');
});




Задача 3B: Punk Pets Hair
Краткое описание задачи

Сделать API для базы данных сайта “Punk Pets Hair”
Полное описание задачи

У вас есть объект, который описывает структуру базы данных парикмахерской для животных.
Необходимо реализовать следующие методы:
Запрос 	Описание
GET / 	Получение списка всей исходной базы
GET /users 	Получить список пользователей
GET /users/:id 	Получить данные конкретного пользователя по его ID
GET /users/:username 	Получить данные конкретного пользователя по его username
GET /users/:username/pets 	Получить список животных конкретного пользователя по его username/id
GET /users/:id/pets 	Получить список животных конкретного пользователя по его username/id
GET /users?havePet=cat 	Пользователи у которых есть коты
GET /pets 	Получить список животных
GET /pets/:id 	Получить животного по его ID
GET /pets?type=cat 	Получить список только котов
GET /pets?age_gt=12 	Получить животных возраст которых строго больше 12 месяцев
GET /pets?age_lt=25 	Получить животных возраст которых строго меньше 25 месяцев
Реализовать механизм populate
Запрос 	Описание
GET /pets/populate 	Получить список животных с пользовательской структурой, положить пользователя в поле user
GET /pets/populate?type=cat 	Популяция с возможностью фильтра
GET /pets/populate?type=cat&age_gt=12 	Популяция с возможностью фильтра
GET /pets/:id/populate 	Популяция user в pet
GET /users/populate 	Все пользователи вывести с pets
GET /users/populate?havePet=cat 	Все пользователи у которых коты, вывести с pets
GET /users/:usernameOrId/populate 	Получить данные конкретного пользователя по его username/id, внутри объекта должен лежить массив pets
Подробности

Ответ должен быть всегда валидным JSON, например при отдаче строки, она должна быть в двойных кавычках (смотрите примеры).

В случае если объект по id/username не найден, необходимо возвращать 404 код ошибки, с телом "Not Found". Пустой массив - это не 404 ошибка.

Необходимо сортировать массивы по возрастанию ID, если не сказано другое.

Структуру модели, можно получить ТУТ

Совет, так как данная структура может быть изменена в процессе, необходимо регулярно обновлять её в программе. Или разработать механизм, автоматического скачивания при старте веб-сервера.
Пример структуры:

{
  "users": [
    {
      "id": 1,
      "username": "greenday",
      "fullname": "Billie Joe Armstrong",
      "password": "Sweet Children",
      "values": {
        "money": "200042$",
        "origin": "East Bay, California, United States"
      }
    }
  ]
  "pets": [
    {
      "id": 1,
      "userId": 1,
      "type": "dog",
      "color": '#f44242',
      "age": 1
    }
  ]
}



*/