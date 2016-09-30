function authentication() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user
      console.log(user)

    }).catch(function(error) {

      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      if (errorCode === 'auth/account-exists-with-different-credential') {
        alert('You have already signed up with a different auth provider for that email.');
      } else {
        console.error(error);
      }
    });
  } else {
    firebase.auth().signOut();
  }
  document.getElementById('quickstart-sign-in').disabled = true;
  document.getElementById('container-intro').disabled = true;
}

function initApp() {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      document.getElementById('user-name').textContent = displayName
      document.getElementById('quickstart-sign-in').textContent = 'Cerrar sesión';
    } else {
      // User is signed out.
      document.getElementById('user-name').textContent = ''
      document.getElementById('quickstart-sign-in').textContent = 'Inicia con Facebook';
    }
    document.getElementById('quickstart-sign-in').disabled = false;
    document.getElementById('container-intro').disabled = false;

  });
  document.getElementById('quickstart-sign-in').addEventListener('click', authentication, false);
}
window.onload = function() {
  initApp();
};