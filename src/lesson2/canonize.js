app.get('/lesson2canonize', (req, res) => {
  res.send(
    canonize(req.query.username),
  );
});

function canonize(string) {
  let userName = string;
  let reg = new RegExp('@?(https?:)?(\/\/)?(([0-9\w-]*)[^\/]*\/)?@?([A-Za-z0-9._]*)');
  return '@' + userName.match(reg)[5];
}