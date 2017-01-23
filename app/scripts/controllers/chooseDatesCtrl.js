'use strict';

app.controller('ChooseDatesCtrl', function ($scope, $firebaseObject, $location,$firebaseArray) {

    $scope.init = function () {
        $scope.afterSave = false;
        var queryString = $location.search();
        $scope.eventId = queryString.event;
        $scope.userId = queryString.user;

        var ref = firebase.database().ref();

        $scope.DBData = $firebaseArray(ref.child('meetings').child($scope.userId).child('data'));


        $scope.DBData.$loaded().then(function () {
            $scope.dates = $scope.DBData[$scope.eventId].dates;
        });
    };
    
    $scope.savePick = function() {
        var dbRef = firebase.database().ref();		

        $scope.DBData = $firebaseArray(dbRef.child('meetings').child($scope.userId).child('data'));

        $scope.DBData.$loaded().then(function () {
           $scope.upDatedDates = $scope.DBData[$scope.eventId].dates;
            var curUserName = $scope.chooseDateEmail;
            for (var i = $scope.dates.length - 1; i >= 0; i--) {
                if ($scope.dates[i].isMark){
                    $scope.upDatedDates[i].names = $scope.dates[i].names || [];
                    $scope.upDatedDates[i].isMark = false;
                    $scope.upDatedDates[i].names.push(curUserName);

                }else{
                    $scope.upDatedDates[i].names = $scope.dates[i].names || [];
                }
            }

            for (var i = $scope.DBData[$scope.eventId].participants.length - 1; i >= 0; i--) {
                if ($scope.DBData[$scope.eventId].participants[i].email == curUserName){
                    $scope.DBData[$scope.eventId].participants[i].pick = true;
                }
            }
            $scope.DBData[$scope.eventId].dates = $scope.upDatedDates;
            $scope.DBData.$save();

        });
        
        $scope.afterSave = true;
    };

    $scope.init();
});