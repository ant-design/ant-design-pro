import React, { PureComponent } from 'react';
import { Input, Icon } from 'antd';
import styles from './index.less';

export default class EditableItem extends PureComponent {
  state = {
    value: this.props.value,
    editable: false,
  };
  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className={styles.editableItem}>
        {
          editable ? (
            <div className={styles.wrapper}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className={styles.icon}
                onClick={this.check}
              />
            </div>
          ) : (
            <div className={styles.wrapper}>
              <span>{value || ' '}</span>
              <Icon
                type="edit"
                className={styles.icon}
                onClick={this.edit}
              />
            </div>
          )
        }
      </div>
    );
  }
}
