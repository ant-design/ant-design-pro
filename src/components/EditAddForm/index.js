import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  Upload,
  Select,
  Button,
  DatePicker,
  InputNumber,
  Icon,
  Modal,
  Skeleton,
  message,
} from 'antd';
import PropTypes from 'prop-types';
import router from 'umi/router';
import styles from './index.less';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class commonForm extends Component {
  state = {
    uploadBgLoading: false,
    uploadCoverLoading: false,
    coverImage: '',
    backdropPath: '',
    ModalEditText: '编辑成功',
    ModalAddText: '添加成功',
    visible: false,
    confirmLoading: false,
  };

  // 父组件属性改变是调用弹框
  componentWillReceiveProps(nextProps) {
    if (nextProps.clearFlag) {
      this.showModal();
    }
  }

  // 确认框
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  // 成功后跳转列表页
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    const { projectType } = this.props;
    if (projectType === 'program') {
      router.push('/projectManage/programTv');
    }
    if (projectType === 'projectManage') {
      router.push('/projectManage/movieManage');
    }
    if (projectType === 'variety') {
      router.push('/projectManage/variety');
    }
    this.setState({
      visible: false,
      confirmLoading: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
    const { id } = this.props;
    // 为添加时清空数据
    if (!id) {
      const { form } = this.props;
      const { clearData } = this.props;
      const values = {};
      clearData(values);
      // 清空表单
      form.resetFields();
    }
    // 编辑
    if (id) {
      const { clearData, program } = this.props;
      const formDataList = program.programFormList;
      const values = {
        backdrop_path: formDataList.backdrop_path,
        cover_image: formDataList.cover_image,
      };
      // 编辑关闭弹框时设置clearFlag为false不再出现弹框
      clearData(values);
    }
  };

  handleSubmit = e => {
    const { form } = this.props;
    e.preventDefault();
    // 获取所有form表单的值
    form.validateFieldsAndScroll((err, fieldsValue) => {
      let photoPaths = [];
      photoPaths = fieldsValue.photo_path.split(',');
      let trailerPaths = [];
      trailerPaths = fieldsValue.trailer_path.split(',');
      const { program } = this.props;
      const formDataList = program.programFormList;
      const values = {
        ...fieldsValue,
        release_at: moment(fieldsValue.release_at).format('YYYY-MM-DD'),
        wide_release_at: moment(fieldsValue.wide_release_at).format('YYYY-MM-DD'),
        filming_start_at: moment(fieldsValue.filming_start_at).format('YYYY-MM-DD'),
        runtime: moment(fieldsValue.runtime).format('HH:mm:ss'),
        photo_path: photoPaths,
        trailer_path: trailerPaths,
        backdrop_path: formDataList.backdrop_path,
        cover_image: formDataList.cover_image,
      };
      if (!err) {
        // 提交数据调用父组件中的方法
        const { programAdd } = this.props;
        programAdd(values);
      }
    });
  };

  // 上传图片
  handleChange = (flag, info) => {
    const { id } = this.props;
    if (info.file.status === 'uploading' && flag) {
      this.setState({ uploadBgLoading: true });
    }
    if (info.file.status === 'uploading' && !flag) {
      this.setState({ uploadCoverLoading: true });
    }
    if (info.file.status === 'done') {
      if (flag) {
        this.setState({ backdropPath: info.file.response.data.image, uploadBgLoading: false });
        this.setImageUrl(id);
        message.success('背景图片上传成功');
      }
      if (!flag) {
        this.setState({ coverImage: info.file.response.data.image, uploadCoverLoading: false });
        this.setImageUrl(id);
        message.success('封面图片上传成功');
      }
    }
  };

  // 编辑和添加页面在上传的过程中设置model层里面的图片路径
  setImageUrl = id => {
    const { form } = this.props;
    // 编辑时上传的图片更改
    if (id) {
      const params = {};
      params.id = id;
      const { backdropPath, coverImage } = this.state;
      const { uploadImage } = this.props;
      params.backdrop_path = backdropPath;
      params.cover_image = coverImage;
      uploadImage(params);
    }
    // 添加时上传的图片更改
    if (!id) {
      const addFields = form.getFieldsValue();
      let photoPaths = [];
      photoPaths = addFields.photo_path.split(',');
      let trailerPaths = [];
      trailerPaths = addFields.trailer_path.split(',');
      const params = {
        ...addFields,
        release_at: moment(addFields.release_at).format('YYYY-MM-DD'),
        wide_release_at: moment(addFields.wide_release_at).format('YYYY-MM-DD'),
        filming_start_at: moment(addFields.filming_start_at).format('YYYY-MM-DD'),
        runtime: moment(addFields.runtime).format('HH:mm:ss'),
        photo_path: photoPaths,
        trailer_path: trailerPaths,
      };
      const { backdropPath, coverImage } = this.state;
      const { uploadImage } = this.props;
      params.backdrop_path = backdropPath;
      params.cover_image = coverImage;
      uploadImage(params);
    }
  };

  render() {
    // 从父组件获取的属性
    const {
      visible,
      confirmLoading,
      ModalAddText,
      ModalEditText,
      uploadBgLoading,
      uploadCoverLoading,
    } = this.state;
    const {
      projectType,
      program,
      FormListLoading,
      id,
      form: { getFieldDecorator },
    } = this.props;
    const formDataList = program.programFormList;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 12 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    const uploadBgButton = (
      <div>
        <Icon type={uploadBgLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const uploadCoverButton = (
      <div>
        <Icon type={uploadCoverLoading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const Skeletons = (
      <React.Fragment>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </React.Fragment>
    );

    return (
      <div className={styles.addMovie}>
        {!FormListLoading && formDataList ? (
          <Form onSubmit={this.handleSubmit} className={styles.formWidth}>
            <FormItem {...formItemLayout} label={<span>标题</span>} hasFeedback>
              {getFieldDecorator('title', {
                initialValue: `${formDataList.title}`,
                rules: [{ required: true, message: '请输入标题!' }],
              })(<Input placeholder="请输入标题" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>副标题</span>} hasFeedback>
              {getFieldDecorator('subtitle', {
                rules: [{ required: true, message: '请填入副标题' }],
                initialValue: `${formDataList.subtitle}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>摘要</span>}>
              {getFieldDecorator('synopsis', {
                rules: [
                  {
                    required: true,
                    message: '请填入摘要',
                  },
                ],
                initialValue: `${formDataList.synopsis}`,
              })(<Input.TextArea rows={4} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>评级</span>} hasFeedback>
              {getFieldDecorator('rating', {
                rules: [{ required: false, message: 'Please input your title!' }],
                initialValue: `${formDataList.rating}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>评级公告</span>}>
              {getFieldDecorator('rating_advisory', {
                rules: [
                  {
                    required: false,
                  },
                ],
                initialValue: `${formDataList.rating_advisory}`,
              })(<Input.TextArea rows={4} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>状态</span>}>
              {getFieldDecorator('status', {
                rules: [
                  {
                    required: false,
                  },
                ],
                initialValue: `${formDataList.status}`,
              })(
                <Select style={{ width: 120 }}>
                  <Option value="0">rumored</Option>
                  <Option value="1">planned</Option>
                  <Option value="2">in_production</Option>
                  <Option value="3">post_production</Option>
                  <Option value="4">released</Option>
                  <Option value="5">canceled</Option>
                </Select>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>预告片</span>} hasFeedback>
              {getFieldDecorator('trailer_path', {
                rules: [{ required: true, message: '请输入预告片!' }],
                initialValue: `${formDataList.trailer_path}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>视频</span>} hasFeedback>
              {getFieldDecorator('photo_path', {
                rules: [{ required: true, message: '请输入视频!' }],
                initialValue: `${formDataList.photo_path}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>官网</span>} hasFeedback>
              {getFieldDecorator('website', {
                rules: [{ required: false, message: '请输入官网地址!' }],
                initialValue: `${formDataList.website}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>标语</span>} hasFeedback>
              {getFieldDecorator('tagline', {
                rules: [{ required: false, message: '请输入标语!' }],
                initialValue: `${formDataList.tagline}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>播放频道</span>} hasFeedback>
              {getFieldDecorator('channel_type', {
                rules: [{ required: true, message: '请填入播放频道' }],
                initialValue: `${formDataList.channel_type}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>发布日期</span>}>
              {getFieldDecorator('release_at', {
                rules: [
                  {
                    required: true,
                    message: '请填入发布日期',
                  },
                ],
                initialValue: moment(`${formDataList.release_at}`, 'YYYY-MM-DD'),
              })(<DatePicker format="YYYY-MM-DD" placeholder="发布日期" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>上映日期</span>}>
              {getFieldDecorator('wide_release_at', {
                rules: [
                  {
                    required: true,
                    message: '请填入上映日期',
                  },
                ],
                initialValue: moment(`${formDataList.wide_release_at}`, 'YYYY-MM-DD'),
              })(<DatePicker showTime format="YYYY-MM-DD" placeholder="上映日期" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>拍摄时间</span>}>
              {getFieldDecorator('filming_start_at', {
                rules: [
                  {
                    required: true,
                    message: '请填入拍摄时间',
                  },
                ],
                initialValue: moment(`${formDataList.filming_start_at}`, 'YYYY-MM-DD'),
              })(<DatePicker showTime format="YYYY-MM-DD" placeholder="拍摄时间" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>拍摄周期</span>}>
              {getFieldDecorator('filming_duration', {
                rules: [
                  {
                    required: true,
                    message: '请填入拍摄周期',
                  },
                ],
                initialValue: `${formDataList.filming_duration}`,
              })(<InputNumber min={1} />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>播放时间</span>}>
              {getFieldDecorator('runtime', {
                rules: [
                  {
                    required: false,
                  },
                ],
                initialValue: moment(`${formDataList.runtime}`, 'HH:mm:ss'),
              })(<DatePicker showTime format="HH:mm:ss" placeholder="播放时间" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>拍摄地址</span>} hasFeedback>
              {getFieldDecorator('filming_location', {
                rules: [{ required: true, message: '请填入拍摄地址' }],
                initialValue: `${formDataList.filming_location}`,
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="上传背景图：">
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/backstage/upload/"
                accept="image/jpg, image/jpeg, image/png,image/gif,"
                onChange={info => {
                  this.handleChange(true, info);
                }}
                data={{
                  path: 'project',
                  name: '1',
                }}
              >
                {formDataList.backdrop_path ? (
                  <img src={formDataList.backdrop_path} className={styles.avatar} alt="avatar" />
                ) : (
                  uploadBgButton
                )}
              </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="上传封面：">
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/backstage/upload/"
                accept="image/jpg, image/jpeg, image/png,image/gif,"
                onChange={info => {
                  this.handleChange(false, info);
                }}
                data={{
                  name: '1',
                  path: 'project',
                }}
              >
                {formDataList.cover_image ? (
                  <img src={formDataList.cover_image} className={styles.avatar} alt="avatar" />
                ) : (
                  uploadCoverButton
                )}
              </Upload>
            </FormItem>
            {projectType === 'program' ? (
              <FormItem {...formItemLayout} label={<span>集数</span>} hasFeedback>
                {getFieldDecorator('episode', {
                  rules: [{ required: true, message: '请填入集数' }],
                  initialValue: `${formDataList.episode}`,
                })(<Input />)}
              </FormItem>
            ) : (
              <Fragment />
            )}
            {projectType === 'variety' ? (
              <FormItem {...formItemLayout} label={<span>主持人</span>} hasFeedback>
                {getFieldDecorator('host', {
                  rules: [{ required: true, message: '请填入主持人' }],
                  initialValue: `${formDataList.host}`,
                })(<Input />)}
              </FormItem>
            ) : (
              <Fragment />
            )}
            {id ? (
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="form.submit" />
                </Button>
                <Modal
                  title="确认框"
                  visible={visible}
                  onOk={this.handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                  footer={[
                    // <Button key="back" onClick={this.handleCancel}>继续编辑</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                      返回列表页
                    </Button>,
                  ]}
                >
                  <p className={styles.messageInfo}>{ModalEditText}</p>
                </Modal>
              </FormItem>
            ) : (
              <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
                <Button type="primary" htmlType="submit">
                  <FormattedMessage id="form.submit" />
                </Button>
                <Modal
                  title="确认框"
                  visible={visible}
                  onOk={this.handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={this.handleCancel}
                  footer={[
                    // <Button key="back" onClick={this.handleCancel}>添加新页面</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                      返回列表页
                    </Button>,
                  ]}
                >
                  <p className={styles.messageInfo}>{ModalAddText}</p>
                </Modal>
              </FormItem>
            )}
          </Form>
        ) : (
          Skeletons
        )}
      </div>
    );
  }
}

commonForm.propTypes = {
  projectType: PropTypes.string.isRequired,
  program: PropTypes.object.isRequired,
};
export default commonForm;
