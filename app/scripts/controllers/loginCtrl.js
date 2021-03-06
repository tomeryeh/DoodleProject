'use strict';

angular.module('doodleApp')
  .controller('LoginCtrl', function ($scope,Auth,$location) {
      
      $scope.signIn = function () {
          
          $scope.auth = Auth;

          $scope.firebaseUser = null;
          $scope.error = null;

          $scope.auth.$signInWithPopup('google').then(function (result) {
              // This gives you a Google Access Token. You can use it to access the Google API.
              var token = result.credential.idToken;
              // The signed-in user info.
              var user = result.user;

              
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
        $scope.auth.signOut().then(function() {
          $location.path('/');
        // Sign-out successful.
        }, function(error) {
        // An error happened.
        });
      };

 });