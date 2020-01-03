<template>
  <div>
    <!--导航栏-->
    <Header ref="user"></Header>

    <div class="POthersBody">

      <el-row>
        <!--左侧作者信息-->
        <el-col :span="6">
          <div style="width: 100%;height: 800px;">
            <el-row class="leftEl_row" style="margin-top: 0;">
              <!--作者头像-->
              <el-col :span="6">
                <img :src="article.users.avatar" style="width: 50px;height: 50px;border-radius:50%;"/>
              </el-col>

              <!--用户名字-->
              <el-col :span="14">
                <el-row>
                  {{article.users.username}}
                </el-row>
                <el-row style="font-size: 12px;margin-top: 10px;">
                  <a href="#">他的个人主页<i class="el-icon-arrow-right"></i></a>
                </el-row>
              </el-col>
            </el-row>

            <!--发表的文章列表-->
            <el-row class="leftEl_row">
              <div style="border-left: 3px solid red;padding-left: 10px;height: 30px;line-height: 30px;">最新文章</div>

              <!--遍历用户发表的文章标题-->
              <el-row v-for="(item,index) in userArticeList" :key="index">
                {{item.title}}
              </el-row>
            </el-row>

          </div>
        </el-col>

        <!--中间的内容-->
        <el-col :span="18">
          <!--主题-->
          <el-row>
            <el-col class="title">
              {{article.title}}
            </el-col>
          </el-row>

          <!--内容-->
          <el-row style="margin-bottom: 50px;border: 1px solid gray;">
            <el-col>
              <div v-html="article.htmlContent">

              </div>
            </el-col>
          </el-row>

          <!--评论列表-->
          <div style="border: 1px solid gray;padding: 10px 0 10px 10px;font-size: 12px;">
            <el-row v-for="(item,index) in comments" :key="index">
              <!--人对文章-->
              <el-row>
                <el-col :span="1">
                  <img :src="item.users.avatar" style="width: 20px;height: 20px;border-radius: 50%;"/>
                </el-col>
                <el-col :span="3">
                  {{item.users.username}}
                </el-col>
                <el-col :span="3">
                  {{item.createTime}}
                </el-col>

                <el-col :span="2" :offset="12">
                  <el-button type="text" size="mini" @click="showReply(index)">{{reply[index]}}(2)</el-button>
                </el-col>

                <el-col :span="1">
                  <el-button type="text" size="mini" @click="replyUser(item.users.uid)">回复</el-button>
                </el-col>
              </el-row>
              <!--评论-->
              <el-row style="border-bottom: 1px silver solid;">
                <el-col :offset="1">
                  <div v-html="item.htmlContent">

                  </div>
                </el-col>
              </el-row>

              <!--人对人的评论-->
              <el-row :id="index" v-for="(item1,index1) in replyMessage" :key="index1"
                      style="border-bottom: 1px silver solid;display: none;">   <!--遍历，当下标等于评论楼层时显示-->
                <el-col :offset="2" v-if="item1.floor==index" style="border-left: 2px solid gray;padding-left: 10px;">
                  <!--回复对象-->
                  <el-row>
                    <el-col :span="1">
                      <img :src="item1.users.avatar" style="width: 20px;height: 20px;border-radius: 50%;"/>
                    </el-col>
                    <el-col :span="1" style="font-size: 12px;">
                      {{item1.users.username}}
                    </el-col>
                    <el-col :span="1" style="font-size: 12px;">
                      回复
                    </el-col>
                    <el-col :span="1" style="font-size: 12px;">
                      {{item1.users1.username}}
                    </el-col>
                  </el-row>

                  <!--回复内容-->
                  <el-row>
                    <el-col>{{item.htmlContent}}</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-row>
          </div>

          <!--登录用户发表评论-->
          <el-row>
            <el-col>
              <!--wangEditor编辑器-->
              <WangEditor ref="wangEditor"></WangEditor>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="3" :offset="21">
              <el-button type="success" round @click="postComment">发布评论</el-button>
            </el-col>
          </el-row>
        </el-col>

      </el-row>


    </div>
  </div>
