'use strict';

app.controller('ChooseDatesCtrl', function ($scope, $firebaseObject, $location) {

    $scope.init = function () {
        $scope.afterSave = false;
        var queryString = $location.search();
        var eventId = queryString.event;

        var ref = firebase.database().ref();

        $scope.DBData = $firebaseObject(ref.child('meetings').child(eventId).child('data'));

        $scope.DBData.$loaded().then(function () {
            $scope.dates = $scope.DBData.dates;
        });
    };
    
    $scope.savePick = function() {
		var curUserName = $scope.chooseDateEmail;
    	for (var i = $scope.dates.length - 1; i >= 0; i--) {
    		if ($scope.dates[i].isMark){
    			$scope.dates[i].names = $scope.dates[i].names || [];
    			$scope.dates[i].isMark = false;
                $scope.dates[i].names.push(curUserName);
    		}else{
                $scope.dates[i].names = $scope.dates[i].names || [];
            }
    	}
        $scope.DBData.dates = $scope.dates;
        $scope.DBData.$save();
        $scope.afterSave = true;
    };

    $scope.init();
});