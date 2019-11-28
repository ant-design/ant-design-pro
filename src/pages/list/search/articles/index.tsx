import { Button, Card, Col, Form, Icon, List, Row, Select, Tag } from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import ArticleListContent from './components/ArticleListContent';
import { StateType } from './model';
import { ListItemDataType } from './data.d';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
import styles from './style.less';

const { Option } = Select;
const FormItem = Form.Item;

const pageSize = 5;

interface ArticlesProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  listAndsearchAndarticles: StateType;
  loading: boolean;
}

class Articles extends Component<ArticlesProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'listAndsearchAndarticles/fetch',
      payload: {
        count: 5,
      },
    });
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  fetchMore = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'listAndsearchAndarticles/appendFetch',
      payload: {
        count: pageSize,
      },
    });
  };

  render() {
    const {
      form,
      listAndsearchAndarticles: { list },
      loading,
    } = this.props;
    const { getFieldDecorator } = form;

    const owners = [
      {
        id: 'wzj',
        name: '我自己',
      },
      {
        id: 'wjh',
        name: '吴家豪',
      },
      {
        id: 'zxx',
        name: '周星星',
      },
      {
        id: 'zly',
        name: '赵丽颖',
      },
      {
        id: 'ym',
        name: '姚明',
      },
    ];

    const IconText: React.FC<{
      type: string;
      text: React.ReactNode;
    }> = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore = list.length > 0 && (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.fetchMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loading ? (
            <span>
              <Icon type="loading" /> 加载中...
            </span>
          ) : (
            '加载更多'
          )}
        </Button>
      </div>
    );

    return (
      <>
        <Card bordered={false}>
          <Form layout="inline">
            <StandardFormRow title="所属类目" block style={{ paddingBottom: 11 }}>
              <FormItem>
                {getFieldDecorator('category')(
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
                  </TagSelect>,
                )}
              </FormItem>
            </StandardFormRow>
            <StandardFormRow title="owner" grid>
              <Row>
                <Col>
                  <FormItem {...formItemLayout}>
                    {getFieldDecorator('owner', {
                      initialValue: ['wjh', 'zxx'],
                    })(
                      <Select
                        mode="multiple"
                        style={{ maxWidth: 286, width: '100%' }}
                        placeholder="选择 owner"
                      >
                        {owners.map(owner => (
                          <Option key={owner.id} value={owner.id}>
                            {owner.name}
                          </Option>
                        ))}
                      </Select>,
                    )}
                    <a className={styles.selfTrigger} onClick={this.setOwner}>
                      只看自己的
                    </a>
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
            <StandardFormRow title="其它选项" grid last>
              <Row gutter={16}>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="活跃用户">
                    {getFieldDecorator(
                      'user',
                      {},
                    )(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="lisa">李三</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                  <FormItem {...formItemLayout} label="好评度">
                    {getFieldDecorator(
                      'rate',
                      {},
                    )(
                      <Select placeholder="不限" style={{ maxWidth: 200, width: '100%' }}>
                        <Option value="good">优秀</Option>
                      </Select>,
                    )}
                  </FormItem>
                </Col>
              </Row>
            </StandardFormRow>
          </Form>
        </Card>
        <Card
          style={{ marginTop: 24 }}
          bordered={false}
          bodyStyle={{ padding: '8px 32px 32px 32px' }}
        >
          <List<ListItemDataType>
            size="large"
            loading={list.length === 0 ? loading : false}
            rowKey="id"
            itemLayout="vertical"
            loadMore={loadMore}
            dataSource={list}
            renderItem={item => (
              <List.Item
                key={item.id}
                actions={[
                  <IconText key="star" type="star-o" text={item.star} />,
                  <IconText key="like" type="like-o" text={item.like} />,
                  <IconText type="message" key="message" text={item.message} />,
                ]}
                extra={<div className={styles.listItemExtra} />}
              >
                <List.Item.Meta
                  title={
                    <a className={styles.listItemMetaTitle} href={item.href}>
                      {item.title}
                    </a>
                  }
                  description={
                    <span>
                      <Tag>Ant Design</Tag>
                      <Tag>设计语言</Tag>
                      <Tag>蚂蚁金服</Tag>
                    </span>
                  }
                />
                <ArticleListContent data={item} />
              </List.Item>
            )}
          />
        </Card>
      </>
    );
  }
}

const WarpForm = Form.create<ArticlesProps>({
  onValuesChange({ dispatch }: ArticlesProps) {
    // 表单项变化时请求数据
    // 模拟查询表单生效
    dispatch({
      type: 'listAndsearchAndarticles/fetch',
      payload: {
        count: 8,
      },
    });
  },
})(Articles);

export default connect(
  ({
    listAndsearchAndarticles,
    loading,
  }: {
    listAndsearchAndarticles: StateType;
    loading: { models: { [key: string]: boolean } };
  }) => ({
    listAndsearchAndarticles,
    loading: loading.models.listAndsearchAndarticles,
  }),
)(WarpForm);
