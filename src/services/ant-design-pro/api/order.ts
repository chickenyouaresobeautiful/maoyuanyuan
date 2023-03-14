import { request } from 'umi';

/** 获取订单信息 GET /api/order/list */
export async function getOrderList(params: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/order/list`, {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取订单详情 GET /api/order/details/{orderNo} */
export async function getOrderDetails(orderNo: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/order/details/${orderNo}`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 发货 PUT /api/order/ship/{orderNo} */
export async function ship(body: any, orderNo: string, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/order/ship/${orderNo}`, {
    method: 'PUT',
    data: body,
    ...(options || {}),
  });
}
