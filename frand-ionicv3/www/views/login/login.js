'Use Strict';
angular.module('App').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup,$firebaseAuth , $firebaseObject,$log, Auth, FURL, Utils,ngFB) {
  $scope.loginUser={};

  //var ref = new Firebase(FURL);
  var auth = $firebaseAuth();
  //firebase.initializeApp(FURL);
  var ref = firebase.database().ref();
  var userkey = "";
  $scope.loginUser={};

  $scope.signIn = function (user) {
    $log.log("sent");
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {

      $log.log("User ID: " + authData);
       Utils.hide();
      $state.go('menu.frands');
      $log.log("Starter page","Home");

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };


  $scope.fbSignIn = function() {

    ngFB.login({scope: 'email'}).then(function (response) {

      if (response.status === 'connected') {
        console.log('Facebook login succeeded', response);
        var credentials = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
        console.log(credentials);
        return firebase.auth().signInWithCredential(credentials);
      }
    }).then(function (firebaseUser) {
      Auth.facebookFirebase(firebaseUser.uid);
      console.log(firebaseUser);
      console.log("Signed in as:", firebaseUser.uid);
      $scope.loginUser=firebaseUser;
      console.log("LOOOOOOOOL");
      console.log($scope.loginUser);
      $state.go('menu.frands');
      return $scope.loginUser

    })
      .catch(function (error) {
        console.log("error:")
        console.error("Authentication failed:", error);
      });

  }




  // firebase.auth().onAuthStateChanged(function(user){
  //   $scope.user1= user;
  //   console.log("auth State Changed");
  //   console.log($scope.user1);
  // })
  //


// $scope.loginWithGoogle =  function(){
//   var provider = new firebase.auth.GoogleAuthProvider();
//
//  firebase.auth().signInWithPopup(provider).then(function(result) {
//
//     $log.log("Authenticated successfully with payload:", angular.toJson(result));
//     $state.go('home');
//
//   })
//   .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
//   $log.error("error:", angular.toJson(error));
// });
//   ;
//   };
//
// */


//   $scope.loginWithFacebook =  function(){
//     var provider = new firebase.auth.FacebookAuthProvider();
//
//     firebase.auth().signInWithPopup(provider).then(function(result) {
//
//
//       // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//       var token = result.credential.accessToken;
//       // The signed-in user info.
//       var user = result.user;
//
//
//       $log.log("Authenticated successfully with payload:", angular.toJson(result));
//     $state.go('home');
//
//   })
//   .catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
//   $log.error("error:", angular.toJson(error));
// });
//   ;
//   };


/* SEEMS NOT WORKING WELL
  $scope.loginWithTwitter =  function(){
    var provider = new firebase.auth.FacebookAuthProvider();

 firebase.auth().signInWithPopup(provider).then(function(result) {

    $log.log("Authenticated successfully with payload:", angular.toJson(result));
    $state.go('home');

  })
  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
  $log.error("error:", angular.toJson(error));
});
  ;
  };
*/

});
