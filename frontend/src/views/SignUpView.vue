<template>
  <div class="signup-page">
    <div class="signup-container">
      <div class="background"></div>
      <form @submit.prevent="signupUser(name, email, password)">
        <h3>Registrazione</h3>

        <label for="name">Nome completo</label>
        <input type="text" placeholder="Il tuo nome" id="name" v-model="name" required />

        <label for="email">Email</label>
        <input type="email" placeholder="La tua email" id="email" v-model="email" required />

        <label for="password">Password</label>
        <input
          type="password"
          placeholder="La tua password"
          id="password"
          v-model="password"
          required
        />

        <!-- Messaggio di errore -->
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <button type="submit" :disabled="!isFormValid || isLoading">
          {{ isLoading ? 'Registrazione...' : 'Registrati' }}
        </button>

        <!-- Separatore -->
        <div class="divider">
          <span>oppure</span>
        </div>

        <!-- Bottone login -->
        <button type="button" class="login-button" @click="goToLogin">
          Hai già un account? Accedi
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { signIn } from '@/services/accountApi'
import { useRouter } from 'vue-router'
import { useUser } from '@/composable/useUser'

const router = useRouter()
const { setUser } = useUser()

const name = ref('')
const email = ref('')
const password = ref('')
const isLoading = ref(false)

// Validazione del form
const isFormValid = computed(() => {
  return name.value.trim() !== '' && email.value.trim() !== '' && password.value.length >= 6
})

const errorMessage = ref('')

const signupUser = async (name: string, email: string, password: string) => {
  if (!isFormValid.value) {
    errorMessage.value = 'Per favore compila tutti i campi correttamente.'
    return
  }

  errorMessage.value = '' // Reset error message
  isLoading.value = true

  try {
    const response = await signIn(name, email, password)
    console.log('Utente registrato:', response)

    // Salva solo la proprietà user dal response
    setUser(response.user)

    // Piccolo delay per assicurarsi che il composable sia aggiornato
    await new Promise(resolve => setTimeout(resolve, 100))

    // Reindirizza alla home
    router.push('/')
  } catch (error: any) {
    console.error('Errore nella registrazione:', error)

    // Estrai il messaggio di errore dal backend
    if (error.response?.data?.message) {
      errorMessage.value = error.response.data.message
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Errore durante la registrazione. Riprova.'
    }
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
*,
*:before,
*:after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.signup-page {
  min-height: 100vh;
  background-color: #080710;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.signup-container {
  position: relative;
  width: 100%;
  max-width: 430px;
  min-height: 640px;
  height: auto;
}

.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

form {
  min-height: 100%;
  width: 100%;
  max-width: 400px;
  background-color: rgba(255, 255, 255, 0.13);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 40px rgba(8, 7, 16, 0.6);
  padding: 50px 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

form * {
  font-family: 'Poppins', sans-serif;
  color: #ffffff;
  letter-spacing: 0.5px;
  outline: none;
  border: none;
}

form h3 {
  font-size: 32px;
  font-weight: 500;
  line-height: 42px;
  text-align: center;
  margin-bottom: 20px;
}

label {
  display: block;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
}

input {
  display: block;
  height: 45px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 14px;
  font-weight: 300;
  transition: all 0.3s ease;
}

input:focus {
  background-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

::placeholder {
  color: #e5e5e5;
}

button {
  margin-top: 30px;
  width: 100%;
  background-color: #ffffff;
  color: #080710;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

/* Separatore */
.divider {
  position: relative;
  text-align: center;
  margin: 25px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.divider span {
  background: rgba(255, 255, 255, 0.13);
  padding: 0 15px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  position: relative;
  z-index: 1;
}

/* Bottone login */
.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.login-button:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.login-icon {
  font-size: 18px;
  animation: sparkle 2s ease-in-out infinite;
}

@keyframes sparkle {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Messaggio di errore */
.error-message {
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #fca5a5;
  padding: 12px;
  border-radius: 6px;
  margin: 15px 0;
  font-size: 14px;
  text-align: center;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .signup-page {
    padding: 10px;
  }

  .signup-container {
    max-width: 100%;
    min-height: auto;
  }

  form {
    min-height: auto;
    max-width: 100%;
    padding: 30px 20px;
    position: relative;
    top: 0;
    left: 0;
    transform: none;
  }

  form h3 {
    font-size: 28px;
    margin-bottom: 15px;
  }

  input {
    height: 45px;
    font-size: 16px; /* Previene zoom su iOS */
  }

  button {
    padding: 12px 0;
    font-size: 16px;
  }

  .divider {
    margin: 20px 0;
  }
}

@media (max-width: 480px) {
  .signup-page {
    padding: 5px;
  }

  form {
    padding: 25px 15px;
  }

  form h3 {
    font-size: 24px;
  }

  label {
    font-size: 14px;
    margin-top: 15px;
  }

  input {
    height: 40px;
    font-size: 14px;
  }

  button {
    padding: 10px 0;
    font-size: 14px;
  }
}
</style>
