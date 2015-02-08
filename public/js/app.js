var app = angular.module('stroll', [
  'stroll.services',
  'stroll.controllers',
  'ui.router',
  'uiGmapgoogle-maps',
  'geolocation'
])

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, googleMapKey) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })

  $urlRouterProvider.otherwise('/home');

  uiGmapGoogleMapApiProvider.configure({
        key: googleMapKey.key,
        v: '3.17'
    });
});
