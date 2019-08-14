import React from 'react';
import { connect } from 'dva';
import { router, Redirect } from 'umi';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import PageLoading from '@/components/PageLoading';

interface SecurityLayoutProps extends ConnectProps {
  loading: boolean;
  currentUser: CurrentUser;
}

class SecurityLayout extends React.Component<SecurityLayoutProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }
  }

  render() {
    const { children, loading, currentUser } = this.props;
    if (!currentUser.userid && loading) {
      return <PageLoading />;
    }
    if (!currentUser.userid) {
      return <Redirect to="/user/login"></Redirect>;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
