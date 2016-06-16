'use strict';

/**
 * @ngdoc function
 * @name doodleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doodleApp
 */
angular.module('doodleApp')
  .controller('FormCtrl', function ($scope,localStorageService,$firebaseObject,Auth,$location,$filter) {
  	
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

      // var currentUser = Auth.$getAuth();
      // var ref = firebase.database().ref('meetings/'+ currentUser.uid);
      // var obj = $firebaseObject(ref);

      // obj.$loaded().then(function () {
      //   $location.path('/results');
      // });

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
        email : $scope.paticipantEmail,
        vip : $scope.paticipantVip
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
    $scope.addDate = function () {
      var shortHour = $filter('date')($scope.startTime, 'HH:mm')

      var newDate =
      {
        dateCh : $scope.datepicker.toLocaleDateString(),
        hourCh: shortHour,
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
      
  // result page
  $scope.calcResult = function(){
    var vipUsers = [];
    
    for (var i = $scope.meeting.participants.length - 1; i >= 0; i--) {
      if ($scope.meeting.participants[i].vip == true){
        var email = $scope.meeting.participants[i].email;
        vipUsers.push(email);
      }
    }

    var idealDateIndex = 0;

    for (var i = $scope.meeting.dates.length - 1; i >= 0; i--) {

      $scope.meeting.dates[i].allVips = 0;
      $scope.meeting.dates[i].vipCounter = 0; 
      $scope.meeting.dates[i].partCounter = $scope.meeting.dates[i].names ? $scope.meeting.dates[i].names.length : 0;
      $scope.meeting.dates[i].passMinPart = (($scope.meeting.dates[i].partCounter >= $scope.meeting.minPart) ? 1 : 0);

      if($scope.meeting.dates[i].names){
        for (var l = $scope.meeting.dates[i].names.length - 1; l >= 0; l--) {
          var nameFromDate = $scope.meeting.dates[i].names[l];
          if ( vipUsers.indexOf(nameFromDate) != -1 ){
            $scope.meeting.dates[i].vipCounter++; 
          }
        }

        if ($scope.meeting.dates[i].vipCounter == vipUsers.length){
          $scope.meeting.dates[i].allVips = 1;
        }
      }
    }    
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