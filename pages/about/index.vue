<style lang="scss">
.c__001 {
    position: relative;
    margin: 200px auto 0;
    z-index: 100;
}

.c__002 {
    position: relative;
    margin: 200px auto 0 5vw;
    z-index: 100;
}

.c__003 {
    position: relative;
    margin: 200px 5vw 0 auto;
    z-index: 100;
}

#a__bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #000000;
    opacity: 0.5;
    z-index: 10;
}
</style>

<template>
    <div>
        <AboutContent class="c__001" :titleActive="titleActive_001" :data="content_001"/>
        <AboutContent class="c__002" :titleActive="titleActive_002" :data="content_002"/>
        <AboutContent class="c__003" :titleActive="titleActive_003" :data="content_003"/>
        <div id="a__bg"></div>
    </div>
</template>

<script setup lang="ts">
const titleActive_001 = [true,true,true];
const content_001 = {
    number: "001",
    head: "ABOUT",
    body:
    `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    `,
};
const titleActive_002 = [true,false,false];
const content_002 = {
    number:"002",
    head:"PLANET",
    body:
    `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    `,
};
const titleActive_003 = [false,false,true];
const content_003 = {
    number:"003",
    head:"SIGN",
    body:
    `
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
    `,
};
</script>