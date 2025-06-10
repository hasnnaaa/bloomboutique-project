// src/components/header/HeaderComponent.vue

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

export default {
  name: 'HeaderComponent',
  data() {
    return {
      isLoggedIn: false, // anggap user belum login
      auth: null
    };
  },
  mounted() {
    this.auth = getAuth();
    onAuthStateChanged(this.auth, (user) => {
      // Fungsi ini akan berjalan setiap kali status login berubah
      if (user) {
        // User login
        this.isLoggedIn = true;
      } else {
        // User logout
        this.isLoggedIn = false;
      }
    });
  },
  methods: {
    handleLogout() {
      signOut(this.auth).then(() => {
        // Arahkan ke halaman home setelah logout berhasil
        this.$router.push('/');
      }).catch((error) => {
        console.error('Logout error', error);
      });
    }
  }
}
</script>

<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="navbar-header">
      <div class="logo-container">
        <router-link to="/">
            <img class="logo" src="@/assets/images/logo.png" alt="logo" height="50">
        </router-link>
      </div>

      <ul class="menu">
        <li><router-link to="/">Home</router-link></li>

        <li v-if="!isLoggedIn">
          <router-link to="/login">Login / Register</router-link>
        </li>

        <li v-else>
          <a @click="handleLogout" style="cursor: pointer;">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: #ffffff;
  transition: all ease 0.4s;
}

.navbar-header {
  padding: 10px 15px;
  background-color: #ffffff;
  transition: all ease 0.4s;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.logo-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.logo {
  height: 50px;
  width: auto;
  max-width: 100%;
  object-fit: contain;
}

.menu {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  font-size: 16px;
  margin: 0;
  flex: 1;
  justify-content: flex-end;
}

.menu li a {
  text-decoration: none;
  color: rgb(115, 90, 89);
}

.animate {
  padding: 10px 10px;
  background-color: #f8f8f8;
  transition: all ease 0.4s;
}
</style>
