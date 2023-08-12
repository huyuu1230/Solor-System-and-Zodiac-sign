import * as THREE from "three";

// --------------------星座
class Sign {
    constructor(raddius, alpha, delta) {
        this.r = raddius;
        this.w = 100;
        this.h = 100;
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

// --------------------星座の軌跡
class Trajectory {
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

// --------------------星座の作成・表示
function createSign(sign) {
    for (let key in sign) {
        sign[key] = new Sign(sign[key].alpha, sign[key].delta);
    };
};
function addSign(sign) {
    for (let key in sign) {
        sign[key].add(scene);
    };
};

function addTrajectory(trajectory) {
    for (let key in trajectory) {
        trajectory[key].add(scene);
    };
};



// --------------------星座の軌跡配列
const Aries_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Aries.Alpha.x, Aries.Alpha.y, Aries.Alpha.z),
        new THREE.Vector3(Aries.Beta.x, Aries.Beta.y, Aries.Beta.z),
        new THREE.Vector3(Aries.Gamma.x, Aries.Gamma.y, Aries.Gamma.z),
        new THREE.Vector3(Aries.Delta.x, Aries.Delta.y, Aries.Delta.z),
    ]),
};

const Taurus_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Taurus.Mu.x, Taurus.Mu.y, Taurus.Mu.z),
        new THREE.Vector3(Taurus.Number_88.x, Taurus.Number_88.y, Taurus.Number_88.z),
        new THREE.Vector3(Taurus.Number_90.x, Taurus.Number_90.y, Taurus.Number_90.z),
        new THREE.Vector3(Taurus.Lambda.x, Taurus.Lambda.y, Taurus.Lambda.z),
        new THREE.Vector3(Taurus.Gamma.x, Taurus.Gamma.y, Taurus.Gamma.z),
        new THREE.Vector3(Taurus.Delta_1.x, Taurus.Delta_1.y, Taurus.Delta_1.z),
        new THREE.Vector3(Taurus.Epsilon.x, Taurus.Epsilon.y, Taurus.Epsilon.z),
        new THREE.Vector3(Taurus.Kappa.x, Taurus.Kappa.y, Taurus.Kappa.z),
        new THREE.Vector3(Taurus.Number_37.x, Taurus.Number_37.y, Taurus.Number_37.z),
        new THREE.Vector3(Taurus.Number_27.x, Taurus.Number_27.y, Taurus.Number_27.z),
        new THREE.Vector3(Taurus.Eta.x, Taurus.Eta.y, Taurus.Eta.z),
        new THREE.Vector3(Taurus.Number_5.x, Taurus.Number_5.y, Taurus.Number_5.z),
        new THREE.Vector3(Taurus.Xi.x, Taurus.Xi.y, Taurus.Xi.z),
        new THREE.Vector3(Taurus.Omicron.x, Taurus.Omicron.y, Taurus.Omicron.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Taurus.Lambda.x, Taurus.Lambda.y, Taurus.Lambda.z),
        new THREE.Vector3(Taurus.Number_30.x, Taurus.Number_30.y, Taurus.Number_30.z),
        new THREE.Vector3(Taurus.Omicron.x, Taurus.Omicron.y, Taurus.Omicron.z),
        new THREE.Vector3(Taurus.Nu.x, Taurus.Nu.y, Taurus.Nu.z),
        new THREE.Vector3(Taurus.Number_10.x, Taurus.Number_10.y, Taurus.Number_10.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Taurus.Epsilon.x, Taurus.Epsilon.y, Taurus.Epsilon.z),
        new THREE.Vector3(Taurus.Tau.x, Taurus.Tau.y, Taurus.Tau.z),
        new THREE.Vector3(Taurus.Beta.x, Taurus.Beta.y, Taurus.Beta.z),
    ]),
    Trajectory_4: new Trajectory([
        new THREE.Vector3(Taurus.Gamma.x, Taurus.Gamma.y, Taurus.Gamma.z),
        new THREE.Vector3(Taurus.Theta_2.x, Taurus.Theta_2.y, Taurus.Theta_2.z),
        new THREE.Vector3(Taurus.Alpha.x, Taurus.Alpha.y, Taurus.Alpha.z),
        new THREE.Vector3(Taurus.Zehta.x, Taurus.Zehta.y, Taurus.Zehta.z),
    ]),
};

