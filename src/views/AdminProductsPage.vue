<template>
  <div>
    <HeaderComponent mode="admin" />
    <div class="admin-layout"> <AdminSidebar /> <main class="main-content"> <div class="admin-container"> <h1>Manajemen Produk</h1>

          <div class="card">
            <h2>Tambah Katalog Baru</h2>
            <form @submit.prevent="addProduct">
              <div class="form-group">
                <label for="productName">Nama Buket</label>
                <input id="productName" type="text" v-model="newProduct.name" placeholder="Contoh: Buket Mawar Merah" required>
              </div>
              <div class="form-group">
                <label for="productDescription">Deskripsi</label>
                <textarea id="productDescription" v-model="newProduct.description" placeholder="Deskripsi singkat tentang buket..." required></textarea>
              </div>
              <button type="submit" class="submit-button">Tambah Produk</button>
            </form>
          </div>

          <div class="card">
            <h2>Daftar Katalog Saat Ini</h2>
            <div v-if="products.length === 0" class="empty-state">
              Belum ada produk yang ditambahkan.
            </div>
            <ul v-else>
              <li v-for="product in products" :key="product.id">
                <div class="product-info">
                  <strong>{{ product.name }}</strong>
                  <p>{{ product.description }}</p>
                </div>
                <button @click="deleteProduct(product.id)" class="delete-button" title="Hapus produk">Hapus</button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, addDoc, onSnapshot, serverTimestamp, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import HeaderComponent from '@/components/header/HeaderComponent.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue'; // <-- BARIS INI DITAMBAHKAN

const products = ref([]);
const newProduct = ref({ name: '', description: '' });

// Mengambil dan mendengarkan data produk secara real-time
onMounted(() => {
  const q = query(collection(db, "products"), orderBy('createdAt', 'desc'));
  onSnapshot(q, (snapshot) => {
    products.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  });
});

// Fungsi untuk menambah produk baru
const addProduct = async () => {
  if (!newProduct.value.name || !newProduct.value.description) {
    alert('Nama dan deskripsi produk tidak boleh kosong.');
    return;
  }
  try {
    await addDoc(collection(db, "products"), {
      name: newProduct.value.name,
      description: newProduct.value.description,
      createdAt: serverTimestamp()
    });
    // Kosongkan form setelah berhasil
    newProduct.value.name = '';
    newProduct.value.description = '';
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// Fungsi untuk menghapus produk
const deleteProduct = async (productId) => {
  if (confirm('Apakah kamu yakin ingin menghapus produk ini?')) {
    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  }
};
</script>

<style scoped>
/* Pastikan CSS layout untuk admin-layout dan main-content ada di sini
   jika kamu belum memindahkannya ke file CSS global (misal: App.vue atau main.css) */
.admin-layout {
  display: flex; /* Atur sidebar dan konten sejajar */
  min-height: 100vh; /* Pastikan layout mengisi tinggi viewport */
}

.main-content {
  flex-grow: 1;
  padding: 90px 30px 30px 30px; /* padding-top sesuaikan tinggi header */
  background-color: #f0f2f5; /* Warna latar belakang yang sedikit berbeda untuk main content */
}

.admin-container {
  max-width: 900px; /* Lebar maksimum untuk konten utama */
  margin: 0 auto; /* Tengah secara horizontal */
  padding: 0; /* Hapus padding agar tidak tumpang tindih dengan main-content padding */
  font-family: sans-serif;
}
.card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 25px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
}
input[type="text"], textarea {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}
textarea {
  min-height: 100px;
  resize: vertical;
}
.submit-button, .delete-button {
  cursor: pointer;
  padding: 10px 15px;
  border: none;
  border-radius: 6px;
  color: rgb(255, 255, 255);
  font-weight: 500;
}
.submit-button {
  background-color: rgb(115, 90, 89);
}
.delete-button {
  background-color: #dc3545;
  font-size: 12px;
  color:#ffffff;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 15px;
  background: white;
  margin-bottom: 8px;
  border-radius: 4px;
}
.product-info p {
  margin: 5px 0 0 0;
  font-size: 14px;
  color: #666;
}
.empty-state {
  text-align: center;
  color: #888;
  padding: 20px;
}
</style>
