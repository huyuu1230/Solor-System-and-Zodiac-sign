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
    main: 'VENUS',
    sub: 'The Planet of Beauty and Love, Venus'
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