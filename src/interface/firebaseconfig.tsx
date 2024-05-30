import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3_YSF37bgNgTJR7TvSGG0bSFrMYMOBQo",
  authDomain: "bingogamehistory.firebaseapp.com",
  projectId: "bingogamehistory",
  storageBucket: "bingogamehistory.appspot.com",
  messagingSenderId: "728821496010",
  appId: "1:728821496010:web:5b19400a3ec04365fadc33",
  measurementId: "G-14RLV4HSWX"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };