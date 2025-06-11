import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import PaymentPage from '../views/PaymentPage.vue'
import HomePage from '../views/HomePage.vue'
import LoginPage from '../views/LoginPage.vue'
import RegistrationPage from '../views/RegistrationPage.vue';
import OrderSuccessPage from '../views/OrderSuccessPage.vue';
import AdminDashboardPage from '../views/AdminDashboardPage.vue';
import AdminProductsPage from '../views/AdminProductsPage.vue';
import CatalogPage from '../views/CatalogPage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/Payment',
    name: 'Payment',
    component: PaymentPage,
    meta: { requiresAuth:true }
  },
  {
    path: '/HomePage',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegistrationPage
  },
  {
    path: '/order-success',
    name: 'OrderSuccess',
    component: OrderSuccessPage
  },
  {
  path: '/admin/dashboard',
  name: 'AdminDashboard',
  component: AdminDashboardPage,
  meta: { requiresAuth: true, requiresAdmin: true } // <-- KITA TAMBAHKAN TANDA BARU
  },
  {
  path: '/admin/products',
  name: 'AdminProducts',
  component: AdminProductsPage,
  meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
  path: '/catalog',
  name: 'Catalog',
  component: CatalogPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const user = await getCurrentUser();

  if (requiresAuth && !user) {
    // user belum login, ke /login
    alert("Anda harus login terlebih dahulu.");
    next('/login');
  } else if (requiresAdmin && user) {
    // sudah login, cek rolenya
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists() && userDoc.data().role === 'admin') {
      // admin, izinkan masuk
      next();
    } else {
      // bukan admin, ke halaman utama
      alert("Halaman ini hanya untuk admin!");
      next('/');
    }
  } else {
    next();
  }
});

// import db dan fungsi firestore yang diperlukan di atas
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

export default router;
