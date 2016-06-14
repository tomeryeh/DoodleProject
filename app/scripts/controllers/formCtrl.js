'use strict';

/**
 * @ngdoc function
 * @name doodleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doodleApp
 */
angular.module('doodleApp')
  .controller('FormCtrl', function ($scope,localStorageService,$firebaseObject,Auth,$location) {
  	
    $scope.datepickerOptions  = {
      initDate : new Date(),
      minDate : new Date(),
      showWeeks : false
    };

   //var todosInStore = localStorageService.get('todos');
   // $scope.todos = todosInStore || [];

    $scope.init = function()
    {
        $scope.meeting = localStorageService.get('meeting');

        $scope.$watch('meeting', function () {
            localStorageService.set('meeting', $scope.meeting);
        }, true);
        //$scope.meeting = wizardData;

      // var ref = firebase.database().ref().child("meeting");
      // // download the data into a local object
      // var syncObject = $firebaseObject(ref);
      // // synchronize the object with a three-way data binding
      // // click on `index.html` above to see it used in the DOM!
      // syncObject.$bindTo($scope, "meeting");

    };
    

    $scope.saveMeeting = function(){
      var currentUser = Auth.$getAuth();

      var ref = firebase.database().ref('meetings/'+ currentUser.uid);
      var obj = $firebaseObject(ref);
      obj.data = $scope.meeting;
      obj.$save();

      var urlAfterSplit = $location.absUrl().split('/');
      urlAfterSplit[urlAfterSplit.length - 1] = 'chooseDates';
      $scope.url = urlAfterSplit.join('/') + "?event=" + currentUser.uid;
    }

// Step 3
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

// Step 2
    $scope.addDate = function(){
      var newDate = 
      {
        dateCh : $scope.datepicker.toLocaleDateString(),
        hourCh : $scope.startTime.toLocaleTimeString(),
        howLongCh : $scope.howLong,
        names:[],
        isMark : false
      };
      $scope.meeting.dates = $scope.meeting.dates || [];
      $scope.meeting.dates.push(newDate);
    };
    
    $scope.removeDate = function(index){
      $scope.meeting.dates.splice(index,1);
    };
      
  $scope.sendEmail = function(){
    emailjs.send("gmail","template_ybWM6OV9",{
      to_name: "James", 
      notes: "Check this out!",
      to_email :"tomer.yeh@gmail.com",
      from_name :"hadar"
    });
  }

  $scope.init();

  });