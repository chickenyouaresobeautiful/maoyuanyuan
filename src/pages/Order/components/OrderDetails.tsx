import { useEffect, useState } from 'react';
import { Image, List, Modal } from 'antd';
import { getOrderDetails } from '@/services/ant-design-pro/api/order';

interface OrderDetailsProps {
  isModalOpen1: boolean;
  showDetails: (show: boolean, orderId?: string) => void;
  orderNo: string;
}

const OrderDetails = (props: OrderDetailsProps) => {
  const [orderDetailsList, setOrderDetailsList] = useState<API.OrderDetailsList>();
  const { isModalOpen1, showDetails, orderNo } = props;

  useEffect(() => {
    const detailsList = async () => {
      const res = await getOrderDetails(orderNo);
      setOrderDetailsList(res);
    };

    detailsList();
    return () => {};
  }, []);

  return (
    <div>
      <Modal title="订单详情" footer={null} open={isModalOpen1} onCancel={() => showDetails(false)}>
        <List
          itemLayout="horizontal"
          dataSource={orderDetailsList?.orderDetails}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Image src={item.goodsCover} width={100} height={100} />}
                title={item.goodsTitle}
                description={`单价:${item.goodsPrice} · 数量:${item.goodsNum} · 总价:${item.totalPrice}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default OrderDetails;
