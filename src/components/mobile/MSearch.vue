<template>
  <div>
    <!--搜索栏-->
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词(按照博客名称查找)"
      show-action
      shape="round"
      @search="onSearch"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>

    <!--遍历博客文章-->
    <div v-for="(item,index) in articleList" :key="index" class="rowContent">
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

    <MFoot ref="mfoot"></MFoot>
  </div>
</template>

<script>
  import MFoot from '../commons/MFoot';

  export default {
    name: "MSearch",
    components: {
      MFoot,
    },
    data() {
      return {
        value: '',
        articleList:[]
      }
    },
    mounted(){
      this.$refs.mfoot.active=1;
    },
    methods: {
      onSearch: function () {
        let url = this.websiteUrl + "/article/vagueArticle?value="+this.value;
        let that = this;
        this.axios.get(url).then(function (response) {
          if (response.data.code == 200) {
            that.articleList = response.data.data;
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

      //跳转到他人博客页面
      othersBlog:function (article) {

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

  .userInformation{
    font-size: 14px;
    color: gray;
    margin: 5px;
  }
</style>
