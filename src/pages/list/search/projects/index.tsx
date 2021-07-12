import { Card, Col, Form, List, Row, Select, Typography } from 'antd';
import moment from 'moment';
import type { FC } from 'react';
import { useRequest } from 'umi';
import AvatarList from './components/AvatarList';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import type { ListItemDataType } from './data.d';
import { queryFakeList } from './service';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;
const { Paragraph } = Typography;

const getKey = (id: string, index: number) => `${id}-${index}`;

const Projects: FC = () => {
  const { data, loading, run } = useRequest((values: any) => {
    console.log('form data', values);
    return queryFakeList({
      count: 8,
    });
  });

  const list = data?.list || [];

  const cardList = list && (
    <List<ListItemDataType>
      rowKey="id"
      loading={loading}
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Card className={styles.card} hoverable cover={<img alt={item.title} src={item.cover} />}>
            <Card.Meta
              title={<a>{item.title}</a>}
              description={
                <Paragraph className={styles.item} ellipsis={{ rows: 2 }}>
                  {item.subDescription}
                </Paragraph>
              }
            />
            <div className={styles.cardItemContent}>
              <span>{moment(item.updatedAt).fromNow()}</span>
              <div className={styles.avatarList}>
                <AvatarList size="small">
                  {item.members.map((member, i) => (
                    <AvatarList.Item
                      key={getKey(item.id, i)}
                      src={member.avatar}
                      tips={member.name}
                    />
                  ))}
                </AvatarList>
              </div>
            </div>
          </Card>
        </List.Item>
      )}
    />
  );

  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <div className={styles.coverCardList}>
      <Card bordered={false}>
        <Form
          layout="inline"
          onValuesChange={(_, values) => {
            // 表单项变化时请求数据
            // 模拟查询表单生效
            run(values);
          }}
        >
          <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
            <FormItem name="category">
              <TagSelect expandable>
                <TagSelect.Option value="cat1">类目一</TagSelect.Option>
                <TagSelect.Option value="cat2">类目二</TagSelect.Option>
                <TagSelect.Option value="cat3">类目三</TagSelect.Option>
                <TagSelect.Option value="cat4">类目四</TagSelect.Option>
                <TagSelect.Option value="cat5">类目五</TagSelect.Option>
                <TagSelect.Option value="cat6">类目六</TagSelect.Option>
                <TagSelect.Option value="cat7">类目七</TagSelect.Option>
                <TagSelect.Option value="cat8">类目八</TagSelect.Option>
                <TagSelect.Option value="cat9">类目九</TagSelect.Option>
                <TagSelect.Option value="cat10">类目十</TagSelect.Option>
                <TagSelect.Option value="cat11">类目十一</TagSelect.Option>
                <TagSelect.Option value="cat12">类目十二</TagSelect.Option>
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="其它选项" grid last>
            <Row gutter={16}>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="作者" name="author">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="lisa">王昭君</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col lg={8} md={10} sm={10} xs={24}>
                <FormItem {...formItemLayout} label="好评度" name="rate">
                  <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                    <Option value="good">优秀</Option>
                    <Option value="normal">普通</Option>
                  </Select>
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>
      <div className={styles.cardList}>{cardList}</div>
    </div>
  );
};

export default Projects;
