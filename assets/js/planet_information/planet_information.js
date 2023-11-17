import * as THREE from "three";
import { MeshLine, MeshLineMaterial } from 'three.meshline';

function lerp(x, y, a) {
    return (1 - a) * x + a * y;
};

function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}

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

class Round {
    constructor(radius, weight, startTheta, thetaLength) {
        this.points = [];
        this.radius = radius;
        this.weight = weight;
        this.startTheta = (startTheta * Math.PI) / 180;
        this.thetaLength = (thetaLength * Math.PI) / 180;
        this.progress = 0;
        this.count = 0;
        this.countLength = thetaLength;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        for (let i = this.startTheta; i < this.startTheta + this.thetaLength; i += Math.PI / 180) {
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
        this.material = new MeshLineMaterial({ color: 0xffffff, lineWidth: this.weight });
        this.mesh = new THREE.Mesh(this.line, this.material);
        this.mesh.geometry.setDrawRange(0, this.count * 6) // LineMeshは頂点が6倍
    };
    position(vec3) {
        const position = vec3.clone();
        this.mesh.position.copy(position);
    };
    update() {
        if (this.count < this.countLength) {
            this.progress += 1 / 120;
            const count = easeInOutQuart(this.progress);
            this.count = count * this.countLength;
            this.mesh.geometry.setDrawRange(0, this.count * 6) // LineMeshは頂点が6倍
        };
    };
    remove() {
        if (0 < this.progress) {
            this.progress -= 1 / 60;
            const count = easeInOutQuart(this.progress);
            this.count = count * this.countLength;
            this.mesh.geometry.setDrawRange(0, this.count * 6) // LineMeshは頂点が6倍
        };
    };
};

class Rect {
    constructor(radius, angle) {
        this.points = [];
        this.startRadius = radius - 3.5;
        this.endRadius = radius + 3.5;
        this.weight = 2.5;
        this.angle = (angle * Math.PI) / 180;
        this.progress = 0;
        this.init();
    };
    init() {
        this.createVert();
        this.createMesh();
    };
    createVert() {
        const startX = this.startRadius * Math.cos(this.angle);
        const startY = this.startRadius * Math.sin(this.angle);
        const startZ = 0;
        const startPoint = new THREE.Vector3(startX, startY, startZ); // 開始地点
        this.points.push(startPoint);
        const endX = this.endRadius * Math.cos(this.angle);
        const endY = this.endRadius * Math.sin(this.angle);
        const endZ = 0;
        const endPoint = new THREE.Vector3(endX, endY, endZ); // 終了地点
        this.points.push(endPoint);
    };
    createMesh() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.line = new MeshLine();
        this.line.setGeometry(this.geometry);
        this.material = new MeshLineMaterial({ color: 0xffffff, lineWidth: this.weight, transparent: true });
        this.material.opacity = 0
        this.mesh = new THREE.Mesh(this.line, this.material);
    };
    position(vec3) {
        const position = vec3.clone();
        this.mesh.position.copy(position);
    };
    update() {
        if (this.progress < 1) {
            this.progress += 1 / 120;
            this.material.opacity = easeInOutQuart(this.progress);
        }
    };
    remove() {
        if (0 < this.progress) {
            this.progress -= 1 / 60;
            this.material.opacity = easeInOutQuart(this.progress);
        }
    };
};

/* ==================================================
 * 名前のポイント
 * ================================================== */
class PointName {
    constructor() {
        this.init();
    };
    init() {
        this.create();
    };
    create() {
        this.round_01 = new Round(25, 10, 0, 360);
        this.round_02 = new Round(40, 10, 180, 361);
        this.round_03 = new Round(60, 1, 0, 360);
        this.round_04 = new Round(70, 2, -15, 165);
        this.round_05 = new Round(70, 2, 210, 75);
    };
    add(scene) {
        scene.add(this.round_01.mesh);
        scene.add(this.round_02.mesh);
        scene.add(this.round_03.mesh);
        scene.add(this.round_04.mesh);
        scene.add(this.round_05.mesh);
    };
    _setupPosition(vec3) {
        const position = vec3.clone();
        this.position = position;
    };
    setPosition(vec3) {
        const position = vec3.clone();
        this.position = position;
        this.round_01.position(this.position);
        this.round_02.position(this.position);
        this.round_03.position(this.position);
        this.round_04.position(this.position);
        this.round_05.position(this.position);
    };
    update() {
        this.round_01.update();
        this.round_02.update();
        this.round_03.update();
        this.round_04.update();
        this.round_05.update();
    };
    remove() {
        this.round_01.remove();
        this.round_02.remove();
        this.round_03.remove();
        this.round_04.remove();
        this.round_05.remove();
    };
};
/* ==================================================
 * 大きさのポイント
 * ================================================== */
