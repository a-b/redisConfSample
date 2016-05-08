(function(){
	angular
		.module('redisApp', [])
		.controller('MainController', MainController)
		.service('MainService', MainService)

	MainController.$inject = ['$scope', 'MainService'];
	MainService.$inject = ["$http"];


	function MainController($scope, MainService){
		MainService.getAllUsers()
		.then(function(res){
			console.log("get all res", res);
		}, function(err){
			console.error(err);

		});

		$scope.getUsers = function(twitter, radius){
			twitter = twitter.replace('@', '');
			MainService.getUsersInRadius(twitter, radius)
			.then(function(res){
				console.log("radius res", res);
				$scope.users = res.data;
			}, function(err){
				console.error(err);
			});
		}
	}

	function MainService($http){

		this.getAllUsers = () => {
			return $http.get(`/api/getAll`);
		}

		this.getUsersInRadius = (twitterHandle, radius) => {
			return $http.get(`/api/matches/${twitterHandle}/${radius}`);
		}

	}


})();
