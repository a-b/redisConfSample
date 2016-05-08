var express = require('express');
var router = express.Router();
var request = require('request');
var redis = require('redis');
var async = require('async');
var client = redis.createClient('redis://localhost:6379', {
	detect_buffers: true,
	no_ready_check: true
});

client.on('error', function(err){
	console.log('Error', err);
})


router.get('/getAll', function(req, res, next) {

	request('https://redisconf-geoform.herokuapp.com/users', function(error, response, body){
		if(error) res.status(400).send(error);
		console.log('body: ', body);

		async.forEach(body, function(user, callback){
			client.hset(user[])

		})



		res.send();



	})

  // res.send('respond with a resource');
});

module.exports = router;
