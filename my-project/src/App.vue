<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        惊喜
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item icon="el-icon-ice-cream-round">田馥甄的工作室</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
            <el-footer>Copyright © 2019 陈北七</el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            data1: null
        }
    },
    methods: {
        handleCommand() {
            this.data1
            debugger
            this.$router.push({ path: '/excel' })
        }
    }
}
</script>

<style>
body {
    margin: 0px;
    height: 100%;
}
#app {
    height: 100%;
    width: 100%;
    flex: 1;
    position: absolute;
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
    position: fixed;
    bottom: 0;
    width: 100%;
}
.el-main {
    width: fit-content;
}
</style>
