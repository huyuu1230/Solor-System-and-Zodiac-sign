<template>
    <div id="orbit-container">
        <div class="orbit">
            <h2 class="planet-info planet-info-name" :style="{ top: planet.name.value.y + 'px', left: planet.name.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in title.main" :key="index">
                    {{ item }}
                </span>
            </h2>
            <h3 class="planet-info planet-info-copy" :style="{ top: planet.name.value.y + 'px', left: planet.name.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in title.sub" :key="index">
                    {{ item }}
                </span>
            </h3>
            <h4 class="planet-info planet-info-head-r" :style="{ top: planet.size.value.y + 'px', left: planet.size.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.size.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-r" :style="{ top: planet.size.value.y + 'px', left: planet.size.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.size.body" :key="index">
                    {{ item }}
                </span>
            </p>
            <h4 class="planet-info planet-info-head-r"
                :style="{ top: planet.distance.value.y + 'px', left: planet.distance.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.distance.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-r"
                :style="{ top: planet.distance.value.y + 'px', left: planet.distance.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.distance.body" :key="index">
                    {{ item }}
                </span>
            </p>
            <h4 class="planet-info planet-info-head-l"
                :style="{ top: planet.revolution.value.y + 'px', left: planet.revolution.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.revolution.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-l"
                :style="{ top: planet.revolution.value.y + 'px', left: planet.revolution.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.revolution.body" :key="index">
                    {{ item }}
                </span>
            </p>
            <h4 class="planet-info planet-info-head-l"
                :style="{ top: planet.rotation.value.y + 'px', left: planet.rotation.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.rotation.head" :key="index">
                    {{ item }}
                </span>
            </h4>
            <p class="planet-info planet-info-body-l"
                :style="{ top: planet.rotation.value.y + 'px', left: planet.rotation.value.x + 'px' }">
                <span class="hide" ref="textArray" v-for="(item, index) in list.rotation.body" :key="index">
                    {{ item }}
                </span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    planet: {
        name: {
            value: {
                x: number,
                y: number,
            },
        },
        size: {
            value: {
                x: number,
                y: number,
            },
        },
        distance: {
            value: {
                x: number,
                y: number,
            },
        },
        revolution: {
            value: {
                x: number,
                y: number,
            },
        },
        rotation: {
            value: {
                x: number,
                y: number,
            },
        },
    };
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

.view {
    opacity: 1;
}

.hide {
    opacity: 0;
}
</style>