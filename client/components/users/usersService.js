angular.module('blog')
    .factory('Users', ['$http', function ($http) {
        return {
            createUser: function (userInfo) {
                return $http.post('/api/auth/register/', userInfo);
            },
            verifyUser: function (userInfo) {
                return $http.post('/api/auth/login/', userInfo);
            }
        };
    }
]);
