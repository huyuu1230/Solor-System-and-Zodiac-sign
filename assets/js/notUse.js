// --------------------惑星をクリックイベントオブジェクトに追加
function pushPlanets() {
    Planets.push(Mercury.Planet.mesh);
    Planets.push(Venus.Planet.mesh);
    Planets.push(Earth.Planet.mesh);
    Planets.push(Mars.Planet.mesh);
    Planets.push(Jupiter.Planet.mesh);
    Planets.push(Saturn.Planet.mesh);
    Planets.push(Uranus.Planet.mesh);
    Planets.push(Neptune.Planet.mesh);
};

// --------------------テキストの作成
function createText(obj, data, text) {
    obj.Title = new PlanetText(
        text,
        Font,
        0.1,
        data.Planet.x + data.Planet.r * 10,
        data.Planet.y + data.Planet.r * 10,
        data.Planet.z + data.Planet.r * 10,
    );
};
// --------------------テキストの表示
function addText(obj) {
    obj.Title.add(scene)
};
// --------------------テキストのアニメーション
function updateText(obj, data) {
    obj.Title.update(
        data.Planet.x + data.Planet.r * 3,
        data.Planet.y + data.Planet.r * 3,
        data.Planet.z + data.Planet.r * 3,
        camera,
    );
};

// -----
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
    }
  };

  // --------------------フォント
  // function onLoadFont(font) {
  //   Font = font;
  // };
  // function loadFont() {
  //   fontLoader.load("/fonts/helvetiker_regular.typeface.json", onLoadFont);
  // };
// ==================================================
// 星座のカメラ制御
// ==================================================
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
// ----------惑星との距離を調整するのはココ
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
  }
};

  // ==================================================
// Function カメラ制御
// ==================================================
// ----------カメラの位置を線形補完
function cameraLerpPosition(x, y, z) {
  if (durationPosition <= 1) {
    durationPosition += 0.003;
  };

  const startPosition = webgl.camera.position.clone();
  const endPosition = new THREE.Vector3(x, y, z);

  const newPosition = new THREE.Vector3();
  newPosition.x = lerp(startPosition.x, endPosition.x, easeInOutQuart(durationPosition));
  newPosition.y = lerp(startPosition.y, endPosition.y, easeInOutQuart(durationPosition));
  newPosition.z = lerp(startPosition.z, endPosition.z, easeInOutQuart(durationPosition));

  webgl.camera.position.copy(newPosition);
};
// ----------カメラの方向を線形補完
function cameraLerpLook(x, y, z) {

  if (durationLook <= 1) {
    durationLook += 0.004;
  };

  const startLook = webgl.controls.target.clone();
  const endLook = new THREE.Vector3(x, y, z);

  const newLook = new THREE.Vector3();
  newLook.x = lerp(startLook.x, endLook.x, easeInOutQuart(durationLook));
  newLook.y = lerp(startLook.y, endLook.y, easeInOutQuart(durationLook));
  newLook.z = lerp(startLook.z, endLook.z, easeInOutQuart(durationLook));

  webgl.controls.target.copy(newLook);
};