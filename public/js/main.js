(function(){
	angular
		.module('redisApp', [])
		.controller('MainController', MainController)
		.service('MainService', MainService)

	MainController.$inject = ['$scope'];

	function MainController($scope){
		console.log('working');
	}

	function MainService(){
		console.log('service');
	}

})();