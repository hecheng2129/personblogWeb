<template>
  <div>
    <div class="div" style="margin-top: 50px;">
      <van-row>
        <van-col offset="7">
          <img src="http://personblog.starstarcheng.cn/image/mlogin1.png" style="width: 58%;height: 100px;">
        </van-col>
      </van-row>

      <van-cell-group style="border: 1px solid red;">
        <van-field
          v-model="ruleForm.username"
          left-icon="contact"
          clearable
          label="用户名"
          placeholder="请输入用户名"
          style="border-bottom: 1px solid gray;"
        />

        <van-field
          v-model="ruleForm.password"
          left-icon="closed-eye"
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
        />
      </van-cell-group>


      <van-button type="danger" style="margin-top: 20px;width: 100%;font-size: 16px;" @click="submitForm">登录</van-button>

      <van-row>
        <van-col span="8" offset="16">
          <a href="#" style="font-size: 12px;">忘记密码？</a>
          <a href="mregister" style="font-size: 12px;">去注册</a>
        </van-col>
      </van-row>
    </div>

    <div class="div" style="margin-top: 100px;">
        <div style="text-align: center;color: gray;">第三方快捷登录</div>
        <van-button style="margin-top: 20px;width: 100%;font-size: 16px;border: 1px solid gray;color: green;">
          <img src="http://personblog.starstarcheng.cn/image/weichat.jpg" style="width: 20px;height: 20px;vertical-align:middle;"/>微信
        </van-button>
        <van-button style="margin-top: 20px;width: 100%;font-size: 16px;border: 1px solid gray;color: blue;">
          <img src="http://personblog.starstarcheng.cn/image/QQ.png" style="width: 20px;height: 22px;vertical-align:middle"/>QQ
        </van-button>
    </div>

    <div class="div" style="font-size: 12px;color: gray;margin-top: 50px;text-align: center;">
      登录 即代表同意《用户服务条款》 与 《隐私协议》
    </div>
  </div>
</template>

<script>
  export default {
    name: "MLogin",
    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
        },
        user:""
      }
    },
    methods:{
      submitForm() {
        //发送post请求
        var url = this.websiteUrl+"/users/login";
        var that = this;
        that.axios.post(url, that.$qs.stringify({
          'username': that.ruleForm.username,
          'password': that.ruleForm.password
        })).then(function (res) {
          if (res.data.code == 200) {
            that.user = res.data.data;
            console.log(res.data.data.username);

            //1.保存用户资料到localsession
            localStorage.setItem("www.simoniu.com",JSON.stringify(that.user));

            //2.跳转到首页
            window.location.href="MIndex";
          }
          console.log(res.data.msg);
        }).catch(function (error) {
          console.log(error);
        });
      },
    }
  }
</script>

<style scoped>
  .div{
    padding: 0px 20px 0px 20px;
  }
</style>
