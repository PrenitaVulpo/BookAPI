var app = require('./config/server.js');


//faz com que o express escute a porta informada, também recebe o callback
app.listen(process.env.PORT || 3000, function () {
    var porta = process.env.PORT;
    if (process.env.PORT == null){
        porta = 3000
    }
    console.log("Server up, listening on port %s", porta);
});