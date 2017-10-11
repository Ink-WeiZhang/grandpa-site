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

    //Login Elements
    const loginUsername = document.getElementById('loginUsername');
    const loginPassword = document.getElementById('loginPassword');
    const btnLogin = document.getElementById('login-submit');
    const btnLogOut = document.getElementById('logout-submit');

    //Sign Up Elements
    const signUpUsername = document.getElementById('signUpUsername');
    const signUpEmail = document.getElementById('signUpEmail');
    const signUpPassword = document.getElementById('signUpPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const btnsignUp = document.getElementById('register-submit');

    //Login Event
    btnLogin.addEventListener('click', e => {
        //Get username and pass
        const username = loginUsername.value;
        const pass = loginPassword.value;
        const auth = firebase.auth();

        //Sign In
        const promise = auth.signInWithEmailAndPassword(username, pass);
        promise.catch(e => console.log(e.message));

    });

    //Sign Up Event
    btnsignUp.addEventListener('click', e => {
        /*
        Get email and pass
        TODO: Email verification
        */
        const email = signUpEmail.value;
        const pass = signUpPassword.value;
        const auth = firebase.auth();

        //Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    //Log Out Event
    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    //Log in log
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            console.log(firebaseUser);
        } else {
            console.log('not logged in');
        }
    });
    //#Content Display

    //Get Eelements
    const preObject = document.getElementById('users');
    const ulList = document.getElementById('list');

    //Create references
    const dbRefObject = firebase.database().ref().child('users');
    const dbRefList = dbRefObject.child('user1')

    //Sync objet changes
    dbRefObject.on('value', snap => {
        preObject.innertext = JSON.stringify(snap.val(), null, 3);
    })

    //Sync list changes
    dbRefList.on('child_added', snap => {
      const li = document.createElement('li');
      li.id = snap.key;
      li.innerText = snap.val();
      ulList.appendChild(li);
    });

    //Sync database value changes
    dbRefList.on('child_changed', snap => {
      const liChanged = document.getElementById(snap.key);
      liChanged.innerText = snap.val();
    });

    //Sync database value removals
    dbRefList.on('child_removed', snap => {
      const liToRemove = document.getElementById(snap.key);
      liToRemove.remove();
    });

});
