var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'sgovindan53',
    database: 'sgovindan53',
    host: 'db.imad.hasura-app.io',
    port: 5432,
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles = {
'article-one': {           //see remarks at line 89
    title: 'Article One | Suthan Govindan',
    heading: 'Article One',
    date: 'Sep 5, 2016',
    content: `<p>
                    This is the content for my first article. This is the content for my first article.
                    This is the content for my first article. This is the content for my first article.
                    This is the content for my first article. This is the content for my first article.
               </p>
               <p>
                    This is the content for my first article. This is the content for my first article.
                    This is the content for my first article. This is the content for my first article.
                    This is the content for my first article. This is the content for my first article.
               </p>
               <p>
                    This is the content for my first article. This is the content for my first article.
                    This is the content for my first article. This is the content for my first article.
                    This is the content for my first article. This is the content for my first article.
               </p>`
},
'article-two': {                      //see remarks at line 89
    title: 'Article Two | Suthan Govindan',
    heading:'Article Two',
    date: 'Sep 10, 2016',
        content:  `<p>
                        This is the content for my second article. 
                  </p>`
},
'article-three': {                      //see remarks at line 89
    title: 'Article Three | Suthan Govindan',
    heading: 'Article Three',
    date: 'Sep 15, 2016',
        content:  `<p>
                        This is the content for my third article. 
                  </p>`
},
};

function createTemplate (data) {
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate =  `<html>
    <head>
        
        <title>
            $(title)
        </title>
        <meta name = "viewport" content="width-device-width, initial-scale-1" />
        <link href="/ui/style.css" rel="stylesheet" />
    </head>
        <body>
            <div class "container">
            <div>
                <a href = "/">Home</a>
            </div>
            <hr>
            <h3>
                $(heading)
            </h3>
            <div>
                $(date.toDateString())
            </div>
            <div>
               $(content)
            </div>
            </div>
        </body>
</html>`
;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


function hash(input, salt) {
    // how to create a hash
    //crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)

    var hashed = crypto.pbkdf2Sync(input,salt,10000, 512, 'sha512');
   // return hashed.toString('hex');
   return ['pbkdf2', '10000', salt, hashed.toString('hex')].join($);
}
app.get('/hash/:input', function (req, res) {
   // var hashedString = hash(req,params,input, salt);
    var hashedString = hash(req,params,input, 'this-is-some-random-string');
    res.send(hashedString);
});

//app.get('/create-user', function(req, res) {
  app.post('/create-user', function(req, res) {
    // takes the username and password and creates an entry in the user table
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(128).toString('hex');
    var dbString = hash(password, salt);
    pool.query('INSERT INTO "user" (username, password) VALUES ($1, $2)' [username,dbstring] function (err, result) {
     if(err) { 
       res.status(500).send(err.toString());
   }
   else {
      res.send('User successfully created: ' +username); 
   }   
    });
    });
    
 app.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], function (err, result) {
     if(err) { 
       res.status(500).send(err.toString());
   } else {
       if(result.rows.length===0) {
           res.send(403).send('username/password is invalid');
       } else {
           //Match the password
           var dbstring = result.rows[0].password;
           var salt = dbstring.split($)[2];
           var hashedPassword = hash(password, salt); //Creating a hash based on the password submitted and the original salt
           if (hashedPassword = dbstring) {
               res.send("credentials correct");
               
       // set a session. Before that, let's actually implement the login on the UI (i.e. on th eapp page). So go to the index.html page
               
           } else {
            res.send(403).send('username/password is invalid');   
           }
       }
      
   }   
    });  
 });

var pool = new Pool(config);
app.get('/test-db', function (req, res) {
  //make a select request
  // return a response withtht eresults
  pool.query('SELECT * FROM test', function (err, result){
   if(err) { 
       res.status(500).send(err.toString());
   }
   else {
      res.send(JSON.stringify(result.rows)); 
   }
  });
});



var counter = 0;
app.get('/counter', function (req, res) {
    counter = counter +1;
    res.send(counter.toString());
});

var names=[];
app.get('/submit-name', function(req, res) {
    //get the name from the request object
    var name = req.query.name; 
    
    names.push(name);
    //JSON - javascript object notation
    res.send(JSON.stringify(names)); 
});

app.get('/articles/:articleName', function (req, res) {
 
//  pool.query("SELECT * FROM article WHERE title=$1", [req.params.articleName], function(err,result) {  
// pool.query("SELECT * FROM article WHERE title ='"+req.params.articleName+"'", function (err, result) {
//pool.query("SELECT * FROM article WHERE title = "'article-one'"", function (err, result) {
 pool.query("SELECT * FROM article WHERE title ='+req.params.articleName+'", function (err, result) {
   if (err) {
       res.status(500).send(err.toString());
   } else {
       if (result.rows.length===0) {
           res.status(404).send('Article not found');
       } else {
           var articleData = result.rows[0];
           res.send(createTemplate(articleData));
       }
   }
});

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



var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
};
