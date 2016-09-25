var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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
    /head>
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
                $(date)
            </div>
            <div>
               $(content)
            </div>
            </div>
        </body>
</html>
`;
return htmlTemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get(':articleName', function (req, res) {
    // when we put the colon before teh articlename, it will do the matching an dconvert that into a variable
    // (this is part of the express package) so that articleNaem === article-one, etc
    //articles[articleName] == () content object for article one
    //object names at lines 9, 29, 37 are changed to match with article-one etc & put in quotes
    //to extract the articleName value, the following line is added, a functionality of 'express' framework
    var articleName = req.params.articleName;
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
