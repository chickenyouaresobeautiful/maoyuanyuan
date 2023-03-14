import { message, Modal, Select } from 'antd';
import { ProForm, ProFormItem, ProFormText } from '@ant-design/pro-components';
import { ship } from '@/services/ant-design-pro/api/order';

interface ShipProps {
  isModalOpen2: boolean;
  showShip: (show: boolean, orderId?: string) => void;
  actionRef: any;
  orderNo: string;
}

const Ship = (props: ShipProps) => {
  const { isModalOpen2, showShip, actionRef, orderNo } = props;

  //控制表单的提交
  const handleSubmit = async (values: any) => {
    console.log(values);
    const res = await ship(values, orderNo);
    if (res.code === 0) {
      message.success(`发货成功`);
      //刷新表格
      actionRef.current?.reload();
      //关闭模态框
      showShip(false);
    } else {
      message.error(`发货成功`);
    }
  };

  return (
    <div>
      <Modal title="发货" footer={null} open={isModalOpen2} onCancel={() => showShip(false)}>
        <ProForm<{
          name: string;
          company?: string;
          useMode?: string;
        }>
          layout={'vertical'}
          onFinish={(values) => handleSubmit(values)}
          params={{}}
        >
          <ProFormItem
            name="expressType"
            label="快递类型"
            rules={[{ required: true, message: '请选择要发送的快递类型!' }]}
          >
            <Select
              placeholder="请选择要发送的快递类型"
              // onChange={onGenderChange}
              allowClear
            >
              <Select.Option value="SF">顺丰</Select.Option>
              <Select.Option value="YTO">圆通</Select.Option>
              <Select.Option value="YD">韵达</Select.Option>
            </Select>
          </ProFormItem>
          <ProFormText
            name="expressNo"
            label="快递单号"
            placeholder="请输入快递单号"
            rules={[{ required: true, message: '请输入快递单号!' }]}
          />
        </ProForm>
      </Modal>
    </div>
  );
};

export default Ship;
