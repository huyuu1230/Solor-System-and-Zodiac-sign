<template>
    <div class="orbit">
        <OrbitTitle :main="title.main" :sub="title.sub" />
        <OrbitParams :data="list" />
    </div>
</template>

<script setup  lang="ts">
const title = {
    main: 'NEPTUNE',
    sub: 'Dreams and Mysteries, Neptune',
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '49,528km / 3.88(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '45.044million km / 30AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '163.8year(5.4km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '16.11hour',
    },
};
</script>