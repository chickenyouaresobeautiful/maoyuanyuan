import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(username: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/outLogin', {
    method: 'POST',
    params: {
      username: username,
    },
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取ikun数量 GET /api/user/iKunCount */
export async function getIKunCount(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/iKunCount', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取用户列表 GET /api/user/list */
export async function getUserList(params: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/user/list', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 修改用户状态 GET /api/user/list */
export async function updateUserStatus(uid: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/user/${uid}/updateStatus`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 添加用户 POST /api/user/add */
export async function addUser(values: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/user/add`, {
    method: 'POST',
    data: values,
    ...(options || {}),
  });
}

/** 更新用户信息 PUT /api/user/update */
export async function updateUser(uid: any, values: any, options?: { [key: string]: any }) {
  console.log(values);
  return request<Record<string, any>>(`/api/user/${uid}/update`, {
    method: 'PUT',
    data: values,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /api/user/{id} */
export async function getUserInfo(uid: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/user/${uid}`, {
    method: 'GET',
    ...(options || {}),
  });
}
