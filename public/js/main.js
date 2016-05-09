(function(){
	angular
		.module('redisApp', [])
		.controller('MainController', MainController)
		.service('MainService', MainService)

	MainController.$inject = ['$scope', 'MainService'];
	MainService.$inject = ["$http"];


	function MainController($scope, MainService){
		MainService.getAllUsers();

		$scope.getUsers = function(twitter, radius){
			twitter = twitter.replace('@', '');
			MainService.getUsersInRadius(twitter, radius)
			.then(function(res){
				$scope.users = res.data;
				$scope.users.forEach(function(user){
					user[1] = Math.floor(user[1]);
				});
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
