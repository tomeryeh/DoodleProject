'use strict';

app.controller('ChooseDatesCtrl', function ($scope, $firebaseObject, $location,$firebaseArray) {

    $scope.init = function () {
        $scope.afterSave = false;
        var queryString = $location.search();
        $scope.eventId = queryString.event;

        var ref = firebase.database().ref();

        $scope.DBData = $firebaseObject(ref.child('meetings').child($scope.eventId).child('data'));

        $scope.DBData.$loaded().then(function () {
            $scope.dates = $scope.DBData.dates;
        });
    };
    
    $scope.savePick = function() {
        var dbRef = firebase.database().ref();		

        $scope.DBData = $firebaseObject(dbRef.child('meetings').child($scope.eventId).child('data'));

        $scope.DBData.$loaded().then(function () {
           $scope.upDatedDates = $scope.DBData.dates;
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

            for (var i = $scope.DBData.participants.length - 1; i >= 0; i--) {
                if ($scope.DBData.participants[i].email == curUserName){
                    $scope.DBData.participants[i].pick = true;
                }
            }
            $scope.DBData.dates = $scope.upDatedDates;
            $scope.DBData.$save();

        });
        
        $scope.afterSave = true;
    };

    $scope.init();
});