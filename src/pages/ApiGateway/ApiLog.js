import React, {PureComponent} from 'react';
import {Card, Button, Form, Icon, Input, Popover, BackTop, message, Select} from 'antd';
import router from 'umi/router';
import {connect} from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from './style.less';
import SelectView from './SelectView';
import {getPayloadForApiLog} from './ApiCreate/util';
import {getItems} from '@/utils/masterData';

const {Option} = Select;

const forms = ['front', 'back', 'backAttr'];

const fieldLabels = {
  pathType: 'pathType',
  extReqOne: 'extReqOne',
  extReqTwo: 'extReqTwo',
  extReqThree: 'extReqThree',
  extRspOne: 'extRspOne',
  extRspTwo: 'extRspTwo',
  extRspThree: 'extRspThree',
  logLevel: 'logLevel',
  secretFlag: 'secretFlag',
};

@connect(({apiCreateModel, loading}) => ({
  apiService: apiCreateModel.apiService,
  submitting: loading.effects['apiCreateModel/submitStepForm'],
}))
@Form.create()
class ApiUpdate extends PureComponent {
  state = {
    width: '100%',
    apiOrderExt: {}
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, {passive: true});
    const {location} = this.props;
    const {state} = location;
    // console.log("location state:",state);
    const {apiId} = state || {apiId: 105};
    this.getApi(apiId);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getApi = apiId => {
    const {dispatch} = this.props;
    if (apiId !== -1) {
      const payload = {};
      payload.option = 4;
      payload.range = 1;
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
      router.push('/exception/403');
    }
  };

