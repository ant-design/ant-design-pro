import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Input, Popover, Card, Button, Icon, List, Row, Col } from 'antd';

import styles from './Teams.less';

const FormItem = Form.Item;
const InputGroup = Input.Group;

@connect(({ team, loading }) => ({
  team,
  loading: loading.models.team,
}))
@Form.create()
class TeamsPage extends PureComponent {
  state = {
    visible: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'team/list',
    });
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  handleTeamSelect = team => {
    const { dispatch } = this.props;
    dispatch({
      type: 'team/select',
      payload: team,
    });
  };

  onTeamCreate = () => {
    const { dispatch, form } = this.props;

    this.hide();
    form.validateFields(['team_name'], {}, (err, values) => {
      if (!err) {
        dispatch({
          type: 'team/create',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      team: { list },
      form,
      loading,
    } = this.props;

    const { getFieldDecorator } = form;
    const { visible } = this.state;

    return (
      <div className={styles.cardList}>
        <List
          rowKey="id"
          loading={loading}
          grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
          dataSource={['', ...list]}
          renderItem={item =>
            item ? (
              <List.Item key={item.team_id} onClick={() => this.handleTeamSelect(item)}>
                <Card hoverable className={styles.card}>
                  <Card.Meta title={<a>{item.team_name}</a>} />
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Popover
                  placement="bottom"
                  content={
                    <Form style={{ width: '320px' }}>
                      <FormItem>
                        <Row gutter={8}>
                          <Col span={18}>
                            <InputGroup compact>
                              {getFieldDecorator('team_name', {
                                rules: [
                                  {
                                    required: true,
                                    message: '请输入团队名称!',
                                  },
                                  {
                                    pattern: /^[\u4e00-\u9fa5a-zA-Z0-9_-]{1,32}$/,
                                    message: '支持中文，字母，下划线',
                                  },
                                ],
                              })(<Input size="large" placeholder="如：易掘企产品研发团队" />)}
                            </InputGroup>
                          </Col>
                          <Col span={6}>
                            <Button size="large" type="primary" onClick={this.onTeamCreate}>
                              创建
                            </Button>
                          </Col>
                        </Row>
                      </FormItem>
                    </Form>
                  }
                  title="新团队"
                  trigger="click"
                  visible={visible}
                  onVisibleChange={this.handleVisibleChange}
                >
                  <Button className={styles.newButton} type="dashed">
                    <Icon type="plus" /> 创建团队
                  </Button>
                </Popover>
              </List.Item>
            )
          }
        />
      </div>
    );
  }
}

export default TeamsPage;
