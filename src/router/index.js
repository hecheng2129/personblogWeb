import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import PIndex from '@/components/pc/PIndex'
import PLogin from '@/components/pc/PLogin'
import PRegister from '@/components/pc/PRegister'
import PRegisterEmail from '@/components/pc/PRegisterEmail'

import PPersonalData from '@/components/pc/PPersonalData'
import PPersonalCenter from '@/components/pc/PPersonalCenter'
import PAccountSettings from '@/components/pc/PAccountSettings'
import PWriteBlog from '@/components/pc/PWriteBlog'
import POthersBlog from '@/components/pc/POthersBlog'
import POthersBlog1 from '@/components/pc/POthersBlog1'

/*移动端*/
import MIndex from '@/components/mobile/MIndex'
import MPersonalCenter from '@/components/mobile/MPersonalCenter'
import MLogin from '@/components/mobile/MLogin'
import MRegister from '@/components/mobile/MRegister'
import MPersonalSetting from '@/components/mobile/MPersonalSetting'
import MArticle from '@/components/mobile/MArticle'
import Mhomepage from '@/components/mobile/Mhomepage'
import MPersonalData from '@/components/mobile/MPersonalData'

import MUpdateUsername from '@/components/mobile/MUpdateUsername'
import MUpdateIntroduction from '@/components/mobile/MUpdateIntroduction'
import MSearch from '@/components/mobile/MSearch'
import MMessage from '@/components/mobile/MMessage'



/*测试vue*/
// import confirmTest from '@/components/test/confirmTest'
import wangEditorTest from '@/components/test/wangEditorTest'


Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/pindex',
      name: 'PIndex',
      component: PIndex
    },{
      path: '/plogin',
      name: 'PLogin',
      component: PLogin
    },{
      path: '/pregister',
      name: 'PRegister',
      component: PRegister
    },{
      path: '/pregisteremail',
      name: 'PRegisterEmail',
      component: PRegisterEmail
    },{
      path: '/ppersonalcenter',
      name: 'PPersonalCenter',
      component: PPersonalCenter
    },{
      path: '/ppersonaldata',
      name: 'PPersonalData',
      component: PPersonalData
    },{
      path: '/paccountsettings',
      name: 'PAccountSettings',
      component: PAccountSettings
    },{
      path: '/pwriteblog',
      name: 'PWriteBlog',
      component: PWriteBlog
    },{
      path: '/pothersblog',
      name: 'POthersBlog',
      component: POthersBlog
    },{
      path: '/pothersblog1',
      name: 'POthersBlog1',
      component: POthersBlog1
    },

    {
      path: '/mindex',
      name: 'MIndex',
      component: MIndex
    },{
      path: '/mpersonalcenter',
      name: 'MPersonalCenter',
      component: MPersonalCenter
    },{
      path: '/mlogin',
      name: 'MLogin',
      component: MLogin
    },{
      path: '/mregister',
      name: 'MRegister',
      component: MRegister
    },{
      path: '/mpersonalsetting',
      name: 'MPersonalSetting',
      component: MPersonalSetting
    },{
      path: '/marticle',
      name: 'MArticle',
      component: MArticle
    },{
      path: '/mhomepage',
      name: 'Mhomepage',
      component: Mhomepage
    },{
      path: '/mpersonaldata',
      name: 'MPersonalData',
      component: MPersonalData
    },{
      path: '/mupdateusername',
      name: 'MUpdateUsername',
      component: MUpdateUsername
    },{
      path: '/mupdateintroduction',
      name: 'MUpdateIntroduction',
      component: MUpdateIntroduction
    },{
      path: '/msearch',
      name: 'MSearch',
      component: MSearch
    },{
      path: '/mmessage',
      name: 'MMessage',
      component: MMessage
    },
  ]
})
