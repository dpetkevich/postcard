
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , pdf = require('pdfcrowd');
var app = express();
var client = new pdf.Pdfcrowd('danielpetkevich', '92d12d5208eaa53ffaefc48c776fce79');


app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

//figure out directory naming stuff

app.post('/generate_pdf', function(req, res){ 

  console.log('fun');
   console.log(req.body.html.replace(/(\r\n|\n|\r)/gm,""));
//client.convertHtml(req.body.html.replace(/(\r\n|\n|\r)/gm,""), pdf.saveToFile(__dirname + '/public/pdfs/googlecom.pdf'));
res.download(__dirname + '/public/pdfs/googlecom.pdf','report.pdf');
});




app.get('/', function(req, res){
  res.render('index', { title: 'Express' });
});

app.post('/', function (req, res) {
       console.log(JSON.stringify(req.files));
        var serverPath =  '/images/' + req.files.userPhoto.name;
  console.log("name is " + req.files.userPhoto.name);
  console.log("server path " + __dirname +'/public' + serverPath);
   
   require('fs').rename(req.files.userPhoto.path,(__dirname + '/public' + serverPath),

    res.send(
    {
      path: serverPath

    })
   );
   /* require('fs').rename(
  req.files.userPhoto.path,
  (__dirname +'/public' + serverPath),
  function(error) {
    console.log("new path" +  req.files.userPhoto.path )
            if(error) {
    res.send({
                    error: 'Ah crap! Something bad happened'
    });
                return;
                console.log('didnt work');
            }
 
            res.send({
    path: serverPath
   
            });
             console.log('worked');
  }
    );
*/
});
    //var photo_path=req.files.pic.path;
    //req.files.pic.path=(__dirname+'/public/images/photo1jpg');


 

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
