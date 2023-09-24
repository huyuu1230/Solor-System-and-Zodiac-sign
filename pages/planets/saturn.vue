<template>
    <div class="orbit">
        <div class="orbit-title">
            <h1>saturn</h1>
            <div class="line"></div>
            <h6>diameter of the planet / magnification of the saturn</h6>
        </div>
        <OrbitParams :data="list"/>
    </div>
</template>

<script setup lang="ts">
const list = {
    size:{
        head:'diameter of the planet',
        body:'120,536km / 9.45(ratio to earth)',
    },
    distance:{
        head:'distance to sun',
        body:'14.294million km / 9.58AU',
    },
    revolution:{
        head:'revolution speed',
        body:'29.4year(9.7km/s)',
    },
    rotation:{
        head:'rotation speed',
        body:'10.66hour',
    },
};
</script>