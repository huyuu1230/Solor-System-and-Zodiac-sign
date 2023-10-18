
// ==================================================
// 惑星
// ==================================================
function three_planet() {
    // -----惑星のインスタンスを作成
    Sun = new Planet_Sun();
    Mercury = createPlanet(PLANET.Mercury);
    Venus = createPlanet(PLANET.Venus);
    Earth = createPlanet(PLANET.Earth);
    Mars = createPlanet(PLANET.Mars);
    Jupiter = createPlanet(PLANET.Jupiter);
    Saturn = createPlanet(PLANET.Saturn);
    Uranus = createPlanet(PLANET.Uranus);
    Neptune = createPlanet(PLANET.Neptune);
    // -----惑星をシーンに追加
    webgl.scene.add(Sun.mesh);
    webgl.scene.add(Mercury.mesh);
    webgl.scene.add(Venus.mesh);
    webgl.scene.add(Earth.mesh);
    webgl.scene.add(Mars.mesh);
    webgl.scene.add(Jupiter.mesh);
    webgl.scene.add(Saturn.mesh);
    webgl.scene.add(Uranus.mesh);
    webgl.scene.add(Neptune.mesh);
    // -----惑星のアニメーションを開始
    Mercury.update();
    Venus.update();
    Earth.update();
    Mars.update();
    Jupiter.update();
    Saturn.update();
    Uranus.update();
    Neptune.update();
    // -----function 惑星のインスタンスを作成する関数
    function createPlanet(data) {
        return new Planet(data.name, data.radius, data.distance, data.revolution, data.rotation, data.alpha, data.delta);
    };
};

// ==================================================
// 惑星の軌道
// ==================================================
function three_orbit() {
    // -----惑星の軌道のインスタンス化
    MercuryOrbit = new Orbit(PLANET.Mercury.distance);
    VenusOrbit = new Orbit(PLANET.Venus.distance);
    EarthOrbit = new Orbit(PLANET.Earth.distance);
    MarsOrbit = new Orbit(PLANET.Mars.distance);
    JupiterOrbit = new Orbit(PLANET.Jupiter.distance);
    SaturnOrbit = new Orbit(PLANET.Saturn.distance);
    UranusOrbit = new Orbit(PLANET.Uranus.distance);
    NeptuneOrbit = new Orbit(PLANET.Neptune.distance);
    // -----惑星の軌道をシーンに追加
    webgl.scene.add(MercuryOrbit.mesh);
    webgl.scene.add(VenusOrbit.mesh);
    webgl.scene.add(EarthOrbit.mesh);
    webgl.scene.add(MarsOrbit.mesh);
    webgl.scene.add(JupiterOrbit.mesh);
    webgl.scene.add(SaturnOrbit.mesh);
    webgl.scene.add(UranusOrbit.mesh);
    webgl.scene.add(NeptuneOrbit.mesh);
};

// ==================================================
// 星座
// ==================================================
function three_sign() {
    // -----星座のインスタンスを作成
    createSign(Aries);
    createSign(Taurus);
    createSign(Gemini);
    createSign(Cancer);
    createSign(Leo);
    createSign(Virgo);
    createSign(Libra);
    createSign(Scorpius);
    createSign(Sagittarius);
    createSign(Capricornus);
    createSign(Aquarius);
    createSign(Pisces);
    // -----星座をシーンに追加
    addSign(Aries);
    addSign(Taurus);
    addSign(Gemini);
    addSign(Cancer);
    addSign(Leo);
    addSign(Virgo);
    addSign(Libra);
    addSign(Scorpius);
    addSign(Sagittarius);
    addSign(Capricornus);
    addSign(Aquarius);
    addSign(Pisces);
    // -----function 星座のインスタンスを作成する関数
    function createSign(sign) {
        for (let key in sign) {
            sign[key] = new Sign(sign[key].alpha, sign[key].delta);
        };
    };
    // -----function 星座をシーンに追加する関数
    function addSign(sign) {
        for (let key in sign) {
            WEBGL.scene.add(sign[key].mesh)
        };
    };
};

