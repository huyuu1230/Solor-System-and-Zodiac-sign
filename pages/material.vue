<template>
    <div id="material">
        <h2>Camera</h2>
        <section class="paragraph">
            <h3>THREE.MeshBasicMaterial / ベーシックマテリアル</h3>
            <h4>new THREE.MeshBasicMateriaal({'color','wireframe'})</h4>
            <p>
                color : string １６進数で色の指定 (例 0x000000)<br>
                wireframe : bool ワイヤーフレームの設定<br>
            </p>
        </section>
    </div>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;500;700&display=swap');

#material {
    font-family: 'Kaisei Decol', serif;
    margin: 0 0 0 200px;
}

h2 {
    font-size: 40px;
    letter-spacing: 0.25em;
    margin: 100px 0 0 100px;
}

.paragraph {
    width: 1000px;
    margin: 100px auto 0;

    h3 {
        font-size: 32px;
    }

    h4 {
        margin: 50px 0 0 50px;
        font-size: 24px;
    }

    p {
        margin: 30px 0 0 50px;
        font-size: 20px;
        line-height: 2em;
    }
}
</style>