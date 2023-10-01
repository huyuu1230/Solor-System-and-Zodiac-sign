<template>
    <div id="orbit-container">
        <div v-if="display" id="orbit-wrap">
            <div class="orbit">
                <OrbitTitle :main="title.main" :sub="title.sub" />
                <OrbitParams :data="list" />
                <!-- <div id="text">
            <p>
                私達の住む惑星。<br>
                表面の七割以上が水に覆われた水の惑星。
            </p>
        </div> -->
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
    main: 'EARTH',
    sub: 'Our Home, Earth'
};
const list = {
    size: {
        head: 'diameter of the planet',
        body: '12,756km / 1(ratio to earth)',
    },
    distance: {
        head: 'distance to sun',
        body: '1.496million km / 1AU',
    },
    revolution: {
        head: 'revolution speed',
        body: '1.0year(29.8km/s)',
    },
    rotation: {
        head: 'rotation speed',
        body: '23.94hour',
    },
};
</script>

<style lang="scss">
#text {
    position: fixed;
    top: 300px;
    right: 2.5vw;

    p {
        writing-mode: vertical-lr;
    }
}
</style>