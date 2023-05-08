import {message, Modal} from 'antd';
import {
  ProForm,
  ProFormDigit,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import {addCategory} from "@/services/ant-design-pro/api/category";

interface CreateOrEditProps {
  isModalOpen: boolean;
  isShowModal: (show: boolean, id?: any) => void;
  catId: number;
  actionRef: any;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateOrEdit = (props: CreateOrEditProps) => {
  const {isModalOpen, isShowModal, actionRef, catId} = props;

  //控制表单的提交
  const handleSubmit = async (values: any) => {
    await waitTime(2000);
    console.log(values);
    const newValues = catId !== undefined ? {...values, parentCid: catId} : {...values};
    const response = await addCategory(newValues);
    if (response.code === 0) {
      message.success(`添加成功`);
      //刷新表格
      actionRef.current?.reload();
      //关闭模态框
      isShowModal(false);
    } else {
      message.error(`添加失败`);
    }
  };

  return (
    <div>
      <Modal
        title={`添加商品分类`}
        open={isModalOpen}
        onCancel={() => isShowModal(false)}
        footer={null}
        //模态框关闭时清空里面的内容
        destroyOnClose={true}
      >
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          layout={'vertical'}
          onFinish={(values) => handleSubmit(values)}
          params={{}}
        >
          <ProFormText
            name="name"
            label="分类名称"
            placeholder="请输入分类名称"
            rules={[{required: true, message: '请输入分类名称'}]}
          />
          <ProFormDigit
            label="排序"
            name="sort"
            placeholder="请输入排序"
            min={0}
            rules={[{required: true, message: '请输入排序'}]}
          />
          <ProFormRadio.Group
            name="showStatus"
            label="是否显示"
            rules={[{required: true, message: '请输入排序'}]}
            options={[
              {
                label: '是',
                value: '1',
              },
              {
                label: '否',
                value: '0',
              },
            ]}
          />
        </ProForm>
      </Modal>
    </div>
  );
};

export default CreateOrEdit;
