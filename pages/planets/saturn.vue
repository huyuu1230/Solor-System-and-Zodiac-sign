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
    main: 'SATURN',
    sub: 'Discipline and Harmony, Saturn',
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '120,536km / 9.45(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '14.294million km / 9.58AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '29.4year(9.7km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '10.66hour',
    },
};
</script>