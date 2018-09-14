import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    Modal,
    message,
    Badge,
    Divider,
    Steps,
    Radio,
    Popconfirm,
    Upload,
    Tag,
    Avatar,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');

// const value = [0,1,2,3];
// let gradeName = '';
// value.forEach(element => {
//   gradeName += status[element]+',';
// });
// console.log(gradeName);

const userStatus = { '01': '无效', '00': '正常' };
const userStatusColor = {'01':'orange', '00':'green'};

/* eslint react/no-multi-comp:0 */
@connect(({ wall, loading }) => ({
    wall,
    loading: loading.models.wall,
}))
export default class TableList extends PureComponent {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
      uid: '-1',
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }

      // {url:'http://www.ggzzrj.cn/guoguangface/upload/feature/181509033534.png',status: 'done',uid:'1',name:'1'},
      // {url:'http://www.ggzzrj.cn/guoguangface/upload/feature/181309014133.png',status: 'done',uid:'2',name:'2'},
      // {url:'http://www.ggzzrj.cn/guoguangface/upload/feature/181309014128.png',status: 'done',uid:'3',name:'3'},
      // {url:'http://www.ggzzrj.cn/guoguangface/upload/feature/181309014123.png',status: 'done',uid:'4',name:'4'},
      // {url:'http://www.ggzzrj.cn/guoguangface/upload/feature/181309014118.png',status: 'done',uid:'5',name:'5'},
      // {url:'http://www.ggzzrj.cn/guoguangface/upload/feature/181309014113.png',status: 'done',uid:'6',name:'6'},

   ],

    tradeSpace: 'tface',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { tradeSpace } = this.state;

    dispatch({
        type: 'wall/fetch',
        payload: {
            tradeCode: `${tradeSpace  }.selectWall`,
            currentPage: 1,
            pageSize: 20,
        },
    });
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {

    const { dispatch } = this.props;

    dispatch({
      type: 'wall/addUpload',
      payload: fileList,
    });
    
  }

  loadMore = () => {

    const arr1 = [{1:1,2:2},{x:1},{y:2}];
    const arr2 = [{3:3,4:4}];
    console.log('%o',[...arr1,...arr2]);

    const arr3 = [1,2];
    const arr4 = [3,4];
    console.log('%o',[...arr3,...arr4]);

    const { dispatch,wall } = this.props;
    const { tradeSpace } = this.state;

    console.log('loadMore,%o',wall);

    dispatch({
      type: 'wall/fetchMore',
      payload: {
          tradeCode: `${tradeSpace  }.selectWall`,
          currentPage: wall.data.pagination.current+1,
          pageSize: wall.data.pagination.pageSize,
      },
    });
  };

  render() {
    const { wall } = this.props;
    const { wall: {data:{pagination : { current, pageSize, total} }} } = this.props;
    const { previewVisible, previewImage, 
      // fileList
     } = this.state;

    // const fileList = table.data.list.forEach((value, key) => { if(key === 'fPicpath') return 'http://www.ggzzrj.cn/guoguangface/'+value })
    
    // map(item => item.fPicpath = 'http://www.ggzzrj.cn/guoguangface/'+item.fPicpath);

    // let fileList = table && table.data && table.data.list||[];
    // if(wall && wall.data && wall.data.list && wall.data.list[0]  && wall.data.list[0]['uid']){
    //   this.setState({
    //     fileList: wall.data.list,
    //   });
    // }else{
      // this.setState({
      //   fileList: [],
      // });
    // }

    // console.log(`fileList%o:`,wall.data.list);

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">批量上传</div>
      </div>
    );
    return (
      // <PageHeaderWrapper title="查询表格">
        <Card bordered={false}>
          <div className="clearfix">
            <Upload
              action="http://localhost:8011/uploadFile"
              listType="picture-card"
              fileList={wall && wall.data.list||[]}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              multiple
            >
              {uploadButton}
            </Upload>

            {((current*pageSize) < total) && <Button type="primary" block onClick={this.loadMore}>加载更多</Button>}

            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </div>
        </Card>
      // </PageHeaderWrapper>
    );
  }
}
