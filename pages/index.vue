<template>
    <div>
        <canvas id="index"></canvas>
    </div>
</template>

<script setup>
import * as THREE from "three"

onMounted(() => {
    let scene, camera, renderer;
    let width = window.innerWidth;
    let height = window.innerHeight;

    function init() {

        renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector("#index")
        });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff)

        camera = new THREE.PerspectiveCamera(100, width / height,5000,0);

        camera.position.set(0, 0, +1500)

        // -----Geometry___オブジェクトの形 , 大きさなど
        const geometry = new THREE.SphereGeometry(400, 30, 30);
        // -----Material___オブジェクトの質感 , 色など
        const material = new THREE.MeshBasicMaterial({
            color: 0x000000,
            wireframe: true
        })

        // -----Mesh___Geometry と Materialをまとめて一つのオブジェクトにする
        const box = new THREE.Mesh(geometry, material);

        
        const radius = 800;
        let rad = 90
        const x = radius*2 * Math.cos(rad);
        const y = 0;
        const z = radius * Math.cos(rad);
        box.position.set(x, y, z)
        scene.add(box);

        tick();

        // 毎フレーム時に実行されるループイベントです
        function tick() {
            box.rotation.x += 0.01;
            box.rotation.y += 0.01;

            rad += 0.01;
            const x = radius*2 * Math.cos(rad);
            const y = 0;
            const z = radius * Math.sin(rad);
            box.position.set(x, y, z)

            renderer.render(scene, camera); // レンダリング

            requestAnimationFrame(tick);
        }
    }
    init()
})
</script>