class PointSize {
    constructor() {
        this.init();
    };

    init() {
        this.create();
    };

    create() {
        this.circle_01 = new Circle(25);
        this.round_01 = new Round(32, 2, 180, 180);
        this.round_02 = new Round(40, 1, 0, 360);
        this.round_03 = new Round(45, 3, -45, 180);
        this.round_04 = new Round(45, 2, 180, 90);
        this.rects = [];
        for (let i = 30; i < 160; i += 10) {
            const rect = new Rect(32, i);
            this.rects.push(rect);
        };
    };

    add(scene) {
        scene.add(this.circle_01.mesh);
        scene.add(this.round_01.mesh);
        scene.add(this.round_02.mesh);
        scene.add(this.round_03.mesh);
        scene.add(this.round_04.mesh);
        for (let i = 0; i < this.rects.length; i++) {
            scene.add(this.rects[i].mesh);
        };
    };
    _setupPosition() {

    };
    setPosition(vec3) {
        const position = vec3.clone();
        this.position = position;
        this.circle_01.position(this.position);
        this.round_01.position(this.position);
        this.round_02.position(this.position);
        this.round_03.position(this.position);
        this.round_04.position(this.position);
        for (let i = 0; i < this.rects.length; i++) {
            this.rects[i].position(this.position);
        };
    };

    update() {
        this.circle_01.update();
        this.round_01.update();
        this.round_02.update();
        this.round_03.update();
        this.round_04.update();
        for (let i = 0; i < this.rects.length; i++) {
            this.rects[i].update();
        };
    };
    remove() {
        this.circle_01.remove();
        this.round_01.remove();
        this.round_02.remove();
        this.round_03.remove();
        this.round_04.remove();
        for (let i = 0; i < this.rects.length; i++) {
            this.rects[i].remove();
        };
    };
};
/* ==================================================
 * 距離のポイント
 * ================================================== */
class PointDistance {
    constructor() {
        this.init();
    };
    init() {
        this.create();
    };
    create() {
        this.circle_01 = new Circle(15);
        this.round_01 = new Round(25, 2, 0, 360)
        this.round_02 = new Round(30, 1, 30, 75)
        this.round_03 = new Round(30, 1, 165, 165)
    };
    add(scene) {
        scene.add(this.circle_01.mesh);
        scene.add(this.round_01.mesh);
        scene.add(this.round_02.mesh);
        scene.add(this.round_03.mesh);
    };
    update() {
        this.circle_01.update();
        this.round_01.update();
        this.round_02.update();
        this.round_03.update();
    };
    remove() {
        this.circle_01.remove();
        this.round_01.remove();
        this.round_02.remove();
        this.round_03.remove();
    };
    _setupPosition(vec3) {

    };
    setPosition(vec3) {
        const position = vec3.clone();
        this.position = position;
        this.circle_01.position(this.position);
        this.round_01.position(this.position);
        this.round_02.position(this.position);
        this.round_03.position(this.position);
    };
};
/* ==================================================
 * 公転速度・自転速度のポイント
 * ================================================== */
class PointSpeed {
    constructor() {
        this.init();
    };
    init() {
        this.create();
    };
    create() {
        this.circle_01 = new Circle(15);
        this.round_01 = new Round(20, 1, 0, 360);
        this.round_02 = new Round(25, 1, 0, 360);
    };
    add(scene) {
        scene.add(this.circle_01.mesh);
        scene.add(this.round_01.mesh);
        scene.add(this.round_02.mesh);
    };
    _setupPosition() {

    };
    setPosition(vec3) {
        const position = vec3.clone();
        this.position = position;
        this.circle_01.position(this.position);
        this.round_01.position(this.position);
        this.round_02.position(this.position);
    };
    update() {
        this.circle_01.update();
        this.round_01.update();
        this.round_02.update();
    };
    remove() {
        this.circle_01.remove();
        this.round_01.remove();
        this.round_02.remove();
    };
};

export class Information {

    constructor(scene) {
        this.scene = scene;
        this.count = 0;
        this.view = false;
        this.init();
    };

    init() {
        this.pointCreate();
        this.pointAdd();
        this.pointPosition();
        this.lineCreate();
        this.lineAdd();
    };

    pointCreate() {
        this.pointName = new PointName();
        this.pointSize = new PointSize();
        this.pointDistance = new PointDistance();
        this.pointSpeed = new PointSpeed();
    };

