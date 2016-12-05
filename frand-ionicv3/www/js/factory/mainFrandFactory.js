/**
 * Created by Moosa on 2016-08-17.
 */
angular.module('App').factory('mainFrandFactory', function(FURL, $log, $firebaseAuth, $firebaseArray, $firebaseObject, Utils, ngFB) {

  var fDB = firebase.database().ref();

  var frandFactory = {

    create:function(roomInfo){
      var dataKey = fDB.child('rooms').push().key;

      var updates = {};

      updates['rooms/'+ dataKey]=roomInfo;

      return fDB.update(updates);
    },

    // createMembers:function(roomInfo){
    //   var dataKey = fDB.child('rooms').push().key;
    //
    //   var updates = {};
    //
    //   updates['members/'+ dataKey]=roomInfo;
    //
    //   return fDB.update(updates);
    // },

    updateUser:function(uid,info){

      var postData= {
        "id": uid,
        "name" : info.displayName,
        "email": info.email,
        "updated": new Date()
      };

    var updates={};
      updates['users/'+uid]=postData;
      return fDB.update(updates);

    },
    // updateRoom:function(){
    //   var mio=null;
    //   // var data =fDB.child('rooms');
    //   var ref = firebase.database().ref("rooms").on('value',function(snapshot){
    //     // var rooms= snapshot.val();
    //     // console.log(rooms);
    //     // mio = snapshot.val();
    //   },function(error){
    //
    //   });
    //
    //   console.log(ref);
    //
    //   return ref;
    //
    //
    //
    // },

  }

  return frandFactory;

});

/** RANDOM CRAP **/

// /**
//  * Created by Moosa on 2016-08-17.
//  */
//
// define(['App'],function(App){
// App.factory('mainFrandFactory',['FURL','$log','$firebaseAuth','$firebaseArray','$firebaseObject','Utils','ngFB',
//   function(FURL, $log, $firebaseAuth, $firebaseArray, $firebaseObject, Utils, ngFB) {
//
//     //var auth = $firebaseAuth(ref);
//     // var fDB = firebase.database().ref();
//     //
//     // var frandFactory = {
//     //   create:function(roomInfo){
//     //     var dataKey = fDB.child('rooms').push().key;
//     //     var updates = {};
//     //     updates['rooms/'+ dataKey]=roomInfo;
//     //
//     //     return fDB.update(updates);
//     //   }
//     //
//     // }
//     //
//     // return frandFactory;
//
//
//     function getFBID() {
//
//       ngFB.api({
//         path: '/me',
//         params: {fields: 'id,name'}
//       }).then(
//         function (user) {
//           console.log(user);
//           return user
//         },
//         function (error) {
//           alert('Facebook error: ' + error.error_description);
//         });
//     }
//
//
//     return {
//
//       getFBID: getFBID
//
//     }
//
//
//   }])});
