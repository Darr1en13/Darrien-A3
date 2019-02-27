const express = require('express');
const app = express();

// install session module first using 'npm install express-session'
let session = require('express-session'); 
app.use(session({ secret: 'happy jungle', 
                  resave: false, 
                  saveUninitialized: false, 
                  cookie: { maxAge: 60000 }}));
                  
app.get('/add',add);
app.get('/sort',sort);
app.get('/remove',remove);
app.get('/clear',clear);
app.get('/',udf);




var songs =[];


app.listen(process.env.PORT,  process.env.IP, startHandler());

function startHandler()
{
  console.log('Server listening on port ' + process.env.PORT);
  
}
//================================================================
//udf command
function udf(req,res)
{
  
   
   try
   {
    req.session.song = songs;
    var result ={'Songs':songs};
/*
    if(songs.length == 0)
    {
        throw Error("You need to enter data");
    }
  */

  res.writeHead(200, {'Content-Type': 'application/json'});    
  res.write(JSON.stringify(result));
   }
  catch (e)
  {
    res.write(JSON.stringify({'error' : e.message}));
  }
  res.end('');
}
//=================================================================
//adds the songs
function add(req,res)
{
 try{
if (req.query.song != undefined)  
     req.session.song = req.query.song;

if(req.session.pt == undefined)
    req.session.pt =0;

if(req.query.song == undefined)
    throw Error("Please enter a valid song");


 songs[req.session.pt] = req.session.song;

req.session.pt = req.session.pt +1;

 var result ={'Songs':songs};

res.writeHead(200, {'Content-Type': 'application/json'});    
res.write(JSON.stringify(result));
}
catch (e)
  {
    res.write(JSON.stringify({'error' : e.message}));
  }
  res.end('');
}
//=================================================================
//sorts the songs
function sort(req,res)
{
try
{
 
 if(songs.length == 0)
    {
        throw Error("there is no data to sort");
    }    

req.session.song = songs;
songs.sort();
var result ={'Songs':songs};
res.writeHead(200, {'Content-Type': 'application/json'});    
res.write(JSON.stringify(result));
}
catch (e)
  {
    res.write(JSON.stringify({'error' : e.message}));
  }
  res.end('');
}
//==================================================================
//removes a song
function remove(req,res)
{
    try{
    console.log(req.session.pt);
    req.session.song = songs;
    
    if(req.query.song == undefined)
    throw Error("Please enter a valid song");

var index = songs.indexOf(req.query.song);    
if (index !== -1) {
    songs.splice(index, 1);
    
req.session.pt = songs.length;

}
else
    throw Error(`That song ${req.query.song} is not in the array`);

    console.log(req.session.pt);

  var result ={'Songs':songs};
res.writeHead(200, {'Content-Type': 'application/json'});    
res.write(JSON.stringify(result));
}
catch (e)
  {
    res.write(JSON.stringify({'error' : e.message}));
  }
  res.end('');
    
}
//====================================================================
//clear session
function clear(req,res)
{
    try
    {
    req.session.song = songs;
    songs=[];
    var result ={'Songs':songs};
res.writeHead(200, {'Content-Type': 'application/json'});    
res.write(JSON.stringify(result));
}
catch (e)
  {
    res.write(JSON.stringify({'error' : e.message}));
  }
  res.end('');


}
