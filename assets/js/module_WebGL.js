import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// ==================================================
// 変数 : 半径・距離・公転・自転に関する変数
// ==================================================
let earthRadius = 100;
let earthDiameter = earthRadius * 2;
let earthRevolution = (360 / 365 / 60 * Math.PI) / 180;
let earthRotation = (360 / 60 * Math.PI) / 180;
let sunRadius = earthRadius * 219.08;
let au = earthRadius * 23533.69;
let ly = au * 63241;
let pc = ly * 3.26;

function lerp(x, y, a) {
    return (1 - a) * x + a * y;
};

function easeInOutQuart(x) {
    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
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
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        // this.renderer.setClearColor(new THREE.Color(0x000000));
        this.renderer.setSize(this.width, this.height);
        this.init();
    };
    init() {
        this.#setting_webgl();
        this.#setting_camera();
        this.#setting_controls();
        this.#setting_camera_control();
        this.autoPlay();
    };
    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    update() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
    };
    rendering(planet, sign) {
        // 現在のルートがindex 且つ カメラの遷移が終了ている場合
        if (useRoute().name == "index" && this.cameraPositionProgress == 1) {
            // カメラの遷移終了から15秒間カウントする
            if (this.autoPlayCount < 15) {
                this.autoPlayCount += 1 / 60;
            }
            // カメラの遷移終了から15秒以上経過した場合、オートプレイを有効にする
            else {
                this.autoPlayUpdate();
            }
        }
        // 現在のルートがindex以外の場合カメラの移動を有効に
        else {
            this.update_camera(planet, sign);
        }
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
        this.cameraControl = false;
        this.cameraLookStart = this.controls.target.clone();
        this.cameraLookEnd = new THREE.Vector3(0, 0, 0);
        this.cameraPositionStart = new THREE.Vector3(0, au * 25, au * 50);
        this.cameraPositionEnd = new THREE.Vector3(0, au * 25, au * 50);
        // SP
        if (window.innerWidth < 768) {
            this.cameraPositionStart = new THREE.Vector3(0, au * 50, au * 100);
            this.cameraPositionEnd = new THREE.Vector3(0, au * 50, au * 100);
        }
        this.cameraLookProgress = 0;
        this.cameraPositionProgress = 0;
    };
    #cameraLerpLook(startVec3, endVec3, progress) {
        const newVec3 = new THREE.Vector3();
        newVec3.x = lerp(startVec3.x, endVec3.x, easeInOutQuart(progress));
        newVec3.y = lerp(startVec3.y, endVec3.y, easeInOutQuart(progress));
        newVec3.z = lerp(startVec3.z, endVec3.z, easeInOutQuart(progress));
        this.controls.target.set(newVec3.x, newVec3.y, newVec3.z);
    };
    #cameraLerpPosition(startVec3, endVec3, progress) {
        const newVec3 = new THREE.Vector3();
        newVec3.x = lerp(startVec3.x, endVec3.x, easeInOutQuart(progress));
        newVec3.y = lerp(startVec3.y, endVec3.y, easeInOutQuart(progress));
        newVec3.z = lerp(startVec3.z, endVec3.z, easeInOutQuart(progress));
        this.camera.position.set(newVec3.x, newVec3.y, newVec3.z);
    };
    #cameraLerpProgress() {
        if (this.cameraLookProgress < 1) {
            this.cameraLookProgress += 1 / 120;
        } else {
            this.cameraLookProgress = 1
        };
        if (this.cameraPositionProgress < 1) {
            this.cameraPositionProgress += 1 / 180;
        } else {
            this.cameraPositionProgress = 1;
        };
    };
    #update_camera() {
        this.#cameraLerpProgress();
        this.#cameraLerpLook(this.cameraLookStart, this.cameraLookEnd, this.cameraLookProgress);
        this.#cameraLerpPosition(this.cameraPositionStart, this.cameraPositionEnd, this.cameraPositionProgress);
    };
    change_camera() {
        this.cameraLookProgress = 0;
        this.cameraPositionProgress = 0;
        this.cameraLookStart = this.controls.target.clone();
        this.cameraPositionStart = this.camera.position.clone();
    };
    update_camera(planet, sign) {
        const current = useRoute().name;
        if (current == "index") {
            this.cameraLookEnd = new THREE.Vector3(0, 0, 0);
            this.cameraPositionEnd = new THREE.Vector3(0, au * 25, au * 50);
            // SP
            if (window.innerWidth < 768) {
                this.cameraPositionEnd = new THREE.Vector3(0, au * 50, au * 100);
            }
            this.autoPlay();
        }
        else if (current == "planets-mercury") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Mercury);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Mercury);
        }
        else if (current == "planets-venus") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Venus);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Venus);
        }
        else if (current == "planets-earth") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Earth);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Earth);
        }
        else if (current == "planets-mars") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Mars);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Mars);
        }
        else if (current == "planets-jupiter") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Jupiter);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Jupiter);
        }
        else if (current == "planets-saturn") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Saturn);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Saturn);
        }
        else if (current == "planets-uranus") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Uranus);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Uranus);
        }
        else if (current == "planets-neptune") {
            this.cameraLookEnd = this.#toPlanet_Look(planet.Neptune);
            this.cameraPositionEnd = this.#toPlanet_Position(planet.Neptune);
        }
        else if (current == "signs-aries") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Aries);
        }
        else if (current == "signs-taurus") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Taurus);
        }
        else if (current == "signs-gemini") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Gemini);
        }
        else if (current == "signs-cancer") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Cancer);
        }
        else if (current == "signs-leo") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Leo);
        }
        else if (current == "signs-virgo") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Virgo);
        }
        else if (current == "signs-libra") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Libra);
        }
        else if (current == "signs-scorpius") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Scorpius);
        }
        else if (current == "signs-sagittarius") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Sagittarius);
        }
        else if (current == "signs-capricornus") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Capricornus);
        }
        else if (current == "signs-aquarius") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Aquarius);
        } else if (current == "signs-pisces") {
            this.cameraLookEnd = this.#toSign_Look();
            this.cameraPositionEnd = this.#toSign_Position(sign.Pisces);
        } else {
            this.cameraLookEnd = new THREE.Vector3(0, 0, 0);
            this.cameraPositionEnd = new THREE.Vector3(0, au * 25, au * 50);
            // SP
            if (window.innerWidth < 768) {
                this.cameraPositionEnd = new THREE.Vector3(0, au * 50, au * 100);
            }
        };

        this.#cameraLerpProgress();
        this.#cameraLerpLook(this.cameraLookStart, this.cameraLookEnd, this.cameraLookProgress);
        this.#cameraLerpPosition(this.cameraPositionStart, this.cameraPositionEnd, this.cameraPositionProgress);
    };
    // ==================================================
    // その他
    // ==================================================
    #setting_touch() {
        document.addEventListener("touchmove", (e) => { e.preventDefault(); }, { passive: false });
    };

    #toPlanet_Look(planet) {
        const look = planet.mesh.position.clone();
        return look;
    };

    // 惑星の半径を計算
    setting_planetDistance(planet) {
        const planets = [];
        planets.push(planet.Mercury);
        planets.push(planet.Venus);
        planets.push(planet.Earth);
        planets.push(planet.Mars);
        planets.push(planet.Jupiter);
        planets.push(planet.Saturn);
        planets.push(planet.Uranus);
        planets.push(planet.Neptune);
        let average = 0;
        for (let i = 0; i < planets.length; i++) {
            average += planets[i].computeRadius;
        };
        average = (average / (planets.length + 1)) / 2;
        this.planetRadius = average;
    };

    #toPlanet_Position(planet) {
        const distance = planet.computeDistance;
        const radius = this.planetRadius;
        const theta = planet.alphaRad;
        const phi = planet.deltaRad;
        let x, y, z;
        if (window.innerWidth > 768) {
            x = (distance + radius * 10) * Math.sin(theta) * Math.cos(phi);
            y = (distance + radius * 10) * Math.sin(theta) * Math.sin(phi);
            z = (distance + radius * 10) * Math.cos(theta);
        } else {
            x = (distance + radius * 15) * Math.sin(theta) * Math.cos(phi);
            y = (distance + radius * 15) * Math.sin(theta) * Math.sin(phi);
            z = (distance + radius * 15) * Math.cos(theta);
        }
        return new THREE.Vector3(x, y, z);
    };

    #toSign_Look() {
        return new THREE.Vector3(0, 0, 0);
    };

    #toSign_Position(sign) {
        let x = 0;
        let y = 0;
        let z = 0;
        for (let key in sign) {
            x += sign[key].x;
            y += sign[key].y;
            z += sign[key].z;
        };
        // SP
        if (window.innerWidth > 768) {
            x = x / Object.keys(sign).length * 2;
            y = y / Object.keys(sign).length * 2;
            z = z / Object.keys(sign).length * 2;
        } else {
            x = x / Object.keys(sign).length * 3;
            y = y / Object.keys(sign).length * 3;
            z = z / Object.keys(sign).length * 3;
        };
        return new THREE.Vector3(x, y, z);
    };

    autoPlay() {
        this.autoPlayCount = 0;
        const cameraPosition = this.cameraPositionEnd.clone();

        const x = cameraPosition.x;
        const y = cameraPosition.y;
        const z = cameraPosition.z;

        // 直交座標から極座標を求める
        this.r = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
        this.theta = Math.acos(z / Math.sqrt(x ** 2 + y ** 2 + z ** 2));
        this.phi = Math.sign(y) * Math.acos(x / Math.sqrt(x ** 2 + y ** 2));

        this.x = this.r * Math.sin(this.theta) * Math.cos(this.phi);
        this.y = this.r * Math.sin(this.theta) * Math.sin(this.phi);
        this.z = this.r * Math.cos(this.theta);
    };

    autoPlayUpdate() {
        this.theta += 0.1 * Math.PI / 180;
        this.phi += 0.05 * Math.PI / 180;
        this.x = this.r * Math.sin(this.theta) * Math.cos(this.phi);
        this.y = this.r * Math.sin(this.theta) * Math.sin(this.phi);
        this.z = this.r * Math.cos(this.theta);
        this.camera.position.set(this.x, this.y, this.z);
    };
};

