import { DingdingOutlined } from '@ant-design/icons';
import { GridContent } from '@ant-design/pro-components';
import { Button, Card, Descriptions, Result, Steps } from 'antd';
import { Fragment } from 'react';
import useStyles from './index.style';

const { Step } = Steps;

export default () => {
  const { styles } = useStyles();
  const desc1 = (
    <div className={styles.title}>
      <div
        style={{
          margin: '8px 0 4px',
        }}
      >
        <span>曲丽丽</span>
        <DingdingOutlined
          style={{
            marginLeft: 8,
            color: '#00A0E9',
          }}
        />
      </div>
      <div>2016-12-12 12:32</div>
    </div>
  );
  const desc2 = (
    <div
      style={{
        fontSize: 12,
      }}
      className={styles.title}
    >
      <div
        style={{
          margin: '8px 0 4px',
        }}
      >
        <span>周毛毛</span>
        <a href="">
          <DingdingOutlined
            style={{
              color: '#00A0E9',
              marginLeft: 8,
            }}
          />
          <span>催一下</span>
        </a>
      </div>
    </div>
  );
  const content = (
    <>
      <Descriptions title="项目名称">
        <Descriptions.Item label="项目 ID">23421</Descriptions.Item>
        <Descriptions.Item label="负责人">曲丽丽</Descriptions.Item>
        <Descriptions.Item label="生效时间">2016-12-12 ~ 2017-12-12</Descriptions.Item>
      </Descriptions>
      <br />
      <Steps progressDot current={1}>
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              创建项目
            </span>
          }
          description={desc1}
        />
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              部门初审
            </span>
          }
          description={desc2}
        />
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              财务复核
            </span>
          }
        />
        <Step
          title={
            <span
              style={{
                fontSize: 14,
              }}
            >
              完成
            </span>
          }
        />
      </Steps>
    </>
  );
  const extra = (
    <Fragment>
      <Button type="primary">返回列表</Button>
      <Button>查看项目</Button>
      <Button>打印</Button>
    </Fragment>
  );
  return (
    <GridContent>
      <Card bordered={false}>
        <Result
          status="success"
          title="提交成功"
          subTitle="提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。"
          extra={extra}
          style={{
            marginBottom: 16,
          }}
        >
          {content}
        </Result>
      </Card>
    </GridContent>
  );
};
