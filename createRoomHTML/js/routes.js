angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.frands', {
    url: '/frands',
    views: {
      'side-menu21': {
        templateUrl: 'templates/frands.html',
        controller: 'frandsCtrl'
      }
    }
  })

  .state('menu.profile', {
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('menu.currentFrands', {
    url: '/active',
    views: {
      'side-menu21': {
        templateUrl: 'templates/currentFrands.html',
        controller: 'currentFrandsCtrl'
      }
    }
  })

  .state('menu.frandHistory', {
    url: '/history',
    views: {
      'side-menu21': {
        templateUrl: 'templates/frandHistory.html',
        controller: 'frandHistoryCtrl'
      }
    }
  })

  .state('menu.settings', {
    url: '/settings',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('createRoom', {
    url: '/creatRoom',
    templateUrl: 'templates/createRoom.html',
    controller: 'createRoomCtrl'
  })

$urlRouterProvider.otherwise('/side-menu21/frands')

  

});