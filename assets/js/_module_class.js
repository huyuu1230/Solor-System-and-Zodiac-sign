import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import * as MATH from "~/assets/js/math";

// ==================================================
// 変数 : 半径・距離・公転・自転に関する変数
// ==================================================
let earthRadius = 100;
let earthDiameter = earthRadius * 2;
let earthRevolution = MATH.toRad(360 / 365 / 60);
let earthRotation = MATH.toRad(360 / 60);
let sunRadius = earthRadius * 219.08;
let au = earthRadius * 23533.69;
let ly = au * 63241;
let pc = ly * 3.26;

function lerp(x, y, a) {
    return (1 - a) * x + a * y;
};

// ==================================================
// WEBGL
// ==================================================
export class WebGL {
    constructor(webgl) {
        this.webgl = webgl;
        this.scene = new THREE.Scene();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(new THREE.Color(0x222222));
        this.renderer.setSize(this.width, this.height);
        this.init();
    };
    init() {
        this.#setting_webgl();
        this.#setting_camera();
        this.#setting_controls();
        this.#setting_camera_control();
    };
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    onUpdate() {
        const that = this;
        (function _update() {
            that.rendering();
            requestAnimationFrame(_update);
        }());
    };
    rendering() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        this.#update_camera();
    };
    // ==================================================
    // キャンバスを作成
    // ==================================================
    #setting_webgl() {
        this.webgl.appendChild(this.renderer.domElement);
    };
    // ==================================================
    // コントロール
    // ==================================================
    #setting_controls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    };
    // ==================================================
    // カメラ
    // ==================================================
    #setting_camera() {
        this.cameraFov = 45;
        this.cameraAspect = window.innerWidth / window.innerHeight;
        this.cameraNear = 0.1;
        this.cameraFar = pc;
        this.camera = new THREE.PerspectiveCamera(
            this.cameraFov,
            this.cameraAspect,
            this.cameraNear,
            this.cameraFar,
        );
    };
    #setting_camera_control() {
        this.cameraControl = true;
        this.cameraLookStart = this.controls.target.clone();
        this.cameraLookEnd = new THREE.Vector3(0, 0, 0);
        this.cameraPositionStart = this.camera.position.clone();
        this.cameraPositionEnd = new THREE.Vector3(0, au * 25, au * 50);
        this.cameraProgress = 0;
    };
    #cameraLerpLook(startVec3, endVec3, progress) {
        const newVec3 = new THREE.Vector3();
        newVec3.x = lerp(startVec3.x, endVec3.x, progress);
        newVec3.y = lerp(startVec3.y, endVec3.y, progress);
        newVec3.z = lerp(startVec3.z, endVec3.z, progress);
        this.controls.target.set(newVec3.x, newVec3.y, newVec3.z);
    };
    #cameraLerpPosition(startVec3, endVec3, progress) {
        const newVec3 = new THREE.Vector3();
        newVec3.x = lerp(startVec3.x, endVec3.x, progress);
        newVec3.y = lerp(startVec3.y, endVec3.y, progress);
        newVec3.z = lerp(startVec3.z, endVec3.z, progress);
        this.camera.position.set(newVec3.x, newVec3.y, newVec3.z);
    };
    #cameraLerpProgress() {
        if (this.cameraProgress < 1) {
            this.cameraProgress += 1000 / 1000 / 60;
        } else {
            this.cameraProgress = 1
        }
    };
    #update_camera() {
        this.#cameraLerpProgress();
        this.#cameraLerpLook(this.cameraLookStart, this.cameraLookEnd, this.cameraProgress);
        this.#cameraLerpPosition(this.cameraPositionStart, this.cameraPositionEnd, this.cameraProgress);
    };
    change_camera(lookVec3, positionVec3) {
        this.cameraProgress = 0;
        this.cameraLookStart = this.controls.target.clone();
        this.cameraPositionStart = this.camera.position.clone();
        this.cameraLookEnd = lookVec3;
        this.cameraPositionEnd = positionVec3;
    };
    // ==================================================
    // その他
    // ==================================================
    #setting_touch() {
        document.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: false });
    };

};

