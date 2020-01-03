<template>
  <div class="mLogin">
    <div class="div" style="margin-top: 50px;">
      <van-row>
        <van-col offset="7">
          <img src="http://personblog.starstarcheng.cn/image/mlogin1.png" style="width: 58%;height: 100px;">
        </van-col>
      </van-row>

      <van-cell-group style="border: 1px solid red;">
        <van-field
          v-model="user.username"
          left-icon="contact"
          clearable
          label="用户名"
          placeholder="请输入用户名"
          style="border-bottom: 1px solid gray;"
        />

        <van-field
          v-model="user.password"
          left-icon="closed-eye"
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
          style="border-bottom: 1px solid gray;"
        />

        <van-field
          v-model="user.checkPassword"
          left-icon="closed-eye"
          clearable
          type="password"
          label="确认密码"
          placeholder="请输入确认密码"
          style="border-bottom: 1px solid gray;"
        />

        <van-field
          v-model="user.email"
          left-icon="free-postage"
          clearable
          label="QQ邮箱"
          placeholder="请输入QQ邮箱"
          style="border-bottom: 1px solid gray;"
        />

        <van-row>
          <van-col span="19">
            <van-field
              v-model="user.validateCode"
              left-icon="filter-o"
              clearable
              label="验证码"
              placeholder="请输入验证码"
            />
          </van-col>

          <van-col span="5">
            <van-button type="info" style="width: 100%" @click="sendRandomCode">获取</van-button>
          </van-col>
        </van-row>
      </van-cell-group>

      <van-button type="danger" style="margin-top: 20px;width: 100%;font-size: 16px;" @click="submitForm()">注册</van-button>
    </div>

    <div class="div" style="font-size: 12px;color: gray;margin-top: 50px;text-align: center;">
      注册 即代表同意《用户服务条款》 与 《隐私协议》
    </div>
  </div>
</template>

<script>
  export default {
    name: "MRegister",
    data() {
      return {
        user: {
          username: '',
          password: '',
          email:'',
          checkPassword: '',
          validateCode:'',
          token:''
        }
      }
    },
    methods:{
      submitForm() {
        ///验证两次密码一致
        if(this.user.password!=this.user.checkPassword){
          this.$message({
            message: '两次输入密码不一致!',
            type: 'warning'
          });
          return;
        }

        //执行用户注册
        let url = this.websiteUrl+'/users/register?token=' + this.token;
        let that = this;
        this.axios.post(url,this.user).then(function (response) {
          if (response.data.code == 200) {
            that.$message({
              message: response.data.msg,
              type: 'success'
            });

            window.location.href="MLogin";

          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: '验证码发送失败！',
            type: 'error'
          });
        })
      },


      //给QQ发送验证码
      sendRandomCode:function(){
        let url = this.websiteUrl+'/commons/ercode?toEmail=' + this.user.email;
        let that = this;
        this.axios.get(url)
          .then(function (response) {
            if (response.data.code == 200) {
              that.token = response.data.data;
              that.$message({
                message: response.data.msg,
                type: 'success'
              });
            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
          that.$message({
            message: '验证码发送失败！',
            type: 'error'
          });
        })
      },
    }
  }
</script>

<style scoped>
  .div {
    padding: 0px 20px 0px 20px;
  }
</style>
