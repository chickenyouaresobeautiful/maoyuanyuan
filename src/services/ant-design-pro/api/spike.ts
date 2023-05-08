import {request} from 'umi';

/** 获取分类列表 GET /api/spike/promotion/list */
export async function getSpikePromotionList(params: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/promotion/list`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 添加分类 POST /api/spike/promotion/add */
export async function addSpikePromotion(body: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/promotion/add`, {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}

/** 上架或下架 PUT /api/spike/promotion/upordown */
export async function upOrDown(id: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/promotion/upordown/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 秒杀时间段列表 GET /api/spike/session/list */
export async function getSpikeTimePeriodList(params: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/session/list`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 秒杀时间段启用或禁用 PUT /api/spike/session/enableordisable/{id} */
export async function enableOrDisable(id: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/session/enableordisable/${id}`, {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新增秒杀时间段 POST /api/spike/session/add */
export async function addSpikeSession(values: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/session/add/`, {
    method: 'POST',
    data: values,
    ...(options || {}),
  });
}

/** 获取秒杀时间段 GET /api/spike/session/get/{id} */
export async function getSpikeSession(id: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/session/get/${id}/`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改秒杀时间段 PUT /api/spike/session/update/{id} */
export async function updateSpikeSession(id: number, values: any,options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/spike/session/update/${id}/`, {
    method: 'PUT',
    data: values,
    ...(options || {}),
  });
}