    pointAdd() {
        this.pointName.add(this.scene);
        this.pointSize.add(this.scene);
        this.pointDistance.add(this.scene);
        this.pointSpeed.add(this.scene);
    };

    pointPosition() {
        const name_r = 350;
        const name_theta = (135 * Math.PI) / 180;
        const name_x = name_r * Math.cos(name_theta);
        const name_y = name_r * Math.sin(name_theta);
        const name_z = 0;
        const name_position = new THREE.Vector3(name_x, name_y, name_z);

        this.pointName.setPosition(name_position);

        const size_r = 200;
        const size_theta = (45 * Math.PI) / 180;
        const size_x = size_r * Math.cos(size_theta);
        const size_y = size_r * Math.sin(size_theta);
        const size_z = 0;
        const size_position = new THREE.Vector3(size_x, size_y, size_z);

        this.pointSize.setPosition(size_position);

        const distance_r = 300;
        const distance_theta = (-45 * Math.PI) / 180;
        const distance_x = distance_r * Math.cos(distance_theta) + size_position.x;
        const distance_y = distance_r * Math.sin(distance_theta) + size_position.y;
        const distance_z = 0 + size_position.z;
        const distance_position = new THREE.Vector3(distance_x, distance_y, distance_z);
        this.pointDistance.setPosition(distance_position);

        const speed_r = 250;
        const speed_theta = (225 * Math.PI) / 180;
        const speed_x = speed_r * Math.cos(speed_theta);
        const speed_y = speed_r * Math.sin(speed_theta);
        const speed_z = 0;
        const speed_position = new THREE.Vector3(speed_x, speed_y, speed_z);

        this.pointSpeed.setPosition(speed_position);
        this.SP_pointPosition()
    };
    // SP
    SP_pointPosition() {
        if (window.innerWidth < 768) {

            const name_x = 250;
            const name_y = 500;
            const name_z = 0;
            const name_position = new THREE.Vector3(name_x, name_y, name_z);

            this.pointName.setPosition(name_position);

            const size_x = -250;
            const size_y = 200;
            const size_z = 0;
            const size_position = new THREE.Vector3(size_x, size_y, size_z);

            this.pointSize.setPosition(size_position);

            const distance_x = -250;
            const distance_y = -650;
            const distance_z = 0;
            const distance_position = new THREE.Vector3(distance_x, distance_y, distance_z)
            this.pointDistance.setPosition(distance_position);

            const speed_x = 250;
            const speed_y = -350;
            const speed_z = 0;
            const speed_position = new THREE.Vector3(speed_x, speed_y, speed_z);

            this.pointSpeed.setPosition(speed_position);
        };
    };

    pointUpdate() {
        this.pointName.update();
        this.pointSize.update();
        this.pointDistance.update();
        this.pointSpeed.update();
    };

    pointRemove() {
        this.pointName.remove();
        this.pointSize.remove();
        this.pointDistance.remove();
        this.pointSpeed.remove();
    };

    lineCreate() {
        const center = new THREE.Vector3(0, 0, 0);

        // name
        const name_end = this.pointName.position.clone();
        name_end.x += 38 * Math.cos(315 * Math.PI / 180);
        name_end.y += 38 * Math.sin(315 * Math.PI / 180);
        this.toName = new Line(center, name_end);

        const name2_start = this.pointName.position.clone();
        name2_start.x -= 40;
        const name2_end = this.pointName.position.clone();
        name2_end.x -= 500;
        this.toName2 = new Line(name2_start, name2_end);

        // size
        this.toSize = new Line(center, this.pointSize.position);

        const size2_start = this.pointSize.position.clone();
        size2_start.x += 40 * Math.cos(45 * Math.PI / 180);
        size2_start.y += 40 * Math.sin(45 * Math.PI / 180);
        const size2_end = this.pointSize.position.clone();
        size2_end.x += 90 * Math.cos(45 * Math.PI / 180);
        size2_end.y += 90 * Math.cos(45 * Math.PI / 180);
        this.toSize2 = new Line(size2_start, size2_end);

        const size3_start = this.toSize2.points[this.toSize2.points.length - 1].clone();
        const size3_end = this.toSize2.points[this.toSize2.points.length - 1].clone();
        size3_end.x += 500;
        this.toSize3 = new Line(size3_start, size3_end);

        // distance
        const distance_start = this.pointSize.position.clone();
        distance_start.x += 40 * Math.cos(315 * Math.PI / 180);
        distance_start.y += 40 * Math.sin(315 * Math.PI / 180);
        this.toDistance = new Line(distance_start, this.pointDistance.position);

        const distance2_start = this.pointDistance.position.clone();
        const distance2_end = this.pointDistance.position.clone();
        distance2_end.x += 400;
        this.toDistance2 = new Line(distance2_start, distance2_end);

        // speed
        this.toSpeed = new Line(center, this.pointSpeed.position);

        // revolution
        const revolution = this.pointSpeed.position.clone();
        revolution.x += 75 * Math.cos((135 * Math.PI) / 180);
        revolution.y += 75 * Math.sin((135 * Math.PI) / 180);
        this.toRevolution = new Line(this.pointSpeed.position, revolution);

        const revolution2_start = this.toRevolution.points[this.toRevolution.points.length - 1].clone();
        const revolution2_end = this.toRevolution.points[this.toRevolution.points.length - 1].clone();
        revolution2_end.x -= 400;
        this.toRevolution2 = new Line(revolution2_start, revolution2_end);

        // rotation
        const rotation = this.pointSpeed.position.clone();
        rotation.x += 125 * Math.cos((225 * Math.PI) / 180);
        rotation.y += 125 * Math.sin((225 * Math.PI) / 180);
        this.toRotation = new Line(this.pointSpeed.position, rotation);

        const rotation2_start = this.toRotation.points[this.toRotation.points.length - 1].clone();
        const rotation2_end = this.toRotation.points[this.toRotation.points.length - 1].clone();
        rotation2_end.x -= 400;
        this.toRotation2 = new Line(rotation2_start, rotation2_end);

        this.textNamePosition = name2_end;
        this.textSizePosition = size3_end;
        this.textDistancePosition = distance2_end;
        this.textRevolutionPosition = revolution2_end;
        this.textRotationPosition = rotation2_end;
    };

