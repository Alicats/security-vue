import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

export const constantRouterMap = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
      path: '/login',
      name: 'login',
      hidden: true,
      component: resolve=>(require(["../components/page/Login.vue"],resolve)),
      meta: { title: '登录' }
    }
    
]
  


export default new Router({
    mode: 'history',
    routes: constantRouterMap
    /*
    [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve=>(require(["../components/common/Home.vue"],resolve)),
            meta: { title: '自述文件',requireAuth: true },
            children: [
                {
                    path: '/enterUser',
                    component: resolve=>(require(["../components/page/admin/user/EnterUser.vue"],resolve)),
                    meta: { title: '企业用户' }
                },
                {
                    path: '/otherUser',
                    component: resolve=>(require(["../components/page/admin/user/OtherUser.vue"],resolve)),
                    meta: {title: '其他用户'}
                },
                {
                    path: '/myProduct',
                    component: resolve=>(require(["../components/page/product/MyProduct.vue"],resolve)),
                    meta: {title: '我的产品'}
                },
                {
                    path: '/userInfo',
                    component: resolve=>(require(["../components/page/UserInfo.vue"],resolve)),
                    meta: {title: '个人信息'}
                },
             
                {
                    path: '/dashboard',
                    component: resolve=>(require(["../components/page/Dashboard.vue"],resolve)),
                    meta: { title: '我的桌面' }
                },
                {
                    path: '/icon',
                    component: () => import( '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () => import( '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve=>(require(["../components/page/Tabs.vue"],resolve)),
                    // component: () => import( '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () => import('../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import( '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import( '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import( '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import( '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () => import('../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () => import( '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import( '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import( '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve=>(require(["../components/page/404.vue"],resolve)),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import( '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () => import( '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: resolve=>(require(["../components/page/Login.vue"],resolve)),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
    */
    
})




  
