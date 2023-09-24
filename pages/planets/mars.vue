<template>
    <div class="orbit">
        <div class="orbit-title">
            <h1>MARS</h1>
            <div class="line"></div>
            <h6>diameter of the planet / magnification of the mars</h6>
        </div>
        
        <OrbitParams :data="list"/>

    </div>
</template>

<script setup lang="ts">
const list = {
    size:{
        head:'diameter of the planet',
        body:'6,792km / 0.53(ratio to earth)',
    },
    distance:{
        head:'distance to sun',
        body:'2.279million km / 1.52AU',
    },
    revolution:{
        head:'revolution speed',
        body:'1.88year(24.1km/s)',
    },
    rotation:{
        head:'rotation speed',
        body:'24.62hour',
    },
};
</script>