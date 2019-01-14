import React, { PureComponent } from 'react';
import { connect } from 'dva';

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/join'],
}))
class TaskBoard extends PureComponent {
  componentDidMount() {}

  render() {
    return <div />;
  }
}

export default TaskBoard;
