/**
 * Created by Moosa on 2016-08-16.
 */
'Use Strict';

angular.module('App')

  .controller('createRoomCtrl', ['$scope', '$stateParams', '$state','$localStorage','$location','$http','$ionicPopup','$firebaseObject','Auth','FURL','Utils','mainFrandFactory',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject, Auth, FURL, Utils,mainFrandFactory) {
      $scope.roomInfo={};

      $scope.RoomSwitch = function(){
        $state.go('menu.frands');
      };
      
      $scope.createRoom = function(){
        Utils.show();
        var postData= {
          "name" : $scope.roomInfo.name,
          "size": $scope.roomInfo.size,
          "time": $scope.roomInfo.time,
          "desc": $scope.roomInfo.description,
          "tags": $scope.roomInfo.tags
        }

        mainFrandFactory.create(postData).then(function(data){
          Utils.hide();
          console.log("sucess creating a room");
        },function(err){
          Utils.hide();
          Utils.errMessage(err);
        });


      }

    }])
