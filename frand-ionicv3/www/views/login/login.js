'Use Strict';
angular.module('App').controller('loginController', function ($scope, $state,$cordovaOauth, $localStorage, $location,$http,$ionicPopup,$firebaseAuth , $firebaseObject,$log, Auth, FURL, Utils,ngFB) {
  //var ref = new Firebase(FURL);
  var auth = $firebaseAuth();
  //firebase.initializeApp(FURL);
  var ref = firebase.database().ref();
  var userkey = "";

  $scope.signIn = function (user) {
    $log.log("sent");
    if(angular.isDefined(user)){
    Utils.show();
    Auth.login(user)
      .then(function(authData) {

      $log.log("User ID: " + authData);
       Utils.hide();
      $state.go('home');
      $log.log("Starter page","Home");

      }, function(err) {
        Utils.hide();
         Utils.errMessage(err);
      });
    }
  };

  $scope.fbSignIn = function(){
    // Utils.show();
    // Auth.facebookAuth().then(function(authData){
    //   Utils.hide();
    //   $state.go('home');
    //   $log.log("facebook page","Home");
    // }, function(err) {
    //   Utils.hide();
    //   Utils.errMessage(err);
    //
    // });
    ngFB.login({ scope: 'email' }).then(
      function (response) {
        if (response.status === 'connected') {
          console.log('Facebook login succeeded', response);

          var credential = firebase.auth.FacebookAuthProvider.credential(
            response.authResponse.accessToken);
          $state.go('home');
          $log.log("Starter page","Home");


          firebase.auth().signInWithCredential(credential).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });

        } else {
          alert('Facebook login failed');
        }
      });
  };



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

/* SEEMS NOT WORKING WELL
  $scope.loginWithFacebook =  function(){
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
