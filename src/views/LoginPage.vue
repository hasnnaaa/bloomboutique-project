<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Login</h1>

      <form @submit.prevent="handleLogin">
        <div class="input-group">
          <input type="email" placeholder="Email Address" v-model="email" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" required />
        </div>
        <button type="submit">Login</button>
      </form>

      <p class="switch-form-text">
        Belum punya akun? <router-link to="/register">Daftar di sini</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";

const router = useRouter();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;
    console.log('User yang login:', user.email);

    // LANGKAH BARU: Cek role user di Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists() && userDoc.data().role === 'admin') {
      // Jika dokumen ada DAN role-nya adalah 'admin'
      alert('Selamat datang, Admin!');
      router.push('/admin/dashboard'); // Arahkan ke dashboard admin
    } else {
      // Jika user biasa atau tidak punya role
      router.push('/'); // Arahkan ke halaman utama
    }

  } catch (error) {
    console.error('Terjadi error saat login:', error);
    alert('Login Gagal: ' + error.message);
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
  padding: 20px;
}

.auth-card {
  background: var(--vt-c-white);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  color: var(--color-heading);
  font-size: 32px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 30px;
}

.input-group input {
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  font-size: 16px;
  box-sizing: border-box;
  background-color: var(--color-background-soft);
  color: var(--color-text);
}

/* Tombol Login */
button {
  width: 100%;
  padding: 15px;
  background-color: var(--brand-brown);
  color: var(--vt-c-white);
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5c4847;
}

/* Teks "Belum punya akun?" */
.switch-form-text {
  margin-top: 25px;
  font-size: 14px;
  color: #666;
}

.switch-form-text a {
  color: var(--brand-brown);
  font-weight: 600;
  text-decoration: none;
}

.switch-form-text a:hover {
  text-decoration: underline;
}
</style>
