
app.factory('Auth', ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);

app.factory('wizardData',function(){
    return {};
});

app.factory('loginUser',function(){
    return {};
});