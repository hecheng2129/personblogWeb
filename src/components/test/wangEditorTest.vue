<template>
  <div>

    <!--必须单独封装？-->

    <!--vue+elementUI，在弹出框页面中使用富文本编辑器，父页面和弹出框是分离页面，父页面import弹出框页面，
    在父页面初始化页面时，没有初始化富文本编辑器，所以在点击弹出框页面时，富文本编辑器尚未初始化
    https://blog.csdn.net/zcxbd/article/details/96307778
    -->
    <el-row>
      <el-col :span="20" :offset="4">
        <div ref="editor" style="text-align:left"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import E from 'wangeditor';

  var editor;
  export default {
    name: "wangEditorTest",
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
    methods: {

    }
  }
</script>

<style scoped>

</style>
