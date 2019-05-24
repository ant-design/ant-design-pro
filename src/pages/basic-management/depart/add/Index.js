import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {
    List,
    Card,
    Row,
    Col,
    Radio,
    Input,
    InputNumber,
    Progress,
    Button,
    Icon,
    Dropdown,
    Menu,
    Avatar,
    Modal,
    Form,
    DatePicker,
    Select,
    Cascader,
    message,
    Divider,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;

@connect(({ depart, dict, loading }) => ({
    depart,
    dict,
    loading: loading.models.depart,
}))
@Form.create()
class departAdd extends PureComponent {
    state = {};

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'depart/fetch',
            payload: {},
        });
        dispatch({
            type: 'dict/get',
            payload: 'departType'
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                if (!values.pid) {
                } else {
                    values.pid = values.pid[values.pid.length - 1];
                }
                dispatch({
                    type: 'depart/add',
                    payload: values,
                });
            }
        });
    };

    handleCancle = e => {
        router.push('/basic-management/depart/list');
    };

    render() {
        const {
            form: { getFieldDecorator },
            depart: { data },
            dict: { departType }
        } = this.props;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 4,
                },
            },
        };
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} labelAlign="right">
                            <FormItem label="上级组织">
                                {getFieldDecorator('pid', {
                                    rules: [
                                        {
                                            required: false,
                                            message: '请选择',
                                        },
                                    ],
                                })(
                                    <Cascader
                                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                        changeOnSelect
                                        options={data.list}
                                        placeholder="上级组织"
                                        size="large"
                                    />
                                )}
                            </FormItem>
                            <FormItem label="组织分类">
                                {getFieldDecorator('type', {
                                    rules: [
                                        {
                                            required: false,
                                            message: '请输入组织分类',
                                        },
                                    ],
                                })(
                                    <Select placeholder="请选择" style={{ width: '100%' }} size="large">
                                        {departType.map((type) => (
                                            <Option value={type.code} key={type.id}>{type.name}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="组织编码">
                                {getFieldDecorator('code', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入组织编码',
                                        },
                                    ],
                                })(<Input placeholder="组织编码" size="large" />)}
                            </FormItem>
                            <FormItem label="组织名称">
                                {getFieldDecorator('name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入组织名称',
                                        },
                                    ],
                                })(<Input placeholder="组织名称" size="large" />)}
                            </FormItem>
                            <FormItem label="组织序号">
                                {getFieldDecorator('sort', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入组织序号',
                                        },
                                    ],
                                })(<InputNumber style={{ width: '100%' }} placeholder="组织序号" size="large" />)}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" icon="check" size="large">
                                    确定
                                </Button>
                                <Button
                                    style={{ marginLeft: 8 }}
                                    onClick={this.handleCancle}
                                    icon="close"
                                    type="danger"
                                    size="large"
                                >
                                    取消
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    }
}

export default departAdd;
