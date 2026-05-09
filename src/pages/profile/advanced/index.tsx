import {
  DingdingOutlined,
  DownOutlined,
  EllipsisOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import {
  GridContent,
  PageContainer,
  RouteContext,
} from '@ant-design/pro-components';
import { useQuery } from '@tanstack/react-query';
import type { DescriptionsProps } from 'antd';
import {
  Badge,
  Button,
  Card,
  Descriptions,
  Divider,
  Dropdown,
  Empty,
  Popover,
  Space,
  Statistic,
  Steps,
  Table,
  Tooltip,
} from 'antd';
import type { IconRenderType, StepsProps } from 'antd/es/steps';
import type { FC } from 'react';
import React, { useState } from 'react';
import type { AdvancedProfileData } from './data.d';
import { queryAdvancedProfile } from './service';
import useStyles from './style.style';

const action = (
  <RouteContext.Consumer>
    {({ isMobile }) => {
      if (isMobile) {
        return (
          <Dropdown.Button
            type="primary"
            icon={<DownOutlined />}
            menu={{
              items: [
                {
                  key: '1',
                  label: '操作一',
                },
                {
                  key: '2',
                  label: '操作二',
                },
                {
                  key: '3',
                  label: '操作三',
                },
              ],
            }}
            placement="bottomRight"
          >
            主操作
          </Dropdown.Button>
        );
      }
      return (
        <Space>
          <Space.Compact>
            <Button>操作一</Button>
            <Button>操作二</Button>
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    label: '选项一',
                  },
                  {
                    key: '2',
                    label: '选项二',
                  },
                  {
                    key: '3',
                    label: '选项三',
                  },
                ],
              }}
              placement="bottomRight"
            >
              <Button>
                <EllipsisOutlined />
              </Button>
            </Dropdown>
          </Space.Compact>
          <Button type="primary">主操作</Button>
        </Space>
      );
    }}
  </RouteContext.Consumer>
);

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
const descriptionItems: DescriptionsProps['items'] = [
  { key: '1', label: '创建人', children: '曲丽丽' },
  { key: '2', label: '订购产品', children: 'XX 服务' },
  { key: '3', label: '创建时间', children: '2017-07-07' },
  { key: '4', label: '关联单据', children: <a href="#">12421</a> },
  { key: '5', label: '生效日期', children: '2017-07-07 ~ 2017-08-08' },
  { key: '6', label: '备注', children: '请于两个工作日内确认' },
];
const userInfoItems: DescriptionsProps['items'] = [
  { key: '1', label: '用户姓名', children: '付小小' },
  { key: '2', label: '会员卡号', children: '32943898021309809423' },
  { key: '3', label: '身份证', children: '3321944288191034921' },
  { key: '4', label: '联系方式', children: '18112345678' },
  {
    key: '5',
    label: '联系地址',
    children: '曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口',
  },
];
const infoGroupItems: DescriptionsProps['items'] = [
  { key: '1', label: '某某数据', children: '725' },
  { key: '2', label: '该数据更新时间', children: '2017-08-08' },
  {
    key: '3',
    label: (
      <span>
        某某数据
        <Tooltip title="数据说明">
          <InfoCircleOutlined
            style={{ color: 'rgba(0, 0, 0, 0.43)', marginLeft: 4 }}
          />
        </Tooltip>
      </span>
    ),
    children: '725',
  },
  { key: '4', label: '该数据更新时间', children: '2017-08-08' },
];
const groupItems1: DescriptionsProps['items'] = [
  { key: '1', label: '负责人', children: '林东东' },
  { key: '2', label: '角色码', children: '1234567' },
  { key: '3', label: '所属部门', children: 'XX公司 - YY部' },
  { key: '4', label: '过期时间', children: '2017-08-08' },
  {
    key: '5',
    label: '描述',
    children:
      '这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...',
  },
];
const groupItems2: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '学名',
    children:
      'Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..',
  },
];
const groupItems3: DescriptionsProps['items'] = [
  { key: '1', label: '负责人', children: '付小小' },
  { key: '2', label: '角色码', children: '1234568' },
];
const customDot: IconRenderType = (dot: React.ReactNode, { active }) => {
  if (active) {
    const popoverContent = (
      <div
        style={{
          width: 160,
        }}
      >
        吴加号
        <span
          style={{
            float: 'right',
          }}
        >
          <Badge
            status="default"
            text={
              <span
                style={{
                  color: 'rgba(0, 0, 0, 0.45)',
                }}
              >
                未响应
              </span>
            }
          />
        </span>
        <div
          style={{
            marginTop: 4,
          }}
        >
          耗时：2小时25分钟
        </div>
      </div>
    );
    return (
      <Popover
        placement="topLeft"
        arrow={{
          pointAtCenter: true,
        }}
        content={popoverContent}
      >
        <span>{dot}</span>
      </Popover>
    );
  }
  return dot;
};

