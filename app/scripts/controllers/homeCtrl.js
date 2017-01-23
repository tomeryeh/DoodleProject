'use strict';

angular.module('doodleApp')
  .controller('HomeCtrl', function ($scope,localStorageService,$firebaseObject,Auth,$location,$filter,meetingsCounter) {
  	
  $scope.init = function()
  {
    $scope.meetings = localStorageService.get('meetings');

  };


  $scope.newMeeting = function(){
    
    localStorageService.set('meeting', null)
    $location.path('/step1');
  }
  
  $scope.loadMeeting = function(index){
  	//$scope.meetings = localStorageService.get('meetings');
    $scope.curMeeting = $scope.meetings[index];
    $scope.curMeeting.id = index;
        
	  localStorageService.set('meeting', $scope.curMeeting);
	  $location.path('/result')
	
  };

  $scope.init();
});