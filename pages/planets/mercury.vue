<template>
    <div class="orbit">
        <div class="orbit-title">
            <h1>MERCURY</h1>
            <div class="line"></div>
            <h6>diameter of the planet / magnification of the mercury</h6>
        </div>
        
        <div class="orbit-params">
            <!--公転速度 / Revolution-->
            <div class="revolution">
                <h2>revolution speed</h2>
                <p>0.24year ( 47.4km/s )</p>
            </div>
            <!--自転速度 / Rotation-->
            <div class="rotation">
                <h2>rotation speed</h2>
                <p>1407.60hour</p>
            </div>
            
        </div>

    </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Shippori+Mincho:wght@400;500;600;700;800&display=swap");

.orbit {
    font-family: 'Cormorant Garamond', serif;

    .orbit-title {
        position: fixed;
        top: 15%;
        left: 5%;
        width: fit-content;
        color: #ffffff;

        h1 {
            font-size: calc(32px + 64 * (100vw - 768px) / 1152);
            line-height: 1em;
            letter-spacing: 0.25em;
        }

        .line{
            width: 100%;
            height: 1px;
            margin: 20px 0;
            background-color: #ffffff;
        }

        h6 {
            font-size: 18px;
            line-height: 1em;
            letter-spacing: 0.25em;
        }
    };

    .orbit-params{
        position: fixed;
        right: 5%;
        bottom: 10%;
        width: fit-content;
        color: #ffffff;
        h2{
            font-size: 16px;
        }
        p{
            font-size: 24px;
        }
    };
};
</style>