type AdvancedState = {
  operationKey: 'tab1' | 'tab2' | 'tab3';
  tabActiveKey: string;
};
const Advanced: FC = () => {
  const { styles } = useStyles();

  const extra = (
    <div className={styles.moreInfo}>
      <Statistic title="状态" value="待审批" />
      <Statistic title="订单金额" value={568.08} prefix="¥" />
    </div>
  );
  const description = (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions
          className={styles.headerList}
          size="small"
          column={isMobile ? 1 : 2}
          items={descriptionItems}
        />
      )}
    </RouteContext.Consumer>
  );
  const desc1 = (
    <div className={styles.stepDescription}>
      曲丽丽
      <DingdingOutlined
        style={{
          marginLeft: 8,
        }}
      />
      <div>2016-12-12 12:32</div>
    </div>
  );
  const desc2 = (
    <div className={styles.stepDescription}>
      周毛毛
      <DingdingOutlined
        style={{
          color: '#00A0E9',
          marginLeft: 8,
        }}
      />
      <div>
        <a href="#">催一下</a>
      </div>
    </div>
  );
  const stepsItems: StepsProps['items'] = [
    { title: '创建项目', content: desc1 },
    { title: '部门初审', content: desc2 },
    { title: '财务复核' },
    { title: '完成' },
  ];

  const [tabStatus, seTabStatus] = useState<AdvancedState>({
    operationKey: 'tab1',
    tabActiveKey: 'detail',
  });

  const { data = {}, isLoading: loading } = useQuery<AdvancedProfileData>({
    queryKey: ['profile-advanced'],
    queryFn: () => queryAdvancedProfile().then((res) => res.data),
  });
  const { advancedOperation1, advancedOperation2, advancedOperation3 } = data;
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
  const onTabChange = (tabActiveKey: string) => {
    seTabStatus({
      ...tabStatus,
      tabActiveKey,
    });
  };
  const onOperationTabChange = (key: string) => {
    seTabStatus({
      ...tabStatus,
      operationKey: key as 'tab1',
    });
  };
  return (
    <PageContainer
      title="单号：234231029431"
      extra={action}
      className={styles.pageHeader}
      content={description}
      extraContent={extra}
      tabActiveKey={tabStatus.tabActiveKey}
      onTabChange={onTabChange}
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
          <Card
            title="流程进度"
            style={{
              marginBottom: 24,
            }}
          >
            <RouteContext.Consumer>
              {({ isMobile }) => (
                <Steps
                  orientation={isMobile ? 'vertical' : 'horizontal'}
                  iconRender={customDot}
                  current={1}
                  items={stepsItems}
                />
              )}
            </RouteContext.Consumer>
          </Card>
          <Card
            title="用户信息"
            style={{
              marginBottom: 24,
            }}
            variant="borderless"
          >
            <Descriptions
              style={{
                marginBottom: 24,
              }}
              items={userInfoItems}
            />
            <Descriptions
              style={{
                marginBottom: 24,
              }}
              title="信息组"
              items={infoGroupItems}
            />
            <h4
              style={{
                marginBottom: 16,
              }}
            >
              信息组
            </h4>
            <Card type="inner" title="多层级信息组">
              <Descriptions title="组名称" items={groupItems1} />
              <Divider size="large" />
              <Descriptions title="组名称" column={1} items={groupItems2} />
              <Divider size="large" />
              <Descriptions title="组名称" items={groupItems3} />
            </Card>
          </Card>
          <Card
            title="用户近半年来电记录"
            style={{
              marginBottom: 24,
            }}
            variant="borderless"
          >
            <Empty />
          </Card>
          <Card
            variant="borderless"
            tabList={operationTabList}
            onTabChange={onOperationTabChange}
          >
            {contentList[tabStatus.operationKey] as React.ReactNode}
          </Card>
        </GridContent>
      </div>
    </PageContainer>
  );
};
export default Advanced;
