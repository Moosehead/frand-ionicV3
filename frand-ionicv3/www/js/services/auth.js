angular.module('App').factory('Auth', function(FURL, $log,$state,$firebaseAuth, $firebaseArray, $firebaseObject, Utils) {

	//var ref = new Firebase(FURL);

  firebase.initializeApp(FURL);
	//var auth = $firebaseAuth(ref);
  var ref = firebase.database().ref();
  //var auth = $firebaseObject(ref);
  var auth = $firebaseAuth();

  var userDB = firebase.database().ref("users")

	var Auth = {

		user: {},

    login: function(user) {
      return auth.$signInWithEmailAndPassword(
        user.email, user.password
      );
    },

    createProfile: function(uid, user) {
      var profile = {
				id: uid,
        email: user.email,
				registered_in: Date()
      };

      // If you want insert more data should modify register.html and modify your object.

      /*
      var profile = {
				id: uid,
        name: user.name,sdasd
        lastname: user.lastname,
        address: user.address,
        email: user.email,
				registered_in: Date()
      };
      */

      var messagesRef = $firebaseArray(firebase.database().ref().child("users"));
      messagesRef.$add(profile);
      $log.log("User Saved");
    },

    register: function(user) {
      return auth.$createUserWithEmailAndPassword(user.email, user.password)
        .then(function(firebaseUser) {
          console.log("User created with uid: " + firebaseUser.uid);
          Auth.createProfile(firebaseUser.uid,user);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    logout: function() {
      auth.$signOut();
			console.log("Logged Out");
    },

		resetpassword: function(email) {
			return auth.$sendPasswordResetEmail(
				  email
				).then(function() {
					Utils.alertshow("Success.","Key was sent to email.");
				  //console.log("Password reset email sent successfully!");
				}).catch(function(error) {
					Utils.errMessage(error);
				  //console.error("Error: ", error.message);
				});
    },

    // travelBidsFirebaseRef.child('user/'+user.uid).set(user, callback);
    
      facebookFirebase: function(uid){

      var specificUser= firebase.database().ref("users/"+uid);

      specificUser.once("value").then(function(snapshot){
        if (snapshot.exists()==true){
          
        }else{
          ref.child("users/"+uid).set({"uid":uid,}).then(function(success){
            
            
          }).catch(function (error) {
            

          })


          }

      })

    },

    // facebookAuth: function () {
    //   ngFB.login({ scope: 'email' }).then(
    //     function (response) {
    //       if (response.status === 'connected') {
    //         console.log('Facebook login succeeded', response);
    //
    //         var credential = firebase.auth.FacebookAuthProvider.credential(
    //           response.authResponse.accessToken);
    //
    //         firebase.auth().signInWithCredential(credential).catch(function (error) {
    //           // Handle Errors here.
    //           var errorCode = error.code;
    //           var errorMessage = error.message;
    //           // The email of the user's account used.
    //           var email = error.email;
    //           // The firebase.auth.AuthCredential type that was used.
    //           var credential = error.credential;
    //           // ...
    //         });
    //
    //       } else {
    //         alert('Facebook login failed');
    //       }
    //     });
    // },


		changePassword: function(user) {
			return auth.$changePassword({email: user.email, oldPassword: user.oldPass, newPassword: user.newPass});
		},

    signInWithProvider: function(provider) {
      return Auth.signInWithPopup('google');
    }
	};
	return Auth;

});


