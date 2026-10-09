import {firebaseConfig} from './analytics-config.js';
export async function getFirebaseApp(){const sdk=await import('https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js');return sdk.getApps().length?sdk.getApp():sdk.initializeApp(firebaseConfig)}
