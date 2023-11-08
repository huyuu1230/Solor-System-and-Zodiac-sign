<template>
    <div id="orbit-container">
        <div class="orbit">
            <h2 class="planet-info planet-info-name" :style="{ top: namePosition.y + 'px', left: namePosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in title.main" :key="index">
                    {{ item }}
                </span>
            </h2>
            <h3 class="planet-info planet-info-copy" :style="{ top: namePosition.y + 'px', left: namePosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in title.sub" :key="index">
                    {{ item }}
                </span>
            </h3>
            <h4 class="planet-info planet-info-head-r" :style="{ top: sizePosition.y + 'px', left: sizePosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.size.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-r" :style="{ top: sizePosition.y + 'px', left: sizePosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.size.body" :key="index">
                    {{ item }}
                </span>
            </p>
            <h4 class="planet-info planet-info-head-r"
                :style="{ top: distancePosition.y + 'px', left: distancePosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.distance.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-r"
                :style="{ top: distancePosition.y + 'px', left: distancePosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.distance.body" :key="index">
                    {{ item }}
                </span>
            </p>
            <h4 class="planet-info planet-info-head-l"
                :style="{ top: revolutionPosition.y + 'px', left: revolutionPosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.revolution.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-l"
                :style="{ top: revolutionPosition.y + 'px', left: revolutionPosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.revolution.body" :key="index">
                    {{ item }}
                </span>
            </p>
            <h4 class="planet-info planet-info-head-l"
                :style="{ top: rotationPosition.y + 'px', left: rotationPosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.rotation.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-l"
                :style="{ top: rotationPosition.y + 'px', left: rotationPosition.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.rotation.body" :key="index">
                    {{ item }}
                </span>
            </p>
        </div>
    </div>
</template>

<script setup  lang="ts">

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

function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const textArray = ref<HTMLSpanElement[]>([]);

let count: number = 60;

onMounted(() => {
    setTimeout(() => {
        rendering();
        function rendering() {
            count--;
            for (let i = 0; i < textArray.value.length; i++) {
                const rand = random(0, count);
                if (rand == 0) {
                    textArray.value[i].classList.remove('hide');
                };
            };
            if (0 < count) {
                requestAnimationFrame(rendering);
            };
        };
    }, 3000);
});
</script>