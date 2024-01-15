<style lang="scss">
.c__001 {
    position: relative;
    margin: 200px auto 0;
    z-index: 100;
}

.c__002 {
    position: relative;
    margin: 200px auto 0 5vw;
    z-index: 100;
}

.c__003 {
    position: relative;
    margin: 200px 5vw 200px auto;
    z-index: 100;
}

#a__bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    opacity: 0.5;
    z-index: 10;
}
</style>

<template>
    <div>
        <AboutContent class="c__001" :titleActive="titleActive_001" :data="content_001" />
        <AboutContent class="c__002" :titleActive="titleActive_002" :data="content_002" />
        <AboutContent class="c__003" :titleActive="titleActive_003" :data="content_003" />
        <div id="a__bg"></div>
    </div>
</template>

<script setup lang="ts">
const titleActive_001 = [true, true, true];
const content_001 = {
    number: "001",
    head: "ABOUT",
    body:
        `
    このサイトは太陽系の惑星・黄道十二星座について、WebGLを使用して表現したサイトです。
    8個の太陽系の惑星と、12個の黄道十二星座について、限られた情報について表現しています。
    ぜひ、この小さな宇宙を遊泳してみてください。
    `,
};
const titleActive_002 = [true, false, false];
const content_002 = {
    number: "002",
    head: "PLANET",
    body:
        `
    このサイトでの太陽系の惑星について
    太陽までの距離・惑星の大きさ・公転速度・自転速度について実際の数値から比率を変えて表現しています。
    6分を1年として公転・自転を行います。
    初期の状態では2023年の秋分の日の位置にあります。
    `,
};
const titleActive_003 = [false, false, true];
const content_003 = {
    number: "003",
    head: "SIGN",
    body:
        `
        このサイトでの黄道十二星座について
    星座を構成する星(合計189個)の赤経・赤緯についての座標を比率を変えて表現しています。
    実際の星は異なる距離を持っていますが、このサイトでは均一にしています。
    `,
};
</script>