import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import Link from 'umi/link';
import Result from '@/components/Result';
import styles from './Join.less';

const actions = (
  <div className={styles.actions}>
    <Link to="/">
      <Button size="large" type="primary">
        返回首页
      </Button>
    </Link>
  </div>
);

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/join'],
}))
class Join extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    const url = new URL(window.location.href);
    const inviteToken = url.searchParams.get('invite');

    dispatch({
      type: 'team/join',
      payload: {
        invite_token: inviteToken,
      },
    });
  }

  render() {
    const {
      team: { joinInfo, joinStatus },
    } = this.props;

    return (
      <Result
        className={styles.joinResult}
        type={joinStatus === '__OK__' ? 'success' : 'error'}
        title={<div className={styles.title}>{joinInfo}</div>}
        actions={actions}
        style={{ marginTop: 56 }}
      />
    );
  }
}

export default Join;
