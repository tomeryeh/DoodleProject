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

app.service('meetingIndex',function(){
    var index = 0;
    
    var setIndex = function(num){
        index = num;
    }

    var getIndex = function(num){
        return index;
    }

    return {
        setIndex : setIndex,
        getIndex : getIndex
    }

});

app.factory('loginUser',function(){
    return {};
});