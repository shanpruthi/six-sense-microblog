angular.module('blog')

    .controller('PostController', ['$scope', '$rootScope', 'Posts', function ($scope, $rootScope, Posts) {

        $scope.post = {};
        $scope.postMessage = '';

        Posts.get().then((response) => {
            $scope.posts = response.data.data;
        });

        $scope.addPost = function () {
            if ($rootScope.isSignedIn == false) {
                $scope.postMessage = 'You need to sign in to post something';
            } else {
                let tempPost = {
                    title: $scope.post.title,
                    content: $scope.post.content,
                };
                Posts
                    .post({ data: tempPost})
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
        };

    }
]);
