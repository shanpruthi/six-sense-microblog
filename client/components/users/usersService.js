angular.module('blog')
    .factory('Users', ['$http', function ($http) {
        return {
            createUser: userInfo => $http.post('/api/auth/register/', userInfo),
            verifyUser: userInfo => $http.post('/api/auth/login/', userInfo)
        };
    }
]);
