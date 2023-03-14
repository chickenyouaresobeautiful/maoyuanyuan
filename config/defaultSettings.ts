import { Settings as LayoutSettings } from '@ant-design/pro-components';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  primaryColor: '#1890ff',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '商品后台系统',
  pwa: false,
  logo: 'https://edu-56632.oss-cn-hangzhou.aliyuncs.com/%E5%A4%B4%E5%83%8F/avatar.jpg',
  iconfontUrl: '',
};

export default Settings;
