<template>
  <div class="accountSettings">
    <!--导航栏-->
    <Header></Header>

    <div class="accountSettingsBody">
      <el-tabs :tab-position="tabPosition" style="height: 450px;">
        <el-tab-pane label="修改密码">
          <el-row class="labelRow">
            修改密码
          </el-row>

          <form>
            <el-row class="formRow">
              <el-col :span="8">输入旧密码：</el-col>
              <el-col :span="16">
                <el-input placeholder="请输入旧密码" v-model="passwordForm.beforePassword" show-password></el-input>
              </el-col>
            </el-row>

            <el-row class="formRow">
              <el-col :span="8">输入新密码：</el-col>
              <el-col :span="16">
                <el-input placeholder="请输入新密码" v-model="passwordForm.beforePassword" show-password></el-input>
              </el-col>
            </el-row>

            <el-row class="formRow">
              <el-col :span="8">确认新密码：</el-col>
              <el-col :span="16">
                <el-input placeholder="请确认新密码" v-model="passwordForm.beforePassword" show-password></el-input>
              </el-col>
            </el-row>

            <el-row class="formRow">
              <el-col :span="20">
                <el-button type="info">确认</el-button>
              </el-col>
            </el-row>
          </form>

        </el-tab-pane>
        <el-tab-pane label="修改手机">
          <el-row class="labelRow">
            修改手机
          </el-row>

          <form>
            <el-row class="formRow">
              验证码将发送至18****手机
            </el-row>

            <el-row class="formRow" style="color: gainsboro;font-size: 16px;">
              如果长时间未收到验证码，请检查是否将运营商拉黑
            </el-row>

            <el-row class="formRow">
              <el-col :span="8">填写验证码：</el-col>
              <el-col :span="8">
                <el-input placeholder="请填写验证码" v-model="validateCode"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" plain>获取验证码</el-button>
              </el-col>
            </el-row>

            <el-row class="formRow">
              <el-col :span="21">
                <el-button type="info">下一步</el-button>
              </el-col>
            </el-row>
          </form>
        </el-tab-pane>
        <el-tab-pane label="修改邮箱">
          <el-row class="labelRow">
            修改邮箱
          </el-row>

          <form>
            <el-row class="formRow">
                验证码将发送至21****邮箱
            </el-row>

            <el-row class="formRow" style="color: gainsboro;font-size: 16px;">
                如果长时间未收到验证码，请检查垃圾箱
            </el-row>

            <el-row class="formRow">
              <el-col :span="8">填写验证码：</el-col>
              <el-col :span="8">
                <el-input placeholder="请填写验证码" v-model="validateCode"></el-input>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" plain>获取验证码</el-button>
              </el-col>
            </el-row>

            <el-row class="formRow">
              <el-col :span="21">
                <el-button type="info">下一步</el-button>
              </el-col>
            </el-row>
          </form>
        </el-tab-pane>
        <el-tab-pane label="绑定登录账号">
          <el-row class="labelRow">
            绑定登录账号
          </el-row>

          <el-row class="labelRow" style="font-size: 16px;">
            <el-col :span="4">
              <img src="../../assets/images/weichat.jpg" style="width: 50px; height: 50px;vertical-align: middle"/>
              微信
            </el-col>
            <el-col :span="18" style="line-height: 50px">铖法拉盛的</el-col>
            <el-col :span="2" style="line-height: 50px;color: red;">解绑</el-col>
          </el-row>

          <el-row class="labelRow" style="font-size: 16px;">
            <el-col :span="4">
              <img src="../../assets/images/qq.png" style="width: 50px; height: 50px;vertical-align: middle"/>
              qq
            </el-col>
            <el-col :span="18" style="line-height: 50px">感到反感时代</el-col>
            <el-col :span="2" style="line-height: 50px;color: red;">解绑</el-col>
          </el-row>


        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Header from '../commons/Header';

  export default {
    name: "PAccountSettings",
    components: {
      Header
    },
    data() {
      return {
        tabPosition: 'left',
        passwordForm: {
          beforePassword: '',
          password: '',
          ackPassword: ''
        },
        validateCode:''
      };
    }
  }
</script>

<style>
  .accountSettings {
    background-image: url("http://personblog.starstarcheng.cn/image/accountSettingsBg.jpg");
    height: 900px;
    background-size:100% 100%;
    background-attachment: fixed;
  }

  .accountSettingsBody {
    width: 80%;
    margin: 0 auto;
  }

  .el-tabs__item {
    font-size: 20px !important;
    padding-bottom: 20px;
  }

  .labelRow {
    padding: 20px 0 30px 20px;
    border-bottom: 1px solid gold;
    font-size: 25px;
    color: white;
  }

  form {
    font-size: 20px;
    width: 400px;
    height: 200px;
    margin: 40px auto;
    border: 1px solid lightskyblue;
    text-align: center;
    padding: 60px;
    color: white;
  }

  .formRow {
    margin-bottom: 15px;
  }
</style>
