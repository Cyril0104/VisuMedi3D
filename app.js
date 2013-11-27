
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var patient = require('./routes/patient');
var http = require('http');
var path = require('path');
var fs = require('fs');
var socket_io = require('socket.io');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, 'public/temp') }));
app.use(express.cookieParser('your secret here'));
app.use(express.favicon());
app.use(express.json());
app.use(express.methodOverride());
app.use(express.session());
app.use(express.urlencoded());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Routes
app.get('/', routes.index);
app.post('/file-upload', patient.upload);
app.get('/viewer', patient.viewer);

// HTTP Server
var server = http.createServer(app);

// Socket IO
var io = socket_io.listen(server);
io.sockets.on('connection', function(socket){
    console.log('A client is connected');
});

io.sockets.on('connection', patient.send_pixel_data);

// Listen
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

