<template>
    <div class="orbit">
        <OrbitTitle :main="title.main" :sub="title.sub" />
        <OrbitParams :data="list" />
    </div>
</template>

<script setup lang="ts">
const title = {
    main:'VENUS',
    sub:'The Planet of Beauty and Love, Venus'
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '12,104km / 0.95(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '1,082million km / 0.72AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '0.62year(35km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '5832hour/243.02day',
    },
};
</script>