;(function() {
    'use strict';

    angular.module('MyFitTracker.Profile', [
        'MyFitTracker.Fire',
        'MyFitTracker.Auth'
    ])
        .controller('profileCtrl', profileController)
        .factory('profileFct', profileFactory)
        .config(profileConfig);

    // @ngInject
    function profileController($stateParams, profileFct) {
        var self = this;

        self.id = $stateParams.id;

        profileFct.getUser(self.id)
            .then(function(_user) {
                self.user = _user;
            });
    }

    // @ngInject
    function profileFactory(dbc, $firebaseObject) {
        var o = {};

        var ref = dbc.getRef();
        var usersRef = ref.child('users');

        o.getUser = function(_id) {
            return $firebaseObject(usersRef.child(_id)).$loaded();
        };

        return o;
    }

    // @ngInject
    function profileConfig($stateProvider) {
        $stateProvider
            .state('profile', {
                resolve: {
                    auth: /*@ngInject*/ function(Authentication) {
                        return Authentication.require();
                    }
                },
                url: '/profile/:id',
                templateUrl: 'ht/profile/profile.html',
                controller: 'profileCtrl',
                controllerAs: 'pc'
            });
    }

})();