// ==================================================
// PlanetSun : 太陽の作成
// ==================================================
export class PlanetSun {
    constructor() {
        this.radius = sunRadius;
        this.width = 10;
        this.height = 10;
        this.init();
    }
    init() {
        this.compute();
        this.create();
    }
    compute() {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    create() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.width, this.height);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.set(this.x, this.y, this.z);
        this.mesh.name = "sun";
    }
};

// ==================================================
// Planet : 惑星の作成
// ==================================================
export class Planet {
    constructor(name, radius, distance, revolution, rotation, alpha, delta) {
        this.name = name;
        this.radius = radius;
        this.distance = distance;
        this.revolution = revolution;
        this.rotation = rotation;
        this.alpha = alpha;
        this.delta = delta;
        this.width = 10;
        this.height = 10;
        this.init();
    };
    init() {
        this.compute();
        this.create();
        this.position();
    };
    compute() {
        this.computeRadius = earthRadius * this.radius;
        this.computeDistance = sunRadius + au * this.distance;
        this.computeRevolution = earthRevolution / this.revolution;
        this.computeRotation = earthRotation / this.rotation;
        this.alphaRad = (this.alpha * Math.PI) / 180;
        this.deltaRad = (this.delta * Math.PI) / 180;
    };
    create() {
        this.geometry = new THREE.SphereGeometry(this.computeRadius, this.width, this.height);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    position() {
        this.x = this.computeDistance * Math.sin(this.alphaRad) * Math.cos(this.deltaRad);
        this.y = this.computeDistance * Math.sin(this.alphaRad) * Math.sin(this.deltaRad);
        this.z = this.computeDistance * Math.cos(this.alphaRad);
        this.mesh.position.set(this.x, this.y, this.z);
    };
    update() {
        // -----Revolution
        this.alphaRad += this.computeRevolution;
        // -----Rotation
        this.mesh.rotation.y += this.computeRotation;
        this.position();
    };
    _update() {
        const that = this;
        (function _update() {
            // -----Revolution
            that.alphaRad += that.computeRevolution;
            // -----Rotation
            that.mesh.rotation.y += that.computeRotation;
            that.position();
            requestAnimationFrame(_update);
        }());
    };
};

// ==================================================
// Orbit : 惑星の軌道の作成
// ==================================================
export class Orbit {
    constructor(distance) {
        this.distance = distance;
        this.orbitPoints = [];
        this.orbitPointNum = 3600;
        this.init();
    };
    init() {
        this.compute();
        this.create();
    };
    compute() {
        this.computeDistance = sunRadius + au * this.distance;
        for (let i = 0; i <= this.orbitPointNum; i++) {
            const rad = ((360 / this.orbitPointNum) * i * Math.PI) / 180;
            const x = this.computeDistance * Math.cos(rad);
            const y = 0;
            const z = this.computeDistance * Math.sin(rad);
            const p = new THREE.Vector3(x, y, z);
            this.orbitPoints.push(p);
        };
    };
    create() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(
            this.orbitPoints
        );
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
};

// ==================================================
// Sign : 星座の星の作成
// ==================================================
export class Sign {
    constructor(alpha, delta) {
        this.alpha = alpha;
        this.delta = delta;
        this.radius = sunRadius * 50;
        this.w = 10;
        this.h = 10;
        this.init();
    };
    init() {
        this.compute();
        this.create();
        this.position();
    };
    compute() {
        this.computeDistance = au * 500;
        this.alphaRad = (this.alpha * Math.PI) / 180;
        this.deltaRad = (this.delta * Math.PI) / 180;
    };
    create() {
        this.geometry = new THREE.SphereGeometry(this.radius, this.w, this.h);
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            wireframe: true,
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };
    position() {
        // -----公式から軸を変えている
        this.x = this.computeDistance * Math.cos(this.deltaRad) * Math.sin(this.alphaRad);
        this.y = this.computeDistance * Math.sin(this.deltaRad);
        this.z = this.computeDistance * Math.cos(this.deltaRad) * Math.cos(this.alphaRad);
        this.mesh.position.set(this.x, this.y, this.z);
    };
};

// ==================================================
// Trajectory : 星座の軌跡の作成
// ==================================================
export class Trajectory {
    constructor(vectors) {
        this.vectors = vectors;
        this.points = [];
        this.progress = 0;
        this.init();
    };
    init() {
        this.compute();
        this.create();
    }
    compute() {
        for (let i = 0; i < this.vectors.length; i++) {
            this.points.push(this.vectors[i]);
        };
    };
    create() {
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff });
        this.material.transparent = true;
        this.material.opacity = 0;
        this.mesh = new THREE.Line(this.geometry, this.material);
    };
    view() {
        this._viewUpdate();
    };
    hide() {
        this._hideUpdate();
    };
    _viewUpdate() {
        const that = this;
        (function _update() {
            if (that.progress < 1) {
                that.progress += 1 / 60;
                that.material.opacity = that.progress;
                requestAnimationFrame(_update);
            } else {
                cancelAnimationFrame(_update);
            }
        }());
    };
    _hideUpdate() {
        const that = this;
        (function _update() {
            if (0 < that.progress) {
                that.progress -= 1 / 60;
                that.material.opacity = that.progress;
                requestAnimationFrame(_update);
            } else {
                cancelAnimationFrame(_update);
            }
        }());
    };
};

