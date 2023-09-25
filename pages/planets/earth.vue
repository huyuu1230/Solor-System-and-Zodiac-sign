<template>
    <div class="orbit">
        <OrbitTitle :main="title.main" :sub="title.sub" />
        <OrbitParams :data="list"/>
    </div>
</template>

<script setup lang="ts">
const title = {
    main:'EARTH',
    sub:'Our Home, Earth'
};
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