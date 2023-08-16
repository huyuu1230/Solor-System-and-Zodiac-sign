import * as THREE from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

// ----------度からラジアンに変換
export function toRad(deg) {
    return (deg * Math.PI) / 180;
};
// ----------ラジアンから度に変換
function toDeg(rad) {
    return rad * (180 / Math.PI);
};
// ------------------------------惑星
export class Planet {
    constructor(earthRadius, earthRvolutionAlpha, earthRevolutionDelta, earthRotation, sunRadius, au, name, radius, distance, alpha, delta, revolution, rotation) {
        this.name = name;
        this.radius = radius;
        this.distance = distance;
        this.revolution = revolution;
        this.rotation = rotation;
        // -----大きさ
        this.r = earthRadius * radius;
        this.w = 10;
        this.h = 10;
        // -----座標
        this.or = au * distance + sunRadius;
        this.alpha = alpha;
        this.delta = delta;
        this.alphaRad = (this.alpha * Math.PI) / 180;
        this.deltaRad = (this.delta * Math.PI) / 180;
        this.x = this.or * Math.cos(this.alphaRad) * Math.cos(this.deltaRad);
        this.y = this.or * Math.sin(this.deltaRad);
        this.z = this.or * Math.cos(this.deltaRad) * Math.sin(this.alphaRad);
        // -----公転
        this.revolutionAlpha = earthRvolutionAlpha / revolution;
        this.revolutionDelta = earthRevolutionDelta;
        // -----自転
        this.rotationX = (0 * Math.PI) / 180;
        this.rotationY = (0 * Math.PI) / 180;
        this.rotationSpeed = earthRotation / rotation;
        this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.name = name;
    };
    add(scene) {
        scene.add(this.mesh);
    };
    // ----------惑星をアニメーションさせるメソッド
    update() {
        // -----公転
        this.alphaRad -= this.revolutionAlpha;
        this.x = this.or * Math.cos(this.alphaRad) * Math.cos(this.deltaRad);
        this.y = this.or * Math.sin(this.deltaRad);
        this.z = this.or * Math.cos(this.deltaRad) * Math.sin(this.alphaRad);
        this.mesh.position.set(this.x, this.y, this.z);
        // -----自転
        this.rotationY += this.rotationSpeed;
        this.mesh.rotation.y = this.rotationY;
    };
};

// ------------------------------軌道
export class Orbit {
    constructor(sunRadius, au, distance) {
        this.distance = au * distance + sunRadius;
        this.orbitPoints = [];
        this.orbitPointNum = 3600;
        for (let i = 0; i <= this.orbitPointNum; i++) {
            const rad = ((360 / this.orbitPointNum) * i * Math.PI) / 180;
            const x = this.distance * Math.cos(rad);
            const y = 0;
            const z = this.distance * Math.sin(rad);
            const p = new THREE.Vector3(x, y, z);
            this.orbitPoints.push(p);
        }
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.orbitPoints
        );
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
    add(scene) {
        scene.add(this.mesh);
    };
};

// ------------------------------星座
export class Sign {
    constructor(raddius, au, alpha, delta) {
        this.r = raddius;
        this.w = 10;
        this.h = 10;
        this.or = 100 * au;
        this.alpha = alpha;
        this.delta = delta;
        this.alphaRad = (this.alpha * Math.PI) / 180;
        this.deltaRad = (this.delta * Math.PI) / 180;
        this.x = this.or * Math.cos(this.deltaRad) * Math.cos(this.alphaRad);
        this.y = this.or * Math.sin(this.deltaRad);
        this.z = this.or * Math.cos(this.deltaRad) * Math.sin(this.alphaRad);
        this.geometry = new THREE.SphereGeometry(this.r, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
    };
    add(scene) {
        scene.add(this.mesh);
    };
};

// ------------------------------星座の軌跡
export class Trajectory {
    constructor(vectors) {
        this.starsPoints = [];
        for (let i = 0; i < vectors.length; i++) {
            this.starsPoints.push(vectors[i]);
        };
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.starsPoints);
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
    add(scene) {
        scene.add(this.mesh);
    };
};

// ------------------------------テキスト
export class PlanetText {
    constructor(text, font, size, x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.geometry = new TextGeometry(text, {
            font: font,
            size: size,
            height: 1,
        });
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
    };
    add(scene) {
        scene.add(this.mesh);
    };
    update(x, y, z,camera) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.quaternion.copy(camera.quaternion);
    };
};