'use strict';

app.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.service('meetingsCounter',function(){
    var counter = 0;
    
    var setCounter = function(num){
    	counter = num;
    }

    var getCounter = function(num){
    	return counter;
    }

    return {
    	setCounter : setCounter,
    	getCounter : getCounter
    }

});

app.factory('loginUser',function(){
    return {};
});