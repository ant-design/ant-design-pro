import {
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import {
  Avatar,
  Card,
  Col,
  Dropdown,
  Form,
  List,
  Row,
  Select,
  Tooltip,
} from 'antd';
import numeral from 'numeral';
import type { FC } from 'react';
import React from 'react';
import { categoryOptions } from '../../mock';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ListItemDataType } from './data.d';
import { queryFakeList } from './service';
import useStyles from './style.style';
export function formatWan(val: number) {
  const v = val * 1;
  if (!v || Number.isNaN(v)) return '';
  let result: React.ReactNode = val;
  if (val > 10000) {
    result = (
      <span>
        {Math.floor(val / 10000)}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}
const formItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const CardInfo: React.FC<{
  activeUser: React.ReactNode;
  newUser: React.ReactNode;
}> = ({ activeUser, newUser }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.cardInfo}>
      <div>
        <p>活跃用户</p>
        <p>{activeUser}</p>
      </div>
      <div>
        <p>新增用户</p>
        <p>{newUser}</p>
      </div>
    </div>
  );
};
export const Applications: FC<Record<string, any>> = () => {
  const { styles } = useStyles();
  const { data, loading, run } = useRequest((values: any) => {
    console.log('form data', values);
    return queryFakeList({
      count: 8,
    });
  });

  const list = data?.list || [];

  return (
    <div className={styles.filterCardList}>
      <Card bordered={false}>
        <Form
          onValuesChange={(_, values) => {
            run(values);
          }}
        >
          <StandardFormRow
            title="所属类目"
            block
            style={{
              paddingBottom: 11,
            }}
          >
            <Form.Item name="category">
              <TagSelect expandable>
                {categoryOptions
                  .filter(
                    (
                      category,
                    ): category is { value: string | number; label: string } =>
                      category.value !== undefined && category.value !== null,
                  )
                  .map((category) => (
                    <TagSelect.Option
                      value={category.value}
                      key={category.value}
                    >
                      {category.label}
                    </TagSelect.Option>
                  ))}
              </TagSelect>
            </Form.Item>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="author" label="作者">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                    options={[
                      {
                        label: '王昭君',
                        value: 'lisa',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <Form.Item {...formItemLayout} name="rate" label="好评度">
                  <Select
                    placeholder="不限"
                    style={{
                      maxWidth: 200,
                      width: '100%',
                    }}
                    options={[
                      {
                        label: '优秀',
                        value: 'good',
                      },
                      {
                        label: '普通',
                        value: 'normal',
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <br />
      <List<ListItemDataType>
        rowKey="id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        loading={loading}
        dataSource={list}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card
              hoverable
              bodyStyle={{
                paddingBottom: 20,
              }}
              actions={[
                <Tooltip key="download" title="下载">
                  <DownloadOutlined />
                </Tooltip>,
                <Tooltip key="edit" title="编辑">
                  <EditOutlined />
                </Tooltip>,
                <Tooltip title="分享" key="share">
                  <ShareAltOutlined />
                </Tooltip>,
                <Dropdown
                  key="ellipsis"
                  menu={{
                    items: [
                      {
                        key: '1',
                        title: '1st menu item',
                      },
                      {
                        key: '2',
                        title: '2st menu item',
                      },
                    ],
                  }}
                >
                  <EllipsisOutlined />
                </Dropdown>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar size="small" src={item.avatar} />}
                title={item.title}
              />
              <div>
                <CardInfo
                  activeUser={formatWan(item.activeUser)}
                  newUser={numeral(item.newUser).format('0,0')}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};
export default Applications;
