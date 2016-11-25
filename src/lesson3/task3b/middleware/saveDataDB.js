import _ from 'lodash';
import Pet from '../models/pets';
import User from '../models/users';

export default (req, res, next) => {
  let user;
  let pet;

  _.forEach(req.userData.users, (userData) => {
    user = new User(userData);
    user.save()
      .then( () => {
        console.log('succes');
      })
      .catch( (err) => {
        console.log('error', error);
        next('Ошибка записи в базу');
      })
  });
  _.forEach(req.userData.pets, (petData) => {
    pet = new Pet(petData);
    pet.save()
      .then( () => {
        console.log('succes');
      })
      .catch( (err) => {
        console.log('error', error);
        next('Ошибка записи в базу');
      })
  });
  next();
};