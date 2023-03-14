import { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Tag } from 'antd';
import { getOrderList } from '@/services/ant-design-pro/api/order';
import OrderDetails from '@/pages/Order/components/OrderDetails';
import Ship from './components/Ship';

type OrderItem = {
  id: number;
  orderNo: string;
  userEntity: any;
  amount: number;
  status: number;
  addressId: number;
  expressType: string;
  expressNo: string;
  payTime: string;
  payType: string;
  tradeNo: string;
  createTime: string;
  updateTime: string;
};

const Order = () => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [orderNo, setOrderNo] = useState<any>();
  const actionRef = useRef<ActionType>();

  const showDetails = (show: boolean, orderId?: string) => {
    setIsModalOpen1(show);
    setOrderNo(orderId);
  };

  const showShip = (show: boolean, orderId?: string) => {
    setIsModalOpen2(show);
    setOrderNo(orderId);
  };

  const columns: ProColumns<OrderItem>[] = [
    {
      title: '单号',
      dataIndex: 'orderNo',
    },
    {
      title: '创建者',
      hideInSearch: true,
      dataIndex: 'userEntity',
      render: (_, record) => <Tag color={'purple'}>{record.userEntity.username}</Tag>,
    },
    {
      title: '金额',
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => {
        switch (record.status) {
          case 1:
            return <Tag color={'cyan'}>下单</Tag>;
          case 2:
            return <Tag color={'green'}>支付</Tag>;
          case 3:
            return <Tag color={'gold'}>发货</Tag>;
          case 4:
            return <Tag color={'orange'}>收货</Tag>;
          default:
            return <Tag color={'volcano'}>过期</Tag>;
        }
      },
    },
    {
      title: '支付时间',
      dataIndex: 'payTime',
      hideInSearch: true,
    },
    {
      title: '支付类型',
      dataIndex: 'payType',
      hideInSearch: true,
    },
    {
      title: '支付单号',
      dataIndex: 'tradeNo',
    },
    {
      title: '操作',
      valueType: 'option',
      hideInSearch: true,
      render: (_, record) => [
        <a key={'detail'} onClick={() => showDetails(true, record.orderNo)}>
          详情
        </a>,
        <a key={'ship'} onClick={() => showShip(true, record.orderNo)}>
          发货
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <ProTable<OrderItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          const response = await getOrderList(params);
          console.log(response);
          return {
            data: response.orderPage.records,
            success: response.code === 0,
            total: response.orderPage.total,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="商品列表"
      />
      {
        //模态框隐藏的时候卸载组件，模态框显示的时候挂载组件，出发子组件的生命周期
        isModalOpen1 ? (
          <OrderDetails isModalOpen1={isModalOpen1} showDetails={showDetails} orderNo={orderNo} />
        ) : (
          ''
        )
      }
      {
        <Ship
          isModalOpen2={isModalOpen2}
          showShip={showShip}
          actionRef={actionRef}
          orderNo={orderNo}
        />
      }
    </PageContainer>
  );
};

export default Order;
