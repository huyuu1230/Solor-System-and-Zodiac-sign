<template>
    <div id="geometry">
        <h2>Geometry</h2>
        <section class="paragraph">
            <h3>THREE.BoxGeometry / 四角形</h3>
            <h4>new THREE.BoxGeometry('width','height','depth')</h4>
            <p>
                width : float 四角形の横幅 X軸<br>
                height : float 四角形の高さ Y軸<br>
                depth : float 四角形の奥行き Z軸<br>
            </p>
        </section>
        <section class="paragraph">
            <h3>THREE.SphereGeometry / 球体</h3>
            <h4>new THREE.SphereGeometry('radius','widthSegments','heightSegments')</h4>
            <p>
                radius : float 四角形の横幅 X軸<br>
                widthSegments : float 四角形の高さ Y軸<br>
                heightSegments : float 四角形の奥行き Z軸<br>
            </p>
        </section>
        <section class="paragraph">
            <h3>THREE.SphereGeometry / 球体</h3>
            <h4>new THREE.SphereGeometry('radius','widthSegments','heightSegments')</h4>
            <p>
                radius : float 四角形の横幅 X軸<br>
                widthSegments : float 四角形の高さ Y軸<br>
                heightSegments : float 四角形の奥行き Z軸<br>
            </p>
        </section>
        <section class="paragraph">
            <h3>THREE.SphereGeometry / 球体</h3>
            <h4>new THREE.SphereGeometry('radius','widthSegments','heightSegments')</h4>
            <p>
                radius : float 四角形の横幅 X軸<br>
                widthSegments : float 四角形の高さ Y軸<br>
                heightSegments : float 四角形の奥行き Z軸<br>
            </p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;500;700&display=swap');

#geometry{
    font-family: 'Kaisei Decol', serif;
    margin: 0 0 0 200px;
}

h2{
    font-size: 40px;
    letter-spacing: 0.25em;
    margin: 100px 0 0 100px;
}
.paragraph {
    width: 1000px;
    margin: 100px auto 0;

    h3 {
        font-size: 32px;
    }

    h4 {
        margin: 50px 0 0 50px;
        font-size: 24px;
    }

    p {
        margin: 30px 0 0 50px;
        font-size: 20px;
        line-height: 2em;
    }
}
</style>