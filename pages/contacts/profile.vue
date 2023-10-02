<template>
    <div id="contact-container">
        <div v-if="display" id="contact-wrap">
            <div id="contact" class="animation">
                <h1>PROFILE</h1>
                <div class="contact-line"></div>
                <ul>
                    <li>
                        <h2>Name :</h2>
                        <p>Shouhei_Okazaki</p>
                    </li>
                    <li>
                        <h2>Job :</h2>
                        <p>Front Engineer</p>
                    </li>
                    <li>
                        <h2>From :</h2>
                        <p>Okayama / Japan</p>
                    </li>
                    <li>
                        <h2>Mail :</h2>
                        <p>nirnor.okazaki@gmail.com</p>
                    </li>
                    <li>
                        <h2>X (Twitter) :</h2>
                        <p>xxxxxxx</p>
                    </li>
                </ul>
                <p>
                    プログラムで遊んでるメンヘラです。<br>
                    最近は、SPAやWebGLで遊んでます。
                </p>
            </div>
            <div id="contact-bg"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

interface Props {
    display: boolean
};

const props = withDefaults(defineProps<Props>(), {
});

</script>

<style lang="scss">
#contact {
    position: relative;
    margin: 160px 0 0 2.5vw;
    z-index: 100;

    h1 {
        font-size: 64px;
        line-height: 1em;
        letter-spacing: 0.25em;
    }

    ul {
        margin: 50px 0 0;

        li {
            display: flex;
            align-items: flex-end;

            h2 {
                font-size: 20px;
                line-height: 1em;
            }

            p {
                font-size: 20px;
                line-height: 1em;
                margin: 0 0 0 10px;
            }
        }

        li:not(:first-child) {
            margin: 20px 0 0;
        }
    }

    p {
        margin: 50px 0 0 0;
        font-size: 16px;
    }

}

#contact-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #222222;
    opacity: 0.8;
    z-index: 10;
}

@media screen and (max-width:768px) {
    #contact {
        max-width: 90vw;
        margin: 15vh auto 0;

        h1 {
            font-size: 32px;
        }

        .contact-line {
            width: 100%;
            height: 1px;
            margin: 15px 0;
            background-color: #ffffff;
        }

        ul {
            margin: 0;

            li {
                h2 {
                    font-size: 16px;
                }

                p {
                    font-size: 16px;
                }
            }
        }

        p {
            margin: 50px 0 0 0;
            font-size: 12px;
        }
    }
}

.animation {
    animation-name: fadeIn;
    animation-duration: 3s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    opacity: 0;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}</style>