<template>
  <div class="mHomePage">
    <MLogin ref="mlogin"></MLogin>

    <van-row style="margin-bottom: 80px;padding: 10px;">
      <van-col>
        <a href="javascript:history.go(-1)">
          <van-icon name="arrow-left" size="25px" color="white"/>
        </a>
      </van-col>

      <van-col style="color: white;font-size: 20px;" offset="8">
        我的主页
      </van-col>
    </van-row>

    <div style="background-color: gainsboro;position: relative;">

      <div style="background-color: white;padding: 10px;">
        <van-row>
          <van-col span="5">
            <div style="background-color: gainsboro;width:90px;height: 90px;border-radius: 50%;position:relative;top:-30px;text-align: center;">
                <img :src="loginSuccessUser.avatar"
                    style="width:80px;height: 80px;border-radius: 50%;margin-top: 5px;"/>
            </div>
          </van-col>

          <van-col span="3" offset="15">
            <van-button type="default" size="mini" style="border: 1px solid gray;" @click="toPersonalData">编辑</van-button>
          </van-col>
        </van-row>

        <van-row style="font-size: 12px;color: gray;">
          ID：{{loginSuccessUser.uid}}
        </van-row>
        <van-row style="font-size: 20px;">
          {{loginSuccessUser.username}}
        </van-row>

        <van-row style="font-size: 12px;">
          {{loginSuccessUser.introduction}}
        </van-row>

        <van-row style="font-size: 12px;color: gray;">
          关注4 粉丝1 访问79 排名1000
        </van-row>

        <van-row>
          <van-col span="2" style="font-size: 12px;color: gray;background-color: gainsboro;border-radius: 40%;text-align: center;">
            <div v-if="loginSuccessUser.gender==1">
              男
            </div>
            <div v-if="loginSuccessUser.gender==2">
              女
            </div>
          </van-col>
        </van-row>
      </div>

      <div style="margin-top: 10px;">
        <van-cell title="博客" icon="edit" class="row4_col" is-link>{{personBlogArrays.length}}篇</van-cell>
        <van-cell title="论坛" icon="edit" class="row4_col" is-link value="0篇"/>
        <van-cell title="Blink" icon="edit" class="row4_col" is-link value="0篇"/>
        <van-cell title="粉丝趋势" icon="edit" class="row4_col" is-link/>
      </div>

      <div style="margin-top: 10px;">
         <van-row style="font-size: 12px;color: gray;">最新动态</van-row>

        <!--遍历博客文章-->
        <div v-for="(item,index) in personBlogArrays" :key="index" class="rowContent">
          <van-row>
            <van-col span="2">
                <img :src="loginSuccessUser.avatar"
                      style="width:30px;height: 30px;border-radius: 50%;"/>
            </van-col>

            <van-col span="8" style="font-size: 12px;margin-top: 5px;color: gray;">
                {{item.createTime}}
            </van-col>

            <van-col span="8" style="font-size: 12px;margin-top: 5px;color: gray;">
                发布了博客
            </van-col>
          </van-row>

          <van-row>
            <van-col span="24" class="title" @click="othersBlog(item)">
              {{item.title}}
            </van-col>
          </van-row>

          <van-row>
            <van-col span="24" class="mdContent" @click="othersBlog(item)">{{item.mdContent}}</van-col>
          </van-row>

          <van-row class="userInformation" @click="othersBlog(item)">
            <van-col span="4">{{item.users.username}}</van-col>
            <van-col span="2"><van-icon name="good-job-o" />{{item.likeNumber}}</van-col>
            <van-col span="2"><van-icon name="chat-o" />{{item.replyNumber}}</van-col>
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import MLogin from '../commons/MLogin'

  export default {
    name: "Mhomepage",
    components: {
      MLogin
    },
    data() {
      return {
        loginSuccessUser: {}, //登录成功后的用户对象
        personBlogArrays:[],
      }
    },
    mounted() {
      this.loginSuccessUser = this.$refs.mlogin.loginSuccessUser;

      this.findArticle();
    },
    methods: {
      //查询用户文章
      findArticle:function () {
        let url = this.websiteUrl+"/article/?username="+this.loginSuccessUser.username;
        let that = this;
        this.axios.get(url).then(function (response) {
          // console.log(response.data.data);
          if (response.data.code == 200) {
            that.personBlogArrays = response.data.data;
          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: '请求服务器失败！',
            type: 'error'
          });
        })
      },

      //跳转到他人博客页面
      othersBlog:function (article) {
/*        console.log("点击了");
        console.log(this.$refs.mlogin.loginSuccessUser);*/

        /*if(this.$refs.mlogin.loginSuccessUser==""){
          alert("请登录后在操作！");
          return;
        }*/

        //跳转传参
        this.$router.push({
          name: "MArticle",
          query: {
            "bid":article.bid
          }
        });

      },

      //跳转到修改个人资料页面
      toPersonalData:function () {
        //跳转传参
        this.$router.push({
          name: "MPersonalData",
        });
      }

    }

  }
</script>

<style scoped>
  .mHomePage {
    background-color: black;
  }


  .rowContent{
    margin: 5px 0 5px 0;
    background-color: white;
  }

  .title{
    /*设置溢出部分隐藏*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 5px;
  }

  .mdContent{
    /*设置溢出部分隐藏*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: gray;
    margin: 5px;
  }

  .userInformation{
    font-size: 14px;
    color: gray;
    margin: 5px;
  }
</style>
