var firebase = require('./firebase.js');
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDjwSDDC7GU_-xaMusPd4I4Fbl7_4BTOmk",
    authDomain: "mapboard-c8eba.firebaseapp.com",
    databaseURL: "https://mapboard-c8eba.firebaseio.com",
    projectId: "mapboard-c8eba",
    storageBucket: "mapboard-c8eba.appspot.com",
    messagingSenderId: "639968017275"
};
firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("login");
  } else {
    console.log("need login");
    firebase.auth().signInWithEmailAndPassword("portars@naver.com","test123");
    // firebase.auth().signInAnonymously().catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // ...
    // });

  }
});

var database = firebase.database();

var arrayButton = document.querySelectorAll('button.refresh');
for (var button of arrayButton) {
    button.onclick = (e) => {
        var iframe = e.target.parentElement.parentElement.querySelector('iframe');
        if (iframe)
            iframe.src = iframe.src;
    }
}



arrayButton = document.querySelectorAll('button.mode');
for (var button of arrayButton) {
    button.onclick = (e) => {
        var div = e.target.parentElement.parentElement;
        if (div.className.split(' ').indexOf('small') >= 0) {
            div.className = "full";
            e.target.textContent = "full";
            for (var div2 of document.querySelectorAll('div.small:not(.hide)')) {
                div2.className += " hide";
            }
        } else {
            e.target.textContent = "small";
            div.className = "small";
            for (var div2 of document.querySelectorAll('div.small.hide')) {
                div2.className = div2.className.replace(/[ |]hide/, "");
            }
        }
    }
}
