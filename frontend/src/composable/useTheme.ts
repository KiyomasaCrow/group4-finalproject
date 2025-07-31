import { ref, onMounted } from 'vue'

const isDark = ref(false)

export function useTheme() {
  const toggleTheme = () => {
    isDark.value = !isDark.value
    updateHtmlClass()
    localStorage.setItem('darkmode', isDark.value ? 'true' : 'false')
  }

  const updateHtmlClass = () => {
    const html = document.documentElement
    if (isDark.value) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }

  onMounted(() => {
    const saved = localStorage.getItem('darkmode')
    if (saved === 'true') {
      isDark.value = true
      updateHtmlClass()
    }
  })

  return { isDark, toggleTheme }
}
