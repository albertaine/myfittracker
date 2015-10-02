'use strict';

describe('В модуле MyFitTracker.Users', function () {

    beforeEach(module('MyFitTracker.Users'));

    describe('контроллер UsersCtrl', function () {

        it('был объявлен', inject(function ($controller) {
            var testCtrl = $controller('UsersCtrl');
            expect(testCtrl).toBeDefined();
        }));

        describe('содержит объект с пользователями', function () {

            it('который инициализирован', inject(function ($controller) {
                var testCtrl = $controller('UsersCtrl');
                expect(testCtrl.usersList).toBeDefined();
                expect(testCtrl.usersList.length).toBeGreaterThan(0);
            }));

            it('который можно менять', inject(function ($controller) {
                var testCtrl = $controller('UsersCtrl');

                var length = testCtrl.usersList.length;

                testCtrl.addUser({
                    name: 'Test Username',
                    email: 'user@test.com'
                });

                expect(testCtrl.usersList.length).toBe(length + 1);

                expect(testCtrl.usersList[testCtrl.usersList.length-1]).toBeDefined();
                expect(testCtrl.usersList[testCtrl.usersList.length-1].name).toBe('Test Username');
                expect(testCtrl.usersList[testCtrl.usersList.length-1].email).toBe('user@test.com');
            }));

        });
    });
});
