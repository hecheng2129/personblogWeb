<template>
  <div class="indexBody">
    <!--导航栏-->
    <Header ref="user"></Header>

    <!--主体-->
    <div class="content">
      <!--跑马灯-->
      <div class="trottingHorseLamp">
        <!--for循环中，绑定的key值不能为对象，而是取一个字符串或数值-->
        <el-carousel :interval="3000" type="card" height="200px">
          <el-carousel-item v-for="item in trottingHorseLamp" :key="item.id">
            <h3 class="medium"><img :src="item.src" style="width: 120%;height: 200px;"/></h3>
          </el-carousel-item>
        </el-carousel>
      </div>

      <!--主题内容左侧-->
      <div class="contentLeft">
        <div class="contentLeftOne">
          <el-row>
            <el-col :span="4">
              <p class="el-icon-trophy" style="color: gold;">
                置顶推荐
              </p>
            </el-col>
          </el-row>

          <el-row> <!--注意v-for的位置 放在el-row中按行显示，放在el-col中按列显示-->
            <el-col :span="8" v-for="(item,index) in images" :key="index">
              <img :src="item.src" style="height: 150px;width: 95%;"/>
            </el-col>
          </el-row>
        </div>

        <div class="contentLeftTwo">
          <el-row>
            <el-col :span="4">
              <p class="el-icon-user-solid" style="color: gold;">
                最新用户
              </p>
            </el-col>
          </el-row>

          <ul v-for="item in newuser" :key="item.uid">
            <li style="color: lightblue">
              <img :src="item.avatar" style="height: 50px;width: 50px;border-radius:50%;" align="absmiddle"/>
              {{item.username}}
            </li>
          </ul>
        </div>

        <div class="contentLeftThree">
          <el-row>
            <el-col :span="4">
              <p class="el-icon-magic-stick" style="color: gold;">
                最新文章
              </p>
            </el-col>
          </el-row>

          <el-row v-for="(item,index) in newsPager" :key="index" style="border: 3px solid gold;margin-bottom: 10px;">
            <el-col :span="5" style="height: 130px;">
              <img :src="item.image" @click="othersBlog(item)" style="width: 160px;height: 130px;"/>
            </el-col>

            <el-col :span="18" style="font-size: 25px;color: white">
              <div @click="othersBlog(item)">
                {{item.title}}
              </div>

              <el-row style="font-size: 12px;margin-top: 10px;" @click="othersBlog(item)">
                <el-col :span="8">
                  <img :src="item.users.avatar" style="height: 35px;width: 35px;border-radius:50%;"
                       align="absmiddle"/>

                  {{item.users.username}}
                </el-col>

                <el-col :span="10" style="margin-top: 8px;">
                  {{item.createTime}}
                </el-col>

                <el-col :span="6" style="margin-top: 8px;">
                  <div class="el-icon-thumb">
                    {{item.likeNumber}}
                  </div>

                  <div class="el-icon-chat-line-round">
                    {{item.replyNumber}}
                  </div>

                  <div class="el-icon-view">
                    {{item.readNumber}}
                  </div>
                </el-col>
              </el-row>

              <div class="indexContent" @click="othersBlog(item)">
                {{item.mdContent}}
              </div>
            </el-col>
          </el-row>

        </div>

      </div>

      <!--分页组件开始-->
      <el-row>
        <el-col :span="9" :offset="7">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="pageSize"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :total="news.length">
          </el-pagination>
        </el-col>
      </el-row>
      <!--分页组件结束-->

      <!--主题内容右侧-->
      <div class="contentRight">
        <div class="contentRightOne">

          <el-input
            placeholder="站内搜索"
            suffix-icon="el-icon-search"
            v-model="search" style="margin: 5%;width: 90%;"/>

          <el-row class="el-row" style="color: white;">
            <el-col :span="7" class="el-col">
              {{this.news.length}}<br/>
              &nbsp;文章总数
            </el-col>
            <el-col :span="7" class="el-col">
              15<br/>
              &nbsp;会员总数
            </el-col>
            <el-col :span="7" class="el-col">
              15<br/>
              &nbsp;评论总数
            </el-col>
          </el-row>

          <div style="width: 100%;height: 60px;text-align: center;font-size: 22px;line-height: 60px;color: blue">
            欢迎打赏投稿
          </div>

          <div style="text-align: center">
            <el-button type="success">我要投稿</el-button>

            <el-button type="primary">我要打赏</el-button>
          </div>
        </div>

        <div class="contentRightTwo">
          <div style="font-size: 20px;border-left: 3px solid red;padding-left: 20px;margin: 10px 0 20px 0;">
            热门标签
          </div>
          <!--设置背景颜色为透明-->
          <el-button round size="medium" class="button_label">CPU</el-button>
          <el-button round size="medium" class="button_label">CSS</el-button>
          <el-button round size="medium" class="button_label">Axios</el-button>
          <el-button round size="medium" class="button_label">可能吧</el-button>
          <el-button round size="medium" class="button_label">你懂？</el-button>
          <el-button round size="medium" class="button_label">卧槽！无情</el-button>
        </div>

        <div class="contentRightThree">
          <div style="font-size: 20px;border-left: 3px solid red;padding-left:20px;margin: 10px 10px 20px 0;">
            热门推荐
          </div>

          <div v-for="item in hotTopic" :key="item.id" style="border-bottom: 2px solid gainsboro">
            <p style="height: 30px;color: white;margin-left: 23px;font-size: 16px;">
              {{item.content}}
            </p>

            <p style="font-size: 12px;color: gainsboro;margin-left: 23px;">
              {{item.time}}
            </p>
          </div>

        </div>

        <div class="contentRightFour">
          <div style="font-size: 20px;border-left: 3px solid red;padding-left: 20px;margin: 10px 10px 20px 0;">
            友情链接
          </div>

          <div style="font-size: 16px;color: white;">
            <el-link type="warning"><a href="https://www.jd.com/">京东商城</a></el-link>

            <el-link type="warning"><a href="https://www.taobao.com/">淘宝店铺</a></el-link>
          </div>
        </div>
      </div>
    </div>

    <!--底部-->
    <Foot></Foot>

  </div>