// ==================================================
// 星座の軌跡
// ==================================================
function three_trajectory() {
    // ----------星座の軌跡の座標を設定
    Aries_Trajectory = {
        Trajectory_1: new Trajectory([
            new THREE.Vector3(Aries.Alpha.x, Aries.Alpha.y, Aries.Alpha.z),
            new THREE.Vector3(Aries.Beta.x, Aries.Beta.y, Aries.Beta.z),
            new THREE.Vector3(Aries.Gamma.x, Aries.Gamma.y, Aries.Gamma.z),
            new THREE.Vector3(Aries.Delta.x, Aries.Delta.y, Aries.Delta.z),
        ]),
    };

    Taurus_Trajectory = {
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

    Gemini_Trajectory = {
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

    Cnacer_Trajectory = {
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

    Leo_Trajectory = {
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

    Virgo_Trajectory = {
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
            new THREE.Vector3(Virgo.Number_109.x, Virgo.Number_109.y, Virgo.Number_109.z),
        ]),
    };

    Libra_Trajectory = {
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

    Scorpius_Trajectory = {
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

    Sagittarius_Trajectory = {
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

    Capricornus_Trajectory = {
        Trajectory_1: new Trajectory([
            new THREE.Vector3(Capricornus.Alpha_2.x, Capricornus.Alpha_2.y, Capricornus.Alpha_2.z),
            new THREE.Vector3(Capricornus.Alpha_1.x, Capricornus.Alpha_1.y, Capricornus.Alpha_1.z),
            new THREE.Vector3(Capricornus.Beta_1.x, Capricornus.Beta_1.y, Capricornus.Beta_1.z),
            new THREE.Vector3(Capricornus.Theta.x, Capricornus.Theta.y, Capricornus.Theta.z),
            new THREE.Vector3(Capricornus.Iota.x, Capricornus.Iota.y, Capricornus.Iota.z),
            new THREE.Vector3(Capricornus.Gamma.x, Capricornus.Gamma.y, Capricornus.Gamma.z),
            new THREE.Vector3(Capricornus.Delta.x, Capricornus.Delta.y, Capricornus.Delta.z),
        ]),
        Trajectory_2: new Trajectory([
            new THREE.Vector3(Capricornus.Gamma.x, Capricornus.Gamma.y, Capricornus.Gamma.z),
            new THREE.Vector3(Capricornus.Epsilon.x, Capricornus.Epsilon.y, Capricornus.Epsilon.z),
            new THREE.Vector3(Capricornus.Zehta.x, Capricornus.Zehta.y, Capricornus.Zehta.z),
            new THREE.Vector3(Capricornus.Number_24.x, Capricornus.Number_24.y, Capricornus.Number_24.z),
            new THREE.Vector3(Capricornus.Omega.x, Capricornus.Omega.y, Capricornus.Omega.z),
            new THREE.Vector3(Capricornus.Psi.x, Capricornus.Psi.y, Capricornus.Psi.z),
            new THREE.Vector3(Capricornus.Omicron.x, Capricornus.Omicron.y, Capricornus.Omicron.z),
            new THREE.Vector3(Capricornus.Rho.x, Capricornus.Rho.y, Capricornus.Rho.z),
            new THREE.Vector3(Capricornus.Beta_1.x, Capricornus.Beta_1.y, Capricornus.Beta_1.z),
        ]),
    };

    Aquarius_Trajectory = {
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

    Pisces_Trajectory = {
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

    // ----------星座の軌跡を追加
    addTrajectory(Aries_Trajectory);
    addTrajectory(Taurus_Trajectory);
    addTrajectory(Gemini_Trajectory);
    addTrajectory(Cnacer_Trajectory);
    addTrajectory(Leo_Trajectory);
    addTrajectory(Virgo_Trajectory);
    addTrajectory(Libra_Trajectory);
    addTrajectory(Scorpius_Trajectory);
    addTrajectory(Sagittarius_Trajectory);
    addTrajectory(Capricornus_Trajectory);
    addTrajectory(Aquarius_Trajectory);
    addTrajectory(Pisces_Trajectory);
};

// ==============================
// 惑星のカメラの位置
// ==============================
function toPlanetPosition(planet) {
    const positionVec3 = planet.mesh.position.clone();
    positionVec3.x += planet.computeRadius * 5;
    positionVec3.y += planet.computeRadius * 5;
    positionVec3.z += planet.computeRadius * 5;
    return positionVec3;
};

// ==============================
// 惑星のカメラの方向
// ==============================
function toPlanetLook(planet) {
    const lookVec3 = planet.mesh.position.clone();
    return lookVec3;
};

// ==============================
// 星座の中心
// ==============================
function toSign(sign) {
    let x = 0;
    let y = 0;
    let z = 0;
    for (let key in sign) {
        x += sign[key].x;
        y += sign[key].y;
        z += sign[key].z;
    };
    x = x / Object.keys(sign).length * 2;
    y = y / Object.keys(sign).length * 2;
    z = z / Object.keys(sign).length * 2;
    return new THREE.Vector3(x, y, z);
};

// ==============================
// 星座の軌跡の表示・非表示
// ==============================
function viewTrajectory(trajectory) {
    for (let key in trajectory) {
      trajectory[key].view();
    };
  };
  
  function hideTrajectory(trajectory) {
    for (let key in trajectory) {
      trajectory[key].hide();
    };
  };

  function AllViewTrajectory() {
    viewTrajectory(Aries_Trajectory);
    viewTrajectory(Taurus_Trajectory);
    viewTrajectory(Gemini_Trajectory);
    viewTrajectory(Cnacer_Trajectory);
    viewTrajectory(Leo_Trajectory);
    viewTrajectory(Virgo_Trajectory);
    viewTrajectory(Libra_Trajectory);
    viewTrajectory(Scorpius_Trajectory);
    viewTrajectory(Sagittarius_Trajectory);
    viewTrajectory(Capricornus_Trajectory);
    viewTrajectory(Aquarius_Trajectory);
    viewTrajectory(Pisces_Trajectory);
    // ----------STYLE
    trajectory = true;
    StyleTrajectory();
  };
  function AllHideTrajectory() {
    hideTrajectory(Aries_Trajectory);
    hideTrajectory(Taurus_Trajectory);
    hideTrajectory(Gemini_Trajectory);
    hideTrajectory(Cnacer_Trajectory);
    hideTrajectory(Leo_Trajectory);
    hideTrajectory(Virgo_Trajectory);
    hideTrajectory(Libra_Trajectory);
    hideTrajectory(Scorpius_Trajectory);
    hideTrajectory(Sagittarius_Trajectory);
    hideTrajectory(Capricornus_Trajectory);
    hideTrajectory(Aquarius_Trajectory);
    hideTrajectory(Pisces_Trajectory);
    // ----------STYLE
    trajectory = false;
    StyleTrajectory();
  };
// ==============================
// ページの変更した時に行う
// ==============================
function changePage() {
    if (currentPage == 'planets-mercury') {
        currentTarget = 'mercury';
        change_camera(toPlanetLook(Mercury), toPlanetPosition(Mercury));
    } else if (currentPage == 'planets-venus') {
        currentTarget = 'venus';
        change_camera(toPlanetLook(Venus), toPlanetPosition(Venus));
    } else if (currentPage == 'planets-earth') {
        currentTarget = 'earth';
        change_camera(toPlanetLook(Earth), toPlanetPosition(Earth));
    } else if (currentPage == 'planets-mars') {
        currentTarget = 'mars';
        change_camera(toPlanetLook(Mars), toPlanetPosition(Mars));
    } else if (currentPage == 'planets-jupiter') {
        currentTarget = 'jupiter';
        change_camera(toPlanetLook(Jupiter), toPlanetPosition(Jupiter));
    } else if (currentPage == 'planets-saturn') {
        currentTarget = 'saturn';
        change_camera(toPlanetLook(Saturn), toPlanetPosition(Saturn));
    } else if (currentPage == 'planets-uranus') {
        currentTarget = 'uranus';
        change_camera(toPlanetLook(Uranus), toPlanetPosition(Uranus));
    } else if (currentPage == 'planets-neptune') {
        currentTarget = 'neptune';
        change_camera(toPlanetLook(Neptune), toPlanetPosition(Neptune));
    } else if (currentPage == 'signs-aries') {
        currentTarget = 'aries';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Aries));
    } else if (currentPage == 'signs-taurus') {
        currentTarget = 'taurus';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Taurus));
    } else if (currentPage == 'signs-gemini') {
        currentTarget = 'gemini';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Gemini));
    } else if (currentPage == 'signs-cancer') {
        currentTarget = 'cancer';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Cancer));
    } else if (currentPage == 'signs-leo') {
        currentTarget = 'leo';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Leo));
    } else if (currentPage == 'signs-virgo') {
        currentTarget = 'virgo';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Virgo));
    } else if (currentPage == 'signs-libra') {
        currentTarget = 'libra';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Libra));
    } else if (currentPage == 'signs-scorpius') {
        currentTarget = 'scorpius';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Scorpius));
    } else if (currentPage == 'signs-sagittarius') {
        currentTarget = 'sagittarius';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Sagittarius));
    } else if (currentPage == 'signs-capricornus') {
        currentTarget = 'capricornus';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Capricornus));
    } else if (currentPage == 'signs-aquarius') {
        currentTarget = 'aquarius';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Aquarius));
    } else if (currentPage == 'signs-pisces') {
        currentTarget = 'pisces';
        change_camera(new THREE.Vector3(0, 0, 0), toSign(Pisces));
    } else {
        currentTarget = '';
    };
};

