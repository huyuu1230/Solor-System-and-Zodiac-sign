import * as THREE from "three";
import * as SIGN from "~/assets/js/data_Signs";

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

// ==================================================
// Sign : 星座の星の作成
// ==================================================
class Sign {
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
class Trajectory {
    constructor(vectors) {
        this.vectors = vectors;
        this.points = [];
        this.progress = 0;
        this.init();
    };
    init() {
        this.compute();
        this.createMesh();
    }
    compute() {
        for (let i = 0; i < this.vectors.length; i++) {
            this.points.push(this.vectors[i]);
        };
    };
    createMesh() {
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
// Three_Sign : 星座・軌跡を作成・制御するクラス
// ==================================================
export class Three_Sign {
    constructor() {

        this.init();
    };

    init() {
        this.create_Sign();
        this.create_Trajectory();
    };

    create_Sign() {
        this.Aries = SIGN.Aries;
        this.Taurus = SIGN.Taurus;
        this.Gemini = SIGN.Gemini;
        this.Cancer = SIGN.Cancer;
        this.Leo = SIGN.Leo;
        this.Virgo = SIGN.Virgo;
        this.Libra = SIGN.Libra;
        this.Scorpius = SIGN.Scorpius;
        this.Sagittarius = SIGN.Sagittarius;
        this.Capricornus = SIGN.Capricornus;
        this.Aquarius = SIGN.Aquarius;
        this.Pisces = SIGN.Pisces;
        this.#createSign(this.Aries);
        this.#createSign(this.Taurus);
        this.#createSign(this.Gemini);
        this.#createSign(this.Cancer);
        this.#createSign(this.Leo);
        this.#createSign(this.Virgo);
        this.#createSign(this.Libra);
        this.#createSign(this.Scorpius);
        this.#createSign(this.Sagittarius);
        this.#createSign(this.Capricornus);
        this.#createSign(this.Aquarius);
        this.#createSign(this.Pisces);
    };

    #createSign(sign) {
        for (let key in sign) {
            sign[key] = new Sign(sign[key].alpha, sign[key].delta);
        };
    };

    add_Sign(scene) {
        this.#addSign(scene, this.Aries);
        this.#addSign(scene, this.Taurus);
        this.#addSign(scene, this.Gemini);
        this.#addSign(scene, this.Cancer);
        this.#addSign(scene, this.Leo);
        this.#addSign(scene, this.Virgo);
        this.#addSign(scene, this.Libra);
        this.#addSign(scene, this.Scorpius);
        this.#addSign(scene, this.Sagittarius);
        this.#addSign(scene, this.Capricornus);
        this.#addSign(scene, this.Aquarius);
        this.#addSign(scene, this.Pisces);
    };

    #addSign(scene, sign) {
        for (let key in sign) {
            scene.add(sign[key].mesh);
        };
    };

