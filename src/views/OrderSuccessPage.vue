<template>
  <div class="success-container">
    <h1>🎉Pesanan Berhasil!</h1>
    <p>Terima kasih telah melakukan pemesanan di BloomBoutique.</p>
    <p>Pesanan Anda sedang kami proses dan akan segera kami kirimkan.</p>
    <router-link to="/" class="back-to-home">Kembali ke Halaman Utama</router-link>
  </div>
</template>

<style scoped>
.success-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 80vh;
  padding: 20px;
  background-color: #F5F1EE;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}
h1 {
  color: var(--brand-brown);
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
}
p {
  font-size: 18px;
  margin-bottom: 10px;
}
.back-to-home {
  margin-top: 30px;
  padding: 10px 20px;

  background-color: transparent;
  color: var(--brand-brown);
  border: 2px solid var(--brand-brown);
  font-weight: 600;

  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.back-to-home:hover {
  background-color: var(--brand-brown);
  color: white;
}
</style>
