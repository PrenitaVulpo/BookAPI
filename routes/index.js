module.exports = function(app){
    app.get('/', function(req, res){
        var queryparameters = req.query;
        console.log(queryparameters);
        res.render("index");

    });


};