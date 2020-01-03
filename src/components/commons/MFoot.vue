<template>
    <div>
      <div style="width: 100%;height: 50px;">

      </div>

      <!--底部-->
      <van-tabbar v-model="active" @change="onChange">
        <van-tabbar-item icon="home-o">主页</van-tabbar-item>
        <van-tabbar-item icon="search">搜索</van-tabbar-item>
        <van-tabbar-item icon="friends-o" info="5">消息</van-tabbar-item>
        <van-tabbar-item icon="manager-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "MFoot",
        data(){
          return{
            active:0
          }
        },
        methods:{
          //监听切换
          onChange(index) {
            console.log(index);
            switch (index) {
              //跳转到主页
              case 0:{
                //跳转传参
                this.$router.push({
                  name: "MIndex",
                });
              } break;
              case 1:{
                //跳转传参
                this.$router.push({
                  name: "MSearch",
                });
              } break;
              case 2:{
                //跳转传参
                this.$router.push({
                  name: "MMessage",
                });
              } break;
              case 3:{
                //跳转传参
                this.$router.push({
                  name: "MPersonalCenter",
                });
                // window.location.href='MPersonalSetting';
              } break;
            }
          },

        }
    }
</script>

<style scoped>

</style>
