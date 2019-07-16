const http = require('http');
const express = require('express');
const app = express();
const server = http.Server(app);

app.use(express.static('./dist'));

const PORT = process.env.PORT || 3004;

app.get('/', function (req, res) {
    res.send('index.html');
});

server.listen(PORT, function () {
    console.log('listening on *:' + PORT);
});
