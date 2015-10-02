;(function() {
	'use strict';

	angular.module('MyFitTracker', [
		/*'ngRoute'*/'ui.router',
		'MyFitTracker.Home',
		'MyFitTracker.User',
		'MyFitTracker.Users'
	])
		.constant('FIREBASE_URL', 'http://....')
		.value('configOptions', {
			lang: 'ru',
			timezone: '+3'
		})
		.config(ConfigUiRouter)
		.run(Run);
		//.controller('MainCtrl', MainController);

/*
	function MainController($scope) {
		$scope.hello = 'Hi World!';
		this.hello = 'Hello World!';
	}
*/

	function Config ($routeProvider) {
		$routeProvider
/*
			.when('/users', {
				templateUrl: '../users/index.html',
				controller: 'UsersCtrl',
				controllerAs: 'usc'
			})
			.when('/user', {
				templateUrl: '../user/index.html',
				controller: 'UserCtrl',
				controllerAs: 'uc'
			})
*/
			.otherwise({ redirectTo: '/' })
	}

	// @ngInject
	function ConfigUiRouter($urlRouterProvider, FIREBASE_URL, $logProvider) {
		console.log('...Config Main');
		$urlRouterProvider.otherwise('/');
		$logProvider.debugEnabled(true);
		console.log(FIREBASE_URL);
	}

	// @ngInject
	function Run(FIREBASE_URL, configOptions) {
		console.log('...Run Main');
		console.log(FIREBASE_URL);
		console.log(configOptions);
	}

})();

var UserRepository = function () {
	var repository;

	function createRepository() {
		repository = {
			count : 2
		};
		return repository;
	}

	return {
		getInstance : function() {
			if (!repository) {
				console.log('Create new object');
				repository = createRepository();
			}
			console.log('Use existing object');
			return repository;
		}
/*
		getCount : function() {
			return repository.count;
		},
		setCount : function(_count) {
			repository.count = _count;
		}
*/
	};
};

var repository = new UserRepository;

var rep1 = repository.getInstance();
var rep2 = repository.getInstance();

console.log(rep1.count, rep2.count);
rep1.count = 1;
console.log(rep1.count, rep2.count);
rep2.count = 3;
console.log(rep1.count, rep2.count);
