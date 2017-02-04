angular.module('events', [])

.controller('mainController', function($scope,$http) {
   $http.get('events.json').
    success(function(data, status, headers, config) {
      $scope.results = data;
    })
});