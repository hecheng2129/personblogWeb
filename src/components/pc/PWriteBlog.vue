<template>
  <div class="pwriteblogBg">
    <!--导航栏-->
    <Header></Header>

    <!--主体内容-->
    <div class="pwriteblogContent">
      <el-row style="border:3px solid gold;height: 70px;line-height: 60px;text-align: center;margin-bottom: 10px;">
        <el-col style="font-size: 25px;color: gold;" :span="4">博客主题：</el-col>
        <el-col style="font-size: 20px;" :span="19">
          <el-input v-model="title" placeholder="请输入主题" maxlength="50" show-word-limit></el-input>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <div id="main">
            <mavon-editor v-model="mdContent" class="mavon_editor" @change="change"/>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="4" :offset="20">
          <el-button type="success" @click="publish">发布</el-button>
          <el-button type="primary">保存到草稿</el-button>
        </el-col>
      </el-row>
    </div>

    <!--让编辑中的内容显示在页面上（解析）-->
    <!--<div v-html="htmlContent">

    </div>-->

      <!--添加图片-->
      <el-button @click="drawer = true" type="primary" round size="mini" class="imageButton">
        选<br/>择<br/>博<br/>客<br/>封<br/>面
      </el-button>

      <!--博客封面-->
      <el-drawer
        title="请选择你的博客封面,默认为第一张。选中为金色边框。"
        :visible.sync="drawer">
        <div style="overflow:scroll;width:400px; height:650px;">  <!--设置滚动条效果 注意 宽高要加-->
          <div v-for="(item,index) in blogImages" :key="item.id" style="text-align: center;">
              <img :src="item.src" :id="index" style="width: 80%;height: 200px;" @click="selectImage(index)"/>
          </div>
        </div>
      </el-drawer>

  </div>
</template>

<script>
  import Header from '../commons/Header';

  export default {
    name: "PWriteBlog",
    data() {
      return {
        title:'',
        mdContent: '',
        htmlContent: '',
        loginSuccessUser: {}, //登录成功后的用户对象
        drawer: false,
        blogImages:[{
          id:1,
          src:"http://personblog.starstarcheng.cn/image/trottingHorseLamp1.jpg"
        },{
          id:2,
          src:"http://personblog.starstarcheng.cn/image/trottingHorseLamp2.jpeg"
        },{
          id:3,
          src:"http://personblog.starstarcheng.cn/image/trottingHorseLamp3.jpg"
        },{
          id:4,
          src:"http://personblog.starstarcheng.cn/image/trottingHorseLamp4.jpg"
        },],
        image:'http://personblog.starstarcheng.cn/image/trottingHorseLamp1.jpg'
      }
    },
    mounted(){
      this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));

      if(this.loginSuccessUser==null){
          alert("请登录后再操作！");
          window.location.href="PIndex";
      }
    },
    components: {
      Header
    },
    methods: {
      change: function (value, render) {
        //render为mankdown解析后的结果
        this.htmlContent = render;
      },

      /*发布文章*/
      publish:function () {
        /*主题或内容不能为空*/
        if(this.title=="" || this.title.trim()==""){
          alert("主题不能为空！");
          return;
        }
        if(this.mdContent=="" || this.mdContent.trim()==""){
          alert("内容不能为空！");
          return;
        }

        let url = this.websiteUrl+'/article/publish';
        let that = this;

        this.axios.post(url,that.$qs.stringify({
          'username': that.loginSuccessUser.username,
          'title':that.title,
          'mdContent':that.mdContent,
          'htmlContent':that.htmlContent,
          'image':that.image
        }))
          .then(function (response) {
            if (response.data.code == 200) {
              that.token = response.data.data;
              that.$message({
                message: response.data.msg,
                type: 'success'
              });

              //刷新页面
              location.reload();

            } else {
              that.$message({
                message: response.data.msg,
                type: 'error'
              });
            }
          }).catch(function (error) {
          that.$message({
            message: '博客发送失败！',
            type: 'error'
          });
        })
      },

      /*选择封面图片*/
      selectImage(index) {
        //清除border
        for (var i=0;i<this.blogImages.length;i++){
          $("#"+i).css("border","0px");
        }

        this.image =this.blogImages[index].src;
        $("#"+index).css("border","2px solid gold");
      }
    }
  }
</script>

<style scoped>
  @import "https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css";

  .pwriteblogBg{
    background-image: url("http://personblog.starstarcheng.cn/image/PWriteBlog1.jpg");
    height: 900px;
    background-size:100% 100%;
    background-attachment: fixed;
  }

  .pwriteblogContent {
    margin: 0 auto;
    width: 80%;
    height: auto;
  }

  .mavon_editor {
    height: 700px;
  }

  .imageButton{
    position: fixed;
    top: 300px;
    right: 0;
  }
</style>
