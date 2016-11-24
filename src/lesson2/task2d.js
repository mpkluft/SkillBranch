//Урок 2 Перевести полное `Имя Отчество Фамилия` в `Фамилия И. О.`
//import { chekFio } from './lesson2/fio.js';
//
//app.get('/fio', (req, res) => {
//  let result = chekFio(req.query.fullname);
//  res.send(result._v);
//});


async function chekFio(queryFio){
  let reg = /\s{0,100}([\wа-яА-ЯёЁó']+)?\s{0,100}([\wа-яА-ЯёЁó']+)?\s{0,100}([\wа-яА-ЯёЁó']+)?\s{0,100}([\wа-яА-ЯёЁó]+)?/i;
  let regName = /./;
  let name = '';
  let sirname = '';
  let strResult = 'Invalid fullname';
  let queryFio1 = queryFio;
  let regualize = [];
  console.log('Приходит из сервера- ' + queryFio1);
  //let queryFio1 = await Promise.all(queryFio2);
  //let fio = queryFio.replace(reg, '$3. $1. $2.');

  if(!queryFio1 || queryFio1.search(/\d|\_|\//) != -1) {
    return strResult;
  }
  let fio = queryFio1.replace(reg, (str, p1, p2, p3, p4) => {
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

        regualize = regularizeLetter(p3, name, sirname);

        strResult = regualize[0] + ' ' + regualize[1] + '. ' + regualize[2] + '.';
        console.log(strResult);

      }
    } else {
      console.log(strResult);
    }
  });

  return strResult;
}


function regularizeLetter(p3, name, sirname) {

  let lastName =  p3.charAt(0).toUpperCase() + p3.substr(1).toLowerCase();
  let Name =  name.toString().toUpperCase();
  let sirName =  sirname.toString().toUpperCase();

  return [lastName, Name, sirName];
}

export { chekFio };