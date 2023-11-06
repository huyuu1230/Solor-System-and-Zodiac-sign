<template>
    <div id="orbit-container">
        <div class="orbit">
            <h2 class="planet-info planet-info-name" :style="{ top: namePosition.y + 'px', left: namePosition.x + 'px' }">
                {{ title.main }}
            </h2>
            <h3 class="planet-info planet-info-copy" :style="{ top: namePosition.y + 'px', left: namePosition.x + 'px' }">
                {{ title.sub }}
            </h3>
            <h4 class="planet-info planet-info-head-r" :style="{ top: sizePosition.y + 'px', left: sizePosition.x + 'px' }">
                {{ list.size.head }}
            </h4>
            <p class="planet-info planet-info-body-r" :style="{ top: sizePosition.y + 'px', left: sizePosition.x + 'px' }">
                {{ list.size.body }}
            </p>
            <h4 class="planet-info planet-info-head-r" :style="{ top: distancePosition.y + 'px', left: distancePosition.x + 'px' }">
                {{ list.distance.head }}
            </h4>
            <p class="planet-info planet-info-body-r" :style="{ top: distancePosition.y + 'px', left: distancePosition.x + 'px' }">
                {{ list.distance.body }}
            </p>
            <h4 class="planet-info planet-info-head-l" :style="{top:revolutionPosition.y + 'px',left:revolutionPosition.x + 'px'}">
                {{ list.revolution.head }}
            </h4>
            <p class="planet-info planet-info-body-l" :style="{top:revolutionPosition.y + 'px',left:revolutionPosition.x + 'px'}">
                {{ list.revolution.body }}
            </p>
            <h4 class="planet-info planet-info-head-l" :style="{top:rotationPosition.y + 'px',left:rotationPosition.x + 'px'}">
                {{ list.rotation.head }}
            </h4>
            <p class="planet-info planet-info-body-l" :style="{top:rotationPosition.y + 'px',left:rotationPosition.x + 'px'}">
                {{ list.rotation.body }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    namePosition: {
        x: number,
        y: number,
    },
    sizePosition: {
        x: number,
        y: number,
    },
    distancePosition: {
        x: number,
        y: number,
    },
    revolutionPosition: {
        x: number,
        y: number,
    },
    rotationPosition: {
        x: number,
        y: number,
    },
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