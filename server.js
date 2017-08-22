var express = require('express');
var morgan = require('morgan');
var Pool=require('pg').Pool;
var path = require('path');

var config={

    user:'giraffesmruthi',
    database: 'giraffesmruthi',
    host: 'db.imad.hasura.io',
    port: '5432',
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var Pool=new Pool(config);
app.get('/test-db', function (req, res) {
  //make a select request
  //return a response with result
  pool.query('Select * from test',function(err,result){
      if(err)
      {
        res.status(500).send(err.toString()); 
      }
      else 
      {
          res.send(JSON.stringify(result));
      }
  });
});

var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

var names=[];
app.get('/submit-name',function(req,res){// URL:/submit-name?name=xxxxx
    //get the names from the request
    var name=req.query.name;
    
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
