import React, { PureComponent} from 'react';
import { Card, Button, Form,  Input,  Tabs, BackTop,message,Row,Col, } from 'antd';
import router from 'umi/router';
import { connect } from 'dva';
import FooterToolbar from '@/components/FooterToolbar';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ApiDocTableForm from './ApiDocTableForm';
import styles from './style.less';
import { getPayloadForApiDoc} from './ApiCreate/util';
import {getPlaceHolder,getQueryArr,isJson,toApiSpecJson, toType} from "../util";

// import RoleTransfer from "../UserManager/Privilege";
// import apiFlowData from '../Editor/GGEditor/mock/apiFlow.json';

const { TabPane } = Tabs;
const { TextArea } = Input;

const requestHeaderFlag="requestHeader";
const requestBodyFlag="requestBody";
const responseBodyFlag="responseBody";
const responseHeaderFlag="responseHeader"



@connect(({ apiCreateModel, loading }) => ({
  apiService: apiCreateModel.apiService,
  submitting: loading.effects['apiCreateModel/submitStepForm'],
}))
@Form.create()
class ApiUpdate extends PureComponent {
  state = {
    width: '100%',
    apiServiceDoc:{},
    urlSpec:[],
    requestHeaderSpec: [],
    requestBodySpec: [],
    responseHeaderSpec: [],
    responseBodySpec: [],
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });

    const { location } = this.props;
    const { state } = location;
    // console.log("location state:",state);
    const { apiId } = state || { apiId: 105 };
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
      router.push('/exception/403');
    }
  };


  setBaseInfo = resp => {
    const { data} = resp;
    const apiServiceDoc=data&&data.apiServiceDoc?data.apiServiceDoc:{};
    // console.log("ddddd1111:",apiServiceDoc.apiServiceDocId);
    // 从db里面获取字符串数据，再转成json对象，在增加key字段，赋值给表格组件
    const requestHeaderSpec=(JSON.parse(apiServiceDoc.requestHeaderSpec)||[]).map((item,index)=>({...item,key:`${requestHeaderFlag}-${index}`}));
    const requestBodySpec=(JSON.parse(apiServiceDoc.requestBodySpec)||[]).map((item,index)=>({...item,key:`${requestBodyFlag}-${index}`}));
    // apiServiceDoc.urlSample=apiServiceDoc.urlSample&&apiServiceDoc.urlSample.trim()!==""?apiServiceDoc.urlSample:apiService.requestUrl;
    const responseHeaderSpec=(JSON.parse(apiServiceDoc.responseHeaderSpec)||[]).map((item,index)=>({...item,key:`${responseHeaderFlag}-${index}`}));
    const responseBodySpec=(JSON.parse(apiServiceDoc.responseBodySpec)||[]).map((item,index)=>({...item,key:`${responseBodyFlag}-${index}`}));
    // －－－－－初始化url spec数据－－－－－
    const urlSpec=(JSON.parse(apiServiceDoc.urlSpec)||[]).map((item,index)=>({...item,key:`url-${index}`}));
    const newUrlSpec=urlSpec.length===0?this.handleUrlGenerate(urlSpec,false):urlSpec;
    // －－－－－初始化request header数据－－－－－
    this.handleBodyGenerate(requestHeaderFlag,requestHeaderSpec);

    this.setState({apiServiceDoc,urlSpec:newUrlSpec,requestBodySpec,responseHeaderSpec,responseBodySpec});
  };

  /**
   * 处理占位符和get参数的说明文档
   * @param urlSpec
   * @param manualFlag
   * @returns {Array}
   */
  handleUrlGenerate=(urlSpec,manualFlag)=>{

    const { apiService } = this.props;
    const { requestUrl } = apiService;
    let url=requestUrl;
    if(manualFlag){
      const { form } = this.props;
      const fieldsValue=form.getFieldsValue();
      const {urlSample} =fieldsValue;
      url=urlSample;
    }
    let retAttr=[];
    if(url&&url.trim()!==""&&url.indexOf("{")>-1){
      const flatJsonArray=getPlaceHolder(url);
      console.log("ddd1:",flatJsonArray)
      const mergeArr=flatJsonArray.map((spec)=>{
        const findObj=urlSpec.find((item)=>(item.name===spec.name&&item.parent===spec.parent));
        return findObj?{...spec,remark:findObj.remark}:spec;
      })
      retAttr=mergeArr;
    }
    if(url&&url.trim()!==""&&url.indexOf("?")>-1){
      const flatJsonArray=getQueryArr(url);
      console.log("ddd:",flatJsonArray)
      const mergeArr=flatJsonArray.map((spec)=>{
        const findObj=retAttr.find((item)=>(item.name===spec.name&&item.parent===spec.parent));
        return findObj?{...spec,remark:findObj.remark}:spec;
      })
      retAttr=retAttr.concat(mergeArr);
    }

    retAttr=retAttr.map((item,index)=>({...item,key:`url-${index}`}));
    if(manualFlag){
      this.setState({urlSpec:retAttr});
    }
    return retAttr;
  };

  /**
   * 处理header和body的说明文档
   * @param typeParam
   * @param oldSpec
   */
  handleBodyGenerate=(typeParam,oldSpec)=>{

    const { form } = this.props;
    const fieldsValue=form.getFieldsValue();
    let newValue="";
    switch (typeParam) {
      case requestHeaderFlag:
        newValue="[{\"appkey\":\"xxxx\"}]";
        break;
      case requestBodyFlag:
        newValue=fieldsValue[`${requestBodyFlag}Sample`];
        break;
      case responseBodyFlag:
        newValue=fieldsValue[`${responseBodyFlag}Sample`];
        break;
      default:
        break;
    };
    console.log("typeParam:",typeParam,newValue);
    if(newValue&&newValue.trim()!==""){
      const isJsonResult=isJson(newValue);
      console.log(isJsonResult);
      if(isJsonResult.result){
        const newValueJson=JSON.parse(newValue);
        const parentValue=typeParam===requestHeaderFlag?'-':'root';
        const flatJsonArray=typeParam===requestHeaderFlag?[]:[{name:'root',type:toType(newValueJson),remark:'root element',parent:"-"}];
        const requestBodySampleJsonOne=toType(newValueJson)==='array'?newValueJson[0]:newValueJson;
        toApiSpecJson(requestBodySampleJsonOne,flatJsonArray,parentValue);
        const mergeArr=flatJsonArray.map((spec)=>{
          const findObj=oldSpec.find((item)=>(item.name===spec.name&&item.parent===spec.parent));
          return findObj?{...spec,remark:findObj.remark}:spec;
        })
        const specArr=mergeArr.map((item,index)=>({...item,key:`${typeParam}-${index}`}));
        this.setState({[`${typeParam}Spec`]:specArr});
      }
      else{
        message.error(isJsonResult.msg);
      }
    }
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

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      apiService,
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      // console.log("error in ui======:",error);
      if (!error) {
        console.log("api update submit values:",values);
        const apiInfo = getPayloadForApiDoc(apiService, values);
        // console.log("api doc update submit apiInfo:",apiInfo);
        // submit the values
        dispatch({
          type: 'apiCreateModel/submitApiDoc',
          payload: apiInfo,
          callback: resp => {
            // this.getApi(resp.data.apiId);
            this.setBaseInfo(resp, dispatch);
          },
        });
      }
    });
  };


  render() {
    const {
      form: { getFieldDecorator },
      submitting,
      apiService,
    } = this.props;
    const { width, apiServiceDoc,urlSpec,requestBodySpec,requestHeaderSpec,responseHeaderSpec,responseBodySpec } = this.state;
    // const apiServiceBackendMembers1  = apiService.apiServiceBackends.filter((obj)=>obj.backendType!=="endpoint");
    const sampleText="sample for post:{\"type\":\"xxx\",\"name\":\"xxx\"}";
    return (
      <PageHeaderWrapper
        onBack={() => window.history.back()}
        style={{ height: '50px' }}
        title="Compile Api Specification"
      >

        <Tabs defaultActiveKey="1">
          <TabPane tab="Url" key="1">
            <Card title="" className={styles.card} bordered={false}>
              <Row gutter={2}>
                <Col
                  xl={{ span: 6 }}
                  lg={{ span: 6 }}
                  md={{ span: 12 }}
                  sm={24}
                  style={{ height: 50 }}
                >
                  <Form.Item label="Request Method" labelCol={{ span:12  }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('reqMethod', {
                      initialValue: apiService.reqMethod,
                      rules: [],
                    })(<Input placeholder='request Method' disabled />)}
                  </Form.Item>
                </Col>
                <Col lg={18} md={12} sm={24} style={{ height: 50 }}>
                  <Form.Item label="Request Path" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                    {getFieldDecorator('urlSample', {
                      initialValue: apiServiceDoc.urlSample&&apiServiceDoc.urlSample.trim()!==""?apiServiceDoc.urlSample:apiService.requestUrl,
                      rules: [],
                    })(<Input placeholder='request Url' />)}
                  </Form.Item>
                </Col>
              </Row>
              <Button
                style={{ width: '100%', marginTop: 8, marginBottom: 8 }}
                type="dashed"
                icon="arrow-down"
                htmlType="button"
                onClick={()=>this.handleUrlGenerate(urlSpec,true)}
              >
                Generate Specification By Url
              </Button>
              <Form.Item label='Url PlaceHolders Specification'>
                {getFieldDecorator('urlSpec', {
                  initialValue: urlSpec,
                })(<ApiDocTableForm />)}
              </Form.Item>
            </Card>
          </TabPane>
          <TabPane tab="Request Header" key="2">
            <Card title="" className={styles.card} bordered={false}>
              {getFieldDecorator('requestHeaderSpec', {
                initialValue: requestHeaderSpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Request Body" key="3">
            <Card title="Request Parameter Body Sample" className={styles.card} bordered={false}>
              {getFieldDecorator(`${requestBodyFlag}Sample`, {
                initialValue: apiServiceDoc.requestBodySample,
                rules: [],
              })(<TextArea rows={4} placeholder={sampleText} />)}

              <Button
                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                type="dashed"
                icon="arrow-down"
                htmlType="button"
                onClick={()=>this.handleBodyGenerate(requestBodyFlag,requestBodySpec)}
              >
                Generate Specification By Sample
              </Button>
            </Card>
            <Card title="Request Parameter Body Specification" className={styles.card} bordered={false}>
              {getFieldDecorator('requestBodySpec', {
                initialValue: requestBodySpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Response Header" key="4">
            <Card title="" className={styles.card} bordered={false}>
              {getFieldDecorator('responseHeaderSpec', {
                initialValue: responseHeaderSpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
          <TabPane tab="Response Body" key="5">
            <Card title="Response Parameter Body Sample" className={styles.card} bordered={false}>
              {getFieldDecorator(`${responseBodyFlag}Sample`, {
                initialValue: apiServiceDoc.responseBodySample,
                rules: [],
              })(<TextArea rows={4} placeholder={sampleText} />)}

              <Button
                style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                type="dashed"
                icon="arrow-down"
                htmlType="button"
                onClick={()=>this.handleBodyGenerate(responseBodyFlag,responseBodySpec)}
              >
                Generate Specification By Sample
              </Button>
            </Card>
            <Card title="Response Parameter Body Specification" className={styles.card} bordered={false}>
              {getFieldDecorator('responseBodySpec', {
                initialValue: responseBodySpec,
              })(<ApiDocTableForm />)}
            </Card>
          </TabPane>
        </Tabs>

        <BackTop />
        <FooterToolbar style={{ width }}>
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderWrapper>
    );
  }
}

export default ApiUpdate;
