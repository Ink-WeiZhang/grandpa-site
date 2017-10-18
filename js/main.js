/*
TODO Youtube video regex: /^(https?\:\/\/)?((www\.)?youtube\.com|youtu\.?be)\/.+$/
*/
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
    const loginEmail = document.getElementById('loginEmail');
    const loginPassword = document.getElementById('loginPassword');
    const btnLogin = document.getElementById('login-submit');
    const btnLogOut = document.getElementById('logout-submit');

    //Sign Up Elements
    const signUpName = document.getElementById('signUpName');
    const signUpEmail = document.getElementById('signUpEmail');
    const signUpPassword = document.getElementById('signUpPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const btnsignUp = document.getElementById('register-submit');

    function writeUserData(user, email) {
        firebase.database().ref('users/' + user).set({
            displayName: user,
            email: email
        });
        console.log('User added to Database');
    }

    //Login Event
    btnLogin.addEventListener('click', e => {
        //Get username and pass
        const username = loginEmail.value;
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
        const name = signUpName.value;
        const email = signUpEmail.value;
        const password = signUpPassword.value;
        const confirmpassword = confirmPassword.value;

        // Confirm password authentication
        if (password == confirmpassword) {

            //SignIn Authentication
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function(user) {
                    writeUserData(name, email);

                    //Update Disply-name
                    user.updateProfile({
                      displayName: name
                    })
                }, function(error) {
                    var errorCode = error.code;
                    switch (errorCode) {
                        // Weak password authentication
                        case 'auth/weak-password':
                            alert('The password is too weak.');
                            break;
                            // Duplicate email authentication
                        case 'auth/email-already-in-use':
                            alert('The email is already in use.');
                            break;
                            // Invalid email authentication
                        case 'auth/invalid-email':
                            alert('The email is invalid.');
                            break;
                        default:
                            console.error(error);
                            break;
                    }
                });
        } else {
            console.log('passwords don\'t match');
        }
    });

    //Log Out Event
    btnLogOut.addEventListener('click', e => {
        firebase.auth().signOut();
    });

    //Log in log
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {

            console.log(firebaseUser);

            //User information
            var user = firebase.auth().currentUser;
            var name;

            if (user != null) {
                name = user.displayName;
            }

            //Get Eelements
            const ulList = document.getElementById('list');
            const nameObject = document.getElementById('name');

            //Content Display
            nameObject.innerText = name;

            //Create references
            const dbRefObject = firebase.database().ref().child('users');
            const dbRefList = dbRefObject.child(name)

            //Sync databse value additions
            dbRefList.on('child_added', snap => {
                const li = document.createElement('li');
                li.id = snap.key;
                li.innerText = snap.key + ": " + snap.val();
                ulList.appendChild(li);
            });

            //Sync database value changes
            dbRefList.on('child_changed', snap => {
                const liChanged = document.getElementById(snap.key);
                liChanged.innerText = snap.key + ": " + snap.val();
            });

            //Sync database value removals
            dbRefList.on('child_removed', snap => {
                const liToRemove = document.getElementById(snap.key);
                liToRemove.remove();
            });

        } else {
            console.log('not logged in');
        }
    });

});
