<template>
  <div class="mPersonalSetting">
    <van-row class="MyRow">
      <a href="javascript:history.go(-1)">
        <van-icon name="arrow-left" size="25px"/>
      </a>
    </van-row>

    <van-row style="padding: 15px 10px 15px 20px;background-color: white;">
      <van-cell title="消息中心" class="row4_col" is-link/>
      <van-cell title="夜间模式" class="row4_col" is-link/>
      <van-cell title="隐私设置" class="row4_col" is-link/>
      <van-cell title="清楚缓存" class="row4_col" is-link/>
    </van-row>

    <van-row style="padding: 15px 10px 15px 20px;background-color: white;margin-top: 10px;">
      <van-cell title="账号与安全" class="row4_col" is-link/>
    </van-row>

    <van-row style="padding: 15px 10px 15px 20px;background-color: white;margin-top: 10px;">
      <van-cell title="给我们评分" class="row4_col" is-link/>
      <van-cell title="推荐好友" class="row4_col" is-link/>
      <van-cell title="用户服务条款" class="row4_col" is-link/>
      <van-cell title="隐私条款" class="row4_col" is-link/>
      <van-cell title="版本" class="row4_col" is-link/>
    </van-row>

    <van-row style="padding:15px 10px 15px 20px;">
      本程序起始于2019/12月
    </van-row>
    <van-row style="padding: 15px 10px 15px 20px;background-color: white;">
      <van-cell title="退出登录" class="row4_col" @click="doLoginOut"/>
    </van-row>

    <MLogin ref="mlogin"></MLogin>
  </div>
</template>

<script>
  var graceChecker = require('../../assets/js/commons/graceChecker');
  import MLogin from '../commons/MLogin'

  export default {
    name: "MPersonalSetting",
    components: {
      MLogin
    },
    methods: {
      doLoginOut: function () {
        this.$refs.mlogin.doLoginOut();
      }
    }
  }
</script>

<style scoped>
  .mPersonalSetting {
    background-color: gainsboro;
  }

  .row4_col {
    font-size: 18px;
  }

  .MyRow {
    background-color: white;
    margin-top: 10px;
    padding: 5px;
  }
</style>
