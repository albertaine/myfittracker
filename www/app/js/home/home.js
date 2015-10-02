;(function() {
    'use strict';

    angular
        .module('MyFitTracker.Home', [
            /*'ngRoute'*/'ui.router'
        ])
        .config(HomeConfigUiRouter)
        .controller('HomeCtrl', HomeController);

    function HomeController () {
        var self = this;
        self.desc = 'Домашняя';
    }

    // @ngInject
    function HomeConfigUiRouter ($stateProvider) {
        $stateProvider
            .state('Home', {
                url: '/',
                templateUrl: 'ht/home/index.html',
                controller: 'HomeCtrl',
                controllerAs: 'hc'
            });
    }

})();
