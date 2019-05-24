import React, { PureComponent, Fragment } from 'react';
import router from 'umi/router';
import { connect } from 'dva';
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
    Badge,
    Popconfirm,
    Divider,
} from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../../../List/TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['success', 'error'];
const status = ['在职', '离职'];

@connect(({ employee, loading }) => ({
    employee,
    loading: loading.models.employee,
}))
@Form.create()
class employeeList extends PureComponent {
    state = {
        selectedRows: [],
        expandForm: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'employee/fetch',
            payload: {},
        });
    }

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const { dispatch } = this.props;
        const { formValues } = this.state;

        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = { ...obj };
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            page: pagination.current,
            pageSize: pagination.pageSize,
            ...formValues,
            ...filters,
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }

        dispatch({
            type: 'user/fetch',
            payload: params,
        });
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows,
        });
    };

    columns = [
        {
            title: '姓名',
            dataIndex: 'realName',
        },
        {
            title: '工号',
            dataIndex: 'empNo',
        },
        {
            title: '性别',
            dataIndex: 'sex',
        },
        {
            title: '所属部门',
            dataIndex: 'depart.name',
        },
        {
            title: '所属单位',
            dataIndex: 'departUnit.name',
        },
        {
            title: '在职状态',
            dataIndex: 'status',
            filters: [
                {
                    text: status[0],
                    value: 0,
                },
                {
                    text: status[1],
                    value: 1,
                },
            ],
            render(val) {
                return <Badge status={statusMap[val]} text={status[val]} />;
            },
        },
        {
            title: '录入人',
            dataIndex: 'addBy',
        },
        {
            title: '录入日期',
            dataIndex: 'addOn',
        },
        {
            title: '修改人',
            dataIndex: 'editBy'
        },
        {
            title: '修改日期',
            dataIndex: 'editOn',
        },
        {
            title: '操作',
            fixed: 'right',
            render: (text, record) => (
                <Fragment>
                    <a onClick={() => this.handleEdit(record)}>编辑</a>
                    <Divider type="vertical" />
                    <Popconfirm
                        title="你确定要删除此记录吗?"
                        onConfirm={() => this.handleDelete(record)}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a>删除</a>
                    </Popconfirm>
                </Fragment>
            ),
        },
    ];

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
        </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
        </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleEdit = record => {
        router.push('/basic-management/employee/edit/' + record.id);
    };

    handleDelete = record => {
        console.log(record);
        const { dispatch } = this.props;
        dispatch({
            type: 'user/delete',
            payload: record.id,
        });
    };

    handleAdd() {
        router.push('/basic-management/employee/add');
    };

    disableUserConfirm = () => {
        const that = this;
        Modal.confirm({
            title: '你确定要禁用此账号?',
            content: '禁用账号后，此账号不可登陆系统!',
            onOk() {
                that.disableUser();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    disableUser = () => {
        const { dispatch } = this.props;
        const { selectedRows } = this.state;
        const rows = [];
        selectedRows.forEach(row => {
            rows.push({
                id: row.id,
            });
        });
        console.log(rows);
        dispatch({
            type: 'user/disable',
            payload: selectedRows,
        });
    };

    handleMenuClick = e => {
        console.log(e);
        const { selectedRows } = this.state;
        if (selectedRows.length === 0) return;
        switch (e.key) {
            case 'roleAuth':
                break;
            case 'resetPassword':
                break;
            case 'disable':
                this.disableUserConfirm();
                break;
            case 'active':
                break;
            default:
                break;
        }
    };

    toggleForm = () => {
        const { expandForm } = this.state;
        this.setState({
            expandForm: !expandForm,
        });
    };

    handleFormReset = () => {
        const { form, dispatch } = this.props;
        form.resetFields();
        this.setState({
            formValues: {},
        });
        dispatch({
            type: 'user/fetch',
            payload: {},
        });
    };

    handleSearch = e => {
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
            };
            this.setState({
                formValues: values,
            });
            dispatch({
                type: 'user/fetch',
                payload: values,
            });
        });
    };

    renderSimpleForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{ md: 6, lg: 24, xl: 48 }}>
                    <Col md={6} sm={24}>
                        <FormItem label="工号">
                            {getFieldDecorator('empNo')(<Input placeholder="请输入" size="large" />)}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="姓名">
                            {getFieldDecorator('realName')(<Input placeholder="请输入" size="large" />)}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <FormItem label="性别">
                            {getFieldDecorator('sex')(<Input placeholder="请输入" size="large" />)}
                        </FormItem>
                    </Col>
                    <Col md={6} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button icon="search" type="primary" size="large" htmlType="submit">
                                查询
                            </Button>
                            <Button
                                icon="reload"
                                type="primary"
                                style={{ marginLeft: 8 }}
                                size="large"
                                onClick={this.handleFormReset}
                            >
                                重置
                            </Button>
                            <a icon="down" style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                                高级查询 <Icon type="down" />
                            </a>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    };

    renderAdvancedForm() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline" labelAlign="right">
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                    <Col md={8} sm={24}>
                        <FormItem label="工号">
                            {getFieldDecorator('empNo')(<Input placeholder="请输入" size="large" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="姓名">
                            {getFieldDecorator('realName')(<Input placeholder="请输入" size="large" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="性别">
                            {getFieldDecorator('sex')(
                                <Select placeholder="请选择" style={{ width: '100%' }} size="large">
                                    <Option value="0">男</Option>
                                    <Option value="1">女</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{ md: 8, lg: 24, xl: 48 }}>

                    <Col md={8} sm={24}>
                        <FormItem label="状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{ width: '100%' }} size="large">
                                    <Option value="0">在职</Option>
                                    <Option value="1">离职</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button icon="search" type="primary" size="large" htmlType="submit">
                                查询
                            </Button>
                            <Button
                                icon="reload"
                                type="primary"
                                style={{ marginLeft: 8 }}
                                size="large"
                                onClick={this.handleFormReset}
                            >
                                重置
                            </Button>
                            <a icon="down" style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                                收起 <Icon type="up" />
                            </a>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    };

    renderForm() {
        const { expandForm } = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    };

    render() {
        const {
            employee: { data },
            loading,
        } = this.props;
        const { selectedRows } = this.state;
        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
            </Menu>
        );
        return (
            <PageHeaderWrapper>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" size="large" onClick={() => this.handleAdd()}>
                                新增
                            </Button>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Dropdown overlay={menu}>
                                        <Button icon="more" type="primary" size="large">
                                            更多操作 <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                        </div>
                        <StandardTable
                            bordered
                            rowKey="id"
                            size="small"
                            scroll={{ x: 1200 }}
                            selectedRows={selectedRows}
                            loading={loading}
                            data={data}
                            columns={this.columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
            </PageHeaderWrapper>
        );
    };
}

export default employeeList;
