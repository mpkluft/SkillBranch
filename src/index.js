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
//Урок 2 Перевести полное `Имя Отчество Фамилия` в `Фамилия И. О.`
//import { showPokemons } from './lesson2/fio.js';
//?fullname=Владимир Владимирович Путин

app.get('/fio', (req, res) => {
	let result = chekFio(req.query.fullname);
	console.log(result);
	res.send(result);
});

function chekFio(queryFio){
	let reg = /([\wа-яА-ЯёЁó]+)?\s?([\wа-яА-ЯёЁó]+)?\s?([\wа-яА-ЯёЁó]+)?\s?([\wа-яА-ЯёЁó]+)?\s?/i;
	let regName = /./;
	let name = '';
	let sirname = '';
	let strResult = 'Invalid fullname';
	//let fio = queryFio.replace(reg, '$3. $1. $2.');

	if(!queryFio || queryFio.search(/\d|\_|\//) != -1) {
		return strResult;
	}
	let fio = queryFio.replace(reg, (str, p1, p2, p3, p4) => {
		if(p4 == undefined){
			if(p3 == undefined) {
				if(p2 == undefined) {
					strResult = p1;
					console.log(strResult);
				} else {
					name = p1.match(/./);
					strResult = p2 + ' ' + name[0] + '.';
					console.log(strResult);
				}
			} else {
				name = p1.match(/./);
				sirname = p2.match(/./);
				strResult = p3 + ' ' + name[0] + '. ' + sirname[0] + '.';
				console.log(strResult);
			}
			//p1 ? name = p1.match(/./) : name = 'undefind';
			//let name = p1.match(/./) || 0;
			//p2 ? sirname = p2.match(/./) : sirname = 'undefind';
			//let sirname = p2.match(/./) || 0;
			//strResult = p3 + ' ' + name[0] + '. ' + sirname[0] + '.';
			//console.log(strResult);
			//console.log(str, name[0], sirname[0], p3, p4);
		} else {
			console.log(strResult);
		}
	});

	return strResult;
}
/*
var fioArray = ['Steven Paul Jobs',
								'Илья Валентинович Сегалович',
								'Tinna Gunnlaugsdóttir',
								'Four word full name',
								'Putin'
								];


function chekFio(queryFio){
	let reg = /([\wа-яА-ЯёЁ]+)?\s?([\wа-яА-ЯёЁ]+)?\s?([\wа-яА-ЯёЁ]+)?\s?([\wа-яА-ЯёЁ]+)?\s?/;

	let fio = queryFio.match(reg);
	console.log(fio);

	fioArray.forEach((fio) => {
		let world = fio.match(reg1);
		console.log(world[1]);
	});


}
*/




/*
?fullname=Илья Валентинович Сегалович
Сегалович И. В.

?fullname=Tinna Gunnlaugsdóttir
Gunnlaugsdóttir T.

?fullname=Four word full name
Invalid fullname

?fullname=Putin
Putin
*/
//--------------------------------------------------


///////////////////////////////
//точка монтирования корень сайта
app.get('/1', (req, res) => {
	res.json({
		hello: 'JS World',
	});
});
///////////////////////////////

