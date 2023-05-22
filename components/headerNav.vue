<template>
    <nav id="information-nav">
        <h1>PAGES</h1>
        <ul>
            <li>
                <NuxtLink to="/">Index</NuxtLink>
            </li>
        </ul>
        <h1>THREE</h1>
        <ul>
            <li>
                <NuxtLink to="/geometry">Geometry</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/material">Material</NuxtLink>
            </li>
            <li>
                <NuxtLink to="/camera">Camera</NuxtLink>
            </li>
        </ul>
        <h1>Math</h1>
        <ul>
            <li>
                <NuxtLink to="coordinate">三次元座標</NuxtLink>
            </li>
        </ul>
        <h1>Custom</h1>
        <ul>
            <li>
                <NuxtLink to="custom">Custom</NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;500;700&display=swap');

#information-nav {
    position: fixed;
    top: 0;
    left: 0;
    max-width: 200px;
    width: fit-content;
    height: 100vh;
    padding: 50px 50px 0;
    font-family: 'Kaisei Decol', serif;
    z-index: 1000;
}

h1 {
    font-size: 24px;
    letter-spacing: 0.25em;
}

h1:not(:first-child) {
    margin: 50px 0 0 0;
}

ul {
    margin: 30px 0 0 0;
}

li {
    list-style: none;

    a {
        display: block;
        text-decoration: none;
        font-size: 16px;
        letter-spacing: 0.25em;
        color: #222222;
    }
}

li:not(:first-child) {
    margin: 10px 0 0 0;
}</style>