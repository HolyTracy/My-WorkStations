<template>
    <div id="app">
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Copyright © 2019 陈北七</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
body {
    margin: 0px;
}
.el-header {
    background-color: #000000;
    color: #333;
    text-align: center;
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
