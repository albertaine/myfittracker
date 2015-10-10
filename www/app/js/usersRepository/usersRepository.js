;(function() {
    'use strict';

    angular.module('MyFitTracker.Users.Repository', [
        'MyFitTracker.Fire'
    ])
        .factory('UsersRepository', UsersRepositoryFactory);

    // @ngInject
    function UsersRepositoryFactory(dbc, $firebaseArray, $firebaseObject) {
        var o = {};

        o.getAllUsers = function() {
            var ref = dbc.getRef();

            var refUsers = ref.child('users');

            return $firebaseArray(refUsers);
        };

        o.addNewUser = function(_user) {
            var ref = dbc.getRef();

            if (_user && _user.name && _user.name.length > 0) {
                var usersList = $firebaseArray(ref.child('users'));
                return usersList.$add(_user);
            }
            return false;
        };

        o.removeUser = function(_$id) {
            if (_$id) {
                var ref = dbc.getRef();
                var usersList = $firebaseArray(ref.child('users'));
                var user = $firebaseObject(ref.child('users').child(_$id));
                //console.log(user);
                return user.$remove();
            }
        };

        return o;
    }

})();
