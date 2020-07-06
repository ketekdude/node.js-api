'use strict';

var response = require('./res');
var connection = require('./conn');

exports.users = function(req, res) {
    
    connection.query('SELECT * FROM users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
            // response.ok('test')
        }
    });
};

exports.index = function(req, res) {
    response.ok("TEST!", res)
};

exports.login = function(req, res) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('select * from users where username = ? and password = ? limit 1',
    [ first_name, last_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            var json = {"message": "berhasil login", "userdata":rows};
            
            response.ok(json, res)
        }
    });
};

exports.createUsers = function(req, res) {
    
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;

    connection.query('INSERT INTO users (username, password) values (?,?)',
    [ first_name, last_name ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan user!", res)
        }
    });
};

exports.getJob = function(req,res){

    const https = require('https');

https.get('https://jobs.github.com/positions.json', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
    var json = {"message": "success", "data":JSON.parse(data)};
    response.ok(json, res)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}

exports.getJobPost = function(req,res){

    const https = require('https');
    var description = req.body.description;
    var location = req.body.location;
    var full_time = req.body.full_time;
    var page = req.body.page;
    // var location = req.params.location;
    // var full_time = req.params.full_time;
    var json = {"message": "dapat", "data":{
        "description" : description,
        "location" : location,
        "full_time" : full_time
    }};
    // response.ok(json, res)
https.get('https://jobs.github.com/positions?description='+description+'&location='+location+'&full_time='+full_time+'&page='+page, (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
    var json = {"message": "success", "data":JSON.parse(data)};
    response.ok(json, res)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}

exports.getJobDetail = function(req,res){

    const https = require('https');
    var job_id = req.body.job_id;
    // var location = req.params.location;
    // var full_time = req.params.full_time;
    // response.ok(json, res)
https.get('https://jobs.github.com/positions/'+job_id+'.json', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data).explanation);
    var json = {"message": "success", "data":JSON.parse(data)};
    response.ok(json, res)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
}