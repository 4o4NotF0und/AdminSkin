
var { MongoClient } = require('mongodb');
var async = require('async');
var url = require('url');
var md5 = require('md5');

var mongoUrl = 'mongodb://localhost:27017/ning';




module.exports = {
    defaultRoute: ( req, res, next ) => {
        res.render('loginAction')
    },
    adminLOginAction: (req, res, next ) => {
        var { name, pwd } = req.body;
        pwd = md5( pwd );
        async.waterfall([
            ( cb ) => {
               MongoClient.connect( mongoUrl, (err, db) =>{
                    if (err) throw err;
                    cb( null, db);
                }) 
            },
            ( db, cb ) => {
                db.collection('admin').find( {name,pwd}, {}).toArray( (err, data) => {
                    if (err) throw err;
                    cb( null, data );
                    db.close();
                })
            }
            
        ],(err, result ) => {
         if (err) throw err;
         result.length ? res.cookie("loginState",1) : res.cookie("loginState",0)
            res.redirect('/');
        })
    },
    logout: (req, res, next) => {
        res.cookie("loginState",0);
        res.redirect('/');
    }
}
