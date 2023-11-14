<template>
    <div id="contact-container">
        <div id="contact">
            <div class="contact-content">
                <h2>MAIL</h2>
                <p>ご意見やお問い合わせがありましたら、お気軽にお知らせください。</p>
                <ul>
                    <li>MAIL : <a>nirnor.okazaki@gmail.com</a></li>
                </ul>
            </div>
            <div class="contact-line"></div>
            <div class="contact-content">
                <h2>SNS</h2>
                <p>ソーシャルメディアをフォローし、最新の情報を入手し、直接メッセージを送信することが出来ます。</p>
                <ul>
                    <li>X(Twitter) : <a>@huyuu_kan</a></li>
                </ul>
            </div>
        </div>
        <div id="contact-bg"></div>
    </div>
</template>

<script setup>

const HEAD_TITLE = ref("Contact - Solor System and Zodiac Sign");

useHead({
    title:HEAD_TITLE,
});

</script>

<style lang="scss"></style>

<style lang="scss">
#contact {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    z-index: 100;
    color: #ffffff;

    .contact-content {
        width: 500px;
        margin: auto 0;
        text-align: center;

        h2 {
            font-size: 48px;
        }

        p {
            margin: 64px 0 0;
            font-size: 16px;
        }

        ul {
            margin: 64px 0 0;

            li {
                font-size: 20px;

                a {
                    display: inline-block;
                }
            }
        }
    }

    .contact-line {
        width: 1px;
        height: 400px;
        background-color: #ffffff;
        margin: 0 50px;
    }
}
#contact-container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.5);
    z-index: 50;
}
</style>