// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/*使用mavonEditor编辑器*/
import  mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

//引入cookie
import Cookies from 'js-cookie';
Vue.use(Cookies)

/*
先安装
npm install axios
// npm install --save axios vue-axios 这个好像不要
*/
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
/**
 * npm install qs
 * post传值使用
 */
import qs from 'qs';
Vue.prototype.$qs = qs

/**
 * 引入语法高亮
 */
//导入代码高亮文件
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

//自定义一个代码高亮指令
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

//定义一个全局变量
//本地
// Vue.prototype.websiteUrl='http://localhost:8080/personblog';
//阿里云
Vue.prototype.websiteUrl='http://118.190.134.98:8080/personblog';

//使用vant作为手机端框架
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
