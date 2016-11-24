//внешние библиотеки
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const { Schema } = mongoose;


import Pet from './models/pets';
import User from './models/users';
import saveData from './saveData';


mongoose.Promise = Promise;
var db = mongoose.connect('mongodb://publicdb.mgbeta.ru/komar');
console.log(db.user);

//--------------------------------------------------
//подключение expree и использование CORS
const app = express();
app.use(bodyParser.json());
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';

let base = {};
let users = {};
let pets = {};


fetch(pcUrl)
  .then(async (res) => {
    base = await res.json();
    users  = base.users;
    pets = base.pets;

  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });

app.post('/data', async (req, res) => {
    const data = req.body;
  res.json(
		data
	);
//    if(!data.user) {
//      return res.status(400).send('user required');
//    }
//    if(!data.pets) {
//      data.pets = [];
//    }
//
 //   const user = await User.findOne({
//      name: data.user.name,
//    });
//
 //   if (user) return res.status(400).send(`${user.name} is exist`); 
//
 //   try{
//      const result = await saveDataInDb(data);
//      return res.json(result);
//    } catch (err) {
//      return res.status(500).json(err);
//    }

});



app.get('/task3b', (req, res) => {
	res.json({
		users,
		pets,
	});
});

//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
	console.log('Your app listening on port 3000');
});