  setBaseInfo = resp => {
    const {data} = resp;
    const {apiOrderExt} = data;
    // const {extReq1,extReq2,extReq3,extRsp1,extRsp2,extRsp3,logLevel,pathType,secretFlag} = apiOrderExt;
    this.setState({
      apiOrderExt
    });
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
      form: {getFieldError},
    } = this.props;
    // const errors = getFieldsError();
    const errors = getFieldError(prefix);
    // // console.log(errors,errorCount);
    if (!errors) {
      return null;
    }
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (errorCount === 0) {
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
        const {width: stateWidth} = this.state;
        if (stateWidth !== width) {
          this.setState({width});
        }
      }
    });
  };

  validate = () => {
    const {
      form: {validateFieldsAndScroll},
      apiService,
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      // console.log("error in ui======:",error);
      if (!error) {
        console.log("==========api update submit values:", values);

        const apiInfo = getPayloadForApiLog(apiService, values);
        console.log("api update submit apiInfo:",apiInfo);
        // submit the values
        dispatch({
          type: 'apiCreateModel/submitStepForm',
          payload: apiInfo,
          callback: resp => {
            // this.getApi(resp.data.apiId);
            message.success("Submit finished!", 6,)
            this.setBaseInfo(resp, dispatch);
          },
        });
      }
    });
  };


  getOption(javaCode, javaKey) {
    const items = getItems(javaCode, javaKey);
    return this.getOptionWhithList(items);
  }

  getOptionWhithList = list => {
    if (!list || list.length < 1) {
      return (
        <Option key={0} value={0}>
          没有找到选项
        </Option>
      );
    }
    return list.map(item => (
      <Option key={item.itemCode} value={item.itemCode}>
        {item.itemValue}
      </Option>
    ));
  };

  render() {
    const {
      form: {getFieldDecorator},
      submitting,
    } = this.props;
    const {width, apiOrderExt} = this.state;

    let extReqOnePrefix='';
    let extReqOne='';
    let extReqTwoPrefix='';
    let extReqTwo='';
    let extReqThreePrefix='';
    let extReqThree='';
    let extRspOnePrefix='';
    let extRspOne='';
    let extRspTwoPrefix='';
    let extRspTwo='';
    let extRspThreePrefix='';
    let extRspThree='';
    if (apiOrderExt) {
      extReqOnePrefix = apiOrderExt.extReq1 ? apiOrderExt.extReq1.split('::')[0] : "";
      extReqOne = apiOrderExt.extReq1 ? apiOrderExt.extReq1.split('::')[1] : "";
      extReqTwoPrefix = apiOrderExt.extReq2 ? apiOrderExt.extReq2.split('::')[0] : "";
      extReqTwo = apiOrderExt.extReq2 ? apiOrderExt.extReq2.split('::')[1] : "";
      extReqThreePrefix = apiOrderExt.extReq3 ? apiOrderExt.extReq3.split('::')[0] : "";
      extReqThree = apiOrderExt.extReq3 ? apiOrderExt.extReq3.split('::')[1] : "";
      extRspOnePrefix = apiOrderExt.extRsp1 ? apiOrderExt.extRsp1.split('::')[0] : "";
      extRspOne = apiOrderExt.extRsp1 ? apiOrderExt.extRsp1.split('::')[1] : "";
      extRspTwoPrefix = apiOrderExt.extRsp2 ? apiOrderExt.extRsp2.split('::')[0] : "";
      extRspTwo = apiOrderExt.extRsp2 ? apiOrderExt.extRsp2.split('::')[1] : "";
      extRspThreePrefix = apiOrderExt.extRsp3 ? apiOrderExt.extRsp3.split('::')[0] : "";
      extRspThree = apiOrderExt.extRsp3 ? apiOrderExt.extRsp3.split('::')[1] : "";
    }

    const orderExtSel =
      getFieldDecorator('apiOrderExt.extReqOnePrefix', {
        initialValue: extReqOnePrefix,
      })(<Select style={{width: 95}}>{this.getOption("apiOrderExt", "query_type")}</Select>);
    const orderExtSelTwo =
      getFieldDecorator('apiOrderExt.extReqTwoPrefix', {
        initialValue: extReqTwoPrefix,
      })(<Select style={{width: 95}}>{this.getOption("apiOrderExt", "query_type")}</Select>);
    const orderExtSelThree =
      getFieldDecorator('apiOrderExt.extReqThreePrefix', {
        initialValue: extReqThreePrefix,
      })(<Select style={{width: 95}}>{this.getOption("apiOrderExt", "query_type")}</Select>);
    const orderExtRspSelOne =
      getFieldDecorator('apiOrderExt.extRspOnePrefix', {
        initialValue: extRspOnePrefix,
      })(<Select style={{width: 95}}>{this.getOption("apiOrderExt", "query_type")}</Select>);
    const orderExtRspSelTwo =
      getFieldDecorator('apiOrderExt.extRspTwoPrefix', {
        initialValue: extRspTwoPrefix,
      })(<Select style={{width: 95}}>{this.getOption("apiOrderExt", "query_type")}</Select>);
    const orderExtRspSelThree =
      getFieldDecorator('apiOrderExt.extRspThreePrefix', {
        initialValue: extRspThreePrefix,
      })(<Select style={{width: 95}}>{this.getOption("apiOrderExt", "query_type")}</Select>);

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 6
        },
      },
    };

    return (
      <PageHeaderWrapper
        onBack={() => window.history.back()}
        style={{height: '50px'}}
        title="Api Update"
      >
        <Card className={styles.card} bordered={false}>

          <Form {...formItemLayout}>

            <Form.Item label={fieldLabels.pathType} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.pathType', {
                initialValue: apiOrderExt?apiOrderExt.pathType:null,
                rules: [{required: true, message: 'Please select path type.'}],
              })(<SelectView javaCode="apiOrderExt" javaKey="path_type" />)}
            </Form.Item>

            <Form.Item label={fieldLabels.extReqOne} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.extReqOne', {
                initialValue: extReqOne,
                rules: [{required: true, message: 'Please input extReqOne'}],
              })(<Input addonBefore={orderExtSel} placeholder="Please input extReqOne" />)}
            </Form.Item>
            <Form.Item label={fieldLabels.extReqTwo} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.extReqTwo', {
                initialValue: extReqTwo,
                rules: [{required: true, message: 'Please input extReqTwo'}],
              })(<Input addonBefore={orderExtSelTwo} placeholder="Please input extReqTwo" />)}
            </Form.Item>
            <Form.Item label={fieldLabels.extReqThree} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.extReqThree', {
                initialValue: extReqThree,
                rules: [{required: true, message: 'Please input extReqThree'}],
              })(<Input addonBefore={orderExtSelThree} placeholder="Please input extReqThree" />)}
            </Form.Item>

            <Form.Item label={fieldLabels.extRspOne} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.extRspOne', {
                initialValue: extRspOne,
                rules: [{required: true, message: 'Please input extRspOne'}],
              })(<Input addonBefore={orderExtRspSelOne} placeholder="Please input extRspOne" />)}
            </Form.Item>
            <Form.Item label={fieldLabels.extRspTwo} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.extRspTwo', {
                initialValue: extRspTwo,
                rules: [{required: true, message: 'Please input extRspTwo'}],
              })(<Input addonBefore={orderExtRspSelTwo} placeholder="Please input extRspTwo" />)}
            </Form.Item>
            <Form.Item label={fieldLabels.extRspThree} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.extRspThree', {
                initialValue: extRspThree,
                rules: [{required: true, message: 'Please input extRspThree'}],
              })(<Input addonBefore={orderExtRspSelThree} placeholder="Please input extRspThree" />)}
            </Form.Item>

            <Form.Item label={fieldLabels.logLevel} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.logLevel', {
                initialValue: apiOrderExt?apiOrderExt.logLevel:null,
                rules: [{required: true, message: 'Please select log level.'}],
              })(<SelectView javaCode="apiOrderExt" javaKey="log_level" />)}
            </Form.Item>

            <Form.Item label={fieldLabels.secretFlag} {...tailFormItemLayout}>
              {getFieldDecorator('apiOrderExt.secretFlag', {
                initialValue: apiOrderExt?apiOrderExt.secretFlag:null,
                rules: [{required: true, message: 'Please select secret flag.'}],
              })(<SelectView javaCode="apiOrderExt" javaKey="secret_flag" />)}
            </Form.Item>

          </Form>
        </Card>

        <FooterToolbar style={{width}} extra={this.getErrorInfo()} extra2=''>
          <Button type="primary" block onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ApiUpdate;
