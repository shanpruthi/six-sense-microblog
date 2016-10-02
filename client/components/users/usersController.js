angular.module('blog')
    .controller('UsersController', ['$scope', '$rootScope', 'Users', function ($scope, $rootScope, Users) {

        $scope.authError = '';
        $rootScope.isSignedIn;
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
                    sessionStorage.token = data.data.token;
                })
                .catch((response) => {
                    $scope.authError = 'Incorrect username or password';
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
            $rootScope.isSignedIn = false;
        };

    }
    ]);
