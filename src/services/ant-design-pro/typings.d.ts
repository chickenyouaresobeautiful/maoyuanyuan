// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    username?: string;
    avatar?: string;
    id?: number;
    email?: string;
    realname?: string;
    address?: string;
    phone?: string;
    status?: number;
    role?: string;
    registerIp?: string;
    registerTime?: string;
  };

  type LoginResult = {
    code?: number;
    type?: string;
    token?: string;
    currentAuthority?: string;

    msg?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type UserEcho = {
    username?: string;
    password?: boolean;
    phone?: string;
    email?: string;
  };

  type GoodsEcho = {
    catId?: number[];
    title?: string;
    description?: string;
    price?: number;
    stock?: number;
    details?: string;
  };

  type OrderDetailsList = {
    code?: number;
    msg?: string;
    orderDetails?: OrderDetailsItem[];
  };

  type OrderDetailsItem = {
    id?: number;
    orderNo?: string;
    goodsCover?: string;
    goodsId?: number;
    goodsNum?: number;
    goodsPrice?: number;
    goodsTitle?: string;
    totalPrice?: number;
  };
}
