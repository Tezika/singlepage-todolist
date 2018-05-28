var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/todo', todoRoutes);

app.get('/', function(req, res) {
    res.send("Hello from index.js!");
});

app.listen(port, process.env.IP, function() {
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
});