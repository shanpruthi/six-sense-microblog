angular.module('blog')

    .controller('AboutController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        if (sessionStorage.getItem('token')) {
            $rootScope.isSignedIn = true;
        }
    }
    ]);
