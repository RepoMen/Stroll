var app = angular.module('stroll', [
  'stroll.services',
  'stroll.controllers',
  'ui.router',
])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    })

  $urlRouterProvider.otherwise('/');
});
