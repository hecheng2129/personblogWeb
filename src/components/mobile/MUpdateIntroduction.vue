<template>
  <div class="mUpdateUsername">
    <MLogin ref="mlogin"></MLogin>

    <van-row style="padding: 10px;background-color: white;">
      <van-col span="2">
        <a href="javascript:history.go(-1)">
          <van-icon name="arrow-left" size="25px" color="black"/>
        </a>
      </van-col>

      <van-col style="font-size: 20px;color: blueviolet" span="4" offset="18" @click="updateIntroduction">
        保存
      </van-col>
    </van-row>

    <div style="padding: 10px;">
      <van-row style="font-size: 20px;padding: 10px 0 10px 0;">
        签名
      </van-row>

      <van-row style="font-size: 12px;color: gray;">
        最多30个字符
      </van-row>
    </div>

    <div style="padding: 10px;background-color: white;width: 100%;height: 100px;">
      <van-field v-model="introduction" maxlength="30" type="textarea" rows="2" show-word-limit style="font-size: 18px;"/>
    </div>
  </div>
</template>

<script>
  import MLogin from '../commons/MLogin';
  import { Dialog } from 'vant';

  export default {
    name: "MUpdateIntroduction",
    components: {
      MLogin
    },
    data() {
      return {
        loginSuccessUser: {}, //登录成功后的用户对象
        introduction:''
      }
    },
    mounted() {
      this.loginSuccessUser = this.$refs.mlogin.loginSuccessUser;
      this.introduction = this.loginSuccessUser.introduction;
    },
    methods: {
      /**
       * 更新用户名
       */
      updateIntroduction:function () {
        let url = this.websiteUrl + "/users/updateIntroduction?uid="+this.loginSuccessUser.uid+"&introduction="+this.introduction;
        let that = this;
        this.axios.patch(url).then(function (response) {
          if (response.data.code == 200) {
            //1.获取返回对象
            that.loginSuccessUser = response.data.data;
            //2.移除原有localStorage
            localStorage.removeItem("www.simoniu.com");
            //3.保存用户资料到localsession
            localStorage.setItem("www.simoniu.com",JSON.stringify(that.loginSuccessUser));

            Dialog({ message: '修改成功' });
            //4.刷新页面
            // location.reload();
          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }

        }).catch(function (error) {
          that.$message({
            message: '更新失败！',
            type: 'error'
          });
        })
      }
    }
  }
</script>

<style scoped>
  .mUpdateUsername {
    background-color: gainsboro;
    height: 850px;
    width: 100%;
  }
</style>
