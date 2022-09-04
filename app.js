const app = require('express')();
const socket = require('socket.io'); //requires socket.io module
var PORT = process.env.PORT || 3000;
const server = app.listen(PORT); 
const io = socket(server);

let counter = true;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    // res.render('index.ejs');
});

io.on('connection', function (socket) {
    // change on
    socket.on('lightOn', function (callback) {
        counter=true;

        console.log(`Returning getCounter with counter ${counter}`);
        io.emit('counter', counter);
        callback(null, counter);
    });

    // change off
    socket.on('lightOff', function (callback) {
        counter=false;

        console.log(`Returning getCounter with counter ${counter}`);
        io.emit('counter', counter);
        callback(null, counter);
    });
});

 