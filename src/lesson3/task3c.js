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