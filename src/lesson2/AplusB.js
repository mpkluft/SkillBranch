//Урок 2 задача A+B
//import taskAB from './lesson2/AplusB.js';
//
//app.get('/lesson2AplusB', (req, res) => {
//  taskAB(req.query.a, req.query.b);
//  let result = taskAB(req.query.a, req.query.b);
//  res.json({result:result.toString(),
//            task: 'добавить get запрос a=9 b = 7'
//  });
//});
export default function taskAB(queryA, queryB, res) {
  let a = queryA;
  let b = queryB;
	
  let sum = (+queryA || 0) + (+queryB || 0);
  return sum;
}
