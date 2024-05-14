import { createRouter,createWebHashHistory } from "vue-router";
import {getToken,setToken,removeToken} from '../utils/token'
import {useMeanStore} from '../store/menus.ts'
import {nav} from '../api/department.js'
import {routes1,routes2,routes3} from './routes.js'
const routes = [
    //主页
    //登录
    {
        path: '/login',
        name: 'login',
        component: ()=>import('../views/Login/Login.vue')
    },
    //404页面
    {
        path: '/:catchAll(.*)',
        name: '404',
        component: ()=>import('../views/NullPage/NullPage.vue')

    }
]


const router = createRouter({
    history: createWebHashHistory(),
    routes
})


// @router/routers.ts 中添加前置路由守卫
router.beforeEach((to, from, next) => {
    let token = getToken()
    // 注意：在beforeEach中调用pinia存储的菜单状态是为了避免` Did you forget to install pinia?`这个bug
    const useMean = useMeanStore()
    console.log('hasRoute', useMean.hasRoute)
    if (to.path == '/login') {
      next()
    } else if (!token) {
      console.log("还没有token！！！")
      next({path: "/login"})
    } 
    else if (to.path == '/' || to.path == '') {
      next({path: '/home'})
    } 
    else if (!useMean.hasRoute) {
      nav().then(res => {
        if(res.data.level === 1){
          useMean.setMenuList(routes1)
        }else if(res.data.level === 2){
          useMean.setMenuList(routes2)
        }else{
          useMean.setMenuList(routes3)
        }
        console.log('resList',useMean.menuList);
        
        // useMean.setPermList(res.data.authoritys)
        useMean.menuList.forEach((menu: { children: any[]; }) => {
          if (menu.children) {
            if(menu.component){
              let route0:any = {
                name: menu.name,
                path: menu.path,
                meta: {
                  icon: menu.icon,
                  label: menu.label
                },
                // 用这行部署服务器上跳转会有问题
                // component: () =>import('../views/' + e.component +'.vue')
                // 解决跳转问题
                // component: modules['../views/' + e.component +'.vue']
                component: ()=>import(menu.component),
                children: []
              }
              menu.children.forEach((e: any) => {
                if (!e.component) {
                  return
                }
                let route:any = {
                  name: e.name,
                  path: e.path,
                  meta: {
                    icon: e.icon,
                    label: e.label
                  },
                  // 用这行部署服务器上跳转会有问题
                  // component: () =>import('../views/' + e.component +'.vue')
                  // 解决跳转问题
                  // component: modules['../views/' + e.component +'.vue']
                  component: ()=>import(e.component)
                }
                
                route0.children.push(route);
              })
              router.addRoute(route0)
            }
           
          }
        })
      }).catch(err=>{
        console.log(err);
      }).finally(fin=>{
        next({path: to.path})
        useMean.changeRouteStatus(true)
      })
    } else {
      console.log("已经有路由了------------")
      next()
    
      console.log('router1',router.getRoutes());
    }
  })

export default router