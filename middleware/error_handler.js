const createError = require('http-errors');
const Sequelize = require('sequelize');
const _ = require('lodash');

const errors = {
    404: new createError.NotFound(["User not found"]),
    401: new createError.Unauthorized(['You should login']),
    400: new createError.BadRequest(['No data']),
    500: new createError.InternalServerError(),
    406: new createError.NotAcceptable()
};

const sendHttpError = function(err, res){
    err.status ? res.status(err.status) : res.status(500);
    console.log(err);
    res.json(err);
};

function checkInstance(err){
    if (err instanceof createError.HttpError) return 'http';
    if (err instanceof Sequelize.ValidationError) return 'validation';
    if (err instanceof Sequelize.DatabaseError) return 'database_error';
    return 'unknown'

}

module.exports = function (app) {
    return function (err, req, res, next){
    console.log("hello from server errors");

        if (typeof err === 'number') {
            err = errors[err];
        }
        const errType = checkInstance(err);
        switch (errType){
            case 'http':
                sendHttpError(err, res);
                break;
            case 'validation':
                sendHttpError(createError.NotAcceptable(_.map(err.errors, 'message')), res);
                break;
            case 'database_error':
                sendHttpError(createError.NotAcceptable(['something went wrong with service']), res);
                break;
            default:
                if (app.get('env') === 'development') {
                    next(err);
                } else {
                    if (err){
                        sendHttpError(err, res);
                    } else sendHttpError(createError.ServiceUnavailable(['something went wrong with service']), res);
                }
                break;
        }
    }
};