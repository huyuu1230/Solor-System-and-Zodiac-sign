<template>
    <div>
        <ul id="nav-menu">
            <li>
                タイトル
            </li>
            <li>
                カメラ制御
            </li>
            <li>
                座標系1
            </li>
            <li>
                座標系2
            </li>
            <a id="close">CLOSE</a>
        </ul>
        <ul id="nav-img">
            <li>
                <img src="~/public/title.jpg">
            </li>
            <li>
                <img src="~/public/001.jpg">
            </li>
            <li>
                <img src="~/public/002.jpg">
            </li>
            <li>
                <img src="~/public/003.jpg">
            </li>
        </ul>
    </div>
</template>

<script setup>

onMounted(() => {
    const menu = document.querySelectorAll("#nav-menu li");
    const img = document.querySelectorAll("#nav-img li");

    for (let i = 0; i < menu.length; i++) {
        menu[i].addEventListener('click', () => {
            close()
            img[i].classList.add('view');
        });
    };

    function close() {
        const view = document.querySelectorAll(".view");
        for (let i = 0; i < view.length; i++) {
            view[i].classList.remove('view');
        }
    }

    const closeButton = document.getElementById("close");
    closeButton.addEventListener('click', () => {
        close();
    })
})
</script>

<style lang="scss">
#nav-close {
    position: fixed;
    bottom: 50px;
    right: 0;
    width: 100px;
    height: 100px;
    background-color: #ffffff;
    cursor: pointer;
    z-index: 10000;
}

#nav-menu {
    position: fixed;
    bottom: 150px;
    right: 0;

    li {
        font-size: 20px;
        font-weight: 700;
        margin: 0 0 5px;
        padding: 5px 20px;
        color: #222222;
        background-color: #ffffff;
        cursor: pointer;
    }

    a {
        font-size: 20px;
        font-weight: 700;
        padding: 5px 20px;
        color: #222222;
        background-color: #ffffff;
        cursor: pointer;
    }

}

#nav-img {
    
    li {
        position: fixed;
        bottom: 10px;
        left: 150%;
        transform: translate(-50%, 0px);
        height: 90vh;
        transition: all 1000ms;
        z-index: 100;
        img {
            height: 100%;
        }
    }
}

.view {
    left: 50% !important;
}
</style>