<template>
   <div class="orbit">
        <div class="orbit-title">
            <h1>URANUS</h1>
            <div class="line"></div>
            <h6>diameter of the planet / magnification of the uranus</h6>
        </div>
        <OrbitParams :data="list"/>
    </div>
</template>

<script setup lang="ts">
const list = {
    size:{
        head:'diameter of the planet',
        body:'51,118km / 4.01(ratio to earth)',
    },
    distance:{
        head:'distance to sun',
        body:'28.750million km / 19.2AU',
    },
    revolution:{
        head:'revolution speed',
        body:'83.8year(6.8km/s)',
    },
    rotation:{
        head:'rotation speed',
        body:'17.24hour',
    },
};
</script>