//внешние библиотеки
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
const { Schema } = mongoose;





const app = express();
app.use(bodyParser.json());
app.use(cors());



app.get('/task2x', (req, res) => {
  let result;

  console.log(req.query);
  console.log(req.url);

  switch(req.query.i){
    case '0': {
      result = '1';
      break;
    }
    case '1': {
      result = '18';
      break;
    }
    case '2': {
      result = '243';
      break;
    }
    case '3': {
      result = '3240';
      break;
    }
    case '4': {
      result = '43254';
      break;
    }
    case '5': {
      result = '577368';
      break;
    }
    case '6': {
      result = '7706988';
      break;
    }
    case '7': {
      result = '102876480';
      break;
    }
    case '8': {
      result = '1373243544';
      break;
    }
    case '9': {
      result = '18330699168';
      break;
    }
    case '10': {
      result = '244686773808';
      break;
    }
    case '11': {
      result = '3266193870720';
      break;
    }
    case '12': {
      result = '43598688377184';
      break;
    }
    case '13': {
      result = '581975750199168';
      break;
    }
    case '14': {
      result = '7768485393179328';
      break;
    } 
    case '15': {
      result = '103697388221736960';
      break;
    }
    case '16': {
      result = '1384201395738071424';
      break;
    }
    case '17': {
      result = '18476969736848122368';
      break;
    }   
    case '18': {
      result = '246639261965462754048';
      break;
    }   

  }

  

  res.send(result);

});




//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
  console.log('Your app listening on port 3000');
});

/*
Краткое описание задачи

Воссоздать черный ящик
Полное описание задачи

Blackbox - Черный ящик. На практике во время реального решения задач вам скорее всего придется столкнутся с решением задач связанных с черным ящиком.

    Чёрный я́щик — термин, используемый для обозначения системы, внутреннее устройство и механизм работы которой очень сложны, неизвестны или неважны в рамках данной задачи.

    «Метод чёрного ящика» — метод исследования таких систем, когда вместо свойств и взаимосвязей составных частей системы, изучается реакция системы, как целого, на изменяющиеся условия.

Черный ящик

Предположим, что есть сервис, на вход которому приходит целое число от 0 до 18, этот сервис производит какие-то расчеты, и в ответ возвращет другое число.

Сервис с закрытым кодом, аглоритм работы вы не знаете, вычисления производит долго.

Ваша задача сделать копию этого, сервиса.
Примеры

Пример 1

?i=0
-
1

Пример 2

?i=1
-
18


*/