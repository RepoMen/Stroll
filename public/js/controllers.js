angular.module('stroll.controllers', [])

.controller('HomeController', function($scope) {

})

.controller('mapCtrl', function($scope) {
  $scope.map = { center: { latitude: 37.78, longitude: -122.41 }, zoom: 13 };
});
