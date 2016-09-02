angular.module('blog')

    .controller('PostController', ['$scope', '$rootScope', 'Posts', function ($scope, $rootScope, Posts) {

        // $scope.user.isSignedIn should exist here as well

        $scope.post = {};
        $scope.postMessage = '';

        Posts.get().then((response) => {
            $scope.posts = response.data.data;
        });

        $scope.addPost = function () {
            if ($scope.isSignedIn === false) {
                $scope.postMessage = 'You need to sign in to post something';
            } else {
                let tempPost = {
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
            if ($scope.isSignedIn === false) {
                $scope.postMessage = 'You need to sign in to delete';
            } else {
                Posts.delete(post)
                    .then((response) => {
                        let index = $scope.posts.indexOf(post);
                        if (index > -1) {
                            $scope.posts.splice(index, 1);
                        }
                        Posts.get().then((response) => {
                            $scope.posts = response.data.data;
                        });
                    })
            }
        };

    }
]);
