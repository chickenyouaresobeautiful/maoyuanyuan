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
    path: '/category',
    name: 'category',
    icon: 'AppstoreOutlined',
    component: './Category',
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
    path: '/spike',
    name: 'spike',
    icon: 'FieldTimeOutlined',
    component: './Spike',
  },
  {
    name: 'spikeTimePeriod',
    path: '/spikeTimePeriod',
    hideInMenu: true,
    component: './SpikeTimePeriod',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
