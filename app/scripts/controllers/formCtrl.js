'use strict';

/**
 * @ngdoc function
 * @name doodleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doodleApp
 */
angular.module('doodleApp')
  .controller('FormCtrl', function ($scope,localStorageService,$firebaseObject,Auth,$location,$filter,meetingsCounter) {
  	
    $scope.datepickerOptions  = {
      initDate : new Date(),
      minDate : new Date(),
      showWeeks : false
    };

    $scope.init = function()
    {
        $scope.meeting = localStorageService.get('meeting');
        $scope.meetings = localStorageService.get('meetings');

        $scope.$watch('meeting', function () {
            localStorageService.set('meeting', $scope.meeting);
        }, true);


    };
    
    $scope.removeMeeting = function(){
      var currentUser = Auth.$getAuth();
      var ref = firebase.database().ref('meetings/'+ currentUser.uid);
      var obj = $firebaseObject(ref);
      obj.$remove().then(function(ref) {
        // data has been deleted locally and in the database
      }, function(error) {
        console.log("Error:", error);
      });
      localStorageService.set('meeting', null)
      $location.path('/step1')
    };


    $scope.saveMeeting = function(){
      var currentUser = Auth.$getAuth();

      var ref = firebase.database().ref('meetings/'+ currentUser.uid);
      var obj = $firebaseObject(ref);
      
      if($scope.meeting.id){
        $scope.meetings[$scope.meeting.id] = $scope.meeting;
      }else{
        $scope.meetings[$scope.meetings.length] = $scope.meeting;
      }

      obj.data = $scope.meetings;
      obj.$save();

      var refCounter = firebase.database().ref();
      var objCounter = $firebaseObject(refCounter.child('meetings').child('counter'));
           objCounter.$loaded().then( function() {
              objCounter.$value = objCounter.$value + 1;
              objCounter.$save();
           })

      var urlAfterSplit = $location.absUrl().split('/');
      urlAfterSplit[urlAfterSplit.length - 1] = 'chooseDates';
      $scope.url = urlAfterSplit.join('/') + "?event=" + currentUser.uid;

      $scope.sendEmail();
    }

// Step 3
    $scope.addParticipant = function(){
    	var paticipant = {
        name : $scope.paticipantName,
        email : $scope.paticipantEmail,
        vip : $scope.paticipantVip,
        pick : false
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
  $scope.updateData = function(){
    var firebaseUser = Auth.$getAuth();
    var ref = firebase.database().ref();

    var obj = $firebaseObject(ref.child('meetings').child(firebaseUser.uid).child('data'));

    obj.$loaded().then(function () {
      if (obj.topic != null){
      localStorageService.set('meeting', obj);
      $scope.meeting = localStorageService.get('meeting');
      $scope.calcResult();
    }
    });
  };

  $scope.calcResult = function(){
    var vipUsers = [];
    
    $scope.totalPart = $scope.meeting.participants.length;
    $scope.partPick = 0;

    for (var i = $scope.meeting.participants.length - 1; i >= 0; i--) {
      if ($scope.meeting.participants[i].vip == true){
        var email = $scope.meeting.participants[i].email;
        vipUsers.push(email);
      }
      if ($scope.meeting.participants[i].pick == true){
        $scope.partPick++;
      }
    }

    for (var i = $scope.meeting.dates.length - 1; i >= 0; i--) {

      $scope.meeting.dates[i].allVips = 0;
      $scope.meeting.dates[i].vipCounter = 0; 
      $scope.meeting.dates[i].partCounter = $scope.meeting.dates[i].names ? $scope.meeting.dates[i].names.length : 0;
      $scope.meeting.dates[i].passMinPart = (($scope.meeting.dates[i].partCounter >= $scope.meeting.minPart) ? 1 : 0);
      $scope.meeting.dates[i].vipNames = [];

      if($scope.meeting.dates[i].names){
        for (var l = $scope.meeting.dates[i].names.length - 1; l >= 0; l--) {
          var nameFromDate = $scope.meeting.dates[i].names[l];
          if ( vipUsers.indexOf(nameFromDate) != -1 ){
            $scope.meeting.dates[i].vipCounter++; 
            $scope.meeting.dates[i].vipNames.push(nameFromDate);
          }
        }

        if ($scope.meeting.dates[i].vipCounter == vipUsers.length){
          $scope.meeting.dates[i].allVips = 1;
        }
      }
    }

    $scope.afterCalc = true; 

  };

  $scope.enableSend = function(){
      $('#sendResultsBtn').removeAttr('disabled');
  };

  $scope.sendResultEmail = function(){
    var finalDate = $("input:radio[name=pickDate]:checked").val();
    for (var i = $scope.meeting.participants.length - 1; i >= 0; i--) {
      
      emailjs.send("gmail","result",{
          to_name: $scope.meeting.participants[i].name,
          to_email :$scope.meeting.participants[i].email,
          from_name :$scope.meeting.name,
          message_html : finalDate
        });     
    }
  };


  $scope.sendEmail = function(){

    for (var i = $scope.meeting.participants.length - 1; i >= 0; i--) {
      emailjs.send("gmail","template_ybWM6OV9",{
          to_name: $scope.meeting.participants[i].name,
          url: $scope.url,
          to_email :$scope.meeting.participants[i].email,
          from_name :$scope.meeting.name,
          event : $scope.meeting.topic,
          message_html : $scope.meeting.description
        });     
    }
  }

  $scope.init();

  });