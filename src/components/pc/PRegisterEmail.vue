<template>
  <div class="registerBody">
    <div style="height: 220px">

    </div>

    <div>
      <el-row>
        <el-col :span="3" :offset="16">
          <h2 style="color: gold;text-align: center;">用户注册</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7" :offset="14" class="form">

          <!--form表单-->
          <!--<el-form :model="user" label-width="100px">

            <el-form-item label="用户名" class="item">
              <el-input v-model="user.username" placeholder="请输入用户名" maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="item">
              <el-input show-password type="password" placeholder="请输入密码" v-model="user.password"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" class="item">
              <el-input show-password type="password" placeholder="请输入确认密码" v-model="user.checkPassword"></el-input>
            </el-form-item>

            <el-form-item label="邮箱号" class="item">
              <el-input placeholder="请输入邮箱号" v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item label="验证码" class="item">
              <el-input placeholder="请输入验证码" v-model="user.validateCode" class="validateCode"></el-input>
              <el-button type="success" round @click="sendRandomCode()">获取验证码</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>-->

          <el-row>
            <el-col :span="5" :offset="2" class="loginFont">用户名:</el-col>
            <el-col :span="15" :offset="1" class="myInput">
              <el-input v-model="user.username" placeholder="请输入用户名"  size="medium" maxlength="6"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" :offset="2" class="loginFont">确认密码:</el-col>
            <el-col :span="15" :offset="1">
              <el-input v-model="user.password" type="password" placeholder="请输入密码"  size="medium" class="myInput"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" :offset="2" class="loginFont">密码:</el-col>
            <el-col :span="15" :offset="1">
              <el-input v-model="user.checkPassword" type="password" placeholder="请输入确认密码"  size="medium" class="myInput"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" :offset="2" class="loginFont">邮箱号:</el-col>
            <el-col :span="15" :offset="1">
              <el-input v-model="user.email" placeholder="请输入邮箱号"  size="medium" class="myInput"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5" :offset="2" class="loginFont">验证码:</el-col>
            <el-col :span="7" :offset="1">
              <el-input v-model="user.validateCode" placeholder="请输入验证码"  size="medium" maxlength="6" class="myInput"></el-input>
            </el-col>
            <el-col :span="5" class="myInput">
              <el-button type="success" round @click="sendRandomCode()" size="medium">获取验证码</el-button>
            </el-col>
          </el-row>

          <el-row style="margin-top: 20px;">
            <el-col :offset="13">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-col>
          </el-row>

        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script>
  export default {
    name: "PRegister",
    data() {
      return {
        user: {
          username: '',
          password: '',
          checkPassword: '',
          email:'',
          validateCode:'',
          token:''
        }
      }

    },
    mounted: function () {

    },
    methods: {
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
            //跳转去登录页面
            window.location.href="/plogin";
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
        console.log(123);
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

      //重置表单
      resetForm:function () {
        this.user.username="";
        this.user.password="";
        this.user.checkPassword="";
        this.user.email="";
        this.user.validateCode="";
      }
    }
  }

</script>

<style scoped>
  .registerBody{
    background-image: url("http://personblog.starstarcheng.cn/image/lookStar.jpg");
    background-size:100% 900px;
    height: 900px;
  }

  .item .el-form-item__label{
    color: wheat;
    font-size: 16px;
  }

  /*表单部分*/
  .form {
    border: 2px solid gold;
    padding: 20px;
    padding-top: 40px;
    padding-right: 40px;
  }

  .validateCode{
    width: 50%;
  }

  .loginFont{
    font-size: 16px;
    color: wheat;
    margin-top: 20px;
    text-align: right;
  }

  .myInput{
    padding-top: 15px;
  }
  /*表单部分*/

</style>
