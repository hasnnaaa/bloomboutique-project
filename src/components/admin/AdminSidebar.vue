<template>
  <aside class="sidebar">
    <div class="admin-menu">
      <span>Menu</span>
    </div>
    <nav>
      <router-link to="/admin/dashboard" class="nav-link">Dashboard</router-link>
      <router-link to="/admin/products" class="nav-link">Produk</router-link>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background-color: #f8f9fa;
  padding: 90px 30px 30px 30px;
  height: calc(100vh - 70px);
  border-right: 1px solid #ddd;
  flex-shrink: 0;
}
.admin-menu {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px; /* ubah angkanya sesuai kebutuhan */
  font-weight: bold;
}
.nav-link { display: block; padding: 10px 15px; margin-bottom: 10px; text-decoration: none; color: #000000; border-radius: 6px; }
.nav-link.router-link-exact-active { background-color: var(--brand-brown); color: rgb(0, 0, 0); }
</style>
