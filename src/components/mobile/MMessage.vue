<template>
    <div>
      暂未实现
      <MFoot ref="mfoot"></MFoot>
    </div>
</template>

<script>
  import MFoot from '../commons/MFoot';
    export default {
        name: "MMessage",
        components: {
          MFoot,
        },
        mounted(){
          this.$refs.mfoot.active=2;
        },
    }
</script>

<style scoped>

</style>
