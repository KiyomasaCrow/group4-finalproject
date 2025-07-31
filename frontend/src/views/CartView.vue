<script setup lang="ts">
import { useCart } from '@/components/cart/useCart'

const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalPrice
} = useCart()

const formatPrice = (price: number) => price.toFixed(2)
</script>

<template>
  <div class="cart">
    <h1>Carrello</h1>

    <div v-if="cart.length === 0" class="empty-message">
      <p>Il carrello è vuoto.</p>
    </div>

    <div v-else class="cart-list">
      <div
        v-for="item in cart"
        :key="item.product.product_id"
        class="cart-card"
      >
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

      <div class="total-price">
        Totale carrello: € {{ formatPrice(totalPrice) }}
      </div>
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
  color: #333;
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
  background-color: #e0e0e0;
  border: none;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.quantity-control button:hover {
  background-color: #d0d0d0;
}

.remove-btn {
  background-color: #e0e0e0;
  color: #a00;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s;
  width: 100px;
  height:40px;
}

.remove-btn:hover {
  background-color: #d0d0d0;
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
  color: var(--text-muted);
}
</style>
