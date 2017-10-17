import React, { PureComponent } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Row, Col, Form, Card, Select, List, Input } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import AvatarList from '../../components/AvatarList';

import styles from './CoverCardList.less';

const { Option } = Select;
const FormItem = Form.Item;
const TagOption = TagSelect.Option;
const TagExpand = TagSelect.Expand;

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(state => ({
  list: state.list,
}))
export default class CoverCardList extends PureComponent {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  handleFormSubmit = () => {
    const { form, dispatch } = this.props;
    // setTimeout 用于保证获取表单值是在所有表单字段更新完毕的时候
    setTimeout(() => {
      form.validateFields((err) => {
        if (!err) {
          // eslint-disable-next-line
          dispatch({
            type: 'list/fetch',
            payload: {
              count: 8,
            },
          });
        }
      });
    }, 0);
  }

  handleTabChange = (key) => {
    const { dispatch } = this.props;
    switch (key) {
      case 'doc':
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
    const { list: { list = [], loading }, form } = this.props;
    const { getFieldDecorator } = form;

    const cardList = list ? (
      <List
        rowKey="id"
        loading={loading}
        grid={{ gutter: 24, lg: 4, md: 3, sm: 2, xs: 1 }}
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Link>
              <Card
                hoverable
                cover={<img alt={item.title} src={item.cover} />}
              >
                <Card.Meta
                  title={item.title}
                  description={item.subDescription}
                />
                <div className={styles.cardItemContent}>
                  <span>{moment(item.updatedAt).fromNow()}</span>
                  <div className={styles.avatarList}>
                    <AvatarList size="small">
                      {
                        item.members.map((member, i) => (
                          <AvatarList.Item
                            key={`${item.id}-avatar-${i}`}
                            src={member.avatar}
                            tips={member.name}
                          />
                        ))
                      }
                    </AvatarList>
                  </div>
                </div>
              </Card>
            </Link>
          </List.Item>
        )}
      />
    ) : null;

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
        default: true,
      },
    ];

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
        sm: { span: 16 },
      },
    };

    return (
      <PageHeaderLayout
        title="带封面的卡片列表"
        content={pageHeaderContent}
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.coverCardList}>
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
                      <TagOption value="cat5">类目五</TagOption>
                      <TagOption value="cat6">类目六</TagOption>
                      <TagOption value="cat7">类目七</TagOption>
                      <TagOption value="cat8">类目八</TagOption>
                      <TagOption value="cat9">类目九</TagOption>
                      <TagOption value="cat10">类目十</TagOption>
                      <TagExpand>
                        <TagOption value="cat11">类目十一</TagOption>
                        <TagOption value="cat12">类目十二</TagOption>
                      </TagExpand>
                    </TagSelect>
                  )}
                </FormItem>
              </StandardFormRow>
              <StandardFormRow
                title="其它选项"
                grid
                last
              >
                <Row gutter={24}>
                  <Col lg={8} md={10} sm={10} xs={24}>
                    <FormItem
                      {...formItemLayout}
                      label="作者"
                    >
                      {getFieldDecorator('author', {})(
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="不限"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="lisa">王昭君</Option>
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
                        <Select
                          onChange={this.handleFormSubmit}
                          placeholder="不限"
                          style={{ maxWidth: 200, width: '100%' }}
                        >
                          <Option value="good">优秀</Option>
                          <Option value="normal">普通</Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </StandardFormRow>
            </Form>
          </Card>
          <div className={styles.cardList}>
            { cardList }
          </div>
        </div>
      </PageHeaderLayout>
    );
  }
}
