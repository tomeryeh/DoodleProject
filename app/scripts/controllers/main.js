'use strict';

/**
 * @ngdoc function
 * @name doodleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doodleApp
 */
angular.module('doodleApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = [];

    $scope.addTodo = function(){
    	$scope.todos.push($scope.todo);
    	$scope.todo = "";
    };

    $scope.removeTodo = function(index){
    	$scope.todos.splice(index,1);
    };

  });
