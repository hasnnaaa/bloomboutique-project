<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1>Signup</h1>

      <form @submit.prevent="handleRegister">
        <div class="input-group">
          <input type="email" placeholder="Email Address" v-model="email" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Password" v-model="password" required />
        </div>
        <div class="input-group">
          <input type="password" placeholder="Confirm Password" v-model="confirmPassword" required />
        </div>
        <button type="submit">Signup</button>
      </form>

      <p class="switch-form-text">
        Already a member? <router-link to="/login">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref(''); // Variabel tambahan untuk konfirmasi password

const handleRegister = async () => {
  // Langkah PENTING: Pastikan password dan konfirmasinya sama
  if (password.value !== confirmPassword.value) {
    alert("Error: Password dan Konfirmasi Password tidak cocok!");
    return; // Hentikan fungsi jika tidak cocok
  }

  try {
    // Menggunakan fungsi registrasi dari Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);

    alert('Registrasi Berhasil! Silakan login dengan akun baru Anda.');
    console.log('User baru dibuat:', userCredential.user);

    // Setelah berhasil daftar, arahkan user ke halaman login
    router.push('/login');

  } catch (error) {
    console.error('Terjadi error saat registrasi:', error);
    alert('Registrasi Gagal: ' + error.message);
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

/* Judul "Signup" */
h1 {
  color: var(--color-heading);
  font-size: 32px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 30px;
}

/* Input field */
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

/* Tombol Signup */
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

/* Teks "Already a member?" */
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
