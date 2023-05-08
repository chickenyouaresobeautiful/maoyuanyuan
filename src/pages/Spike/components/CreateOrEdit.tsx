import {updateUser} from '@/services/ant-design-pro/api/user';
import {message, Modal, Skeleton} from 'antd';
import {ProForm, ProFormDatePicker, ProFormRadio, ProFormText} from '@ant-design/pro-components';
import { addSpikePromotion } from '@/services/ant-design-pro/api/spike';

interface CreateOrEditProps {
  isModalOpen: boolean;
  isShowModal: (show: boolean, editId?: any) => void;
  actionRef: any;
  spikePromotionId: any;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateOrEdit = (props: CreateOrEditProps) => {
  const {isModalOpen, isShowModal, actionRef, spikePromotionId} = props;
  const type = spikePromotionId === undefined ? '添加' : '修改';

  //控制表单的提交
  const handleSubmit = async (values: any) => {
    await waitTime(2000);
    const response = spikePromotionId === undefined ? await addSpikePromotion(values) : await updateUser(spikePromotionId, values);
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
        title={`${type}活动`}
        open={isModalOpen}
        onCancel={() => isShowModal(false)}
        footer={null}
        //模态框关闭时清空里面的内容
        destroyOnClose={true}
      >
        {
          //只有是编辑的情况下，要查询的数据还没有返回，这时候才使用骨架屏
          spikePromotionId !== undefined ? (
            <Skeleton active/>
          ) : (
            <ProForm<{
              name: string;
              company?: string;
              useMode?: string;
            }>
              layout={'vertical'}
              //表单项初始化，用于数据的回显
              onFinish={(values) => handleSubmit(values)}
              params={{}}
            >
              <ProFormText
                name="title"
                width={"md"}
                label="活动标题"
                placeholder="请输入活动标题"
                rules={[
                  {required: true, message: '活动标题不能为空'},
                ]}
              />
              <ProFormDatePicker
                width={"md"}
                name="startDate"
                label="开始时间"
                rules={[
                  {required: true, message: '开始时间不能为空'},
                ]}
              />
              <ProFormDatePicker
                width={"md"}
                name="endDate"
                label="结束时间"
                rules={[
                  {required: true, message: '结束时间不能为空'},
                ]}
              />
              <ProFormRadio.Group
                name="status"
                label="上线/下线"
                rules={[
                  {required: true, message: '请选择是否上线'},
                ]}
                options={[
                  {
                    label: '下线',
                    value: '0',
                  },
                  {
                    label: '上线',
                    value: '1',
                  },
                ]}
              />
            </ProForm>
          )
        }
      </Modal>
    </div>
  );
};

export default CreateOrEdit;
