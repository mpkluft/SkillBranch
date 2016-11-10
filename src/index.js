//внешние библиотеки
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
//--------------------------------------------------
//подключение expree и использование CORS
const app = express();
app.use(cors());
const __DEV__ = true;
//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
	console.log('Your app listening on port 3000');
});
//--------------------------------------------------
//Урок 2 задача A+B
import taskAB from './lesson2/AplusB.js';

app.get('/lesson2AplusB', (req, res) => {
	taskAB(req.query.a, req.query.b);
	let result = taskAB(req.query.a, req.query.b);
	res.json({result:result.toString(),
						task: 'добавить get запрос a=9 b = 7'
	});
});
//--------------------------------------------------
//Урок 2 задача канонизация урлов
import canonize from './lesson2/canonize.js';

app.get('/lesson2canonize', (req, res) => {
	res.json({
    url: req.query.url,
    userName: canonize(req.query.url),
  });
});
//--------------------------------------------------
//Урок 2 задача спарсить покемонов с сайта pokeapi.co
import { showPokemons } from './lesson2/pokemon.js';

app.get('/lesson2pokemon', async (req, res) => {
	showPokemons(res);
});
//--------------------------------------------------



///////////////////////////////
//точка монтирования корень сайта
app.get('/', (req, res) => {
	res.json({
		hello: 'JS World',
	});
});
///////////////////////////////

