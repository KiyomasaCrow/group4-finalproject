<template>
  <div class="home-container">
    <div class="textbox welcome-box">
      <h2>Benvenuto!</h2>
      <p>Ti trovi nella home di questo progetto e-commerce.</p>
    </div>

    <div class="textbox description-box">
      <h2>Descrizione del progetto</h2>
      <p>
        Questo progetto è un'applicazione e-commerce sviluppata con Vue 3 e TypeScript,
        che permette agli utenti di navigare tra diversi prodotti tech e gestire un carrello digitale.
      </p>
    </div>

    <div class="textbox developers-box">
      <h2>Developers</h2>
      <ul>
        <li>Roberto Dimatteo</li>
        <li>Danilo Licciardello</li>
        <li>Amedeo Ruggiero</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// Per ora nessuna logica particolare
</script>

<style scoped>
.home-container {
  max-width: 800px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.textbox {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  color: var(--text-color);
}

.textbox h2 {
  margin-bottom: 0.8rem;
  color: var(--text-color);
}

.textbox p, .textbox ul {
  color: var(--text-muted);
  line-height: 1.5;
}

.textbox ul {
  padding-left: 1.2rem;
  list-style-type: disc;
}
</style>
