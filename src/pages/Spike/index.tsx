import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, message, Switch, Tag} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {getSpikePromotionList, upOrDown} from "@/services/ant-design-pro/api/spike";
import CreateOrEdit from "@/pages/Spike/components/CreateOrEdit";
import {history} from "umi";

type SpikePromotionItem = {
  id: number;
  title: string;
  status: number;
  startDate: string;
  endDate: string;
};

const Spike = () => {
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spikePromotionId, setSpikePromotionId] = useState(0);

  const isShowModal = (show: boolean, editId?: any) => {
    setSpikePromotionId(editId);
    setIsModalOpen(show);
  };

  const handleRequest = async (params = {}, sort: any, filter: any) => {
    const response = await getSpikePromotionList(params);
    console.log(response);
    return {
      data: response.spikePromotionPage.records,
      success: response.code === 0,
      total: response.spikePromotionPage.total,
    };
  }

  const handleUpOrDown = async (id: number) => {
    const response = await upOrDown(id);
    if (response.code === 0) {
      message.success("操作成功");
      actionRef.current?.reload();
    } else {
      message.error("操作失败");
    }
  }

  const columns: ProColumns<SpikePromotionItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '活动标题',
      dataIndex: 'title',
    },
    {
      title: '活动状态',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => {
        switch (record.status) {
          case 1:
            return <Tag color={'green'}>活动已开始</Tag>;
          default:
            return <Tag color={'red'}>活动未开始</Tag>;
        }
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      hideInSearch: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      hideInSearch: true,
    },
    {
      title: '上线/下线',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="上线"
          unCheckedChildren="下线"
          defaultChecked={record.status == 1}
          onChange={() => handleUpOrDown(record.id)}
        />
      ),
      valueType: 'radio',
      valueEnum: {
        0: {text: '下线'},
        1: {text: '上线'},
      },
    },
    {
      title: '操作',
      hideInSearch: true,
      render: (_, record) => <a onClick={() => isShowModal(true, record.id)}>编辑</a>,
    },
  ];

  return (
    <PageContainer>
      <ProTable<SpikePromotionItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={handleRequest}
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
        headerTitle="用户列表"
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={() => {history.push('/spikeTimePeriod')}}
          >
            秒杀时间段列表
          </Button>,
          <Button
            key="button"
            icon={<PlusOutlined/>}
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
            spikePromotionId={spikePromotionId}
          />
        ) : (
          ''
        )
      }
    </PageContainer>
  );
};

export default Spike;
