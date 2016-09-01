const blogApp = angular.module('blog', [
    'ui.router',
]);

blogApp.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $urlRouterProvider.otherwise('/login')

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html'
        })
        .state('latest', {
            url: '/latest',
            templateUrl: 'latest.html'
        })
        .state('post', {
            url: '/post',
            templateUrl: 'post.html'
        });
});


blogApp.controller('MainController', ['$scope', '$http', 'Posts', 'Users', function ($scope, $http, Posts, Users) {

    // POSTS

    $scope.post = {};
    $scope.postMessage = '';

    Posts.get().then((response) => {
        "use strict";
        $scope.posts = response.data.data;
    });

    $scope.addPost = function () {
        "use strict";

        if ($scope.isSignedIn === false) {
            $scope.postMessage = 'You need to sign in first';
        } else {
            var tempPost = {
                title: $scope.post.title,
                content: $scope.post.content,
                image: 1010
            }
            Posts.post({ data: tempPost})
                .then((response) => {
                    Posts.get()
                        .then((response) => {
                        $scope.posts = response.data.data;
                    })
                    $scope.post = {};
                    $scope.postMessage = 'Post added!';
                });
        }
    };

    $scope.deletePost = function (post) {
        "use strict";

        Posts.delete(post)
            .then((response) => {
                console.log(response);
                var index = $scope.posts.indexOf(post);
                if (index > -1) {
                    $scope.posts.splice(index, 1);
                }
                Posts.get().then((response) => {
                    "use strict";
                    $scope.posts = response.data.data;
                });
            })
    };

    // AUTH

    $scope.authError = '';

    $scope.user = {
        username: '',
        isSignedIn: false
    };

    $scope.verifyUser = function () {
        "use strict";

        var tempUser = {
            username: $scope.user.username,
            password: $scope.user.password
        };

        Users.verifyUser({
            data: tempUser
        })
            .then((response) => {
                const data = response.data;
                $scope.currentUser = $scope.user.username;
                $scope.user.username = '';
                $scope.user.password = '';
                $scope.user = {
                    username: data.username,
                    isSignedIn: true
                };
                sessionStorage.token = data.data.token;
            })
            .catch((response) => {
                console.log(response);
                $scope.authError = 'Incorrect username or password';
            })
        };

    $scope.createUser = function () {
        "use strict";
        var tempUser = {
            username: $scope.user.newUsername,
            password: $scope.user.newPassword
        };
        Users.createUser({
            data: tempUser
        })
            .then((response) => {
                const data = response.data;

                $scope.user = {
                    username: data.username,
                    isSignedIn: false
                };
                $scope.authError = 'Account created, you can now sign in';
            })
    };

    $scope.signOut = function () {
        "use strict";
        $scope.user = {
            username: '',
            isSignedIn: false
        };
    };

}]);

blogApp.factory('Posts', ['$http', function ($http) {
    "use strict";
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

}]);

blogApp.factory('Users', ['$http', function ($http) {
    "use strict";

    return {
        createUser: function (userInfo) {
            return $http.post('/api/auth/register/', userInfo);
        },
        verifyUser: function (userInfo) {
            return $http.post('/api/auth/login/', userInfo);
        }
    };


}]);
