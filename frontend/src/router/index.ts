import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProductsView from '@/views/ProductsView.vue'
import UsersView from '@/views/UsersView.vue'
import CartView from '@/views/CartView.vue'
import UsersDetails from '@/components/users/UsersDetails.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutPage from '@/pages/LogoutPage.vue'
import SignUpView from '@/views/SignUpView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/products', name: 'Products', component: ProductsView },
  { path: '/users', name: 'Users', component: UsersView },
  { path: '/users/:id', name: 'UserDetails', component: UsersDetails },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/sign-up', name: 'SignUp', component: SignUpView },
  { path: '/logout', name: 'Logout', component: LogoutPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
