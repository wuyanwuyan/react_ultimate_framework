process.env.NODE_ENV = "production";

var path = require('path');
var express = require('express');

var app = express();

app.use(express.static('dist'));

app.get('*', function (req, res, next) {
    const filename = path.resolve(__dirname, 'dist/index.html');
    res.sendFile(filename);
});

const port = 8087;
app.listen(port, function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Listening at http://localhost:${8087}`);
});


