angular.module('blog')

    .factory('Posts', ['$http', function ($http) {
        return {
            get: function () {
                return $http.get('/api/post?token=' + sessionStorage.token);
            },
            post: function (postData) {
                return $http.post('/api/post?token=' + sessionStorage.token, postData);
            },
            delete: function (post) {
                return $http.delete('/api/post/' + post._id + '?token=' + sessionStorage.token);
            }
        }

    }
]);