</template>
<!--
需要前端循环图片数组将其放到页面中去。
需要将src渲染到页面中，如果单纯写src的路径会出现不显示图片的问题
因为图片路径在assets，所以需要require一下。
-->

<script>
  import Header from '../commons/Header';
  import Foot from '../commons/Foot';

  export default {
    name: "PIndex",
    components: {
      Header,
      Foot
    },
    data: function () {
      return {
        search: "",
        trottingHorseLamp: [
          {
            id: 0,
            src: "http://personblog.starstarcheng.cn/image/trottingHorseLamp5.jpg"
          }, {
            id: 1,
            src: "http://personblog.starstarcheng.cn/image/trottingHorseLamp6.jpg"
          }, {
            id: 2,
            src: "http://personblog.starstarcheng.cn/image/trottingHorseLamp7.jpg"
          }, {
            id: 3,
            src: "http://personblog.starstarcheng.cn/image/trottingHorseLamp8.jpg"
          }
        ],
        images: [
          {
            id: 0,
            src: "http://personblog.starstarcheng.cn/image/top1.jpg"
          }, {
            id: 1,
            src: "http://personblog.starstarcheng.cn/image/top2.jpg"
          }, {
            id: 2,
            src: "http://personblog.starstarcheng.cn/image/top3.jpg"
          }
        ],
        newuser: [],
        news: [],
        pageSize: 4,
        currentPage: 1,
        hotTopic: [
          {
            id: 0,
            content: "利用jquery生成二维码和logo居中的图片",
            time: "2019-12-6 20:30:50"
          }, {
            id: 1,
            content: "利用jquery生成二维码和logo居中的图片",
            time: "2019-12-6 20:30:50"
          }, {
            id: 2,
            content: "利用jquery生成二维码和logo居中的图片",
            time: "2019-12-6 20:30:50"
          },
        ]
      }
    },
    mounted() {
      this.initNews();

      this.findAllUsers();
    },
    computed: {
      newsPager: function () {
        return this.news.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      }
    },
    methods: {
      initNews: function () {
        let url = this.websiteUrl + "/article/allArticle";
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            // console.log(response.data.data);
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

      // 初始页currentPage、初始每页数据数pagesize和数据data
      handleSizeChange: function (size) {
        this.pageSize = size;
        // console.log(this.pageSize);  //每页下拉显示数据
      },
      handleCurrentChange: function (currentPage) {
        this.currentPage = currentPage;
        // console.log(this.currentPage);  //点击第几页
      },

      //跳转到他人博客页面
      othersBlog: function (article) {
        console.log(this.$refs.user.loginSuccessUser);

        if (this.$refs.user.loginSuccessUser == "") {
          alert("请登录后在操作！");
          return;
        }

        //跳转传参
        this.$router.push({
          name: "POthersBlog1",
          query: {
            "bid": article.bid
          }
        });

      },


      //查询所有用户
      findAllUsers: function () {
        let url = this.websiteUrl + "/users/getAllUsers";
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.newuser = response.data.data;
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
      }

    }
  }
</script>

<style scoped>
  .indexBody {
    background-image: url("http://personblog.starstarcheng.cn/image/index5.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;
  }

  /*全局*/
  p {
    color: white;
    font-size: 20px;
  }

  li {
    list-style: none;
    float: left;
    margin-right: 20px;
  }

  /*全局*/

  /*主体*/
  .content {
    margin: 0 auto;
    width: 80%;
    height: 1320px;
  }

  /*走马灯*/
  .el-carousel__item h3 {
    color: white;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  /*走马灯*/

  /*主题左侧*/
  .contentLeft {
    width: 65%;
    height: 1050px;
  }

  .contentLeftOne {
  }

  .contentLeftTwo {
    clear: both;
  }

  .contentLeftThree {
    clear: both;
  }

  .contentLeftThree el-row span ul li {
    float: left;
    width: 100%;
    height: 150px;
    border: 3px solid gold;
  }

  .indexContent {
    font-size: 12px;
    /*设置溢出部分隐藏*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-top: 15px;
  }

  /*分页*/

  /*主体左侧*/

  /*主体右侧*/
  .contentRight {
    width: 20%;
    height: 950px;
    position: absolute;
    right: 10%;
    top: 370px;
  }

  .contentRightOne {
    width: 100%;
    height: 300px;
    border: 3px solid gold;
    margin-bottom: 10px;
  }

  .contentRightOne .el-row {
    display: flex;
    justify-content: space-around;
  }

  .contentRightOne .el-col {
    width: 100px;
    height: 120px;
    border: 1px solid gainsboro;
    text-align: center;
    display: flex;
    align-items: center;
    font-size: 22px;
  }

  .contentRightTwo {
    width: 100%;
    height: 180px;
    margin-bottom: 10px;
    border: 3px solid gold;
    color: gold;
  }

  .contentRightThree {
    width: 100%;
    height: 320px;
    border: 3px solid gold;
    margin-bottom: 10px;
    color: gold;
  }

  .contentRightFour {
    width: 100%;
    height: 100px;
    border: 3px solid gold;
    color: gold;
  }

  .button_label {
    color: white;
    background-color: transparent; /*设置图片透明*/
  }

  /*主体右侧*/

  /*主体*/

</style>
