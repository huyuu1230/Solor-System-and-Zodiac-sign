<template>
    <header>
        <div id="header">
            <NuxtLink to="/">
                <h1>
                    Solor System and Signs
                </h1>
            </NuxtLink>
            <div class="toggle"></div>
        </div>
        <div id="header-nav">

        </div>
        <div id="header-copyright">
            <h6>copyright.Solor_System_and_Signs</h6>
        </div>
    </header>
</template>

<style lang="scss">
header {
    font-family: 'Cormorant Garamond', serif;
    #header {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 95%;
        padding: 8px 2.5%;
        background-color: rgba($color: #222222, $alpha: 0.8);
        border-bottom: 1px solid;

        h1 {
            font-size: 32px;
            color: #ffffff;
        }

        .toggle {
            width: 32px;
            height: 32px;
            background-color: #ffffff;
        }
    }
    #header-nav{
    }
    #header-copyright{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba($color: #222222, $alpha: 0.8);
        border-top: 1px solid;
        h6{
            padding: 16px 0;
            font-size: 16px;
            font-weight: 400;
            line-height: 1;
            text-align: center;
        }
    }
}
</style>

<script setup>
onMounted(() => {

})
</script>