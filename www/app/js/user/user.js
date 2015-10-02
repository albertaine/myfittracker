;(function() {
    'use strict';

    angular
        .module('MyFitTracker.User', [

        ])
        .config(/*UserConfig*/UserConfigUiRouter)
        .controller('UserCtrl', UserController);

    function UserController () {
        this.desc = 'Пользователь';
    }

/*
    function UserConfig ($routeProvider) {
        $routeProvider
            .when('/user', {
                templateUrl: '../../user/index.html',
                controller: 'UserCtrl',
                controllerAs: 'uc'
            });
    }
*/

    //UserConfigUiRouter.$inject = ['$stateProvider'];
    // @ngInject
    function UserConfigUiRouter ($stateProvider) {
        $stateProvider
            .state('User', {
                url: '/user',
                templateUrl: 'ht/user/index.html',
                controller: 'UserCtrl',
                controllerAs: 'uc'
            });
    }

})();
