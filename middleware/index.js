module.exports = function (app, express) {

    const bodyParser = require('body-parser');
    const routes = require('../routes');
    const errorHandler = require('./error.handler')(app);


    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        next();
    });


    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.use('/api/', routes);
    app.use(errorHandler);
}