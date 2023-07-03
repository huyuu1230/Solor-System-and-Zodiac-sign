<template>
  <div>
    <canvas id="index"></canvas>
  </div>
</template>


<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

onMounted(() => {
  const canvas = document.querySelector("#index");
  // -----クリック関連
  let mouse;
  let raycaster;

  let scene, camera, renderer;
  let width = window.innerWidth;
  let height = window.innerHeight;

  function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#index"),
    });
    
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // -----camera
    camera = new THREE.PerspectiveCamera(100, width / height, 5000, 0);
    camera.position.set(0, 5000, 20000);
    scene.add(camera);
    

    // -----Orbit_Controls
    document.addEventListener('touchmove',function(e){e.preventDefault();},{passive:false});
    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0,0,0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.5;

    
    // clickEvent
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click',handleClick);

    function handleMouseMove(event) {
      const element = event.currentTarget;
      //canvas上のマウスのXY座標
      const x = event.clientX - element.offsetLeft;
      const y = event.clientY - element.offsetTop;
      //canvasの幅と高さを取得
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      //マウス座標を-1〜1の範囲に変換
      mouse.x = (x / w) * 2 - 1;
      mouse.y = -(y / h) * 2 + 1;
    }

    function handleClick(event){
      console.log('click')
    }

    


    // -----規準となる地球の変数を定義
    const earthRaddius = 1000;
    // 地球の軌道半径
    const earthOrbitRaddius = 12000;
    // 緯度(方位角)の変化する値
    const earthPhiSpeed = toRad(1);
    // 経度(仰角)の変化する値
    const earthThetaSpeed = toRad(1);
    // 自転の速度
    const earthRotation = toRad(1);

    // -----1秒に60回実行される
    // -----６秒で360回

    // ----------惑星を生成するクラス
    class Planet {
      constructor(radius, orbitRadius, phiSpeed, rotation) {
        this.r = earthRaddius * radius;
        if (radius <= 1) {
          this.w = this.r / 70;
          this.h = this.r / 70;
        } else if (radius > 1 && radius <= 5) {
          this.w = this.r / 500;
          this.h = this.r / 500;
        } else {
          this.w = this.r / 500;
          this.h = this.r / 500;
        }
        this.or = earthOrbitRaddius * orbitRadius;
        this.phi = toRad(0);
        this.theta = toRad(0);
        this.phiSpeed = earthPhiSpeed / phiSpeed;
        this.x = this.or * Math.cos(this.phi);
        this.y = this.or * Math.sin(this.theta);
        this.z = this.or * Math.sin(this.phi);
        this.rotationX = toRad(0);
        this.rotationY = toRad(0);
        this.rotationSpeed = earthRotation * rotation
        this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
          color: 0x000000,
          wireframe: true,
        });
        this.planet = new THREE.Mesh(this.geometry, this.material);
        this.planet.position.set(this.x, this.y, this.z);
        scene.add(this.planet);
      }
      // -----軌道を生成するメソッド
      orbit() {
        this.orbitPoints = [];
        this.orbitPointNum = 360;
        for (let i = 0; i <= this.orbitPointNum; i++) {
          const rad = toRad((360 / this.orbitPointNum) * i);
          const x = this.or * Math.cos(rad);
          const y = 0;
          const z = this.or * Math.sin(rad);
          const p = new THREE.Vector3(x, y, z);
          this.orbitPoints.push(p);
        }
        this.orbitGeometry = new THREE.BufferGeometry().setFromPoints(
          this.orbitPoints
        );
        this.orbitMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
        this.orbitMesh = new THREE.Line(this.orbitGeometry, this.orbitMaterial);
        scene.add(this.orbitMesh);
      }
      // -----惑星をアニメーションさせるメソッド
      update() {
        this.phi += this.phiSpeed;
        this.x = this.or * Math.cos(this.phi);
        this.y = this.or * Math.sin(this.theta);
        this.z = this.or * Math.sin(this.phi);
        this.rotationY += this.rotationSpeed;
        this.planet.position.set(this.x, this.y, this.z);
        this.planet.rotation.y = this.rotationY;
      }
    };

    // -----引数
    // radius : 惑星の半径 , 
    // orbitRadius : 軌道の半径 ,
    // phiSpeed : 公転速度 ,
    // rotation : 自転速度
    // -----惑星
    const Mercury = new Planet(0.38, 0.39, 0.24, 1);
    Mercury.orbit();
    const Venus = new Planet(0.95, 0.72, 0.62, 1);
    Venus.orbit();
    const Earth = new Planet(1, 1, 1, 1);
    Earth.orbit();
    const Mars = new Planet(0.53, 1.52, 1.88, 1);
    Mars.orbit();
    const Jupiter = new Planet(11.21, 5.2, 11.9, 1);
    Jupiter.orbit();
    const Saturn = new Planet(9.45, 9.58, 29.4, 1);
    Saturn.orbit();
    const Uranus = new Planet(4.01, 19.2, 83.8, 1);
    Uranus.orbit();
    const Neptune = new Planet(3.88, 30.0, 163.8, 1);
    Neptune.orbit();

    tick();

    

    // 毎フレーム時に実行されるループイベントです
    function tick() {
      // -----Orbit_Controls
      controls.update();
      // -----惑星
      Mercury.update();
      Venus.update();
      Earth.update();
      Mars.update();
      Jupiter.update();
      Saturn.update();
      Uranus.update();
      Neptune.update();

      //マウス位置からまっすぐに伸びる光線ベクトルを生成
      raycaster.setFromCamera(mouse, camera);

      //光線と交差したオブジェクトを取得

      const intersects = raycaster.intersectObjects(scene.children,false);
   

      if (intersects.length > 0) {
        console.log('intersects')
      }



      // -----レンダリング
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    }
  }
  init();
});
</script>

