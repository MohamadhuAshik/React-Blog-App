import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";




const firebaseConfig = {
    apiKey: "AIzaSyCd6WKjj1gY5x5AmwOV_FpheIQEOpDBpMU",
    authDomain: "my-first-project-a9ce0.firebaseapp.com",
    projectId: "my-first-project-a9ce0",
    storageBucket: "my-first-project-a9ce0.appspot.com",
    messagingSenderId: "122985978566",
    appId: "1:122985978566:web:44d1b8f17f666cf43855c7",
    measurementId: "G-B3D63ZCGWM"
};

const vapidKey = "BIa-luS3kYHW-BZqpTTvIrSxaVgAbjLdD_eBUKkJbzZT4UQ8z_q5r9_Xa852bfhgm5qRgTLyZS-ggo-85NIHUcw"


const app = initializeApp(firebaseConfig)

const messaging = getMessaging(app)

export const requestFcmToken = async () => {
    try {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
            const registration = await navigator.serviceWorker.register('firebase-messaging-sw.js');
            console.log('Service Worker registered:', registration);

            // Get the token
            const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: registration });
            if (token) {
                console.log('FCM Token:', token);
                return token;
            } else {
                console.log('No registration token available. Request permission to generate one.');
                throw new Error('No FCM token received');
            }
        }
    } catch (err) {
        console.error("Error getting FCM Token:", err);
        throw err;
    }

    // return Notification.requestPermission().then((permission) => {
    //     if (permission === "granted") {
    //         return getToken(messaging, { vapidKey })
    //     } else {
    //         throw new Error("Notification Not granted")
    //     }
    // }).catch((err) => {
    //     console.log("Err getting Notification", err)
    //     throw err
    // })
}