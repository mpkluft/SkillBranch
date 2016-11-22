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
	let reg = /\?(color)=/;
	let reg2 = /[abcdef0-9]{3,6}/;
	let reg3 = /#([abcdef0-9]{3,6})/;
	let reg4 = /^(rgb)?\(?([01]?\d\d?|2[0-4]\d|25[0-5])(\W+)([01]?\d\d?|2[0-4]\d|25[0-5])\W+(([01]?\d\d?|2[0-4]\d|25[0-5])\)?)$/;


	let color = '';

if(reg.test(url)) {
	console.log('есть запрос ?color');

	color = decodeURI(req.query.color.toLowerCase().trim());

	console.log(`нужно валидировать ${color}`);

	if(reg3.test(color)) {
		color = color.replace(reg3, (str, p1) => {
			console.log(`совпадение reg3 color = ${color}`);
			return p1;
		});
	}
	//console.log(color);
	

		if(!reg2.test(color) || !reg4.test(color)) {

		console.log(`значение ${color}  не прошло валидацию`);

		result = false;
		} else {

			console.log(`значение ${color}  прошло 1-ую валидацию`);

			switch(color.length) {
				case 3: {
					color = checkStr(color);
					if(color.length >3) {
						console.log(`значение ${color} имело 3 символа`);
						result = true;
					}
					break;
				}
				case 6: {
					console.log('6 simbols');
					if(/[abcdef0-9]{6}/.test(color)) {
						console.log(`значение ${color} прошло тест /[abcdef0-9]{6}/`);
						console.log(color);
						result = true;
					}
					break;
				}
				default: {
					if(reg4.test(color)) {
						result = true;
						console.log(`значение ${color} прошло тест в дефолте`);
					} else {
						console.log(`в дефолте не прошел тест ${color} `);
						result = false;
					}
					
					
				}
			}
		}

	}
	//res.send(result);
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

/*

/task2d/?color=aaafff
/task2d/?color=000fff
/task2d/?color=ABCDEF
/task2d/?color=1A2B3C
/task2d/?color=000000
/task2d/?color=fff
/task2d/?color=abc
/task2d/?color=000
/task2d/?color=%20abcdef
/task2d/?color=-123456
/task2d/?color=00
/task2d/?color=
/task2d/?color=bcdefg
/task2d/?color=abcdeff
/task2d/?color=0bcdeff
/task2d/?colour=abcdef
/task2d/?color=%23ababab
/task2d/?color=rgb(0, 255, 64)


*/