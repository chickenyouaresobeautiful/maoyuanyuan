import { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Avatar, Switch, message } from 'antd';
import { getUserList, updateUserStatus } from '@/services/ant-design-pro/api/user';
import CreateOrEdit from '@/pages/Member/components/CreateOrEdit';

type MemberItem = {
  id: number;
  username: string;
  phone: number;
  status: number;
  register_time: string;
  avatar: string;
};

const handleUpdateLockStatus = async (uid: any) => {
  const res = await updateUserStatus(uid);
  console.log(res);
  if (res.code === 0) {
    message.success('操作成功');
  } else {
    message.error('操作失败');
  }
};

const Member = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uid, setUid] = useState(undefined);
  const actionRef = useRef<ActionType>();

  const isShowModal = (show: boolean, editId?: any) => {
    setUid(editId);
    setIsModalOpen(show);
  };

  const columns: ProColumns<MemberItem>[] = [
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => <Avatar size={32} src={record.avatar} icon={<UserOutlined />} />,
    },
    {
      title: '用户名',
      colSize: 0.8,
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      colSize: 0.8,
      dataIndex: 'email',
    },
    {
      title: '手机号',
      colSize: 0.8,
      dataIndex: 'phone',
    },
    {
      title: '是否禁用',
      dataIndex: 'status',
      hideInSearch: true,
      render: (_, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren="禁用"
          defaultChecked={record.status === 0}
          onChange={() => handleUpdateLockStatus(record.id)}
        />
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'registerTime',
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
      <ProTable<MemberItem>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          const response = await getUserList(params);
          console.log(response);
          return {
            data: response.userPage.records,
            success: response.code === 0,
            total: response.userPage.total,
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
        headerTitle="用户列表"
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
            uid={uid}
          />
        ) : (
          ''
        )
      }
    </PageContainer>
  );
};

export default Member;
