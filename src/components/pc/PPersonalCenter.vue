<template>
  <div class="personalCenter">
    <!--导航栏-->
    <Header></Header>

    <!--主体-->
    <div class="personalCenterBody">
      <!--左侧部分-->
      <div class="left">
        <el-row class="left1">
          <!--头像-->
          <el-col :span="4">
            <el-row>
              <img :src="loginSuccessUser.avatar" class="avatar"/>
            </el-row>
            <el-row>
              <a href="#" style="margin-left: 20px">隐私设置</a>
            </el-row>
          </el-col>

          <!--个人信息-->
          <el-col :span="12">
            <el-row style="margin: 10px;">
              <el-col :span="3"><img :src="loginSuccessUser.avatar" class="grade"/></el-col>
              <el-col :span="6" style="font-size: 30px;color: white;">{{loginSuccessUser.username}}</el-col>
            </el-row>

            <el-row>
              <el-col :span="1" class="el-icon-school"></el-col>
              <el-col :span="10" style="font-size: 16px;color: grey">河北工程大学 | 物联网</el-col>
              <!--<el-col :span="2"><img src="../../assets/images/bg1.jpg" class="identification"/></el-col>-->
            </el-row>

            <el-row>
              <el-col :span="1" class="el-icon-school"></el-col>
              <el-col :span="6" style="font-size: 16px;color: grey">暂无相关介绍</el-col>
              <el-col :span="6" style="font-size: 16px;color: lightblue">去添加</el-col>
            </el-row>
          </el-col>
        </el-row>

        <!--博客等等列表-->
        <el-row class="left2">
          <el-row style="border-bottom: 3px gainsboro solid;color: white;">
            <el-col :span="2" class="left2_el_col">博客</el-col>
            <el-col :span="2" class="left2_el_col">资源</el-col>
            <el-col :span="2" class="left2_el_col">论坛</el-col>
          </el-row>

          <el-row style="border-bottom: 3px solid gainsboro;color: white;">
            <el-col :span="2" class="left2_el_col2">等级</el-col>
            <el-col :span="2" class="left2_el_col2" style="color: lightblue">Ta的博文</el-col>
            <el-col :span="2" class="left2_el_col2">Ta的排名</el-col>
          </el-row>

          <!--博文列表-->
          <el-row v-for="(item,index) in newsPager" :key="index" style="margin: 20px;">
            <el-col style="border-bottom: 1px solid gainsboro;color: white;">
              <div  @click="toOtherBlog(item.bid)">
                <el-row style="font-size: 20px;margin-bottom: 10px;">{{item.title}}</el-row>
                <el-row class="blogContent">{{item.mdContent}}</el-row>
                <el-row style="font-size: 12px;margin-bottom: 10px;color: gainsboro;">
                  <el-col :span="4">{{item.createTime}}</el-col>
                  <el-col :span="3">点赞数：{{item.likeNumber}}</el-col>
                  <el-col :span="3">回复数：{{item.readNumber}}</el-col>
                  <el-col :span="3">阅读数：{{item.readNumber}}</el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>

          <!--分页组件开始-->
          <el-row>
            <el-col :span="9" :offset="7">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="pageSize"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :total="personBlogArrays.length">
              </el-pagination>
            </el-col>
          </el-row>
          <!--分页组件结束-->
        </el-row>
      </div>

      <!--右侧部分-->
      <div class="right">
        <el-row style="margin-bottom: 10px">
          <el-col :span="12" class="right1">
            <div>0</div>
            <div>他的粉丝</div>
          </el-col>
          <el-col :span="12" class="right1">
            <div>3</div>
            <div>他的关注</div>
          </el-col>
        </el-row>

        <el-row>
          <el-row style="border: 3px solid lightcyan;padding: 10px 0 0 0;color: white;">
            <el-col :span="16" style="margin: 0 0 10px 10px;padding-left: 10px; border-left: 5px solid red;">勋章</el-col>
            <el-col :span="6" style="color: lightblue">我的勋章</el-col>
          </el-row>

          <el-row style="padding: 20px 30px 20px 30px;border: 3px solid lightcyan;margin-bottom: 10px;color: white;">
            <el-col :span="6">
              <img src="../../assets/images/bg1.jpg" style="width: 40px;height: 40px;border-radius: 50%;"/>
              <div>
                持之以恒
              </div>
            </el-col>

            <el-col :span="6">
              <img src="../../assets/images/bg1.jpg" style="width: 40px;height: 40px;border-radius: 50%;"/>
              <div>
                持之以恒
              </div>
            </el-col>
          </el-row>

          <el-row style="border: 3px solid lightcyan;padding: 15px;margin-bottom: 10px;">
            <el-col :span="20" :offset="2">
              <img src="../../assets/images/bgIndex.jpg" style="width: 100%;height: 120px;"/>
            </el-col>
          </el-row>

          <el-row>
            <el-col></el-col>
            <el-col></el-col>
          </el-row>
        </el-row>


      </div>

    </div>
  </div>
</template>

<script>
  import Header from '../commons/Header';

  export default {
    name: "PPersonalCenter",
    components: {
      Header
    },
    data() {
      return {
        loginSuccessUser: {}, //登录成功后的用户对象
        personBlogArrays: [],
        pageSize: 4,
        currentPage: 1,
      }
    },
    mounted() {
      this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));
      this.findArticle();
    },
    computed: {
      newsPager: function () {
        return this.personBlogArrays.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
      }
    },
    methods: {

        //查询用户文章
        findArticle:function () {
            let url = this.websiteUrl+"/article/?username="+this.loginSuccessUser.username;
            let that = this;
            this.axios.get(url).then(function (response) {
              console.log(response.data.data);
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

        //查看其它文章
        toOtherBlog:function (bid) {
          // console.log(bid);
          //跳转传参
          this.$router.push({
            name: "POthersBlog1",
            query: {
              "bid":bid
            }
          });
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
    }
  }
</script>

<style scoped>

  a {
    text-decoration: none;
  }

  .personalCenter {
    background-image: url("http://personblog.starstarcheng.cn/image/personalCenter2.jpg");
    height: 900px;
    background-size:100%;
    background-attachment: fixed;
  }

  .personalCenterBody {
    width: 80%;
    margin: 0 auto;
    /*background-color: red;*/
  }

  .blogContent{
    font-size: 16px;
    margin-bottom: 10px;
    color: white;
    /*设置溢出部分隐藏*/
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /*左边部分*/
  /*left*/
  .left1 {
    width: 70%;
    /*background-color: lightcyan;*/
    border: 3px solid lightcyan;
    padding: 20px;
  }

  /*头像*/
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  /*个人信息*/
  .grade {
    width: 40px;
    height: 40px;
    border-radius: 40%;
  }

  .identification {
    width: 40px;
    height: 15px;
  }

  /*left1*/

  /*left2*/
  .left2 {
    margin: 10px 10px 0 0;
    border: 3px solid lightcyan;
    width: 70%;
  }

  .left2_el_col {
    width: 130px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    /*border: 1px solid grey;*/
    font-size: 20px;
  }

  .left2_el_col2 {
    width: 150px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    border-right: 1px solid gainsboro;
  }

  .left2_el_col :hover {
    border-bottom: 1px solid red;
  }

  .rank {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }

  /*左边部分*/

  /*右侧部分*/
  .right {
    width: 22%;
    height: 600px;
    /*background-color: white;*/
    position: absolute;
    right: 10%;
    top: 80px;
  }

  .right1 {
    text-align: center;
    font-size: 20px;
    height: 80px;
    border: 3px solid lightcyan;
    padding-top: 10px;
    color: white;
  }
</style>
