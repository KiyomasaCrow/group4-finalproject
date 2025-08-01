import { ref, watchEffect } from 'vue'

const isDark = ref(false)

const updateHtmlClass = () => {
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
}

export function useTheme() {
  // Inizializzazione immediata
  const saved = localStorage.getItem('darkmode')
  if (saved === 'true') {
    isDark.value = true
  }

  // Applica la classe ogni volta che cambia isDark
  watchEffect(() => {
    updateHtmlClass()
    localStorage.setItem('darkmode', isDark.value ? 'true' : 'false')
  })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
}

document.documentElement.style.setProperty('--bg-color', isDark.value ? '#121212' : '#ffffff')
