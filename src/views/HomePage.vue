<script>
// Kita import semua komponen yang dibutuhkan
import HeaderComponent from '../components/header/HeaderComponent.vue'
import BodyComponent from '../components/body/BodyComponent.vue'

export default {
  name: 'HomePage',
  components: {
    HeaderComponent,
    BodyComponent
  }
  // Bagian setup() dan onMounted() yang lama kita hapus karena sudah tidak diperlukan.
  // Pengaturan judul dan favicon sudah lebih baik ditangani di index.html
}
</script>

<template>
  <div>
    <header>
      <div class="wrapper">
        <HeaderComponent />
      </div>
    </header>

    <main>
      <BodyComponent />

      <div class="full-catalog-link">
        <router-link to="/catalog" class="cta-button-large">Lihat Katalog Lebih Lengkap &rarr;</router-link>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Style yang sudah ada sebelumnya kita biarkan */
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

/* Style untuk tombol baru kita */
.full-catalog-link {
  text-align: center;
  padding: 60px 20px; /* Beri jarak yang cukup */
  background-color: #fdfaf8; /* Warna latar yang sangat lembut */
}

/* Style untuk kondisi normal (kursor TIDAK diarahkan) */
.cta-button-large {
  background-color: #735A59;     /* Latar belakang terang (krem/putih) */
  color: #fdfaf8;      /* Teks berwarna coklat tua agar terlihat */
  border: 1px solid var(--brand-brown); /* Beri border tipis agar lebih tegas */

  padding: 18px 40px;
  text-decoration: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  display: inline-block;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  /* Transisi untuk semua properti yang akan berubah */
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

/* Style untuk kondisi SAAT kursor diarahkan */
.cta-button-large:hover {
  background-color: var(--brand-brown); /* Latar belakang menjadi coklat tua */
  color: #735A59;/* Teks menjadi putih */
  transform: translateY(-2px);          /* Efek sedikit terangkat */
}


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
