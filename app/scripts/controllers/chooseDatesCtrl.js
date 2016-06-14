'use strict';

app.controller('ChooseDatesCtrl', function ($scope, $firebaseObject, $location) {
    var queryString = $location.search();
    var eventId = queryString.event;

    var ref = firebase.database().ref();

    var obj = $firebaseObject(ref.child('meetings').child(eventId).child('data'));

    obj.$loaded().then(function () {
        $scope.meeting = obj;
    });
});