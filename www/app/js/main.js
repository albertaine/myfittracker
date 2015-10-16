;(function() {
	'use strict';

	angular.module('MyFitTracker', [
		/*'ngRoute'*/'ui.router',
		'ui.bootstrap',
		'MyFitTracker.Fire',
		'MyFitTracker.Home',
		'MyFitTracker.User',
		'MyFitTracker.Users',
		'MyFitTracker.Auth',
		'MyFitTracker.Navbar',
		'MyFitTracker.Sign',
		'MyFitTracker.Profile'
	])
		.constant('FIREBASE_URL', 'https://myfittracker.firebaseio.com/')
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
	function Run(FIREBASE_URL, configOptions, $rootScope) {
		console.log('...Run Main');
		console.log(FIREBASE_URL);
		console.log(configOptions);

		$rootScope.alerts = [
/*
			{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
			{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
*/
		];

		$rootScope.addAlert = function(_msg, _type) {
			_type = _type || 'warning';
			$rootScope.alerts.push({type: _type, msg: _msg});
		};

		$rootScope.closeAlert = function(index) {
			$rootScope.alerts.splice(index, 1);
		};

		$rootScope.currentUser = {
			fullName: null
		};
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
