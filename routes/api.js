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
		if(error) return res.status(400).send(error);
		async.forEach(JSON.parse(body), function(user, callback){
			console.log('user :', user);
			client.geoadd("redisConfAtt", user.lng, user.lat, user.twitterHandle, function(err, reply){
				//If success!
				callback(err);
			});
		}, function(err){
			if(err) return res.status(400).send(err);
			res.send(body);
		})
	})
});

router.get('/matches/:twitterHandle/:radius', function(req, res){
	var twitterHandle = '@' + req.params.twitterHandle;
	var radius = req.params.radius;
	// client.georadiusbymember("redisConfAtt", twitterHandle, radius, "mi", "withdist", "ASC", function(err, users){
	// 	if(err) return res.status(400).send(err);
	// 	res.send(users);
	// })

	client.georadiusbymember("redisConfAtt", twitterHandle, radius, "mi", "withdist", "withcoord", 'asc', function(err, users){
		if(err) return res.status(400).send(err);
		res.send(users);
	})

})

module.exports = router;
