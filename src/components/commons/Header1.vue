<template>
  <div>
    <!--导航栏-->
    <div class="navigation">
      <el-row>
        <el-menu class="el-menu" mode="horizontal">
          <el-col :span="2">
            <el-menu-item index="1"><img src="../../assets/images/blog.gif" style="height: 50px; width: 80px"/>
            </el-menu-item>
          </el-col>

          <el-col :span="2" style="text-align: center;">
            <el-menu-item index="2"><a href="PIndex" class="fontColor">首页</a></el-menu-item>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <el-menu-item index="3"  class="fontColor">技术文章</el-menu-item>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <el-menu-item index="4"  class="fontColor">程序人生</el-menu-item>
          </el-col>
          <el-col :span="3" style="text-align: center;">
            <el-submenu index="2" >
              <template slot="title"><div class="fontColor">我的工作台</div></template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <el-menu-item index="6" class="el-icon-chat-dot-round fontColor" >消息中心</el-menu-item>
          </el-col>
          <el-col :span="2" :offset="4" style="text-align: center;">
            <el-menu-item index="7"><a href="PWriteBlog" class="fontColor">写博客</a></el-menu-item>
          </el-col>
          <el-col :span="2" style="text-align: center;">
            <el-menu-item index="8" class="el-icon-user-solid fontColor">关于作者</el-menu-item>
          </el-col>
          <el-col :span="3" style="text-align: center;">
            <el-menu-item index="9">
              <div v-if="!isLogin">
                <a href="PLogin" class="fontColor">登录</a> | <a href="PRegisterEmail" class="fontColor">注册</a>
              </div>

              <div v-if="isLogin">
                <el-submenu index="10">
                  <template slot="title">
                    <div style="color: #93D1FF">欢迎：{{loginSuccessUser.username}}</div>
                  </template>
                  <el-menu-item index="10-1"><a href="PPersonalData">个人资料</a></el-menu-item>
                  <el-menu-item index="10-2"><a href="PAccountSettings">账号设置</a></el-menu-item>
                  <el-menu-item index="10-3" @click="doLoginOut()">退出</el-menu-item>
                </el-submenu>
              </div>
            </el-menu-item>
          </el-col>
        </el-menu>

      </el-row>
    </div>
    <!--抵消header位置-->
    <div style="height: 80px;width: 100%;">

    </div>
  </div>
</template>

<script>
  var graceChecker = require('../../assets/js/commons/graceChecker');

  export default {
    name: "Header1",
    data: function () {
      return {
        isLogin: false,
        loginSuccessUser: {} //登录成功后的用户对象
      }
    },
    mounted() {
      this.doLogin();
    },
    methods: {
      doLogin: function () {
        this.isLogin = graceChecker.isLogin();

        if (this.isLogin) {
          this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));
          // console.log(this.loginSuccessUser);
        }
      },

      doLoginOut: function () {
        if (this.isLogin) {
          localStorage.removeItem("www.simoniu.com");
        }
        window.location.href = '/pindex';
      }
    }
  }
</script>

<style scoped>
  .navigation {
    background-color: darkslateblue;
    margin: 0 auto;
    width: 100%;
    position: fixed;
    z-index: 2000;
  }

  .el-menu {
    margin: 0 auto;
    width: 80%;
    background-color: darkslateblue;
    border-bottom: 1px solid darkslateblue;
  }

  .fontColor{
      color: gold;
  }
</style>
