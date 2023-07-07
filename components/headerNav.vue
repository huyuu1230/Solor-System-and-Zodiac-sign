<template>
    <header>
        <NuxtLink to="/">
            <h1>
                Solor System and Signs
            </h1>
        </NuxtLink>
        <div class="toggle"></div>
    </header>
</template>

<style lang="scss">
header{
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 95%;
    padding: 8px 2.5%;
    background-color: rgba($color: #222222, $alpha: 0.8);
    font-family: 'Cormorant Garamond', serif;
    border-bottom: 1px solid;
    h1{
        font-size: 32px;
        color: #ffffff;
    }
    .toggle{
        width: 32px;
        height: 32px;
        background-color: #ffffff;
    }
}
</style>