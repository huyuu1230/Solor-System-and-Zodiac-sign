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

class SignHead {
    constructor() {
        this.init();
    };
    init() {
        this.pointCreate();
    };
    pointCreate() {
        this.circle_01 = new Circle(5);
        this.circle_02 = new Circle(5);
        this.circle_03 = new Circle(10);
        this.circle_04 = new Circle(5);
        this.circle_05 = new Circle(5);
    };
    pointAdd(scene) {
        scene.add(this.circle_01.mesh);
        scene.add(this.circle_02.mesh);
        scene.add(this.circle_03.mesh);
        scene.add(this.circle_04.mesh);
        scene.add(this.circle_05.mesh);
    };
    pointPosition() {
        const x = 1100 * Math.cos(170 * Math.PI / 180);
        const y = 1100 * Math.sin(170 * Math.PI / 180);
        const z = 0;
        const circle1_position = new THREE.Vector3(x, y, z);

        const circle2_position = circle1_position.clone();
        circle2_position.x += 100 * Math.cos(45 * Math.PI / 180);
        circle2_position.y += 100 * Math.sin(45 * Math.PI / 180);

        const circle3_position = circle2_position.clone();
        circle3_position.x += 100;

        const circle4_position = circle3_position.clone();
        circle4_position.x += 100 * Math.cos(45 * Math.PI / 180);
        circle4_position.y += 100 * Math.sin(45 * Math.PI / 180);

        const circle5_position = circle3_position.clone();
        circle5_position.x += 150 * Math.cos(-45 * Math.PI / 180);
        circle5_position.y += 150 * Math.sin(-45 * Math.PI / 180);

        this.circle_01.position(circle1_position);
        this.circle_02.position(circle2_position);
        this.circle_03.position(circle3_position);
        this.circle_04.position(circle4_position);
        this.circle_05.position(circle5_position);
    };

    lineCreate() {
        const line1_start = this.circle_01.mesh.position.clone();
        const line1_end = this.circle_02.mesh.position.clone();
        this.line_01 = new Line(line1_start, line1_end);

        const line2_start = this.circle_02.mesh.position.clone();
        const line2_end = this.circle_03.mesh.position.clone();
        this.line_02 = new Line(line2_start, line2_end);

        const line3_start = this.circle_03.mesh.position.clone();
        const line3_end = this.circle_04.mesh.position.clone();
        this.line_03 = new Line(line3_start, line3_end);

        const line4_start = this.circle_04.mesh.position.clone();
        const line4_end = this.circle_04.mesh.position.clone();
        line4_end.x += 500;
        this.line_04 = new Line(line4_start, line4_end);

        const line5_start = this.circle_03.mesh.position.clone();
        const line5_end = this.circle_05.mesh.position.clone();
        this.line_05 = new Line(line5_start, line5_end);

        const line6_start = this.circle_05.mesh.position.clone();
        const line6_end = this.circle_05.mesh.position.clone();
        line6_end.x += 500;
        this.line_06 = new Line(line6_start, line6_end);

        this.textNamePosition = line4_end;
        this.textCopyPosition = line6_end;
    };

    lineAdd(scene) {
        scene.add(this.line_01.mesh);
        scene.add(this.line_02.mesh);
        scene.add(this.line_03.mesh);
        scene.add(this.line_04.mesh);
        scene.add(this.line_05.mesh);
        scene.add(this.line_06.mesh);
    };

    pointUpdate() {
        this.circle_01.update();
        this.circle_02.update();
        this.circle_03.update();
        this.circle_04.update();
        this.circle_05.update();
    };
    pointRemove() {
        this.circle_01.remove();
        this.circle_02.remove();
        this.circle_03.remove();
        this.circle_04.remove();
        this.circle_05.remove();
    };
    lineUpdate() {
        this.line_01.update();
        this.line_02.update();
        this.line_03.update();
        this.line_04.update();
        this.line_05.update();
        this.line_06.update();
    };
    lineRemove() {
        this.line_01.remove();
        this.line_02.remove();
        this.line_03.remove();
        this.line_04.remove();
        this.line_05.remove();
        this.line_06.remove();
    };
};