const Gemini_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Gemini.M35.x, Gemini.M35.y, Gemini.M35.z),
        new THREE.Vector3(Gemini.Eta.x, Gemini.Eta.y, Gemini.Eta.z),
        new THREE.Vector3(Gemini.Mu.x, Gemini.Mu.y, Gemini.Mu.z),
        new THREE.Vector3(Gemini.Epsilon.x, Gemini.Epsilon.y, Gemini.Epsilon.z),
        new THREE.Vector3(Gemini.Tau.x, Gemini.Tau.y, Gemini.Tau.z),
        new THREE.Vector3(Gemini.Alpha.x, Gemini.Alpha.y, Gemini.Alpha.z),
        new THREE.Vector3(Gemini.Beta.x, Gemini.Beta.y, Gemini.Beta.z),
        new THREE.Vector3(Gemini.Delta.x, Gemini.Delta.y, Gemini.Delta.z),
        new THREE.Vector3(Gemini.Zehta.x, Gemini.Zehta.y, Gemini.Zehta.z),
        new THREE.Vector3(Gemini.Gamma.x, Gemini.Gamma.y, Gemini.Gamma.z),
        new THREE.Vector3(Gemini.Xi.x, Gemini.Xi.y, Gemini.Xi.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Gemini.Tau.x, Gemini.Tau.y, Gemini.Tau.z),
        new THREE.Vector3(Gemini.Theta.x, Gemini.Theta.y, Gemini.Theta.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Gemini.Delta.x, Gemini.Delta.y, Gemini.Delta.z),
        new THREE.Vector3(Gemini.Lambda.x, Gemini.Lambda.y, Gemini.Lambda.z),
    ]),
};

const Cnacer_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Cancer.Alpha.x, Cancer.Alpha.y, Cancer.Alpha.z),
        new THREE.Vector3(Cancer.Delta.x, Cancer.Delta.y, Cancer.Delta.z),
        new THREE.Vector3(Cancer.Epsilon.x, Cancer.Epsilon.y, Cancer.Epsilon.z),
        new THREE.Vector3(Cancer.Gamma.x, Cancer.Gamma.y, Cancer.Gamma.z),
        new THREE.Vector3(Cancer.Eta.x, Cancer.Eta.y, Cancer.Eta.z),
        new THREE.Vector3(Cancer.Theta.x, Cancer.Theta.y, Cancer.Theta.z),
        new THREE.Vector3(Cancer.Delta.x, Cancer.Delta.y, Cancer.Delta.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Cancer.Theta.x, Cancer.Theta.y, Cancer.Theta.z),
        new THREE.Vector3(Cancer.Beta.x, Cancer.Beta.y, Cancer.Beta.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Cancer.Gamma.x, Cancer.Gamma.y, Cancer.Gamma.z),
        new THREE.Vector3(Cancer.Iota.x, Cancer.Iota.y, Cancer.Iota.z),
    ]),
};

const Leo_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Leo.Lambda.x, Leo.Lambda.y, Leo.Lambda.z),
        new THREE.Vector3(Leo.Epsilon.x, Leo.Epsilon.y, Leo.Epsilon.z),
        new THREE.Vector3(Leo.Mu.x, Leo.Mu.y, Leo.Mu.z),
        new THREE.Vector3(Leo.Zehta.x, Leo.Zehta.y, Leo.Zehta.z),
        new THREE.Vector3(Leo.Gamma.x, Leo.Gamma.y, Leo.Gamma.z),
        new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
        new THREE.Vector3(Leo.Number_60.x, Leo.Number_60.y, Leo.Number_60.z),
        new THREE.Vector3(Leo.Delta.x, Leo.Delta.y, Leo.Delta.z),
        new THREE.Vector3(Leo.Beta.x, Leo.Beta.y, Leo.Beta.z),
        new THREE.Vector3(Leo.Theta.x, Leo.Theta.y, Leo.Theta.z),
        new THREE.Vector3(Leo.Alpha.x, Leo.Alpha.y, Leo.Alpha.z),
        new THREE.Vector3(Leo.Eta.x, Leo.Eta.y, Leo.Eta.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Leo.Alpha.x, Leo.Alpha.y, Leo.Alpha.z),
        new THREE.Vector3(Leo.Rho.x, Leo.Rho.y, Leo.Rho.z),
        new THREE.Vector3(Leo.Number_31.x, Leo.Number_31.y, Leo.Number_31.z),
        new THREE.Vector3(Leo.Omicron.x, Leo.Omicron.y, Leo.Omicron.z),
    ]),
    Trajectory_4: new Trajectory([
        new THREE.Vector3(Leo.Theta.x, Leo.Theta.y, Leo.Theta.z),
        new THREE.Vector3(Leo.M65.x, Leo.M65.y, Leo.M65.z),
        new THREE.Vector3(Leo.M66.x, Leo.M66.y, Leo.M66.z),
        new THREE.Vector3(Leo.Iota.x, Leo.Iota.y, Leo.Iota.z),
        new THREE.Vector3(Leo.Sigma.x, Leo.Sigma.y, Leo.Sigma.z),
        new THREE.Vector3(Leo.Tau.x, Leo.Tau.y, Leo.Tau.z),
        new THREE.Vector3(Leo.Upsilon.x, Leo.Upsilon.y, Leo.Upsilon.z),
    ]),
};

