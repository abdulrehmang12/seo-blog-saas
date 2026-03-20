import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "mock-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "mock-auth-domain",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "mock-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "mock-storage-bucket",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "mock-sender",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "mock-app-id"
};

const isMock = firebaseConfig.apiKey === "mock-api-key";

let app: FirebaseApp | undefined;
let auth: Auth | MockAuth;
let db: Firestore | MockFirestore;

interface MockAuth {
  currentUser: null;
  onAuthStateChanged: (cb: (user: unknown) => void) => () => void;
  signInWithEmailAndPassword: () => Promise<{ user: { uid: string } }>;
  createUserWithEmailAndPassword: () => Promise<{ user: { uid: string } }>;
  signOut: () => Promise<void>;
}

interface MockFirestore {
  collection: () => {
    doc: () => {
      set: () => Promise<void>;
      get: () => Promise<{ exists: () => boolean; data: () => { plan: string } }>;
    };
    add: () => Promise<{ id: string }>;
  };
}

if (typeof window !== "undefined" && !getApps().length && !isMock) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else if (isMock) {
  // Mock Firebase for UI preview
  auth = {
    currentUser: null,
    onAuthStateChanged: (cb: (user: unknown) => void) => { cb(null); return () => {}; },
    signInWithEmailAndPassword: async () => ({ user: { uid: 'mock-user' } }),
    createUserWithEmailAndPassword: async () => ({ user: { uid: 'mock-user' } }),
    signOut: async () => {}
  } as unknown as Auth;
  db = {
    collection: () => ({
      doc: () => ({
        set: async () => {},
        get: async () => ({ exists: () => true, data: () => ({ plan: 'free' }) })
      }),
      add: async () => ({ id: 'mock-doc' })
    })
  } as unknown as Firestore;
}

export { app, auth, db, isMock };
