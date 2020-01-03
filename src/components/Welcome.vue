<template>

</template>

<script>
    export default {
        name: "Welcome",
        mounted(){
            if(this.is_PC()){
              this.$router.replace("/pindex");
            }else{
              this.$router.replace("/mindex");
            }
        },
        methods:{
            is_PC :function () {
              if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
                return false;
              } else {
                return true;
              }
            }
        }
    }
</script>

<style scoped>

</style>
