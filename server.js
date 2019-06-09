var path = require('path')
var express = require('express')
var app = express();
var port = process.env.port || 3000
app.use(express.static(path.join(__dirname, 'dist')))
app.get('/', function(req, res, next) {
    req.url = 'index.html';
    next()
})

app.listen(port, function() {
console.log(`server is running at ${port}`)
});