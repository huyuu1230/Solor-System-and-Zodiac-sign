<template>
    <div class="orbit">
        <OrbitTitle :main="title.main" :sub="title.sub" />
        <OrbitParams :data="list" />
    </div>
</template>

<script setup lang="ts">
const title = {
    main: 'MARS',
    sub: 'The Dream of Adventurers, Mars',
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '6,792km / 0.53(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '2.279million km / 1.52AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '1.88year(24.1km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '24.62hour',
    },
};
</script>