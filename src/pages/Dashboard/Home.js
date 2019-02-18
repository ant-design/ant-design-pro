import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  List,
  Card,
  Row,
  Col,
  Progress,
  Button,
  Icon,
  Dropdown,
  Menu,
  Avatar,
  Modal,
  Form,
  Input,
} from 'antd';

import styles from './Home.less';
import MulitTree from '@/components/MulitTree';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ list, project, loading }) => ({
  list,
  project,
  projectsLoading: loading.models.list,
}))
@Form.create()
class Home extends PureComponent {
  state = {
    // currentGroup: null,
    visible: false,
    currentProject: undefined,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'project/groupTree',
    });

    dispatch({
      type: 'list/fetch',
      payload: {
        count: 5,
      },
    });
  }

  groupSelectHandler = item => {
    // this.setState({ currentGroup: item });
    console.log(item);
  };

  groupCreateHandler = (name, id) => {
    const { dispatch } = this.props;

    dispatch({
      type: 'project/groupCreate',
      payload: {
        group_name: name,
        parent_node: id,
      },
    });
  };

  groupDeleteHandler = item => {
    const { dispatch } = this.props;

    Modal.confirm({
      title: '删除',
      content: (
        <div>
          确定删除 <b>{item.name}</b> 吗？删除后该分组的项目将被转存到未分组!
        </div>
      ),
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'project/groupDelete',
          payload: {
            project_group_id: item.id,
          },
        });
      },
    });
  };

  projectCreate = () => {
    console.log('project create');
    this.setState({
      visible: true,
      currentProject: undefined,
    });
  };

  showEditModal = item => {
    console.log(item);
  };

  handleDone = () => {
    setTimeout(() => this.addBtn.blur(), 0);
  };

  handleCancel = () => {
    setTimeout(() => this.addBtn.blur(), 0);
  };

  handleProjectSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    // const { currentProject } = this.state;
    // const id = currentProject ? currentProject.id : '';

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      // dispatch({
      //   type: 'list/submit',
      //   payload: { id, ...fieldsValue },
      // });
    });
  };

  deleteItem = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/submit',
      payload: { id },
    });
  };

  render() {
    const {
      project: { tree },
      list: { list },
      projectsLoading,

      form: { getFieldDecorator },
    } = this.props;
    const { visible, currentProject = {} } = this.state;

    const data = {
      menu: {
        name: '常用',
        list: [
          {
            id: 'all',
            icon: 'bars',
            text: '所有项目',
          },
          {
            id: 'star',
            icon: 'star',
            text: '我的标星',
          },
          {
            id: 'unsort',
            icon: 'menu-fold',
            text: '未分组',
          },
        ],
      },
      tree: {
        name: '项目组',
        list: tree,
      },
    };

    const editAndDelete = (key, currentItem) => {
      if (key === 'edit') this.showEditModal(currentItem);
      else if (key === 'delete') {
        Modal.confirm({
          title: '删除任务',
          content: '确定删除该任务吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: () => this.deleteItem(currentItem.id),
        });
      }
    };

    const ListContent = ({ data: { percent, status } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <Progress percent={percent} status={status} strokeWidth={6} style={{ width: 180 }} />
        </div>
      </div>
    );

    const MoreBtn = props => (
      <Dropdown
        overlay={
          <Menu onClick={({ key }) => editAndDelete(key, props.currentProject)}>
            <Menu.Item key="edit">编辑</Menu.Item>
            <Menu.Item key="delete">移动到</Menu.Item>
          </Menu>
        }
      >
        <a>
          更多 <Icon type="down" />
        </a>
      </Dropdown>
    );

    const getModalContent = (
      <Form onSubmit={this.handleProjectSubmit}>
        <FormItem label="项目名称">
          {getFieldDecorator('projectName', {
            rules: [{ required: true, message: '请输入项目名称' }],
            initialValue: currentProject.name,
          })(<Input placeholder="请输入项目名称" />)}
        </FormItem>
        <FormItem label="项目描述">
          {getFieldDecorator('projectDesc', {
            rules: [{ message: '请输入项目描述！', min: 0 }],
            initialValue: currentProject.desc,
          })(<TextArea rows={2} placeholder="请输入项目描述" />)}
        </FormItem>
      </Form>
    );

    return (
      <div>
        <Row style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Col span={6} style={{ paddingRight: '10px' }}>
            <MulitTree
              data={data}
              onItemSelect={this.groupSelectHandler}
              onGroupCreate={this.groupCreateHandler}
              onGroupDelete={this.groupDeleteHandler}
            />
          </Col>
          <Col span={18}>
            <div className={styles.standardList}>
              <Card bordered={false} title="项目列表" bodyStyle={{ padding: '0 32px 40px 32px' }}>
                <Button
                  type="dashed"
                  style={{ width: '100%', marginBottom: 8 }}
                  onClick={this.projectCreate}
                  icon="plus"
                >
                  添加
                </Button>
                <List
                  size="large"
                  rowKey="id"
                  loading={projectsLoading}
                  dataSource={list}
                  renderItem={item => (
                    <List.Item actions={[<MoreBtn currentProject={item} />]}>
                      <List.Item.Meta
                        avatar={<Avatar src={item.logo} shape="square" size="large" />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.subDescription}
                      />
                      <ListContent data={item} />
                    </List.Item>
                  )}
                />
              </Card>
            </div>
          </Col>
        </Row>
        <Modal
          title={`项目${currentProject.name ? '编辑' : '添加'}`}
          width={480}
          className={styles.standardListForm}
          bodyStyle={{ padding: '0px 28px' }}
          destroyOnClose
          visible={visible}
          onOk={this.handleProjectSubmit}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
        >
          {getModalContent}
        </Modal>
      </div>
    );
  }
}

export default Home;
