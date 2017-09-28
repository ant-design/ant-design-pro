import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Card, Select, List, Tag, Icon, Avatar, Row, Col, Button } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import SearchInput from '../../components/SearchInput';
import styles from './SearchList.less';

const Option = Select.Option;
const FormItem = Form.Item;
const TagOption = TagSelect.Option;
const TagExpand = TagSelect.Expand;

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
          <Avatar src={avatar} size="small" />{owner} 发布在 <a href={href}>{href}</a>
          <em>{moment(updatedAt).format('YYYY-MM-DD hh:mm')}</em>
        </div>
      </div>
    );

    const pageHeaderContent = (
      <div style={{ textAlign: 'center' }}>
        <SearchInput onSearch={this.handleFormSubmit} />
      </div>
    );

    const formItemLayout = {
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const loadMore = showLoadMore ? (
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <Button onClick={this.handleLoadMore}>
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
                    <TagSelect onChange={this.handleFormSubmit}>
                      <TagOption value="cat1">类目一</TagOption>
                      <TagOption value="cat2">类目二</TagOption>
                      <TagOption value="cat3">类目三</TagOption>
                      <TagOption value="cat4">类目四</TagOption>
                      <TagExpand>
                        <TagOption value="cat5">类目五</TagOption>
                        <TagOption value="cat6">类目六</TagOption>
                      </TagExpand>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow
                title="Owner"
                grid
              >
                <Row>
                  <Col lg={16} md={16} sm={20} xs={20}>
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
                      <a onClick={this.setOwner} style={{ marginLeft: 8 }}>只看自己的</a>
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
                  <Col lg={8} md={10} sm={10} xs={24}>
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
                  <Col lg={8} md={10} sm={10} xs={24}>
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
          <Card style={{ marginTop: 16 }} bordered={false}>
            <List
              loading={loading}
              rowKey="id"
              itemLayout="vertical"
              loadMore={loadMore}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  key={item.id}
                  actions={[<IconText type="star-o" text={item.star} />, <IconText type="like-o" text={item.like} />, <IconText type="message" text={item.message} />]}
                  extra={<div className={styles.listItemExtra} />}
                >
                  <List.Item.Meta
                    title={<a href={item.href}>{item.title}</a>}
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
