import React, { Fragment, PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, Popover, Table, Tabs, BackTop } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import { conversionAttr, getApiFlowData } from './ApiCreate/util';
import { getUserId } from '@/utils/authority';

import DescriptionList from '@/components/DescriptionList';
import { getGroupName, getItemValue, getName } from '@/utils/masterData';

const { TabPane } = Tabs;
const forms = ['front', 'back', 'backAttr'];
const { Description } = DescriptionList;

const fieldLabels = {
  front: {
    groupId: '分组',
    name: '名称',
    serviceType: '服务类型',
    requestUrl: '请求地址',
    protocol: '协议',
    reqMethod: '请求Method',
    apiType: 'Api范围',
  },
  back: {
    serviceType: '服务类型',
    url: '落地方地址',
    reqPath: '落地方路径',
    protocol: '协议',
    reqMethod: '请求Method',
    connectTimeout: '连接超时时间（秒）',
    socketTimeout: '处理超时时间（秒）',
    orgId: '服务提供者',
    authType: '安全认证',
  },
  backAttr: {
    userName: 'user Name',
    userPassword: 'user Password',
    tokenStr: 'token Str',
    tokenUser: 'token User',
    tokenPassword: 'token Password',
    tokenUrl: 'token Url',
    trustStore: 'trustStore path',
    trustStorePassword: 'trustStore Password',
    keyStore: 'keyStore path',
    keyStorePassword: 'keyStore Password',
    ssl: 'SSL证书校验',
  },
};

const columns = [
  {
    title: '出／入参',
    dataIndex: 'backendType',
  },
  {
    title: '执行顺序',
    dataIndex: 'serviceSeq',
  },
  {
    title: 'url',
    dataIndex: 'url',
  },
];

const columnsOrg = [
  {
    title: '编号',
    dataIndex: 'apiId',
  },
  {
    title: '名称',
    dataIndex: 'orgName',
  },
];

// const tableData = [
//   {
//     backEndId: '1',
//     serviceSeq: '1',
//     backendType: 'in',
//     url: 'com.ai.odc.changeParam',
//   },
//   {
//     backEndId: '2',
//     serviceSeq: '2',
//     backendType: 'in',
//     url: 'http://odc.ai.com/changeParam',
//   },
//   {
//     backEndId: '3',
//     serviceSeq: '4',
//     backendType: 'out',
//     url: 'com.ai.odc.changeParam',
//   },
// ];

