//внешние библиотеки
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';
import bodyParser from 'body-parser';

//--------------------------------------------------
//подключение expree и использование CORS
const app = express();
app.use(bodyParser.json());
app.use(cors());

const pcUrl = 'https://gist.githubusercontent.com/isuvorov/ce6b8d87983611482aac89f6d7bc0037/raw/pc.json';

let pc = {};

fetch(pcUrl)
  .then(async (res) => {
    pc = await res.json();
    //console.log(pc);
  })
  .catch(err => {
    console.log('Чтото пошло не так:', err);
  });



	function checkUrl(obj, pole) {
		let res;
		console.log(obj.__proto__.hasOwnProperty(pole));

		if(!obj.hasOwnProperty(pole) || obj.__proto__.hasOwnProperty(pole)){
			res = undefined;
			console.log('я в checkUrl undefine');
		} else {
			res = obj[pole];
		}

		return res;
	}




app.get(/.*/, async (req, res) => {

	let resArr;
	let res1;

if(req.originalUrl == '/task3a/') {
	return res.json(pc);
} else if (req.originalUrl == '/task3a/volumes'){

	let hdd = {};

	pc.hdd.forEach((elements, index) => {

		if(hdd.hasOwnProperty(elements.volume)) {
			hdd[elements.volume] += elements.size;
		} else {
			hdd[elements.volume] = elements.size;
		}
	});

for(let cur in hdd) {
	hdd[cur] += 'B'
}

	res.json(hdd);

} else {

	let result = await req.originalUrl.split(/\//);
	let newarr = [];


	for(var cur in result) {
		
		if(result[cur] !== '') {
			console.log(typeof result[cur]);
			newarr.push(result[cur]);
		}
	}

	res1 = pc;

	if(newarr.length > 1) {
		for(let i = 1; i < newarr.length; i++) {
			res1 = checkUrl(res1, newarr[i]);

			console.log(`я тут ${i} раз`);
			if(res1 === undefined) {
				console.log(res1);
				return res.status(404).send('Not Found');
				break;
			} 
		}
	} else {
		return res.status(404).send('Not Found2');
	}
	
	res.json(res1);

}

});

//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
	console.log('Your app listening on port 3000');
});


