<template>
  <div class="loginBody">
    <div style="height: 220px">

    </div>

    <div>
      <el-row>
        <el-col :span="6" :offset="16">
          <h2 style="color: gold">用户登录</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="14" class="form">
          <el-row>
            <el-col :span="4" :offset="2" class="loginFont">用户名:</el-col>
            <el-col :span="15" :offset="1" class="myInput">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名"  size="medium" maxlength="10"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :offset="2" class="loginFont">密码:</el-col>
            <el-col :span="15" :offset="1">
              <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码"  size="medium" maxlength="10" class="myInput"></el-input>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :offset="2" class="loginFont">验证码:</el-col>
            <el-col :span="7" :offset="1">
              <el-input v-model="ruleForm.verificationCode" placeholder="请输入验证码"  size="medium" maxlength="4"  class="myInput"></el-input>
            </el-col>
            <el-col :span="10" class="myInput">
              <div>
                <canvas id="s-canvas" style="cursor: pointer" title="看不清楚，换一张" :width="contentWidth"
                        :height="contentHeight"
                        @click="handleClick">
                </canvas>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :offset="10" style="margin-top: 20px;">
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-col>
          </el-row>

          <!--form形式-->
         <!-- <el-form :model="ruleForm" label-width="100px" ref="ruleForm">
            <el-form-item label="用户名" class="item">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名" maxlength="10"></el-input>
            </el-form-item>

            <el-form-item label="密码" class="item">
              <el-input show-password type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
            </el-form-item>

            <el-form-item label="验证码" class="item">
              <el-input v-model="ruleForm.verificationCode" class="verificationCodeInput"></el-input>
              <div class="s-canvas">
                <canvas id="s-canvas" style="cursor: pointer" title="看不清楚，换一张" :width="contentWidth"
                        :height="contentHeight"
                        @click="handleClick">
                </canvas>
              </div>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>-->

          <div class="threelogin">
            <el-row>
              <el-col :span="7">
                <a><img src="../../assets/images/qq.jpg" align="absmiddle"/> QQ登录</a>
              </el-col>
              <el-col :span="7">
                <a><img src="../../assets/images/weichat.jpg" align="absmiddle"/> 微信登录</a>
              </el-col>
            </el-row>
          </div>

          <el-row style="font-size: 12px;color: gainsboro;">
            <el-col :span="5" :offset="9"><a>忘记密码</a></el-col>
            <el-col :span="5"><a>忘记用户名</a></el-col>
            <el-col :span="5"><a href="PRegisterEmail">免费注册</a></el-col>
          </el-row>

        </el-col>
      </el-row>

    </div>
  </div>
</template>


<script>
  export default {
    name: "PLogin",
    props: {
      fontSizeMin: {
        type: Number,
        default: 32
      },
      fontSizeMax: {
        type: Number,
        default: 40
      },
      backgroundColorMin: {
        type: Number,
        default: 180
      },
      backgroundColorMax: {
        type: Number,
        default: 240
      },
      colorMin: {
        type: Number,
        default: 20
      },
      colorMax: {
        type: Number,
        default: 40
      },
      lineColorMin: {
        type: Number,
        default: 20
      },
      lineColorMax: {
        type: Number,
        default: 80
      },
      dotColorMin: {
        type: Number,
        default: 0
      },
      dotColorMax: {
        type: Number,
        default: 255
      },
      contentWidth: {
        type: Number,
        default: 136
      },
      contentHeight: {
        type: Number,
        default: 48
      }
    },

    data() {
      return {
        ruleForm: {
          username: '',
          password: '',
          verificationCode: '',
        },
        identifyCode: '',
        user:""
      }

    },

    methods: {
      //登录
      submitForm(formName) {
        //检验验证码
        if (this.identifyCode != this.ruleForm.verificationCode) {
          this.$message({
            message: '验证码错误!',
            type: 'warning'
          });
          return;
        }

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
            window.location.href="/pindex";
          }
          console.log(res.data.msg);
        }).catch(function (error) {
          console.log(error);
        });

        /*that.axios.get(url,{
          params:{
            'username': that.ruleForm.username,
            'password': that.ruleForm.password
          }
        }).then(function (res) {
          if (res.data.code == 200) {
            that.user = res.data.data;
            console.log(res.data.data);
          }
          console.log(res.data.msg);
        }).catch(function (error) {
          console.log(error);
        });*/

      },
      //重置
      resetForm(formName) {
        this.ruleForm.username="";
        this.ruleForm.password="";
        this.ruleForm.verificationCode="";
      },

      //点击生成随机数 并传给调用它的组件（父组件用changeCode接收）
      handleClick() {
        let num = "";
        for (let i = 0; i < 4; i++) {
          num += Math.floor(Math.random() * 10)
        }
        this.identifyCode = num;
        let newN = this.identifyCode;
        this.$emit('changeCode', newN);
      },
      // 生成一个随机数
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      // 生成一个随机的颜色
      randomColor(min, max) {
        var r = this.randomNum(min, max);
        var g = this.randomNum(min, max);
        var b = this.randomNum(min, max);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
      },
      drawPic() {
        var canvas = document.getElementById('s-canvas');
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'bottom';
        // 绘制背景
        ctx.fillStyle = this.randomColor(
          this.backgroundColorMin,
          this.backgroundColorMax
        )
        ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
        // 绘制文字
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx, this.identifyCode[i], i)
        }
        this.drawLine(ctx)
        this.drawDot(ctx)
      },
      drawText(ctx, txt, i) {
        ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
        ctx.font =
          this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
        var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1))
        var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
        var deg = this.randomNum(-45, 45)
        // 修改坐标原点和旋转角度
        ctx.translate(x, y)
        ctx.rotate(deg * Math.PI / 180)
        ctx.fillText(txt, 0, 0)
        // 恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180)
        ctx.translate(-x, -y)
      },
      drawLine(ctx) {
        // 绘制干扰线
        for (let i = 0; i < 8; i++) {
          ctx.strokeStyle = this.randomColor(
            this.lineColorMin,
            this.lineColorMax
          )
          ctx.beginPath()
          ctx.moveTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.lineTo(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight)
          )
          ctx.stroke()
        }
      },
      drawDot(ctx) {
        // 绘制干扰点
        for (let i = 0; i < 100; i++) {
          ctx.fillStyle = this.randomColor(0, 255)
          ctx.beginPath()
          ctx.arc(
            this.randomNum(0, this.contentWidth),
            this.randomNum(0, this.contentHeight),
            1,
            0,
            2 * Math.PI
          )
          ctx.fill()
        }
      },

    },

    watch: {
      identifyCode() {
        this.drawPic();
      }
    },
    mounted() {
      this.drawPic();
      this.handleClick();
    }
  }
</script>

<style scoped>
  .loginBody {
    background-image: url("http://personblog.starstarcheng.cn/images/p.jpg");
    background-size: 100% 900px;
    height: 900px;
  }

  /*表单部分*/
  .form {
    border: 2px solid gold;
    padding: 20px;
    padding-top: 40px;
    padding-right: 40px;
    /*background-color: wheat;*/
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

  canvas {
    width: 80%;
    height: 36px;
    vertical-align: bottom;
  }

  /*表单部分*/

  a {
    color: gainsboro;
    text-decoration: none;
  }

  /*第三方登录*/
  .threelogin img {
    width: 20px;
    height: 20px;
  }

  /*第三方登录*/
</style>
