//внешние библиотеки
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import bodyParser from 'body-parser';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';

//--------------------------------------------------
//подключение express и использование CORS
const app = express();
//app.use(bodyParser.json());
app.use(cors());

//секрет для jsonwebtoken
const secret = 'shhhhhhared-secret';


app.get('/token', (req, res) => {
	//данные юзера
	const data = {
		user: 'komar',
		name: 'Alex Komar',
	};
	//jwt шифрует data с помощью secret
return res.json(jwt.sign(data, secret));
});

//midleware expressJwt парсит secret
app.get('/protected', expressJwt({secret}), (req, res) => {
	return res.json(req.user);
});


app.get('/', (req, res) => {
	res.json({
		hello: 'JS World',
	});
});

//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
	console.log('Your app listening on port 3000');
});

