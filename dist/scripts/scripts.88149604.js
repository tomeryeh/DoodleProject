"use strict";var app=angular.module("doodleApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ui.sortable","LocalStorageModule","ui.bootstrap","firebase"]).config(["localStorageServiceProvider",function(a){a.setPrefix("ls")}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/step1.html",controller:"FormCtrl"}).when("/step2",{templateUrl:"views/step2.html",controller:"FormCtrl"}).when("/step3",{templateUrl:"views/step3.html",controller:"FormCtrl"}).when("/summary",{templateUrl:"views/summary.html",controller:"FormCtrl"}).when("/chooseDates",{templateUrl:"views/chooseDates.html",controller:"FormCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"})}]);app.factory("wizardData",function(){return{}}),angular.module("doodleApp").controller("FormCtrl",["$scope","localStorageService","wizardData","$firebaseObject","$firebaseArray",function(a,b,c,d,e){a.datepickerOptions={initDate:new Date,minDate:new Date,showWeeks:!1},a.init=function(){var b=firebase.database().ref().child("meeting"),c=d(b);c.$bindTo(a,"meeting")},a.saveMeeting=function(){a.meetings=a.meetings||{};var b=firebase.database().ref();a.meetings=d(b.child("meetings")),a.meetings.push(a.meeting),a.meetings.$save()},a.addParticipant=function(){var b={name:a.paticipantName,email:a.paticipantEmail};a.meeting.participants=a.meeting.participants||[],a.meeting.participants.push(b),a.paticipantName="",a.paticipantEmail=""},a.removeParticipant=function(b){a.meeting.participants.splice(b,1)},a.addDate=function(){var b={dateCh:a.datepicker.toLocaleDateString(),hourCh:a.startTime.toLocaleTimeString(),howLongCh:a.howLong};a.meeting.dates=a.meeting.dates||[],a.meeting.dates.push(b)},a.removeDate=function(b){a.meeting.dates.splice(b,1)},a.sendEmail=function(){emailjs.send("gmail","template_ybWM6OV9",{to_name:"James",notes:"Check this out!",to_email:"tomer.yeh@gmail.com",from_name:"hadar"})},a.init()}]),angular.module("doodleApp").controller("HeaderController",["$scope","$location",function(a,b){a.isActive=function(a){return a===b.path()}}]),angular.module("doodleApp").controller("LoginCtrl",["$scope","$firebaseAuth",function(a,b){a.signIn=function(){var c=b();a.firebaseUser=null,a.error=null,c.$signInWithPopup("google").then(function(a){a.credential.idToken,a.user})["catch"](function(a){a.code,a.message,a.email,a.credential})}}]),angular.module("doodleApp").run(["$templateCache",function(a){a.put("views/chooseDates.html",'<div class="container"> <h3>Choose the dates you can attend</h3> <table class="table"> <thead> <tr> <th>Date</th> <th>Hour</th> <th>How long in hours</th> <th>Can you attend ?</th> </tr> </thead> <tbody> <tr ng-repeat="date in meeting.dates" ng-class="{success: event.done}"> <td>{{date.dateCh}}</td> <td>{{date.hourCh}}</td> <td>{{date.howLongCh}}</td> <td><input type="checkbox" name=""></td> </tr> </tbody> </table> <p><button type="button" class="btn btn-success">Submit</button></p> </div>'),a.put("views/login.html",'<div> <button ng-click="signIn()">Sign In With Google</button> <p ng-if="firebaseUser">Signed in user: <strong>{{ firebaseUser.uid }}</strong></p> <p ng-if="error">Error: <strong>{{ error }}</strong></p> </div>'),a.put("views/step1.html",'<div class="container"> <h1>Let\'s schedule a new meeting {{datename}}</h1> <hr> <form role="form"> <div class="form-group"> <label for="topic" class="control-label">Topic</label> <input type="text" ng-model="meeting.topic" class="form-control" id="topic" placeholder="Set the meeting target"> </div> <div class="form-group"> <label for="location" class="control-label">Where (optional)</label> <input type="text" ng-model="meeting.where" class="form-control" id="location" placeholder="Set the location"> </div> <div class="form-group"> <label for="description" class="control-label">Description (optional)</label> <input type="text" ng-model="meeting.description" class="form-control" id="description" placeholder="Tell the participants about the meeting"> </div> <div class="form-group"> <label for="name" class="control-label">Your Name</label> <input type="text" ng-model="meeting.name" class="form-control" id="name" placeholder="Your name"> </div> <div class="form-group"> <label for="email" class="control-label">E-mail address</label> <input type="text" ng-model="meeting.email" class="form-control" id="email" placeholder="Your email address"> </div> <input type="button" ng-click="sendEmail()" value="Send Email" name=""> </form> </div>'),a.put("views/step2.html",'<div class="container"> <div class="row"> <div class="col-sm-6"> <form class="form"> <div class="form-group"> <label for="date" class="control-label">Date</label> <pre>Selected date is: <em>{{datepicker | date:\'fullDate\' }}</em></pre> <div style="display:inline-block; min-height:290px"> <uib-datepicker id="date" ng-model="datepicker" class="well well-sm" datepicker-options="datepickerOptions"></uib-datepicker> </div> </div> <div class="form-group"> <label for="beginHour" class="control-label">Metting start at </label> <uib-timepicker id="beginHour" ng-model="startTime" ng-change="changed()"></uib-timepicker> <label class="contorl-label"> For </label> <input type="number" name="" ng-model="howLong"> <label class="contorl-label"> hours </label> </div> <div class="form-group"> <input type="button" class="btn btn-primary" ng-click="addDate()" value="Add" name=""> </div> </form> </div> <div class="col-sm-6"> <label class="control-label">Date List</label> <div ui-sortable ng-model="meeting.dates"> <p class="input-group" ng-repeat="dateItem in meeting.dates" style="padding:5px 10px;cursor:move"> <input class="form-control" value="{{dateItem.dateCh}} - {{dateItem.hourCh}} - for {{dateItem.howLongCh}} hours" type="text"> <span class="input-group-btn"> <button class="btn btn-danger" ng-click="removeDate($index)" aria-label="Remove">X</button> </span> </p> </div> </div> </div> </div>'),a.put("views/step3.html",'<div class="container"> <h4>Select participants</h4> <form role="form" ng-submit="addParticipant()"> <div class="row"> <div class="input-group"> <input type="text" placeholder="Name" ng-model="paticipantName" class="form-contorl"> <input type="text" placeholder="Email" ng-model="paticipantEmail" class="form-contorl"> <span class="input-group-btn"> <input type="submit" class="btn btn-primary" value="Add"> </span>  </div> </div> </form> <div ui-sortable ng-model="meeting.participants"> <p class="input-group" ng-repeat="participantItem in meeting.participants" style="padding:5px 10px;cursor:move"> <input class="form-control" value="{{ participantItem.name }} - {{ participantItem.email }}" disabled> <span class="input-group-btn"> <button class="btn btn-danger" ng-click="removeParticipant($index)" aria-label="Remove">X</button> </span> </p> </div> </div>'),a.put("views/summary.html",'<div class="container"> <h3>Summary</h3> <p><label>Event topic : {{ meeting.topic }}</label></p> <p><label>Participants : </label> <ul> <li ng-repeat="part in meeting.participants">{{ part.name }}</li> </ul> </p> <p> <label>Dates : </label> <ul> <li ng-repeat="date in meeting.dates">{{date.dateCh}} / {{date.hourCh}} / {{date.howLongCh}}</li> </ul> </p> <p><button type="button" class="btn btn-success" ng-click="saveMeeting()">Save meeting</button></p> </div>')}]);