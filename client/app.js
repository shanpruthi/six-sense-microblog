angular.module('blog', ['ui.router', 'satellizer', 'wu.masonry'])

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
            .state('about', {
                url: '/about',
                templateUrl: '/components/about/about.html'
            })
    });
