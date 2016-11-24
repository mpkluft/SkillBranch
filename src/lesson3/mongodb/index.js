//внешние библиотеки
import express from 'express';
import cors from 'cors';
//import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
//import _ from 'lodash';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import saveDataInDb from './saveDataInDb'
import Pet from './models/Pet';
import User from './models/User';
import isAdmin from './middlewares/isAdmin';

mongoose.Promise = Promise;
mongoose.connect('mongodb://publicdb.mgbeta.ru/komar_skb3');
//--------------------------------------------------
//подключение expree и использование CORS
const app = express();
app.use(bodyParser.json());
app.use(cors());
//app.use(isAdmin);

app.get('/clear', isAdmin, async (req, res) => {
  await User.remove({});
  await Pet.remove({});
  return res.send('OK');
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

app.get('/pets', async (req, res) => {
  const pets = await Pet.find().populate('owner');
  return res.json(pets);
});

app.post('/data', async (req, res) => {
    const data = req.body;
    if(!data.user) {
      return res.status(400).send('user required');
    }
    if(!data.pets) {
      data.pets = [];
    }

    const user = await User.findOne({
      name: data.user.name,
    });

    if (user) return res.status(400).send(`${user.name} is exist`); 

    try{
      const result = await saveDataInDb(data);
      return res.json(result);
    } catch (err) {
      return res.status(500).json(err);
    }

});



//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
  console.log('Your app listening on port 3000');
});