class SignBody {
    constructor() {
        this.init();
    };
    init() {
        this.pointCreate();
    };
    pointCreate() {
        this.circle_01 = new Circle(15);
        this.circle_02 = new Circle(5);
        this.circle_03 = new Circle(10);
        this.circle_04 = new Circle(5);
    };
    pointAdd(scene) {
        scene.add(this.circle_01.mesh);
        scene.add(this.circle_02.mesh);
        scene.add(this.circle_03.mesh);
        scene.add(this.circle_04.mesh);
    };
    pointPosition() {
        const x = 1100 * Math.cos(-15 * Math.PI / 180);
        const y = 1100 * Math.sin(-15 * Math.PI / 180);
        const z = 0;
        const circle1_position = new THREE.Vector3(x, y, z);

        const circle2_position = circle1_position.clone();
        circle2_position.x += 100 * Math.cos(225 * Math.PI / 180);
        circle2_position.y += 100 * Math.sin(225 * Math.PI / 180);

        const circle3_position = circle2_position.clone();
        circle3_position.x -= 100;

        const circle4_position = circle3_position.clone();
        circle4_position.x += 200 * Math.cos(225 * Math.PI / 180);
        circle4_position.y += 200 * Math.sin(225 * Math.PI / 180);

        this.circle_01.position(circle1_position);
        this.circle_02.position(circle2_position);
        this.circle_03.position(circle3_position);
        this.circle_04.position(circle4_position);
    };

    pointUpdate() {
        this.circle_01.update();
        this.circle_02.update();
        this.circle_03.update();
        this.circle_04.update();
    };

    pointRemove() {
        this.circle_01.remove();
        this.circle_02.remove();
        this.circle_03.remove();
        this.circle_04.remove();
    };

    lineCreate() {
        const line1_start = this.circle_01.mesh.position.clone();
        const line1_end = this.circle_02.mesh.position.clone();

        const line2_start = this.circle_02.mesh.position.clone();
        const line2_end = this.circle_03.mesh.position.clone();

        const line3_start = this.circle_03.mesh.position.clone();
        const line3_end = this.circle_04.mesh.position.clone();

        const line4_start = this.circle_04.mesh.position.clone();
        const line4_end = this.circle_04.mesh.position.clone();
        line4_end.x -= 1000;

        this.line_01 = new Line(line1_start, line1_end);
        this.line_02 = new Line(line2_start, line2_end);
        this.line_03 = new Line(line3_start,line3_end);
        this.line_04 = new Line(line4_start,line4_end);

        this.textBodyPosition = line4_end;
    };

    lineAdd(scene){
        scene.add(this.line_01.mesh);
        scene.add(this.line_02.mesh);
        scene.add(this.line_03.mesh);
        scene.add(this.line_04.mesh);
    };

    lineUpdate(){
        this.line_01.update();
        this.line_02.update();
        this.line_03.update();
        this.line_04.update();
    };

    lineRemove(){
        this.line_01.remove();
        this.line_02.remove();
        this.line_03.remove();
        this.line_04.remove();
    };
};

export class Sign_Information {
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
        this.lineAdd()
    };
    pointCreate() {
        this.head = new SignHead();
        this.body = new SignBody();
    };

    pointAdd() {
        this.head.pointAdd(this.scene);
        this.body.pointAdd(this.scene);
    };

    pointPosition() {
        this.head.pointPosition();
        this.body.pointPosition();
    };

    pointUpdate() {
        this.head.pointUpdate();
        this.body.pointUpdate();
    };

    pointRemove() {
        this.head.pointRemove();
        this.body.pointRemove();
    };

    lineCreate() {
        this.head.lineCreate();
        this.body.lineCreate();
    };

    lineAdd() {
        this.head.lineAdd(this.scene);
        this.body.lineAdd(this.scene);
    }

    lineUpdate() {
        this.head.lineUpdate();
        this.body.lineUpdate();
    };

    lineRemove() {
        this.head.lineRemove();
        this.body.lineRemove();
    }

    update() {
        this.updateDelay();
        if (3 <= this.count) {
            this.pointUpdate();
            this.lineUpdate();
        } else {
            this.pointRemove();
            this.lineRemove();
        };
    };

    updateDelay() {
        if (this.count < 3 && this.view) {
            this.count += 1 / 60;
        };
    };

    watch(){
        const current = useRoute().name;
        this.count = 0;
        if(current == "signs-aries"){
            this.view = true;
        }
        else if (current == "signs-taurus") {
            this.view = true;
        }
        else if (current == "signs-gemini") {
            this.view = true;
        }
        else if (current == "signs-cancer") {
            this.view = true;
        }
        else if (current == "signs-leo") {
            this.view = true;
        }
        else if (current == "signs-virgo") {
            this.view = true;
        }
        else if (current == "signs-libra") {
            this.view = true;
        }
        else if (current == "signs-scorpius") {
            this.view = true;
        }
        else if (current == "signs-sagittarius") {
            this.view = true;
        }
        else if (current == "signs-capricornus") {
            this.view = true;
        }
        else if (current == "signs-aquarius") {
            this.view = true;
        }
        else if (current == "signs-pisces") {
            this.view = true;
        } else {
            this.view = false;
        };
    };
};