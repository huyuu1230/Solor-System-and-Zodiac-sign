<style lang="scss"></style>

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
    title: HEAD_TITLE,
});

</script>