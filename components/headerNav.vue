<template>
    <header>
        <div id="header">
            <NuxtLink to="/">
                <h1 class="js-shuffle">
                    <span v-for="(item , index) in siteTitle" :key="index">
                    {{ item }}
                    </span>
                </h1>
            </NuxtLink>
            <div v-on:click="view_header" class="h-menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="header-toggle-bg" class="header-toggle-bg-from"></div>
        <div id="header-toggle" class="header-toggle-from">
            <div id="header-logo">
                <div class="header-img"></div>
                <h2>
                    Solor System<br>
                    Planets<br>
                    and<br>
                    Zodiac Signs
                </h2>
            </div>
            <div class="header-toggle-line"></div>
            <nav id="header-nav">
                <!--PLANET-->
                <div class="header-links">
                    <h3>PLANETS</h3>
                    <div class="header-links-line"></div>
                    <ul>
                        <li>
                            <NuxtLink to="/mercury" v-on:click="view_header">MERCURY</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/venus" v-on:click="view_header">VENUS</NuxtLink>
                        </li>
                        <li>
                            <NuxtLink to="/earth" v-on:click="view_header">EARTH</NuxtLink>
                        </li>
                        <li>MARS</li>
                        <li>JUPITER</li>
                        <li>SATURN</li>
                        <li>URANUS</li>
                        <li>NEPTUNE</li>
                    </ul>
                </div>
                <!--SIGNS-->
                <div class="header-links">
                    <h3>SIGNS</h3>
                    <div class="header-links-line"></div>
                    <ul>
                        <li>ARIES</li>
                        <li>TAURUS</li>
                        <li>GEMINI</li>
                        <li>CANCER</li>
                        <li>LEO</li>
                        <li>VIRGO</li>
                        <li>LIBRA</li>
                        <li>SCORPIUS</li>
                        <li>SAGITTARIUS</li>
                        <li>CAPRICORNUS</li>
                        <li>AQUARIUS</li>
                        <li>PISCES</li>
                    </ul>
                </div>
                <!--ABOUT-->
                <div class="header-links">
                    <h3>ABOUT</h3>
                    <div class="header-links-line"></div>
                    <ul>
                        <li>GREETING</li>
                        <li>EXPLANTION</li>
                    </ul>
                </div>
                <!--CONTACTS-->
                <div class="header-links">
                    <h3>CONTACTS</h3>
                    <div class="header-links-line"></div>
                    <ul>
                        <li>PROFILE</li>
                        <li>MAIL</li>
                        <li>SNS</li>
                    </ul>
                </div>
            </nav>
        </div>
        <div id="header-copyright" class="header-copyright-from">
            <h6>copyright.Solor_System_and_Signs</h6>
        </div>
    </header>
</template>

<style lang="scss" scoped>
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
        z-index: 1000;

        h1 {
            font-size: 32px;
            color: #ffffff;
        }

        .h-menu {
            position: relative;
            width: 32px;
            height: 24px;
            cursor: pointer;

            span {
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 1px;
                background-color: #ffffff;
                transition: all 500ms;
            }

            span:nth-child(1) {
                top: 0%;
                left: 0;
            }

            span:nth-child(2) {
                top: 50%;
                left: 0;
            }

            span:nth-child(3) {
                top: 100%;
                left: 0;
            }
        }

        .h-menu-active {
            span:nth-child(1) {
                top: 50%;
                transform: translate(0, -50%) rotate(-45deg);
            }

            span:nth-child(2) {
                left: 100%;
                opacity: 0;
            }

            span:nth-child(3) {
                top: 50%;
                transform: translate(0, -50%) rotate(45deg);
            }
        }
    }

    #header-toggle-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba($color: #222222, $alpha: 0.8);
        z-index: 100;
    }

    #header-toggle {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        z-index: 1000;
    }

    #header-logo {
        margin: auto 0;

        .header-img {
            width: 200px;
            height: 200px;
            margin: 0 0 64px;
            background-color: #ffffff;
        }

        h2 {
            font-size: 24px;
            line-height: 2em;
        }
    }

    .header-toggle-line {
        width: 1px;
        margin: 0 120px;
        background-color: #ffffff;
    }

    #header-nav {
        display: flex;

        .header-links {
            h3 {
                font-size: 24px;
                line-height: 1em;
            }

            .header-links-line {
                width: 200px;
                height: 1px;
                margin: 24px 0;
                background-color: #ffffff;
            }

            ul {
                li {
                    font-size: 16px;
                    line-height: 1em;
                }

                li:not(:last-child) {
                    margin: 0 0 24px;
                }
            }
        }

        .header-links:not(:last-child) {
            margin: 0 120px 0 0;
        }
    }

    #header-copyright {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: rgba($color: #222222, $alpha: 0.8);
        border-top: 1px solid;
        z-index: 1000;

        h6 {
            padding: 16px 0;
            font-size: 16px;
            font-weight: 400;
            line-height: 1;
            text-align: center;
        }
    }

    .header-toggle-bg-from {
        display: none !important;
    }

    .header-toggle-from {
        display: none !important;
    }

    .header-copyright-from {
        display: none !important;
    }
}
</style>

<script setup lang="ts">
const siteTitle:string = "Solor System and Signs"
onMounted(() => {
    const shuffleElem = document.querySelectorAll('.js-shuffle');
    shuffle(shuffleElem[0],siteTitle)
});

function view_header() {
    const menuButton: HTMLDivElement = <HTMLDivElement>document.querySelector('.h-menu');
    const bg: HTMLDivElement = <HTMLDivElement>document.getElementById("header-toggle-bg");
    const toggle: HTMLDivElement = <HTMLDivElement>document.getElementById("header-toggle");
    const copy: HTMLDivElement = <HTMLDivElement>document.getElementById("header-copyright");
    if (copy.classList.contains('header-copyright-from') === true) {
        menuButton.classList.add('h-menu-active');
        bg.classList.remove('header-toggle-bg-from');
        toggle.classList.remove('header-toggle-from');
        copy.classList.remove('header-copyright-from');
    } else {
        menuButton.classList.remove('h-menu-active');
        bg.classList.add('header-toggle-bg-from');
        toggle.classList.add('header-toggle-from');
        copy.classList.add('header-copyright-from');
    }
}

// ----------SHUFFLE_ANIMATION----------
// -----乱数生成
function getRandom(min: number, max: number): number {
  return Math.floor(Math.random() * (max + 1 - min)) + min
}
// -----アルファベット a から z と、数字の 0 から 9 までの文字配列
const randomTextArray: string[] = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];

function shuffle(elem: any , text:string): void {
  const df: string = text;
  const child = elem.children;
  for (let i = 0; i < child.length; i++) {
    let count = 0;
    setTimeout(() => {
      const animated = setInterval(() => {
        if (count < 30) {
          count++;
          child[i].innerHTML = randomTextArray[getRandom(0, randomTextArray.length - 1)];
        } else {
          clearInterval(animated);
          child[i].innerHTML = df[i];
        }
      }, 1000 / 60);
    }, i * 1000 / 20);
  };
};

</script>