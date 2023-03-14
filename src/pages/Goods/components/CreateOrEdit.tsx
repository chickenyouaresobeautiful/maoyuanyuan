import { useEffect, useState } from 'react';
import { Cascader, Form, message, Modal, Skeleton } from 'antd';
import {
  ProForm,
  ProFormDigit,
  ProFormItem,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { getCategories } from '@/services/ant-design-pro/api/category';
import Editor from '@/components/Editor';
import { addGoods, getGoodsInfo, updateGoods } from '@/services/ant-design-pro/api/goods';

interface CreateOrEditProps {
  isModalOpen: boolean;
  isShowModal: (show: boolean, editId?: any) => void;
  actionRef: any;
  goodsId: any;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateOrEdit = (props: CreateOrEditProps) => {
  const [initialValues, setInitialValues] = useState<API.GoodsEcho>();
  const [options, setOptions] = useState([]);
  const [formObj] = Form.useForm();
  const { isModalOpen, isShowModal, actionRef, goodsId } = props;
  const type = goodsId === undefined ? '添加' : '修改';

  useEffect(() => {
    const categories = async () => {
      const resCategory = await getCategories();
      if (resCategory.code === 0) {
        setOptions(resCategory.categoryList);
      }
      console.log(resCategory);
    };

    const goodsInfo = async () => {
      //根据goodsId来判断添加与修改，只有是修改时才发送请求查数据回显
      if (goodsId !== undefined) {
        const response = await getGoodsInfo(goodsId);
        setInitialValues(response.goodsInfo);
      }
    };

    categories();
    goodsInfo();
    return () => {};
  }, []);

  const setDetails = (value: any) => formObj.setFieldsValue({ details: value });

  //控制表单的提交
  const handleSubmit = async (values: any) => {
    await waitTime(2000);
    console.log(values);
    let response = {};
    if (goodsId === undefined) {
      //没有uid，发送添加请求
      response = await addGoods(values);
    } else {
      //有uid，发送修改请求
      response = await updateGoods(goodsId, values);
    }
    if (response.code === 0) {
      message.success(`${type}成功`);
      //刷新表格
      actionRef.current?.reload();
      //关闭模态框
      isShowModal(false);
    } else {
      message.error(`${type}失败`);
    }
  };

  return (
    <div>
      <Modal
        title={`${type}商品`}
        open={isModalOpen}
        onCancel={() => isShowModal(false)}
        footer={null}
        //模态框关闭时清空里面的内容
        destroyOnClose={true}
      >
        {
          //只有是编辑的情况下，要查询的数据还没有返回，这时候才使用骨架屏
          initialValues === undefined && goodsId !== undefined ? (
            <Skeleton active />
          ) : (
            <ProForm<{
              name: string;
              company?: string;
              useMode?: string;
            }>
              form={formObj}
              layout={'vertical'}
              //表单项初始化，用于数据的回显
              initialValues={initialValues}
              onFinish={(values) => handleSubmit(values)}
              params={{}}
            >
              <ProFormItem
                name="catId"
                label="分类"
                rules={[{ required: true, message: '请选择商品分类' }]}
              >
                <Cascader
                  fieldNames={{
                    label: 'name',
                    value: 'catId',
                  }}
                  options={options}
                  placeholder="请选择分类"
                />
              </ProFormItem>
              <ProFormText
                name="title"
                label="商品标题"
                placeholder="请输入标题"
                rules={[{ required: true, message: '请输入标题' }]}
              />
              <ProFormDigit
                name="price"
                label="价格"
                placeholder="请输入价格"
                min={0}
                rules={[{ required: true, message: '请输入价格' }]}
              />
              <ProFormDigit
                name="stock"
                label="库存"
                placeholder="请输入库存"
                min={0}
                rules={[{ required: true, message: '请输入库存' }]}
              />
              <ProFormTextArea
                name="description"
                label="商品描述"
                placeholder="请输入商品描述信息"
                rules={[{ required: true, message: '商品描述信息不能为空' }]}
              />
              <ProForm.Item
                name="details"
                label="商品详情"
                rules={[{ required: true, message: '商品详情信息不能为空' }]}
              >
                <Editor setDetails={setDetails} content={initialValues?.details} />
              </ProForm.Item>
              {goodsId !== undefined ? (
                <ProFormUploadButton
                  name="cover"
                  label="封面"
                  valuePropName={'fileList'}
                  max={1}
                  fieldProps={{
                    name: 'cover',
                    listType: 'picture-card',
                  }}
                  action="http://localhost:8080/api/third/oss/uploadCover"
                />
              ) : (
                <ProFormUploadButton
                  name="cover"
                  label="封面"
                  valuePropName={'fileList'}
                  max={1}
                  rules={[{ required: true, message: '请上传封面' }]}
                  fieldProps={{
                    name: 'cover',
                    listType: 'picture-card',
                  }}
                  action="http://localhost:8080/api/third/oss/uploadCover"
                />
              )}
            </ProForm>
          )
        }
      </Modal>
    </div>
  );
};

export default CreateOrEdit;
