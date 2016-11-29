angular.module('blog')
    .controller('UsersController', ['$scope', '$rootScope', 'Users', function ($scope, $rootScope, Users) {

        $scope.authError = '';
        $rootScope.isSignedIn;
        if (sessionStorage.getItem('token')) {
            $rootScope.isSignedIn = true;
        }
        $scope.user = {};

        $scope.verifyUser = function () {
            let tempUser = {
                username: $scope.user.username,
                password: $scope.user.password
            };

            Users.verifyUser({
                data: tempUser
            })
                .then((response) => {
                    const data = response.data;
                    $scope.user.username = '';
                    $scope.user.password = '';
                    $rootScope.isSignedIn = true;
                    sessionStorage.setItem('token', data.data.token);
                })
                .catch((response) => {
                    $scope.authError = 'Incorrect username or password';
                    setTimeout(function() {
                        $scope.authError = '';
                        console.log('test');
                    }, 3000);
                })
        };

        $scope.createUser = function () {
            let tempUser = {
                username: $scope.user.newUsername,
                password: $scope.user.newPassword
            };
            Users.createUser({
                data: tempUser
            })
                .then((response) => {
                    $scope.authError = 'Account created, you can now sign in';
                })
        };

        $scope.signOut = function () {
            sessionStorage.removeItem('token');
            $rootScope.isSignedIn = false;
        };

    }
    ]);
