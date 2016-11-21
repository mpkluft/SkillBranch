//внешние библиотеки
import express from 'express';
import cors from 'cors';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';
import _ from 'lodash';

//--------------------------------------------------
const app = express();
app.use(cors());


app.get('/*+/', (req, res) => {
	
	console.log(req.url);
	console.log(req.query);

	let result = false;
	let url = req.url;
	let reg2 = /\?(colour)=([abcdef0-9]+)/;

	if(url.match(reg2)[1] === 'color' || reg2.test(url)) {

		let color = url.match(reg2)[2].toLowerCase().trim();
		let reg = /[abcdef0-9]{3,6}/;

		if(!reg.test(color)) {
		result = false;
		} else {
			switch(color.length) {
				case 3: {
					console.log('3 simbols');
					color = checkStr(color);
					if(color.length >3) {
						result = true;
					}
					break;
				}
				case 6: {
					console.log('6 simbols');
					if(/[abcdef0-9]{6}/.test(color)) {
						result = true;
					}
					break;
				}
				default: {
					result = false;
					console.log('Invalid color'); 
				}
			}
		}
	} 

	result ? res.send(`#${color}`) : res.status('404').send('Invalid color');
	
});


	function checkStr(s) {
		let result = false;

		for(let i = 1; i < s.length; i++) {
			if(s[0] === s[i]) {
				result ++;
			}
		}
		if(result > 1) {
			s += s;
		} else {
			s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
			console.log('я тута');
		}
		return s;
	}




app.get('/', (req, res) => {
	res.json({
		hello: 'JS World',
	});
});

//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
	console.log('Your app listening on port 3000');
});