    lineAdd() {
        this.toName.add(this.scene);
        this.toName2.add(this.scene);
        this.toSize.add(this.scene);
        this.toSize2.add(this.scene);
        this.toSize3.add(this.scene);
        this.toDistance.add(this.scene);
        this.toDistance2.add(this.scene);
        this.toSpeed.add(this.scene);
        this.toRevolution.add(this.scene);
        this.toRevolution2.add(this.scene);
        this.toRotation.add(this.scene);
        this.toRotation2.add(this.scene);
    };

    lineUpdate() {
        if (window.innerWidth > 768) {
            this.toName.update();
            this.toName2.update();
            this.toSize.update();
            this.toSize2.update();
            this.toSize3.update();
            this.toDistance.update();
            this.toDistance2.update();
            this.toSpeed.update();
            this.toRevolution.update();
            this.toRevolution2.update();
            this.toRotation.update();
            this.toRotation2.update();
        };
        // SP
        if (window.innerWidth < 768) {
            // this.toName.update();
            this.toName2.update();
            // this.toSize.update();
            this.toSize2.update();
            this.toSize3.update();
            // this.toDistance.update();
            this.toDistance2.update();
            // this.toSpeed.update();
            this.toRevolution.update();
            this.toRevolution2.update();
            this.toRotation.update();
            this.toRotation2.update();
        }
    };

    lineRemove() {
        this.toName.remove();
        this.toName2.remove();
        this.toSize.remove();
        this.toSize2.remove();
        this.toSize3.remove();
        this.toDistance.remove();
        this.toDistance2.remove();
        this.toSpeed.remove();
        this.toRevolution.remove();
        this.toRevolution2.remove();
        this.toRotation.remove();
        this.toRotation2.remove();
        if (window.innerWidth < 768) {

        }
    };

    update() {
        // 同時
        this.updateDelay();
        if (3 <= this.count) {
            this.pointUpdate();
            this.lineUpdate();
        } else {
            this.pointRemove();
            this.lineRemove();
        };
        // 時間差
        // this.updateDelay();
        // if (3 <= this.count) {
        //     this.pointUpdate();
        //     if (3.5 <= this.count) {
        //         this.lineUpdate();
        //     }
        // } else {
        //     this.pointRemove();
        //     this.lineRemove();
        // };
    };

    updateDelay() {
        if (this.count < 3 && this.view) {
            this.count += 1 / 60;
        };
    };

    watch() {
        const current = useRoute().name;
        this.count = 0;
        if (current == "planets-mercury") {
            this.view = true;
        } else if (current == "planets-venus") {
            this.view = true;
        }
        else if (current == "planets-earth") {
            this.view = true;
        }
        else if (current == "planets-mars") {
            this.view = true;
        }
        else if (current == "planets-jupiter") {
            this.view = true;
        }
        else if (current == "planets-saturn") {
            this.view = true;
        }
        else if (current == "planets-uranus") {
            this.view = true;
        }
        else if (current == "planets-neptune") {
            this.view = true;
        } else {
            this.view = false;
        }
    };
};