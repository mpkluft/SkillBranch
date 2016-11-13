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



app.get('/task3a', (req, res) => {
	res.json(pc);
});

app.get('/task3a/board', (req, res) => {
	res.json(pc.board);
});

app.get('/task3a/ram', (req, res) => {
	res.json(pc.ram);
});

app.get('/task3a/os', (req, res) => {
	res.json(pc.os);
});

app.get('/task3a/hdd', (req, res) => {
	res.json(pc.hdd);
});

app.get('/task3a/board/vendor', (req, res) => {
	res.json(pc.board.vendor);
});

app.get('/task3a/board/model', (req, res) => {
	res.json(pc.board.model);
});

app.get('/task3a/board/cpu', (req, res) => {
	res.json(pc.board.cpu);
});

app.get('/task3a/board/image', (req, res) => {
	res.json(pc.board.image);
});

app.get('/task3a/board/video', (req, res) => {
	res.json(pc.board.video);
});	

app.get('/task3a/ram/vendor', (req, res) => {
	res.json(pc.ram.vendor);
});	

app.get('/task3a/ram/volume', (req, res) => {
	res.json(pc.ram.volume);
});

app.get('/task3a/ram/pins', (req, res) => {
	res.json(pc.ram.pins);
});

app.get('/task3a/volumes', (req, res) => {

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
	//console.log(hdd[cur]);
}

	res.json(hdd);
});

app.get('/task3a/floppy', (req, res) => {
	res.json(pc.floppy);
});

app.get('/task3a/hdd/0', (req, res) => {
	res.json(pc.hdd[0]);
});

app.get('/task3a/hdd/0/vendor', (req, res) => {
	res.json(pc.hdd[0].vendor);
});

app.get('/task3a/hdd/0/size', (req, res) => {
	res.json(pc.hdd[0].size);
});

app.get('/task3a/hdd/0/volume', (req, res) => {
	res.json(pc.hdd[0].volume);
});

app.get('/task3a/hdd/1', (req, res) => {
	res.json(pc.hdd[1]);
});

app.get('/task3a/hdd/1/vendor', (req, res) => {
	res.json(pc.hdd[1].vendor);
});

app.get('/task3a/hdd/1/size', (req, res) => {
	res.json(pc.hdd[1].size);
});

app.get('/task3a/hdd/1/volume', (req, res) => {
	res.json(pc.hdd[1].volume);
});

app.get('/task3a/hdd/2', (req, res) => {
	res.json(pc.hdd[2]);
});

app.get('/task3a/hdd/2/vendor', (req, res) => {
	res.json(pc.hdd[2].vendor);
});

app.get('/task3a/hdd/2/size', (req, res) => {
	res.json(pc.hdd[2].size);
});

app.get('/task3a/hdd/2/volume', (req, res) => {
	res.json(pc.hdd[2].volume);
});

app.get('/task3a/hdd/[0-9]+', async (req, res) => {

	let originalUrl = await req.originalUrl;
	let reg = /\/task3a\/hdd\/([0-9]+)/;

	if(!pc.hdd[originalUrl.match(reg)[1]]) {
		return res.status(404).send('Not Found');
	}

});

app.get('/task3a/[A-Za-z0-9/]+', async (req, res) => {

	let originalUrl = await req.originalUrl;
	let reg = /\/task3a\/([A-Za-z0-9]+)/;

console.log(originalUrl.match(reg)[1]);

if(!pc[originalUrl.match(reg)[1]]) {
	return res.status(404).send('Not Found');
}

});


/*
{
   "board":{
      "vendor":"IBM",
      "model":"IBM-PC S-100",
      "cpu":{
         "model":"80286",
         "hz":12000
      },
      "image":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/Picture%20of%2080286%20V2%20BoardJPG.jpg",
      "video":"http://www.s100computers.com/My%20System%20Pages/80286%20Board/80286-Demo3.mp4"
   },
   "ram":{
      "vendor":"CTS",
      "volume":1048576,
      "pins":30
   },
   "os":"MS-DOS 1.25",
   "floppy":0,
   "hdd":[
      {
         "vendor":"Samsung",
         "size":33554432,
         "volume":"C:"
      },
      {
         "vendor":"Maxtor",
         "size":16777216,
         "volume":"D:"
      },
      {
         "vendor":"Maxtor",
         "size":8388608,
         "volume":"C:"
      }
   ],
   "monitor":null,
   "length":42,
   "height":21,
   "width":54
}
*/
//{
//  "C:":"41943040B",
//  "D:":"16777216B"
//}
//--------------------------------------------------
//слушаем порт 3000
app.listen(3000, () => {
	console.log('Your app listening on port 3000');
});

