'use strict';

/**
 * @ngdoc function
 * @name doodleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doodleApp
 */
angular.module('doodleApp')
  .controller('HeaderController', function ($scope, $location, Auth, loginUser, localStorageService,$firebaseObject,meetingsCounter) {


  	$scope.auth = Auth;

    $scope.init = function()
    {
      var ref = firebase.database().ref();
      var objCounter = $firebaseObject(ref.child('meetings').child('counter'));
           objCounter.$loaded().then( function() {
              meetingsCounter.setCounter(objCounter.$value);
              $scope.eventCounter = objCounter.$value;
           })
    }

    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    $scope.signIn = function () {
          
          $scope.auth = Auth;

          $scope.firebaseUser = null;
          $scope.error = null;

          $scope.auth.$signInWithPopup('google').then(function (result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.idToken;
              // The signed-in user info.
              var user = result.user;
              // if ($location.path() != 'chooseDates'){
              $location.path('/step1');
              // }
          }).catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
          });
      };

	$scope.signOut = function(){
		$scope.auth = Auth;
        $scope.auth.$signOut();
      };

    // any time auth state changes, add the user data to scope
    $scope.auth.$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;

       if (firebaseUser) {
           console.log("Signed in as:", firebaseUser.uid);

           var ref = firebase.database().ref();

           var obj = $firebaseObject(ref.child('meetings').child(firebaseUser.uid).child('data'));

           obj.$loaded().then(function () {
               if (obj.topic != null){
                localStorageService.set('meeting', obj);
                $location.path('/result');
               }

               
           });



  		} else {
           if ($location.path() != '/chooseDates') {
               $location.path('/');
           }
           
           localStorageService.remove('meeting');
    	   console.log("Signed out");
  		}
    });

    $scope.init();
});

