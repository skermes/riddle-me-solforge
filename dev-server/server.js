var fs = require('fs');
var express = require('express');

var puzzlesDev = express();
puzzlesDev.use(express.static('public'));
puzzlesDev.get(/.*/, function(req, res) {
  fs.readFile('public/index.html', function(err, data) {
    res.end(data);
  });
});

puzzlesDev.listen(3000);
