;(function() {
    'use strict';

    angular
        .module('MyFitTracker.Home', [
            /*'ngRoute'*/'ui.router'
        ])
        .config(HomeConfigUiRouter)
        .controller('HomeCtrl', HomeController);

    // @ngInject
    function HomeController ($scope, Authentication, $state) {
        var self = this;
        self.desc = 'Домашняя';

        // Authentication

        //Authentication.auth();
        //Authentication.checkAuth();
        //Authentication.onAuth();

        //Authentication.registerUser();

        Authentication.checkAuth();
        //Authentication.onAuth();

        if (Authentication.isUserLoggedIn()) {
            console.log('....User is logged in');
        }
        else {
            console.log('....User is not logged in');
        }

        self.newUser = {
            email : '',
            password : ''
        };

        self.registerUser = function(_user) {
            console.log('=== registerUser === ' + _user);
            console.log(_user);
            Authentication.registerUser(_user);
        };

        self.loginUser = function(_user) {
            Authentication.auth(_user)
                .then(function(authData) {
                    self.userLogin = 'User logged in as ' + authData.uid;
                    self.error = false;
                    //Authentication.checkAuth();
                    console.log('=== auth === Logged in as ' + authData.uid);

                    $state.go('Users');
                })
                .catch(function(error) {
                    self.userLogin = 'Authentication failed ' + error;
                    self.error = true;
                    console.error('Authentication failed ' + error);
                });
        };
        //self.loginUser({ email: 'zar@mail.com', password: '123456' });

        //// Authentication
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
