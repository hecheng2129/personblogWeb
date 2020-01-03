<template>
  <div class="POthersBody">
    <!--导航栏-->
    <Header ref="user"></Header>

    <div class="POthersContent">

      <el-row>
        <!--左侧作者信息-->
        <el-col :span="6">
          <div style="width: 100%;height: 800px;">
            <el-row class="leftEl_row" style="height: 300px;">
              <!--作者头像-->
              <el-col :span="6">
                <img :src="article.users.avatar" style="width: 50px;height: 50px;border-radius:50%;"/>
              </el-col>

              <!--用户名字-->
              <el-col :span="14">
                <el-row style="color: gold;">
                  {{article.users.username}}
                </el-row>
                <el-row style="font-size: 12px;margin-top: 10px;">
                  <a href="#">他的个人主页<i class="el-icon-arrow-right"></i></a>
                </el-row>

                <el-row style="margin: 20px 0 10px 0;color: gold;">
                      性别：
                      <span v-if="article.users.gender == 1">
                          男
                      </span>

                      <span v-if="article.users.gender == 2">
                          女
                      </span>
                </el-row>

                <el-row style="margin-bottom: 10px;color: gold;">
                  生日：{{article.users.birthday}}
                </el-row>
                <el-row style="margin-bottom: 10px;color: gold;">
                  地区：{{article.users.region}}
                </el-row>
                <el-row style="margin-bottom: 10px;color: gold;">
                  行业：{{article.users.profession}}
                </el-row>
                <el-row style="margin-bottom: 10px;color: gold;">
                  简介：{{article.users.introduction}}
                </el-row>

              </el-col>
            </el-row>

            <!--发表的文章列表-->
            <el-row class="leftEl_row">
              <div style="border-left: 3px solid red;padding-left: 10px;height: 30px;line-height: 30px;color:gold;">
                最新文章
              </div>

              <!--遍历用户发表的文章标题-->
              <el-row v-for="(item,index) in userArticeList" :key="index" style="color: white;">
                <div @click="toOtherBlog(item.bid)">
                  {{item.title}}
                </div>
              </el-row>
            </el-row>

            <!--页面操作指南-->
            <el-row class="instructions leftEl_row">
              <el-col>操作指南</el-col>
              <el-col style="font-size: 16px;color: lightblue;">
                ①如果想对文章发表评论，请在输入框中书写好想要发布的评论，点击下方"发布评论"按钮，即可发表
                <br/>
                ②如果相对某个用户发表评论，请在输入框中书写好想要发布的回复，点击对应用户的"回复"，即可发表
                <br/>
                ③在发表评论前，先点击一下编辑器，再点击发布评论或回复，以防信息不能更新！
              </el-col>
            </el-row>

          </div>
        </el-col>

        <!--中间的内容-->
        <el-col :span="18">
          <div style="border: 3px solid gray;">
            <!--主题-->
            <el-row>
              <el-col class="title">
                {{article.title}}
              </el-col>
            </el-row>

            <!--内容-->
            <el-row style="margin-bottom: 50px;color: white;padding: 15px;">
              <el-col>
                <div v-html="article.htmlContent" v-highlight>

                </div>
              </el-col>
            </el-row>
          </div>
          <!--评论列表-->
          <div style="border: 3px solid gray;padding:10px;margin-top:20px;font-size: 12px;color: gold;">
            <el-row v-for="(item,index) in comments" :key="index">
              <!--人对文章-->
              <el-row style="padding: 5px;">
                <el-col :span="1">
                  <img :src="item.users.avatar" style="width: 25px;height: 25px;border-radius: 50%;"/>
                </el-col>
                <el-col :span="3">
                  {{item.users.username}}
                </el-col>
                <el-col :span="4">
                  {{item.createTime}}
                </el-col>

                <el-col :span="2" :offset="12">
                  <el-button type="text" size="mini" @click="showReply(index)">{{reply[index]}}</el-button>
                </el-col>

                <el-col :span="1">
                  <el-button type="text" size="mini" @click="replyUser(item.users.uid,index)">回复</el-button>
                </el-col>
              </el-row>

              <!--评论-->
              <el-row style="border-bottom: 1px silver solid;color: white;">
                <el-col :offset="1" :span="23">
                  <div v-html="item.htmlContent" v-highlight>

                  </div>
                </el-col>
              </el-row>

              <!--人对人的评论-->
              <div :id="index" v-if="replyMessage!=''">
                <!--遍历当前楼层的对话--> <!--当存入的楼层与遍历的下标一致时输出-->
                <el-row v-for="(item1,index1) in replyMessage" :key="index1">
                  <el-col :offset="1" :span="23" v-if="item1.floor==index"
                          style="padding:5px 5px 0 0;border-bottom: 1px silver dotted;">
                    <!--回复对象-->
                    <el-row>
                      <el-col :span="1">
                        <img :src="item1.users1.avatar" style="width: 25px;height: 25px;border-radius: 50%;"/>
                      </el-col>
                      <el-col :span="2" style="font-size: 12px;">
                        {{item1.users1.username}}
                      </el-col>
                      <el-col :span="1" style="font-size: 12px;">
                        回复
                      </el-col>
                      <el-col :span="2" style="font-size: 12px;">
                        {{item1.users2.username}}
                      </el-col>

                      <el-col :span="4" style="font-size: 12px;">
                        {{item1.createTime}}
                      </el-col>

                      <!--回复-->
                      <el-col :span="1" :offset="10">
                        <el-button type="text" size="mini" @click="replyUser(item1.users1.uid,index)">回复</el-button>
                      </el-col>
                    </el-row>

                    <!--回复内容-->
                    <el-row>
                      <el-col :offset="1" style="color:white;">
                        <div v-html="item1.htmlContent">

                        </div>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
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

    <!--点赞-->
    <div class="likeNumber">
      <el-button type="warning" icon="el-icon-thumb" circle @click="likeNumber">{{article.likeNumber}}</el-button>
    </div>
  </div>
