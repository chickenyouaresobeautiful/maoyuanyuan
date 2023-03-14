import { PageContainer } from '@ant-design/pro-components';
import { Alert, Card, Col, Row, Space, Statistic, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'umi';
import styles from './index.less';
import { getIKunCount } from '@/services/ant-design-pro/api/user';
import { getGoodsCount } from '@/services/ant-design-pro/api/goods';

const CodePreview: React.FC = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

const Welcome: React.FC = () => {
  const intl = useIntl();
  const [userData, setUserData] = useState({});
  const [goodsData, setGoodsData] = useState({});

  useEffect(() => {
    const iKunCount = async () => {
      const resData = await getIKunCount();
      setUserData(resData);
    };

    const goodsCount = async () => {
      const resData = await getGoodsCount();
      setGoodsData(resData);
    };

    iKunCount();
    goodsCount();
    return () => {};
  }, []);

  return (
    <PageContainer>
      <Space direction={'vertical'} size={'middle'} style={{ display: 'flex' }}>
        <Card>
          <Alert
            message={intl.formatMessage({
              id: 'pages.welcome.alertMessage',
              defaultMessage: 'Faster and stronger heavy-duty components have been released.',
            })}
            type="success"
            showIcon
            banner
            style={{
              margin: -12,
              marginBottom: 24,
            }}
          />
          <Typography.Text strong>
            <a
              href="https://procomponents.ant.design/components/table"
              rel="noopener noreferrer"
              target="__blank"
            >
              <FormattedMessage id="pages.welcome.link" defaultMessage="Index" />
            </a>
          </Typography.Text>
          <CodePreview>欢迎来到ikun集中营</CodePreview>
        </Card>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="用户数"
                value={userData.count as number}
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic
                title="商品数"
                value={goodsData.count as number}
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false}>
              <Statistic title="订单数" value={9} valueStyle={{ color: '#13b9cf' }} />
            </Card>
          </Col>
        </Row>
      </Space>
    </PageContainer>
  );
};

export default Welcome;
