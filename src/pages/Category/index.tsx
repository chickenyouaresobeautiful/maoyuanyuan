import {ActionType, PageContainer, ProColumns, ProTable} from "@ant-design/pro-components";
import {deleteCategory, getCategories} from "@/services/ant-design-pro/api/category";
import {useRef, useState} from "react";
import {Button, message, Popconfirm} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import CreateOrEdit from "@/pages/Category/components/CreateOrEdit";

const Category = () => {
    const [category, setCategory] = useState<API.CategoryList[] | undefined>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [catId, setCatId] = useState(0)
    const actionRef = useRef<ActionType>();

    const isShowModal = (show: boolean, id?: any) => {
      setIsModalOpen(show);
      setCatId(id);
    };

    const handleGetCategory = async (params = {}, sort?: any, filter?: any) => {
      const {categoryList, code} = await getCategories();
      console.log('res:', categoryList);
      const newCategoryList = categoryList?.map(item => {
        if (item.parentCid == 0) {
          item.children = item.children?.map(secondItem => {
            return {...secondItem, key: secondItem.catId};
          });
        }
        return {...item, key: item.catId};
      });
      setCategory(newCategoryList);
      return {
        data: categoryList,
        success: code === 0,
        total: categoryList?.length,
      };
    }

    const confirm = async (id: number, children?: API.CategoryList[]) => {
      if (children !== undefined) {
        message.error("该分类下有子分类，请先删除所有子分类")
        return;
      }
      const response = await deleteCategory(id);
      if (response.code === 0) {
        message.success("删除成功");
        actionRef.current?.reload();
      } else {
        message.error("删除失败");
      }
    };

    const cancel = () => {
      message.error('取消删除');
    };


    const columns: ProColumns<API.CategoryList>[] = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        hideInSearch: true,
      },
      {
        title: '操作',
        hideInSearch: true,
        render: (_, record) => [
          record.catLevel !== 3 ? <a key={"add"} onClick={() => isShowModal(true, record.catId)}> 添加子分类</a> : '',
          <Popconfirm
            title={"此操作将会删除该分类，是否继续？"}
            onConfirm={() => confirm(record.catId, record.children)}
            onCancel={cancel}
            okText="确认"
            cancelText="取消"
            key={"delete"}
          >
            <a> 删除</a>
          </Popconfirm>,
        ]
      },
    ];

    return (
      <PageContainer>
        <ProTable<API.CategoryList>
          search={false}
          columns={columns}
          actionRef={actionRef}
          request={handleGetCategory}
          dataSource={category}
          headerTitle="分类管理"
          toolBarRender={() => [
            <Button
              type="primary"
              key="primary"
              icon={<PlusOutlined/>}
              onClick={() => isShowModal(true)}
            >
              添加一级分类
            </Button>,
          ]}
        />
        {
          //模态框隐藏的时候卸载组件，模态框显示的时候挂载组件，出发子组件的生命周期
          isModalOpen ? (
            <CreateOrEdit
              isModalOpen={isModalOpen}
              isShowModal={isShowModal}
              catId={catId}
              actionRef={actionRef}
            />
          ) : (
            ''
          )
        }
      </PageContainer>
    );
  }
;

export default Category;
