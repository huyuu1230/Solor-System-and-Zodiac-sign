<template>
    <div id="document">
        <div></div>
        <img src="~/public/a-001.jpg">
        <img src="~/public/a-002.jpg">
        <img src="~/public/b-001.jpg">
        <img src="~/public/001.jpg">
        <img src="~/public/002.jpg">
        <img src="~/public/003.jpg">
        <img src="~/public/004.jpg">
        <img src="~/public/005.jpg">
        <img src="~/public/006.jpg">
        <img src="~/public/007.jpg">
        <img src="~/public/c-001.jpg">
    </div>
</template>

<style lang="scss">
#document {

    div {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 1000;
        background-color: #222222;
    }

    img {
        position: relative;
        display: flex;
        width: 95%;
        margin: 50px auto;
        z-index: 10000;
    }
}
</style>