const Virgo_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Virgo.Beta.x, Virgo.Beta.y, Virgo.Beta.z),
        new THREE.Vector3(Virgo.Eta.x, Virgo.Eta.y, Virgo.Eta.z),
        new THREE.Vector3(Virgo.Gamma.x, Virgo.Gamma.y, Virgo.Gamma.z),
        new THREE.Vector3(Virgo.Delta.x, Virgo.Delta.y, Virgo.Delta.z),
        new THREE.Vector3(Virgo.Epsilon.x, Virgo.Epsilon.y, Virgo.Epsilon.z),
        new THREE.Vector3(Virgo.Omicron.x, Virgo.Omicron.y, Virgo.Omicron.z),
        new THREE.Vector3(Virgo.Nu.x, Virgo.Nu.y, Virgo.Nu.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
        new THREE.Vector3(Virgo.Alpha.x, Virgo.Alpha.y, Virgo.Alpha.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
        new THREE.Vector3(Virgo.Kappa.x, Virgo.Kappa.y, Virgo.Kappa.z),
    ]),
    Trajectory_4: new Trajectory([
        new THREE.Vector3(Virgo.Gamma.x, Virgo.Gamma.y, Virgo.Gamma.z),
        new THREE.Vector3(Virgo.Theta.x, Virgo.Theta.y, Virgo.Theta.z),
        new THREE.Vector3(Virgo.Iota.x, Virgo.Iota.y, Virgo.Iota.z),
        new THREE.Vector3(Virgo.Mu.x, Virgo.Mu.y, Virgo.Mu.z),
    ]),
    Trajectory_5: new Trajectory([
        new THREE.Vector3(Virgo.Delta.x, Virgo.Delta.y, Virgo.Delta.z),
        new THREE.Vector3(Virgo.Zehta.x, Virgo.Zehta.y, Virgo.Zehta.z),
    ]),
    Trajectory_6: new Trajectory([
        new THREE.Vector3(Virgo.Delta.x, Virgo.Delta.y, Virgo.Delta.z),
        new THREE.Vector3(Virgo.Tau.x, Virgo.Tau.y, Virgo.Tau.z),
        new THREE.Vector3(Virgo.Number_109.x, Virgo.Number_109.y, Virgo.Number_109.z)
    ]),
};

const Libra_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Libra.Alpha.x, Libra.Alpha.y, Libra.Alpha.z),
        new THREE.Vector3(Libra.Beta.x, Libra.Beta.y, Libra.Beta.z),
        new THREE.Vector3(Libra.Gamma.x, Libra.Gamma.y, Libra.Gamma.z),
        new THREE.Vector3(Libra.Iota_1.x, Libra.Iota_1.y, Libra.Iota_1.z),
        new THREE.Vector3(Libra.Alpha.x, Libra.Alpha.y, Libra.Alpha.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Libra.Alpha.x, Libra.Alpha.y, Libra.Alpha.z),
        new THREE.Vector3(Libra.Sigma.x, Libra.Sigma.y, Libra.Sigma.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Libra.Gamma.x, Libra.Gamma.y, Libra.Gamma.z),
        new THREE.Vector3(Libra.Theta.x, Libra.Theta.y, Libra.Theta.z),
    ]),
};