// ==================================================
// Line : 線の作成
// ==================================================
class Line {
    constructor(startVector, endVector) {
        this.points = [];
        this.points.push(startVector);
        this.points.push(endVector);
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.line = new THREE.Line(this.geometry, this.material);
        scene.add(this.line);
    }
    update(updateVector) {
        scene.remove(this.line);
        this.points.pop();
        this.updateVector = updateVector;
        this.points.push(this.updateVector);
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
        this.material = new THREE.LineBasicMaterial({
            color: 0xffffff,
        });
        this.line = new THREE.Line(this.geometry, this.material);
        scene.add(this.line);
    };
};

// ==================================================
// Decoration_text : 装飾テキスト
// ==================================================
export class Decoration_text {
    constructor(font, text, r, theta, phi) {
        this.loader = new FontLoader();
        this.font = font;
        this.text = text;
        this.r = r;
        this.theta = (theta * Math.PI) / 180;
        this.phi = (phi * Math.PI) / 180;
        this.loader.load(this.font, (font) => {
            this.font = font;
            this.init()

        });
    }
    init() {
        this.geometry = new TextGeometry(
            this.text,
            {
                font: this.font,
                size: 10,
                height: 0.1,
            }
        );
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };

    update(vec3, camera) {
        const basicVec3 = vec3;
        this.theta += (0.1 * Math.PI) / 180;
        this.mesh.position.x = basicVec3.x + this.r * Math.sin(this.theta) * Math.cos(this.phi);
        this.mesh.position.y = basicVec3.y + this.r * Math.sin(this.theta) * Math.sin(this.phi);
        this.mesh.position.z = basicVec3.z + this.r * Math.cos(this.theta);
        const cameraVec3 = camera.position.clone();
        this.mesh.lookAt(cameraVec3.x, cameraVec3.y, cameraVec3.z);
    }
}

export class Decoration_text_info {
    constructor(font, text) {
        this.loader = new FontLoader();
        this.font = font;
        this.text = text;
        this.loader.load(this.font, (font) => {
            this.font = font;
            this.init()

        });
    }
    init() {
        this.geometry = new TextGeometry(
            this.text,
            {
                font: this.font,
                size: 5,
                height: 0.1,
            }
        );
        this.material = new THREE.MeshBasicMaterial({
            color: 0xffffff
        });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    };

    update(vec3, camera) {
        const basicVec3 = vec3;
        this.mesh.position.x = basicVec3.x;
        this.mesh.position.y = basicVec3.y - 10;
        this.mesh.position.z = basicVec3.z;
        const cameraVec3 = camera.position.clone();
        this.mesh.lookAt(cameraVec3.x, cameraVec3.y, cameraVec3.z);
    }
}