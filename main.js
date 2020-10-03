const signupForm = document.getElementById('signup-form');
const signinForm = document.getElementById('signin-form');
const logOut = document.getElementById('logout');
const signIn = document.getElementById('signin');
const signUp = document.getElementById('signup');
const posts = document.getElementById('posts');

signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    auth.createUserWithEmailAndPassword(email, password).then(() => {
        signupForm.reset();
        $('#signUpModal').modal('hide');
    }).catch(error => {
        console.log(error.message);
    });
});

signinForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    auth.signInWithEmailAndPassword(email, password).then(() => {
        signinForm.reset();
        $('#signInModal').modal('hide');
    }).catch(error => {
        alert(error.message);
    });
});

logOut.addEventListener('click', function (e) {
    e.preventDefault();
    auth.signOut().then(() => {
        alert('Log Out successfuly');
    }).catch(error => {
        alert(error.message);
    });

});


auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(" User is signed in.");

        logOut.style.display ='block';
        signIn.style.display ='none';
        signUp.style.display ='none';
        posts.innerHTML = 'Load data...';
        let data = '';
        fs.collection('posts').get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id);
                data += `
                        <li class="list-group-item list-group-item-action">
                            <h5>${doc.data().title}</h5>
                            <p>${doc.data().description}</p>
                        </li>
                        `;

            });

            posts.innerHTML = data;
        });

        // ...
    } else {
        // User is signed out.
        // ...
        console.log(" User is signed out.");
        logOut.style.display ='none';
        signIn.style.display ='block';
        signUp.style.display ='block';
        posts.innerHTML = '<p class="alert alert-warning" role="alert"> Inicie sesión </p>';
    }
});
