<template>
    <div class="orbit">
        <h2>水星</h2>
        <ul class="orbit-status">
            <li>太陽からの距離 : 5790万km / 0.39AU</li>
            <li>直径 : 4,879km / 0.38 (地球に対する倍率)</li>
            <li>公転速度 : 0.24年 (47.4km/s)</li>
            <li>自転速度 : 58.65日</li>
            <li>表面積 : 74,800,000km²</li>
            <li>平均表面温度 : 440K / 166.85℃</li>
            <li>年齢 : 45億300万 / 450,300,000,0</li>
        </ul>
        <p>
            テキスト-テキスト-テキスト-テキスト-テキストテキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキストテキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキストテキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキストテキスト-テキスト-テキスト-テキスト-テキスト-テキスト-テキスト
        </p>
    </div>
</template>

<style lang="scss">
.orbit{
    position: fixed;
    top: 50%;
    left: 50px;
    transform: translate(0,-50%);
    padding: 50px;
    border: 1px solid;
    background-color: rgba($color: #222222, $alpha: 0.8);
    font-family: 'Shippori Mincho', serif;
    h2{
        font-size: 32px;
    }
    .orbit-status{
        margin: 40px 0 0;
        li{
            font-size: 16px;
        }
        li:not(:last-child){
            margin: 0 0 16px;
        }
    }
    p{
        width: 400px;
        margin: 40px 0 0;
        font-size: 12px;
    }
}
</style>