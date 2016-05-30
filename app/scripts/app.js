'use strict';

/**
 * @ngdoc overview
 * @name doodleApp
 * @description
 * # doodleApp
 *
 * Main module of the application.
 */
angular
  .module('doodleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    'ui.bootstrap'
  ])
  .config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('ls');
  }])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/step1.html',
        controller: 'Step1Ctrl',
        controllerAs: 'step1'
      })
      .when('/step2', {
        templateUrl: 'views/step2.html',
        controller: 'Step2Ctrl',
        controllerAs: 'step2'
      })
      .when('/step3', {
        templateUrl: 'views/step3.html',
        controller: 'Step3Ctrl',
        controllerAs: 'step3'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
