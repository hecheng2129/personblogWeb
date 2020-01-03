<template>
  <div class="personDataBody">
    <!--导航栏-->
    <Header></Header>

    <div style="margin: 0 auto;width: 80%;">
      <el-row style="padding: 30px;font-size: 25px;border-bottom: 1px solid gold;color: white;">
        <el-col :span="4">个人资料</el-col>
      </el-row>

      <el-row style="margin-top: 20px;">
        <el-col :span="4" style="text-align: center;">
          <el-row>
            <img :src="loginSuccessUser.avatar" style="height: 150px;width: 150px;border-radius: 50%;"/>
          </el-row>
          <el-row>
            <el-button type="text" @click="updateAvatar()">修改头像</el-button>
          </el-row>
        </el-col>

        <el-col :span="20">
          <el-row style="margin-bottom: 10px;color: white;">
            <el-col :span="16">ID : qq_40209717</el-col>
            <el-col :span="3">
              <a href="PPersonalCenter">
                个人主页
                <i class="el-icon-arrow-right"></i>
              </a>
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 10px;color: white;">
            <el-col :span="2">关注 2</el-col>
            <el-col :span="2">粉丝 0</el-col>
            <el-col :span="2">C币 0</el-col>
            <el-col :span="2"><a>充值</a></el-col>
          </el-row>

          <el-row style="padding-bottom: 10px;margin-bottom: 10px;border-bottom: 1px solid gold;">
            <el-col :span="3">
              <el-button type="warning" round>开通会员</el-button>
            </el-col>
            <el-col :span="10" style="font-size: 14px;color: gainsboro;padding-top: 10px;">
              *温馨提示：会员显示时间更新有延迟，请稍后再查看
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 5px;color: white;">
            <el-col :span="16">昵称：{{loginSuccessUser.username}}</el-col>
            <el-col :span="2">
              <el-button type="primary" round @click="updateUser()">修改资料</el-button>
            </el-col>
          </el-row>

          <!--<el-row v-for="item in information" :key="item.id">
            {{item.name}}：{{}}
          </el-row>-->

          <el-row style="margin-bottom: 20px;color: white;">
            性别：
            <span v-if="loginSuccessUser.gender == 1">
                男
            </span>

            <span v-if="loginSuccessUser.gender == 2">
                女
            </span>

          </el-row>
          <el-row style="margin-bottom: 20px;color: white">
            生日：{{loginSuccessUser.birthday}}
          </el-row>
          <el-row style="margin-bottom: 20px;color: white">
            地区：{{loginSuccessUser.region}}
          </el-row>
          <el-row style="margin-bottom: 20px;color: white">
            行业：{{loginSuccessUser.profession}}
          </el-row>
          <el-row style="margin-bottom: 20px;color: white">
            简介：{{loginSuccessUser.introduction}}
          </el-row>

        </el-col>

      </el-row>
    </div>

    <!--用户资料修改-->
    <div class="updateinformation" id="updateinformation">
      <el-row style="font-size: 25px;padding: 20px;">修改资料</el-row>

      <el-row class="updateUserInformation">
        <el-col :span="4">昵称：</el-col>
        <el-col :span="8">
          <el-input v-model="updateUserInformation.username" maxlength="6" show-word-limit></el-input>
        </el-col>
      </el-row>

      <el-row class="updateUserInformation">
        <el-col :span="4">性别：</el-col>
        <el-col :span="8">
          <el-radio v-model="updateUserInformation.gender" label="1">男</el-radio>
          <el-radio v-model="updateUserInformation.gender" label="2">女</el-radio>
        </el-col>
      </el-row>

      <el-row class="updateUserInformation">
        <el-col :span="4">生日：</el-col>
        <el-col :span="8">
          <div class="block">
            <el-date-picker
              v-model="updateUserInformation.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row class="updateUserInformation">
        <el-col :span="4">行业：</el-col>
        <el-col :span="8">
          <el-select v-model="updateUserInformation.profession" placeholder="请选择">
            <el-option
              v-for="item in professionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="updateUserInformation">
        <el-col :span="4">地区：</el-col>
        <el-col :span="8">
          <el-select v-model="updateUserInformation.region" placeholder="请选择">
            <el-option
              v-for="item in regionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row class="updateUserInformation">
        <el-col :span="4">简介：</el-col>
        <el-col :span="16">
          <el-input
            type="textarea"
            placeholder="300字以内"
            v-model="updateUserInformation.introduction"
            maxlength="300"
            show-word-limit
          >
          </el-input>
        </el-col>
      </el-row>

      <el-row style="margin-top: 20px;padding-bottom: 20px;">
        <el-col :span="3" :offset="12">
          <el-button type="info" @click="cancelUser()">取消</el-button>
        </el-col>
        <el-col :span="3" :offset="1">
          <el-button type="danger" @click="submitInformation">提交</el-button>
        </el-col>
      </el-row>
    </div>

    <!--修改头像-->
    <div class="userAvatar" id="userAvatar">
        <el-row style="font-size: 25px;padding: 10px;">上传头像</el-row>
        <el-row style="width: 90%;height:180px;margin: 0 auto;text-align: center;">
          <el-upload
            class="avatar-uploader"
            :action="this.websiteUrl+'/qiniuCloud/uploadImg1'"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-row>

        <el-row style="color: grey;padding-left: 25px;">图片宽度*高度至少为150*150像素，大小不超过2MB</el-row>
        <el-row>
            <el-col :offset="14">
              <el-button type="info" style="margin:10px;" @click="subminAvatar">确定</el-button>
              <el-button type="info" style="margin:10px;" @click="cancelAvatar">取消</el-button>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
  import Header from '../commons/Header';
  import $ from 'jquery';

  export default {
    name: "PPersonalData",
    components: {
      Header
    },
    data() {
      return {
        information: [
          {id: 1, name: '昵称'},
          {id: 2, name: '实名'},
          {id: 3, name: '性别'},
          {id: 4, name: '生日'},
          {id: 5, name: '地区'},
          {id: 6, name: '行业'},
          {id: 7, name: '职位'},
          {id: 8, name: '简介'}
        ],
        loginSuccessUser: {}, //登录成功后的用户对象
        updateUserInformation: {
          username: '',
          gender: '1',
          birthday: '',
          profession:'',
          region:'',
          introduction: '',
        },
        professionList: [
          {
            value: 'java程序员',
            label: 'java程序员'
          }, {
            value: 'c++程序员',
            label: 'c++程序员'
          }, {
            value: 'pathon程序员',
            label: 'pathon程序员'
          }, {
            value: '卖烤鱿鱼的',
            label: '卖烤鱿鱼的'
          }, {
            value: '卖烧鸡翅的',
            label: '卖烧鸡翅的'
          }
        ],
        regionList: [
          {
            value: '中国',
            label: '中国'
          }, {
            value: '美国',
            label: '美国'
          }, {
            value: '英国',
            label: '英国'
          }, {
            value: '西伯利亚',
            label: '西伯利亚'
          }, {
            value: '北京烤鸭',
            label: '北京烤鸭'
          }
        ],
        imageUrl:''
      }
    },
    mounted(){
      this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));
    },

    methods:{
      updateUser:function () {
        $("#updateinformation").show();
      },

      cancelUser:function () {
        console.log("cancle方法");
        $("#updateinformation").hide();
      },

      updateAvatar:function () {
        $("#userAvatar").show();
      },

      cancelAvatar:function () {
        $("#userAvatar").hide();
      },

      //执行用户修改操作
      submitInformation:function(){
        console.log(this.loginSuccessUser.username);
        console.log(this.updateUserInformation);

        let url = this.websiteUrl + "/users/update?username="+this.loginSuccessUser.username;
        let that = this;
        this.axios.patch(url,that.updateUserInformation).then(function (response) {
          if (response.data.code == 200) {
            //1.获取返回对象
            that.loginSuccessUser = response.data.data;

            //2.移除原有localStorage
            localStorage.removeItem("www.simoniu.com");

            //3.保存用户资料到localsession
            localStorage.setItem("www.simoniu.com",JSON.stringify(that.loginSuccessUser));

            //4.刷新页面
            location.reload();

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
      },

      //上传图片
      /*路径并不是服务器返回的地址，而是直接从本地读取的地址，而且改变了路径*/
      handleAvatarSuccess(res, file) {
        // console.log(res.data);
        this.imageUrl = res.data;
      },
      //上传头像前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isPNG = file.type === 'image/png';
        const isBMP = file.type === 'image/bmp';

        const isLt5M = file.size / 1024 / 1024 < 5;

        if ( !(isJPG || isPNG || isBMP)) {
          this.$message.error('上传头像图片只能是图片格式!');
        }

        if (!isLt5M) {
          this.$message.error('上传文件大小不能超过 5MB!');
        }
        return isLt5M && (isJPG || isPNG || isBMP);
      },

      //上传头像
      subminAvatar:function () {
        let url = this.websiteUrl + "/users/updateAvatar?uid="+this.loginSuccessUser.uid+"&imageUrl="+this.imageUrl;
        let that = this;
        console.log(this.loginSuccessUser.uid);
        this.axios.patch(url).then(function (response) {
          if (response.data.code == 200) {
            //1.获取返回对象
            that.loginSuccessUser = response.data.data;
            //2.移除原有localStorage
            localStorage.removeItem("www.simoniu.com");
            //3.保存用户资料到localsession
            localStorage.setItem("www.simoniu.com",JSON.stringify(that.loginSuccessUser));
            //4.刷新页面
            location.reload();
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
      },
    }
  }
</script>

<style scoped>
  .personDataBody {
    background-image: url("http://personblog.starstarcheng.cn/image/personalData1.jpg");
    height: 900px;
    background-size:100% 100%;
    background-attachment: fixed;
  }

  .updateinformation {
    background-color: wheat;
    width: 32%;
    display: none;
    position: absolute;
    top: 160px;
    left: 35%;
  }

  .updateUserInformation {
    font-size: 20px;
    margin: 0 0 10px 30px;
  }

  /*头像*/
  .userAvatar{
    width: 32%;
    height: 310px;
    position: absolute;
    top: 180px;
    left: 35%;
    background-color: bisque;
    display: none;
  }

  /*上传头像*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  /*上传头像*/
</style>
