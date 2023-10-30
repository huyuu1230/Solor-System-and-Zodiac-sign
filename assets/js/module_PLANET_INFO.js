import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';

/*
 * ベースの数値
 * this.base = planet.computeRadius * 0.22;
 * 比率で計算しているため分かりにくいが、この数値を変更すれば全体の大きさが一括で変わる
 * 
 * クラス側について
 * this.radius = radius
 * この部分がベースの値となる
 * パーセントで指定するため、radius * 1.5 のような形で計算する
 * 
 * 線の太さに関して
 * (radius / 100) * 10 のような形で計算している
 * 上記の場合は、10%ということになる
 * なぜかfigmaの通りに計算すると細くなりすぎてしまうため二倍の数値にしている
 * 計算方法のリファクタリングも含めて、今後改善する必要がある
*/

// ==================================================
// 中心の丸
// ==================================================
class Circle_01 {
    constructor(radius) {
        this.radius = radius;
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
        this.mesh.rotation.set(0, theta, 0)
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
// ==================================================
// 円状に並ぶ四角
// ==================================================
class Circle_Rect {
    constructor(radius,angle) {
        this.points = [];
        this.radius_1 = radius * 1.1;
        this.radius_2 = radius * 1.4;
        this.weight = (radius / 100) * 10;
        this.angle = (angle * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        
            const x = this.radius_1 * Math.cos(this.angle);
            const y = this.radius_1 * Math.sin(this.angle);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
            const x2 = this.radius_2 * Math.cos(this.angle);
            const y2 = this.radius_2 * Math.sin(this.angle);
            const z2 = 0;
            const point2 = new THREE.Vector3(x2, y2, z2);
            this.points.push(point2);
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
}
// ==================================================
// 中心から１週目の下にある線
// ==================================================
class Circle_LINE_01 {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 1.25;
        this.weight = (radius / 100) * 8;
        this.angle = (-180 * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = this.angle; i < this.angle + Math.PI; i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        };
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
// ==================================================
// 二週目の円
// ==================================================
class Circle_LINE_02 {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 1.5;
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
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points,
        );
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
    update(theta, position) {
        // ==========LOOK==========
        this.mesh.rotation.set(0, theta, 0);
        // ==========POSITION==========
        this.mesh.position.copy(position);
    };
}
// ==================================================
// 三週目の細い線
// ==================================================
class Circle_LINE_03 {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 1.75;
        this.angle = Math.PI;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = this.angle; i < this.angle + (Math.PI / 2); i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        }
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.points,
        );
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
    update(theta, position) {
        // ==========LOOK==========
        this.mesh.rotation.set(0, theta, 0);
        // ==========POSITION==========
        this.mesh.position.copy(position);
    };
};
// ==================================================
// 三週目の太い線
// ==================================================
class Circle_LINE_04 {
    constructor(radius) {
        this.points = [];
        this.radius = radius * 1.75;
        this.weight = (radius / 100) * 12;
        this.angle = (-45 * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = this.angle; i < this.angle + Math.PI; i += Math.PI / 180) {
            const x = this.radius * Math.cos(i);
            const y = this.radius * Math.sin(i);
            const z = 0;
            const point = new THREE.Vector3(x, y, z);
            this.points.push(point);
        };
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
// ==================================================
// 二つ目のポイント
// ==================================================
export class Information_Point {
    constructor(planet) {
        // figmaだとこれが100px
        this.base = planet.computeRadius * 0.22;
        this.speed = planet.computeRevolution;
        this.theta = planet.alphaRad + Math.PI / 2;
        this.phi = (0 * Math.PI) / 180;
        this.init();
    };
    init() {
        this.createMesh();
    };
    createMesh() {
        this.circle_01 = new Circle_01(this.base);

        this.circle_Rects = [];
        for(let i = 40; i<150; i+=10){
            const rect = new Circle_Rect(this.base,i);
            this.circle_Rects.push(rect);
        }

        this.circle_Line_01 = new Circle_LINE_01(this.base);
        this.circle_Line_02 = new Circle_LINE_02(this.base);
        this.circle_Line_03 = new Circle_LINE_03(this.base);
        this.circle_Line_04 = new Circle_LINE_04(this.base);
    };
    add(scene) {
        scene.add(this.circle_01.mesh);

        for(let i = 0; i<this.circle_Rects.length; i++){
            scene.add(this.circle_Rects[i].mesh)
        }

        scene.add(this.circle_Line_01.mesh);
        scene.add(this.circle_Line_02.mesh);
        scene.add(this.circle_Line_03.mesh);
        scene.add(this.circle_Line_04.mesh);
    };
    update(planet) {
        // ====================POSITION====================
        const position = planet.mesh.position.clone();
        const radius = planet.computeRadius * 1.5;
        this.theta += planet.computeRevolution;
        position.x += radius * Math.sin(this.theta) * Math.cos(this.phi);
        position.y += radius * Math.sin(this.theta) * Math.sin(this.phi) + radius;
        position.z += radius * Math.cos(this.theta);
        // ====================POSITION====================
        const look = planet.alphaRad;

        this.circle_01.update(look, position);

        for(let i = 0; i<this.circle_Rects.length; i++){
            this.circle_Rects[i].update(look,position);
        }
        this.circle_Line_01.update(look, position);
        this.circle_Line_02.update(look, position);
        this.circle_Line_03.update(look, position);
        this.circle_Line_04.update(look, position);
    };
};