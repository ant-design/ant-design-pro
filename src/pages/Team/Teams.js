import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';

import styles from './Teams.less';

@connect(({ list, loading }) => ({
  list,
  loading: loading.models.list,
}))
class TeamsPage extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {
      list: { list },
      loading,
    } = this.props;

    return (
      <div className={styles.cardList}>
        <List
          rowKey="id"
          loading={loading}
          grid={{ gutter: 24, lg: 3, md: 2, sm: 1, xs: 1 }}
          dataSource={['', ...list]}
          renderItem={item =>
            item ? (
              <List.Item key={item.id}>
                <Card hoverable className={styles.card}>
                  <Card.Meta title={<a>{item.title}</a>} />
                </Card>
              </List.Item>
            ) : (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <Icon type="plus" /> 创建团队
                </Button>
              </List.Item>
            )
          }
        />
      </div>
    );
  }
}

export default TeamsPage;
