;(function() {
    'use strict';

    angular.module('MyFitTracker.Navbar', [

    ])
        .controller('NavbarCtrl', NavbarCtrlFn);

    // @ngInject
    function NavbarCtrlFn(Authentication) {
        var self = this;

        self.logOut = function () {
            console.log('=== Log Out ===');
            Authentication.logOut();
        }
    }

})();
