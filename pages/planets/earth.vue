<template>
    <div class="orbit">
        <div class="orbit-title">
            <h1>EARTH</h1>
            <div class="line"></div>
            <h6>diameter of the planet / magnification of the earth</h6>
        </div>
        <OrbitParams :data="list"/>
    </div>
</template>

<script setup lang="ts">
const list = {
    size:{
        head:'diameter of the planet',
        body:'12,756km / 1(ratio to earth)',
    },
    distance:{
        head:'distance to sun',
        body:'1.496million km / 1AU',
    },
    revolution:{
        head:'revolution speed',
        body:'1.0year(29.8km/s)',
    },
    rotation:{
        head:'rotation speed',
        body:'23.94hour',
    },
};
</script>