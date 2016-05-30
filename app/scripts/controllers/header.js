'use strict';

/**
 * @ngdoc function
 * @name doodleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doodleApp
 */
angular.module('doodleApp')
  .controller('HeaderController', function ($scope, $location) 
	{ 
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
});

