<template>
  <div class="mPersonalData">
    <MLogin ref="mlogin"></MLogin>

    <van-row style="padding: 10px;background-color: white;">
      <van-col>
        <a href="javascript:history.go(-1)">
          <van-icon name="arrow-left" size="25px" color="black"/>
        </a>
      </van-col>

      <van-col style="font-size: 20px;" offset="6">
        编辑个人资料
      </van-col>
    </van-row>

    <van-row style="background-color: white;">
      <van-col offset="8">
        <img :src="loginSuccessUser.avatar"
             style="width:120px;height: 120px;border-radius: 50%;"/>

        <!--<div style="background-color: gainsboro;color: white;width: 120px;height: 40px;border-bottom-left-radius: 100%;border-bottom-right-radius: 100%;
                text-align:center;line-height:40px;position: absolute;top: 130px; z-index: 100;opacity: 0.6;">
          更改
        </div>-->
      </van-col>
    </van-row>

    <van-row>
      <van-col span="24">
        <van-cell title="昵称" is-link :value="loginSuccessUser.username" @click="toUpdateUsername"/>
      </van-col>

      <van-col span="24" @click="toShowGenderPopup">
        <div v-if="loginSuccessUser.gender==1">
          <van-cell title="性别" is-link value="男"/>
        </div>

        <div v-if="loginSuccessUser.gender==2">
          <van-cell title="性别" is-link value="女"/>
        </div>
      </van-col>

      <van-col span="24">
        <van-cell title="生日" is-link :value="loginSuccessUser.birthday" @click="showDataPopup"/>
      </van-col>

      <van-col span="24">
        <van-cell title="地区" is-link :value="loginSuccessUser.region" @click="showRegionPopup"/>
      </van-col>

      <van-col span="24" class="mdContent">
        <van-cell title="简介" is-link :value="loginSuccessUser.introduction" @click="toUpdateIntroduction"/>
      </van-col>
    </van-row>

    <!--性别弹出层-->
    <van-popup v-model="showGender" position="bottom" :style="{ height: '17%'}">
        <div>
            <van-row style="margin-top: 10px;">
              <van-col offset="11" @click="updateGender(1)">男</van-col>
            </van-row>
            <van-row style="margin-top: 10px;">
              <van-col offset="11" @click="updateGender(2)">女</van-col>
            </van-row>
            <van-row style="margin-top: 10px;">
              <van-col offset="10" span="3" @click="updateGender(3)" style="text-align: center;">取消</van-col>
            </van-row>
        </div>
    </van-popup>

    <!--Popup 生日弹出层-->
    <van-popup v-model="showData" :style="{ height: '50%',width:'80%' }">
        <!--修改生日-->
        <div id="birthday" class="birthday">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :default-date="default_date"
            @confirm="confirmData"
            @cancel="cancelData"
          />
        </div>
    </van-popup>

    <!--Popup 地区弹出层-->
    <van-popup v-model="showRegion" position="bottom" :style="{ height: '45%'}">
      <!--修改地区-->
      <div>
        <van-area
          :area-list="areaList"
          :columns-num="3"
          @confirm="confirmRegion"
          @cancel="cancelRegion"
        />
      </div>
    </van-popup>
  </div>
</template>

<script>
  import MLogin from '../commons/MLogin';
  import areaList from '../../assets/js/commons/area.js'

  export default {
    name: "MPersonalData",
    components: {
      MLogin
    },
    data() {
      return {
        loginSuccessUser: {}, //登录成功后的用户对象

        showData: false,
        showRegion:false,
        showGender:false,
        currentDate:'',
        default_date:new Date(2000,1,1),
        minDate: new Date(1970),
        maxDate: new Date(),

        areaList,
      }
    },
    mounted() {
      this.loginSuccessUser = this.$refs.mlogin.loginSuccessUser;
    },
    methods: {
      /**
       * 修改姓名
       */
      toUpdateUsername:function () {
        //跳转传参
        this.$router.push({
          name: "MUpdateUsername",
        });
      },

      /*修改简介*/
      toUpdateIntroduction:function(){
        //跳转传参
        this.$router.push({
          name: "MUpdateIntroduction",
        });
      },

      //性别弹出
      toShowGenderPopup:function(){
        this.showGender = true;
      },

      /**
       * 修改性别
       * @param gender
       */
      updateGender:function (gender) {
        this.showGender = false;

        if(gender!=1 && gender!=2){
          return;
        }

        let url = this.websiteUrl + "/users/updateGender?uid="+this.loginSuccessUser.uid+"&gender="+gender;
            let that = this;
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

      /*修改生日*/
      confirmData:function () {
        // console.log(this.currentDate);
        //转换格式
        var date = this.currentDate;
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }

        /*this.currentdate =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate;*/
        date =
          date.getFullYear() +
          seperator1 +
          month +
          seperator1 +
          strDate;

        // console.log(this.currentdate);
        this.showData=false;

        //发送请求
        let url = this.websiteUrl + "/users/updateBirthday?uid="+this.loginSuccessUser.uid+"&birthday="+date;
        let that = this;
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

      /**
       * 取消生日
       */
      cancelData:function () {
        this.showData=false;
      },
      //生日弹出
      showDataPopup() {
        this.showData = true;
      },

      //地区弹出
      showRegionPopup() {
        this.showRegion = true;
      },

      /**
       * 取消地区
       */
      cancelRegion:function () {
        this.showRegion=false;
      },

      /*修改地区*/
      confirmRegion:function (value) {
        this.showRegion=false;
        // console.log(value);
        var region = value[0].name +" "+ value[1].name +" "+value[2].name;

        //发送请求
        let url = this.websiteUrl + "/users/updateRegion?uid="+this.loginSuccessUser.uid+"&region="+region;
        let that = this;
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
  .mPersonalData {
    background-color: gainsboro;
  }

  .mdContent{
    /*设置溢出部分隐藏*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .birthday{
    width: 100%;
    height: 150px;
  }
</style>
