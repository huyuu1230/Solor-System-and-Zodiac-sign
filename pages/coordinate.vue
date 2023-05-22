<template>
    <div id="information">
        <h2>三次元座標</h2>
        <div class="paragraph">
            <h3>premise / 前提</h3>
            <h4>θ / 仰角(緯度)</h4>
            <p>
                θ = 仰角(緯度)<br>
                三角関数の計算式に当て嵌めるにあたって、ここでは上記の式を前提とする。
            </p>
            <h4>θ' = 方位角(経度)</h4>
            <p>
                θ' = 方位角(経度)<br>
                三角関数の計算式に当て嵌めるにあたって、ここでは上記の式を前提とする。
            </p>
        </div>
        <div class="paragraph">
            <h3>orbit / 軌道 (簡易)</h3>
            <h4>position.x / x座標</h4>
            <p>
                x = 半径 * Math.cos(方位角)
            </p>
            <h4>position.y / y座標</h4>
            <p>
                y = 半径 * Math.sin(仰角)
            </p>
            <h4>position.z / z座標</h4>
            <p>
                z = 半径 * Math.sin(方位角)
            </p>
        </div>
        <div class="paragraph">
            <h3>orbit / 軌道</h3>
            <h4>position.x / x軸座標</h4>
            <p>
                x = radius * Math.cos(仰角) * Math.cos(方位角)<br>
                x = 半径 * cosθ * cosθ'<br>
            </p>
            <h4>position.y / y軸座標</h4>
            <p>
                y = radius * Math.sin(仰角)<br>
                y = 半径 * sinθ
            </p>
            <h4>position.z / z軸座標</h4>
            <p>
                z = radius * Math.cos(仰角) * Math.cos(方位角)<br>
                z = 半径 * cosθ * sinθ'
            </p>
        </div>
    </div>
</template>