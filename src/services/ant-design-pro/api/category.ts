import {request} from 'umi';

/** 获取分类列表 GET /api/category/list */
export async function getCategories(options?: { [key: string]: any }) {
  return request<API.CategoryResult>(`/api/category/list`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 添加一级分类 POST /api/category/add */
export async function addCategory(value: any, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/category/add`, {
    method: 'POST',
    data: value,
    ...(options || {}),
  });
}

/** 删除分类 DELETE /api/category/delete */
export async function deleteCategory(id: number, options?: { [key: string]: any }) {
  return request<Record<string, any>>(`/api/category/delete/${id}`, {
    method: 'DELETE',
    ...(options || {}),
  });
}
