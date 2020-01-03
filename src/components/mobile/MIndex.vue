<template>
    <div class="mIndex">

      <van-tabs v-model="active" @click="onClick">
        <!--轮播图-->
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(item,index) in lunbo" :key="index">
            <img :src="item.src" style="height: 100px;width: 100%;">
          </van-swipe-item>
        </van-swipe>

        <van-tab title="推荐">
          <van-notice-bar
            text="通知内容通知内容通知内容通知内容通知内容通知内容通知内容"
            left-icon="volume-o"
          />

          <!--遍历博客文章-->
          <div v-for="(item,index) in news" :key="index" class="rowContent">
            <van-row>
              <van-col span="24" class="title" @click="othersBlog(item)">{{item.title}}</van-col>
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
        </van-tab>
        <van-tab title="动态">暂未实现</van-tab>
        <van-tab title="未知世界">
          暂未实现
        </van-tab>
        <van-tab title="程序人生">暂未实现</van-tab>
      </van-tabs>

      <MFoot></MFoot>

      <MLogin ref="mlogin"></MLogin>
    </div>
</template>

<script>
    import MFoot from '../commons/MFoot';
    import MLogin from '../commons/MLogin'

    export default {
        name: "MIndex",
        components:{
          MFoot,
          MLogin
        },
        data(){
          return{
            value:'',
            active: 0,
            lunbo:[
              {
                id:0,
                src:'http://personblog.starstarcheng.cn/image/trottingHorseLamp3.jpg'
              },{
                id:1,
                src:'http://personblog.starstarcheng.cn/image/trottingHorseLamp7.jpg'
              },{
                id:2,
                src:'http://personblog.starstarcheng.cn/image/trottingHorseLamp5.jpg'
              },
            ],
            news:[],
            loginSuccessUser:''
          }
        },
        mounted(){
          this.initNews();

          this.loginSuccessUser=this.$refs.mlogin.loginSuccessUser;

        },
        methods:{

          //初始化 推荐界面
          initNews: function () {
            let url = this.websiteUrl + "/article/allArticle";
            let that = this;
            this.axios.get(url).then(function (response) {
              if (response.data.code == 200) {
                that.news = response.data.data;
              } else {
                that.$message({
                  message: response.data.msg,
                  type: 'error'
                });
              }
            }).catch(function (error) {
              that.$message({
                message: '请求文章失败！',
                type: 'error'
              });
            })

          },

          /*导航栏单击事件*/
          onClick(index, title) {
            if(index==1){
              console.log(1);
            }
          },

          //跳转到他人博客页面
          othersBlog:function (article) {

            if(this.$refs.mlogin.loginSuccessUser==""){
              alert("请登录后在操作！");
              return;
            }

            //跳转传参
            this.$router.push({
              name: "MArticle",
              query: {
                "bid":article.bid
              }
            });

          },

        }
    }
</script>

<style scoped>
    .mIndex{
      background-color: gainsboro;
    }

    .rowContent{
      margin: 5px 0 5px 0;
      background-color: white;
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

    .rowContent{
      margin: 5px 0 5px 0;
      background-color: white;
    }

    .userInformation{
      font-size: 14px;
      color: gray;
      margin: 5px;
    }
</style>