/**
 * @param {string} webgl // コンテナのid名 or class名
 */
class _WebGL {
    constructor(webgl) {
        this.webgl = document.querySelector(webgl);
        this.scene = new THREE.Scene();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setSize(this.width, this.height);
        this.init();
    }

    init() {

    }

    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    update() {
        this.renderer.render(this.scene, this.camera);
        this.controls.update();
        if (this.playMode == 0) {
            // play
        } else if (this.playMode == 1) {
            // control
        } else if (this.playMode == 2) {
            //auto  play
        }
    }

    watch() {

    }

    _init_params() {


    }

    _init_controls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
    }

    _init_camera() {
        this.cameraFov = 45;
        this.cameraAspect = window.innerWidth / window.innerHeight;
        this.cameraNear = 0.1;
        this.cameraFar = pc; // 1pc
        this.camera = new THREE.PerspectiveCamera(
            this.cameraFov,
            this.cameraAspect,
            this.cameraNear,
            this.cameraFar,
        );
    };

    _init_camera_control() {
        this.playMode = 0;
        this.cameraLS = new THREE.Vector3(0, 0, 0);
        this.cameraLE = new THREE.Vector3(0, 0, 0);
        this.cameraPS = new THREE.Vector3(0, 0, 0);
        this.cameraPE = new THREE.Vector3(0, au * 25, au * 50);
        this.cameraLProg = 0;
        this.cameraPProg = 0;
    };

    _init_autoPlay() {
        this.autoR = 0;
        this.autoTheta = 0;
        this.autoPhi = 0;
        this.autoX = this.autoR * Math.sin(this.autoTheta) * Math.cos(this.autoPhi);
        this.autoY = this.autoR * Math.sin(this.autoTheta) * Math.sin(this.autoPhi);
        this.autoZ = this.autoR * Math.cos(this.autoTheta);
    };

    _update_cameraPos(startVec3, endVec3, prog) {
        const newVec3 = new THREE.Vector3();
        newVec3.x = lerp(startVec3.x, endVec3.x, prog);
        newVec3.y = lerp(startVec3.x, endVec3.x, prog);
        newVec3.z = lerp(startVec3.z, endVec3.z, prog);
        this.camera.position.copy(newVec3);
    }

    _update_cameraLook(startVec3, endVec3, prog) {
        const newVec3 = new THREE.Vector3();
        newVec3.x = lerp(startVec3.x, endVec3.x, prog);
        newVec3.y = lerp(startVec3.x, endVec3.x, prog);
        newVec3.z = lerp(startVec3.z, endVec3.z, prog);
        this.controls.target.copy(newVec3);
    }

    _update_cameraProg() {
        if (this.cameraLProg < 1) {
            this.cameraLProg += 1 / 60;
        }
        if(this.cameraPProg < 1){
            this.cameraPProg += 1 / 120;
        }
        
    }
}