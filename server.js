var express = require('express');
var morgan = require('morgan');
var Pool=require('pg').Pool;
var path = require('path');

var config={

    user:'giraffesmruthi',
    database: 'giraffesmruthi',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password:process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool=new Pool(config);
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
          res.send(JSON.stringify(result.rows));
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

app.get('/articles/:articleName',function(req,res){
   //articleName==article-one
   var articleName=req.params.articleName;
   
   pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'",function(err,result){
       if(err)
       {
           res.status(500).send(err.toString()); 
      }
      else 
      {
          if (result.rows.length === 0){
          res.status(404).send('Article not found');
          }else{
              var articleData=result.rows[0];
               res.send(createTemplate(articles[articleName]));
          }
      }
   });
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
