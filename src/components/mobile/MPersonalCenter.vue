<template>
  <div class="mPersonalCenter">
    <!--登录-->
    <van-row style="padding:10px;background-color: white;">
      <div v-if="!isLogin">
        <van-col span="6">
          <img src="http://personblog.starstarcheng.cn/images/avatar/avatar.jpg" style="width: 80px;height: 80px;border-radius: 50%;">
        </van-col>

        <van-col span="15" style="margin-top: 20px;">
          <van-row>
            <a href="mlogin">点击登录</a>
          </van-row>

          <van-row style="font-size: 12px;color: gray;">
            登录获取更多信息
          </van-row>
        </van-col>

        <van-col span="2" style="margin-top: 25px;">
          <van-icon name="arrow" size="20"/>
        </van-col>
      </div>

      <div v-if="isLogin">
        <van-col span="6">
          <img :src="loginSuccessUser.avatar" style="width: 80px;height: 80px;border-radius: 50%;">
        </van-col>

        <van-col span="15" style="margin-top: 20px;">
          <van-row>
            {{loginSuccessUser.username}}
          </van-row>

          <van-row style="font-size: 12px;color: gray;">
            <div v-if="loginSuccessUser.introduction==null">
                此人很懒，什么都没写
            </div>

            <div v-if="loginSuccessUser.introduction!=null">
              {{loginSuccessUser.introduction}}
            </div>

          </van-row>
        </van-col>

        <van-col span="2" style="margin-top: 25px;">
          <van-icon name="arrow" size="20" @click="toMomepage"/>
        </van-col>
      </div>


    </van-row>

    <!--关注-->
    <van-row style="padding:10px;background-color: white;margin-top: 5px;">
      <van-col span="6" class="row2_col">
        0<br/>关注
      </van-col>
      <van-col span="6" class="row2_col">
        0<br/>粉丝
      </van-col>
      <van-col span="6" class="row2_col">
        0<br/>访问
      </van-col>
      <van-col span="6" class="row2_col">
        0<br/>排名
      </van-col>
    </van-row>

    <!--博客标签-->
    <van-row style="padding: 20px;background-color: white;margin-top: 5px;">
      <van-col class="row3_col">
        <van-icon name="notes-o" size="40"/><br/>博客
      </van-col>
      <van-col class="row3_col">
        <van-icon name="location-o" size="40"/><br/>位置
      </van-col>
      <van-col class="row3_col">
        <van-icon name="notes-o" size="40"/><br/>博客
      </van-col>
      <van-col class="row3_col">
        <van-icon name="notes-o" size="40"/><br/>博客
      </van-col>
      <van-col class="row3_col">
        <van-icon name="notes-o" size="40"/><br/>博客
      </van-col>
      <van-col class="row3_col">
        <van-icon name="notes-o" size="40"/><br/>博客
      </van-col>
      <van-col class="row3_col">
        <van-icon name="notes-o" size="40"/><br/>博客
      </van-col>
      <van-col class="row3_col">
        <van-icon name="notes-o" size="40"/><br/>博客
      </van-col>
    </van-row>

    <van-row style="padding: 15px 10px 15px 20px;background-color: white;margin-top: 10px;">
        <van-cell title="我的私密文章" icon="closed-eye" class="row4_col"/>
        <van-cell title="我的粉丝" icon="friends-o" class="row4_col"  is-link />
        <van-cell title="我的成长历程" icon="chart-trending-o" class="row4_col"  is-link />
        <van-cell title="我的音乐" icon="service-o" class="row4_col"  is-link />
    </van-row>

    <van-row style="padding: 15px 10px 15px 20px;background-color: white;margin-top: 10px;">
      <van-cell title="产品反馈" icon="edit" class="row4_col" is-link/>
      <van-cell title="设置" icon="setting-o" class="row4_col" is-link @click="toPersonalSetting"/>
    </van-row>

    <MFoot ref="mfoot"></MFoot>

    <MLogin ref="mlogin"></MLogin>
  </div>
</template>

<script>
  import MFoot from '../commons/MFoot';
  import MLogin from '../commons/MLogin'

  var graceChecker = require('../../assets/js/commons/graceChecker');

  export default {
    name: "MPersonalCenter",
    components:{
      MFoot,
      MLogin
    },
    data() {
      return{
        isLogin:"",
        loginSuccessUser:''
      }
    },
    mounted(){
      this.isLogin=this.$refs.mlogin.isLogin;
      this.loginSuccessUser=this.$refs.mlogin.loginSuccessUser;
      this.$refs.mfoot.active=3;
    },
    methods: {
      toPersonalSetting:function () {
        //跳转传参
        this.$router.push({
          name: "MPersonalSetting",
        });
      },
      toMomepage:function () {
        //跳转传参
        this.$router.push({
          name: "Mhomepage",
        });
      }
    }
  }
</script>

<style scoped>
    .mPersonalCenter{
      background-color: gainsboro;
    }

    .row2_col{
      text-align: center;
    }

    .row3_col{
      text-align: center;
      padding: 6%;
    }

    .row4_col{
      font-size: 16px;
    }
</style>
