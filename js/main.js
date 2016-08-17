var portfolioApp = angular.module('portfolioApp', []);

portfolioApp.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get("https://api.github.com/users/trungk18/repos").then(function (response) {
        if (!response) return;
        $scope.repositoryList = response.data.sort(function (a, b) {
            return b.stargazers_count - a.stargazers_count;
        });

    });
}]);


