import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Checkbox, Icon } from 'antd';
import styles from './TaskBoard.less';

@connect(({ team, loading }) => ({
  team,
  teamLoading: loading.effects['team/join'],
}))
class TaskBoard extends PureComponent {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className={styles.kanban}>
        <div className={styles.listContainer}>
          <div className={styles.listGroup}>
            <div className={styles.listTitle}>
              <h4 title="任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一">
                任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一
              </h4>
              <div className={styles.iconBox}>
                <Icon type="dash" className={styles.titleIcon} />
              </div>
            </div>
            <div className={styles.cardList}>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox />
                  <span>触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014</span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox />
                  <span>触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014</span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.listGroup}>
            <div className={styles.listTitle}>
              <h4 title="任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一">
                任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一任务一
              </h4>
              <div className={styles.iconBox}>
                <Icon type="dash" className={styles.titleIcon} />
              </div>
            </div>
            <div className={styles.cardList}>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox />
                  <span title="触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014">
                    触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014
                  </span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox />
                  <span>触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014</span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
              </div>
              <div className={styles.item}>
                <div className={styles.checkBox}>
                  <Checkbox />
                  <span>触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014触屏游戏设计2014</span>
                </div>
                <div className={styles.icon}>
                  <span className={styles.ceo}>林鑫</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TaskBoard;