@connect(({ apiCreateModel, groupModel, orgModel, loading }) => ({
  apiService: apiCreateModel.apiService,
  groupList: groupModel.groupList,
  orgList: orgModel.orgList,
  submitting: loading.effects['apiCreateModel/submitStepForm'],
}))
@Form.create()
class ApiDetail extends PureComponent {
  state = {
    width: '100%',
    apiFlowData: {},
    data: {
      back: {},
    },
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });

    const { location, dispatch } = this.props;
    const { state } = location;
    // console.log("location state:",state);
    const { apiId } = state || { apiId: 105 };
    // 分组列表
    dispatch({
      type: 'groupModel/allGroupList',
    });
    const { userId } = getUserId();
    dispatch({
      type: 'orgModel/allOrgList',
      payload: { orgType: '0,1', userId: userId },
    });
    // 请求获取apiInfo详情
    this.getApi(apiId);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getApi = apiId => {
    const { dispatch } = this.props;
    if (apiId !== -1) {
      const payload = {};
      payload.data = {};
      payload.data.info = {};
      payload.data.info.apiId = apiId;
      dispatch({
        type: 'apiCreateModel/apiInfo',
        payload,
        callback: resp => {
          this.setBaseInfo(resp, dispatch);
        },
      });
    } else {
      // dispatch({
      //   type: 'apiCreateModel/initForAdd',
      // });
      // this.setBaseInfo({data:{}},dispatch);
      router.push('/exception/403');
    }
  };

  //  设置apiInfo数据格式
  setBaseInfo = resp => {
    const { data } = resp;
    const { groupList, orgList } = this.props;
    console.log('setBaseInfo', groupList);
    // 定义请求信息转化
    data.groupIdTitle = data.groupId ? getGroupName(groupList, data.groupId) : null;
    data.serviceTypeTitle = data.serviceType
      ? getItemValue('apiService', 'service_type', data.serviceType)
      : null;
    data.reqMethodTitle = data.reqMethod
      ? getItemValue('common', 'req_method', data.reqMethod)
      : null;
    data.apiTypeTitle = data.apiType ? getItemValue('apiService', 'api_type', data.apiType) : null;

    // 落地方服务信息数组转为对象
    const apiServiceBackend = data.apiServiceBackends.find(obj => obj.backendType === 'endpoint');
    const { apiServiceBackendAttrs } = apiServiceBackend;
    const conversionAttrObj = conversionAttr(apiServiceBackendAttrs);
    const apiServiceBackendMembers = data.apiServiceBackends.filter(
      obj => obj.backendType !== 'endpoint'
    );
    // 落地方服务信息转化
    const apiServiceBackendFormat = { ...apiServiceBackend, ...conversionAttrObj };
    apiServiceBackendFormat.serviceTypeTitle = apiServiceBackendFormat.serviceType
      ? getItemValue('apiService', 'service_type', apiServiceBackendFormat.serviceType)
      : null;
    apiServiceBackendFormat.reqMethodTitle = apiServiceBackendFormat.reqMethod
      ? getItemValue('common', 'req_method', apiServiceBackendFormat.reqMethod)
      : null;
    apiServiceBackendFormat.apiTypeTitle = apiServiceBackendFormat.apiType
      ? getItemValue('apiService', 'api_type', apiServiceBackendFormat.apiType)
      : null;
    apiServiceBackendFormat.authTypeTitle = apiServiceBackendFormat.authType
      ? getItemValue('apiServiceBackendAttr', 'auth_type', apiServiceBackendFormat.authType)
      : null;
    apiServiceBackendFormat.sslTitle = apiServiceBackendFormat.ssl === 1 ? '开' : '关';
    apiServiceBackendFormat.orgIdTitle = apiServiceBackendFormat.orgId
      ? getName(orgList, apiServiceBackendFormat.orgId, 'id', 'orgName')
      : null;

    // 设置安全认证下的信息
    // Basic认证
    if (apiServiceBackendFormat.authType === 'basicAuth') {
      const nameAttr = apiServiceBackendFormat.apiServiceBackendAttrs.filter(
        item => item.attrSpecCode === 'userName'
      );
      const nameObj = conversionAttr(nameAttr);
      apiServiceBackendFormat.userName = nameObj.userName;
      const passwordAttr = apiServiceBackendFormat.apiServiceBackendAttrs.filter(
        item => item.attrSpecCode === 'userPassword'
      );
      const passwordObj = conversionAttr(passwordAttr);
      apiServiceBackendFormat.userPassword = passwordObj.userPassword;
    }
    // 固定Token认证
    if (apiServiceBackendFormat.authType === 'fixedToken') {
      const nameAttr = apiServiceBackendFormat.apiServiceBackendAttrs.filter(
        item => item.attrSpecCode === 'tokenStr'
      );
      const nameObj = conversionAttr(nameAttr);
      apiServiceBackendFormat.tokenStr = nameObj.tokenStr;
    }
    // 动态Token认证
    if (apiServiceBackendFormat.authType === 'dyncToken') {
      const tokenUserAttr = apiServiceBackendFormat.apiServiceBackendAttrs.filter(
        item => item.attrSpecCode === 'tokenUser'
      );
      const tokenUserObj = conversionAttr(tokenUserAttr);
      apiServiceBackendFormat.tokenUser = tokenUserObj.tokenUser;
      const tokenPasswordAttr = apiServiceBackendFormat.apiServiceBackendAttrs.filter(
        item => item.attrSpecCode === 'tokenPassword'
      );
      const tokenPasswordObj = conversionAttr(tokenPasswordAttr);
      apiServiceBackendFormat.tokenPassword = tokenPasswordObj.tokenPassword;
      const tokenUrlAttr = apiServiceBackendFormat.apiServiceBackendAttrs.filter(
        item => item.attrSpecCode === 'tokenUrl'
      );
      const tokenUrlObj = conversionAttr(tokenUrlAttr);
      apiServiceBackendFormat.tokenUrl = tokenUrlObj.tokenUrl;
    }

    data.back = apiServiceBackendFormat;
    this.setState({ data }); //  设置state中的resp的值
  };

  getErrorInfo = () => {
    const errorList = [];
    forms.forEach(value => {
      const subErrorList = this.getErrorInfoByPrefixList(value) || [];
      errorList.push(...subErrorList);
    });
    const errorInfo = this.getErrorInfoByPrefix(errorList);
    return errorInfo;
  };

  getErrorInfoByPrefixList = prefix => {
    const {
      form: { getFieldError },
    } = this.props;
    // const errors = getFieldsError();
    const errors = getFieldError(prefix);
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    // // console.log(errors,errorCount);
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = fieldKey => {
      const realFieldKey = `${prefix}.${fieldKey}`;
      const labelNode = document.querySelector(`label[for="${realFieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    // // console.log(errors);
    const errorList =
      Object.keys(errors).map(key => {
        // // console.log(errors[key],fieldLabels.front[key]);
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels.front[key]}</div>
          </li>
        );
      }) || [];
    return errorList.filter(item => item !== null);
  };

  getErrorInfoByPrefix = errorList => {
    // console.log(errorList);
    const errorCount = errorList ? errorList.length : 0;
    if (errorCount === 0) {
      return null;
    }
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={trigger => trigger.parentNode}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0];
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  changeTab = key => {
    console.log(key);
    if (key === 'flow') {
      const { form } = this.props;
      const values = form.getFieldsValue();
      const apiFlowData = getApiFlowData(values);
      this.setState({ apiFlowData });
      console.log('====:', apiFlowData);
    }
  };

  returnPage = () => {
    router.push({
      pathname: `/apiGateway/apiList`,
    });
  };

  render() {
    const {
      form: { getFieldDecorator, getFieldValue },
      apiService,
    } = this.props;
    console.log('apidetails:render-this.props', this.props);
    console.log('apidetails:render-this.state', this.state);
    const { width, apiFlowData, data } = this.state;
    const { back } = data;

    // const apiServiceBackendMembers1  = apiService.apiServiceBackends.filter((obj)=>obj.backendType!=="endpoint");
    const apiServiceBackendMembers =
      apiService && apiService.apiServiceBackends
        ? apiService.apiServiceBackends.map(item => ({ ...item, key: item.serviceSeq }))
        : [];
    const apiServiceEndPoint = apiServiceBackendMembers.filter(
      obj => obj.backendType === 'endpoint'
    );
    console.log(
      'apiServiceBackendMembers:',
      apiServiceBackendMembers,
      'apiServiceEndPoint:',
      apiServiceEndPoint
    );
    return (
      <PageHeaderWrapper>
        <Card title="定义请求信息" className={styles.card} bordered={false}>
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <Description term={fieldLabels.front.groupId}>{data.groupIdTitle}</Description>
            <Description term={fieldLabels.front.name}>{apiService.name}</Description>
            <Description term={fieldLabels.front.requestUrl}>{apiService.requestUrl}</Description>
            <Description term={fieldLabels.front.serviceType}>{data.serviceTypeTitle}</Description>
            <Description term={fieldLabels.front.reqMethod}>{data.reqMethodTitle}</Description>
            <Description term={fieldLabels.front.apiType}>{data.apiTypeTitle}</Description>
          </DescriptionList>
        </Card>
        <Card title="落地方服务信息" className={styles.card} bordered={false}>
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <Description term={fieldLabels.back.serviceType}>{back.serviceTypeTitle}</Description>
            <Description term={fieldLabels.back.url}>{back.url}</Description>
            <Description term={fieldLabels.back.reqPath}>{back.reqPath}</Description>
            <Description term={fieldLabels.back.reqMethod}>{back.reqMethodTitle}</Description>
            <Description term={fieldLabels.back.connectTimeout}>{back.connectTimeout}</Description>
            <Description term={fieldLabels.back.connectTimeout}>{back.connectTimeout}</Description>
            <Description term={fieldLabels.back.orgId}>{back.orgIdTitle}</Description>
            <Description term={fieldLabels.backAttr.ssl}>{back.sslTitle}</Description>
            <Description term={fieldLabels.back.authType}>{back.authTypeTitle}</Description>
          </DescriptionList>
          <DescriptionList
            style={{
              display: back.authType === 'basicAuth' ? 'block' : 'none',
            }}
          >
            <Description term={fieldLabels.backAttr.userName}>{back.userName}</Description>
            <Description term={fieldLabels.backAttr.userPassword}>{back.userPassword}</Description>
          </DescriptionList>
          <DescriptionList
            style={{
              display: back.authType === 'fixedToken' ? 'block' : 'none',
            }}
          >
            <Description term={fieldLabels.backAttr.tokenStr}>{back.tokenStr}</Description>
          </DescriptionList>
          <DescriptionList
            style={{
              display: back.authType === 'dyncToken' ? 'block' : 'none',
            }}
          >
            <Description term={fieldLabels.backAttr.tokenUser}>{back.tokenUser}</Description>
            <Description term={fieldLabels.backAttr.tokenPassword}>
              {back.tokenPassword}
            </Description>
            <Description term={fieldLabels.backAttr.tokenUrl}>{back.tokenUrl}</Description>
          </DescriptionList>
        </Card>
        <Tabs defaultActiveKey="1" onChange={this.changeTab}>
          <TabPane tab="Table" key="table">
            <Card title="高级配置" bordered={false}>
              <Table columns={columns} dataSource={apiServiceBackendMembers} pagination={false} />
            </Card>
          </TabPane>
          <TabPane tab="Org Table" key="flow">
            <Card title="高级配置" bordered={false}>
              <Table columns={columnsOrg} dataSource={data.apiServiceOrgs} pagination={false} />
            </Card>
          </TabPane>
        </Tabs>

        <BackTop />
        <FooterToolbar style={{ width }}>
          <Button type="primary" onClick={this.returnPage}>
            返回
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ApiDetail;
