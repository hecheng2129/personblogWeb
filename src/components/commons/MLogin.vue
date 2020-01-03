<template>
    <div>

    </div>
</template>

<script>
  var graceChecker = require('../../assets/js/commons/graceChecker');

  export default {
    name: "MLogin",
    data() {
      return {
        isLogin: false,
        loginSuccessUser: {} //登录成功后的用户对象
      }
    },
    mounted() {
      this.doLogin();
    },
    methods: {
      doLogin: function () {
        this.isLogin = graceChecker.isLogin();

        if (this.isLogin) {
          this.loginSuccessUser = JSON.parse(localStorage.getItem("www.simoniu.com"));
          // console.log(this.loginSuccessUser);
        }
      },

      doLoginOut: function () {
        // console.log("调用了");
        if (this.isLogin) {
          localStorage.removeItem("www.simoniu.com");
        }
        window.location.href = '/mindex';
      }
    }
  }
</script>

<style scoped>

</style>
