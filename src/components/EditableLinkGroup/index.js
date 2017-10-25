import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Button, Icon } from 'antd';
import styles from './index.less';

// TODO: 添加逻辑

class EditableLinkGroup extends PureComponent {
  static defaultProps = {
    links: [],
    onAdd: () => {
    },
  }
  state = {
    links: this.props.links,
  };

  handleOnClick() {
    const { onAdd } = this.props;
    onAdd();
  }

  render() {
    const { links } = this.state;
    return (
      <div className={styles.linkGroup}>
        {
          links.map(link => <Link key={`linkGroup-item-${link.id || link.title}`} to={link.href}>{link.title}</Link>)
        }
        {
          <Button size="small" onClick={() => this.handleOnClick()}>
            <Icon type="plus" />添加
          </Button>
        }
      </div>
    );
  }
}

EditableLinkGroup.propTypes = {
  links: PropTypes.array,
  onAdd: PropTypes.func,
};

export default EditableLinkGroup;
