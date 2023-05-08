import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {Button, message, Switch} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useRef, useState} from "react";
import {enableOrDisable, getSpikeTimePeriodList} from "@/services/ant-design-pro/api/spike";
import CreateOrEdit from "@/pages/SpikeTimePeriod/components/CreateOrEdit";


const Index = () => {
  const actionRef = useRef<ActionType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [spikeSessionId, setSpikeSessionId] = useState(0);

  const isShowModal = (show: boolean, editId?: any) => {
    setSpikeSessionId(editId);
    setIsModalOpen(show);
  };

  const handleRequest = async (params = {}, sort: any, filter: any) => {
    const response = await getSpikeTimePeriodList(params);
    console.log(response);
    return {
      data: response.spikePromotionSessionPage.records,
      success: response.code === 0,
      total: response.spikePromotionSessionPage.total,
    };
  }

  const handleEnableOrDisable = async (id: number) => {
    const response = await enableOrDisable(id);
    if (response.code === 0) {
      message.success("操作成功");
      actionRef.current?.reload();
    } else {
      message.error("操作失败");
    }
  }

  const columns: ProColumns<API.SpikeTimePeriodItem>[] = [
    {
      title: '编号',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '秒杀时间段名称',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '每日开始时间',
      dataIndex: 'startTime',
      hideInSearch: true,
    },
    {
      title: '每日结束时间',
      dataIndex: 'endTime',
      hideInSearch: true,
    },
    {
      title: '启用',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          defaultChecked={record.status == 1}
          onChange={() => handleEnableOrDisable(record.id)}
        />
      ),
      valueType: 'radio',
      valueEnum: {
        0: {text: '禁用'},
        1: {text: '启用'},
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
      <ProTable<API.SpikeTimePeriodItem>
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
        search={false}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="用户列表"
        toolBarRender={() => [
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
            spikeSessionId={spikeSessionId}
          />
        ) : (
          ''
        )
      }
    </PageContainer>
  );
};

export default Index;
