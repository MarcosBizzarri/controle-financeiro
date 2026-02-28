// Importações necessárias
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChSwhdTqTvoGiHedxlcwXwwV_ojCLXBcE",
  authDomain: "controle-financeiro-5418f.firebaseapp.com",
  projectId: "controle-financeiro-5418f",
  storageBucket: "controle-financeiro-5418f.firebasestorage.app",
  messagingSenderId: "199731436296",
  appId: "1:199731436296:web:0c924c7ac3f29b6ec5aabd",
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
export const db = getFirestore(app);
export const auth = getAuth(app); // 🔥 ISSO FALTAVA