const Scorpius_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Scorpius.Nu.x, Scorpius.Nu.y, Scorpius.Nu.z),
        new THREE.Vector3(Scorpius.Beta_1.x, Scorpius.Beta_1.y, Scorpius.Beta_1.z),
        new THREE.Vector3(Scorpius.Delta.x, Scorpius.Delta.y, Scorpius.Delta.z),
        new THREE.Vector3(Scorpius.Pi.x, Scorpius.Pi.y, Scorpius.Pi.z),
        new THREE.Vector3(Scorpius.Rho.x, Scorpius.Rho.y, Scorpius.Rho.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Scorpius.Delta.x, Scorpius.Delta.y, Scorpius.Delta.z),
        new THREE.Vector3(Scorpius.Sigma.x, Scorpius.Sigma.y, Scorpius.Sigma.z),
        new THREE.Vector3(Scorpius.Alpha.x, Scorpius.Alpha.y, Scorpius.Alpha.z),
        new THREE.Vector3(Scorpius.Tau.x, Scorpius.Tau.y, Scorpius.Tau.z),
        new THREE.Vector3(Scorpius.Epsilon.x, Scorpius.Epsilon.y, Scorpius.Epsilon.z),
        new THREE.Vector3(Scorpius.Mu.x, Scorpius.Mu.y, Scorpius.Mu.z),
        new THREE.Vector3(Scorpius.Zehta_1.x, Scorpius.Zehta_1.y, Scorpius.Zehta_1.z),
        new THREE.Vector3(Scorpius.Eta.x, Scorpius.Eta.y, Scorpius.Eta.z),
        new THREE.Vector3(Scorpius.Theta.x, Scorpius.Theta.y, Scorpius.Theta.z),
        new THREE.Vector3(Scorpius.Iota_1.x, Scorpius.Iota_1.y, Scorpius.Iota_1.z),
        new THREE.Vector3(Scorpius.Upsilon.x, Scorpius.Upsilon.y, Scorpius.Upsilon.z),
        new THREE.Vector3(Scorpius.Lambda.x, Scorpius.Lambda.y, Scorpius.Lambda.z),
        new THREE.Vector3(Scorpius.Kappa.x, Scorpius.Kappa.y, Scorpius.Kappa.z),
    ]),
};

const Sagittarius_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Sagittarius.Delta.x, Sagittarius.Delta.y, Sagittarius.Delta.z),
        new THREE.Vector3(Sagittarius.Gamma_2.x, Sagittarius.Gamma_2.y, Sagittarius.Gamma_2.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Sagittarius.Mu.x, Sagittarius.Mu.y, Sagittarius.Mu.z),
        new THREE.Vector3(Sagittarius.Lambda.x, Sagittarius.Lambda.y, Sagittarius.Lambda.z),
        new THREE.Vector3(Sagittarius.Delta.x, Sagittarius.Delta.y, Sagittarius.Delta.z),
        new THREE.Vector3(Sagittarius.Epsilon.x, Sagittarius.Epsilon.y, Sagittarius.Epsilon.z),
        new THREE.Vector3(Sagittarius.Eta.x, Sagittarius.Eta.y, Sagittarius.Eta.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Sagittarius.Rho_1.x, Sagittarius.Rho_1.y, Sagittarius.Rho_1.z),
        new THREE.Vector3(Sagittarius.Rho_2.x, Sagittarius.Rho_2.y, Sagittarius.Rho_2.z),
        new THREE.Vector3(Sagittarius.Number_43.x, Sagittarius.Number_43.y, Sagittarius.Number_43.z),
        new THREE.Vector3(Sagittarius.Pi.x, Sagittarius.Pi.y, Sagittarius.Pi.z),
        new THREE.Vector3(Sagittarius.Omicron.x, Sagittarius.Omicron.y, Sagittarius.Omicron.z),
        new THREE.Vector3(Sagittarius.Xi_2.x, Sagittarius.Xi_2.y, Sagittarius.Xi_2.z),
        new THREE.Vector3(Sagittarius.Xi_1.x, Sagittarius.Xi_1.y, Sagittarius.Xi_1.z),
    ]),
    Trajectory_4: new Trajectory([
        new THREE.Vector3(Sagittarius.Lambda.x, Sagittarius.Lambda.y, Sagittarius.Lambda.z),
        new THREE.Vector3(Sagittarius.Phi.x, Sagittarius.Phi.y, Sagittarius.Phi.z),
        new THREE.Vector3(Sagittarius.Sigma.x, Sagittarius.Sigma.y, Sagittarius.Sigma.z),
        new THREE.Vector3(Sagittarius.Omicron.x, Sagittarius.Omicron.y, Sagittarius.Omicron.z),
    ]),
    Trajectory_5: new Trajectory([
        new THREE.Vector3(Sagittarius.Sigma.x, Sagittarius.Sigma.y, Sagittarius.Sigma.z),
        new THREE.Vector3(Sagittarius.Tau.x, Sagittarius.Tau.y, Sagittarius.Tau.z),
        new THREE.Vector3(Sagittarius.Zehta.x, Sagittarius.Zehta.y, Sagittarius.Zehta.z),
        new THREE.Vector3(Sagittarius.Alpha.x, Sagittarius.Alpha.y, Sagittarius.Alpha.z),
        new THREE.Vector3(Sagittarius.Beta_1.x, Sagittarius.Beta_1.y, Sagittarius.Beta_1.z),
        new THREE.Vector3(Sagittarius.Beta_2.x, Sagittarius.Beta_2.y, Sagittarius.Beta_2.z),
    ]),
    Trajectory_6: new Trajectory([
        new THREE.Vector3(Sagittarius.Tau.x, Sagittarius.Tau.y, Sagittarius.Tau.z),
        new THREE.Vector3(Sagittarius.Omega.x, Sagittarius.Omega.y, Sagittarius.Omega.z),
        new THREE.Vector3(Sagittarius.Theta_2.x, Sagittarius.Theta_2.y, Sagittarius.Theta_2.z),
        new THREE.Vector3(Sagittarius.Theta_1.x, Sagittarius.Theta_1.y, Sagittarius.Theta_1.z),
        new THREE.Vector3(Sagittarius.Iota.x, Sagittarius.Iota.y, Sagittarius.Iota.z),
    ]),
};

