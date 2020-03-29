import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Statistic,
  Descriptions,
  Divider,
  Dropdown,
  Menu,
  Popover,
  Steps,
  Table,
  Tooltip,
  Empty,
} from 'antd';
import { GridContent, PageHeaderWrapper, RouteContext } from '@ant-design/pro-layout';
import React, { Component, Fragment } from 'react';

import classNames from 'classnames';
import { connect, Dispatch } from 'umi';
import { AdvancedProfileData } from './data.d';
import styles from './style.less';

const { Step } = Steps;
const ButtonGroup = Button.Group;

const menu = (
  <Menu>
    <Menu.Item key="1">选项一</Menu.Item>
    <Menu.Item key="2">选项二</Menu.Item>
    <Menu.Item key="3">选项三</Menu.Item>
  </Menu>
);

const mobileMenu = (
  <Menu>
    <Menu.Item key="1">操作一</Menu.Item>
    <Menu.Item key="2">操作二</Menu.Item>
    <Menu.Item key="3">选项一</Menu.Item>
    <Menu.Item key="4">选项二</Menu.Item>
    <Menu.Item key="">选项三</Menu.Item>
  </Menu>
);

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            overlay={mobileMenu}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }
      return (
        <Fragment>
          <ButtonGroup>
            <Button>操作一</Button>
            <Button>操作二</Button>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </ButtonGroup>
          <Button type="primary">主操作</Button>
        </Fragment>
      );
    }}
  </RouteContext.Consumer>
);

const extra = (
  <div className={styles.moreInfo}>
    <Statistic title="状态" value="待审批" />
    <Statistic title="订单金额" value={568.08} prefix="¥" />
  </div>
);

const description = (
  <RouteContext.Consumer>
    {({ isMobile }) => (
      <Descriptions className={styles.headerList} size="small" column={isMobile ? 1 : 2}>
        <Descriptions.Item label="创建人">曲丽丽</Descriptions.Item>
        <Descriptions.Item label="订购产品">XX 服务</Descriptions.Item>
        <Descriptions.Item label="创建时间">2017-07-07</Descriptions.Item>
        <Descriptions.Item label="关联单据">
          <a href="">12421</a>
        </Descriptions.Item>
        <Descriptions.Item label="生效日期">2017-07-07 ~ 2017-08-08</Descriptions.Item>
        <Descriptions.Item label="备注">请于两个工作日内确认</Descriptions.Item>
      </Descriptions>
    )}
  </RouteContext.Consumer>
);

const desc1 = (
  <div className={classNames(styles.textSecondary, styles.stepDescription)}>
    <Fragment>
      曲丽丽
      <DingdingOutlined style={{ marginLeft: 8 }} />
    </Fragment>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className={styles.stepDescription}>
    <Fragment>
      周毛毛
      <DingdingOutlined style={{ color: '#00A0E9', marginLeft: 8 }} />
    </Fragment>
    <div>
      <a href="">催一下</a>
    </div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className={styles.textSecondary} style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className={styles.textSecondary} style={{ marginTop: 4 }}>
      耗时：2小时25分钟
    </div>
  </div>
);

const customDot = (
  dot: React.ReactNode,
  {
    status,
  }: {
    status: string;
  },
) => {
  if (status === 'process') {
    return (
      <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
        {dot}
      </Popover>
    );
  }
  return dot;
};

const operationTabList = [
  {
    key: 'tab1',
    tab: '操作日志一',
  },
  {
    key: 'tab2',
    tab: '操作日志二',
  },
  {
    key: 'tab3',
    tab: '操作日志三',
  },
];

const columns = [
  {
    title: '操作类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '操作人',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '执行结果',
    dataIndex: 'status',
    key: 'status',
    render: (text: string) => {
      if (text === 'agree') {
        return <Badge status="success" text="成功" />;
      }
      return <Badge status="error" text="驳回" />;
    },
  },
  {
    title: '操作时间',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
  },
];

interface AdvancedState {
  operationKey: string;
  tabActiveKey: string;
}

class Advanced extends Component<
  { loading: boolean; profileAndadvanced: AdvancedProfileData; dispatch: Dispatch<any> },
  AdvancedState