</template>

<script>
  import Header from '../commons/Header';
  import WangEditor from '../commons/WangEditor';
  import Cookies from 'js-cookie';
  import index from "../../router";

  export default {
    name: "POthersBlog",
    data() {
      return {
        bid: '',
        article: '',
        userArticeList: [],
        comments: [],
        reply: [],
        replyMessage: []     //人和人对话的信息
      }
    },
    components: {
      Header,
      WangEditor
    },
    created() {

    },
    mounted() {
      this.init();
    },
    methods: {

      /*接收页面传递过来的编号，并初始化文章*/
      init: function () {
        this.bid = this.$route.query.bid;

        let url = this.websiteUrl + "/article/findArticle?bid=" + this.bid;
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.article = response.data.data;
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
        });

        this.findComments();

        this.findArticle();
      },

      //查询所有评论
      findComments: function () {
        // console.log(this.article.bid);
        let url = this.websiteUrl + "/postComment/findAllComments?bid=" + this.bid;
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.comments = response.data.data;
            // console.log(that.comments);

            for (var i = 0; i < that.comments.length; i++) {
              that.reply[i] = "查看回复";
            }

          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: '请求评论失败！',
            type: 'error'
          });
        })

      },

      /*获取当前用户的所有文章*/
      //查询用户文章
      findArticle: function () {
        let url = this.websiteUrl + "/article/findAllUserArticleByBid?bid=" + this.bid;
        let that = this;
        this.axios.get(url).then(function (response) {
          // console.log(response.data.data);
          if (response.data.code == 200) {
            that.userArticeList = response.data.data;
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

      //初始化reply
      initReply: function () {
        //不能放在mounted里，方法不能使用？
        for (var i = 0; i < this.comments.length; i++) {
          this.reply[i] = "查看回复";
        }
      },

      //人对文章发布评论
      postComment: function () {     /*需要等待时间*/
        //1.获取当前文章的编号
        // console.log(this.article.bid);
        //2.获取评论的用户
        // console.log(this.$refs.user.loginSuccessUser.uid);
        //3.获取评论内容
        console.log(this.$refs.wangEditor.htmlContent);

        let url = this.websiteUrl + "/postComment/save";
        let that = this;
        this.axios.post(url, that.$qs.stringify({
          'bid': that.article.bid,
          'uid': that.$refs.user.loginSuccessUser.uid,
          'htmlContent': that.$refs.wangEditor.htmlContent
        })).then(function (response) {
          if (response.data.code == 200) {
            // console.log("返回数据：");
            // console.log(response.data.data);
            that.comments = response.data.data;

            // that.initReply();
            for (var i = 0; i < that.comments.length; i++) {
              that.reply[i] = "查看回复";
            }

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

      //人对人发布评论(传入要对用户发表评论的id)
      replyUser: function (uid) {
        console.log("要对用户发表建议");
        console.log(uid);



      },

      /**
       * 人与人的对话
       */
      showReply:function(index){

        if (this.reply[index] == "查看回复") {
          this.reply[index] = "关闭回复";
          $("#" + index).show();
        } else {
          this.reply[index] = "查看回复";
          $("#" + index).hide();
        }

        let url = this.websiteUrl + "/interpersonal/findAll";
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.replyMessage = response.data.data;
            console.log(that.replyMessage);

          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: '请求评论失败！',
            type: 'error'
          });
        })
      },

    }

  }
</script>

<style scoped>
  .POthersBody {
    margin: 0 auto;
    width: 80%;
  }

  .title {
    font-size: 25px;
    text-align: center;
    height: 40px;
    border-top: 2px solid gainsboro;
    border-bottom: 2px solid gainsboro;
    line-height: 36px;
  }

  .leftEl_row {
    margin: 10px;
    height: 200px;
    border: 3px solid gainsboro;
  }
</style>
