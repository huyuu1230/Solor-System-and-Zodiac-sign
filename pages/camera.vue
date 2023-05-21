<template>
    <div id="camera">
        <h2>Camera</h2>
        <section class="paragraph">
            <h3>THREE.PerspectiveCamera / カメラ</h3>
            <h4>new THREE.PerspectiveCamera('fov' , 'aspect' , 'near' , 'far')</h4>
            <p>
                fov : number カメラの垂直視野<br>
                aspect : number カメラのアスペクト比<br>
                near : number 平面近くのカメラ(無くてもいい)<br>
                far : number カメラの遠方平面(無くてもいい)
            </p>
            <h4>camera.position.set('x' , 'y' , 'z')</h4>
            <p>
                x : number x軸の位置
                y : number y軸の位置
                z : number z軸の位置
            </p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;500;700&display=swap');

#camera {
    font-family: 'Kaisei Decol', serif;
    margin: 0 0 0 200px;
}

h2 {
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