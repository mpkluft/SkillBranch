import Pet from './models/pets';
import User from './models/users';

export default async function saveDataInDb(data) {
  try {
    const user  = new User(data.user);
    await user.save();

    return {
      user,
    }
  } catch(err) {
    console.log('eror', err);
    throw err;
  }
}


//export default async function saveDataInDb(data) {
//  try {
//    const user  = new User(data.user);
//    await user.save();
//    const promises = data.pets.map((pet) => {
//      const petData = Object.assign({}, pet, {
//        owner: user._id // eslint disable line
//      });
//      return (new Pet(petData)).save();
//    });
//    console.log('succes');
//    return {
//      user,
//      pets: await Promise.all(promises),
//    }
//  } catch(err) {
//    console.log('eror', err);
//    throw err;
//  }
//}