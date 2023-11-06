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
.orbit {
    color: #ffffff;
}

.planet-info {
    position: fixed;
}

.planet-info-name {
    font-size: 2.5vw;
    transform: translate(0.5vw, -3vw);
}

.planet-info-copy {
    width: 20vw;
    font-size: 1.5vw;
    transform: translate(0.5vw, 0.5vw);
}

.planet-info-head-r {
    font-size: 1.25vw;
    transform: translate(-100%, -1.75vw);
    white-space: nowrap;
}

.planet-info-body-r {
    font-size: 1vw;
    transform: translate(-100%, 0.5vw);
    white-space: nowrap;
}

.planet-info-head-l {
    font-size: 1.25vw;
    transform: translate(0.5vw, -1.75vw);
    white-space: nowrap;
}

.planet-info-body-l {
    font-size: 1vw;
    transform: translate(0.5vw, 0.5vw);
    white-space: nowrap;
}
</style>