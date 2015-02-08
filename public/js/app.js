var app = angular.module('stroll', [
  'stroll.services',
  'stroll.controllers',
  'ui.router',
  'uiGmapgoogle-maps'
])

.config(function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, googleMapKey) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })

  $urlRouterProvider.otherwise('/');

  uiGmapGoogleMapApiProvider.configure({
        key: googleMapKey.key,
        v: '3.17'
    });
});
