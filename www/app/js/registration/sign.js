;(function() {
    'use strict';

    angular.module('MyFitTracker.Sign', [
        'MyFitTracker.Auth',
        'ui.router'
    ])
        .controller('signInCtrl', signInController)
        .controller('signUpCtrl', signUpController)
        .config(signConfig);

    // @ngInject
    function signUpController(Authentication, $state) {
        var self = this;

        function clean() {
            self.user = {
                'email': null,
                'password': null,
                'fullname': null
            };
        }

        clean();

        self.facebookSignUp = function() {
            Authentication.facebookSignUp()
                .then(function(e) {
                    $state.go('Home');
                });
        };

        self.signUp = function() {
            Authentication.registerUser(self.user)
                .then(function(e) {
                    clean();
                    $state.go('Users');
                });
        };
    }

    // @ngInject
    function signInController(Authentication, $state, $rootScope) {
        var self = this;

        function clean() {
            self.user = {
                'email': null,
                'password': null,
                'fullname': null
            };
        }

        clean();

        self.facebookSignIn = function() {
            Authentication.facebookSignIn()
                .then(function(e) {
                    $state.go('Home');
                });
        };

        self.signIn = function() {
            Authentication.login(self.user)
                .then(function(e) {
                    clean();
                    $state.go('User');
                })
                .catch(function(error) {
                    //console.log('Error ', e);
                    switch (error.code) {
                        case "INVALID_EMAIL":
                            console.log("INVALID_EMAIL: The specified user account email is invalid.");
                            $rootScope.addAlert("INVALID_EMAIL: The specified user account email is invalid.");
                            break;
                        case "INVALID_PASSWORD":
                            console.log("INVALID_PASSWORD: The specified user account password is incorrect.");
                            $rootScope.addAlert("INVALID_PASSWORD: The specified user account password is incorrect.", 'danger');
                            break;
                        case "INVALID_USER":
                            console.log("INVALID_USER: The specified user account does not exist.");
                            $rootScope.addAlert("INVALID_USER: The specified user account does not exist.");
                            break;
                        default:
                            console.log("COMMON ERROR: Error logging user in: ", error);
                            $rootScope.addAlert("COMMON ERROR: Error logging user in");
                    }
                });
        };
    }

    // @ngInject
    function signConfig($stateProvider) {
        $stateProvider
            .state('signin', {
                url: '/signin',
                templateUrl: 'ht/registration/sign-in.html',
                controller: 'signInCtrl',
                controllerAs: 'sic'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'ht/registration/sign-up.html',
                controller: 'signUpCtrl',
                controllerAs: 'suc'
            });
    }

})();