function cameraTarget() {
    if (currentTarget == 'mercury') {
        cameraLerpPosition(Mercury.mesh.position.x + Mercury.computeRadius * 5, Mercury.mesh.position.y + Mercury.computeRadius * 5, Mercury.mesh.position.z + Mercury.computeRadius * 5);
        cameraLerpLook(Mercury.mesh.position.x, Mercury.mesh.position.y, Mercury.mesh.position.z);
    } else if (currentTarget == 'venus') {
        cameraLerpPosition(Venus.mesh.position.x + Venus.computeRadius * 5, Venus.mesh.position.y + Venus.computeRadius * 5, Venus.mesh.position.z + Venus.computeRadius * 5);
        cameraLerpLook(Venus.mesh.position.x, Venus.mesh.position.y, Venus.mesh.position.z);
    } else if (currentTarget == 'earth') {
        cameraLerpPosition(Earth.mesh.position.x + Earth.computeRadius * 5, Earth.mesh.position.y + Earth.computeRadius * 5, Earth.mesh.position.z + Earth.computeRadius * 5);
        cameraLerpLook(Earth.mesh.position.x, Earth.mesh.position.y, Earth.mesh.position.z);
    } else if (currentTarget == 'mars') {
        cameraLerpPosition(Mars.mesh.position.x + Mars.computeRadius * 5, Mars.mesh.position.y + Mars.computeRadius * 5, Mars.mesh.position.z + Mars.computeRadius * 5);
        cameraLerpLook(Mars.mesh.position.x, Mars.mesh.position.y, Mars.mesh.position.z);
    } else if (currentTarget == 'jupiter') {
        cameraLerpPosition(Jupiter.mesh.position.x + Jupiter.computeRadius * 5, Jupiter.mesh.position.y + Jupiter.computeRadius * 5, Jupiter.mesh.position.z + Jupiter.computeRadius * 5);
        cameraLerpLook(Jupiter.mesh.position.x, Jupiter.mesh.position.y, Jupiter.mesh.position.z);
    } else if (currentTarget == 'saturn') {
        cameraLerpPosition(Saturn.mesh.position.x + Saturn.computeRadius * 5, Saturn.mesh.position.y + Saturn.computeRadius * 5, Saturn.mesh.position.z + Saturn.computeRadius * 5);
        cameraLerpLook(Saturn.mesh.position.x, Saturn.mesh.position.y, Saturn.mesh.position.z);
    } else if (currentTarget == 'uranus') {
        cameraLerpPosition(Uranus.mesh.position.x + Uranus.computeRadius * 5, Uranus.mesh.position.y + Uranus.computeRadius * 5, Uranus.mesh.position.z + Uranus.computeRadius * 5);
        cameraLerpLook(Uranus.mesh.position.x, Uranus.mesh.position.y, Uranus.mesh.position.z);
    } else if (currentTarget == 'neptune') {
        cameraLerpPosition(Neptune.mesh.position.x + Neptune.computeRadius * 5, Neptune.mesh.position.y + Neptune.computeRadius * 5, Neptune.mesh.position.z + Neptune.computeRadius * 5);
        cameraLerpLook(Neptune.mesh.position.x, Neptune.mesh.position.y, Neptune.mesh.position.z);
    } else if (currentTarget == 'aries') {
        cameraLerpPosition(toSign(Aries).x, toSign(Aries).y, toSign(Aries).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'taurus') {
        cameraLerpPosition(toSign(Taurus).x, toSign(Taurus).y, toSign(Taurus).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'gemini') {
        cameraLerpPosition(toSign(Gemini).x, toSign(Gemini).y, toSign(Gemini).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'cancer') {
        cameraLerpPosition(toSign(Cancer).x, toSign(Cancer).y, toSign(Cancer).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'leo') {
        cameraLerpPosition(toSign(Leo).x, toSign(Leo).y, toSign(Leo).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'virgo') {
        cameraLerpPosition(toSign(Virgo).x, toSign(Virgo).y, toSign(Virgo).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'libra') {
        cameraLerpPosition(toSign(Libra).x, toSign(Libra).y, toSign(Libra).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'scorpius') {
        cameraLerpPosition(toSign(Scorpius).x, toSign(Scorpius).y, toSign(Scorpius).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'sagittarius') {
        cameraLerpPosition(toSign(Sagittarius).x, toSign(Sagittarius).y, toSign(Sagittarius).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'capricornus') {
        cameraLerpPosition(toSign(Capricornus).x, toSign(Capricornus).y, toSign(Capricornus).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'aquarius') {
        cameraLerpPosition(toSign(Aquarius).x, toSign(Aquarius).y, toSign(Aquarius).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'pisces') {
        cameraLerpPosition(toSign(Pisces).x, toSign(Pisces).y, toSign(Pisces).z);
        cameraLerpLook(0, 0, 0);
    } else if (currentTarget == 'control') {
        // no script
    } else {
        cameraLerpPosition(0, au * 25, au * 50);
        cameraLerpLook(0, 0, 0);
    };
};