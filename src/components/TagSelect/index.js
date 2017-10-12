import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Tag, Icon } from 'antd';

import styles from './index.less';

const { CheckableTag } = Tag;

const TagSelectOption = ({ children, checked, onChange, value }) => (
  <CheckableTag
    checked={checked}
    key={value}
    onChange={state => onChange(value, state)}
  >
    {children}
  </CheckableTag>
);
TagSelectOption.defaultProps = {
  displayName: 'TagSelectOption',
};

const TagSelectExpand = ({ children }) => (
  <div>{children}</div>
);
TagSelectExpand.defaultProps = {
  displayName: 'TagSelectExpand',
};

class TagSelect extends PureComponent {
  static defaultProps = {
    initialValue: [],
  };

  state = {
    checkedAll: false,
    expand: false,
    checkedTags: this.props.initialValue || [],
  };

  onSelectAll = (checked) => {
    const { onChange } = this.props;
    let checkedTags = [];
    let expanded = this.state.expand;

    if (checked) {
      const tags = this.getAllTags();
      checkedTags = tags.list;
      expanded = tags.expand;
    }

    this.setState({
      checkedAll: checked,
      checkedTags,
      expand: expanded,
    });

    if (onChange) {
      onChange(checkedTags);
    }
  }

  getAllTags() {
    let { expand } = this.state;
    const { children } = this.props;

    let checkedTags = children.filter(child => child.props.displayName === 'TagSelectOption').map(child => child.props.value);
    const expandChild = children.filter(child => child.props.displayName === 'TagSelectExpand')[0];
    if (expandChild) {
      checkedTags = checkedTags.concat(
        expandChild.props.children.map(child => child.props.value)
      );
      expand = true;
    }
    return {
      list: checkedTags,
      expand,
    };
  }

  handleTagChange = (value, checked) => {
    const { onChange } = this.props;
    const { checkedTags } = this.state;

    const index = checkedTags.indexOf(value);
    if (checked && index === -1) {
      checkedTags.push(value);
    } else if (!checked && index > -1) {
      checkedTags.splice(index, 1);
    }

    const tags = this.getAllTags();

    let checkedAll = false;
    if (tags.list.length === checkedTags.length) {
      checkedAll = true;
    }

    this.setState({
      checkedAll,
      checkedTags,
    });

    if (onChange) {
      onChange(checkedTags);
    }
  }

  handleExpand = () => {
    this.setState({
      expand: !this.state.expand,
    });
  }

  render() {
    const { checkedTags, checkedAll, expand } = this.state;
    const { children, className, style } = this.props;

    const expandNode = children.filter(child => child.props.displayName === 'TagSelectExpand')[0];

    const cls = classNames(styles.tagSelect, className, {
      [styles.expandTag]: expandNode,
    });

    return (
      <div className={cls} style={style}>
        <CheckableTag
          checked={checkedAll}
          key="tag-select-__all__"
          onChange={this.onSelectAll}
        >
          全部
        </CheckableTag>
        {
          children.filter(child => child.props.displayName === 'TagSelectOption').map(child => React.cloneElement(child, {
            key: `tag-select-${child.props.value}`,
            checked: checkedTags.indexOf(child.props.value) > -1,
            onChange: this.handleTagChange,
          }))
        }
        {
          expandNode && (
            <a className={styles.trigger} onClick={this.handleExpand}>
              { expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} />
            </a>
          )
        }
        {
          expandNode && (
            <div className={expand ? styles.expand : styles.fold}>
              {
                expandNode.props.children.map(child => React.cloneElement(child, {
                  key: `tag-select-${child.props.value}`,
                  checked: checkedTags.indexOf(child.props.value) > -1,
                  onChange: this.handleTagChange,
                }))
              }
            </div>
          )
        }
      </div>
    );
  }
}

TagSelect.Option = TagSelectOption;
TagSelect.Expand = TagSelectExpand;

export default TagSelect;
