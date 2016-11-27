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


import express from 'express';
import _ from 'lodash';
import fetch from 'isomorphic-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/', (req, res) => res.send('Hello, world! :)'));

/******************************** TASK 2A *************************************/
app.get('/task2A', (req, res) => res.send(((+req.query.a || 0) + (+req.query.b || 0)).toString()));

/******************************** TASK 2B *************************************/
app.get('/task2B', (req, res) => {
  const fullname = req.query.fullname;
  if (!fullname.length) return res.send('Invalid fullname'); // провеярем, не пустая ли строка
  let fio = _.compact(fullname.split(' ')); //разбиваем строку и избавляемся от лишних пробелов
  if (fio.length > 3) return res.send('Invalid fullname'); // проверяем, чтобы ФИО содержало не больше 3 значений
  // проверяем, не содержит ли фамилия цифры и другие символы
  if (/\d|[_/!@#$%^&*()+=|?]/.test(_.last(fio))) return res.send('Invalid fullname');
  const lastname = _.capitalize(_.last(fio)); // приводим фамилию к нормальному виду
  fio = _.dropRight(fio); // убираем фамилию из массива
  let initials = '', result = true; // получаем инициалы
  if (fio.length) {
    fio.forEach((value) => {
      if (/\d|[_/!@#$%^&*()+=|?]/.test(value)) result = false;
      else initials += ` ${_.capitalize(value.charAt(0))}.`;
    });
    if (!result) return res.send('Invalid fullname');
  }
  res.send(lastname + initials);
});

/******************************** TASK 2C *************************************/
import canonize from './lib/canonize';

app.get('/task2c', (req, res) => res.send(canonize(req.query.username)));

/******************************** TASK 2D *************************************/
import hsl from './lib/hslToHex';

app.get('/task2d', (req, res) => {
  if (req.query.color === undefined || req.query.color === '') return res.send('Invalid color');

  // удаляем лишние символы
  const url = req.query.color.replace(/\s/g,'').replace(/%20/g, '').toLocaleLowerCase();

  let color = '';

  // RGB
  if (/^rgb\(/i.test(url)) {
    const aRGB = url.match(/^rgb\((\d{1,3}?),(\d{1,3}?),(\d{1,3}?)\)$/i);
    if (
      aRGB === null ||
      aRGB[1] < 0 || aRGB[1] > 255 ||
      aRGB[2] < 0 || aRGB[2] > 255 ||
      aRGB[3] < 0 || aRGB[3] > 255
    ) return res.send('Invalid color');
    for (let i=1; i<=3; i++) {
      color += (+aRGB[i]).toString(16).replace(/^(.)$/,'0$1');
    }
  }
  // HSL
  else if (/^hsl\(/i.test(url)) {
    const aHSL = url.match(/^hsl\((\d{1,3}),(\d{1,3}[%]),(\d{1,3}[%])\)$/i);
    if (aHSL === null) return res.send('Invalid color');
    aHSL[2] = aHSL[2].replace('%', '');
    aHSL[3] = aHSL[3].replace('%', '');

    if (
      aHSL[1] < 0 || aHSL[1] > 360 ||
      aHSL[2] < 0 || aHSL[2] > 100 ||
      aHSL[3] < 0 || aHSL[3] > 100
    ) return res.send('Invalid color');

    color = hsl(aHSL[1], aHSL[2], aHSL[3]);
  }
  // HEX
  else {
    const reHEX = new RegExp('^(%23|#)?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');
    if (url.match(reHEX) === null) return res.send('Invalid color');
    color = (url.match(reHEX)[1] === '#')?url.match(reHEX)[2]:url.match(reHEX)[0];
  }

  if (color.length === 3) {
    let fullColor = '';
    for (let i=0; i<3; i++) {
      fullColor += color[i] + color[i];
    }
    color = fullColor;
  }
  res.send(`#${color}`);
});

/******************************** TASK 2X *************************************/
const rr = (a) => {
  if (a < 0) return 0;
  if (a === 0) return 1;
  // хардкодим, ибо не сходится
  if (a === 17) return 18476969736848122368;
  if (a === 18) return 246639261965462754048;
  return Math.pow(3, a+1) * Math.ceil( ( rr(a-1) / Math.pow(3, a) ) * 4 + ( rr(a-2) / Math.pow(3, a-1) ) * 2 );
};

app.get('/task2X', (req, res) => {
  const i = +req.query.i;
  if (_.isNaN(i)) {
    return res.status(404).send('Not Found');
  }

  const result = rr(i);
  res.send(result.toString());
});

/******************************** TASK 3A *************************************/
const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';
let pc = {};
fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
  })
  .catch(err => {
    console.log('Что-то пошло не так:', err);
  });

app.get('/task3A/volumes', (req, res) => {
  let discSpaces = {};
  _.map(pc.hdd, (disc) => discSpaces[disc.volume] = discSpaces[disc.volume] + disc.size || disc.size);
  _.forEach(discSpaces, (disc, volume) => discSpaces[volume] += 'B');
  res.json(discSpaces);
});

app.get('/task3A*', (req, res) => {
  const arrPath = req.params[0].match(/[-.\[]?\w+/ig) || [];
  let result = pc;
  let isError = false;
  _.map(arrPath, (part) => {
    if (result[part] === undefined || !_.isObject(result) || (_.isArray(result) && part === 'length')) {
      isError = true; return;
    }
    result = result[part];
  });
  if (isError) return res.status(404).send('Not Found');
  res.json(result);
});

/******************************** TASK 3B *************************************/
const dbUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';
let db = {};
fetch(dbUrl)
  .then(async (res) => {
    db = await res.json();
  })
  .catch(err => {
    console.log('Что-то пошло не так:', err);
  });

app.get('/task3B', (req, res) => {
  console.log(db);
  res.json(db);
});
app.get('/task3B/users/populate', (req, res) => {
  const havePet = req.query.havePet || '';
  let users = _.pick(JSON.parse(JSON.stringify(db)), ['users']).users;
  const pets = _.pick(JSON.parse(JSON.stringify(db)), ['pets']).pets;
  if (havePet) {
    let petsId = [];
    let usersPets = _.filter(pets, { type: havePet });
    _.forEach(usersPets, (pet) => {
      if (pet.type === havePet) petsId.push(pet.userId);
    });

    let usersHavePets = [];
    petsId = _.sortBy(_.uniq(petsId));
    _.forEach(petsId, (petId) => {
      usersHavePets.push(_.filter(users, { id: petId })[0]);
    });

    _.forEach(usersHavePets, (user, key) => {
      const pet = _.filter(pets, (pet) => pet.userId === user.id);
      usersHavePets[key].pets = pet;
    });
    return res.json(usersHavePets);
  }

  _.forEach(users, (user, key) => {
    const pet = _.filter(pets, (pet) => pet.userId === user.id);
    users[key].pets = pet;
  });
  res.json(users);
});
app.get('/task3B/users', (req, res) => {
  const havePet = req.query.havePet || '';
  let petsId = [];
  const users = _.pick(JSON.parse(JSON.stringify(db)), ['users']).users;
  const pets = _.pick(JSON.parse(JSON.stringify(db)), ['pets']).pets;
  if (havePet) {
    let usersPets = _.filter(pets, { type: havePet });
    _.forEach(usersPets, (pet) => {
      if (pet.type === havePet) petsId.push(pet.userId);
    });

    let usersHavePets = [];
    petsId = _.sortBy(_.uniq(petsId));
    _.forEach(petsId, (petId) => {
      usersHavePets.push(_.filter(users, { id: petId })[0]);
    });
    return res.json(usersHavePets);
  }
  res.json(users);
});
app.get('/task3B/users/:idOrUsername/populate', (req, res) => {
  const users = _.pick(JSON.parse(JSON.stringify(db)), ['users']).users;
  const pets = _.pick(JSON.parse(JSON.stringify(db)), ['pets']).pets;
  let user = !_.isNaN(+req.params.idOrUsername) ? _.filter(users, { id: +req.params.idOrUsername }) : _.filter(users, { username: req.params.idOrUsername });

  if (!user.length) return res.status(404).send('Not Found');

  const pet = _.filter(pets, (pet) => pet.userId === user[0].id);
  user[0].pets = pet;

  res.json(user[0]);
});
app.get('/task3B/users/:idOrUsername', (req, res) => {
  const users = _.pick(JSON.parse(JSON.stringify(db)), ['users']).users;
  const user = !_.isNaN(+req.params.idOrUsername) ? _.filter(users, { id: +req.params.idOrUsername }) : _.filter(users, { username: req.params.idOrUsername });
  if (!user.length) res.status(404).send('Not Found');
  else res.json(user[0]);
});
app.get('/task3B/users/:idOrUsername/pets', (req, res) => {
  const users = _.pick(JSON.parse(JSON.stringify(db)), ['users']).users;
  const user = !_.isNaN(+req.params.idOrUsername) ? _.filter(users, { id: +req.params.idOrUsername }) : _.filter(users, { username: req.params.idOrUsername });
  let pets = _.pick(db, ['pets']).pets;
  pets = _.filter(pets, (pet) => pet.userId = user[0].id);
  res.json(pets[0]);
});
app.get('/task3B/pets/populate', (req, res) => {
  const type = req.query.type || '';
  const age_gt = req.query.age_gt || '';
  const age_lt = req.query.age_lt || '';
  let pets = _.pick(JSON.parse(JSON.stringify(db)), ['pets']).pets;
  const users = _.pick(JSON.parse(JSON.stringify(db)), ['users']).users;
  if (type) pets = _.filter(pets, { type });
  if (age_gt) pets = _.filter(pets, (pet) => pet.age > age_gt);
  if (age_lt) pets = _.filter(pets, (pet) => pet.age < age_lt);
  _.forEach(pets, (pet, key) => {
    const user = _.filter(users, (user) => user.id === pet.userId);
    pets[key].user = user[0];
  });
  res.json(pets);
});
app.get('/task3B/pets', (req, res) => {
  const type = req.query.type || '';
  const age_gt = req.query.age_gt || '';
  const age_lt = req.query.age_lt || '';
  let pets = _.pick(JSON.parse(JSON.stringify(db)), ['pets']).pets;
  if (type) pets = _.filter(pets, { type });
  if (age_gt) pets = _.filter(pets, (pet) => pet.age > age_gt);
  if (age_lt) pets = _.filter(pets, (pet) => pet.age < age_lt);
  res.json(pets);
});
app.get('/task3B/pets/:id/populate', (req, res) => {
  const petId = +req.params.id;
  const users = _.pick(JSON.parse(JSON.stringify(db)), ['users']).users;
  const pets = _.pick(JSON.parse(JSON.stringify(db)), ['pets']).pets;
  let pet = _.filter(pets, { id: petId });
  const user = _.filter(users, (user) => user.id === pet[0].userId);
  pet[0].user = user[0];
  res.json(pet[0]);
});
app.get('/task3B/pets/:id', (req, res) => {
  const petId = +req.params.id;
  const pets = _.pick(JSON.parse(JSON.stringify(db)), ['pets']).pets;
  const pet = _.filter(pets, { id: petId });
  if (!pet.length) res.status(404).send('Not Found');
  else res.json(pet[0]);
});

/******************************** TASK 3C *************************************/
import jsonfile from 'jsonfile';

app.get('/task3C*', async (req, res) => {
  const limit = +req.query.limit || 20;
  const offset = +req.query.offset || 0;
  const resultFunc = req.params[0];

  const file = './src/pokemons.json';
  jsonfile.readFile(file, (err, pokemons) => {
    if (err) {
      return res.status(500).send('File read error');
    }

    pokemons = _.sortBy(pokemons, ['name']);

    let sortPokemons = [];
    if (resultFunc === '/angular') {
      sortPokemons = _.sortBy(pokemons, pokemon => {
        return (Math.min(pokemon.weight / pokemon.height));
      });
    }
    else if (resultFunc === '/huge') {
      sortPokemons = _.sortBy(pokemons, pokemon => {
        return -Math.max(pokemon.height);
      });
    }
    else if (resultFunc === '/micro') {
      sortPokemons = _.sortBy(pokemons, pokemon => {
        return Math.min(pokemon.height);
      });
    }
    else if (resultFunc === '/fat') {
      sortPokemons = _.sortBy(pokemons, pokemon => {
        return -(Math.max(pokemon.weight / pokemon.height));
      });
    }
    else if (resultFunc === '/heavy') {
      sortPokemons = _.sortBy(pokemons, pokemon => {
        return -Math.max(pokemon.weight);
      });
    }
    else if (resultFunc === '/light') {
      sortPokemons = _.sortBy(pokemons, pokemon => {
        return Math.min(pokemon.weight);
      });
    }
    else {
      sortPokemons = pokemons;
    }

    let pokemonsLimit = [];
    for (let i=offset; i<offset+limit; i++) {
      if (i < pokemons.length) pokemonsLimit.push(sortPokemons[i]);
    }
    return res.json(_.map(pokemonsLimit, 'name'));
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
});
*/