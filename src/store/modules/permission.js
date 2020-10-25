import {constantRouterMap} from '@/router'
import {getRouters} from '@/api/menu'

const permission = {
    state: {
        routes: [],
        addRoutes: [],
        menuList: JSON.parse(localStorage.getItem("menuList")),
    },
    mutations: {
        SET_ROUTES: (state,routes) => {
            state.addRoutes = routes
            state.routes = constantRouterMap.concat(routes)
        },
        SET_MENULIST: (state, menuList) => {
            state.menuList = menuList;
            localStorage.setItem("menuList",JSON.stringify(menuList));
        },
    },
    actions: {
        GenerateRoutes({commit}){
            return new Promise(resolve => {
                // 向后端请求路由数据
                getRouters().then(res => {
                    const accessedRoutes = filterAsyncRouter(res.data.routerVoList)
                    accessedRoutes.push({path: '*',redirect: '/404',hidden: true})
                  
                    commit('SET_MENULIST',res.data.menuList)
                    commit('SET_ROUTES', accessedRoutes)
                   
                    resolve(accessedRoutes)
                })
            })
        },
    }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
    return asyncRouterMap.filter(route => {        
        if(route.component){
            if(route.path === '/'){
                route.component = loadHomeView(route.component)
            }else{
                route.component = loadView(route.component)
            }

        }
        if(route.children != null){
            route.children = filterAsyncRouter(route.children)
        }
        return true
    })
    
  }

  export const loadHomeView = (view) => {
      return (resolve) => require([`@/components/common/${view}`],resolve)
  }

  export const loadView = (view) => {
      return (resolve) => require([`@/components/page/${view}`],resolve)
  }

  export default permission