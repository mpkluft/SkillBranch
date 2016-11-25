export default (req, res, next) => {
  const pcUrl = 'https://gist.githubusercontent.com/isuvorov/55f38b82ce263836dadc0503845db4da/raw/pets.json';
  fetch(pcUrl)
   .then( async (res) => {
    req.userData = await res.json();
    return next();
  })
  .catch( (err) => {
    console.log('Чтото пошло не так:', err);
    return next('error acces');
  });
};
