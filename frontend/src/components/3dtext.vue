<template>
    <div class="threejs-container" ref="container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
    if (!container.value) return

    // Scene setup
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(
        75,
        container.value.clientWidth / container.value.clientHeight,
        0.1,
        1000
    )
    camera.position.set(0, 0, 5.2)

    // Renderer with alpha for transparent background
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.value.clientWidth, container.value.clientHeight)
    renderer.setClearColor(0x000000, 0) // fully transparent
    container.value.appendChild(renderer.domElement)

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(0, 2, 5)
    scene.add(directionalLight)

    const hemiLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5)
    scene.add(hemiLight)

    // Array per tenere i materiali per l'animazione pulsing
    const pulsingMaterials: THREE.MeshStandardMaterial[] = []

    // Colori da interpolare
    const darkBlue = new THREE.Color('#0d47a1')
    const vinaccia = new THREE.Color(0x800020)

    // Load 3D model (.glb)
    const loader = new GLTFLoader()
    loader.load('/3Dtext_3.glb', (gltf) => {
        const model = gltf.scene

        // Ruota modello di 90° sull'asse X
        model.rotation.x = Math.PI / 2

        model.scale.set(4, 1, 4)

        // Cambia materiale a MeshStandardMaterial blu scuro lucido e memorizza materiali
        model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                const mat = new THREE.MeshStandardMaterial({
                    color: 0x0d47a1,
                    metalness: 0.7,
                    roughness: 0.3,
                    emissive: darkBlue.clone(),
                    emissiveIntensity: 0.6,
                })
                mesh.material = mat
                mesh.castShadow = true
                mesh.receiveShadow = true
                pulsingMaterials.push(mat)
            }
        })

        scene.add(model)
    })

    const clock = new THREE.Clock()

    // Luce rosa mobile da destra a sinistra
    const pinkLight = new THREE.DirectionalLight(0xff66cc, 1)
    pinkLight.position.set(5, 0, 5)
    scene.add(pinkLight)

    function animate() {
        requestAnimationFrame(animate)

        const elapsed = clock.getElapsedTime()

        // Oscillazione della luce rosa da destra a sinistra
        const xPos = Math.sin(elapsed * 1.5) * 5
        pinkLight.position.set(xPos, 0, 5)

        renderer.render(scene, camera)
    }
    animate()

})
</script>

<style scoped>
.threejs-container {
    width: 250px;
    height: 100px;
    background: transparent;
    /* sfondo trasparente */
    margin: 0 auto;
    border: none;
}
</style>
