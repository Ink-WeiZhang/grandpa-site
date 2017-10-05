
$(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDmaOeZHpED-rovVs3wOEJYcktlN40us-M",
    authDomain: "fir-8037d.firebaseapp.com",
    databaseURL: "https://fir-8037d.firebaseio.com",
    projectId: "fir-8037d",
    storageBucket: "fir-8037d.appspot.com",
    messagingSenderId: "677029590717"
  };
  firebase.initializeApp(config);

    "use strict";
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    // Firebase Authentication

    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
    const signupEmail = document.getElementById('signupEmail');
    const signupUsername = document.getElementById('signupUsername');
    const signupPassword = document.getElementById('signupPassword');
    const btnLogin = document.getElementById('login-submit');
    const btnSignUp = document.getElementById('register-submit');
    const btnLogOut = document.getElementById('logout-submit');

    btnLogin.addEventListener('click', e => {
      //Get username and pass
      const username = loginUsername.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();

      //Sign In
      const promise = auth.signInWithusernameAndPassword(username, pass);
      promise.catch(e => console.log(e.message));

    });

    btnSignUp.addEventListener('click', e => {
      //Get email and pass
      //TODO: Check for real email
      const email = signupEmail.value;
      const pass = signupPassword.value;
      const auth = firebase.auth();

      //Sign in
      const promise = auth.createUserWithEmailAndPassword(email , pass);
       promise.catch(e => console.log(e.message));
    });

    btnLogOut.addEventListener('click', e => {
      firebase.auth().signOut();
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser) {
        console.log(firebaseUser);
          }
      else {
        console.log('not logged in');
      }
    });

});
