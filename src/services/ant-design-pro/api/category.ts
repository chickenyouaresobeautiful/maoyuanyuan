import { request } from 'umi';

/** 获取分类列表 GET /api/category/list */
export async function getCategories(options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/category/list`, {
    method: 'GET',
    ...(options || {}),
  });
}
