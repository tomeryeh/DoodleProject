'use strict';

/**
 * @ngdoc overview
 * @name doodleApp
 * @description
 * # doodleApp
 *
 * Main module of the application.
 */
var app = angular
  .module('doodleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    'ui.bootstrap',
    'firebase'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/logout.html',
        controller: 'FormCtrl'
        
      })
      .when('/step1', {
        templateUrl: 'views/step1.html',
        controller: 'FormCtrl'
        
      })
      .when('/step2', {
        templateUrl: 'views/step2.html',
        controller: 'FormCtrl'
        
      })
      .when('/step3', {
        templateUrl: 'views/step3.html',
        controller: 'FormCtrl'
      
      })
      .when('/summary', {
        templateUrl: 'views/summary.html',
        controller: 'FormCtrl'
      })
      .when('/result', {
        templateUrl: 'views/result.html',
        controller: 'FormCtrl'
      })
      .when('/chooseDates', {
        templateUrl: 'views/chooseDates.html',
        controller: 'ChooseDatesCtrl'
      })
      .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl'
       })
      .otherwise({
        redirectTo: '/'
      });
  });

