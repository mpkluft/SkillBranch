import express from 'express';
import cors from 'cors';
import hslToHex from 'hsl-to-hex'

function rgbToHex(r, g, b) {
  if ( r > 255 || g > 255 || b > 255 )
    return 'Invalid color'
  console.log(r, g,b)
  if ( isNaN(r) || isNaN(g) || isNaN(b) )
    return 'Invalid color'
  return  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

}

function rgb( str ) {
  var color = str.split(', ');
  if ( color.length !== 3 )
    return 'Invalid color'
  return rgbToHex( Number(color[0]), Number(color[1]), Number(color[2]));
}

function hls( str ) {
  var color = str.split(',%20');
  if ( color.length !== 3 )
    return 'Invalid color';
  if ( color[1].charAt(color[1].length - 1) != '%' || color[2].charAt(color[2].length - 1) != '%')
    return 'Invalid color';
  if ( Number(color[0]) > 359 || Number(color[1].slice(0, color[1].length - 1 )) > 100 ||
    Number(color[2].slice(0, color[2].length - 1 )) > 100 ||
    Number(color[0]) < 0 || Number(color[1].slice(0, color[1].length - 1 )) < 0 ||
    Number(color[2].slice(0, color[2].length - 1 )) < 0 )
      return 'Invalid color';
  return hslToHex( Number(color[0]), Number(color[1].slice(0, color[1].length - 1)),
    Number(color[2].slice(0, color[2].length - 1)) )
}

function checkColor(color) {

  color = color.trim();
  if ( color.slice(0, 3) == 'rgb' ) {
    return (rgb(color.slice(4, color.length - 1)));
  }
  console.log(color);
  if ( color.slice(0, 3) == 'hsl' ) {
    return (hls(color.slice(4, color.length - 1)));
  }

  if ( color[0] == '#' )
    color = color.slice(1, color.length)
  var matchColor = color.match(/(([0-9a-fA-F]{3})?[0-9a-fA-F]{3})/);
  if ( !matchColor )
    return 'Invalid color';

  matchColor = matchColor.slice(0, 1).toString();
  if ( matchColor.length !== 6 && matchColor.length !== 3 )
    return 'Invalid color';

  if ( color.length !== matchColor.length )
    return 'Invalid color';
  var matchColor = matchColor.replace( /A/g, "a" ).replace( /B/g, "b" ).replace( /C/g, "c" ).
     replace( /D/g, "d" ).replace( /E/g, "e" ).replace( /F/g, "f" );
  if ( matchColor.length == 3 )
    return ( '#' + matchColor[0] + matchColor[0] + matchColor[1] +
      matchColor[1] + matchColor[2] + matchColor[2] );
  else
    return '#' + matchColor
}

const app = express();
app.use(cors());
app.get('/', (req, res) => {
  res.json({
    hello: 'JS World',
  });
});

app.get('/task2d', (req, res) => {
	console.log(req.url);
  if ( req.url.search(/\?color=/) === -1 )
    res.send('Invalid color');
  const resultColor = checkColor(req.query.color);
  res.send(resultColor);
})

