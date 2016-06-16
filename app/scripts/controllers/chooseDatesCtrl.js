'use strict';

app.controller('ChooseDatesCtrl', function ($scope, $firebaseObject, $location,Auth) {
    $scope.auth = Auth;

    var queryString = $location.search();
    var eventId = queryString.event;

    var ref = firebase.database().ref();

    $scope.DBData = $firebaseObject(ref.child('meetings').child(eventId).child('data'));

    $scope.DBData.$loaded().then(function () {
        $scope.dates = $scope.DBData.dates;
        
    });

    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
      $scope.firebaseUser = firebaseUser;

    if(firebaseUser){
      $location.path('/result');
    };

    });

    $scope.savePick = function() {
		var curUserName = $scope.chooseDateEmail;// $scope.firebaseUser.displayName+'|'+$scope.firebaseUser.email;
    	for (var i = $scope.dates.length - 1; i >= 0; i--) {
    		if ($scope.dates[i].isMark){
    			$scope.dates[i].names = $scope.dates[i].names || [];
    			$scope.dates[i].isMark = false;
                $scope.dates[i].names.push(curUserName);
    		}else{
                $scope.dates[i].names = $scope.dates[i].names || [];
                // if($scope.dates[i].names.length > 0){
                //     $scope.dates[i].names =[];
                // }
            }
    	}
        $scope.DBData.dates = $scope.dates;
        $scope.DBData.$save();
    };
});