'Use Strict';
angular.module('App')

.controller('frandsCtrl', ['$scope', '$stateParams', '$state','$localStorage','$location','$http','$ionicPopup','$firebaseObject','Auth','ngFB','FURL','Utils','mainFrandFactory',

// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, ngFB ,FURL, Utils,mainFrandFactory) {
  $scope.room_list={};
  $scope.fireUser={};

  ngFB.api({
    path: '/me',
    params: {fields: 'id,name,picture'}
    }).then(
    function (user) {
      $scope.user = user;
    },
    function (error) {
      alert('Facebook error: ' + error.error_description);
    });

  $scope.updateInfo=function(){
    var user = firebase.auth().currentUser;
    if (user != null) {
      $scope.fireUser = user;
      console.log("firebase user stored info: ")
      console.log($scope.fireUser.uid);
      // $ionicLoading();
      mainFrandFactory.updateUser($scope.fireUser.uid,$scope.fireUser).then(function(data){
        console.log("updated user");
        // $ionicLoading.hide();
      },function(err){
        Utils.hide();
        Utils.errMessage(err);
        // $ionicLoading.hide();

      });
    }

  };
  
  $scope.switchChat=function(){
    
  }

  $scope.retrieveRoom = function(){
    // var user_char = {};
    var ref = firebase.database().ref("rooms").on('value',function(snapshot){
      snapshot.forEach(function(child){
        var key = child.key;
        var value = child.val();
        // console.log(value);
        // room_list.push(value);
        $scope.room_list[key] = value;
      });
      // console.log(user_char);
    },function(error){

      
    });
    console.log($scope.room_list);
    return ref;
  };



  $scope.createRoomSwitch = function(){

    $state.go('menu.createRoom');

  };
  $scope.switchChat=function(){
    $state.go('menu.chatroom');


  };


  $scope.logout=function(){

    firebase.auth().signOut().then(function() {
      Auth.logout();
      $state.go('login');
    }, function(error) {
      // An error happened.
    });
  }

}])
















