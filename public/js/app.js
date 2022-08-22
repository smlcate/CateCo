var app = angular.module('mainApp', ['ui.router'])

app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider

  // // HOME STATES AND NESTED VIEWS ========================================
  .state('home', {
      url: '/',
      templateUrl: '../partials/home.html'
  })
  .state('resume', {
      url: '/samcate',
      templateUrl: '../partials/resume.html'
  })

});
