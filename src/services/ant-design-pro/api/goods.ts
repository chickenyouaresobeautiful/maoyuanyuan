import { request } from 'umi';

/** 获取商品列表 GET /api/goods/list */
export async function getGoods(params: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/goods/list`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 上架或下架 PUT /api/goods/${goodId}/isOn */
export async function isOn(goodId: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/goods/${goodId}/isOn`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 推荐或不推荐 PUT /api/goods/${goodId}/isRecommend */
export async function isRecommend(goodId: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/goods/${goodId}/isRecommend`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 查询商品数量 GET /api/goods/count */
export async function getGoodsCount(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/goods/count`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加用户 POST /api/goods/add */
export async function addGoods(values: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/goods/add`, {
    method: 'POST',
    data: values,
    ...(options || {}),
  });
}

/** 更新用户信息 PUT /api/goods/update */
export async function updateGoods(goodsId: any, values: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/goods/${goodsId}/update`, {
    method: 'PUT',
    data: values,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /api/goods/{id} */
export async function getGoodsInfo(goodsId: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/goods/${goodsId}`, {
    method: 'GET',
    ...(options || {}),
  });
}
