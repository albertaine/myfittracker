;(function() {
    'use strict';

    angular
        .module('MyFitTracker.User', [
            'MyFitTracker.Users.Repository'
        ])
        .config(/*UserConfig*/UserConfigUiRouter)
        .controller('UserCtrl', UserController);

    // @ngInject
    function UserController ($q, $rootScope, UsersRepository) {
        var self = this;

        console.log('== UserController ==');

        this.desc = 'Пользователь';

        function sonGo2Shop() {
            var deferred = $q.defer();

            setTimeout(function() {
                deferred.notify('Сын пошел в магазин');

                setTimeout(function() {
                    if (parseInt(Math.random() * 5) % 2) {
                        deferred.resolve("Колбаса есть");
                    }
                    else {
                        deferred.reject("Колбасы нет");
                    }
                }, 500);
            }, 1500);

            return deferred.promise;
        }

        function daughterGo2Shop() {
            var deferred = $q.defer();

            setTimeout(function() {
                deferred.notify('Дочь пошла в магазин');

                setTimeout(function() {
                    if (parseInt(Math.random() * 10) % 2) {
                        deferred.resolve("Яйца есть");
                    }
                    else {
                        deferred.reject("Яиц нет");
                    }
                }, 500);
            }, 1500);

            return deferred.promise;
        }

        self.test = function() {
/*
            sonGo2Shop().then(

                // Resolve
                function(_data) {
                    console.log('after sonGo2Shop resolved ', _data);
                },

                // Reject
                function(_data) {
                    console.log('after sonGo2Shop rejected ', _data);
                },

                // Notify
                function(_data) {
                    console.log('notify sonGo2Shop ', _data);
                }
            );
*/
            $q.all([sonGo2Shop(), daughterGo2Shop()]).then(

                // Resolve
                function(_data) {
                    console.log('after children resolved ', _data);
                },

                // Reject
                function(_data) {
                    console.log('after children rejected ', _data);
                },

                // Notify
                function(_data) {
                    console.log('notify children ', _data);
                }
            );
        };



        // Firebase part

        var users = UsersRepository.getAllUsers();

        users.$loaded().then(function(_usersList) {
            self.list = _usersList;
        });

/*
        users.$watch(function(_usersList) {
            self.list = _usersList;
        });
*/

        self.newUser = {
            name : '',
            surname : ''
        };


        self.addUser = function() {

            UsersRepository.addNewUser(self.newUser).then(function(ref) {
                $rootScope.addAlert('success', 'Пользователь сохранен в БД');
            });

            self.newUser = {
                name : '',
                surname : ''
            };
        };

        self.removeUser = function (_$id) {
            console.log('== removeUser == ' + _$id);
            UsersRepository.removeUser(_$id)
                .then(function() {
                    console.log(arguments);
                    $rootScope.addAlert('success', 'Пользователь удален из БД');
                });
        }
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