const Capriconus_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Capriconus.Alpha_2.x, Capriconus.Alpha_2.y, Capriconus.Alpha_2.z),
        new THREE.Vector3(Capriconus.Alpha_1.x, Capriconus.Alpha_1.y, Capriconus.Alpha_1.z),
        new THREE.Vector3(Capriconus.Beta_1.x, Capriconus.Beta_1.y, Capriconus.Beta_1.z),
        new THREE.Vector3(Capriconus.Theta.x, Capriconus.Theta.y, Capriconus.Theta.z),
        new THREE.Vector3(Capriconus.Iota.x, Capriconus.Iota.y, Capriconus.Iota.z),
        new THREE.Vector3(Capriconus.Gamma.x, Capriconus.Gamma.y, Capriconus.Gamma.z),
        new THREE.Vector3(Capriconus.Delta.x, Capriconus.Delta.y, Capriconus.Delta.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Capriconus.Gamma.x, Capriconus.Gamma.y, Capriconus.Gamma.z),
        new THREE.Vector3(Capriconus.Epsilon.x, Capriconus.Epsilon.y, Capriconus.Epsilon.z),
        new THREE.Vector3(Capriconus.Zehta.x, Capriconus.Zehta.y, Capriconus.Zehta.z),
        new THREE.Vector3(Capriconus.Number_24.x, Capriconus.Number_24.y, Capriconus.Number_24.z),
        new THREE.Vector3(Capriconus.Omega.x, Capriconus.Omega.y, Capriconus.Omega.z),
        new THREE.Vector3(Capriconus.Psi.x, Capriconus.Psi.y, Capriconus.Psi.z),
        new THREE.Vector3(Capriconus.Omicron.x, Capriconus.Omicron.y, Capriconus.Omicron.z),
        new THREE.Vector3(Capriconus.Rho.x, Capriconus.Rho.y, Capriconus.Rho.z),
        new THREE.Vector3(Capriconus.Beta_1.x, Capriconus.Beta_1.y, Capriconus.Beta_1.z),
    ]),
};

