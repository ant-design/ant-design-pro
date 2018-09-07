import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List, Popconfirm, Modal, Upload, Form, Input, Radio } from 'antd';
import PageHeaderLayout from '@/layouts/PageHeaderLayout';
import styles from './CardList.less';


const FormItem = Form.Item;
const uploadButton = (
    <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
    </div>
);

const CollectionCreateForm = Form.create()(
    class extends React.Component {
        render() {
            const { updateVisible, updateCancel, updateCreate, previewImage, form, fileList, uploadCreate, UploadChange, uploadVisible, uploadCancel } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={updateVisible}
                    title="更新"
                    okText="Create"
                    onCancel={updateCancel}
                    onOk={updateCreate}
                >
                    <FormItem>
                        <div>
                            <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture-card"
                                fileList={fileList}
                                onPreview={uploadCreate}
                                onChange={UploadChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={uploadVisible} footer={null} onCancel={uploadCancel}>
                                <img alt="example" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        </div>
                    </FormItem>
                    <Form layout="vertical">
                        <FormItem label="fId">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fType">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fChannel">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fAlgorithm">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fCharacter">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fStatus">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fUserid">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fPad1">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
                        <FormItem label="fPad2">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input the title of collection!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>



                    </Form>
                </Modal>
            );
        }
    }
);














@connect(({ table, loading }) => ({
    table,
    loading: loading.models.list,
}))
export default class CardList extends PureComponent {

    state = {
        previewVisible: false,
        updateVisible: false,
        previewImage: '',
        uploadVisible: false,
        fileList: [{
            uid: '-1',
            name: 'xxx.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        }],
    };






    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/fetch',
            payload: {
                tradeCode: 'tface.selectByPrimaryKey',
            },
        });
    }

    handleDelete = item => {
        const { dispatch } = this.props;
        dispatch({
            type: 'table/remove',
            payload: {
                fId: item.fId,
                tradeCode: 'tface.deleteByPrimaryKey',
            },
        });
    }

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = () => {
        this.setState({ previewVisible: true, });
    }



    uploadVisibleFalse = () => {
        this.setState({ uploadVisible: false, });
    }
    uploadCreate = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    updateVisibleTure = () => {
        this.setState({ updateVisible: true, });
    }
    updateVisibleFalse = () => {
        this.setState({ updateVisible: false, });
    }



    handleCreate = () => {
        const form = this.formRef.props.form;
        const {dispatch} = this.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            // dispatch({
            //     type: 'table/remove',
            //     payload: {
            //         fId: item.fId,
            //         tradeCode: 'tface.deleteByPrimaryKey',
            //     },
            // });

            console.log('Received values of form: ', values);
            form.resetFields();
            this.setState({ updateVisible: false });
        });
    }

    uploadChange = ({ fileList }) => this.setState({ fileList })

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const { table: { data: { list } }, loading, } = this.props;
        const { previewVisible, previewImage, upVisible } = this.state;

        return (
            <PageHeaderLayout title="卡片列表">

                <div className={styles.cardList}>
                    <List
                        pagination={{
                            pageSize: 9,
                            showSizeChanger: true,
                            showQuickJumper: true,
                        }}
                        rowKey="id"
                        loading={loading}
                        grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
                        dataSource={['', ...list]}
                        renderItem={item =>
                            item ? (
                                <List.Item key={item.fId}>
                                    <Card hoverable
                                        className={styles.card}
                                        actions={[
                                            <Popconfirm
                                                title="确认删除吗?"
                                                onConfirm={this.handleDelete.bind(null, item)}>
                                                <a>删除</a>
                                            </Popconfirm>, <a onClick={this.updateVisibleTure}>更新</a>]}>
                                        <CollectionCreateForm
                                            wrappedComponentRef={this.saveFormRef}
                                            updateVisible={this.state.updateVisible}
                                            updateCancel={this.updateVisibleFalse}
                                            updateCreate={this.handleCreate}
                                            fileList={this.state.fileList}
                                            uploadCreate={this.uploadCreate}
                                            UploadChange={this.uploadChange}
                                            uploadVisible={this.state.uploadVisible}
                                            uploadCancel={this.uploadVisibleFalse}
                                            previewImage={previewImage}


                                        />
                                        <div>
                                            <Card
                                                type="inner"
                                                onClick={this.handlePreview}
                                                hoverable
                                                style={{ width: 120, float: "left" }}
                                                cover={<img alt="example" src={item.fPicpath} />}
                                            ></Card>
                                            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={item.fPicpath} />
                                            </Modal>
                                        </div>
                                        <div style={{ float: "left" }}>
                                            <span>I  D:{item.fId}</span><br />
                                            <span>姓名:{item.fType}</span><br />
                                            <span>身高:{item.fChannel}</span><br />
                                            <span>体重:{item.fAlgorithm}</span><br />
                                            <span>体重:{item.fCharacter}</span><br />
                                        </div>
                                        <div>

                                            <span>体重:{item.fStatus}</span><br />
                                            <span>体重:{item.fUserid}</span><br />
                                            <span>体重:{item.fPad1}</span><br />
                                            <span>体重:{item.fPad2}</span>
                                        </div>
                                    </Card>
                                </List.Item>
                            ) : (
                                    <List.Item>
                                        <Button type="dashed" className={styles.newButton}>
                                            <Icon type="plus" /> 新增产品
                                        </Button>
                                    </List.Item>
                                )
                        }
                    />
                </div>
            </PageHeaderLayout>
        );
    }
}
