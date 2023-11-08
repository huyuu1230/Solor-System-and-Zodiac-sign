import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from 'three.meshline';

function lerp(x, y, a) {
    return (1 - a) * x + a * y;
};

function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
};

class Line {
    constructor(startVec3, endVec3) {
        this.points = [];
        this.start = startVec3.clone();
        this.end = endVec3.clone();
        this.weight = 1.2;
        this.progress = 0;
        this.count = 0;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = 0; i < 1; i += 1 / 60) {
            const x = lerp(this.start.x, this.end.x, i);
            const y = lerp(this.start.y, this.end.y, i);
            const z = lerp(this.start.z, this.end.z, i);
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        };
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry);
        this.material = new MeshLineMaterial({ color: 0xffffff, lineWidth: this.weight });
        this.mesh = new THREE.Mesh(this.line, this.material);
        this.mesh.geometry.setDrawRange(0, this.count * 6) // LineMeshは頂点が6倍
    };
    add(scene) {
        scene.add(this.mesh);
    };
    update() {
        if (this.progress < 1) {
            this.progress += 1 / 120;
            this.count = easeInOutQuart(this.progress) * 60;
            this.mesh.geometry.setDrawRange(0, this.count * 6) // LineMeshは頂点が6倍
        };
    };
    remove() {
        if (0 < this.progress) {
            this.progress -= 1 / 60;
            this.count = easeInOutQuart(this.progress) * 60;
            this.mesh.geometry.setDrawRange(0, this.count * 6) // LineMeshは頂点が6倍
        };
    };
};

class Circle {
    constructor(radius) {
        this.radius = radius;
        this.segment = 60;
        this.progress = 0;
        this.thetaStart = (180 * Math.PI) / 180;
        this.thetaEnd = (0 * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createMesh();
    };
    createMesh() {
        this.geometry = new THREE.CircleGeometry(this.radius, this.segment, this.thetaStart, this.thetaEnd);
        this.material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    position(vec3) {
        const position = vec3.clone();
        this.mesh.position.copy(position);
    };
    update() {
        if (this.thetaEnd < Math.PI * 2) {
            this.progress += 1 / 120;
            const count = easeInOutQuart(this.progress);
            this.thetaEnd = ((count * 360) * Math.PI) / 180;
            this.mesh.geometry.dispose();
            this.mesh.geometry = new THREE.CircleGeometry(this.radius, this.segment, this.thetaStart, this.thetaEnd);
        };
    };
    remove() {
        if (0 < this.progress) {
            this.progress -= 1 / 60;
            const count = easeInOutQuart(this.progress);
            this.thetaEnd = ((count * 360) * Math.PI) / 180;
            this.mesh.geometry.dispose();
            this.mesh.geometry = new THREE.CircleGeometry(this.radius, this.segment, this.thetaStart, this.thetaEnd);
        };
    };
};

class Sign_head {
    constructor() {
        this.init();
    };
    init() {

    };
    create() {
        this.circle_01 = new Circle(5);
        this.circle_02 = new Circle(5);
        this.circle_03 = new Circle(10);
        this.circle_04 = new Circle(5);
        this.circle_05 = new Circle(5);
    };
    add(scene){
        scene.add(this.circle_01.mesh);
        scene.add(this.circle_02.mesh);
        scene.add(this.circle_03.mesh);
        scene.add(this.circle_04.mesh);
        scene.add(this.circle_05.mesh);
    }
    setPosition() {
        const x = -900 * Math.cos(170 * Math.PI / 180);
        const y = -900 * Math.sin(170 * Math.PI / 180);
        const z = 0;
        const circle1_position = new THREE.Vector3(x,y,z);

        const circle2_position = circle1_position.clone();
        circle2_position.x += 100 * Math.cos(45 * Math.PI  / 180);
        circle2_position.y += 100 * Math.sin(45 * Math.PI  / 180);

        const circle3_position = circle2_position.clone();
        circle3_position.x += 100;

        const circle4_position = circle3_position.clone();
        circle4_position.x += 100 * Math.cos(45 * Math.PI / 180);
        circle4_position.y += 100 * Math.sin(45 * Math.PI / 180);

        const circle5_position = circle4_position.clone();
        circle5_position.x += 150 * Math.cos(-45 * Math.PI / 180);
        circle5_position.y += 150 * Math.cos(-45 * Math.PI / 180);

        this.circle_01.position(circle1_position);
        this.circle_02.position(circle2_position);
        this.circle_03.position(circle3_position);
        this.circle_04.position(circle4_position);
        this.circle_05.position(circle5_position);
    };
    update(){
        this.circle_01.update();
        this.circle_02.update();
        this.circle_03.update();
        this.circle_04.update();
        this.circle_05.update();
    };
    remove(){
        this.circle_01.remove();
        this.circle_02.remove();
        this.circle_03.remove();
        this.circle_04.remove();
        this.circle_05.remove();
    };
};

export class Sign_information {
    constructor(scene) {
        this.scene = scene;
        this.init();
    };
    init() {
        this.create();
        this.add();
    };
    create() {
        const line_01_start = new THREE.Vector3(-900, 100, 0);
        const line_01_end = line_01_start.clone();
        line_01_end.x += 100 * Math.cos(45 * Math.PI / 180);
        line_01_end.y += 100 * Math.sin(45 * Math.PI / 180);
        line_01_end.z = 0;

        this.line_01 = new Line(line_01_start, line_01_end);

        this.circle_01 = new Circle(5);

        const line_02_start = line_01_end.clone();
        line_02_start.x -= 1;
        line_02_start.y -= 1;
        const line_02_end = line_02_start.clone();
        line_02_end.x += 100;
        this.line_02 = new Line(line_02_start, line_02_end);
    };
    add() {
        this.scene.add(this.line_01.mesh);
        this.scene.add(this.line_02.mesh);
    };
    update() {
        this.line_01.update();
        this.line_02.update();
    }
};