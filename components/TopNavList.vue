<style lang="scss" scoped>
nav {
    width: fit-content;
    height: fit-content;

    ul {
        display: flex;
        flex-direction: column;
        gap: 16px;

        li {
            a {
                font-size: 16px;
                line-height: 1em;
            }

            a::before {
                content: "- ";
                font-family: sans-serif;
            }
        }
    }
}
</style>

<template>
    <nav>
        <ul>
            <li v-for="(item, index) in nav" :key="index">
                <NuxtLink :to=item.link>{{ item.text }}</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">

type NavItem = {
    link: string,
    text: string,
};

interface Props {
    nav: NavItem[],
};

const props = withDefaults(defineProps<Props>(), {});
</script>