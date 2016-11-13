export default (req, res, next) => {
  if(req.headers.user === 'admin') {
    return next();
  } else {
    return next('error acces');
  }
}