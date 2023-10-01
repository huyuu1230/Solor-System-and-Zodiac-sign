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
    main: 'JUPITER',
    sub: 'The Giant of Wisdom, Jupiter'
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '142,984km / 11.21(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '7.783million km / 5.2AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '11.9year(13.1km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '9.92hour',
    },
}
</script>