// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyCd6WKjj1gY5x5AmwOV_FpheIQEOpDBpMU",
    authDomain: "my-first-project-a9ce0.firebaseapp.com",
    projectId: "my-first-project-a9ce0",
    storageBucket: "my-first-project-a9ce0.appspot.com",
    messagingSenderId: "122985978566",
    appId: "1:122985978566:web:44d1b8f17f666cf43855c7",
    measurementId: "G-B3D63ZCGWM"
};

firebase.initializeApp(firebaseConfig);
// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/logo512.png'
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});