</template>

<script>
  import Header from '../commons/Header';
  import WangEditor from '../commons/WangEditor';
  import Cookies from 'js-cookie';
  import index from "../../router";

  export default {
    name: "POthersBlog1",
    data() {
      return {
        bid: '',
        article: {},
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

      this.findComments();

      this.findArticle();
    },
    methods: {

      /*接收页面传递过来的编号，并初始化文章*/   /*研究async,await*/
      init() {
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
        /*判断用户是否输入值*/
        /*        console.log("htmlContent");
                console.log(this.$refs.wangEditor.htmlContent);*/
        if (this.$refs.wangEditor.htmlContent == "<p><br></p>" || this.$refs.wangEditor.htmlContent == "") {
          alert("请输入要回复的信息！（若已输入请点击下输入框）");
          return;
        }

        //1.获取当前文章的编号
        // console.log(this.article.bid);
        //2.获取评论的用户
        // console.log(this.$refs.user.loginSuccessUser.uid);
        //3.获取评论内容
        // console.log(this.$refs.wangEditor.htmlContent);

        let url = this.websiteUrl + "/postComment/save";
        let that = this;
        this.axios.post(url, that.$qs.stringify({
          'bid': that.article.bid,
          'uid': that.$refs.user.loginSuccessUser.uid,
          'htmlContent': that.$refs.wangEditor.htmlContent
        })).then(function (response) {
          if (response.data.code == 200) {
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

      //人对人发布评论(传入要对用户发表评论的id和楼层)
      replyUser: function (uid, floor) {
        /*判断用户是否输入值*/
        if (this.$refs.wangEditor.htmlContent == "<p><br></p>" || this.$refs.wangEditor.htmlContent == "") {
          alert("请输入要回复的信息！（若已输入请点击下输入框）");
          return;
        }

        let url = this.websiteUrl + "/interpersonal/save";
        let that = this;
        this.axios.post(url, that.$qs.stringify({
          'bid': that.article.bid,
          'floor': floor,
          'users1id': that.$refs.user.loginSuccessUser.uid,
          'users2id': uid,
          'htmlContent': that.$refs.wangEditor.htmlContent
        })).then(function (response) {
          if (response.data.code == 200) {

            that.replyMessage = response.data.data;

            that.reply[floor] = "关闭回复";

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

      //人与人的对话 查找评论
      showReply: function (index) {

        if (this.reply[index] == "关闭回复") {
          // this.reply[index] = "查看回复";    没有刷新页面
          this.$set(this.reply, index, "查看回复");
          $("#" + index).hide();
          return;
        }

        let url = this.websiteUrl + "/interpersonal/findByFloorAndBid";
        let that = this;
        this.axios.get(url, {
          params: {
            floor: index,
            bid: this.bid
          }
        }).then(function (response) {
          if (response.data.code == 200) {
            that.replyMessage = response.data.data;

            if (that.replyMessage != "") {
              $("#" + index).show();
              that.reply[index] = "关闭回复";
            }

          } else {
            that.$message({
              message: response.data.msg,
              type: 'error'
            });
          }
        }).catch(function (error) {
          that.$message({
            message: '请求人对人的评论失败！',
            type: 'error'
          });
        })

      },


      //点赞
      likeNumber: function () {
        let url = this.websiteUrl + "/article/updateLikeNumber?bid=" + this.article.bid;
        let that = this;
        this.axios.patch(url).then(function (response) {
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
            message: '点赞失败！',
            type: 'error'
          });
        })
      },

      //跳转文章
      toOtherBlog: function (bid) {
        // console.log(bid);
        this.bid = bid;
        let url = this.websiteUrl + "/article/findArticle?bid=" + this.bid;
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.article = response.data.data;
            that.findComments();
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
      }

    }

  }
</script>

<style scoped>
  .POthersBody {
    background-image: url("http://personblog.starstarcheng.cn/image/pothersblogBg.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;
  }

  .POthersContent {
    margin: 0 auto;
    width: 80%;
  }

  .title {
    font-size: 25px;
    text-align: center;
    height: 60px;
    border-bottom: 2px dotted lightblue;
    line-height: 56px;
    margin-bottom: 10px;
    color: gold;
  }

  .leftEl_row {
    margin: 0px 10px 10px 10px;
    border: 3px solid gainsboro;
    padding: 10px;
  }

  .instructions {
    font-size: 20px;
    color: gold;
    text-align: center;
  }

  /*点赞*/
  .likeNumber {
    position: fixed;
    top: 100px;
    right: 5%;
  }
</style>
