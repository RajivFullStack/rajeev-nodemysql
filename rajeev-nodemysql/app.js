
/**
 * Module dependencies.
 */

var express = require('express');
 var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var fs = require('fs');
var app = express();
var contacts = require('./Dao/contactDao.js');

 
// all environments
app.set('port', process.env.PORT || 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(app.router);
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function (req, res) {
    contacts.contactDao.getAllContacts(function (data) {
        
        res.send(data);
    }
    );
});
app.get('/contactlist/:id', function (req, res) {
    var id = req.params.id;
   
    contacts.contactDao.readContact(id,function (data) {
        res.send(data);
        console.log(data);
    }
    );
});
app.put('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    console.log(id);
    contacts.contactDao.updateContact(req.body, id, function (data) {
        console.log('ok');
        res.send(data);
    }
    );
});

app.post('/contactlist', function (req, res) {
    contacts.contactDao.createContact(req.body, function (data) {    
        console.log('ok');
        res.send(data);
    }
    );
});
app.delete('/contactlist/:id', function (req, res) {
    var id = req.params.id;
    contacts.contactDao.deleteContact(id, function (data) {
        console.log('ok');
        res.send(data);
    }
    );
});


// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/about', routes.about);
//app.get('/contact', routes.contact);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
