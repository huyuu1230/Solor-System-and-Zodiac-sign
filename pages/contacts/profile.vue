<template>
    <div id="contact">
        <h1>PROFILE</h1>
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
    </div>
</template>

<style lang="scss">
#contact {
    margin: 160px 0 0 0;
    h1{
        font-size: 64px;
        line-height: 1em;
        letter-spacing: 0.25em;
    }
    ul{
        margin: 50px 0 0;
        li{
            display: flex;
            align-items: flex-end;

            h2{
                font-size: 20px;
                line-height: 1em;
            }
            p{
                font-size: 20px;
                line-height: 1em;
                margin: 0 0 0 10px;
            }
        }
        li:not(:first-child){
            margin: 20px 0 0;
        }
    }
}
</style>