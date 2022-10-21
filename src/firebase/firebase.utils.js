import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBY5q9wJg4tbNhtgCGWxMDJ7-gvuTlmU2k",
    authDomain: "crwn-clothing-c1a24.firebaseapp.com",
    projectId: "crwn-clothing-c1a24",
    storageBucket: "crwn-clothing-c1a24.appspot.com",
    messagingSenderId: "941692029443",
    appId: "1:941692029443:web:b70260905e7a2073285c36"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const {displayName, email} = userAuth;
        const createAt = new Date();

        try {                               // ako snapshot ne postoji, kreiraju se ovi podaci
            await userRef.set({
                displayName,
                email,
                createAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }
    
    return userRef;
}

firebase.initializeApp(config);
 
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account '});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;