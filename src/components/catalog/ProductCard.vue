<template>
  <div class="bunga-card">
    <div class="inner">
      <h3 class="judul-card">{{ product.name }}</h3>

      <div class="center">
        <p>{{ product.description }}</p>
      </div>

      <div class="foot">
        <button @click="goToPayment" class="cta">Pesan</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// Menerima satu objek 'product' dari komponen induk (misal: CatalogPage)
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const goToPayment = () => {
  // Saat tombol "Pesan" diklik, kita kirim nama produk ke halaman Payment
  router.push({
    name: 'Payment',
    query: {
      productName: props.product.name,
      // Jika nanti produkmu punya harga, kita bisa kirim juga
      // price: props.product.price
    }
  });
};
</script>

<style scoped>
/* Style ini kita ambil dari BungaCard.vue, tapi disesuaikan untuk satu kartu */
.bunga-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.bunga-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}
.inner {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: center;
  padding: 16px;
}
.judul-card {
  font-size: 22px;
  font-weight: bold;
  margin: 0 0 15px 0;
  color: rgb(10, 36, 75);
  font-family: 'Playfair Display', serif;
}
.center {
  flex-grow: 1;
  font-size: 14px;
  line-height: 1.6;
  color: rgb(10, 36, 75);
  margin-bottom: 20px;
}
.foot {
  margin-top: auto;
}
.cta {
  text-decoration: none;
  color: white;
  font-weight: bold;
  display: block;
  padding: 12px;
  background-color: rgb(115, 90, 89);
  border-radius: 8px;
  border: none;
  width: 100%;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 14px;
  transition: background-color 0.3s ease;
}
.cta:hover {
  background-color: rgb(90, 70, 69);
}
</style>
