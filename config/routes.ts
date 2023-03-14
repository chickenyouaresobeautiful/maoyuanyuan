export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/Login',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/member',
    name: 'member',
    icon: 'UserOutlined',
    component: './Member',
  },
  {
    path: '/goods',
    name: 'goods',
    icon: 'ShoppingOutlined',
    component: './Goods',
  },
  {
    path: '/order',
    name: 'order',
    icon: 'AccountBookOutlined',
    component: './Order',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
