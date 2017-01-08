'use strict';

var express = require('express');
var app = express();
var router = express.Router();

// Server configuration
app.use(express.static(__dirname));

app.get('*', function (req, res) {
    res.sendFile('index.html', { root: __dirname });
});

// Start server
app.listen(process.env.PORT || 5000);
console.log('App started on port 5000');
