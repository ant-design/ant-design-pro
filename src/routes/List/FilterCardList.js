import React, { PureComponent } from 'react';
import numeral from 'numeral';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Row, Col, Form, Card, Select, Icon, Avatar, List, Tooltip } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import StandardFormRow from '../../components/StandardFormRow';
import TagSelect from '../../components/TagSelect';
import SearchInput from '../../components/SearchInput';

import styles from './FilterCardList.less';

const { Option } = Select;
const FormItem = Form.Item;
const TagOption = TagSelect.Option;
const TagExpand = TagSelect.Expand;

const formatWan = (val) => {
  const v = val * 1;
  if (!v || isNaN(v)) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = <span>{result}<em className={styles.wan}>万</em></span>;
  }
  return result;
};

/* eslint react/no-array-index-key: 0 */
@Form.create()
@connect(state => ({
  list: state.list,
}))
export default class FilterCardList extends PureComponent {
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
    const { list: { list, loading }, form } = this.props;
    const { getFieldDecorator } = form;

    const tabList = [
      {
        key: 'doc',
        tab: '文章',
      },
      {
        key: 'app',
        tab: '应用',
        default: true,
      },
      {
        key: 'project',
        tab: '项目',
      },
    ];

    const CardInfo = ({ activeUser, newUser }) => (
      <div className={styles.cardInfo}>
        <div>
          <p>活跃用户</p>
          <p>{activeUser}</p>
          <span />
        </div>
        <div>
          <p>新增用户</p>
          <p>{newUser}</p>
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

    return (
      <PageHeaderLayout
        title="带筛选卡片列表"
        content={pageHeaderContent}
        tabList={tabList}
        onTabChange={this.handleTabChange}
      >
        <div className={styles.filterCardList}>
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
                title="其它选项"
                grid
                last
              >
                <Row gutter={16}>
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
          <List
            rowKey="id"
            style={{ marginTop: 16 }}
            grid={{ gutter: 16, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }}
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item key={item.id}>
                <Card
                  actions={[
                    <Tooltip title="复制"><Icon type="copy" /></Tooltip>,
                    <Tooltip title="用户"><Icon type="solution" /></Tooltip>,
                    <Tooltip title="设置"><Icon type="setting" /></Tooltip>,
                    <Tooltip title="删除"><Icon type="delete" /></Tooltip>,
                  ]}
                >
                  <Card.Meta
                    avatar={<Avatar size="large" src={item.avatar} />}
                    title={item.title}
                  />
                  <div className={styles.cardItemContent}>
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
      </PageHeaderLayout>
    );
  }
}
