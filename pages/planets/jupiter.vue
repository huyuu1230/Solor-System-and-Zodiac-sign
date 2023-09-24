<template>
    <div class="orbit">
        <div class="orbit-title">
            <h1>JUPITER</h1>
            <div class="line"></div>
            <h6>diameter of the planet / magnification of the jupiter</h6>
        </div>
        <OrbitParams :data="list"/>
    </div>
</template>

<script setup lang="ts">
const list = {
    size:{
        head:'diameter of the planet',
        body:'142,984km / 11.21(ratio to earth)',
    },
    distance:{
        head:'distance to sun',
        body:'7.783million km / 5.2AU',
    },
    revolution:{
        head:'revolution speed',
        body:'11.9year(13.1km/s)',
    },
    rotation:{
        head:'rotation speed',
        body:'9.92hour',
    },
}
</script>