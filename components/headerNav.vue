<template>
    <header>
        <div id="header">
            <NuxtLink to="/">
                <h1 class="js-shuffle">
                    {{ siteTitle }}
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
                    and<br>
                    Zodiac Signs
                </h2>
            </div>
            <div class="header-toggle-line"></div>
            <nav id="header-nav">
                <!--PLANET-->
                <div class="header-links">
                    <h3 class="js-toggle-button">PLANETS</h3>
                    <div class="header-links-line"></div>
                    <ul class="js-toggle-content">
                        <li v-for="(item, index) in planets" :key="index">
                            <NuxtLink :to="item.path" v-on:click="view_header" class="js-shuffle">
                                {{ item.text }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <!--SIGNS-->
                <div class="header-links">
                    <h3 class="js-toggle-button">SIGNS</h3>
                    <div class="header-links-line"></div>
                    <ul class="js-toggle-content">
                        <li v-for="(item, index) in signs" :key="index">
                            <NuxtLink :to="item.path" v-on:click="view_header" class="js-shuffle">
                                {{ item.text }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <!--ABOUT-->
                <div class="header-links">
                    <h3 class="js-toggle-button">ABOUT</h3>
                    <div class="header-links-line"></div>
                    <ul class="js-toggle-content">
                        <li v-for="(item, index) in abouts" :key="index">
                            <NuxtLink :to="item.path" v-on:click="view_header" class="js-shuffle">
                                {{ item.text }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
                <!--CONTACTS-->
                <div class="header-links">
                    <h3 class="js-toggle-button">CONTACTS</h3>
                    <div class="header-links-line"></div>
                    <ul class="js-toggle-content">
                        <li v-for="(item, index) in contacts" :key="index">
                            <NuxtLink :to="item.path" v-on:click="view_header" class="js-shuffle">
                                {{ item.text }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div id="header-copyright" class="header-copyright-from">
            <h6>copyright.Solor_System_and_Zodiac_Signs</h6>
        </div>
    </header>
</template>



<script setup lang="ts">

const siteTitle: string = "Solor System and Zodiac Signs";
type HeaderLink = {
    text: string,
    path: string
}
// ----------Header_Link
// -----PLANETS
const planets: HeaderLink[] = [
    {
        text: 'MERCURY',
        path: '/planets/mercury'
    },
    {
        text: 'VENUS',
        path: '/planets/venus'
    },
    {
        text: 'EARTH',
        path: '/planets/earth'
    },
    {
        text: 'MARS',
        path: '/planets/mars'
    },
    {
        text: 'JUPITER',
        path: '/planets/jupiter'
    },
    {
        text: 'SATURN',
        path: '/planets/saturn'
    },
    {
        text: 'URANUS',
        path: '/planets/uranus'
    },
    {
        text: 'NEPTUNE',
        path: '/planets/neptune'
    },
];
// -----SIGNS
const signs: HeaderLink[] = [
    {
        text: 'ARIES',
        path: '/signs/aries'
    },
    {
        text: 'TAURUS',
        path: '/signs/taurus'
    },
    {
        text: 'GEMINI',
        path: '/signs/gemini'
    },
    {
        text: 'CANCER',
        path: '/signs/cancer'
    },
    {
        text: 'LEO',
        path: '/signs/leo'
    },
    {
        text: 'VIRGO',
        path: '/signs/virgo'
    },
    {
        text: 'LIBRA',
        path: '/signs/libra'
    },
    {
        text: 'SCORPIUS',
        path: '/signs/scorpius'
    },
    {
        text: 'SAGITTARIUS',
        path: '/signs/sagittarius'
    },
    {
        text: 'CAPRICORNUS',
        path: '/signs/capricornus'
    },
    {
        text: 'AQUARIUS',
        path: '/signs/aquarius'
    },
    {
        text: 'PISCES',
        path: '/signs/pisces'
    }
];
// -----ABOUT
const abouts: HeaderLink[] = [
    // {
    //     text: 'GREETING',
    //     path: '/about/greeting'
    // },
    {
        text: 'EXPLANTION',
        path: '/about/explanation'
    }
];
// -----CONTACTS
const contacts: HeaderLink[] = [
    {
        text: 'PROFILE',
        path: '/contacts/profile'
    },
    // {
    //     text: 'MAIL',
    //     path: '/contacts/mail'
    // },
];

const DefaultShuffleTextArray: string[] = [];
let shuffleElem: any;
// HTMLHeadingTag = hタグ
onMounted(() => {
    shuffleElem = document.querySelectorAll('.js-shuffle');
    shuffle_active();
    const toggleButton = document.querySelectorAll(".js-toggle-button");
    const toggleContent = document.querySelectorAll(".js-toggle-content");
    function slideDown() {
        for (let i = 0; i < toggleButton.length; i++) {
            toggleButton[i].addEventListener('click', () => {
                if(toggleContent[i].classList.contains('view')){
                    toggleHide();
                    toggleContent[i].classList.remove('view');
                }else{
                    toggleHide();
                    toggleContent[i].classList.add('view');
                }
            })
        }
    }
    slideDown();
    function toggleHide(): void {
        const elem = document.querySelectorAll(".view");
        for (let i = 0; i < elem.length; i++) {
            elem[i].classList.remove("view");
        };
    };
    
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
        // -----shuffle
        shuffle_active();
    } else {
        menuButton.classList.remove('h-menu-active');
        bg.classList.add('header-toggle-bg-from');
        toggle.classList.add('header-toggle-from');
        copy.classList.add('header-copyright-from');
    };
};

// ----------SHUFFLE_ANIMATION----------
// -----乱数生成
function getRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
};
// -----アルファベット a から z と、数字の 0 から 9 までの文字配列
const randomTextArray: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'
];

function wrapSpan(elem: any): void {
    let text = elem.innerText;
    text = "<span>" + text.split("").join("</span><span>") + "</span>";
    elem.innerHTML = text
};

function shuffle(elem: any, text: string): void {
    wrapSpan(elem);
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

function shuffle_active(): void {
    for (let i = 0; i < shuffleElem.length; i++) {
        DefaultShuffleTextArray.push(shuffleElem[i].innerHTML);
        shuffle(shuffleElem[i], DefaultShuffleTextArray[i]);
    };
};


</script>



<style lang="scss" scoped>
header {
    font-family: 'Cormorant Garamond', serif;
    position: relative;
    z-index: 1000;

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
            width: calc(200px + (100vw - 1920px) * 0.01);
            height: 200px;
            margin: 0 0 64px;
            background-color: #ffffff;
        }

        h2 {
            font-size: calc(24px + (100vw - 1920px) * 0.01);
            line-height: 2em;
        }
    }

    .header-toggle-line {
        width: 1px;
        margin: 0 calc(120px + (100vw - 1920px) * 0.01);
        background-color: #ffffff;
    }

    #header-nav {
        display: flex;

        .header-links {
            h3 {
                font-size: calc(24px + (100vw - 1920px) * 0.01);
                line-height: 1em;
            }

            .header-links-line {
                width: calc(200px + (100vw - 1920px) * 0.01);
                height: 1px;
                margin: 24px 0;
                background-color: #ffffff;
            }

            ul {
                li {
                    font-size: calc(16px + (100vw - 1920px) * 0.01);
                    line-height: 1em;
                }

                li:not(:first-child) {
                    margin: 24px 0 0;
                }
            }
        }

        .header-links:not(:last-child) {
            margin: 0 calc(120px + (100vw - 1920px) * 0.01) 0 0;
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

@media screen and (max-width:1601px) {
    header {
        #header-logo {
            display: none;
        }

        .header-toggle-line {
            display: none;
        }

        #header-nav {
            .header-links {
                .header-links-line {
                    width: 120px;
                    margin: 16px 0;
                }

                ul {
                    li:not(:first-child) {
                        margin: 18px 0 0;
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    header {
        #header {
            padding: 12px 2.5%;

            h1 {
                font-size: 14px;
            }
        }

        #header-toggle {
            top: 100px;
            left: 50%;
            transform: translate(-50%, 0);
        }

        #header-nav {
            display: block;

            .header-links {
                width: 90vw;

                h3 {
                    font-size: 20px;
                }

                .header-links-line {
                    width: 100%;
                    margin: 12px 0;
                }

                ul {
                    display: none;
                    height: 0px;
                    transition: all 1000ms;

                    li {
                        font-size: 12px;
                    }

                    li:not(:first-child) {
                        margin: 12px 0 0;
                    }
                }
            }

            .header-links:not(:last-child) {
                margin: 0 0 24px;
            }
        }
    }
}

.view {
    display: block !important;
    height: 100% !important;
}
</style>