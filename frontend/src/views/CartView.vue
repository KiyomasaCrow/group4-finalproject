<script setup lang="ts">
import { useCart } from '@/components/cart/useCart'
import { ref } from 'vue'

const { cart, increaseQuantity, decreaseQuantity, removeFromCart, totalPrice, clearCart } =
  useCart()

const formatPrice = (price: number) => price.toFixed(2)

// Stato per il messaggio di acquisto
const purchaseMessage = ref<string>('')
const purchasedProducts = ref<Array<{ name: string; quantity: number }>>([])
const purchaseTotal = ref<number>(0)

function buyNow() {
  if (cart.value.length === 0) return
  // Crea elenco prodotti acquistati
  purchasedProducts.value = cart.value.map((item: any) => ({
    name: item.product.name,
    quantity: item.quantity,
  }))
  purchaseTotal.value = cart.value.reduce(
    (acc: number, item: any) => acc + item.product.price * item.quantity,
    0,
  )
  purchaseMessage.value = 'Complimenti per il tuo acquisto!'
  clearCart()
}
</script>

<template>
  <div class="cart">
    <h1>Carrello</h1>

    <div v-if="cart.length === 0 && !purchaseMessage" class="empty-message">
      <p>Il carrello è vuoto.</p>
    </div>

    <div v-else-if="!purchaseMessage" class="cart-list">
      <div v-for="item in cart" :key="item.product.product_id" class="cart-card">
        <div class="card-content">
          <div class="product-info">
            <h3>{{ item.product.name }}</h3>
            <p>Prezzo articolo: €{{ formatPrice(item.product.price) }}</p>
            <p>Totale: €{{ formatPrice(item.product.price * item.quantity) }}</p>
          </div>

          <div class="actions">
            <div class="quantity-control">
              <span>{{ item.quantity }}</span>
              <button @click="decreaseQuantity(item.product.product_id)">−</button>
              <button @click="increaseQuantity(item.product.product_id)">+</button>
            </div>
            <button class="remove-btn" @click="removeFromCart(item.product.product_id)">
              Rimuovi
            </button>
          </div>
        </div>
      </div>

      <div class="total-price">Totale carrello: € {{ formatPrice(totalPrice) }}</div>

      <div class="purchase-section">
        <button class="buy-now-btn" @click="buyNow">Acquista Ora</button>
      </div>
    </div>
    <div v-else class="purchase-message">
      <p>{{ purchaseMessage }}</p>
      <p class="font-bold">Totale speso: €{{ formatPrice(purchaseTotal) }}</p>
      <ul>
        <li v-for="prod in purchasedProducts" :key="prod.name">
          {{ prod.name }} x{{ prod.quantity }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cart {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  color: var(--text-color);
  font-size: 2rem; /* aumentata da default a 2.8rem */
  font-weight: 600;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  color: var(--text-color);
  padding: 1.2rem 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
}

.card-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.product-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-color);
}

.product-info p {
  margin: 0.3rem 0;
  color: var(--text-muted);
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantity-control button {
  background-color: var(--card-bg);
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.quantity-control button:hover {
  background-color: var(--card-hover-bg);
}

.remove-btn {
  background-color: var(--card-bg);
  color: var(--text-error, #a00);
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
  width: 100px;
  height: 40px;
}

.remove-btn:hover {
  background-color: var(--card-hover-bg);
}

.total-price {
  margin-top: 2rem;
  text-align: right;
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-color);
}

.empty-message {
  text-align: center;
  font-size: 1.1rem;
  color: var(--text-color);
}

.purchase-section {
  margin-top: 2rem;
  text-align: center;
}

.buy-now-btn {
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background 0.3s;
}

.buy-now-btn:hover {
  background-color: var(--primary-hover-color);
}

.buy-btn {
  display: block;
  margin: 2rem auto 0 auto;
  background-color: var(--card-bg);
  color: var(--text-color);
  border: 1px solid var(--border-color);
  padding: 0.8rem 2rem;
  border-radius: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.buy-btn:hover {
  background-color: var(--card-hover-bg);
}

.purchase-message {
  text-align: center;
  margin-top: 2rem;
  color: var(--text-color);
  font-size: 1.2rem;
}

.purchase-message ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
}

.purchase-message li {
  color: var(--text-muted);
  font-size: 1rem;
}

.purchased-products {
  margin-top: 1rem;
  text-align: left;
}

.purchased-products h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
  color: var(--text-color);
}

.purchased-products ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.purchased-products li {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  color: var(--text-color);
}
</style>
