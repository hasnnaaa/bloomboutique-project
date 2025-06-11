<template>
  <HeaderComponent mode="admin" />
  <div class="admin-dashboard">
    <div class="welcome-header">
      <h1>Selamat Datang Admin!</h1>
      <p>Kerja kerasmu hari ini menentukan kesuksesan besok. Semangat, Admin hebat.</p>
    </div>

    <div class="orders-container">
      <div class="order-list-card">
        <h2>Pesanan Masuk</h2>
        <div v-if="pendingOrders.length === 0" class="empty-state">
          Belum ada pesanan baru.
        </div>
        <ul v-else>
        <li v-for="order in pendingOrders"
          :key="order.id"
          class="order-item-wrapper"
          @mouseleave="handleMouseLeave()"
          :class="{ 'is-pinned': expandedOrderId === order.id }">

        <div class="order-item clickable"
          @mouseenter="handleMouseEnter(order.id)"
          @click="pinDetails(order.id)">
        <div>
          <div class="order-name">{{ order.name }}</div>
          <div class="order-detail">Rp {{ order.amount.toLocaleString() }} - {{ order.paymentMethod }}</div>
        </div>
          <button @click.stop="completeOrder(order.id)" class="complete-button" title="Tandai sebagai selesai">
            ✓
          </button>
        </div>

        <div v-if="isDetailsVisible(order.id)" class="order-extra-details">
        <p><strong>Email:</strong> {{ order.email }}</p>
        <p><strong>No. WhatsApp:</strong> {{ order.whatsApp }}</p>
        </div>
      </li>
      </ul>
      </div>

      <div class="order-list-card">
        <h2>Pesanan Selesai</h2>
        <div v-if="completedOrders.length === 0" class="empty-state">
          Belum ada pesanan yang diselesaikan.
        </div>
        <ul v-else>
          <li v-for="order in completedOrders" :key="order.id" class="order-item completed">
            <div>
              <div class="order-name">{{ order.name }}</div>
              <div class="order-detail">Rp {{ order.amount.toLocaleString() }} - {{ order.paymentMethod }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/header/HeaderComponent.vue'; // <-- TAMBAHKAN INI
import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, query, onSnapshot, doc, updateDoc, orderBy } from 'firebase/firestore';

// Siapkan dua "wadah" untuk pesanan
const pendingOrders = ref([]);
const completedOrders = ref([]);
const expandedOrderId = ref(null);
const hoveredOrderId = ref(null);

// Dipanggil saat mouse masuk ke area item
const handleMouseEnter = (orderId) => {
  hoveredOrderId.value = orderId;
};

// Dipanggil saat mouse keluar dari area item
const handleMouseLeave = () => {
  hoveredOrderId.value = null;
};

// Dipanggil saat item di-klik, untuk mengunci/melepas kunci
const pinDetails = (orderId) => {
  if (expandedOrderId.value === orderId) {
    expandedOrderId.value = null; // Jika sudah terkunci, lepas kuncinya
  } else {
    expandedOrderId.value = orderId; // Jika belum, kunci item ini
  }
};

// Fungsi untuk mengecek apakah detail harus ditampilkan
const isDetailsVisible = (orderId) => {
  // Tampilkan jika di-hover ATAU jika di-klik/pin
  return hoveredOrderId.value === orderId || expandedOrderId.value === orderId;
};

// Fungsi untuk menandai pesanan sebagai selesai
const completeOrder = async (orderId) => {
  console.log('Completing order:', orderId);
  const orderRef = doc(db, "orders", orderId);
  try {
    await updateDoc(orderRef, {
      status: 'completed'
    });
    console.log('Order status updated successfully');
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// onMounted akan berjalan saat komponen pertama kali dimuat
onMounted(() => {
  // Kita buat query untuk mengambil data dari koleksi 'orders', diurutkan berdasarkan tanggal
  const q = query(collection(db, "orders"), orderBy('orderDate', 'desc'));

  // onSnapshot akan "mendengarkan" setiap perubahan data di Firestore secara real-time
  onSnapshot(q, (querySnapshot) => {
    // Kosongkan wadah setiap kali ada data baru untuk menghindari duplikasi
    pendingOrders.value = [];
    completedOrders.value = [];

    querySnapshot.forEach((doc) => {
      const order = { id: doc.id, ...doc.data() };

      // Pisahkan data berdasarkan statusnya
      if (order.status === 'pending') {
        pendingOrders.value.push(order);
      } else if (order.status === 'completed') {
        completedOrders.value.push(order);
      }
    });
  });
});
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
  font-family: sans-serif;
  padding-top: 90px;
}

.welcome-header {
  margin-bottom: 30px;
}

.orders-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.order-list-card {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

h2 {
  margin-top: 0;
}

ul {
  list-style: none;
  padding: 0;
}

.order-item-wrapper {
  background-color: white;
  border-radius: 6px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  overflow: hidden;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
}

.order-item.clickable {
  cursor: pointer;
}

.order-extra-details {
  padding: 0 15px 15px 15px;
  border-top: 1px solid #eee;
  background-color: #fafafa;
}

.order-extra-details p {
  margin: 8px 0;
  font-size: 14px;
}

.order-extra-details strong {
  color: #333;
}

.order-item.completed {
  opacity: 0.6;
}

.order-name {
  font-weight: 600;
}

.order-detail {
  font-size: 14px;
  color: #666;
}

.complete-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-weight: bold;
}
.empty-state {
  color: #888;
  text-align: center;
  padding: 20px;
}
</style>
