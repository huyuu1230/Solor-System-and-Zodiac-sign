<template>
    <div class="orbit">
        <OrbitTitle :main="title.main" :sub="title.sub" />
        <OrbitParams :data="list" />
    </div>
</template>

<script setup lang="ts">
const title = {
    main: 'MERCURY',
    sub: 'The Messenger of Knowledge, Mercury'
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '4,879km / 0.38(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '0.579million km / 0.39AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '0.24year(47.4km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '1407.60hour/58.65day',
    },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap");
</style>

