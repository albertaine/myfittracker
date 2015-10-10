;(function() {
    'use strict';

    angular.module('MyFitTracker.Auth', [
        'MyFitTracker.Fire'
    ])
        .factory('Authentication', AuthenticationFactory);

    // @ngInject
    function AuthenticationFactory(dbc, $firebaseAuth, $rootScope) {
        var o = {};

        var authObj = $firebaseAuth(dbc.getRef());
        console.log(authObj);
/*
        o.auth = function() {
            console.log('=== auth ===');

            authObj.$authWithPassword(
                {
                    email: 'zar@mail.com',
                    password: '123456'
                })
                .then(function(authData) {
                    console.log('=== auth === Logged in as ' + authData.uid);
                })
                .catch(function(error) {
                    console.error('Authentication failed ' + error);
                });
        };
*/
/*
        o.auth = function() {
            console.log('=== auth ===');

            return authObj.$authWithPassword(
                {
                    email: 'zar@mail.com',
                    password: '123456'
                });
        };
*/
        o.auth = function(_user) {
            console.log('=== auth ===');

            return authObj.$authWithPassword(_user);
        };

        o.checkAuth = function() {
            console.log('=== checkAuth ===');

            var authData = authObj.$getAuth();

            if (authData) {
                console.log('=== checkAuth === Logged in as ' + authData.uid);
                $rootScope.userLoggedIn = true;
            }
            else {
                console.log('Logged out');
                $rootScope.userLoggedIn = false;
            }
        };

        o.onAuth = function() {
            console.log('=== onAuth ===');

            authObj.$onAuth(function(authData) {
/*
                if (authData) {
                    authObj.$unauth();
                    console.log('=== onAuth === Logged in as ' + authData.uid);
                }
                else {
                    console.log('Logged out');
                }
*/
                authObj.$unauth();
                console.log('=== onAuth === Logged out');
            });
        };

        o.isUserLoggedIn = function() {
            return authObj.$getAuth() ? true : false;
        };

        o.registerUser = function(newUser) {
            console.log('=== registerUser ===');

            authObj.$createUser(
                /*
                {
                    email: 'albertaino@gmail.com',
                    password: 'firebasePass'
                }*/newUser)
                .then(function(userData) {
                    console.log('User registered with id = ' + userData.uid);
                    return authObj.$authWithPassword(newUser)
                        .then(function(authData) {
                            console.log('=== authObj.createUser === Logged in as ' + authData.uid);
                        })
                        .catch(function(error) {
                            console.error('Authentication failed ' + error);
                        });
                });
        };

        o.logOut = function() {
            authObj.$unauth();
            o.checkAuth();
        };

        return o;
    }

})();
