<template>
    <div id="orbit-container">
        <div v-if="display" id="orbit-wrap">
            <div class="orbit">
                <OrbitTitle :main="title.main" :sub="title.sub" />
                <OrbitParams :data="list" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    display: boolean
};

const props = withDefaults(defineProps<Props>(), {
});

const title = {
    main: 'URANUS',
    sub: 'The Planet of Revolution, Uranus',
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '51,118km / 4.01(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '28.750million km / 19.2AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '83.8year(6.8km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '17.24hour',
    },
};
</script>