    create_Trajectory() {
        this.Aries_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Aries.Alpha.x, this.Aries.Alpha.y, this.Aries.Alpha.z),
                new THREE.Vector3(this.Aries.Beta.x, this.Aries.Beta.y, this.Aries.Beta.z),
                new THREE.Vector3(this.Aries.Gamma.x, this.Aries.Gamma.y, this.Aries.Gamma.z),
                new THREE.Vector3(this.Aries.Delta.x, this.Aries.Delta.y, this.Aries.Delta.z),
            ]),
        };

        this.Taurus_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Taurus.Mu.x, this.Taurus.Mu.y, this.Taurus.Mu.z),
                new THREE.Vector3(this.Taurus.Number_88.x, this.Taurus.Number_88.y, this.Taurus.Number_88.z),
                new THREE.Vector3(this.Taurus.Number_90.x, this.Taurus.Number_90.y, this.Taurus.Number_90.z),
                new THREE.Vector3(this.Taurus.Lambda.x, this.Taurus.Lambda.y, this.Taurus.Lambda.z),
                new THREE.Vector3(this.Taurus.Gamma.x, this.Taurus.Gamma.y, this.Taurus.Gamma.z),
                new THREE.Vector3(this.Taurus.Delta_1.x, this.Taurus.Delta_1.y, this.Taurus.Delta_1.z),
                new THREE.Vector3(this.Taurus.Epsilon.x, this.Taurus.Epsilon.y, this.Taurus.Epsilon.z),
                new THREE.Vector3(this.Taurus.Kappa.x, this.Taurus.Kappa.y, this.Taurus.Kappa.z),
                new THREE.Vector3(this.Taurus.Number_37.x, this.Taurus.Number_37.y, this.Taurus.Number_37.z),
                new THREE.Vector3(this.Taurus.Number_27.x, this.Taurus.Number_27.y, this.Taurus.Number_27.z),
                new THREE.Vector3(this.Taurus.Eta.x, this.Taurus.Eta.y, this.Taurus.Eta.z),
                new THREE.Vector3(this.Taurus.Number_5.x, this.Taurus.Number_5.y, this.Taurus.Number_5.z),
                new THREE.Vector3(this.Taurus.Xi.x, this.Taurus.Xi.y, this.Taurus.Xi.z),
                new THREE.Vector3(this.Taurus.Omicron.x, this.Taurus.Omicron.y, this.Taurus.Omicron.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Taurus.Lambda.x, this.Taurus.Lambda.y, this.Taurus.Lambda.z),
                new THREE.Vector3(this.Taurus.Number_30.x, this.Taurus.Number_30.y, this.Taurus.Number_30.z),
                new THREE.Vector3(this.Taurus.Omicron.x, this.Taurus.Omicron.y, this.Taurus.Omicron.z),
                new THREE.Vector3(this.Taurus.Nu.x, this.Taurus.Nu.y, this.Taurus.Nu.z),
                new THREE.Vector3(this.Taurus.Number_10.x, this.Taurus.Number_10.y, this.Taurus.Number_10.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Taurus.Epsilon.x, this.Taurus.Epsilon.y, this.Taurus.Epsilon.z),
                new THREE.Vector3(this.Taurus.Tau.x, this.Taurus.Tau.y, this.Taurus.Tau.z),
                new THREE.Vector3(this.Taurus.Beta.x, this.Taurus.Beta.y, this.Taurus.Beta.z),
            ]),
            Trajectory_4: new Trajectory([
                new THREE.Vector3(this.Taurus.Gamma.x, this.Taurus.Gamma.y, this.Taurus.Gamma.z),
                new THREE.Vector3(this.Taurus.Theta_2.x, this.Taurus.Theta_2.y, this.Taurus.Theta_2.z),
                new THREE.Vector3(this.Taurus.Alpha.x, this.Taurus.Alpha.y, this.Taurus.Alpha.z),
                new THREE.Vector3(this.Taurus.Zehta.x, this.Taurus.Zehta.y, this.Taurus.Zehta.z),
            ]),
        };

        this.Gemini_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Gemini.M35.x, this.Gemini.M35.y, this.Gemini.M35.z),
                new THREE.Vector3(this.Gemini.Eta.x, this.Gemini.Eta.y, this.Gemini.Eta.z),
                new THREE.Vector3(this.Gemini.Mu.x, this.Gemini.Mu.y, this.Gemini.Mu.z),
                new THREE.Vector3(this.Gemini.Epsilon.x, this.Gemini.Epsilon.y, this.Gemini.Epsilon.z),
                new THREE.Vector3(this.Gemini.Tau.x, this.Gemini.Tau.y, this.Gemini.Tau.z),
                new THREE.Vector3(this.Gemini.Alpha.x, this.Gemini.Alpha.y, this.Gemini.Alpha.z),
                new THREE.Vector3(this.Gemini.Beta.x, this.Gemini.Beta.y, this.Gemini.Beta.z),
                new THREE.Vector3(this.Gemini.Delta.x, this.Gemini.Delta.y, this.Gemini.Delta.z),
                new THREE.Vector3(this.Gemini.Zehta.x, this.Gemini.Zehta.y, this.Gemini.Zehta.z),
                new THREE.Vector3(this.Gemini.Gamma.x, this.Gemini.Gamma.y, this.Gemini.Gamma.z),
                new THREE.Vector3(this.Gemini.Xi.x, this.Gemini.Xi.y, this.Gemini.Xi.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Gemini.Tau.x, this.Gemini.Tau.y, this.Gemini.Tau.z),
                new THREE.Vector3(this.Gemini.Theta.x, this.Gemini.Theta.y, this.Gemini.Theta.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Gemini.Delta.x, this.Gemini.Delta.y, this.Gemini.Delta.z),
                new THREE.Vector3(this.Gemini.Lambda.x, this.Gemini.Lambda.y, this.Gemini.Lambda.z),
            ]),
        };

        this.Cnacer_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Cancer.Alpha.x, this.Cancer.Alpha.y, this.Cancer.Alpha.z),
                new THREE.Vector3(this.Cancer.Delta.x, this.Cancer.Delta.y, this.Cancer.Delta.z),
                new THREE.Vector3(this.Cancer.Epsilon.x, this.Cancer.Epsilon.y, this.Cancer.Epsilon.z),
                new THREE.Vector3(this.Cancer.Gamma.x, this.Cancer.Gamma.y, this.Cancer.Gamma.z),
                new THREE.Vector3(this.Cancer.Eta.x, this.Cancer.Eta.y, this.Cancer.Eta.z),
                new THREE.Vector3(this.Cancer.Theta.x, this.Cancer.Theta.y, this.Cancer.Theta.z),
                new THREE.Vector3(this.Cancer.Delta.x, this.Cancer.Delta.y, this.Cancer.Delta.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Cancer.Theta.x, this.Cancer.Theta.y, this.Cancer.Theta.z),
                new THREE.Vector3(this.Cancer.Beta.x, this.Cancer.Beta.y, this.Cancer.Beta.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Cancer.Gamma.x, this.Cancer.Gamma.y, this.Cancer.Gamma.z),
                new THREE.Vector3(this.Cancer.Iota.x, this.Cancer.Iota.y, this.Cancer.Iota.z),
            ]),
        };

        this.Leo_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Leo.Lambda.x, this.Leo.Lambda.y, this.Leo.Lambda.z),
                new THREE.Vector3(this.Leo.Epsilon.x, this.Leo.Epsilon.y, this.Leo.Epsilon.z),
                new THREE.Vector3(this.Leo.Mu.x, this.Leo.Mu.y, this.Leo.Mu.z),
                new THREE.Vector3(this.Leo.Zehta.x, this.Leo.Zehta.y, this.Leo.Zehta.z),
                new THREE.Vector3(this.Leo.Gamma.x, this.Leo.Gamma.y, this.Leo.Gamma.z),
                new THREE.Vector3(this.Leo.Eta.x, this.Leo.Eta.y, this.Leo.Eta.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Leo.Eta.x, this.Leo.Eta.y, this.Leo.Eta.z),
                new THREE.Vector3(this.Leo.Number_60.x, this.Leo.Number_60.y, this.Leo.Number_60.z),
                new THREE.Vector3(this.Leo.Delta.x, this.Leo.Delta.y, this.Leo.Delta.z),
                new THREE.Vector3(this.Leo.Beta.x, this.Leo.Beta.y, this.Leo.Beta.z),
                new THREE.Vector3(this.Leo.Theta.x, this.Leo.Theta.y, this.Leo.Theta.z),
                new THREE.Vector3(this.Leo.Alpha.x, this.Leo.Alpha.y, this.Leo.Alpha.z),
                new THREE.Vector3(this.Leo.Eta.x, this.Leo.Eta.y, this.Leo.Eta.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Leo.Alpha.x, this.Leo.Alpha.y, this.Leo.Alpha.z),
                new THREE.Vector3(this.Leo.Rho.x, this.Leo.Rho.y, this.Leo.Rho.z),
                new THREE.Vector3(this.Leo.Number_31.x, this.Leo.Number_31.y, this.Leo.Number_31.z),
                new THREE.Vector3(this.Leo.Omicron.x, this.Leo.Omicron.y, this.Leo.Omicron.z),
            ]),
            Trajectory_4: new Trajectory([
                new THREE.Vector3(this.Leo.Theta.x, this.Leo.Theta.y, this.Leo.Theta.z),
                new THREE.Vector3(this.Leo.M65.x, this.Leo.M65.y, this.Leo.M65.z),
                new THREE.Vector3(this.Leo.M66.x, this.Leo.M66.y, this.Leo.M66.z),
                new THREE.Vector3(this.Leo.Iota.x, this.Leo.Iota.y, this.Leo.Iota.z),
                new THREE.Vector3(this.Leo.Sigma.x, this.Leo.Sigma.y, this.Leo.Sigma.z),
                new THREE.Vector3(this.Leo.Tau.x, this.Leo.Tau.y, this.Leo.Tau.z),
                new THREE.Vector3(this.Leo.Upsilon.x, this.Leo.Upsilon.y, this.Leo.Upsilon.z),
            ]),
        };

        this.Virgo_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Virgo.Beta.x, this.Virgo.Beta.y, this.Virgo.Beta.z),
                new THREE.Vector3(this.Virgo.Eta.x, this.Virgo.Eta.y, this.Virgo.Eta.z),
                new THREE.Vector3(this.Virgo.Gamma.x, this.Virgo.Gamma.y, this.Virgo.Gamma.z),
                new THREE.Vector3(this.Virgo.Delta.x, this.Virgo.Delta.y, this.Virgo.Delta.z),
                new THREE.Vector3(this.Virgo.Epsilon.x, this.Virgo.Epsilon.y, this.Virgo.Epsilon.z),
                new THREE.Vector3(this.Virgo.Omicron.x, this.Virgo.Omicron.y, this.Virgo.Omicron.z),
                new THREE.Vector3(this.Virgo.Nu.x, this.Virgo.Nu.y, this.Virgo.Nu.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Virgo.Theta.x, this.Virgo.Theta.y, this.Virgo.Theta.z),
                new THREE.Vector3(this.Virgo.Alpha.x, this.Virgo.Alpha.y, this.Virgo.Alpha.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Virgo.Theta.x, this.Virgo.Theta.y, this.Virgo.Theta.z),
                new THREE.Vector3(this.Virgo.Kappa.x, this.Virgo.Kappa.y, this.Virgo.Kappa.z),
            ]),
            Trajectory_4: new Trajectory([
                new THREE.Vector3(this.Virgo.Gamma.x, this.Virgo.Gamma.y, this.Virgo.Gamma.z),
                new THREE.Vector3(this.Virgo.Theta.x, this.Virgo.Theta.y, this.Virgo.Theta.z),
                new THREE.Vector3(this.Virgo.Iota.x, this.Virgo.Iota.y, this.Virgo.Iota.z),
                new THREE.Vector3(this.Virgo.Mu.x, this.Virgo.Mu.y, this.Virgo.Mu.z),
            ]),
            Trajectory_5: new Trajectory([
                new THREE.Vector3(this.Virgo.Delta.x, this.Virgo.Delta.y, this.Virgo.Delta.z),
                new THREE.Vector3(this.Virgo.Zehta.x, this.Virgo.Zehta.y, this.Virgo.Zehta.z),
            ]),
            Trajectory_6: new Trajectory([
                new THREE.Vector3(this.Virgo.Delta.x, this.Virgo.Delta.y, this.Virgo.Delta.z),
                new THREE.Vector3(this.Virgo.Tau.x, this.Virgo.Tau.y, this.Virgo.Tau.z),
                new THREE.Vector3(this.Virgo.Number_109.x, this.Virgo.Number_109.y, this.Virgo.Number_109.z),
            ]),
        };

        this.Libra_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Libra.Alpha.x, this.Libra.Alpha.y, this.Libra.Alpha.z),
                new THREE.Vector3(this.Libra.Beta.x, this.Libra.Beta.y, this.Libra.Beta.z),
                new THREE.Vector3(this.Libra.Gamma.x, this.Libra.Gamma.y, this.Libra.Gamma.z),
                new THREE.Vector3(this.Libra.Iota_1.x, this.Libra.Iota_1.y, this.Libra.Iota_1.z),
                new THREE.Vector3(this.Libra.Alpha.x, this.Libra.Alpha.y, this.Libra.Alpha.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Libra.Alpha.x, this.Libra.Alpha.y, this.Libra.Alpha.z),
                new THREE.Vector3(this.Libra.Sigma.x, this.Libra.Sigma.y, this.Libra.Sigma.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Libra.Gamma.x, this.Libra.Gamma.y, this.Libra.Gamma.z),
                new THREE.Vector3(this.Libra.Theta.x, this.Libra.Theta.y, this.Libra.Theta.z),
            ]),
        };

        this.Scorpius_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Scorpius.Nu.x, this.Scorpius.Nu.y, this.Scorpius.Nu.z),
                new THREE.Vector3(this.Scorpius.Beta_1.x, this.Scorpius.Beta_1.y, this.Scorpius.Beta_1.z),
                new THREE.Vector3(this.Scorpius.Delta.x, this.Scorpius.Delta.y, this.Scorpius.Delta.z),
                new THREE.Vector3(this.Scorpius.Pi.x, this.Scorpius.Pi.y, this.Scorpius.Pi.z),
                new THREE.Vector3(this.Scorpius.Rho.x, this.Scorpius.Rho.y, this.Scorpius.Rho.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Scorpius.Delta.x, this.Scorpius.Delta.y, this.Scorpius.Delta.z),
                new THREE.Vector3(this.Scorpius.Sigma.x, this.Scorpius.Sigma.y, this.Scorpius.Sigma.z),
                new THREE.Vector3(this.Scorpius.Alpha.x, this.Scorpius.Alpha.y, this.Scorpius.Alpha.z),
                new THREE.Vector3(this.Scorpius.Tau.x, this.Scorpius.Tau.y, this.Scorpius.Tau.z),
                new THREE.Vector3(this.Scorpius.Epsilon.x, this.Scorpius.Epsilon.y, this.Scorpius.Epsilon.z),
                new THREE.Vector3(this.Scorpius.Mu.x, this.Scorpius.Mu.y, this.Scorpius.Mu.z),
                new THREE.Vector3(this.Scorpius.Zehta_1.x, this.Scorpius.Zehta_1.y, this.Scorpius.Zehta_1.z),
                new THREE.Vector3(this.Scorpius.Eta.x, this.Scorpius.Eta.y, this.Scorpius.Eta.z),
                new THREE.Vector3(this.Scorpius.Theta.x, this.Scorpius.Theta.y, this.Scorpius.Theta.z),
                new THREE.Vector3(this.Scorpius.Iota_1.x, this.Scorpius.Iota_1.y, this.Scorpius.Iota_1.z),
                new THREE.Vector3(this.Scorpius.Upsilon.x, this.Scorpius.Upsilon.y, this.Scorpius.Upsilon.z),
                new THREE.Vector3(this.Scorpius.Lambda.x, this.Scorpius.Lambda.y, this.Scorpius.Lambda.z),
                new THREE.Vector3(this.Scorpius.Kappa.x, this.Scorpius.Kappa.y, this.Scorpius.Kappa.z),
            ]),
        };

        this.Sagittarius_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Sagittarius.Delta.x, this.Sagittarius.Delta.y, this.Sagittarius.Delta.z),
                new THREE.Vector3(this.Sagittarius.Gamma_2.x, this.Sagittarius.Gamma_2.y, this.Sagittarius.Gamma_2.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Sagittarius.Mu.x, this.Sagittarius.Mu.y, this.Sagittarius.Mu.z),
                new THREE.Vector3(this.Sagittarius.Lambda.x, this.Sagittarius.Lambda.y, this.Sagittarius.Lambda.z),
                new THREE.Vector3(this.Sagittarius.Delta.x, this.Sagittarius.Delta.y, this.Sagittarius.Delta.z),
                new THREE.Vector3(this.Sagittarius.Epsilon.x, this.Sagittarius.Epsilon.y, this.Sagittarius.Epsilon.z),
                new THREE.Vector3(this.Sagittarius.Eta.x, this.Sagittarius.Eta.y, this.Sagittarius.Eta.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Sagittarius.Rho_1.x, this.Sagittarius.Rho_1.y, this.Sagittarius.Rho_1.z),
                new THREE.Vector3(this.Sagittarius.Rho_2.x, this.Sagittarius.Rho_2.y, this.Sagittarius.Rho_2.z),
                new THREE.Vector3(this.Sagittarius.Number_43.x, this.Sagittarius.Number_43.y, this.Sagittarius.Number_43.z),
                new THREE.Vector3(this.Sagittarius.Pi.x, this.Sagittarius.Pi.y, this.Sagittarius.Pi.z),
                new THREE.Vector3(this.Sagittarius.Omicron.x, this.Sagittarius.Omicron.y, this.Sagittarius.Omicron.z),
                new THREE.Vector3(this.Sagittarius.Xi_2.x, this.Sagittarius.Xi_2.y, this.Sagittarius.Xi_2.z),
                new THREE.Vector3(this.Sagittarius.Xi_1.x, this.Sagittarius.Xi_1.y, this.Sagittarius.Xi_1.z),
            ]),
            Trajectory_4: new Trajectory([
                new THREE.Vector3(this.Sagittarius.Lambda.x, this.Sagittarius.Lambda.y, this.Sagittarius.Lambda.z),
                new THREE.Vector3(this.Sagittarius.Phi.x, this.Sagittarius.Phi.y, this.Sagittarius.Phi.z),
                new THREE.Vector3(this.Sagittarius.Sigma.x, this.Sagittarius.Sigma.y, this.Sagittarius.Sigma.z),
                new THREE.Vector3(this.Sagittarius.Omicron.x, this.Sagittarius.Omicron.y, this.Sagittarius.Omicron.z),
            ]),
            Trajectory_5: new Trajectory([
                new THREE.Vector3(this.Sagittarius.Sigma.x, this.Sagittarius.Sigma.y, this.Sagittarius.Sigma.z),
                new THREE.Vector3(this.Sagittarius.Tau.x, this.Sagittarius.Tau.y, this.Sagittarius.Tau.z),
                new THREE.Vector3(this.Sagittarius.Zehta.x, this.Sagittarius.Zehta.y, this.Sagittarius.Zehta.z),
                new THREE.Vector3(this.Sagittarius.Alpha.x, this.Sagittarius.Alpha.y, this.Sagittarius.Alpha.z),
                new THREE.Vector3(this.Sagittarius.Beta_1.x, this.Sagittarius.Beta_1.y, this.Sagittarius.Beta_1.z),
                new THREE.Vector3(this.Sagittarius.Beta_2.x, this.Sagittarius.Beta_2.y, this.Sagittarius.Beta_2.z),
            ]),
            Trajectory_6: new Trajectory([
                new THREE.Vector3(this.Sagittarius.Tau.x, this.Sagittarius.Tau.y, this.Sagittarius.Tau.z),
                new THREE.Vector3(this.Sagittarius.Omega.x, this.Sagittarius.Omega.y, this.Sagittarius.Omega.z),
                new THREE.Vector3(this.Sagittarius.Theta_2.x, this.Sagittarius.Theta_2.y, this.Sagittarius.Theta_2.z),
                new THREE.Vector3(this.Sagittarius.Theta_1.x, this.Sagittarius.Theta_1.y, this.Sagittarius.Theta_1.z),
                new THREE.Vector3(this.Sagittarius.Iota.x, this.Sagittarius.Iota.y, this.Sagittarius.Iota.z),
            ]),
        };

        this.Capricornus_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Capricornus.Alpha_2.x, this.Capricornus.Alpha_2.y, this.Capricornus.Alpha_2.z),
                new THREE.Vector3(this.Capricornus.Alpha_1.x, this.Capricornus.Alpha_1.y, this.Capricornus.Alpha_1.z),
                new THREE.Vector3(this.Capricornus.Beta_1.x, this.Capricornus.Beta_1.y, this.Capricornus.Beta_1.z),
                new THREE.Vector3(this.Capricornus.Theta.x, this.Capricornus.Theta.y, this.Capricornus.Theta.z),
                new THREE.Vector3(this.Capricornus.Iota.x, this.Capricornus.Iota.y, this.Capricornus.Iota.z),
                new THREE.Vector3(this.Capricornus.Gamma.x, this.Capricornus.Gamma.y, this.Capricornus.Gamma.z),
                new THREE.Vector3(this.Capricornus.Delta.x, this.Capricornus.Delta.y, this.Capricornus.Delta.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Capricornus.Gamma.x, this.Capricornus.Gamma.y, this.Capricornus.Gamma.z),
                new THREE.Vector3(this.Capricornus.Epsilon.x, this.Capricornus.Epsilon.y, this.Capricornus.Epsilon.z),
                new THREE.Vector3(this.Capricornus.Zehta.x, this.Capricornus.Zehta.y, this.Capricornus.Zehta.z),
                new THREE.Vector3(this.Capricornus.Number_24.x, this.Capricornus.Number_24.y, this.Capricornus.Number_24.z),
                new THREE.Vector3(this.Capricornus.Omega.x, this.Capricornus.Omega.y, this.Capricornus.Omega.z),
                new THREE.Vector3(this.Capricornus.Psi.x, this.Capricornus.Psi.y, this.Capricornus.Psi.z),
                new THREE.Vector3(this.Capricornus.Omicron.x, this.Capricornus.Omicron.y, this.Capricornus.Omicron.z),
                new THREE.Vector3(this.Capricornus.Rho.x, this.Capricornus.Rho.y, this.Capricornus.Rho.z),
                new THREE.Vector3(this.Capricornus.Beta_1.x, this.Capricornus.Beta_1.y, this.Capricornus.Beta_1.z),
            ]),
        };

        this.Aquarius_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Aquarius.Epsilon.x, this.Aquarius.Epsilon.y, this.Aquarius.Epsilon.z),
                new THREE.Vector3(this.Aquarius.Beta.x, this.Aquarius.Beta.y, this.Aquarius.Beta.z),
                new THREE.Vector3(this.Aquarius.Alpha.x, this.Aquarius.Alpha.y, this.Aquarius.Alpha.z),
                new THREE.Vector3(this.Aquarius.Theta.x, this.Aquarius.Theta.y, this.Aquarius.Theta.z),
                new THREE.Vector3(this.Aquarius.Iota.x, this.Aquarius.Iota.y, this.Aquarius.Iota.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Aquarius.Alpha.x, this.Aquarius.Alpha.y, this.Aquarius.Alpha.z),
                new THREE.Vector3(this.Aquarius.Gamma.x, this.Aquarius.Gamma.y, this.Aquarius.Gamma.z),
                new THREE.Vector3(this.Aquarius.Zehta.x, this.Aquarius.Zehta.y, this.Aquarius.Zehta.z),
                new THREE.Vector3(this.Aquarius.Eta.x, this.Aquarius.Eta.y, this.Aquarius.Eta.z),
            ]),
            Trajectory_3: new Trajectory([
                new THREE.Vector3(this.Aquarius.Zehta.x, this.Aquarius.Zehta.y, this.Aquarius.Zehta.z),
                new THREE.Vector3(this.Aquarius.Pi.x, this.Aquarius.Pi.y, this.Aquarius.Pi.z),
            ]),
            Trajectory_4: new Trajectory([
                new THREE.Vector3(this.Aquarius.Zehta.x, this.Aquarius.Zehta.y, this.Aquarius.Zehta.z),
                new THREE.Vector3(this.Aquarius.Kappa.x, this.Aquarius.Kappa.y, this.Aquarius.Kappa.z),
                new THREE.Vector3(this.Aquarius.Lambda.x, this.Aquarius.Lambda.y, this.Aquarius.Lambda.z),
                new THREE.Vector3(this.Aquarius.Delta.x, this.Aquarius.Delta.y, this.Aquarius.Delta.z),
                new THREE.Vector3(this.Aquarius.C_2.x, this.Aquarius.C_2.y, this.Aquarius.C_2.z),
                new THREE.Vector3(this.Aquarius.C_1.x, this.Aquarius.C_1.y, this.Aquarius.C_1.z),
                new THREE.Vector3(this.Aquarius.A_Psa.x, this.Aquarius.A_Psa.y, this.Aquarius.A_Psa.z),
            ]),
            Trajectory_5: new Trajectory([
                new THREE.Vector3(this.Aquarius.Zehta.x, this.Aquarius.Zehta.y, this.Aquarius.Zehta.z),
                new THREE.Vector3(this.Aquarius.Phi.x, this.Aquarius.Phi.y, this.Aquarius.Phi.z),
                new THREE.Vector3(this.Aquarius.Omega_2.x, this.Aquarius.Omega_2.y, this.Aquarius.Omega_2.z),
                new THREE.Vector3(this.Aquarius.A_Psa.x, this.Aquarius.A_Psa.y, this.Aquarius.A_Psa.z),
            ]),
        };

        this.Pisces_Trajectory = {
            Trajectory_1: new Trajectory([
                new THREE.Vector3(this.Pisces.Tau.x, this.Pisces.Tau.y, this.Pisces.Tau.z),
                new THREE.Vector3(this.Pisces.Upsilon.x, this.Pisces.Upsilon.y, this.Pisces.Upsilon.z),
                new THREE.Vector3(this.Pisces.Phi.x, this.Pisces.Phi.y, this.Pisces.Phi.z),
                new THREE.Vector3(this.Pisces.Chi.x, this.Pisces.Chi.y, this.Pisces.Chi.z),
                new THREE.Vector3(this.Pisces.Eta.x, this.Pisces.Eta.y, this.Pisces.Eta.z),
                new THREE.Vector3(this.Pisces.Omicron.x, this.Pisces.Omicron.y, this.Pisces.Omicron.z),
                new THREE.Vector3(this.Pisces.Alpha.x, this.Pisces.Alpha.y, this.Pisces.Alpha.z),
                new THREE.Vector3(this.Pisces.Xi.x, this.Pisces.Xi.y, this.Pisces.Xi.z),
                new THREE.Vector3(this.Pisces.Nu.x, this.Pisces.Nu.y, this.Pisces.Nu.z),
                new THREE.Vector3(this.Pisces.Mu.x, this.Pisces.Mu.y, this.Pisces.Mu.z),
                new THREE.Vector3(this.Pisces.Zehta.x, this.Pisces.Zehta.y, this.Pisces.Zehta.z),
                new THREE.Vector3(this.Pisces.Epsilon.x, this.Pisces.Epsilon.y, this.Pisces.Epsilon.z),
                new THREE.Vector3(this.Pisces.Delta.x, this.Pisces.Delta.y, this.Pisces.Delta.z),
                new THREE.Vector3(this.Pisces.Omega.x, this.Pisces.Omega.y, this.Pisces.Omega.z),
                new THREE.Vector3(this.Pisces.Iota.x, this.Pisces.Iota.y, this.Pisces.Iota.z),
                new THREE.Vector3(this.Pisces.Theta.x, this.Pisces.Theta.y, this.Pisces.Theta.z),
                new THREE.Vector3(this.Pisces.Gamma.x, this.Pisces.Gamma.y, this.Pisces.Gamma.z),
                new THREE.Vector3(this.Pisces.Kappa.x, this.Pisces.Kappa.y, this.Pisces.Kappa.z),
                new THREE.Vector3(this.Pisces.Lambda.x, this.Pisces.Lambda.y, this.Pisces.Lambda.z),
                new THREE.Vector3(this.Pisces.Omega.x, this.Pisces.Omega.y, this.Pisces.Omega.z),
            ]),
            Trajectory_2: new Trajectory([
                new THREE.Vector3(this.Pisces.Gamma.x, this.Pisces.Gamma.y, this.Pisces.Gamma.z),
                new THREE.Vector3(this.Pisces.Beta.x, this.Pisces.Beta.y, this.Pisces.Beta.z),
            ]),
        };
    };

    add_Trajectory(scene) {
        this.#addTrajectory(scene, this.Aries_Trajectory);
        this.#addTrajectory(scene, this.Taurus_Trajectory);
        this.#addTrajectory(scene, this.Gemini_Trajectory);
        this.#addTrajectory(scene, this.Cnacer_Trajectory);
        this.#addTrajectory(scene, this.Leo_Trajectory);
        this.#addTrajectory(scene, this.Virgo_Trajectory);
        this.#addTrajectory(scene, this.Libra_Trajectory);
        this.#addTrajectory(scene, this.Scorpius_Trajectory);
        this.#addTrajectory(scene, this.Sagittarius_Trajectory);
        this.#addTrajectory(scene, this.Capricornus_Trajectory);
        this.#addTrajectory(scene, this.Aquarius_Trajectory);
        this.#addTrajectory(scene, this.Pisces_Trajectory);
    };

    #addTrajectory(scene, trajectory) {
        for (let key in trajectory) {
            scene.add(trajectory[key].mesh);
        };
    };

    View_AllTrajectory() {
        this.#viewTrajectory(this.Aries_Trajectory);
        this.#viewTrajectory(this.Taurus_Trajectory);
        this.#viewTrajectory(this.Gemini_Trajectory);
        this.#viewTrajectory(this.Cnacer_Trajectory);
        this.#viewTrajectory(this.Leo_Trajectory);
        this.#viewTrajectory(this.Virgo_Trajectory);
        this.#viewTrajectory(this.Libra_Trajectory);
        this.#viewTrajectory(this.Scorpius_Trajectory);
        this.#viewTrajectory(this.Sagittarius_Trajectory);
        this.#viewTrajectory(this.Capricornus_Trajectory);
        this.#viewTrajectory(this.Aquarius_Trajectory);
        this.#viewTrajectory(this.Pisces_Trajectory);
    };

    #viewTrajectory(trajectory) {
        for (let key in trajectory) {
            trajectory[key].view();
        };
    };

    Hide_AllTrajectory() {
        this.#hideTrajectory(this.Aries_Trajectory);
        this.#hideTrajectory(this.Taurus_Trajectory);
        this.#hideTrajectory(this.Gemini_Trajectory);
        this.#hideTrajectory(this.Cnacer_Trajectory);
        this.#hideTrajectory(this.Leo_Trajectory);
        this.#hideTrajectory(this.Virgo_Trajectory);
        this.#hideTrajectory(this.Libra_Trajectory);
        this.#hideTrajectory(this.Scorpius_Trajectory);
        this.#hideTrajectory(this.Sagittarius_Trajectory);
        this.#hideTrajectory(this.Capricornus_Trajectory);
        this.#hideTrajectory(this.Aquarius_Trajectory);
        this.#hideTrajectory(this.Pisces_Trajectory);
    };

    watch() {
        const current = useRoute().name;
        this.Hide_AllTrajectory();
        if (current == 'signs-aries') {
            this.#viewTrajectory(this.Aries_Trajectory);
        } else if (current == 'signs-taurus') {
            this.#viewTrajectory(this.Taurus_Trajectory);
        } else if (current == 'signs-gemini') {
            this.#viewTrajectory(this.Gemini_Trajectory);
        } else if (current == 'signs-cancer') {
            this.#viewTrajectory(this.Cnacer_Trajectory);
        } else if (current == 'signs-leo') {
            this.#viewTrajectory(this.Leo_Trajectory);
        } else if (current == 'signs-virgo') {
            this.#viewTrajectory(this.Virgo_Trajectory);
        } else if (current == 'signs-libra') {
            this.#viewTrajectory(this.Libra_Trajectory);
        } else if (current == 'signs-scorpius') {
            this.#viewTrajectory(this.Scorpius_Trajectory);
        } else if (current == 'signs-sagittarius') {
            this.#viewTrajectory(this.Sagittarius_Trajectory);
        } else if (current == 'signs-capricornus') {
            this.#viewTrajectory(this.Capricornus_Trajectory);
        } else if (current == 'signs-aquarius') {
            this.#viewTrajectory(this.Aquarius_Trajectory);
        } else if (current == 'signs-pisces') {
            this.#viewTrajectory(this.Pisces_Trajectory);
        };
    };

    #hideTrajectory(trajectory) {
        for (let key in trajectory) {
            trajectory[key].hide();
        };
    };
};