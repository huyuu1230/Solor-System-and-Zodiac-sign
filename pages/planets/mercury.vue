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