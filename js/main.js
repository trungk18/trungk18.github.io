var portfolioApp = angular.module('portfolioApp', []);

portfolioApp.controller('MainCtrl', ['$scope','$http', function ($scope, $http) {
    $http.get("https://api.github.com/users/trungk18/repos").then(function (response) {
        $scope.repositoryList = response.data;
        console.log($scope.repositoryList);
    });
}]);


