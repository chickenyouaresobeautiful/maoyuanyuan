import { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Image, Switch, message } from 'antd';
import { getGoods, isOn, isRecommend } from '@/services/ant-design-pro/api/goods';
import CreateOrEdit from '@/pages/Goods/components/CreateOrEdit';

type GoodsItem = {
  id: number;
  title: string;
  createTime: string;
  cover: string;
  isOn: number;
  isRecommend: number;
};

const handleIsOn = async (goodId: any) => {
  const res = await isOn(goodId);
  if (res.code === 0) {
    message.success('操作成功');
  } else {
    message.error('操作失败');
  }
};

const handleIsRecommend = async (goodId: any) => {
  const res = await isRecommend(goodId);
  if (res.code === 0) {
    message.success('操作成功');
  } else {
    message.error('操作失败');
  }
};

const Goods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goodsId, setGoodsId] = useState(undefined);
  const actionRef = useRef<ActionType>();

  const isShowModal = (show: boolean, editId?: any) => {
    setGoodsId(editId);
    setIsModalOpen(show);
  };

  const columns: ProColumns<GoodsItem>[] = [
    {
      title: '商品图片',
      dataIndex: 'cover',
      hideInSearch: true,
      render: (_, record) => (
        <Image
          width={64}
          src={record.cover}
          placeholder={<Image preview={false} src={record.cover} width={200} />}
        />
      ),
    },
    {
      title: '标题',
      colSize: 0.8,
      dataIndex: 'title',
    },
    {
      title: '价格',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      hideInSearch: true,
    },
    {
      title: '销量',
      dataIndex: 'sales',
      hideInSearch: true,
    },
    {
      title: '是否上架',
      dataIndex: 'isOn',
      colSize: 0.8,
      render: (_, record) => (
        <Switch
          checkedChildren="已上架"
          unCheckedChildren="未上架"
          defaultChecked={record.isOn === 1}
          onChange={() => handleIsOn(record.id)}
        />
      ),
      valueType: 'radio',
      valueEnum: {
        1: { text: '已上架' },
        0: { text: '未上架' },
      },
    },
    {
      title: '是否推荐',
      dataIndex: 'isRecommend',
      colSize: 0.8,
      render: (_, record) => (
        <Switch
          checkedChildren="已推荐"
          unCheckedChildren="未推荐"
          defaultChecked={record.isRecommend === 1}
          onChange={() => handleIsRecommend(record.id)}
        />
      ),
      valueType: 'radio',
      valueEnum: {
        1: { text: '已推荐' },
        0: { text: '未推荐' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => <a onClick={() => isShowModal(true, record.id)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable<GoodsItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          const response = await getGoods(params);
          console.log(response);
          return {
            data: response.goodsPage.records,
            success: response.code === 0,
            total: response.goodsPage.total,
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
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => isShowModal(true)}
          >
            新建
          </Button>,
        ]}
      />

      {
        //模态框隐藏的时候卸载组件，模态框显示的时候挂载组件，出发子组件的生命周期
        isModalOpen ? (
          <CreateOrEdit
            isModalOpen={isModalOpen}
            isShowModal={isShowModal}
            actionRef={actionRef}
            goodsId={goodsId}
          />
        ) : (
          ''
        )
      }
    </PageContainer>
  );
};

export default Goods;
