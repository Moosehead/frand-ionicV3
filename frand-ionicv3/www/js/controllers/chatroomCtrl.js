/**
 * Created by Moosa on 2016-12-04.
 */
/**
 * Created by Moosa on 2016-08-16.
 */
'Use Strict';

angular.module('App')

  .controller('chatroomCtrl', ['$scope', '$stateParams', '$state','$localStorage','$location','$http','$ionicPopup','$firebaseObject','$ionicScrollDelegate','Auth','FURL','Utils','mainFrandFactory',
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
    function ($scope, $stateParams, $state, $localStorage, $location,$http,$ionicPopup, $firebaseObject,$ionicScrollDelegate ,Auth, FURL, Utils,mainFrandFactory) {
      $scope.hideTime = true;

      var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

      $scope.sendMessage = function() {
        alternate = !alternate;

        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');

        $scope.messages.push({
          userId: alternate ? '12345' : '54321',
          text: $scope.data.message,
          time: d
        });

        delete $scope.data.message;
        $ionicScrollDelegate.scrollBottom(true);

      };


      $scope.inputUp = function() {
        if (isIOS) $scope.data.keyboardHeight = 216;
        $timeout(function() {
          $ionicScrollDelegate.scrollBottom(true);
        }, 300);

      };

      $scope.inputDown = function() {
        if (isIOS) $scope.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
      };

      $scope.closeKeyboard = function() {
        // cordova.plugins.Keyboard.close();
      };


      $scope.data = {};
      $scope.myId = '12345';
      $scope.messages = [];
      
    }])
