<template>
  <div>
    <div ref="editor" class="myWangEditor" v-highlight></div>
    <!--{{htmlContent}}-->
  </div>
</template>

<script>

  import E from 'wangeditor';

  var editor;
  export default {
    name: "WangEditor",
    data() {
      return {
        htmlContent: '',      //wangEditor编辑器
        mdContent: '',
      }
    },
    mounted() {
      /*wangEditor编辑器*/
      editor = new E(this.$refs.editor);
      editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        //'image',  // 插入图片
        'table',  // 表格
        //'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
      ]

      editor.customConfig.onchange = (html) => {
        this.htmlContent = html;
      }
      editor.create()
      /*wangEditor编辑器*/
    },
    methods:{

    }
  }
</script>

<style scoped>
  @import "https://cdn.bootcss.com/github-markdown-css/3.0.1/github-markdown.min.css";

  .myWangEditor{
      color: white;
  }
</style>
