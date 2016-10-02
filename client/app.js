angular.module('blog', ['ui.router', 'satellizer'])

    .config(function ($stateProvider, $urlRouterProvider, $authProvider) {

        $urlRouterProvider.otherwise('/login')

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/components/users/usersLogin.html'
            })
            .state('latest', {
                url: '/latest',
                templateUrl: '/components/posts/postsLatest.html'
            })
            .state('post', {
                url: '/post',
                templateUrl: '/components/posts/postsAdd.html'
            })

    });
