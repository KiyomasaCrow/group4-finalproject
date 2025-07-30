<template>
  <div class="threejs-container" ref="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!container.value) return

  // Scene setup
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, container.value.clientWidth / container.value.clientHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(container.value.clientWidth, container.value.clientHeight)
  container.value.appendChild(renderer.domElement)

  // Add ambient and directional lights for better text shading
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
  directionalLight.position.set(0, 2, 5)
  scene.add(directionalLight)

  // Add a light grey plane as background
  const planeGeometry = new THREE.PlaneGeometry(160, 90)
  const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)
  plane.position.z = -1.5
  scene.add(plane)

  // Load font and create 3D text letters
  const fontLoader = new FontLoader()
  fontLoader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font: any) => {
    const text = 'Welcome!'
    const letters: THREE.Mesh[] = []
    const letterSpacing = 0.8
    for (let i = 0; i < text.length; i++) {
      const geometry = new TextGeometry(text[i], {
        font,
        size: 1,
        height: 0.15,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelSegments: 5
      })
      const material = new THREE.MeshStandardMaterial({
        color: 0x2196f3,
        metalness: 0.5,
        roughness: 0.3,
        emissive: 0x000000,
        emissiveIntensity: 0.1
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.x = (i - text.length / 2) * letterSpacing
      scene.add(mesh)
      letters.push(mesh)
    }

    // Simple render loop (no animation)
    function render() {
      renderer.render(scene, camera)
    }
    render()
  })
})
</script>

<style scoped>
.threejs-container {
  width: 800px;
  height: 400px;
  background: #f0f0f0;
  margin: 0 auto;
  border: none;
}
</style>

