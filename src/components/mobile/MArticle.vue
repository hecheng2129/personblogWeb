<template>
    <div class="marticle">
      <!--返回上一步-->
      <div style="background-color: white;width: 100%;">
        <van-row class="MyRow">
            <a href="javascript:history.go(-1)">
              <van-icon name="arrow-left" size="25px"/>
            </a>
        </van-row>

        <van-row style="font-size: 25px;" class="MyRow">
          {{article.title}}
        </van-row>

        <van-row style="font-size: 12px;color: gray;" class="MyRow">
          {{article.createTime}}
        </van-row>

        <van-row style="font-size: 16px;" class="MyRow">
          <van-col span="8">
            <img :src="article.users.avatar" style="width: 30px;height: 30px;border-radius:50%;" align="absmiddle"/>
            {{article.users.username}}
          </van-col>

          <van-col span="8" offset="8">
            <van-button style="border: 1px solid gray;font-size: 14px;" size="mini">私信</van-button>
            <van-button style="border: 1px solid red;font-size: 14px;" size="mini">关注</van-button>
          </van-col>
        </van-row>


        <van-row class="MyRow">
            <div v-html="article.htmlContent" v-highlight>

            </div>
        </van-row>
      </div>
      <!--评论-->
      <div style="margin-top: 5px;width: 100%;">
        <van-row v-for="(item,index) in comments" :key="index" style="background-color: white;padding: 5px;margin-top: 2px;">
          <!--人对文章-->
          <van-row>
            <van-col span="2">
              <img :src="item.users.avatar" style="width: 15px;height: 15px;border-radius: 50%;"/>
            </van-col>

            <van-col span="3" style="font-size: 12px;">
              {{item.users.username}}
            </van-col>

            <van-col span="8" style="font-size: 12px;" class="MyCol">
              {{item.createTime}}
            </van-col>

            <van-col span="4" offset="3">
              <van-button style="font-size: 12px;" size="mini" @click="showReply(index)">{{reply[index]}}</van-button>
            </van-col>

            <van-col span="4">
              <van-button style="font-size: 12px;" size="mini" @click="replyUser(item.users.uid,index)">回复</van-button>
            </van-col>
          </van-row>
          <!--评论列表-->
          <van-row>
            <van-col style="font-size: 12px;">
              <div v-html="item.htmlContent" v-highlight>

              </div>
            </van-col>
          </van-row>

          <!--人对人的评论-->
          <div :id="index" v-if="replyMessage!=''">
            <!--遍历当前楼层的对话--> <!--当存入的楼层与遍历的下标一致时输出-->
            <van-row v-for="(item1,index1) in replyMessage" :key="index1" >
                <van-col v-if="item1.floor==index" :offset="1" :span="23" style="padding:5px 0 0 0;border-bottom: 1px silver dotted;">
                  <!--回复对象-->
                  <van-row>
                    <van-col span="1">
                      <img :src="item1.users1.avatar" style="width: 15px;height: 15px;border-radius: 50%;"/>
                    </van-col>
                    <van-col span="4" style="font-size: 12px;">
                      {{item1.users1.username}}
                    </van-col>
                    <van-col span="3" style="font-size: 12px;">
                      回复
                    </van-col>
                    <van-col span="4" style="font-size: 12px;">
                      {{item1.users2.username}}
                    </van-col>
                    <van-col span="8" style="font-size: 12px;">
                      {{item1.createTime}}
                    </van-col>

                    <van-col span="2" offset="1" style="font-size: 12px;">
                      <van-button style="font-size: 12px;" size="mini" @click="replyUser(item1.users1.uid,index)">回复</van-button>
                    </van-col>
                  </van-row>

                  <van-row>
                    <van-col span="24" style="font-size: 12px;">
                      <div v-html="item1.htmlContent">

                      </div>
                    </van-col>
                  </van-row>
                </van-col>
            </van-row>
          </div>
        </van-row>


      </div>

    </div>
</template>

<script>
    export default {
        name: "MArticle",
      data(){
        return{
          bid:'',
          article:'',
          comments: [],
          reply: [],
          replyMessage: []     //人和人对话的信息
        }
      },
      mounted() {
        this.init();

        this.findComments();
      },
      methods:{
        /*接收页面传递过来的编号，并初始化文章*/
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

              if(that.replyMessage!=""){
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
      }
    }
</script>

<style scoped>
    .marticle{
      background-color: gray;
    }

    .MyRow{
      background-color: white;
      margin-top: 10px;
      padding: 5px;
    }

    .MyCol{
      margin-top: 3px;
    }
</style>
