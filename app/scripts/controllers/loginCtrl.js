'use strict';

angular.module('doodleApp')
  .controller('LoginCtrl', function ($scope,$firebaseAuth) {
	 var ref = new Firebase("https://project-7335870999437412984.firebaseio.com");
	  // create an instance of the authentication service
	  var auth = $firebaseAuth(ref);
	  // login with Facebook
	  auth.$authWithOAuthPopup("facebook").then(function(authData) {
	    console.log("Logged in as:", authData.uid);
	  }).catch(function(error) {
	    console.log("Authentication failed:", error);
	  });
 


 });