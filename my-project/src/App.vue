<template>
    <div id="app">
        <el-container>
            <el-header>陈北七</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Copyright © 2019 陈北七</el-footer>
        </el-container>
        <audio src="../static/沿海公路的出口.mp3" autoplay loop></audio>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {}
    }
}
</script>

<style>
body {
    margin: 0px;
}
.el-header {
    background-color: #000000;
    color: #a18aac;
    text-align: right;
    line-height: 60px;
}
.el-footer {
    background-color: #000000;
    color: #4c4d4e;
    text-align: center;
    line-height: 60px;
}
.el-main {
    background-color: #4c4d4e;
    color: #333;
    text-align: center;
}
</style>
