<template>
  <div>
    <HeaderComponent />
    <div class="catalog-container">
      <h1 class="page-title">Katalog Produk Kami</h1>
      <p class="page-subtitle">Temukan rangkaian bunga yang sempurna untuk setiap momen spesial Anda.</p>

      <div class="external-catalog-link">
        <a href="https://drive.google.com/drive/folders/12yYhLIs3x3uVbG82bHSmyO_hV7n9c2yn?usp=sharing" target="_blank" rel="noopener noreferrer" class="drive-button">
          Lihat Katalog PDF di Google Drive
        </a>
      </div>

      <div v-if="products.length === 0" class="loading-state">
        Memuat produk...
      </div>

      <ul v-else class="product-grid">
        <li v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
// Pastikan path import ini benar sesuai lokasi file ProductCard.vue-mu
import ProductCard from '@/components/catalog/ProductCard.vue';

const products = ref([]);

onMounted(() => {
  const q = query(collection(db, "products"), orderBy('createdAt', 'desc'));
  onSnapshot(q, (snapshot) => {
    products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});
</script>

<style scoped>
.catalog-container {
  max-width: 1200px;
  margin: 90px auto;
  padding: 20px;
  font-family: sans-serif;
}
.page-title {
  text-align: center;
  font-size: 2.5rem;
  font-family: 'Playfair Display', serif;
  margin-bottom: 10px;
}
.page-subtitle {
  text-align: center;
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 40px;
}
.product-grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}
.loading-state {
  text-align: center;
  padding: 50px;
  font-size: 1.2rem;
  color: #888;
}

.external-catalog-link {
  text-align: center;
  margin-bottom: 40px; /* Memberi jarak ke grid produk di bawahnya */
}

.drive-button {
  background-color: #f0f0f0;
  color: #444;
  border: 1px solid #ccc;
  padding: 10px 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.drive-button:hover {
  background-color: #e0e0e0;
  border-color: #bbb;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

</style>
