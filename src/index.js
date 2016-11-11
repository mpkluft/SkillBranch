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
//import taskAB from './lesson2/AplusB.js';
//
//app.get('/lesson2AplusB', (req, res) => {
//	taskAB(req.query.a, req.query.b);
//	let result = taskAB(req.query.a, req.query.b);
//	res.json({result:result.toString(),
//						task: 'добавить get запрос a=9 b = 7'
//	});
//});
//--------------------------------------------------
//Урок 2 задача канонизация урлов
//import canonize from './lesson2/canonize.js';

app.get('/lesson2canonize', (req, res) => {
	console.log(req.query.username);
	res.send(
    canonize(req.query.username),
  );
});

function canonize(string) {
  let userName = string;
  let reg = new RegExp('@?(https?:)?(\/\/)?(([0-9\w-]*)[^\/]*\/)?@?([A-Za-z0-9._]*)');
  //if(userName.match(reg)[5].search)
  return '@' + userName.match(reg)[5];
}
//--------------------------------------------------
//Урок 2 задача спарсить покемонов с сайта pokeapi.co
//import { showPokemons } from './lesson2/pokemon.js';
//
//app.get('/lesson2pokemon', async (req, res) => {
//	showPokemons(res);
//});
//--------------------------------------------------
//Урок 2 Перевести полное `Имя Отчество Фамилия` в `Фамилия И. О.`
//import { chekFio } from './lesson2/fio.js';
//
//app.get('/fio', (req, res) => {
//	let result = chekFio(req.query.fullname);
//	res.send(result._v);
//});

//--------------------------------------------------

///////////////////////////////
//точка монтирования корень сайта
app.get('/1', (req, res) => {
	res.json({
		hello: 'JS World',
	});
});
///////////////////////////////

