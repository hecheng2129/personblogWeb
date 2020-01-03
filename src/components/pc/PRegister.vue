<template>
  <div class="registerBody">
    <div style="height: 220px">

    </div>

    <div>
      <el-row>
        <el-col :span="6" :offset="16">
          <h2 style="color: gold">用户注册</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="14" class="form">
          <el-form :model="user" label-width="300px">
            <el-form-item label="用户名" class="item">
              <el-input v-model="user.username" placeholder="请输入用户名" maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="item">
              <el-input show-password type="password" placeholder="请输入密码" v-model="user.password"></el-input>
            </el-form-item>

            <el-form-item label="确认密码" class="item">
              <el-input show-password type="password" placeholder="请输入确认密码" v-model="user.checkPassword"></el-input>
            </el-form-item>

            <el-form-item label="手机号" class="item">
              <el-input placeholder="请输入手机号" v-model="user.telephone"></el-input>
            </el-form-item>

            <el-form-item label="验证码" class="item">
              <el-input placeholder="请输入验证码" v-model="user.identifyCode" class="identifyCode"></el-input>
              <el-button type="success" round @click="sendRandomCode()">获取验证码</el-button>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm()">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>

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
          telephone:'',
          checkPassword: '',
          identifyCode:'',
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

        //发送post请求
        /*var url = "http://localhost:8080/personblog/users/register";
        var that = this;*/

        /*post可以传对象*/
        /*that.axios.post(url, that.user).then(function (res) {
          if (res.data.code == 200) {
            that.user = res.data.data;
            console.log(res.data.data.username);
          }else{
            that.$message({
              message: '用户名已存在!',
              type: 'warning'
            });
          }
          console.log(res.data.msg);
        }).catch(function (error) {
          console.log(error);
        });*/

        //执行用户注册
          let url = this.websiteUrl+'/users/register?token=' + this.token;
          let that = this;
          this.axios.post(url,this.user).then(function (response) {
            if (response.data.code == 200) {
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

      //给手机发送验证码
      sendRandomCode:function(){
        let url = this.websiteUrl+'/personblog/commons/mrcode?telephone=' + this.user.telephone;
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
  .registerBody{
    background-image: url("http://personblog.starstarcheng.cn/image/lookStar.jpg");
    background-size:100% 900px;
    height: 900px;
  }

/*  .item .el-form-item__label{
    color: wheat;
    font-size: 16px;
  }*/

  /*表单部分*/
  .form {
    border: 2px solid gold;
    padding: 20px;
    padding-top: 40px;
    padding-right: 40px;
  }

  .identifyCode{
    width: 100px;
  }
  /*表单部分*/

</style>
