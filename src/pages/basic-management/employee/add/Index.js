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

@connect(({ employee, depart, loading }) => ({
    employee,
    depart,
    loading: loading.models.employee,
}))
@Form.create()
class employeeAdd extends PureComponent {
    state = {};

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'depart/fetch',
            payload: {}
        })
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                const { dispatch } = this.props;
                if (!values.departId) {
                } else {
                    values.departId = values.departId[values.departId.length - 1];
                }
                dispatch({
                    type: 'employee/add',
                    payload: values,
                });
            }
        });
    };

    handleCancle = e => {
        router.push('/basic-management/employee/list');
    };

    render() {
        const {
            form: { getFieldDecorator },
            depart: { data }
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
                            <FormItem label="工号">
                                {getFieldDecorator('empNo', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入工号',
                                        },
                                    ],
                                })(
                                    <Input placeholder="工号" size="large" />
                                )}
                            </FormItem>
                            <FormItem label="姓名">
                                {getFieldDecorator('realName', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入姓名',
                                        },
                                    ],
                                })(<Input placeholder="姓名" size="large" />)}
                            </FormItem>
                            <FormItem label="性别">
                                {getFieldDecorator('sex', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请输入性别',
                                        },
                                    ],
                                })(
                                    <Select placeholder="请选择" style={{ width: '100%' }} size="large">
                                        <Option value="男">男</Option>
                                        <Option value="女">女</Option>
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem label="所属部门">
                                {getFieldDecorator('departId', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择',
                                        },
                                    ],
                                })(
                                    <Cascader
                                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                        changeOnSelect
                                        options={data.list}
                                        placeholder="所属部门"
                                        size="large"
                                    />
                                )}
                            </FormItem>
                            <FormItem label="在职状态">
                                {getFieldDecorator('status', {
                                    initialValue: '0',
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择',
                                        },
                                    ],
                                })(
                                    <Select placeholder="请选择" style={{ width: '100%' }} size="large">
                                        <Option value="0">在职</Option>
                                        <Option value="1">离职</Option>
                                    </Select>
                                )}
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

export default employeeAdd;
