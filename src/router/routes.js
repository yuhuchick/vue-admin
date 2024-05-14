//一级管理员菜单
const routes1 = [
  {
    path: '/',
    component: '../views/Main/Main.vue',
    children: [
        {
            path: '/home',
            name: 'home',
            component: '../views/Home/Home.vue',
            meta: {
                label: '首页',
                icon: 'HomeFilled',
                requireAuth: false
            }
        },
        {
            path: '/user',
            name: 'user',
            component: '../views/User/User.vue',
            meta: {
                label: '用户管理',
                icon: 'UserFilled',
                requireAuth: false
            }
        },
        {
            path: '/article',
            name: 'article',
            component: '../views/Article/Article.vue',
            meta: {
                label: '文章',
                icon: 'Document',
                requireAuth: false
            }
        },
        {
           name: 'other',
           meta: {
            icon: 'location',
            label: '其他'
           },
           children: [
            {
              path: '/page1',
              name: 'page1',
              component: '../views/Page1/Page1.vue',
              meta: {
                  label: '页面一',
                  icon: 'setting',
                  requireAuth: false
              }
          },
          {
              path: '/page2',
              name: 'page2',
              component: '../views/Page2/Page2.vue',
              meta: {
                  label: '页面二',
                  icon: 'setting',
                  requireAuth: false
              }
          },
           ]
        }
      
    ]
},
]
//二级管理员菜单
const routes2 = [
  {
    path: '/',
    component: '../views/Main/Main.vue',
    children: [
        {
            path: '/home',
            name: 'home',
            component: '../views/Home/Home.vue',
            meta: {
                label: '首页',
                icon: 'HomeFilled',
                requireAuth: false
            }
        },
        {
            path: '/user',
            name: 'user',
            component: '../views/User/User.vue',
            meta: {
                label: '用户管理',
                icon: 'UserFilled',
                requireAuth: false
            }
        },
        {
          name: 'other',
          meta: {
           icon: 'location',
           label: '其他',
          },
          children: [
           {
             path: '/page1',
             name: 'page1',
             component: '../views/Page1/Page1.vue',
             meta: {
                 label: '页面一',
                 icon: 'setting',
                 requireAuth: false
             }
         },
         {
             path: '/page2',
             name: 'page2',
             component: '../views/Page2/Page2.vue',
             meta: {
                 label: '页面二',
                 icon: 'setting',
                 requireAuth: false
             }
         },
          ]
       }
    ]
},
]
//三级管理员菜单
const routes3 = [
  {
    path: '/',
    component: '../views/Main/Main.vue',
    children: [
        {
            path: '/home',
            name: 'home',
            component: '../views/Home/Home.vue',
            meta: {
                label: '首页',
                icon: 'HomeFilled',
                requireAuth: false
            }
        },
        {
            path: '/article',
            name: 'UserFilled',
            component: '../views/Article/Article.vue',
            meta: {
                label: '文章',
                icon: 'Document',
                requireAuth: false
            }
        },
    ]
},
]


export {routes1,routes2,routes3}