app.listen(3000, () => {
  console.log('Your app listening on port 3000!');
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


/task2d/?color=%23rgb(128,%20128,%20128)
/task2d/?color=rgb(128,%20128,%20128,%20128)
/task2d/?color=hsl(195,%20100%,%2050%)
/task2d/?color=hsl(0,%2065%,%2050%)
/task2d/?color=hsl(0,%200%,%200%)
/task2d/?color=hsl(0,%20101%,%200%)
/task2d/?color=hsl(0,%20-100%,%200%)
/task2d/?color=hsl(0,%20100,%200%)
/task2d/?color=hsl(0,%200,%200)
/task2d/?color=0
/task2d/?color=xyz(1,%201,%201)

/task2d/?color=aaafff
aaafff
/task2d/?color=000fff
000fff
/task2d/?color=ABCDEF
ABCDEF
/task2d/?color=1A2B3C
1A2B3C
/task2d/?color=000000
000000
/task2d/?color=fff
fff
/task2d/?color=abc
abc
/task2d/?color=000
000
/task2d/?color=%20abcdef
abcdef
/task2d/?color=%20abcdef
abcdef
/task2d/?color=-123456
-123456
/task2d/?color=00
00
/task2d/?color=

/task2d/?color=bcdefg
bcdefg
/task2d/?color=abcdeff
abcdeff
/task2d/?color=0bcdeff
0bcdeff
/task2d/?colour=abcdef
TypeError: Cannot read property 'trim' of undefined
    at checkColor (/var/www/html/skillBranch/src/index.js:39:11)
    at /var/www/html/skillBranch/src/index.js:81:23
    at Layer.handle [as handle_request] (/var/www/html/skillBranch/node_modules/express/lib/router/layer.js:95:5)
    at next (/var/www/html/skillBranch/node_modules/express/lib/router/route.js:131:13)
    at Route.dispatch (/var/www/html/skillBranch/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/var/www/html/skillBranch/node_modules/express/lib/router/layer.js:95:5)
    at /var/www/html/skillBranch/node_modules/express/lib/router/index.js:277:22
    at Function.process_params (/var/www/html/skillBranch/node_modules/express/lib/router/index.js:330:12)
    at next (/var/www/html/skillBranch/node_modules/express/lib/router/index.js:271:10)
    at cors (/var/www/html/skillBranch/node_modules/cors/lib/index.js:179:7)
/task2d/?colour=abcd
TypeError: Cannot read property 'trim' of undefined
    at checkColor (/var/www/html/skillBranch/src/index.js:39:11)
    at /var/www/html/skillBranch/src/index.js:81:23
    at Layer.handle [as handle_request] (/var/www/html/skillBranch/node_modules/express/lib/router/layer.js:95:5)
    at next (/var/www/html/skillBranch/node_modules/express/lib/router/route.js:131:13)
    at Route.dispatch (/var/www/html/skillBranch/node_modules/express/lib/router/route.js:112:3)
    at Layer.handle [as handle_request] (/var/www/html/skillBranch/node_modules/express/lib/router/layer.js:95:5)
    at /var/www/html/skillBranch/node_modules/express/lib/router/index.js:277:22
    at Function.process_params (/var/www/html/skillBranch/node_modules/express/lib/router/index.js:330:12)
    at next (/var/www/html/skillBranch/node_modules/express/lib/router/index.js:271:10)
    at cors (/var/www/html/skillBranch/node_modules/cors/lib/index.js:179:7)
/task2d/?color=%23ababab
#ababab
/task2d/?color=%23aba
#aba
/task2d/?color=%23232323
#232323
/task2d/?color=%23%23ababab
##ababab
/task2d/?color=%23abcd
#abcd
/task2d/?color=rgb(0,%20255,%2064)
0 255 64
/task2d/?color=rgb(255,%200,%200)
255 0 0
/task2d/?color=rgb(128,%20128,%20128)
128 128 128
/task2d/?color=%20%20%20rgb(%20%200,%20255%20%20,%2064%20%20)
0 255 64
/task2d/?color=rgb(128,%20128,%20257)
/task2d/?color=rgb(128,%20128,%20256)
/task2d/?color=rgb(128,%20128)
/task2d/?color=%23rgb(128,%20128,%20128)
#rgb(128, 128, 128)
/task2d/?color=rgb(128,%20128,%20128,%20128)
/task2d/?color=hsl(195,%20100%,%2050%)
hsl(195,%20100%,%2050%)
/task2d/?color=hsl(0,%2065%,%2050%)
hsl(0,%2065%,%2050%)
/task2d/?color=hsl(0,%200%,%200%)
hsl(0,%200%,%200%)
/task2d/?color=hsl(0,%20101%,%200%)
hsl(0,%20101%,%200%)
/task2d/?color=hsl(0,%20-100%,%200%)
hsl(0,%20-100%,%200%)
/task2d/?color=hsl(0,%20100,%200%)
hsl(0,%20100,%200%)
/task2d/?color=hsl(0,%200,%200)
hsl(0, 0, 0)
/task2d/?color=0
0
/task2d/?color=xyz(1,%201,%201)

*/