'use strict';

/**
 * @ngdoc function
 * @name doodleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doodleApp
 */
angular.module('doodleApp')
  .controller('FormCtrl', function ($scope,localStorageService,wizardData) {
  	
    $scope.datepickerOptions  = {
      initDate : new Date(),
      minDate : new Date(),
      showWeeks : false
    };

   //var todosInStore = localStorageService.get('todos');
   // $scope.todos = todosInStore || [];

    $scope.init = function()
    {
      $scope.meeting = wizardData;
    };
    

    // $scope.$watch('todos', function () {
    //   localStorageService.set('todos', $scope.todos);
    // }, true);

    $scope.addParticipant = function(){
    	var paticipant = {
        name : $scope.paticipantName,
        email : $scope.paticipantEmail
      };

      $scope.meeting.participants = $scope.meeting.participants || [];
      $scope.meeting.participants.push(paticipant);
    	$scope.paticipantName = '';
      $scope.paticipantEmail = '';
    };

    $scope.removeParticipant = function(index){
    	$scope.meeting.participants.splice(index,1);
    };

    $scope.addDate = function(){
      var newDate = 
      {
        dateCh : $scope.datepicker.toLocaleDateString(),
        hourCh : $scope.startTime.toLocaleTimeString(),
        howLongCh : $scope.howLong
      };
      
      $scope.meeting.dates = $scope.meeting.dates || [];

      $scope.meeting.dates.push(newDate);
      
    };

    $scope.init();

  });