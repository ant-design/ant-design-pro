import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button, Input } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import styles from './SearchList.less';

const { Option } = Select;
const FormItem = Form.Item;

@Form.create()
@connect(state => ({
  list: state.list,
}))
export default class SearchList extends Component {
  state = {
    count: 3,
    showLoadMore: true,
    loadingMore: false,
  }

  componentDidMount() {
    const { count } = this.state;
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count,
      },
    });
  }

  setOwner = () => {
    const { form } = this.props;
    form.setFieldsValue({
      owner: ['wzj'],
    });
  }

  handleLoadMore = () => {
    const { count } = this.state;
    const nextCount = count + 5;

    this.setState({
      count: nextCount,
      loadingMore: true,
    });
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: nextCount,
      },
      callback: () => {
        this.setState({
          loadingMore: false,
        });

        // fack count
        if (nextCount < 10) {
          this.setState({
            showLoadMore: false,
          });
        }
      },
    });
  }

  handleTabChange = (key) => {
    const { dispatch } = this.props;
    switch (key) {
      case 'docs':
        dispatch(routerRedux.push('/list/search'));
        break;
      case 'app':
        dispatch(routerRedux.push('/list/filter-card-list'));
        break;
      case 'project':
        dispatch(routerRedux.push('/list/cover-card-list'));
        break;
      default:
        break;
    }
  }

  render() {
    const { showLoadMore, loadingMore } = this.state;
    const { form, list: { list, loading } } = this.props;
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

    const tabList = [
      {
        key: 'doc',
        tab: '文章',
      },
      {
        key: 'app',
        tab: '应用',
      },
      {
        key: 'project',
        tab: '项目',
      },
    ];

    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    );

    const ListContent = ({ data: { content, updatedAt, avatar, owner, href } }) => (
      <div className={styles.listContent}>
        <p>{content}</p>
        <div>
          <Avatar src={avatar} size="small" /><a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD hh:mm')}</em>
        </div>
      </div>
    );

    const pageHeaderContent = (
      <div style={{ textAlign: 'center' }}>
        <Input.Search
          placeholder="请输入"
          enterButton="搜索"
          size="large"
          onSearch={this.handleFormSubmit}
          style={{ width: 522 }}
        />
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 12 },
      },
    };

    const loadMore = showLoadMore ? (
      <div style={{ textAlign: 'center', marginTop: 16 }}>
        <Button onClick={this.handleLoadMore} style={{ paddingLeft: 48, paddingRight: 48 }}>
          {loadingMore && (<span><Icon type="loading" /> 加载中...</span>)}
          {!loadingMore && (<span>加载更多</span>)}
        </Button>
      </div>
    ) : null;

    return (
      <PageHeaderLayout
        title="搜索列表"
        content={pageHeaderContent}
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <div>
          <Card bordered={false}>
            <Form layout="inline">
              <StandardFormRow title="所属类目" block>
                <FormItem>
                  {getFieldDecorator('category')(
                    <TagSelect onChange={this.handleFormSubmit} expandable>
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
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow
                title="owner"
                grid
              >
                <Row>
                  <Col lg={16} md={24} sm={24} xs={24}>
                    <FormItem>
                      {getFieldDecorator('owner', {
                        initialValue: ['wjh', 'zxx'],
                      })(
                        <Select
                          mode="multiple"
                          style={{ maxWidth: 286, width: '100%' }}
                          placeholder="选择 owner"
                        >
                          {
                            owners.map(owner =>
                              <Option key={owner.id} value={owner.id}>{owner.name}</Option>
                            )
                          }
                        </Select>
                      )}
                      <a className={styles.selfTrigger} onClick={this.setOwner}>只看自己的</a>
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
              <StandardFormRow
                title="其它选项"
                grid
                last
              >
                <Row gutter={16}>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label="活跃用户"
                    >
                      {getFieldDecorator('user', {})(
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="不限"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="lisa">李三</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label="好评度"
                    >
                      {getFieldDecorator('rate', {})(
                        <FormItem
                          label="好评度"
                        >
                          {getFieldDecorator('rate', {})(
                            <Select
                              onChange={this.handleFormSubmit}
                              placeholder="不限"
                              style={{ maxWidth: 200, width: '100%' }}
                            >
                              <Option value="good">优秀</Option>
                            </Select>
                          )}
                        </FormItem>
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
            bodyStyle={{ padding: '12px 24px 32px 24px' }}
          >
            <List
              size="large"
              loading={!loadingMore && loading}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[
                    <IconText type="star-o" text={item.star} />,
                    <IconText type="like-o" text={item.like} />,
                    <IconText type="message" text={item.message} />,
                  ]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={(
                      <a className={styles.listItemMetaTitle} href={item.href}>{item.title}</a>
                    )}
                    description={<span><Tag>Ant Design</Tag><Tag>设计语言</Tag><Tag>蚂蚁金服</Tag></span>}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
