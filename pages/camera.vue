<template>
    <div id="information">
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