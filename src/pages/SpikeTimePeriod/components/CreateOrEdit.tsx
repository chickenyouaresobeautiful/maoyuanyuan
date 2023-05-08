import {message, Modal, Skeleton} from 'antd';
import {ProForm, ProFormRadio, ProFormText, ProFormTimePicker} from '@ant-design/pro-components';
import {addSpikeSession, getSpikeSession, updateSpikeSession} from '@/services/ant-design-pro/api/spike';
import {useEffect, useState} from "react";

interface CreateOrEditProps {
  isModalOpen: boolean;
  isShowModal: (show: boolean, editId?: any) => void;
  actionRef: any;
  spikeSessionId: any;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateOrEdit = (props: CreateOrEditProps) => {
  const {isModalOpen, isShowModal, actionRef, spikeSessionId} = props;
  const type = spikeSessionId === undefined ? '添加' : '修改';
  const [initialValues, setInitialValues] = useState<API.SpikeTimePeriodItem>();

  useEffect(() => {
    const spikeSession = async () => {
      //根据uid来判断添加与修改，只有是修改时才发送请求查数据回显
      if (spikeSessionId !== undefined) {
        const response = await getSpikeSession(spikeSessionId);
        setInitialValues(response.spikePromotionSession);
      }
    };
    spikeSession();
    return () => {
    };
  }, []);

  //控制表单的提交
  const handleSubmit = async (values: any) => {
    await waitTime(2000);
    console.log(spikeSessionId);
    const response = spikeSessionId === undefined ? await addSpikeSession(values) : await updateSpikeSession(spikeSessionId, values);
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
        title={`${type}时间段`}
        open={isModalOpen}
        onCancel={() => isShowModal(false)}
        footer={null}
        //模态框关闭时清空里面的内容
        destroyOnClose={true}
      >
        {
          //只有是编辑的情况下，要查询的数据还没有返回，这时候才使用骨架屏
          initialValues === undefined && spikeSessionId !== undefined ? (
            <Skeleton active/>
          ) : (
            <ProForm<{
              name: string;
              company?: string;
              useMode?: string;
            }>
              layout={'vertical'}
              //表单项初始化，用于数据的回显
              initialValues={initialValues}
              onFinish={(values) => handleSubmit(values)}
              params={{}}
            >
              <ProFormText
                name="name"
                width={"md"}
                label="秒杀时间段名称"
                placeholder="请输入秒杀时间段名称"
                rules={[
                  {required: true, message: '秒杀时间段名称不能为空'},
                ]}
              />
              <ProFormTimePicker
                width={"md"}
                name="startTime"
                label="每日开始时间"
                rules={[
                  {required: true, message: '开始时间不能为空'},
                ]}
              />
              <ProFormTimePicker
                width={"md"}
                name="endTime"
                label="每日结束时间"
                rules={[
                  {required: true, message: '结束时间不能为空'},
                ]}
              />
              {
                spikeSessionId === undefined ? (
                  <ProFormRadio.Group
                    name="status"
                    label="是否启用"
                    rules={[
                      {required: true, message: '请选择是否启用'},
                    ]}
                    options={[
                      {
                        label: '禁用',
                        value: '0',
                      },
                      {
                        label: '启用',
                        value: '1',
                      },
                    ]}
                  />
                ) : ('')
              }
            </ProForm>
          )
        }
      </Modal>
    </div>
  );
};

export default CreateOrEdit;
