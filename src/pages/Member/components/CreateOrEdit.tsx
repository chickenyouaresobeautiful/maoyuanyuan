import {useEffect, useState} from 'react';
import {addUser, getUserInfo, updateUser} from '@/services/ant-design-pro/api/user';
import {message, Modal, Skeleton} from 'antd';
import {ProForm, ProFormText, ProFormUploadButton} from '@ant-design/pro-components';

interface CreateOrEditProps {
  isModalOpen: boolean;
  isShowModal: (show: boolean, editId?: any) => void;
  actionRef: any;
  uid: any;
}

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const CreateOrEdit = (props: CreateOrEditProps) => {
  const [initialValues, setInitialValues] = useState<API.UserEcho>();
  const {isModalOpen, isShowModal, actionRef, uid} = props;
  const type = uid === undefined ? '添加' : '修改';

  useEffect(() => {
    const userInfo = async () => {
      //根据uid来判断添加与修改，只有是修改时才发送请求查数据回显
      if (uid !== undefined) {
        const response = await getUserInfo(uid);
        setInitialValues({
          username: response.userInfo.username,
          password: response.userInfo.password,
          phone: response.userInfo.phone,
          email: response.userInfo.email,
        });
      }
    };
    userInfo();
    return () => {
    };
  }, []);

  //控制表单的提交
  const handleSubmit = async (values: any) => {
    await waitTime(2000);
    const response = uid === undefined ? await addUser(values) : await updateUser(uid, values);
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
        title={`${type}用户`}
        open={isModalOpen}
        onCancel={() => isShowModal(false)}
        footer={null}
        //模态框关闭时清空里面的内容
        destroyOnClose={true}
      >
        {
          //只有是编辑的情况下，要查询的数据还没有返回，这时候才使用骨架屏
          initialValues === undefined && uid !== undefined ? (
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
                name="username"
                label="用户名"
                placeholder="请输入用户名"
                rules={[
                  {required: true, message: '用户名不能为空'},
                  {min: 5, message: '用户名长度不得少于5位'},
                  {max: 16, message: '用户名长度不得超过16位'},
                ]}
              />
              <ProFormText.Password
                name="password"
                label="密码"
                placeholder="请输入密码"
                rules={[
                  {required: true, message: '密码不能为空'},
                  {min: 5, message: '密码最少5位'},
                ]}
              />
              <ProFormText
                name="email"
                label="邮箱"
                placeholder="请输入邮箱"
                rules={[
                  {required: true, message: '邮箱不能为空'},
                  {type: 'email', message: '邮箱格式不正确'},
                ]}
              />
              <ProFormText
                name="phone"
                label="手机号"
                placeholder="请输入手机号"
                rules={[{required: true, message: '手机号不能为空'}]}
              />
              <ProFormUploadButton
                name="avatar"
                label="头像"
                max={1}
                valuePropName={'fileList'}
                fieldProps={{
                  name: 'avatar',
                  listType: 'picture-card',
                }}
                action="api/third/oss/uploadAvatar"
              />
            </ProForm>
          )
        }
      </Modal>
    </div>
  );
};

export default CreateOrEdit;
