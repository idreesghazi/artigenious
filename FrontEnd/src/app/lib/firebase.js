
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDQiLMZj0jzCM_y-yPF9mON5XLaX3rQP_M",
  authDomain: "artigenious-f34eb.firebaseapp.com",
  projectId: "artigenious-f34eb",
  storageBucket: "artigenious-f34eb.appspot.com",
  messagingSenderId: "1064278080269",
  appId: "1:1064278080269:web:d2ec3fee83799e29968e44",
  measurementId: "G-ZDVBT11FF3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(app);

export { storage };