const Aquarius_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Aquarius.Epsilon.x, Aquarius.Epsilon.y, Aquarius.Epsilon.z),
        new THREE.Vector3(Aquarius.Beta.x, Aquarius.Beta.y, Aquarius.Beta.z),
        new THREE.Vector3(Aquarius.Alpha.x, Aquarius.Alpha.y, Aquarius.Alpha.z),
        new THREE.Vector3(Aquarius.Theta.x, Aquarius.Theta.y, Aquarius.Theta.z),
        new THREE.Vector3(Aquarius.Iota.x, Aquarius.Iota.y, Aquarius.Iota.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Aquarius.Alpha.x, Aquarius.Alpha.y, Aquarius.Alpha.z),
        new THREE.Vector3(Aquarius.Gamma.x, Aquarius.Gamma.y, Aquarius.Gamma.z),
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Eta.x, Aquarius.Eta.y, Aquarius.Eta.z),
    ]),
    Trajectory_3: new Trajectory([
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Pi.x, Aquarius.Pi.y, Aquarius.Pi.z),
    ]),
    Trajectory_4: new Trajectory([
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Kappa.x, Aquarius.Kappa.y, Aquarius.Kappa.z),
        new THREE.Vector3(Aquarius.Lambda.x, Aquarius.Lambda.y, Aquarius.Lambda.z),
        new THREE.Vector3(Aquarius.Delta.x, Aquarius.Delta.y, Aquarius.Delta.z),
        new THREE.Vector3(Aquarius.C_2.x, Aquarius.C_2.y, Aquarius.C_2.z),
        new THREE.Vector3(Aquarius.C_1.x, Aquarius.C_1.y, Aquarius.C_1.z),
        new THREE.Vector3(Aquarius.A_Psa.x, Aquarius.A_Psa.y, Aquarius.A_Psa.z),
    ]),
    Trajectory_5: new Trajectory([
        new THREE.Vector3(Aquarius.Zehta.x, Aquarius.Zehta.y, Aquarius.Zehta.z),
        new THREE.Vector3(Aquarius.Phi.x, Aquarius.Phi.y, Aquarius.Phi.z),
        new THREE.Vector3(Aquarius.Omega_2.x, Aquarius.Omega_2.y, Aquarius.Omega_2.z),
        new THREE.Vector3(Aquarius.A_Psa.x, Aquarius.A_Psa.y, Aquarius.A_Psa.z),
    ]),
};

const Pisces_Trajectory = {
    Trajectory_1: new Trajectory([
        new THREE.Vector3(Pisces.Tau.x, Pisces.Tau.y, Pisces.Tau.z),
        new THREE.Vector3(Pisces.Upsilon.x, Pisces.Upsilon.y, Pisces.Upsilon.z),
        new THREE.Vector3(Pisces.Phi.x, Pisces.Phi.y, Pisces.Phi.z),
        new THREE.Vector3(Pisces.Chi.x, Pisces.Chi.y, Pisces.Chi.z),
        new THREE.Vector3(Pisces.Eta.x, Pisces.Eta.y, Pisces.Eta.z),
        new THREE.Vector3(Pisces.Omicron.x, Pisces.Omicron.y, Pisces.Omicron.z),
        new THREE.Vector3(Pisces.Alpha.x, Pisces.Alpha.y, Pisces.Alpha.z),
        new THREE.Vector3(Pisces.Xi.x, Pisces.Xi.y, Pisces.Xi.z),
        new THREE.Vector3(Pisces.Nu.x, Pisces.Nu.y, Pisces.Nu.z),
        new THREE.Vector3(Pisces.Mu.x, Pisces.Mu.y, Pisces.Mu.z),
        new THREE.Vector3(Pisces.Zehta.x, Pisces.Zehta.y, Pisces.Zehta.z),
        new THREE.Vector3(Pisces.Epsilon.x, Pisces.Epsilon.y, Pisces.Epsilon.z),
        new THREE.Vector3(Pisces.Delta.x, Pisces.Delta.y, Pisces.Delta.z),
        new THREE.Vector3(Pisces.Omega.x, Pisces.Omega.y, Pisces.Omega.z),
        new THREE.Vector3(Pisces.Iota.x, Pisces.Iota.y, Pisces.Iota.z),
        new THREE.Vector3(Pisces.Theta.x, Pisces.Theta.y, Pisces.Theta.z),
        new THREE.Vector3(Pisces.Gamma.x, Pisces.Gamma.y, Pisces.Gamma.z),
        new THREE.Vector3(Pisces.Kappa.x, Pisces.Kappa.y, Pisces.Kappa.z),
        new THREE.Vector3(Pisces.Lambda.x, Pisces.Lambda.y, Pisces.Lambda.z),
        new THREE.Vector3(Pisces.Omega.x, Pisces.Omega.y, Pisces.Omega.z),
    ]),
    Trajectory_2: new Trajectory([
        new THREE.Vector3(Pisces.Gamma.x, Pisces.Gamma.y, Pisces.Gamma.z),
        new THREE.Vector3(Pisces.Beta.x, Pisces.Beta.y, Pisces.Beta.z),
    ]),
};