> {
  public state: AdvancedState = {
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profileAndadvanced/fetchAdvanced',
    });
  }

  onOperationTabChange = (key: string) => {
    this.setState({ operationKey: key });
  };

  onTabChange = (tabActiveKey: string) => {
    this.setState({ tabActiveKey });
  };

  render() {
    const { operationKey, tabActiveKey } = this.state;
    const { profileAndadvanced, loading } = this.props;
    const { advancedOperation1, advancedOperation2, advancedOperation3 } = profileAndadvanced;
    const contentList = {
      tab1: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation1}
          columns={columns}
        />
      ),
      tab2: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation2}
          columns={columns}
        />
      ),
      tab3: (
        <Table
          pagination={false}
          loading={loading}
          dataSource={advancedOperation3}
          columns={columns}
        />
      ),
    };
    return (
      <PageHeaderWrapper
        title="单号：234231029431"
        extra={action}
        className={styles.pageHeader}
        content={description}
        extraContent={extra}
        tabActiveKey={tabActiveKey}
        onTabChange={this.onTabChange}
        tabList={[
          {
            key: 'detail',
            tab: '详情',
          },
          {
            key: 'rule',
            tab: '规则',
          },
        ]}
      >
        <div className={styles.main}>
          <GridContent>
            <Card title="流程进度" style={{ marginBottom: 24 }}>
              <RouteContext.Consumer>
                {({ isMobile }) => (
                  <Steps
                    direction={isMobile ? 'vertical' : 'horizontal'}
                    progressDot={customDot}
                    current={1}
                  >
                    <Step title="创建项目" description={desc1} />
                    <Step title="部门初审" description={desc2} />
                    <Step title="财务复核" />
                    <Step title="完成" />
                  </Steps>
                )}
              </RouteContext.Consumer>
            </Card>
            <Card title="用户信息" style={{ marginBottom: 24 }} bordered={false}>
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label="用户姓名">付小小</Descriptions.Item>
                <Descriptions.Item label="会员卡号">32943898021309809423</Descriptions.Item>
                <Descriptions.Item label="身份证">3321944288191034921</Descriptions.Item>
                <Descriptions.Item label="联系方式">18112345678</Descriptions.Item>
                <Descriptions.Item label="联系地址">
                  曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口
                </Descriptions.Item>
              </Descriptions>
              <Descriptions style={{ marginBottom: 24 }} title="信息组">
                <Descriptions.Item label="某某数据">725</Descriptions.Item>
                <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
                <Descriptions.Item
                  label={
                    <span>
                      某某数据
                      <Tooltip title="数据说明">
                        <InfoCircleOutlined
                          style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
                        />
                      </Tooltip>
                    </span>
                  }
                >
                  725
                </Descriptions.Item>
                <Descriptions.Item label="该数据更新时间">2017-08-08</Descriptions.Item>
              </Descriptions>
              <h4 style={{ marginBottom: 16 }}>信息组</h4>
              <Card type="inner" title="多层级信息组">
                <Descriptions style={{ marginBottom: 16 }} title="组名称">
                  <Descriptions.Item label="负责人">林东东</Descriptions.Item>
                  <Descriptions.Item label="角色码">1234567</Descriptions.Item>
                  <Descriptions.Item label="所属部门">XX公司 - YY部</Descriptions.Item>
                  <Descriptions.Item label="过期时间">2017-08-08</Descriptions.Item>
                  <Descriptions.Item label="描述">
                    这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions style={{ marginBottom: 16 }} title="组名称" column={1}>
                  <Descriptions.Item label="学名">
                    Citrullus lanatus (Thunb.) Matsum. et
                    Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..
                  </Descriptions.Item>
                </Descriptions>
                <Divider style={{ margin: '16px 0' }} />
                <Descriptions title="组名称">
                  <Descriptions.Item label="负责人">付小小</Descriptions.Item>
                  <Descriptions.Item label="角色码">1234568</Descriptions.Item>
                </Descriptions>
              </Card>
            </Card>
            <Card title="用户近半年来电记录" style={{ marginBottom: 24 }} bordered={false}>
              <Empty />
            </Card>
            <Card
              className={styles.tabsCard}
              bordered={false}
              tabList={operationTabList}
              onTabChange={this.onOperationTabChange}
            >
              {contentList[operationKey]}
            </Card>
          </GridContent>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default connect(
  ({
    profileAndadvanced,
    loading,
  }: {
    profileAndadvanced: AdvancedProfileData;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    profileAndadvanced,
    loading: loading.effects['profileAndadvanced/fetchAdvanced'],
  }),
)(Advanced);
