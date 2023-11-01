import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

/* ====================================================================================================
 * distance Point
 * ==================================================================================================== */

class Circle_01 {
    constructor(radius) {
        this.radius = radius * 0.5;
        this.segment = 360;
        this.init();
    };
    init() {
        this.createMesh();
    };
    createMesh() {
        this.geometry = new THREE.CircleGeometry(this.radius, this.segment);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    look(theta) {
        this.mesh.rotation.set(0, theta, 0);
    }
    position(vec3) {
        const position = vec3.clone();
        this.mesh.position.copy(position);
    };
    update(theta, vec3) {
        this.position(vec3);
        this.look(theta)
    };
};

class Circle_Line_01 {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 0.8;
        this.weight = (radius / 100) * 6;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = 0; i < Math.PI * 2; i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        }
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry);
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: this.weight,
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update(theta, position) {
        // ==========LOOK==========
        this.mesh.rotation.set(0, theta, 0);
        // ==========POSITION==========
        this.mesh.position.copy(position);
    };
};

class Circle_Line_02 {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 1;
        this.weight = (radius / 100) * 4;
        this.angle = (30 * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = this.angle; i < this.angle + ((75 * Math.PI) / 180); i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        }
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry);
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: this.weight,
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update(theta, position) {
        // ==========LOOK==========
        this.mesh.rotation.set(0, theta, 0);
        // ==========POSITION==========
        this.mesh.position.copy(position);
    };
};

class Circle_Line_03 {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 1;
        this.weight = (radius / 100) * 4;
        this.angle = (165 * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = this.angle; i < this.angle + ((165 * Math.PI) / 180); i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        }
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry);
        this.material = new MeshLineMaterial({
            color: 0xffffff,
            lineWidth: this.weight,
        });
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    update(theta, position) {
        this.mesh.rotation.set(0, theta, 0); // 常にカメラの方向を向くように設定
        this.mesh.position.copy(position); // ポジションを惑星に対して一定の距離・角度に設定
    };
};

export class Point_Distance {
    constructor(planet) {
        this.base = planet.computeRadius * 0.22;
        this.theta = planet.alphaRad + (90 * Math.PI) / 180;
        this.phi = (0 * Math.PI) / 180;
        this.speed = planet.computeRevolution;
        this.radius = planet.computeRadius * 4;
        this.init();
    };

    init() {
        this.create();
    };

    create() {
        this.circle_01 = new Circle_01(this.base);
        this.circle_Line_01 = new Circle_Line_01(this.base);
        this.circle_Line_02 = new Circle_Line_02(this.base);
        this.circle_Line_03 = new Circle_Line_03(this.base);
    };

    add(scene) {
        scene.add(this.circle_01.mesh);
        scene.add(this.circle_Line_01.mesh);
        scene.add(this.circle_Line_02.mesh);
        scene.add(this.circle_Line_03.mesh);
    };
    
    update(planet) {
        // ====================POSITION====================
        const look = planet.alphaRad;
        const position = planet.mesh.position.clone();
        this.theta += this.speed;
        position.x += this.radius * Math.sin(this.theta) * Math.cos(this.phi);
        position.y += this.radius * Math.sin(this.theta) * Math.sin(this.phi) - planet.computeRadius * 0.7;
        position.z += this.radius * Math.cos(this.theta);
        // ====================POSITION====================

        this.circle_01.update(look, position);
        this.circle_Line_01.update(look, position);
        this.circle_Line_02.update(look, position);
        this.circle_Line_03.update(look, position);
    };
};
